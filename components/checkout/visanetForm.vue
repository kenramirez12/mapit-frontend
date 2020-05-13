<template>
  <form
    id="visanet-form"
    :action="`${apiUrl}/payments/${paymentId}/callback`"
    method="post"
    style="display:none" />
</template>

<script>
export default {
  props: [
    'paymentId',
    'sessionToken',
    'merchantId',
    'firstname',
    'lastname',
    'purchaseNumber',
    'amount',
    'email'
  ],
  data() {
    return {
      apiUrl: process.env.apiUrl,
      baseUrl: process.env.baseUrl,
      visanetEnv: process.env.visanetEnv,
      devVisanetForm: process.env.devVisanetForm,
      prodVisanetForm: process.env.prodVisanetForm
    }
  },
  mounted() {
    const visanet = document.createElement('script')
    visanet.src = this.visanetEnv === 'dev' ? this.devVisanetForm : this.prodVisanetForm
    // console.log('visanetEnv', visanet.src)
    // console.log('sessionToken', this.sessionToken)
    // console.log('MercantId', this.merchantId)
    // console.log('purchaseNumber', this.purchaseNumber)
    // console.log('amount', this.amount)
    visanet.setAttribute('data-sessiontoken', this.sessionToken)
    visanet.setAttribute('data-channel', 'web')
    visanet.setAttribute('data-merchantid', this.merchantId)
    visanet.setAttribute('data-merchantlogo', this.baseUrl + '/images/logo-checkout.png')
    visanet.setAttribute('data-formbuttoncolor', '#37d7d7')
    visanet.setAttribute('data-cardholdername', this.firstname)
    visanet.setAttribute('data-cardholderlastname', this.lastname)
    visanet.setAttribute('data-purchasenumber', this.purchaseNumber)
    visanet.setAttribute('data-amount', this.amount.toFixed(2))
    visanet.setAttribute('data-cardholderemail', this.email)
    visanet.setAttribute('data-expirationminutes', '10')
    visanet.setAttribute('data-timeouturl', `${this.baseUrl}/${this.$lang.current().slug}/timeout`)

    document.getElementById('visanet-form').appendChild(visanet)
    this.tryClickVisanet()
  },
  methods: {
    tryClickVisanet() {
      let btnAppear = false
      let btnClicked = false
      setInterval(() => {
        const btn = document.querySelector('.start-js-btn')
        if(btn) {
          if(btnAppear && !btnClicked) {
            this.triggerClickVisanet()
            btnClicked = true
          } else {
            btnAppear = true
          }
        }
      }, 500);
    },
    triggerClickVisanet() {
      const btn = document.querySelector('.start-js-btn')
      setTimeout(() => {
        btn.click()
      }, 1000);
    }
  }
}
</script>
