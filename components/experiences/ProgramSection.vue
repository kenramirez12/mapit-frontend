<template>
  <div id="program-section" class="experience-container py-6 pb-super">
    <div class="container mx-auto px-4">
      <div class="activities py-6 position-relative">
        <h3 class="text-6xl font-light mb-6 pb-6">Programa</h3>
        <div class="flex flex-wrap">
          <div class="w-5/12">
            <div class="program mb-6 pb-6">
              <span class="text-2xl">HORARIOS DE INICIO</span>
              <div class="bg-primary rounded-lg py-2 px-4 mt-3">
                <div class="flex flex-wrap w-full py-3 px-2 text-sm">
                  <div class="flex-1 text-center"><span>Lunes</span></div>
                  <div class="flex-1 text-center"><span>Martes</span></div>
                  <div class="flex-1 text-center"><span>Miércoles</span></div>
                  <div class="flex-1 text-center"><span>Jueves</span></div>
                  <div class="flex-1 text-center"><span>Viernes</span></div>
                  <div class="flex-1 text-center"><span>Sábado</span></div>
                  <div class="flex-1 text-center"><span>Domingo</span></div>
                </div>
                <div class="flex flex-wrap w-full bg-white py-1 px-2 rounded-lg shadow mb-3 text-gray-600 font-light text-sm">
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span></span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                </div>
                <div class="flex flex-wrap w-full bg-white py-1 px-2 rounded-lg shadow mb-3 text-gray-600 font-light text-sm">
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span></span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                </div>
                <div class="flex flex-wrap w-full bg-white py-1 px-2 rounded-lg shadow mb-3 text-gray-600 font-light text-sm">
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span></span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                  <div class="flex-1 text-center"><span>8am</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-6/12">
            <div class="itinerary">
              <span class="text-lg">ITINERARIO</span>
              <el-tabs
                v-model="activeDay"
                class="mt-4"
                >
                <el-tab-pane label="Día 1" name="first">
                  <div
                    v-for="n in 7"
                    :key="n"
                    :class="{ 'mt-5' : n === 1 }"
                    class="flex flex-wrap mb-5">
                    <div class="w-2/12">08:00 am</div>
                    <div class="w-10/12">Recojo del hotel y salida a Chichubamba</div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Día 2" name="second">
                  <div
                    v-for="n in 7"
                    :key="n"
                    :class="{ 'mt-5' : n === 1 }"
                    class="flex flex-wrap mb-5">
                    <div class="w-2/12">08:00 am</div>
                    <div class="w-10/12">Llegada a la comunidad Chichubamba</div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Día 3" name="third">
                  <div
                    v-for="n in 7"
                    :key="n"
                    :class="{ 'mt-5' : n === 1 }"
                    class="flex flex-wrap mb-5">
                    <div class="w-2/12">08:00 am</div>
                    <div class="w-10/12">Primer taller: Moldea y pinta cerámicas</div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="w-6/12">
            <img src="~/assets/images/itinerary-img.jpg" class="s" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeDay: 'first'
    }
  }
}
</script>

<style lang="scss">
  .el-tabs__item {
    border: 1px solid var(--primary);
    border-radius: .3rem;
    padding-left: .5rem !important;
    padding-right: .5rem !important;
    height: 46px;
    line-height: 46px;
    color: #000;
    transition: all 0.3s;

    &:not(:last-child) {
      margin-right: 1rem;
    }

    &.is-active {
      background-color: var(--primary);
      color: #fff;
    }
  }

  .el-tabs__nav-wrap::after,
  .el-tabs__active-bar {
    display: none;
  }
</style>