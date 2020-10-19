export default {
	state: {
		items: [],
		items_by_category: [],
		filter_status: false,
		cart_item: [],
	},
	getters: {
		CATALOG_LIST(state){
			return state.items;
		},
		CATALOG_LIST_BY_CATEGORY(state){
			return state.items_by_category;
		},
		FILTER_STATUS(state){
			return state.filter_status;
		},
		CART_ITEM(state){
			return state.cart_item;
		},
		SPECIAL_ITEMS(state){
			return state.items.filter(item => item.special != null);
		}
	},
	mutations: {
		// получить список товаров в каталоге
		UPDATE_CATALOG_LIST(state, list){
			state.items = list;
			state.items_by_category = list;
		},
		UPDATE_CATALOG_LIST_BY_CATEGORY(state, id){
			if(id == null){
				state.items_by_category = state.items;
			}else{
				state.items_by_category = state.items.filter(item => item.category == id);
			}
		},
		// показать\скрыть фильтр в каталоге
		UPDATE_FILTER_STATUS(state){
			state.filter_status = !state.filter_status;
		},
		// формирование карточки товара
		UPDATE_ITEM_BY_ID(state, id){
			state.cart_item = state.items.filter(item => item.id == id);
		}
	},
	actions: {
		// показать товары в каталоге (все товары)
		async GET_CATALOG_LIST(context){
			const response = await fetch('/api/catalog.php');
			const list = await response.json();
			context.commit('UPDATE_CATALOG_LIST', list);
			return true;
		},
		// показать товары в каталоге (по категории)
		async CREATE_CATALOG_LIST_BY_CATEGORY(context, id){
			context.commit('UPDATE_CATALOG_LIST_BY_CATEGORY', id);
		},
		async OPEN_FILTER(context){
			context.commit('UPDATE_FILTER_STATUS');
		},
		async RETURN_CART_ITEM_BY_ID(context, id){
			// return state.items.filter(item => item.id == id);
			context.commit('UPDATE_ITEM_BY_ID', id);
		},
	},
};