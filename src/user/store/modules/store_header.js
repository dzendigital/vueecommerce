export default{
	state: {
		sidemenu_status: false,
		nav_menu: [
			{
				name: 'Главная',
				path: '/'
			},
			{
				name: 'Каталог',
				path: '/catalog/'
			}
		],
	},
	getters: {
		ASIDE_MENU_STATE(state){
			return state.sidemenu_status;
		},
		GET_NAVIGATION_MENU(state){
			return state.nav_menu;
		}
	},
	mutations: {
		CHANGE_MENU_STATE(state){
			state.sidemenu_status = !state.sidemenu_status;
		}
	},
	actions: {
		TOGGLE_MENU(context){
			context.commit('CHANGE_MENU_STATE');
		}
	},
}