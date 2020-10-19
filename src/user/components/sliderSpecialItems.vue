<template>
<div v-on:mouseenter="sliderAction('stop')"
     v-on:mouseleave="sliderAction('start')">
  <swiper ref="mySwiper" class="swiper" :options="swiperOptions" id='swiper' :auto-destroy="false">
      <template v-for='i in 3'>
        <swiper-slide v-for='(item, index) in SPECIAL_ITEMS'
                      :id='item.id'>
          <div @click.prevent='goTo(item.id)'>
            <img :src="'/assets/img/items/' + item.img">
            <div class="marks">
              <span class="hit" 
                  v-if='item.special'>
                  {{ item.special }}
              </span>
            </div>
            <div class="title">
              {{ item.title }}
            </div>
            <div class="price">
              <div class="new">
                от {{ item.price | priceFormat }} руб.
              </div>
            </div>
          </div>
        </swiper-slide>
      </template>
      <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapGetters } from 'vuex'
export default {
  name: 'special_items_slider',
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Полосатый свитер',
          price_new: 800,
          price_old: 1800,
          special: {
            hit: {
              status: true,
              title: 'Новинка',
            },
            discount: {
              status: true,
              title: 'Скидка',
              amount: 20
            }
          },
          img: 'i01.png',
          img_hover: 'i1.png',
        },
        {
          id: 2,
          name: 'Полосатая футболка',
          price_new: 600,
          price_old: null,
          special: {
            hit: {
              status: true,
              title: 'Акция',
            }
          },
          img: 'i02.png',
          img_hover: 'i2.png',
        },
        {
          id: 3,
          name: 'Брюки белые',
          price_new: 1400,
          price_old: 2000,
          'special': {
            hit: {
              status: true,
              title: 'Для фото',
            }
          },
          img: 'i03.png',
          img_hover: 'i3.png',
        },
        {
          id: 4,
          name: 'Кросовки белые',
          price_new: 1600,
          price_old: 2200,
          'special': {
            hit: {
              status: true,
              title: 'Популярное',
            },
            discount: {
              status: true,
              title: 'Скидка',
              amount: 30
            }
          },
          img: 'i04.png',
          img_hover: 'i4.png',
        },
        {
          id: 5,
          name: 'Полосатая футболка',
          price_new: 600,
          price_old: null,
          special: {
            hit: {
              status: true,
              title: 'Акция',
            }
          },
          img: 'i02.png',
          img_hover: 'i2.png',
        },
        {
          id: 6,
          name: 'Брюки белые',
          price_new: 1400,
          price_old: 2000,
          'special': {
            hit: {
              status: true,
              title: 'Для фото',
            }
          },
          img: 'i03.png',
          img_hover: 'i3.png',
        },
        {
          id: 7,
          name: 'Кросовки белые',
          price_new: 1600,
          price_old: 2200,
          'special': {
            hit: {
              status: true,
              title: 'Популярное',
            },
            discount: {
              status: true,
              title: 'Скидка',
              amount: 30
            }
          },
          img: 'i04.png',
          img_hover: 'i4.png',
        }
      ],
      swiperOptions: {
        setWrapperSize: true,
        slidesPerView: 4,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true
        },
      },
    }
  }, // data
  computed: {
    ...mapGetters(['SPECIAL_ITEMS']),
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    goTo(item){
      this.$router.push({ name: 'cart', params: { item: item } });
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
  components: {
    Swiper,
    SwiperSlide
  },
}
</script>
<style scoped="special_slider">
.a{
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  padding: 30px 0 30px;
  letter-spacing: .6px;
}
section{
  display: grid;
  /*grid-template-columns: repeat(4, 1fr);*/
  grid-template-rows: repeat(1, 465px);
  grid-gap: 20px;
}
.swiper-slide{
  position: relative;
  cursor: pointer;
  transition: opacity .4s;
  opacity: 1;
}
.swiper-wrapper:hover .swiper-slide{
  opacity: .6;
  transition: opacity .4s;
}
.swiper-wrapper .swiper-slide:hover{
  opacity: 1;
  transition: opacity .4s;
  cursor: pointer;
}
.swiper-slide .title{
  text-align: center;
  padding: 20px 0 5px;
  font-size: 14px;
  letter-spacing: 1px;
}
.price{
  font-size: 14px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(1, 100%);
  margin: auto;
  letter-spacing: .6px;
  text-align: center;
}
.swiper-pagination{
  position: relative;
  padding: 20px 0 0;
}
</style>