<template>
  <div class="disconnect-btn" @click="logout()">
    <span><i class="fa-solid fa-right-from-bracket"></i></span>

    <!-- <span><i class="fi fi-bs-sign-out-alt"></i></span> -->
    <!-- <span>{{ $t("connect") }}</span> -->
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "DisconnectBtn",

  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = () => {
      store.commit("setIsLoading", true);
      console.log("logout function");

      setTimeout(() => {
        store.commit("setIsConnected", false);
        store.commit("setUserName", "");
        localStorage.clear();
        store.getters.getWebSocket.close();
        router.push({ name: "HomePage" });
        store.commit("setIsLoading", false);
      }, 3000);
    };

    return {
      logout,
    };
  },
};
</script>

<style lang="scss">
.disconnect-btn {
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
    font-size: 1.8rem;
    color: white;
    margin-top: 1px;

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
      font-size: 1.6rem;
    }
  }
}
</style>
