<template>
  <div>
    <h1 class="text-5xl leading-tight font-light mb-8">
      {{ $lang.translate(translations, 'done') }}
    </h1>
    <p class="font-light mb-6">
      {{ $lang.translate(translations, 'copy_1') }} {{ email }}.
    </p>
    <p class="font-light mb-6">
      {{ $lang.translate(translations, 'copy_2') }}
    </p>
    <el-button
        @click="$router.push(`/${$lang.current().slug}/experiences`)"
        class="shadow-primary w-full"
        type="primary">
        {{ $lang.translate(translations, 'accept_btn') }}
      </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      translations: {
        es_ES: {
          done: '¡Listo!',
          copy_1: 'Te acabamos de enviar un correo con las instrucciones a',
          copy_2: 'Sigue las instrucciones para restablecer tu contraseña.',
          accept_btn: 'Entendido'
        },
        en_EN: {
          done: 'Done!',
          copy_1: 'We have sent you an e-mail with the instructions to reset your password to',
          copy_2: 'Follow the instructions to reset your password.',
          accept_btn: 'Got it !'
        }
      }
    }
  },
  props: {
    email: {
      type: String
    }
  }
}
</script>

<style>

</style>