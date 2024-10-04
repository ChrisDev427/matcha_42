<template>
  <div class="card-container">
    <div class="profile--card">


      <div class="max-w-2xl p-4 mx-auto">
        <div id="carousel-example" class="relative">
          <!-- Carousel wrapper -->
          <div class="relative h-56 overflow-hidden rounded-lg sm:h-64 xl:h-80 2xl:h-96">
            <!-- Item 1 -->
            <div id="carousel-item-1" class="hidden duration-700 ease-in-out">
              <span
                class="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">First
                Slide</span>
              <img :src="getImageUrl(user.photos[0])"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
            </div>
            <!-- Item 2 -->
            <div id="carousel-item-2" class="hidden duration-700 ease-in-out">
              <img :src="getImageUrl(user.photos[0])"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
            </div>
            <!-- Item 3 -->
            <div id="carousel-item-3" class="hidden duration-700 ease-in-out">
              <img :src="getImageUrl(user.photos[0])"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
            </div>
            <!-- Item 4 -->
            <div id="carousel-item-4" class="hidden duration-700 ease-in-out">
              <img :src="getImageUrl(user.photos[0])"
                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
            </div>
          </div>
          <!-- Slider indicators -->
          <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            <button id="carousel-indicator-1" type="button" class="w-3 h-3 rounded-full" aria-current="true"
              aria-label="Slide 1"></button>
            <button id="carousel-indicator-2" type="button" class="w-3 h-3 rounded-full" aria-current="false"
              aria-label="Slide 2"></button>
            <button id="carousel-indicator-3" type="button" class="w-3 h-3 rounded-full" aria-current="false"
              aria-label="Slide 3"></button>
            <button id="carousel-indicator-4" type="button" class="w-3 h-3 rounded-full" aria-current="false"
              aria-label="Slide 4"></button>
          </div>
          <!-- Slider controls -->
          <button id="data-carousel-prev" type="button"
            class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
            <span
              class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span class="hidden">Previous</span>
            </span>
          </button>
          <button id="data-carousel-next" type="button"
            class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
            <span
              class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <span class="hidden">Next</span>
            </span>
          </button>
        </div>
      </div>

      <h2>{{ user.username }}</h2>
      <p>{{ user.firstname }} {{ user.lastname }}</p>
      <p>{{ user.email }}</p>
    </div>
    <div class="profile--infos">
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import { Carousel } from 'flowbite';

const imgPlaceholder = require('../../public/src/default-avatar-img.jpeg');
  //  const name = "ProfileCard";
    function getImageUrl(photo) {
      if (photo) {
        // Convertir le binaire en Base64
        return `data:image/jpeg;base64,${btoa(
          new Uint8Array(photo).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )}`;
      } else {
        return this.imgPlaceholder;
      }
    }

   const props = defineProps({
      user: {
        type: Object,
        required: true,
        photos: {}
      }
    });
    // console.log(props.user.photos);

onMounted(() => {
    const carouselElement = document.getElementById('carousel-example');

    const items = [
        {
            position: 0,
            el: document.getElementById('carousel-item-1')
        },
        {
            position: 1,
            el: document.getElementById('carousel-item-2')
        },
        {
            position: 2,
            el: document.getElementById('carousel-item-3')
        },
        {
            position: 3,
            el: document.getElementById('carousel-item-4')
        },
    ];

    const options = {
        defaultPosition: 1,
        interval: 3000,

        indicators: {
            activeClasses: 'bg-white dark:bg-gray-800',
            inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
            items: [
                {
                    position: 0,
                    el: document.getElementById('carousel-indicator-1')
                },
                {
                    position: 1,
                    el: document.getElementById('carousel-indicator-2')
                },
                {
                    position: 2,
                    el: document.getElementById('carousel-indicator-3')
                },
                {
                    position: 3,
                    el: document.getElementById('carousel-indicator-4')
                },
            ]
        },

        // callback functions
        onNext: () => {
            // console.log('next slider item is shown');
        },
        onPrev: ( ) => {
            // console.log('previous slider item is shown');
        },
        onChange: ( ) => {
            // console.log('new slider item has been shown');
        }
    };

    if (document.getElementById('carousel-item-1')) {
        const carousel = new Carousel(carouselElement, items, options);

        // carousel.cycle()

        // set event listeners for prev and next buttons
        const prevButton = document.getElementById('data-carousel-prev');
        const nextButton = document.getElementById('data-carousel-next');

        prevButton.addEventListener('click', () => {
            carousel.prev();
        });

        nextButton.addEventListener('click', () => {
            carousel.next();
        });
    }
})
</script>

<style lang="scss">
.profile--card {
  display: grid;
  justify-items: center;
  //   margin: 0px 20px 20px 20px;
  //   width: auto;
  //   height: auto;
  //   padding: 40px 35px 35px 35px;
  //   border-radius: 15px;
  //   box-shadow: 0 0 28px rgba(0, 0, 0, 0.498);
  //   cursor: default;
  //   user-select: none;
}

.card-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 600px;
  border-radius: 30px;
  transition: .5s;
  cursor: pointer;
}

.card-container .profile--card {
  background-image: linear-gradient(to right, #ff24a7d3, #8890fee5);
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  backface-visibility: hidden;
  transform: perspective(1000px) rotateY(0deg);
  transition: .5s;
  box-shadow: 0 25px 15px rgb(0 0 0 / 50%)
}

// .card-container:active .profile--card {
//   transform: perspective(1000px) rotateY(180deg);
// }

.card-container .profile--infos {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  backface-visibility: hidden;
  transform: perspective(1000px) rotateY(-180deg);
  background-image: linear-gradient(to right, #ff24a7d3, #8890fee5);

  transition: .5s;
  box-shadow: 0 25px 15px rgb(0 0 0 / 50%)
}

// .card-container:active .profile--infos {
//   transform: perspective(1000px) rotateY(0);
// }
</style>