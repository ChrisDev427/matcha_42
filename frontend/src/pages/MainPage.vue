<template>
  <div class="main--page--container">
    <section class="main--page--research">

    </section>
    <section class="main--page--profile">
      <div class="profile--container">
        <div class="profile--card">
          <img src="" alt="profile picture" />
        </div>
        <div class="profile--infos">
          <h2>Username</h2>
          <p>Age</p>
          <p>Location</p>
          <p>Tags</p>
        </div>
      </div>
    </section>
   <h1>MAIN PAGE</h1>
    </div>
</template>

<script>
export default {
    name: "MainPage",
};
</script>

<style lang="scss">
.main--page--container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  h1 {
    font-size: 5rem;
    font-weight: 900;
    color: white;
  }
}
</style>