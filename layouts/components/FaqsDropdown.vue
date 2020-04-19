<template>
  <li
    :class="{ active : showDropdown }"
    class="header-menu__item">
    <div @click="showDropdown = !showDropdown" class="header-menu__link">
      FAQs
    </div>
    <FaqsList :class="{ show : showDropdown }" />
  </li>
</template>

<script>
import FaqsList from '@/layouts/components/FaqsList'

export default {
  components: { FaqsList },
  data() {
    return {
      showDropdown: false
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if(this.showDropdown === true) this.showDropdown = false
    })
  }
}
</script>
