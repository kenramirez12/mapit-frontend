<template>
  <div class="bg-primary py-6">
    <div class="container mx-auto my-6 py-6 px-4">
      <h2 class="text-4xl font-light text-center text-white mb-6">{{ $lang.translate(translations, 'why_mapit') }}</h2>

      <div class="w-full flex flex-wrap">
        <div class="flex-1 pt-6">
          <div class="w-100" style="height:180px">
            <img src="~/assets/images/choose-us-02.svg" class="mx-auto" style="max-height:100%">
          </div>
          <div class="d-block text-2xl text-white font-light text-center mt-4">{{ $lang.translate(translations, 'why_mapit_1') }}</div>
        </div>
        <div class="flex-1 pt-6">
          <div class="w-100" style="height:180px">
            <img src="~/assets/images/choose-us-03.svg" class="mx-auto" style="max-height:100%">
          </div>
          <div class="d-block text-2xl text-white font-light text-center mt-4">{{ $lang.translate(translations, 'why_mapit_2') }}</div>
        </div>
        <div class="flex-1 pt-6">
          <div class="w-100" style="height:180px">
            <img src="~/assets/images/choose-us-04.svg" class="mx-auto" style="max-height:100%">
          </div>
          <div class="d-block text-2xl text-white font-light text-center mt-4">{{ $lang.translate(translations, 'why_mapit_3') }}</div>
        </div>
        <div class="flex-1 pt-6">
          <div class="w-100" style="height:180px">
            <img src="~/assets/images/choose-us-01.svg" class="mx-auto" style="max-height:100%">
          </div>
          <div class="d-block text-2xl text-white font-light text-center mt-4">{{ $lang.translate(translations, 'why_mapit_4') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    translations: {
      type: Object,
      required: true
    }
  }
}
</script>
