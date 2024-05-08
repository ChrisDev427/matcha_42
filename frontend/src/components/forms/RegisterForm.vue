<template>
    <div class="register--container ">
        <h3>{{ $t('registerTitle') }}</h3>
        <h3 id="sub--title">{{ $t('registerSubTitle') }}</h3>
        <form action="" class="register--form">
            <input v-model="inputs.userName" :maxlength="maxLength" type="text" :placeholder="$t('userName')">
            <input v-model="inputs.firstName" :maxlength="maxLength" type="text" :placeholder="$t('firstName')">
            <input v-model="inputs.lastName" :maxlength="maxLength" type="text" :placeholder="$t('lastName')">
            <input v-model="inputs.email" type="email" placeholder="e-mail"
                :class="{ 'text-red': !validateEmail(inputs.email), 'text-green': validateEmail(inputs.email) }">
            <input v-model="inputs.password" :disabled="!inputs.emailValid"
                :class="{ 'text-green': inputs.samePassword, 'disabled--input': !inputs.emailValid }" type="password"
                :placeholder="$t('password')">
            <input v-model="inputs.repeatPassword" :disabled="!inputs.emailValid"
                :class="{ 'text-red': !inputs.samePassword, 'text-green': inputs.samePassword, 'disabled--input': !inputs.emailValid }"
                type="password" :placeholder="$t('passwordConfirm')">

            <button class="send--registration--btn"
                :class="{ 'disabled--btn': !inputs.samePassword || !inputs.emailValid || !inputs.userName || !inputs.firstName || !inputs.lastName }">{{
                    $t('send') }}</button>
        </form>
    </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref, watch } from 'vue';


export default {

    name: "RegisterForm",

    setup() {

        const maxLength = 15;


        function validateEmail(value) {

            return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value));
        }

        // Traduction ----------------------------------
        const { t } = useI18n();
        const registerTitle = t("registerTitle");
        const registerSubTitle = t("registerSubTitle");
        const userName = t("userName");
        const firstName = t("firstName");
        const lastName = t("lastName");
        const password = t("password");
        const passwordConfirm = t("passwordConfirm");
        const send = t("send");

        // Input Object --------------------------------
        let inputs = ref({

            email: '',
            emailValid: false,
            password: '',
            repeatPassword: '',
            samePassword: false,
        });

        watch(inputs, (newValue) => {

            if (newValue.email.length != 0) {

                if (!validateEmail(newValue.email)) {
                    inputs.value.emailValid = false;
                    inputs.value.password = '';
                    inputs.value.repeatPassword = '';
                    inputs.value.samePassword = false;

                } else {
                    inputs.value.emailValid = true;
                }
            }
            if (newValue.password.length != 0) {


                if (newValue.repeatPassword != inputs.value.password) {
                    inputs.value.samePassword = false;
                } else {
                    inputs.value.samePassword = true;
                }

            }



        }, { deep: true });


        return {
            registerTitle,
            registerSubTitle,
            userName,
            firstName,
            lastName,
            password,
            passwordConfirm,
            send,
            inputs,
            maxLength,
            validateEmail,
        };
    },
}
</script>

<style lang="scss">
.register--container {
    // border: solid 1px red;

    // border: solid 1px red;
    width: auto;
    height: auto;
    padding: 10px 35px 45px 35px;
    border-radius: 15px;
    background-image: linear-gradient(to right,
            #ff24a7af,
            #8890feb2);
    box-shadow: 0 0 28px rgba(0, 0, 0, 0.498);
    cursor: default;
    user-select: none;

    h3 {

        margin: 10px 0 0 0;
        color: white;
        text-align: center;
        font-weight: 900;
        text-transform: capitalize;
        font-size: calc(min(3vw + 2vh, 70px));
        text-shadow: 0 0 18px rgba(255, 255, 255, 0.438);

    }

    #sub--title {
        font-weight: 600;
        font-size: calc(min(2vw + 1.6vh, 50px));
        margin-bottom: 10px;
    }

    .register--form {
        display: grid;
        justify-items: center;

        input {
            padding: 6px;
            margin: 10px;
            width: 100%;
            border: none;
            outline: none;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
            // font-size: 1.2rem;  
            background-color: var(--purple-placeholder-bg);
            color: var(--purple);

        }

        input::placeholder {
            color: white;
            font-weight: 400;

            /* Couleur du placeholder */
        }



        .send--registration--btn {
            margin-top: 25px;

            // padding: 10px 30px 10px 30px;

            height: 45px;
            width: 180px;
            border-radius: 10px;
            border: none;
            color: white;
            font-weight: 600;
            font-size: 1.2rem;

            transition: all 0.4s;
            cursor: pointer;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.381);

            background-image: linear-gradient(to right,
                    #ff24a7af,
                    #8890feb2);

            &:hover {
                background-image: linear-gradient(to right,
                        #ff24a78a,
                        #8890fe90);
                /* Dégradé de couleur */
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

        @media (min-width: 800px) {
            width: 70%;
            margin: auto;

        }
    }

    .disabled--input {
        opacity: 0.5;
    }
}

// .disabled {
//     /* Vos styles pour le bouton désactivé */
//     opacity: 0.5; /* Par exemple, réduire l'opacité */
//     cursor: none; /* Changer le curseur */
// }</style>