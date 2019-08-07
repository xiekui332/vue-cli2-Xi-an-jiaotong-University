<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style  lang="less">
@font-face {
    font-family: 'myFont'; 
    src: url('./assets/fonts/PingFangSc.ttf'); 
    font-weight: normal;
    font-style: normal;
}
html, body{
  height: 100%;
  & /deep/ input::placeholder{
      font-size: 12px;
  }& /deep/ textarea::placeholder{
      font-size: 12px;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  
}
.pub-family{
  font-family: myFont, sans-serif;
}
.pub-css{
    background: url('./assets/img/css_sprites.png');
    background-size:440px 391px; 
}
</style>
