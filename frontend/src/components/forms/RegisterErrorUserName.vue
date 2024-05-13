<template>
  <div class="register--fail--username--container fade-In">
    <div class="text">
      <h3>{{ $t("errorTitle") }}</h3>
      <p
        id="sub--title"
        v-html="replace_newLine_to_br_tags($t('registrationErrorUsernameText'))"
      ></p>
    </div>
    <div class="return--btn" :to="{ name: 'LoginPage', params: {} }">
      <span
        ><i
          class="fi fi-br-sign-in-alt"
          @click="
            $store.commit('setServerResponseValue', null),
              $store.commit('setRegisterFormSent', false),
              $store.commit('setServerMessage', '')
          "
        ></i
      ></span>
    </div>
  </div>
</template>
  
  <script>
import { useI18n } from "vue-i18n";
import { replace_newLine_to_br_tags } from "@/libft/libft.js";

export default {
  name: "RegisterErrorUsername",

  setup() {
    const { t } = useI18n();
    // Utilisation de la fonction de traduction
    const errorTitle = t("errorTitle");
    const registrationErrorUsernameText = t("registrationErrorUsernameText");

    return {
      errorTitle,
      registrationErrorUsernameText,
      replace_newLine_to_br_tags,
    };
  },
};
</script>
  
  <style lang=scss>
.register--fail--username--container {
  position: relative;
  height: auto;
  width: auto;
  max-width: 600px;
  margin: 25px;
  padding: 10px 20px 20px 20px;
  border-radius: 15px;
  background-image: linear-gradient(to right, #ff24a7af, #8890feb2);
  box-shadow: 0 0 28px rgba(0, 0, 0, 0.498);
  cursor: default;
  user-select: none;

  .text {
    h3 {
      margin: 0;
      padding: 0;
      color: white;
      text-align: center;
      font-weight: 900;
      text-transform: capitalize;
      font-size: calc(min(3vw + 2vh, 50px));
      text-shadow: 0 0 18px rgba(255, 255, 255, 0.438);
    }
    p {
      // border: solid 1px white;
      width: 80%;
      font-weight: 400;
      color: white;
      text-align: center;
      padding: 10px;
      font-size: calc(min(1vw + 1.1vh, 15px));
      margin:  0 auto 20px auto;
      word-wrap: break-word;
    }
  }
  .return--btn {
    text-decoration: none;

    position: absolute;
    left: 15px;
    bottom: 15px;

    span {
      cursor: pointer;
      user-select: none;

      i {
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(180deg);

        font-size: 1.8rem;
        color: white;
        transition: all ease-in-out 0.3s;
        &:hover {
          color: var(--light-pink);
        }
      }
    }
  }
}
</style>