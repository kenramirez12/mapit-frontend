<template>
  <div>
    <el-table v-if="!reserves" :data="[1, 2, 3, 4, 5]" :show-header="false" class="w-full">
      <el-table-column>
        <PuSkeleton
        :loading="true"
        width="100%"
        height="30px" />
      </el-table-column>
    </el-table>
    <template v-else>
      <p v-if="reserves.length === 0" class="font-light">Aún no haz reservado ninguna experiencia.</p>
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
        <el-table-column
          label="Nombre"
          width="250">
          <template slot-scope="scope">
            {{ $lang.apiTranslate(scope.row.experience.translations, 'title') }}
            <el-tooltip
            v-if="scope.row.status === 1"
            effect="dark"
            content="Completa los datos de tus acompañantes para confirmar tu reserva"
            class="requires-additional__tooltip"
            placement="top">
              <el-link
                type="warning"
                @click.prevent="$router.push(`/${$lang.current().slug}/my/reserves/${scope.row.code}/travelers-info`)"
                class="requires-additional__icon"
                icon="el-icon-warning" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="experience.destination.name"
          label="Dirección">
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
              class="font-normal border-0"
              size="small"
              @click="$router.push(`/${$lang.current().slug}/my/reserves/${scope.row.code}`)"
              >
              VER DETALLE
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    reserves: {
      required: true
    }
  }
}
</script>
