<template>
    <div class="login--container ">
        <h3>Matcha</h3>
        <form action="" class="login--form">
            <input v-model="inputs.userName" :maxlength="maxLength" type="text" :placeholder="$t('userName')">
            <input v-model="inputs.password" type="password" :placeholder="$t('password')">
            <!-- <div class="submit--btn"> -->
            <button :class="{ 'disabled--btn': !inputs.userName || !inputs.password }">{{ $t('connect') }}</button>
            <!-- </div> -->

            <router-link class="forgot--password" :to="{ name: 'ForgotPassPage', params: {} }">
                <span>
                    <p>{{ $t('forgotPassword') }}</p>
                </span>
            </router-link>
        </form>
    </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref, watch } from 'vue';

export default {
    name: "LoginForm",

    setup() {
        const maxLength = 15;

        // Traduction
        const { t } = useI18n();
        const forgotPassword = t("forgotPassword");
        const userName = t("userName");
        const password = t("password");
        const connect = t("connect");

        // 
        let inputs = ref({

            userName: '',
            password: '',
        });
        watch(inputs, (newValue) => {

            if (newValue.userName== '') {
                inputs.value.password = '';
            }
           
        }, { deep: true });


        return {
            forgotPassword,
            userName,
            password,
            connect,
            maxLength,
            inputs,
        };
    },
}
</script>

<style lang="scss">
.login--container {
    display: grid;
    justify-items: center;
    margin: 0px 20px 20px 20px;
    width: 350px;
    height: auto;
    padding: 40px 35px 35px 35px;
    border-radius: 15px;
    background-image: linear-gradient(to right,
            #ff24a7af,
            #8890feb2);
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
    }

    .login--form {
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
                        transform: scale(1.1)
                    }
                }
            }
        }
    }

   
}
</style>