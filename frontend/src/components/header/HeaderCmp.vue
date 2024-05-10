<template>
  <div
    class="header"
    :style="{ opacity: headerOpacity }"
    :class="{ 'hidden-element': headerOpacity === 0 }"
  >
    <TitleCmp></TitleCmp>

    <div class="buttons--container">
      <div class="buttons">
        <LangSelectBtn></LangSelectBtn>
        <template v-if="connectionState">
          <ProfileBtn></ProfileBtn>
        </template>
        <ConnectBtn></ConnectBtn>
      </div>
    </div>
  </div>
</template>

<script>
import TitleCmp from "./TitleCmp.vue";
import LangSelectBtn from "./LangSelectBtn.vue";
import ConnectBtn from "./ConnectBtn.vue";
import ProfileBtn from "./ProfileBtn.vue";
import { useStore } from "vuex";

// import { mapGetters } from "vuex";

export default {
  name: "HeaderCmp",
  components: {
    TitleCmp,
    LangSelectBtn,
    ConnectBtn,
    ProfileBtn,
  },
  data() {
    const store = useStore();
    return {
      headerOpacity: 1,
      connectionState: store.getters.getConnectionState,
    };
  },
  //   setup() {

  //   },
  //   computed: {
  //     ...mapGetters(["getConnectionState"]),
  //   },

  mounted() {
    window.addEventListener("scroll", this.handleScroll); // Ajoute un écouteur d'événements pour le défilement de la page lors de l'initialisation du composant
  },
  methods: {
    handleScroll() {
      // Obtenez la position verticale de défilement de la fenêtre
      const scrollPosition = window.scrollY;

      // Calculer l'opacité en fonction de la position de défilement
      // Par exemple, vous pouvez réduire progressivement l'opacité à mesure que vous faites défiler vers le haut
      this.headerOpacity = 1 - scrollPosition / 500; // 500 est la valeur de défilement à partir de laquelle vous voulez que le header soit complètement transparent

      // Assurez-vous que l'opacité est toujours comprise entre 0 et 1
      this.headerOpacity = Math.min(Math.max(this.headerOpacity, 0), 1);
    },
  },
};
</script>

<style lang=scss>
.header {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 200px;
  margin: 0px;
  display: flex;
  align-items: top;
  justify-content: space-between;
  z-index: 1100;
  /* Ajoutez le dégradé noir transparent */
  background-image: linear-gradient(
    to bottom,
    rgb(0, 0, 0) 20%,
    rgba(0, 0, 0, 0)
  );

  .buttons--container {
    display: flex;
    align-items: top;
    margin-top: 10px;

    .buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 10px;
      height: fit-content;
      width: auto;
    }

    @media (min-width: 200px) and (max-width: 700px) {
      align-items: top;

      .buttons {
        margin-right: 10px;
        margin-top: 0px;
        display: grid;
        align-items: center;
      }
    }
  }
}
</style>