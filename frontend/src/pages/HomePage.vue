<template>
  <div class="home">
    <div class="title">
      <h1>swipe right,</h1>
      <h1>match,</h1>
      <h1 id="date">date !</h1>
    </div>
    <div class="create--account--btn">
      <span>{{ $t( 'accountCreate') }}</span>
    </div>
  </div>
  <!-- <Footer></Footer> -->
</template>

<script>
// import Footer from '../components/FooterCmp.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: "HomePage",
  
    setup() {
        
        const { t } = useI18n()
        // Utilisation de la fonction de traduction
        const accountCreate = t('accountCreate')

        return { accountCreate }
    }
  
};
</script>

<style lang="scss">
.home {
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .title {
    margin-top: 50px;
    // border: solid 1px red;
    h1 {
      display: grid;
      justify-content: center;
      color: white;
      text-transform: capitalize;
      font-size: calc(5vw + 3vh);
      font-weight: 500;
      margin: 15px;
    }
    #date {
      font-weight: 900;
      text-transform: uppercase;
    }
  }
  .create--account--btn {
    
    justify-self: center;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 200px;
      border-radius: 15px;
      
     
      color: rgb(255, 255, 255);

      background-image: linear-gradient(
        to right,
        #ff24a7,
        #8890fe
      ); /* Dégradé de couleur */
      
      font-size: 1.2rem;
      font-weight: 500;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        background-image: linear-gradient(
          to right,
          #ff24a78a,
          #8890fe90
        ); /* Dégradé de couleur */
        color: rgb(107, 12, 138);
        transform: scale(1.3);
      }
    }
  }
    
  

  
}
</style>