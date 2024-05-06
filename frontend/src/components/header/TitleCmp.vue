<template>
  <div class="title--header">
    <img src="../../../public/src/feu.png" alt="" />
    <span>matcha</span>
  </div>
</template>

<script>
export default {
  name: "TitleCmp",
};
</script>

<style lang="scss">
.title--header {
  display: flex;
  // align-items: center;

  img {
    margin-left: 15px;
    margin-top: 15px;
    width: 40%;
    height: 40%;
  }

  span {
    margin-top: 20px;
    font-weight: 900;
    font-size: 3rem;

    color: transparent;
    background-image: linear-gradient(
      to right,
      #ff24a7,
      #8890fe
    ); /* Dégradé de couleur */
    -webkit-background-clip: text; /* Permet au dégradé de remplir le texte */
    background-clip: text;
  }
  @media (min-width: 200px) and (max-width: 700px) {
    img {
      width: 30%;
      height: 30%;
    }
    span {
      font-size: 2rem;
    }
  }
}
</style>