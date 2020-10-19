import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
/* Modules */
import header from './modules/store_header.js';
import catalog from './modules/store_catalog.js';
import category from './modules/store_category.js';
import basket from './modules/store_basket.js';

let store = new Vuex.Store({
	modules: {
		category,
		catalog,
		header,
		basket,
	}
});
store.watch(
  // Когда возвращаемый результат изменится...
  function (state) {
    return state.basket.basket_total.amount;
  },
  // Запустится коллбэк
  (state) =>{
	store.dispatch('SAVE_BASKET_TO_STORAGE')
	.then(() => {
		console.log('basket is saving...');
	})

  }
)
export default store;