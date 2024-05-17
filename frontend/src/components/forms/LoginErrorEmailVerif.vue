<template>
  <div class="login--error--email--container fade-In">
    <div class="text">
      <h3>{{ $t("errorTitle") }}</h3>
      <p
        id="sub--title"
        v-html="replace_newLine_to_br_tags($t('emailNotVerifiedText'))"
      ></p>
    </div>
    <div class="return--btn" :to="{ name: 'LoginPage', params: {} }">
      <span
        @click="
          $store.commit('setIsLoginFormSent', false);
          $store.commit('setServerMessage', '');
        "
        ><i class="fa-solid fa-circle-arrow-left"></i
      ></span>
    </div>
    <div class="send--email--verif">
      <span :class="{ 'hide': reSendEmailClicked }" id="btn"><p @click="sendEmail()">{{ $t("reSendEmail") }}</p></span>
      <span 
        :class="{ 'hide': !reSendEmailClicked }" 
        class="fade-In" 
        id="serverResponse"><p>Email Sent</p></span>
    </div>
  </div>
</template>
  
  <script>
import { useI18n } from "vue-i18n";
import { replace_newLine_to_br_tags } from "@/libft/libft.js";
import {ref} from 'vue'
export default {
  name: "RegisterErrorEmailVerif",
  props: {
    username: String,
  },

  setup(props) {
    const { t } = useI18n();
    // Utilisation de la fonction de traduction
    const errorTitle = t("errorTitle");
    const emailNotVerifiedText = t("emailNotVerifiedText");
    const reSendEmail = t("reSendEmail");

    const reSendEmailClicked = ref(false);
    async function sendEmail() {
      console.log("reSendEmail function ", props.username);
      reSendEmailClicked.value = true;
      // const formData = {
      //   username: props.username
      // };
      // try {
      //   // Envoyer les données du formulaire au backend Node.js
      //   const response = await fetch("/reSendEmail", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //   });
      //   const responseData = await response.json();
      //   console.log(responseData);
      //   // switch (response.status) {
      //   //   case 200:

      //   //     break;
      //   //   case 400:

      //   //     break;
      //   //   case 404:

      //   //     break;
      //   //   case 503:

      //   //     break;
      //   // }
      // } catch (error) {
      //   console.error("Error reSendEmail:", error);
      // }
    }
 
    return {
      errorTitle,
      emailNotVerifiedText,
      reSendEmail,
      replace_newLine_to_br_tags,
      sendEmail,
      reSendEmailClicked,
     
    };
  },
  
};
</script>
  
  <style lang=scss>
.login--error--email--container {
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
      width: 80%;
      font-weight: 400;
      color: white;
      text-align: center;
      padding: 10px;
      font-size: 1rem;

      // font-size: calc(min(1vw + 1.1vh, 15px));
      margin: 0 auto 0px auto;
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
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      color: white;
      transition: all ease-in-out 0.3s;
      &:hover {
        color: var(--light-pink);
      }
    }
  }

  .send--email--verif {
    margin: 0 auto 15px auto;
    #btn {
      display: grid;
      justify-content: center;
      p {
        width: fit-content;
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
          transform: scale(1.05);
        }
      }
    }

    #serverResponse {
      display: grid;
      justify-content: center;
      p {
        width: fit-content;
        margin: 0px;
        font-weight: 900;
        text-align: center;
        color: green;
        transition: all 0.1s;
      }
    }
  }
  .hide {
    display: none !important;
  }
}
</style>