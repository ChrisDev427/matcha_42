<template>
  <div class="connect-btn">
    <span>{{ $t("connect") }}</span>
  </div>
</template>

<script>
export default {
  name: "ConnectBtn",
};
</script>

<style lang=scss>
.connect-btn {
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 35px;
    border-radius: 6px;
    color: rgb(255, 255, 255);
    background-image: linear-gradient(
      to right,
      #ff24a7,
      #8890fe
    ); /* Dégradé de couleur */

    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      background-image: linear-gradient(
        to right,
        #ff24a78a,
        #8890fe90
      ); /* Dégradé de couleur */
      color: rgb(107, 12, 138);
      color: rgb(101, 1, 135);
    }
    @media (min-width: 200px) and (max-width: 700px) {
      width: 95px;
      height: 30px;
      font-size: 1rem;
    }
  }
}
</style>