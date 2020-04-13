<template>
  <li
    :class="{ active : showDropdown }"
    class="header-menu__item">
    <div @click="showDropdown = !showDropdown" class="header-menu__link">
      FAQs
    </div>
    <div
      :class="{ show : showDropdown }"
      class="faqs-dropdown py-0">
      <div class="faqs-search">
        <input type="text" class="search-input" placeholder="Buscar">
        <i class="el-icon-search" />
      </div>
      <div class="faqs-container">
        <div
          v-for="n in 15"
          :key="'faq_' + n"
          class="faq-item">
          <strong class="text-sm block mb-2">{{ faqs.question }}</strong>  
          <p class="text-sm font-light">{{ faqs.answer }}</p>
        </div>
      </div>
      <div class="faqs-footer py-6 px-4 text-center">
        <p class="font-bold text-sm">¿No encuentras tu duda aqui? Escríbenos.</p>
        <el-button type="primary" plain class="mt-4">Contáctanos</el-button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
      faqs: {
          question: '¿Cómo encuentro una experiencia de kunigo?',
          answer: 'Nuestra cartera de experiencias se puede encontrar en la pestaña "Experiencias" . Allí, tenemos muchas opciones entre las que puede elegir.'
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if(this.showDropdown === true) this.showDropdown = false
    })
  }
}
</script>

<style lang="scss" scoped>
  .search-input {
    width: 100%;
    font-size: 1.2rem;
    border-bottom: 2px solid #000;
    line-height: 2;
    transition: all 0.3s;
    padding-right: 2rem;

    &:focus {
      border-color: var(--primary);

      & + i {
        color: var(--primary);
      }
    }
  }

  .faqs-search {
    position: relative;
    height: 40px;
    padding: 0 1rem;
    margin-bottom: 1rem;

    i {
      position: absolute;
      font-size: 1.5rem;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s;
    }
  }

  .faqs-container {
    padding: 1rem;
    height: calc(100% - 40px - 125px);
    overflow-y: auto;
    margin-bottom: auto;
    border-bottom: 1px solid #EBEEF5;
  }

  .faqs-footer {
    display: flex;
    height: 125px;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem;
    height: 125px;
  }

  .faqs-dropdown {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin-top: 0!important;
    padding: 1rem 0 0;
    position: absolute;
    top: (var(--header-height) + 55px);
    right: 0;
    height: calc(100vh - var(--header-height) - 55px);
    background-color: #fff;
    z-index: -999;
    transform-origin: center top;
    transform: scaleY(0);
    transition: all 0.3s;
    border: 1px solid #EBEEF5;
    cursor: default;
    border-top: 0;
    opacity: 0;

    &.show {
      transform: scaleY(1);
      opacity: 1;
      z-index: 999;
    }
  }

  .faq-item {
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0px 0px 12px rgba(174, 174, 192, 0.4);

    &:last-child {
      margin-bottom: 0;
    }
  }
</style>