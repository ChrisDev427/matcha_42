<template>
  <div class="fade-blur-bg">

    <div class="create--account--container fade-In">
      <RegisterForm></RegisterForm>
    </div>
  </div>
</template>

<script>
import RegisterForm from '../components/forms/RegisterForm.vue';
export default {
  name: "CreateAccount",
  components: {
    RegisterForm,
  }
};
</script>

<style lang="scss">
.create--account--container {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  
 
  
  
}
</style>