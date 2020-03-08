<template>
  <footer class="main-footer w-full px-4">
    <div class="container main-footer__container mx-auto flex flex-wrap">
      <div class="w-1/12">
        <a href="#"><img src="~/assets/images/mapit-iso.svg" alt="" width="35"></a>
      </div>
      <div class="w-7/12 mx-auto">
        <div class="flex flex-wrap">
          <div class="w-1/4 px-3">
            <ul>
              <li class="mb-1">
                <a href="#">Experiences</a>
              </li>
              <li class="mb-1">
                <a href="#">Destinations</a>
              </li>
              <li class="mb-1">
                <a href="#">Ayuda</a>
              </li>
              <li class="mb-1">
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div class="w-1/4">
            <ul>
              <li class="mb-1">
                <a href="#">FAQs</a>
              </li>
              <li class="mb-1">
                <a href="#">Términos y condiciones</a>
              </li>
              <li class="mb-1">
                <a href="#">Políticas de Privacidad</a>
              </li>
              <li class="mb-1">
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div class="w-1/4 px-3">
            <ul>
              <h5 class="mb-2">About Us</h5>
              <li class="mb-1">
                <a href="#" class="text-gray-500">Nuestro equipo</a>
              </li>
              <li class="mb-1">
                <a href="#" class="text-gray-500">Puntos sociales</a>
              </li>
              <li class="mb-1">
                <a href="#" class="text-gray-500">Impacto social</a>
              </li>
              <li class="mb-1">
                <a href="#" class="text-gray-500">Host</a>
              </li>
            </ul>
          </div>
          <div class="w-1/4 px-3">
            <ul>
              <h5 class="mb-2">Cómo funciona</h5>
              <li class="mb-1">
                <a href="#" class="text-gray-500">Travelers</a>
              </li>
              <li class="mb-1">
                <a href="#" class="text-gray-500">Host</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="w-2/12 px-3">
        <ul>
          <h5 class="mb-2">Contacto</h5>
          <li class="mb-1">
            <a href="#" class="text-gray-500">info@mapit.pe</a>
          </li>
          <li class="mb-1">
            <a href="#" class="text-gray-500">(+511) 516-9988</a>
          </li>
        </ul>
      </div>
      <div class="w-2/12">
        <h5 class="mb-2">Subscribete a nuestro Blog</h5>
        <el-form>
          <el-input class="mb-2 border-0 shadow-lg"></el-input>
          <el-button size="small" type="primary">Enviar <i class="el-icon-right ml-1" /></el-button>
        </el-form>
      </div>
    </div>
    <hr>
    <div class="container pt-4">
      <span class="text-gray-400">&copy; {{ currentYear }} MAP IT,Inc. All rights reserved.</span>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
  .main-footer {
    background: #fafafa;
    padding: 1rem 0;
    font-size: 90%;

    &__container {
      padding-top: 3rem;
      padding-bottom: 3rem;
    }
  }
</style>