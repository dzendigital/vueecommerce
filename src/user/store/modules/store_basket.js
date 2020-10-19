export default{
	state: {
		basket: [],
		basket_status: false,
		basket_total: {
			amount: 0,
			price: 0
		},
		orderWasPosted: false,
	},
	getters: {
		BASKET_LIST(state){
			return state.basket;
		},
		ASIDE_BASKET_STATUS(state){
			return state.basket_status;
		},
		BASKET_TOTAL(state){
			return state.basket_total;
		},
		ORDER_POSTED_STATUS(state){
			return state.orderWasPosted;
		}
	},
	mutations: {
		LOAD_BASKET_LIST(state, basket){
			state.basket = JSON.parse(basket);
		},
		UPDATE_BASKET_LIST(state, item){
			state.basket.push(item);
		},
		UPDATE_AMOUNT(state, item){
			state.basket[item.key].amount += item.amount;
		},
		UPDATE_BASKET_STATUS(state){
			state.basket_status = !state.basket_status;
		},
		UPDATE_BASKET_TOTAL(state){
			let current_amount = 0;
			let current_price = 0;
			state.basket.forEach(function(value, key){
				current_amount += value.amount;
				current_price += ( value.amount * value.item.price);
			})
			state.basket_total.amount = current_amount;
			state.basket_total.price = current_price;
		},
		UNSET_ITEM(state, id){
			let result = state.basket.findIndex((element) => element.item.id == id);
			state.basket.splice(result, 1);
		},
		UNSET_BASKET(state){
			state.basket = [];
		},
		UPDATE_ORDER_POSTED_STATUS(state, value){
			state.orderWasPosted = value;
		}
	},
	actions: {
		async ADD_ITEM_TO_BASKET(context, payload){
			context.commit('UPDATE_BASKET_LIST', payload);
		},
		async ADD_AMOUNT(context, payload){
			context.commit('UPDATE_AMOUNT', payload);
			return true;
		},
		async CHANGE_BASKET_STATUS(context){
			context.commit('UPDATE_BASKET_STATUS');
		},
		async CALCULATE_BASKET_INFO(context){
			context.commit('UPDATE_BASKET_TOTAL');
		},
		async REMOVE_ITEM_FROM_BASKET(context, payload){
			context.commit('UNSET_ITEM', payload);
		},
		async CLEAR_BASKET(context){
			context.commit('UNSET_BASKET');
		},
		async SAVE_BASKET_TO_STORAGE(context){
			localStorage.basket = JSON.stringify(context.state.basket);
		},
		async LOAD_BASKET_FROM_STORAGE(context){
			console.log('loading basket from storage...');
			if(localStorage.basket != undefined){
				context.commit('LOAD_BASKET_LIST', localStorage.basket);
			}
		},
		async CHANGE_ORDER_POSTED_STATUS(context, payload){
			context.commit('UPDATE_ORDER_POSTED_STATUS', payload)
		},
	}
}