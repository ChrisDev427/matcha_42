<template>
    <div class="register--container ">
        <h3>Create An Account</h3>
        <h3 id="sub--title">And Start Swiping</h3>
        <form action="" class="register--form">
            <input type="text" placeholder="Username">
            <input type="text" placeholder="First Name">
            <input type="text" placeholder="Last Name">
            <input type="email" placeholder="Email">
            <input type="password" placeholder="Password">
            <div class="submit--btn">
                <button>Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "RegisterForm",

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

    h3 {

        margin: 10px 0 0 0;
        color: white;
        text-align: center;
        font-weight: 900;
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
            background-color: var(--purple-placeholder-bg);
            color: var(--purple);

        }

        input::placeholder {
            color: white;
            font-weight: 400;

            /* Couleur du placeholder */
        }

        .submit--btn {
            margin-top: 25px;

            button {

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

        }

        @media (min-width: 800px) {
            width: 70%;
            margin: auto;

        }
    }
}
</style>