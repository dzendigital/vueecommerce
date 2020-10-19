<template>
			<nav class=""
				 id="basket"
				 v-on:click="$emit('changeBasketStatus', $event)"
				 >
			<div>
				<div id="basket_close" >
				     <svg data-nav="close" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 224.512 224.512" style="enable-background:new 0 0 224.512 224.512;" xml:space="preserve">
							<g>
								<polygon fill="currentColor" points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254 
									0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 	"></polygon>
							</g>
						</svg>
				</div>
				<div class="title">
					Корзина
				</div>
				<section v-if='ORDER_POSTED_STATUS'>
					Ваш заказ принят, ожидайте сообщение от менеджера.
				</section>
				<section v-if='BASKET_TOTAL.amount == 0'
						 class="empty_basket">
					Корзина пуста. Добавьте что-нибудь, например:
					<ul class="recomendation">
						<li v-for='item in CATALOG_LIST'
							v-if='item.special'
							:key='item.id'
							@click="$router.push( {name: 'cart', params:{item: item.id}}).catch(err => {});">
							<div class="img">
								<img :src="'/assets/img/items/' + item.img" alt=""> 
							</div>
							<div class="title">
								{{ item.title }} 
							</div>
							<span class="marks">
								<span class="hit">{{ item.special }}</span>
							</span>
						</li>
					</ul>
				</section>
				<section v-else>
					<!-- >>> Товар в корзине -->
					<div class="item"
					     v-for="(item, key) in BASKET_LIST"
					     :key='key'>
						<div class="img">
							<img  :src="'/assets/img/items/' + item.item.img">
						</div>
						<div class="info">
							<div class="item_title">
								{{ item.item.title }}
							</div>
							<div class="price">
								<span>Цена: </span>
								<div class="new">
									{{ item.item.price | priceFormat }} руб.
								</div>
							</div>
							<div class="price">
								<span>Размер: </span>
								<div class="new">
									{{ item.size }}
								</div>
							</div>
							<div class="price">
								<span>Цвет: </span>
								<div class="new">
									{{ item.color }}
								</div>
							</div>
							<div class="amount">
								<div class="title">
									Колличество:
								</div>
								<div>
									<span data-action='amount_minus'
										  onselectstart="return false"
									      @click="BASKET_LIST[key].amount == 1 ? '' : addAmount(key, -1)">
										-
									</span>
									<span>{{ item.amount }}</span>
									<span data-action='amount_plus'
										  onselectstart="return false"
									      @click="addAmount(key, 1)">
										+
									</span>
								</div>
								<span class="remove_btn" @click='removeItemFromBasket(item.item.id)'>
									Удалить
								</span>
							</div>
						</div>					
					</div>
					<!-- <<< Товар в корзине -->
					<div class="final_price">
						<span>Итого:</span>
						<span>
							{{ this.BASKET_TOTAL.price | priceFormat }} руб. <span class="system_info">({{ this.BASKET_TOTAL.amount }})</span>
						</span>
					</div>
					<order-form-component v-bind:orderForm='orderForm'/>
					<div class="submit" v-if='!orderForm'>
						<input type="submit" 
							   value="Сформировать заказ" 
							   class="main_button"
							   @click.prevent="showOrderForm">
					</div>
				</section>
			</div>
		</nav>

