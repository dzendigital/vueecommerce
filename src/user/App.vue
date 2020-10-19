<template>
    <div>
        <section v-show='loading' class="page_preload">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </section>
      <transition name='frontPage' appear>
        <section class="app" v-show='!loading'>
          <div class="outer header" 
               v-scroll="headerScroll"
               :class="{'scrolled' : scrolled}">
            <header-component />
          </div>
          <transition name="component-fade" mode="out-in">
            <router-view></router-view>
          </transition>
            <footer-component />
        </section>
      </transition> 
    </div>
</template>
 
<script>
import Vue from 'vue';
/* Router */
import Router from './router.js'
/* Store */
import Store from './store/store.js'
import { mapActions, mapGetters } from 'vuex'
/* Components */
import Header from './components/header'
import Footer from './components/footer'
import Preloader from './components/preloader'
import Breadcrumb from './components/breadcrumbs.vue'
import BreadcrumbCatalog from './components/catalog_breadcrumbs.vue'
Vue.component('breadcrumbs-component', Breadcrumb);
Vue.component('breadcrumbs-catalog-component', BreadcrumbCatalog);
import Category from './components/category.vue'
Vue.component('category-component', Category);
/* Views */
import Front from './views/front'
import Catalog from './views/catalog'
import Promo from './views/promo'

/* фильтр склонения */
Vue.filter('declensionFormat', function (int, expressions) {
    if (expressions.length < 3){
      expressions[2] = expressions[1];
    };
    let count = int % 100;
    let result;
    if (count >= 5 && count <= 20) {
        result = expressions['2'];
    } else {
        count = count % 10;
        if (count == 1) {
            result = expressions['0'];
        } else if (count >= 2 && count <= 4) {
            result = expressions['1'];
        } else {
            result = expressions['2'];
        }
    }
    return result;
  
});
/* фильтр обработки цены */
Vue.filter('priceFormat', function (value) {
  value = new Intl.NumberFormat(
        { 
          style: 'currency', 
          currency: 'RUB',
          maximumSignificantDigits: 3,
        }
      ).format(value);
  return value;
});
/* фильтр добавления % */
Vue.filter('addPercent', function (value) {
  return value + "%";
});
/* директива анимации header*/
Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        // window.removeEventListener('scroll', f);
      }
    }
    window.addEventListener('scroll', f);
  },
})
export default {
  name: 'app',
  router: Router,
  store: Store,
  data () {
    return {
      breadcrumbs: "",
      loading: true,
      scrolled: false,
    }
  },
  components: {
    'header-component': Header,
    'footer-component': Footer,
    'front-component': Front,
    'catalog-component': Catalog,
    'promo-component': Promo,
    'preloader-component': Preloader,
    // 'breadcrumbs-component': Breadcrumb,
  },
  computed: {
    ...mapGetters([
      'CATALOG_LIST',
      'CATEGORY_LIST'
      ])
  },
  async beforeMount(){
    let current_component = this;
    switch (this.CATALOG_LIST.length){
      case 0:
        // если мы в каталоге, то обновим категорию в компоненте, а если нет то здесь
        let get_result = this.GET_CATALOG_LIST();
        get_result.then(function(){
          current_component.CREATE_CATALOG_LIST_BY_CATEGORY(current_component.$route.params.category);
        });        
      break;      
    }
      current_component.loading = false;
    setTimeout(function(){
      console.log('Данные загрузились')
    }, 1000);
    if(this.CATEGORY_LIST.length == 0){
      this.SET_CATEGORY_LIST();
    };
    /* если пользователь сохранил корзину в localStorage - загружаем её */
    this.LOAD_BASKET_FROM_STORAGE()
    .then(() => {
      this.CALCULATE_BASKET_INFO();
    })
  },
  mounted(){
  },
  methods:{
    ...mapActions([
      'GET_CATALOG_LIST',
      'CREATE_CATALOG_LIST_BY_CATEGORY',
      'SET_CATEGORY_LIST',
      'LOAD_BASKET_FROM_STORAGE',
      'CALCULATE_BASKET_INFO'
    ]),
    headerScroll (evt, el) {
      if (window.scrollY > 50) {
        this.scrolled = true; 
      }else if(window.scrollY < 50){
        this.scrolled = false; 
      }
      return window.scrollY > 100;
    },
  },
}
</script>