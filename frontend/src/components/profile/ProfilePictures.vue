<template>
    <div class="profile--pictures--main--container">
        <div class="profile--pictures--container">

            <div class="row--pictures">
                <div class="picture">
                    <img src="../../../public/src/default-avatar-img.jpeg" alt="">
                    <span><i class="fi fi-br-add"></i></span>
                </div>
               
            </div>
            <div class="row--pictures">
                <div class="picture">
                    <img src="../../../public/src/default-avatar-img.jpeg" alt="">
                    <span><i class="fi fi-br-add"></i></span>

                </div>
                <div class="picture">
                    <img src="../../../public/src/default-avatar-img.jpeg" alt="">
                    <span><i class="fi fi-br-add"></i></span>

                </div>
            </div>
            <div class="row--pictures">
                <div class="picture">
                    <img src="../../../public/src/default-avatar-img.jpeg" alt="">
                    <span><i class="fi fi-br-add"></i></span>

                </div>
                <div class="picture">
                    <img src="../../../public/src/default-avatar-img.jpeg" alt="">
                    <span><i class="fi fi-br-add"></i></span>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.profile--pictures--main--container {
    width: 100%;
    height: 100%;
    // border: solid 1px green;
    display: flex;
    // margin-right: 20px;

    justify-content: center;
    // @media (max-width: 900px) {

    //     border-top: solid 2px red;


    //     }

    .profile--pictures--container {
        width: 80%;

        padding: 20px 0 20px 0;
        margin: 0 20px 0 20px;
        // border-radius: 10px;
        // background-color: #ffffff5a;
        // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: grid;
        align-items: center;
        justify-items: center;
        // justify-content: center;

        @media (max-width: 812px) {
            // margin: 20px;
            margin: 20px 0px 0 0px;
            border-top: solid 2px rgba(93, 93, 93, 0.594);


        }

        .row--pictures {
            width: fit-content;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            // border: solid 1px white;

            .picture {

                position: relative;
                
                img {
                    border: solid 1px white;
                    margin: 15px;
                    opacity: 0.7;
                    width: 130px;
                    border-radius: 10px;
                    border: solid 2px #a602e7b7;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.513);
                    
                    // @media (max-width: 900px) {
                    //     width: 130px;
                    // }
                    
                    @media (max-width: 414px) {
                        width: 100px;
                    }
                }
                span {
                    i {
                        display: grid;
                        align-items: center;
                    }
                    position: absolute;
                    right: 20px;
                    bottom: 25px;
                    color: rgb(65, 254, 65);
                    font-size: 1.5rem;
                    cursor: pointer;


                    // transform: rotate(45deg);
                    // color: rgb(250, 47, 47);

                    
                }
            }
        }
    }
}
</style>