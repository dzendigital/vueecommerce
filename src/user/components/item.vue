<template>
	<article>
		<a :href="/cart/+cart_item.id"
		   @click.prevent='goToCart(cart_item.id)'
		   >
		   <!-- @click.prevent='showPreview' -->
			<img :src="'/assets/img/items/' + cart_item.img">
		</a>
		<!-- <div class="marks">
			<span class="hit" 
				  v-if='item.special.hit'>
				  {{ item.special.hit.title }}
			</span>						
			<span class="discount"
			      v-if='item.special.discount'>
				до {{ item.special.discount.amount | addPercent }}
			</span>
		</div> -->
		<div class="title">
			{{ cart_item.title }}
		</div>
		<div class="price">
			<div class="new">
				от {{ cart_item.price | priceFormat }} руб.
			</div>
			<!-- <span class="old" 
				  v-if='price_old'>
				{{ catalogList.price_old }} руб.
			</span> -->
		</div>
	</article>
</template>
<script>
export default{
	name: 'item',
	props: {
		cart_item: {
			type: Object,
			default(){
				return {}
			}
		}
	},
	data(){
		return {

		}
	},
	methods: {
		goToCart(id){
			this.$router.push( {name: 'cart', params: {item: id} } );
		},
	}

}
</script>
<style scoped="item">
	
</style>