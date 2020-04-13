<template>
  <footer class="main-footer w-full px-4">
    <div class="container main-footer__container mx-auto flex flex-wrap">
      <div class="w-full lg:w-1/12 px-3 lg:px-0 pb-8 lg:pb-0">
        <a href="#"><img src="~/assets/images/mapit-iso.svg" alt="" width="35"></a>
      </div>
      <div class="w-full lg:w-7/12 mx-auto">
        <div class="flex flex-wrap">
          <div class="w-full sm:w-1/2 lg:w-1/4 px-3">
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
          <div class="w-full sm:w-1/2 lg:w-1/4 px-3 lg:px-0">
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
          <div class="w-full px-3 my-4 lg:hidden">
            <hr>
          </div>
          <div class="w-1/2 lg:w-1/4 px-3">
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
          <div class="w-1/2 lg:w-1/4 px-3">
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
      <div class="w-full lg:w-2/12 px-3">
        <ul>
          <h5 class="mb-2">Contacto</h5>
          <li class="mb-1">
            <a href="#" class="light-gray">info@mapit.pe</a>
          </li>
          <li class="mb-1">
            <a href="#" class="light-gray">(+511) 516-9988</a>
          </li>
        </ul>
        <div class="w-full px-3 my-4 lg:hidden">
          <hr>
        </div>
        <div class="w-full lg:pt-4">
         <a class="inline-flex justify-around sm:justify-start w-full">
          <div class="social-icon"><img src="~/assets/images/social/instagram.svg" alt="" width="50%"></div>
          <div class="social-icon"><img src="~/assets/images/social/facebook.svg" alt=""></div>
          <div class="social-icon"><img src="~/assets/images/social/linkedin.svg" alt=""></div>
          <div class="social-icon"><img src="~/assets/images/social/tripadvisor.svg" alt=""></div>
          <div class="social-icon"><img src="~/assets/images/social/pinterest.svg" alt="" ></div>
          </a>
        </div>
      </div>
      <div class="w-full lg:w-2/12 px-3 lg:px-0 mt-6 lg:mt-0">
        <h5 class="mb-2">Suscríbete a nuestro Blog</h5>
        <el-form>
          <el-form-item>
            <el-input class="border-0 shadow-input" style="max-width:240px" />
          </el-form-item>
          <el-button size="small" type="primary" class="shadow-primary">Enviar <i class="el-icon-right ml-1" /></el-button>
        </el-form>
      </div>
    </div>
    <hr>
    <div class="container mx-auto px-3 pt-4 lg:text-center">
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
  .social-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>