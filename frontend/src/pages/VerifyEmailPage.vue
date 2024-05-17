<template>  
    <div class="email--verif--container fade-In">
      <h1>{{$t('emailVerified')}}</h1>
    </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  name: "VerifyEmailPage",

  setup() {
    const { t } = useI18n();
    const emailVerified = t("emailVerified");
    
    return { emailVerified }
  }
};
</script>

<style lang="scss">
.email--verif--container {
  height: 100vh;
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    text-align: center;
    font-size: 3rem;
    color: white;
    @media (max-width: 600px) {
      font-size: 2rem;
    }
  }
}
</style>