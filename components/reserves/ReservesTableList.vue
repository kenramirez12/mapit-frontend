<template>
  <div>
    <div class="md:hidden">
      <ul
        v-if="!reserves || (reserves && reserves.length > 0)"
        class="bg-red">
        <li
          v-for="(item, n) in (reserves ? reserves : [1, 2, 3, 4, 5])"
          :key="'reserve_' + n"
          @click.prevent="$router.push(`/${$lang.current().slug}/my/bookings/${item.code}`)"
          class="border-b text-sm font-light py-2 flex flex-wrap">
          <div style="width:calc(100% - 45px)">
            <template v-if="reserves">
              <span class="reserve-title-responsive">
                {{ $lang.apiTranslate(item.experience.translations, 'title') }}
              </span>
              <small>{{ item.experience.destination.name }} - {{ item.date }}</small>
            </template>
            <template v-else>
              <PuSkeleton
              :loading="true"
              width="100%"
              height="14px" />
              <PuSkeleton
              :loading="true"
              width="50%"
              class="block mt-2"
              height="12px" />
            </template>
          </div>
          <div v-if="reserves" class="flex" style="width:45px">
          <img v-if="item.status === 1" src="/images/warning-icon-sm.svg" class="m-auto">
          <img v-else src="/images/success-icon-sm.svg" class="m-auto">
          </div>
        </li>
      </ul>
      <p v-if="reserves && reserves.length === 0" class="font-light">
        {{ $lang.translate(translations, 'no_reserves_found') }}
      </p>
    </div>
    <div class="hidden md:block">
      <el-table v-if="!reserves" :data="[1, 2, 3, 4, 5]" :show-header="false" class="w-full">
        <el-table-column>
          <PuSkeleton
          :loading="true"
          width="100%"
          height="30px" />
        </el-table-column>
      </el-table>
      <template v-else>
        <p v-if="reserves.length === 0" class="font-light">
          {{ $lang.translate(translations, 'no_reserves_found') }}
        </p>
        <el-table
          v-else
          :data="reserves"
          :show-header="false"
          class="w-full">
          <el-table-column
            label="Fecha"
            width="120">
            <template slot-scope="scope">
              {{ scope.row.date }}
            </template>
          </el-table-column>
          <el-table-column label="Nombre">
            <template slot-scope="scope">
              {{ $lang.apiTranslate(scope.row.experience.translations, 'title') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="experience.destination.name"
            label="Dirección"
            width="130" />
          <el-table-column width="230">
            <template slot-scope="scope">
              <el-popover
                v-if="scope.row.status === 1"
                popper-class="text-sm"
                placement="top-start"
                width="240"
                trigger="hover"
                :content="$lang.translate(translations, 'missing_info')">
                <a
                  slot="reference"
                  href="#"
                  @click.prevent="$router.push(`/${$lang.current().slug}/my/bookings/${scope.row.code}/travelers-info`)"
                  class="link-underline link-underline--error">
                  <img src="/images/warning-icon-sm.svg" class="mr-4">
                  <span>{{ $lang.translate(translations, 'pending_info') }}</span>
                </a>
              </el-popover>
              <div v-if="scope.row.status === 2" class="flex items-end">
                <img src="/images/success-icon-sm.svg" class="mr-4">
                <span class="leading-none" style="color:var(--primary)">{{ $lang.translate(translations, 'completed_info') }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="120" align="right">
            <template slot-scope="scope">
              <a
                class="link-underline"
                href="#"
                @click.prevent="$router.push(`/${$lang.current().slug}/my/bookings/${scope.row.code}`)"
                >
                <span>{{ $lang.translate(translations, 'details') }}</span>
              </a>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reserves: {
      required: true
    }
  },
  data() {
    return {
      translations: {
        'es_ES': {
          details: 'VER DETALLE',
          pending_info: 'Información pendiente',
          completed_info: 'Información completa',
          missing_info: 'Completa la información pendiente',
          no_reserves_found: 'Aún no haz reservado ninguna experiencia!'
        },
        'en_EN': {
          details: 'SEE DETAILS',
          pending_info: 'Pending information',
          completed_info: 'Information completed',
          missing_info: 'Please complete the missing information',
          no_reserves_found: 'You haven’t booked any experiences yet!'
        }
      }
    }
  },
  methods: {
    rowClicked(row) {
      if(this.reserves) {
        if('status' in row) {
          if(row.status === 1) {
            this.$router.push(`/${this.$lang.current().slug}/my/bookings/${row.code}/travelers-info`)
          } else if(row.status === 2) {
            this.$router.push(`/${this.$lang.current().slug}/my/bookings/${row.code}`)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .reserve-title-responsive {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>