</template>
<script>
import OrderForm from './order_form'
import { mapGetters, mapActions } from 'vuex'
export default{
	data(){
		return {
			orderForm: false,
		}
	},
	components: {
		'order-form-component' : OrderForm,
	},
	computed: {
		...mapGetters([
			'BASKET_LIST',
			'BASKET_TOTAL',
			'CATALOG_LIST',
			'ORDER_POSTED_STATUS'
		]),
	},
	methods: {
		...mapActions([
			'CHANGE_BASKET_STATUS', 
			'ADD_AMOUNT',
			'CALCULATE_BASKET_INFO',
			'REMOVE_ITEM_FROM_BASKET',
			'GET_CATALOG_LIST'
		]),
		showOrderForm(){
			this.orderForm = true;
		},
		addAmount(key, amount){
			let current_component = this;
			let payload = {
				key: key,
				amount: amount
			};
			let get_result = this.ADD_AMOUNT(payload);
			get_result.then(function(){
				current_component.CALCULATE_BASKET_INFO()
			});
		},

		removeItemFromBasket(id){
			let current_component = this;
			let unset_result = this.REMOVE_ITEM_FROM_BASKET(id)
			unset_result.then(function(){
				current_component.CALCULATE_BASKET_INFO();
			})
		},
	},
	updated(){
		if(this.BASKET_LIST.length == 0){
			this.orderForm = false;
		}
	}
}
</script>
<style scoped="basket">
#basket{
	overflow-y: auto;
	z-index: 1;
}
nav.hidden{
	display: block;
}
nav > div > section{
	padding-bottom: 10px;
}
nav{
	position: fixed;
	top: 0;
	left: 0;
	display: block;
	height: 100%;
	width: 100%;
	background-color: rgba(0,0,0,0.3);
	cursor: pointer;
}
.empty_basket ul{
	/*padding-top: 10px;*/
}
.empty_basket li{
	display: grid;
	grid-template-columns: 100px auto 80px;
	grid-gap: 20px;
	padding: 5px 0 0;
	position: relative;
	align-items: flex-start;
}
.empty_basket .title{
	text-align: left;
}
.empty_basket img{
	max-width: 100px;
}
.empty_basket .marks{
	position: static;
	display: grid;
	justify-self: flex-end;
	padding: 0;
	margin: 0;
	width: unset;
}
.empty_basket .hit{
	background-color: #eee;
	box-shadow: 1px 1px 0px 0px rgba(0,0,0,0.2);
	font-size: 10px;
	padding: 3px 5px;
}
nav > div *{
	cursor: auto;
}
nav > div{
	margin-left: auto;
	cursor: auto;
	background-color: #fff;
	padding: 30px 35px 30px 40px;
	box-sizing: border-box;
	max-width: 700px;
	min-height: 100%;
	position: relative;
}
#basket_close svg{
	cursor: pointer;
}
#basket_close{
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 2;
    width: 20px;
    height: 20px;
    /*background-image: url(https://cdn.onlinewebfonts.com/svg/img_246967.png);*/
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    cursor: pointer;
}
.title{
	text-align: center;
	font-size: 29px;
	padding: 5px 0 20px;
}
.item{
    display: grid;
    grid-template-columns: 1fr 6fr;
    grid-gap: 10px;
    align-items: center;
    border-top: 1px solid #31313163;
    padding: 15px 0;
}
.item *{
	font-size: 14px;
	letter-spacing: var(--letter-spacing);
}
.item_title{
	text-transform: uppercase;
}
.info{
	display: grid;
	grid-gap: 5px;
}
.price{
	display: grid;
	grid-template-columns: repeat(2, max-content);
	align-items: center;
	grid-gap: 10px;
}
.amount{
	display: grid;
	grid-template-columns: repeat(2, max-content);
	align-items: center;
	grid-gap: 20px;
	grid-row-gap: 5px;
}
.amount .title{
	text-transform: unset;
	padding: 0;
}
.amount > div{
	display: grid;
	grid-template-columns: repeat(3, max-content);
	align-items: center;
	justify-content: center;
}
.amount span{
	cursor: pointer;
	width: 20px;
	text-align: center;
}
.amount .title,
.price > span{
	color: rgba(0,0,0,0.5);
}
.price .new{
	color: #f7454d;
}
.final_price{
	font-size: 19px;
	text-transform: uppercase;
	letter-spacing: var(--letter-spacing);
	border-top: 1px solid #31313163;
    padding: 15px 0;
}
.final_price span{
	font-weight: 500;
}
.submit{
	border-top: 1px solid #31313163;
    padding: 15px 0;
    display: grid;
	grid-template-columns: repeat(2, 1fr);
}
.submit input{
	cursor: pointer;
	width: 100%;
	max-width: unset;
	border: unset;
	text-transform: unset;
	font-weight: 300;
	letter-spacing: var(--letter-spacing);
	font-size: 14px;
	grid-column: 2/3;
}
.remove_btn{
	cursor: pointer;
	font-size: 14px;
	color: rgba(0,0,0,.5);
	letter-spacing: var(--letter-spacing);
	transition: .4s;
}
.remove_btn:hover{
	color: rgba(0,0,0,.9);
}
.recomendation li,
.recomendation li *{
	cursor: pointer;
}
.recomendation li img{
	height: 100%;
}
.recomendation li{
	margin: 5px 0;
	transition: .4s;
}
.recomendation li:hover{
	transition: .4s;
	background-color: rgba(200,200,200,0.2);
}
</style>