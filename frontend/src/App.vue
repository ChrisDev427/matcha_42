<template>
   
  <Header></Header>

  <router-view> </router-view>
  
  <Footer></Footer>
 
</template>

<script>
import Header from './components/header/HeaderCmp.vue'
import Footer from './components/footer/FooterCmp.vue'

export default {
  name: "App",
  components: {
    Header,
    Footer,
  }
};
</script>

<style lang="scss">

@import url("./style/reset.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
:root {

// --orange: rgb(219, 128, 0);
// --light-orange: rgb(212, 158, 83);
// --dark-orange:rgb(177, 128, 59);
--gray:  rgb(103, 102, 102);
--light-gray:  rgb(201, 200, 200);
--light-light-gray:  rgba(219, 219, 219, 0.381);
--pink: #ff24a7;
--dark-gray:  rgb(71, 70, 70);
}

#app {
  font-family: "Roboto", sans-serif;
  /* padding: 0px 20px; */
  background: url(../public/src/couple-bg.jpg) fixed center/cover;
  
  height: 100vh;
  // display: flex;
  // flex-direction: column;
}

</style>
