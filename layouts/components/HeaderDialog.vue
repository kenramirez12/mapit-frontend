<template>
  <el-alert
    :class="{
      'hidden md:block' : $route.name === 'lang-experiences-id' ||
      $route.name === 'lang-experiences' || 
      $route.name === 'lang-destinations'
    }"
    class="top-bar md:text-center pt-3 pb-4"
    center>
    <p class="font-light text-black mb-0">
      {{ $lang.translate(translations, 'covid_policies') }} 
      <a
        href="#"
        @click.prevent="$router.push(`/${$lang.current().slug}/covid`)"
        class="font-medium underline">
        {{ $lang.translate(translations, 'click') }}</a>
    </p>
  </el-alert>
</template>

<script>
export default {
  data() {
    return {
      translations: {
        es_ES: {
          covid_policies: 'Sobre nuestras experiencias online y nuestra respuesta al COVID-19.',
          click: 'Clic aquí'
        },
        en_EN: {
          covid_policies: 'Learn about our online experiences and our COVID-19 response.',
          click: 'Click here'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .top-bar {
    height:55px;
    background-color:#E9FFFF;
    
    .el-alert__closebtn {
      top: 50%!important;
      transform: translateY(-50%);
      color: #6f6f6f!important;
    }
  }
</style>