<template>
  <div class="slider"
       v-on:mouseenter="sliderAction('stop')"
       v-on:mouseleave="sliderAction('start')">
    <swiper ref="mySwiper" :options="swiperOptions" :auto-destroy="false">
      <swiper-slide>
        <div class="slide" style="background-image: url('/assets/img/background/b01.png')">
          <article>
            <div class="title">
              БÖНО&trade; Home    
            </div>
            <div class="text">
              Коллеция домашней одежды
            </div>
            <a data-action="catalog" 
               @click.prevent="goTo('catalog')" 
               class="main_button">
              В каталог
            </a>
          </article>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide" style="background-image: url('/assets/img/background/b00.png')">
          <article>
            <div class="title">
              БÖНО&trade; Business    
            </div>
            <div class="text">
              Коллеция деловой одежды
            </div>
            <a data-action="catalog" 
               @click.prevent="goTo('catalog')" 
               class="main_button">
              В каталог
            </a>
          </article>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide" style="background-image: url('/assets/img/background/b001.png')">
          <article>
            <div class="title">
              БÖНО&trade; Simple    
            </div>
            <div class="text">
              Коллеция повседневной одежды
            </div>
            <a data-action="catalog" 
               @click.prevent="goTo('catalog')" 
               class="main_button">
              В каталог
            </a>
          </article>
        </div>
      </swiper-slide>
     <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'front_slider',
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          // type: 'progressbar',
        },
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        loop: true,
        speed: 1000,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    goTo(route){
      this.$router.push({name: route});
    },
    sliderAction(action){
      if(this.swiper.autoplay != undefined){
        switch (action){
          case 'stop':
            this.swiper.autoplay.stop()
          break;
          case 'start':
            this.swiper.autoplay.start()
          break;
        }
      }
    }
  },
  mounted() {
    // console.log('Current Swiper instance object', this.swiper)
  },
  beforeDestroy(){
    // console.log('beforeDestroy: ', this.swiper)
  },
  components: {
    Swiper,
    SwiperSlide
  },
  // directives: {
  //   swiper: directive
  // }
}
</script>
<style scoped="slider">
  .slide{
  width: 100%;
  height: 525px;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: top right;
  background-repeat: no-repeat;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
}
.slide article{
  grid-row: 2/4;
  margin-left: 100px;
  max-width: max-content;
  position: relative;
  padding: 50px 80px;
  box-sizing: border-box;
  height: max-content;
}
.slide article:before,
.slide article:after{
  position: absolute;
  z-index: 1;
  content: '';
  width: 50%;
  height: 50%;
}
.slide article:before{
  top: 0;
  left: 0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  box-shadow: -1px -1px 0px 0px #000;
}
.slide article:after{
  right: 0;
  bottom: 0;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  box-shadow: 1px 1px 0px 0px #000;
}
.slide .title{
  letter-spacing: .6px;
}
.slide .title,
.slide .text{
  color: var(--main-color);
}
.slide .title{
  font-size: 40px;
}
.slide .text{
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 25px;
}
.swiper-button-next,
.swiper-button-prev{
  height: 100%;
  top: 22px;
  width: 10vw;
}
.swiper-button-next{
  transform: translateX(150%);
  opacity: 0;
  transition: .4s;
  right: 0;
}
.swiper-button-prev{
  transform: translateX(-150%);
  opacity: 0;
  transition: .4s;
  left: 0;
}
.swiper-container:hover .swiper-button-prev,
.swiper-container:hover .swiper-button-next{
  transform: translateX(0%);
  opacity: 1;
  transition: .4s;
}
.swiper-button-prev:hover,
.swiper-button-next:hover{
  background-color: rgba(205,205,205,0.4);
}
.swiper-button-disabled{
  color: #007aff5c;
}
</style>
<!-- https://www.youtube.com/watch?v=GwK1C3qRnzQ -->
<!-- https://github.surmon.me/vue-awesome-swiper/ -->