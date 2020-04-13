<template>
  <div class="success-container p-4">
    <img class="character character--01" src="~/assets/images/sitting-checkout-01.svg">
    <img class="character character--02" src="~/assets/images/standing-checkout-01.svg">
    <div class="success-card m-auto p-6">
      <img src="~/assets/images/include-icon.svg" class="mx-auto" width="100">
      <h3 class="success-card__title mt-6">Compra<br>exitosa</h3>
      <p class="success-card__copy my-5 mb-0">¡Gracias por reservar tu experiencia con nosotros!<br>Dentro de las próximas 24 hrs te llegará un correo de confirmación con el código de reserva y los detalles de la experiencia.</p>
      <div class="success-social py-6">
        <strong class="success-social__points">+{{ reserve.social_points }}</strong>
        <span class="success-social__label">Puntos sociales</span>
      </div>
      <el-button type="primary" class="px-6">Entendido</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reserve: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .character {
    &--01 {
      width: 18rem;
      top: 10%;
      left: 3rem;
    }

    &--02 {
      width: 16rem;
      bottom: 0;
      right: 0;
    }
  }
</style>
