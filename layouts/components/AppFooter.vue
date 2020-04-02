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
                <a href="#">Experiencias</a>
              </li>
              <li class="mb-1">
                <a href="#">Destinos</a>
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
            </ul>
          </div>
          <div class="w-1/4 px-3">
            <ul>
              <h5 class="mb-2">About Us</h5>
              <li class="mb-1">
                <a href="#" class="light-gray">Nuestro equipo</a>
              </li>
              <li class="mb-1">
                <a href="#" class="light-gray">Puntos sociales</a>
              </li>
              <li class="mb-1">
                <a href="#" class="light-gray">Impacto social</a>
              </li>
              <li class="mb-1">
                <a href="#" class="light-gray">Host</a>
              </li>
            </ul>
          </div>
          <div class="w-1/4 px-3">
            <ul>
              <h5 class="mb-2">Cómo funciona</h5>
              <li class="mb-1">
                <a href="#" class="light-gray">Travelers</a>
              </li>
              <li class="mb-1">
                <a href="#" class="light-gray">Host</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="w-2/12 px-3">
        <ul>
          <h5 class="mb-2">Contacto</h5>
          <li class="mb-1">
            <a href="#" class="light-gray">info@mapit.pe</a>
          </li>
          <li class="mb-1">
            <a href="#" class="light-gray">(+511) 516-9988</a>
          </li>
         </ul>
        <div class="w-2/12 pt-4">
         <a class="inline-flex">
          <img class="mr-3 social" src="~/assets/images/social/instagram.svg" alt="" width="19">
          <img class="mr-3 social" src="~/assets/images/social/facebook.svg" alt="" width="24">
          <img class="mr-3 social" src="~/assets/images/social/linkedin.svg" alt="" width="24">
          <img class="mr-3 social" src="~/assets/images/social/tripadvisor.svg" alt="" width="20">
          <img class="mr-3 social" src="~/assets/images/social/pinterest.svg" alt="" width="30" >
          </a>
        </div>
      </div>
      <div class="w-2/12">
        <h5 class="mb-2">Suscríbete a nuestro Blog</h5>
        <el-form>
          <el-input class="mb-5 border-0 shadow-input" />
          <el-button size="small" type="primary">Enviar <i class="el-icon-right ml-1" /></el-button>
        </el-form>
      </div>
    </div>
    <hr>
    <div class="container pt-4">
      <span class="light-gray">&copy; {{ currentYear }} MAP IT,Inc. All rights reserved.</span>
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
  .light-gray{
    color: #9F9F9F;
  }
  .social:hover {
   cursor: pointer;
  }
</style>