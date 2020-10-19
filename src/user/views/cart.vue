<template>
	<section>
		<breadcrumbs-component />
		<div class="outer">
			<div class="inner">
				<category-component />
			</div>
		</div>
			<div class="outer article_outer">
				<div class="inner">
					<cart-item-component></cart-item-component>	
				</div>
			</div>
	</section>
</template>
<script>
import CartItem from '../components/cart_item'
import { mapGetters, mapActions } from 'vuex'
export default{
	name: 'cart',
	components: {
		'cart-item-component': CartItem,
	},
	data(){
		return {
		}
	},
	watch: {
		$route: 'routeChanged'
	},
	methods: {
		...mapActions([
			'RETURN_CART_ITEM_BY_ID', 
			'GET_CATALOG_LIST'
		]),
		routeChanged(){
			console.log("watcher: " + this.$route.params.item)
			this.RETURN_CART_ITEM_BY_ID(this.$route.params.item);
		},
		
	},
	computed:{
		...mapGetters([
			'CART_ITEM', 
			'CATALOG_LIST'
		]),
	},
	async beforeMount(){
		console.log('beforeMount: ' + this.CATALOG_LIST.length)
		switch (this.CATALOG_LIST.length){
			case 0:
				let get_result = this.GET_CATALOG_LIST();
				switch (Object.keys(this.$route.params).length){
					case 0:
						this.$router.push({name: 'catalog' });
					break;
					default:
						console.log('default statement: ', this.$route.params.item)
						get_result
						.then(() => this.RETURN_CART_ITEM_BY_ID(this.$route.params.item))
						.then((item) => this.CART_ITEM.length ? "" : this.$router.push({name: '404' }));
						break;
				}
			break;
			default:
				this.RETURN_CART_ITEM_BY_ID(this.$route.params.item);
			break;	
		}
	},
	mounted(){
	},
	beforeUpdate(){
	}
}
</script>
<style scoped="cart">

</style>