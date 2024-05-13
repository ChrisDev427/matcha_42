<template>
  <router-link class="connect-btn" :to="{ name: 'LoginPage', params: {} }">
    <span><i class="fi fi-br-sign-in-alt"></i></span>
    <!-- <span>{{ $t("connect") }}</span> -->
  </router-link>
</template>

<script>
export default {
  name: "ConnectBtn",
};
</script>

<style lang=scss>
.connect-btn {
  text-decoration: none;
  display: flex;
  justify-content: center;
  margin: 0 10px 0 10px;

  span {
    display: grid;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 40px;
    border-radius: 6px;
    background-image: linear-gradient(to right, #ff24a7, #8890fe);
    cursor: pointer;
    user-select: none;
    opacity: 1;
    transition: all 0.3s;
    i {
      display: grid;
      align-items: center;
      font-size: 1.8rem;
      color: white;
      margin-top: 1px;
    }

    &:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }

  @media (min-width: 200px) and (max-width: 700px) {
    margin: 10px 10px 0px 10px;

    span {
      width: 50px;
      height: 40px;

      i {
        font-size: 1.6rem;
      }
    }
  }
}
</style>