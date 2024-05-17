<template>
  <div class="fade-In">
    <!-- <div class="fade-blur-bg">
      <div class="overlay"></div>
      
    </div>
    <div class="centered-content">
      <img src="../public/src/feu.png" alt="Your Image" class="animated-image" />
    </div> -->
    <LoadingStartApp v-if="$store.getters.getIsLoadingStartApp"></LoadingStartApp>
    <LoadingCmp v-if="$store.getters.getIsLoading"></LoadingCmp>
    <div v-if="$store.getters.getIsReady">
     
        <Header></Header>
        <router-view> </router-view>
        <Footer></Footer>
     
    </div>
  </div>
</template>

<script>
import Header from "./components/header/HeaderCmp.vue";
import Footer from "./components/footer/FooterCmp.vue";
import LoadingStartApp from "./components/LoadingStartApp.vue";
import LoadingCmp from "./components/LoadingCmp.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";

// import { useRouter } from 'vue-router';
// import { useStore } from "vuex";
// import { computed } from "vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    LoadingStartApp,
    LoadingCmp,
  },

  setup() {

    const store = useStore();
    onMounted(() => {

      store.commit('setIsLoadingStartApp', true);
      setTimeout(() => {
        if (localStorage.getItem('accessToken')) {
          console.log('AAAAA');
          checkAccessToken();
          store.commit('setIsLoadingStartApp', false);

        } else {
          console.log('BBBBB');

          store.commit('setIsReady', true);
          store.commit('setIsLoadingStartApp', false);
        }
      }, 2000);

      });

      // function initWebSocket() {

      //   const ws = new WebSocket('ws://localhost:8080/?id=' + localStorage.getItem('userId'));
      //   ws.onopen = function () {
      //     console.log('Connection is open ...');
      //     let message = JSON.stringify({ type: 'test', userId: '', message: 'Hello Server!' });
      //     ws.send(message);
      //   };
      //   ws.onmessage = function (messageEvent) {
      //     console.log('Server says: ' + messageEvent.data);
      //   };
      //   ws.onclose = function () {
      //     console.log('Connection is closed.');
      //   };
      // }

      async function checkAccessToken() {
        console.log('check Token');

        try {
          const response = await fetch("/verifyToken", {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
          });
          const responseData = await response.json();
          if (response.status === 200) {
            console.log('check Token 200');

            if (responseData.accessToken) {
              localStorage.setItem('accessToken', responseData.accessToken)
              console.log('ACCESS Token');

            }
            // initWebSocket();
            store.dispatch('initWebSocket');

            store.commit('setIsReady', true);
            store.commit('setIsConnected', true);
            console.log('check');

          } else if (response.status >= 400) {

            store.commit('setIsReady', true);
            store.commit('setIsConnected', false);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du profil :', error);
          store.commit('setIsReady', true);
          store.commit('setIsConnected', false);
        }
      }
  }
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

// .fade-blur-bg {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 1300;
//   /* Assurez-vous que le conteneur de flou est au-dessus du reste du contenu */
//   // opacity: 0.5;
//   // background-color: rgba(0, 0, 0, 0.638);
//   animation: fadeBlur 0.3s ease-in-out forwards;
// }

// @keyframes fadeBlur {
//   0% {
//     filter: blur(0px);
//     backdrop-filter: blur(0px);
//   }

//   100% {
//     filter: blur(4px);
//     backdrop-filter: blur(4px);
//   }
// }

// .overlay {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.6);
//   /* Couleur de fond semi-transparente */
// }

// .centered-content {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   z-index: 1800;
//   /* Assurez-vous que le conteneur de flou est au-dessus du reste du contenu */
// }

// .animated-image {
//   width: 60px;
//   /* Ajustez la taille de votre image selon vos besoins */
//   height: 60px;
//   /* Ajustez la taille de votre image selon vos besoins */
//   animation: scaleAnimation 0.5s infinite alternate;
//   /* Animation de 3 secondes, infinie et alternée */
//   z-index: 100;
// }

// @keyframes scaleAnimation {
//   0% {
//     transform: scale(1);
//   }

//   100% {
//     transform: scale(1.2);
//     /* Ajustez le facteur d'échelle selon vos besoins */
//   }
// }

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
