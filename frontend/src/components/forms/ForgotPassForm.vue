<template>
    <div class="forgot--pass--container ">
        <h3>{{ $t('resetPassword') }}</h3>
        <p>{{ $t('resetPasswordInfo') }}</p>
        <form action="" class="forgot--pass--form">
            <input v-model="inputs.email"
                :class="{ 'text-red': !validateEmail(inputs.email), 'text-green': validateEmail(inputs.email) }"
                type="text" placeholder="e-mail">
            <button :class="{ 'disabled--btn': !inputs.emailValid }">{{ $t('send') }}</button>
        </form>
    </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref, watch } from 'vue';
import { validateEmail } from "../../libft/libft.js";

export default {
    name: "ForgotPassForm",

    setup() {
        
        // Traduction ----------------------------------
        const { t } = useI18n();
        const send = t("send");
        const resetPassword = t("resetPassword");
        const resetPasswordInfo = t("resetPasswordInfo");

        let inputs = ref({

            email: '',
            emailValid: false,
        });

        watch(inputs, (newValue) => {

            if (newValue.email.length != 0) {

                if (!validateEmail(newValue.email)) {
                    inputs.value.emailValid = false;
                } else {
                    inputs.value.emailValid = true;
                }
            }
        }, { deep: true });

        return {

            send,
            resetPassword,
            resetPasswordInfo,
            validateEmail,
            inputs,
        };
    },
}
</script>

<style lang="scss">
.forgot--pass--container {
    display: grid;
    justify-items: center;
    margin: 0px 20px 20px 20px;
    width: 370px;
    height: auto;
    padding: 40px;
    border-radius: 15px;
    background-image: linear-gradient(to right,
            #ff24a7af,
            #8890feb2);
    box-shadow: 0 0 28px rgba(0, 0, 0, 0.498);
    cursor: default;
    user-select: none;

    h3 {
        margin: -13px 0 15px 0;
        color: white;
        text-align: center;
        font-weight: 900;
        font-size: 1.9rem;
        text-transform: capitalize;
        text-shadow: 0 0 18px rgba(255, 255, 255, 0.438);
    }

    p {
        // border: solid 1px red;
        margin: -10px 0 10px 0;
        color: white;
        font-size: 0.8rem;
        font-weight: 500;
        text-align: center;
    }

    .forgot--pass--form {
        display: grid;
        justify-items: center;
        width: 80%;

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

        button {

            margin-top: 25px;
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
    }

}
</style>