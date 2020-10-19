import Vue from "vue";
import Router from "vue-router";

/* Components */
import Header from './components/header.vue';
import Front from './views/front.vue';
import Promo from './views/promo.vue';
import Catalog from './views/catalog.vue';
import Cart from './views/cart.vue';
import Page_404 from './views/page_404.vue';
Vue.use(Router);

let routes = [
    { 
        name: 'front', 
        path: '/',
        component: Front, 
        meta: {
            breadcrumb: [
                {
                    name: '',
                    link: '/'
                }
            ],
        }
    },
    { 
        name: 'catalog', 
        path: '/catalog/:category?', 
        component: Catalog,
        props: true,
        meta: {
            breadcrumb: [
                {
                    name: 'Каталог',
                    link: '/catalog'
                }
            ],
        },
    },
    { 
        name: 'promo', 
        path: '/promo', 
        component: Promo,
        meta: {
            breadcrumb: [
                {
                    name: 'Промо',
                    link: '/promo'
                }
            ],
        }
    },
    { 
        name: 'cart', 
        path: '/cart/:item', 
        component: Cart,
        props: true,
        meta: {
            breadcrumb: [
                {
                    name: 'Карточка товара',
                    link: '/cart'
                }
            ],
        }
    },
    // {
    //     name: '404',
    //     path: '/*',
    //     component: Page_404
    // },
    { 
        name: '404', 
        path: '/404', 
        component: Page_404, 
    }, 
    { 
        path: '*', 
        redirect: '/404' 
    }
];

export default new Router({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        if(to.name == from.name){
            return false;
        }else{
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ x: 0, y: 0 })
                }, 300)
            })
        }
   }
});