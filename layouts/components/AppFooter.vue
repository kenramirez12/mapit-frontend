<template>
  <footer class="main-footer w-full px-4 pb-2">
    <div class="container main-footer__container mx-auto flex flex-wrap">
      <div class="w-full lg:w-1/12 px-3 lg:px-0 pb-8 lg:pb-0">
        <a href="#" @click.prevent="$router.push(`/${$lang.current().slug}/`)">
          <img src="~/assets/images/mapit-iso.svg" alt="Map it" width="35">
        </a>
      </div>
      <div class="w-full lg:w-7/12 mx-auto">
        <div class="flex flex-wrap">
          <div class="w-full sm:w-1/2 lg:w-1/4 px-3">
            <ul>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/experiences`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/experiences`)">
                  {{ $lang.translate(translations, 'experiences') }}
                </a>
              </li>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/destinations`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/destinations`)">
                  {{ $lang.translate(translations, 'destinations') }}
                </a>
              </li>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/contact`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/contact`)">
                  {{ $lang.translate(translations, 'help') }}
                </a>
              </li>
              <li class="mb-1">
                <a href="https://medium.com/map-it-blog" target="_blank">Blog</a>
              </li>
            </ul>
          </div>
          <div class="w-full sm:w-1/2 lg:w-1/4 px-3 lg:px-0">
            <ul>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/faqs`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/faqs`)">
                  FAQs
                </a>
              </li>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/terms-and-conditions`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/terms-and-conditions`)">
                  {{ $lang.translate(translations, 'terms') }}
                </a>
              </li>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/privacy-policy`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/privacy-policy`)">
                  {{ $lang.translate(translations, 'policies') }}
                </a>
              </li>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/complaints-book`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/complaints-book`)">
                  {{ $lang.translate(translations, 'claim') }}
                </a>
              </li>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/corporativo`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/corporativo`)">
                  {{ $lang.translate(translations, 'business') }}
                </a>
              </li>
            </ul>
          </div>
          <div class="w-full px-3 my-4 lg:hidden">
            <hr>
          </div>
          <div class="w-1/2 lg:w-1/4 px-3">
            <ul>
              <h5 class="mb-2">
                <a
                  :href="`/${$lang.current().slug}/about`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/about`)">
                  {{ $lang.translate(translations, 'about') }}
                </a>
              </h5>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/about#why-mapit`"
                  @click.prevent="$router.push({
                    path: `/${$lang.current().slug}/about`,
                    hash: 'why-mapit'
                  })"
                  class="light-gray">
                  {{ $lang.translate(translations, 'why_mapit') }}
                </a>
              </li>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/about#our-team`"
                  @click.prevent="$router.push({
                    path: `/${$lang.current().slug}/about`,
                    hash: 'our-team'
                  })"
                  class="light-gray">
                  {{ $lang.translate(translations, 'team') }}
                </a>
              </li>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/about#social-impact`"
                  @click.prevent="$router.push({
                    path: `/${$lang.current().slug}/about`,
                    hash: 'social-impact'
                  })"
                  class="light-gray">
                  {{ $lang.translate(translations, 'impact') }}
                </a>
              </li>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/about#wisers`"
                  @click.prevent="$router.push({
                    path: `/${$lang.current().slug}/about`,
                    hash: 'wisers'
                  })"
                  class="light-gray">
                  Wisers
                </a>
              </li>
            </ul>
          </div>
          <div class="w-1/2 lg:w-1/4 px-3">
            <ul>
              <h5 class="mb-2">
                <a
                  :href="`/${$lang.current().slug}/how-it-works`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/how-it-works`)">
                  {{ $lang.translate(translations, 'how_it_works') }}
                </a>
              </h5>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/how-it-works/travelers`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/how-it-works/travelers`)"
                  class="light-gray">
                  {{ $lang.translate(translations, 'for_travelers') }}
                </a>
              </li>
              <li class="mb-1">
                <a
                  :href="`/${$lang.current().slug}/how-it-works/host`"
                  @click.prevent="$router.push(`/${$lang.current().slug}/how-it-works/host`)"
                  class="light-gray">
                  {{ $lang.translate(translations, 'for_hosts') }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-2/12 px-3">
        <ul>
          <h5 class="mb-2">
            <a
              :href="`/${$lang.current().slug}/contact`"
              @click.prevent="$router.push(`/${$lang.current().slug}/contact`)">
              {{ $lang.translate(translations, 'contact') }}
            </a>
          </h5>
          <li class="mb-1">
            <a href="mailto:info@mapit.pe" target="_blank" class="light-gray">info@mapit.pe</a>
          </li>
          <li class="mb-1">
            <a href="tel:+51977319968" target="_blank" class="light-gray">(+51) 9773 19968</a>
          </li>
        </ul>
        <div class="w-full px-3 my-4 lg:hidden">
          <hr>
        </div>
        <div class="w-full lg:pt-4">
          <div class="inline-flex justify-around sm:justify-start w-full">
          <a href="http://instagram.com/experiencemapit" target="_blank" class="social-icon"><img src="~/assets/images/social/instagram.svg" alt="" width="50%"></a>
          <a href="https://www.facebook.com/experiencemapit" target="_blank" class="social-icon"><img src="~/assets/images/social/facebook.svg" alt=""></a>
          <a href="https://www.linkedin.com/company/mapitperu" target="_blank" class="social-icon"><img src="~/assets/images/social/linkedin.svg" alt=""></a>
          <a href="https://www.tripadvisor.com/Attraction_Review-g294314-d16659696-Reviews-Map_It_Peru-Cusco_Cusco_Region.html" target="_blank" class="social-icon"><img src="~/assets/images/social/tripadvisor.svg" alt=""></a>
          <a href="https://www.pinterest.com/experiencemapit/" target="_blank" class="social-icon"><img src="~/assets/images/social/pinterest.svg" alt="" ></a>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-2/12 px-3 lg:px-0 mt-6 lg:mt-0">
        <h5 class="mb-2">
          {{ $lang.translate(translations, 'subscribe') }}
        </h5>
        <SubscribeForm />
      </div>
    </div>
    <hr>
    <div class="container mx-auto px-3 pt-4 lg:text-center">
      <span class="light-gray">&copy; {{ currentYear }} MAP IT,Inc. All rights reserved.</span>
    </div>
  </footer>
</template>

<script>
import SubscribeForm from '@/layouts/components/SubscribeForm'

export default {
  components: {
    SubscribeForm
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      translations: {
        es_ES: {
          experiences: 'Experiencias',
          destinations: 'Destinos',
          help: 'Ayuda',
          blog: 'Blog',
          terms: 'Términos y condiciones',
          policies: 'Políticas de Privacidad',
          claim: 'Libro de reclamaciones',
          about: 'Nosotros',
          why_mapit: '¿Por qué MAP IT?',
          team: 'Nuestro equipo',
          impact: 'Impacto social',
          how_it_works: 'Cómo funciona',
          contact: 'Contáctanos',
          subscribe: 'Suscríbete a nuestro Blog',
          for_travelers: 'Para Viajeros',
          for_hosts: 'Para Anfitriones',
          business: 'Corporativo'
        },
        en_EN: {
          experiences: 'Experiences',
          destinations: 'Destinations',
          help: 'Help',
          blog: 'Blog',
          terms: 'Terms and Conditions',
          policies: 'Privacy Policy',
          claim: 'Complaints book',
          about: 'About Us',
          why_mapit: 'Why MAP IT?',
          team: 'Our Team',
          impact: 'Social Impact',
          how_it_works: 'How it works',
          contact: 'Contact Us',
          subscribe: 'Sign up for our blog:',
          for_travelers: 'For Travelers',
          for_hosts: 'For Hosts',
          business: 'Corporate'
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .main-footer {
    background: #fafafa;
    // padding: 1rem 0;
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
