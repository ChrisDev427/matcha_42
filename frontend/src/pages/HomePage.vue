<template>
  <div class="home">
    <div class="main--title fade-In" @onclick="fadeOutTitle">
      <h1>swipe right,</h1>
      <h1>match,</h1>
      <h1 id="date">date !</h1>
    </div>
    <router-link
      class="create--account--btn"
      :to="{ name: 'RegisterPage', params: {} }"
    >
      <span>{{ $t("accountCreate_btn") }}</span>
    </router-link>
  </div>

</template>

<script>
import { useI18n } from "vue-i18n";
import { onMounted, onUnmounted } from "vue";

export default {
  name: "HomePage",

  setup() {
    const { t } = useI18n();
    // Utilisation de la fonction de traduction
    const accountCreate = t("accountCreate");

    let ws;

    // Initialisation de WebSocket
    function initWebSocket() {
      ws = new WebSocket('ws://localhost:8080/?id=663e2005f17c31d7d4ddde8e');

      ws.onopen = function() {
    console.log('Connection is open ...');
    ws.send('Hello Server!');
};

ws.onmessage = function(messageEvent) {
    console.log('Server says: ' + messageEvent.data);
};

ws.onclose = function() {
    console.log('Connection is closed.');
};

    }

    // Nettoyer et fermer la connexion WebSocket lors du démontage du composant
    function cleanupWebSocket() {
      if (ws) {
        ws.close();
      }
    }

    // Exécuter initWebSocket au montage et cleanupWebSocket au démontage
    onMounted(initWebSocket);
    onUnmounted(cleanupWebSocket);

    return { accountCreate };
  },
};
</script>


<style lang="scss" scoped>
.home {

  display: grid;
  align-items: center;
  justify-content: center;
  height: 100vh;
  user-select: none;

  .main--title {
    // margin-top: 80px;
    cursor: default;
    height: fit-content;
    margin-top: 50px;
    h1 {
      display: grid;
      justify-content: center;
      color: white;
      text-transform: capitalize;
      font-size: calc(min(5vw + 4.5vh, 150px));
      font-weight: 500;
      margin: 15px;
    }

    #date {
      font-weight: 900;
      text-transform: uppercase;
    }
    @media (min-width: 200px) and (max-width: 700px) {
      margin-top: 100px;


    }
  }

  .create--account--btn {
    justify-self: center;
    text-decoration: none;
    height: fit-content;
    z-index: 1200;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 200px;
      border-radius: 15px;

      color: rgb(255, 255, 255);

      background-image: linear-gradient(to right, #ff24a7, #8890fe);
      /* Dégradé de couleur */

      font-size: 1.2rem;
      font-weight: 500;
      transition: all 0.4s;
      cursor: pointer;

      &:hover {
        background-image: linear-gradient(to right, #ff24a78a, #8890fe90);
        /* Dégradé de couleur */
        color: rgb(107, 12, 138);
        transform: scale(1.15);
      }
    }
  }
}
</style>