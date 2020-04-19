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
      baseUrl: process.env.baseUrl
    }
  },
  mounted() {
    const visanet = document.createElement('script')
    visanet.src="https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true"
    // visanet.src="https://static-content.vnforapps.com/v2/js/checkout.js"
    visanet.setAttribute('data-sessiontoken', this.sessionToken)
    visanet.setAttribute('data-channel', 'web')
    visanet.setAttribute('data-merchantid', this.merchantId)
    visanet.setAttribute('data-merchantlogo', this.baseUrl + '/images/logo-checkout.png')
    visanet.setAttribute('data-formbuttoncolor', '#37d7d7')
    visanet.setAttribute('data-cardholdername', this.firstname)
    visanet.setAttribute('data-cardholderlastname', this.lastname)
    visanet.setAttribute('data-purchasenumber', this.purchaseNumber)
    visanet.setAttribute('data-amount', this.amount)
    visanet.setAttribute('data-cardholderemail', this.email)
    visanet.setAttribute('data-expirationminutes', '10')
    visanet.setAttribute('data-timeouturl', '/timeout')

    document.getElementById('visanet-form').appendChild(visanet)
  }
}
</script>
