<template>
	<section>
		<breadcrumbs-catalog-component />
		<div class="outer">
			<div class="inner">
				<category-component />
			</div>
		</div>
		<div class="outer catalog"
			 :class="{'filter_open' : FILTER_STATUS}">
			<div class="inner">
				<section class="filter">
				</section>
				<transition-group name="list" tag='section'>
					<item-component v-for='item in CATALOG_LIST_BY_CATEGORY'
									:key='item.id'
									v-bind:cart_item='item'
									class='list-item'
									/>
				</transition-group>
				<!-- <section>
				</section> -->
			</div>
			<div class="inner" v-if='emptyCatalog'>
				Товары не найдены
			</div>
		</div>
	</section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Item from '../components/item.vue'
export default {
	name: 'catalog',
	data: function(){
		return{
			emptyCatalog: false,
		}
	},
	computed: {
		...mapGetters([
			'CATALOG_LIST', 
			'FILTER_STATUS', 
			'CATALOG_LIST_BY_CATEGORY',
			'GET_CATEGORY_EXIST'
		]),
	},
	methods: {
		...mapActions([
			'GET_CATALOG_LIST', 
			'CREATE_CATALOG_LIST_BY_CATEGORY',
			'CHECK_CATEGORY_EXIST'
		]),
		async routeChanged(){
			console.log("watcher: " + this.$route.params.category)
			this.CREATE_CATALOG_LIST_BY_CATEGORY(this.$route.params.category);
		},
	},
	watch: {
		$route: 'routeChanged',
	},
	beforeMount(){
		console.log('catalog: before mounted')
		let vm_catalog = this;
		this.routeChanged()
		.then(function(){
			if(vm_catalog.$route.name != 'catalog'){
				if(vm_catalog.CATALOG_LIST_BY_CATEGORY.length == 0){
					vm_catalog.$router.push({ name: '404' })
				}
			}
		})
	},
	mounted(){
		console.log('catalog: mounted')
	},
	updated() {
		console.log('catalog: updated')
		if(this.CATALOG_LIST_BY_CATEGORY.length == 0){
			this.$router.push({ name: '404' })
		}
	},
	components: {
		'item-component' : Item
	}
}
</script>
<style scoped='catalog'>
.catalog .inner > .title{
	text-align: center;
	font-weight: 500;
	font-size: 30px;
	padding: 15px 0 30px;
	letter-spacing: .6px;
}
.catalog section:not(.filter){
	position: relative;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: max-content;
	grid-gap: 20px;
}
.catalog article{
	position: relative;
	width: 300px;
}
.catalog .marks{
	position: absolute;
	top: 10px;
	left: 10px;
	font-size: 12px;
	display: grid;
	grid-template-columns: repeat(2, max-content);
	grid-gap: 10px;
}
.marks span{
	padding: 5px 10px;
	background-color: rgba(255,255,255,.7);
	letter-spacing: 0.6px;
}
.catalog article .title{
	text-align: center;
	padding: 20px 0 5px;
	font-size: 14px;
	letter-spacing: 1px;
}
.catalog .price{
	font-size: 14px;
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(2, max-content);
	max-width: 180px;
	margin: auto;
	letter-spacing: .6px;
}
.price .new{
	font-weight: 500;
}
.price .old{
	color: rgba(0,0,0,0.5);
	text-decoration: line-through;
	padding-left: 10px;
}
/* >>> открытый фильтр */
.catalog > .inner {
	display: grid;
	grid-template-columns: min-content;
	grid-template-columns: 0fr 3fr;
	grid-auto-flow: column;
	transition: .4s;
}
.filter_open .inner{
	grid-template-columns: 1fr 3fr;
	transition: .4s;
}
.inner .filter{
	width: 0;
	opacity: 0;
	transition: .4s;
}
.filter_open .inner .filter{
	/*width: max-content;*/
	width: 315px;
	opacity: 1;
	transition: .4s;
}
</style>