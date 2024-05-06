<template>
  <div class="header">
    <TitleCmp></TitleCmp>

    <div class="buttons">
      <LangSelectBtn></LangSelectBtn>
      <ConnectBtn></ConnectBtn>
    </div>
  </div>
</template>

<script>
import TitleCmp from "./TitleCmp.vue";
import LangSelectBtn from "./LangSelectBtn.vue";
import ConnectBtn from "./ConnectBtn.vue";

export default {
  name: "HeaderCmp",
  components: {
    TitleCmp,
    LangSelectBtn,
    ConnectBtn,
  },
};
</script>

<style lang=scss>
.header {
  z-index: 1000;
  width: 100%;
  height: 140px;
  margin: 0px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 1100;
  /* Ajoutez le dégradé noir transparent */
  background-image: linear-gradient(
    to bottom,
    rgb(0, 0, 0) 0%,
    rgba(0, 0, 0, 0)
  );

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;
    margin-top: 20px;
    height: 50px;
    width: 170px;

    @media (min-width: 200px) and (max-width: 700px) {
      margin-top: 15px;
    }
  }
}
</style>