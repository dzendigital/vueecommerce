export default{
	state: {
		category_list: [],
	},
	getters: {
		CATEGORY_LIST(state, getters){
			return state.category_list;
		},
	},
	mutations: {
		UPDATE_CATEGORY_LIST(state, payload){
			state.category_list = payload;
		}
	},
	actions: {
		async SET_CATEGORY_LIST(context){
			const request = await fetch('/api/category.php');
			const list = await request.json();
			context.commit('UPDATE_CATEGORY_LIST', list);
		}

	}
}