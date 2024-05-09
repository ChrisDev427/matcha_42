<template>
  <div>
    <Header></Header>
    <router-view> </router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/header/HeaderCmp.vue";
import Footer from "./components/footer/FooterCmp.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
@import url("./style/reset.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

:root {
  --gray: rgb(103, 102, 102);
  --light-gray: rgb(201, 200, 200);
  --light-light-gray: rgba(219, 219, 219, 0.381);
  --light-pink: #f790ce;
  --pink: #f82ea7;
  --purple: #9336cd;
  --purple-placeholder-bg: #f1a3fcd7;
  --dark-gray: rgb(71, 70, 70);
}

#app {
  font-family: "Roboto", sans-serif;
  /* padding: 0px 20px; */
  background: url(../public/src/couple-bg.jpg) fixed center/cover;

  height: 100vh;

}

.fade-blur-bg {
  animation: fadeBlur 0.1s ease-in-out forwards;

  @keyframes fadeBlur {
    0% {
      backdrop-filter: blur(0px);
    }

    100% {
      backdrop-filter: blur(5px);
    }
  }
}

.hidden-element {
  display: none !important;
}

.fade-In {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.text-red {
  color: red !important;
}

.text-green {
  color: rgb(64, 169, 64) !important;
}


</style>
