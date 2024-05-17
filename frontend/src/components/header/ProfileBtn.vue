<template>
  <router-link class="profile-btn" :to="{ name: 'ProfilePage', params: {} }">
    <span><i class="fa-solid fa-user"></i></span>
    <!-- <span><i class="fi fi-br-portrait"></i></span> -->
  </router-link>
</template>

<script>
export default {
  name: "ProfileBtn",
};
</script>

<style lang=scss>
.profile-btn {
  text-decoration: none;
  display: flex;
  justify-content: center;
  margin: 0 0px 0 10px;

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
    font-size: 1.6rem;
    color: white;
    transition: ease-in-out 0.2s;
    margin-top: 1px;

    &:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }
  }

  @media (min-width: 200px) and (max-width: 700px) {
    margin: 10px 10px 0 10px;

    span {
      width: 50px;
      height: 40px;
      font-size: 1.4rem;
    }
  }
}
</style>