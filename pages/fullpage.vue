<template>
  <div class="fullpage-container">
    <div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
      <div class="page-1 page">
        <h1 class="part-1" v-animate="{value: 'bounceInLeft'}">vue-fullpage.js</h1>
        <h3 class="" v-animate="{value: 'bounceInLeft'}">A sigle-page scroll plugin based on vue@2.x,support for mobile and PC .</h3>
        <div>
          <p class="part-1" v-animate="{value: 'bounceInRight'}">vue-fullpage</p>
        </div>
      </div>
      <div class="page-2 page">
        <h2 class="part-2" v-animate="{value: 'bounceInRight'}">Easy to use plugin</h2>
      </div>
      <div class="page-3 page">
        <h2 class="" v-animate="{value: 'bounceInTop'}">Working On Tablets</h2>
        <h3 class="" v-animate="{value: 'bounceInBotton'}">Designed to fit different screen sizes as well as tablet and mobile devices. </h3>
        <p class="part-3" v-animate="{value: 'bounceInLeft', delay: 0}">vue-fullpage</p>
        <p class="part-3" v-animate="{value: 'bounceInRight', delay: 300}">vue-fullpage</p>
        <p class="part-3" v-animate="{value: 'bounceInDown', delay: 600}">vue-fullpage</p>
        <p class="part-3" v-animate="{value: 'zoomInDown', delay: 900}">vue-fullpage</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .fullpage-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .page {
    display: block;
    text-align: center;
    font-size: 26px;
    color: #eee;
  }
  .page-1 {
    padding-top: 100px;
    background: #1bbc9b;
  }
  .page-2 {
    padding-top: 100px;
    background-color: rgb(75, 191, 195);
  }
  .page-3 {
    padding-top: 50px;
    background: #aabbcc;
  }
  h3,
  p {
    font-size: 16px;
  }
  .button-group {
    position: absolute;
    top: 30px;
    left: 30px;
    z-index: 9;
  }
  .button-group button {
    display: inline-block;
    margin: 10px;
    color: #000;
    background: #fff;
    background: rgba(255, 255, 255, .5);
    -webkit-border-radius: 10px;
    border-radius: 10px;
    padding: 9px 18px;
    border: none;
    outline: none;
  }
  .button-group button.active {
    background: rgba(0, 0, 0, .5);
    color: #fff;
  }
</style>
