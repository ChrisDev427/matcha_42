<template>
  <div>
    <div class="login--container" v-if="!$store.getters.getLoginFormSent">
      <h3>Matcha</h3>
      <form action="" class="login--form">
        <input
          v-model="inputs.userName"
          :maxlength="maxLength"
          type="text"
          :placeholder="$t('userName')"
        />
        <input
          v-model="inputs.password"
          type="password"
          :placeholder="$t('password')"
        />
        <button
        @click="submitLoginForm()"
          :class="{ 'disabled--btn': !inputs.userName || !inputs.password }"
        >
          {{ $t("connect") }}
        </button>
        <router-link
          class="forgot--password"
          :to="{ name: 'ForgotPassPage', params: {} }"
        >
          <span>
            <p>{{ $t("forgotPassword") }}</p>
          </span>
        </router-link>
      </form>
    </div>
    <LoginSuccess v-if="$store.getters.getServerResponseValue === 201"></LoginSuccess>
    <LoginFail v-if="$store.getters.getServerResponseValue === 404"></LoginFail>
    <LoginErrorPassword v-if="$store.getters.getServerResponseValue === 401 && $store.getters.getServerMessage === 'Wrong Password'"></LoginErrorPassword>
    <LoginErrorEmailVerif v-if="$store.getters.getServerResponseValue === 401 && $store.getters.getServerMessage === 'Email not verified'"></LoginErrorEmailVerif>
    <LoginErrorServer v-if="$store.getters.getServerResponseValue === 500"></LoginErrorServer>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import { useStore } from "vuex";

import LoginSuccess from "@/components/forms/LoginSuccess.vue";
import LoginErrorServer from "@/components/forms/LoginErrorServer.vue";
import LoginFail from "@/components/forms/LoginFail.vue";
import LoginErrorPassword from "@/components/forms/LoginErrorPassword.vue";
import LoginErrorEmailVerif from "@/components/forms/LoginErrorEmailVerif.vue";

export default {
  name: "LoginForm",
  components: {
    LoginSuccess,
    LoginFail,
    LoginErrorPassword,
    LoginErrorEmailVerif,
    LoginErrorServer,
  },

  setup() {
    const store = useStore();
    console.log("response ", store.getters.getServerResponseValue);
    console.log("loginState ", store.getters.getLoginState);

    store.commit("setLoginFormSent", true);
    store.commit("setServerResponseValue", 201);
    store.commit("setServerMessage", 'Email not verified');

    const maxLength = 15;

    // Traduction
    const { t } = useI18n();
    const forgotPassword = t("forgotPassword");
    const userName = t("userName");
    const password = t("password");
    const connect = t("connect");

    // inputs
    let inputs = ref({
      userName: "",
      password: "",
    });
    watch(
      inputs,
      (newValue) => {
        if (newValue.userName == "") {
          inputs.value.password = "";
        }
      },
      { deep: true }
    );

    async function submitLoginForm() {
      try {
        // Envoyer les données du formulaire au backend Node.js
        const response = await fetch("/login-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.inputs),
        });
        store.commit('setRegisterFormSent', true);
        store.commit('setServerResponseValue', response.status);
        store.commit('setServerMessage', response.massage);
       
        console.log(response);
        // Gérer la réponse du backend si nécessaire
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }

    return {
      forgotPassword,
      userName,
      password,
      connect,
      maxLength,
      inputs,
      submitLoginForm,
    };
  },
};
</script>

<style lang="scss">
.login--container {
//   border: solid 1px red;
  display: grid;
  justify-items: center;
  margin: 0px 20px 20px 20px;
  width: auto;
  height: auto;
  padding: 40px 35px 35px 35px;
  border-radius: 15px;
  background-image: linear-gradient(to right, #ff24a7af, #8890feb2);
  box-shadow: 0 0 28px rgba(0, 0, 0, 0.498);
  cursor: default;
  user-select: none;

  h3 {
    margin: -20px 0 15px 0;
    color: white;
    text-align: center;
    font-weight: 900;
    font-size: 4rem;
    text-shadow: 0 0 18px rgba(255, 255, 255, 0.438);
    @media (min-width: 200px) and (max-width: 400px) {
        font-size: 2.5rem;
    }
  }

  .login--form {
    display: grid;
    justify-items: center;
    // width: 80%;

    input {
      padding: 6px;
      margin: 10px;
      width: 100%;
      border: none;
      outline: none;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
      background-color: var(--purple-placeholder-bg);
      color: var(--purple);
    }

    input::placeholder {
      color: white;
      font-weight: 400;
    }

    // .submit--btn {

    button {
      margin-top: 25px;
      height: 45px;
      width: 180px;
      border-radius: 10px;
      cursor: pointer;
      border: none;
      color: white;
      font-weight: 600;
      font-size: 1.2rem;
      transition: all 0.4s;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.381);

      background-image: linear-gradient(to right, #ff24a7af, #8890feb2);

      &:hover {
        background-image: linear-gradient(to right, #ff24a78a, #8890fe90);
        color: var(--purple);
        transform: scale(1.1);
      }
    }
    .disabled--btn {
      opacity: 0.6;
      cursor: default;

      &:hover {
        background-image: linear-gradient(to right, #ff24a7af, #8890feb2);
        color: white;
        transform: none;
      }
    }

    // }

    .forgot--password {
      text-decoration: none;
      padding-top: 15px;
      margin-top: 15px;
      padding: 0;

      span {
        p {
          margin: 0px;
          text-align: center;
          color: var(--dark-gray);
          font-style: italic;
          transition: all 0.1s;
          cursor: pointer;

          &:hover {
            text-decoration-line: underline;
            font-style: normal;
            color: white;
            font-weight: 700;
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style>