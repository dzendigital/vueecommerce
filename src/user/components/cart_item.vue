<template>
	<section>
		<transition-group name='cartChange' mode="out-in">
			<article v-for='item in CART_ITEM' :key='item.id'>
				<div>
					<div class="title">
						{{ item.title }}
					</div>
					<div class="preview">
						{{ item.preview }}
					</div>
					<div class="description">
						{{ item.description }}
					</div>
					<div class="options">
						<ul>
							<li class="option_title">
								Размер
							</li>
							<div @click.prevent='size_list = !size_list'
								 class="size_list" 
								 data-type='options'
								 :class="{ 'open' : size_list }">
								 {{ size_value }}
								<div class="open_down_arrow"></div>
							</div>
							<ul class="option_list">
								<li v-for='option in size_array' 
								    @click="updateItemOption('size', option)">
									{{ option }}
								</li>
							</ul>
						</ul>
						<ul>
							<li class="option_title">
								Цвет
							</li>
							<div @click.prevent='color_list = !color_list'
								 class="color_list" 
								 data-type='options'
								 :class="{'open' : color_list}">
								 {{ color_value }}
								<div class="open_down_arrow"></div>
							</div>
							<ul class="option_list">
								<li v-for='option in color_array' 
								    @click="updateItemOption('color', option)">
									{{ option }}
								</li>
							</ul>
						</ul>
					</div>
					<div class="price">
						<div class="new">
							от {{ item.price | priceFormat }} руб.
						</div>
						<span class="old" 
							  v-if='item.price_old'>
							{{ item.price_old }} руб.
						</span>
					</div>
					<form action="">
						<div class="amount">
							<span data-action='amount_minus'
									  onselectstart="return false"
							      @click.prevent="amount == 1 ? '' : amount--">
							  -
							</span>
							<span>{{ amount }}</span>
							<span data-action='amount_plus'
								  onselectstart="return false"
							      @click.prevent="amount++">
							  +
							</span>
						</div>
						<div>
							<input class='main_button' 
								   type="submit" 
								   value="В корзину"
								   @click.prevent='addToCart(item.id)'>
						</div>
						<div>
							<transition name="fade">
								<span class="system_info"
									  v-if='system_info_addedToCart'>
									Добавлено
								</span>
							</transition>
						</div>

					</form>
				</div>
				<div class='img'>
					<img :src="'/assets/img/items/' + item.img">
				</div>
			</article>
		</transition-group>	
	</section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default{
	name: 'CartItem',
	data(){
		return {
			amount: 1,
			system_info_addedToCart: 0,
			timer: false,
			size_list: false,
			size_value: 'L',
			size_array: ['L', 'M', 'S'],
			color_list: false,
			color_value: 'Белый',
			color_array: ['Белый', 'Серый', 'Фиолетовый'],
		}
	},
	computed: {
		...mapGetters([
			'CART_ITEM',
			'BASKET_LIST'
		]),
	},
	methods: {
		...mapActions([
			'ADD_ITEM_TO_BASKET',
			'ADD_AMOUNT',
			'CALCULATE_BASKET_INFO'
		]),
		addToCart(id){
			/* проверим что товар уже есть в корзине (вернет key под которым товар в массиве basket) */
			this.closeAllOptions();
			let in_basket = this.checkCart(id);
			let payload = {};
			switch (in_basket){
				case -1:
					payload = {
						item: this.CART_ITEM[0],
						size: this.size_value,
						color: this.color_value,
						amount: this.amount, 
					};
					this.ADD_ITEM_TO_BASKET(payload);
				break;
				default:
					payload = {
						key: in_basket,
						amount: this.amount
					};
					this.ADD_AMOUNT(payload);
				break;
			}
			this.showSystemMessage(4);
			this.CALCULATE_BASKET_INFO();
		},
		checkCart(id){
			let vm_item = this;
			/* проверим, совпадают ли опции товара ( устанавливаются заранее ) */
			let similar_items = -1;
			this.BASKET_LIST.forEach(function(value, key){
				if(id == value.item.id){
					if(vm_item.color_value == value.color && 
					   vm_item.size_value == value.size){
						similar_items = key;
					}
				}
			})
			return similar_items;
		},
		showSystemMessage(time){
			let vm_cart = this;
			this.system_info_addedToCart = time;
			if(!this.timer){
				var timerId = setInterval(function(){
					if(vm_cart.system_info_addedToCart > 0){
						vm_cart.system_info_addedToCart--;
					}
				}, 1000);
				this.timer = true;
			}	
		},
		updateItemOption(option, value){
			switch(option){
				case 'size':
					this.size_value = value;
				break;
				case 'color':
					this.color_value = value;
				break;
			}
			this.closeAllOptions(option);
		},
		closeAllOptions(option = null){
			switch(option){
				case 'size':
					this.size_list = false;
				break;
				case 'color':
					this.color_list = false;
				break;
				default: 
					this.size_list = false;
					this.color_list = false;
				break;
			}
		}
	},
}
</script>
<style scoped="cart_item">
img{
	width: 100%;
}
article{
	/*padding-top: 10px;*/
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 20px;
}
article *{
	line-height: var(--line-height);
}
article div{
	position: relative;
}
article .img img{
	max-height: 600px;
	object-fit: contain;
}
.article_outer{
	padding-top: 0px;
}
.title{
	font-size: 30px;
	font-weight: 700;
	color: var(--main-color);
	line-height: 40px;
}
form,
.preview,
.options,
.price,
.description{
	padding: 15px 0 0;
	font-size: 14px;
	letter-spacing: var(--letter-spacing);
	line-height: var(--line-height);
}
.options,
.price{
	margin-bottom: 20px;
}
.options{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 20px;
}
.option_title{
	font-size: 12px;
	line-height: 22px;
}
input[type='text']{
	width: 100%;
	box-sizing: border-box;
	padding: 5px 20px;
	border: 1px solid rgba(0,0,0,.8);
	line-height: 25px;
}
.price{
	color: #f7454d;
	font-size: 30px;
}
form{
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 20px;
	align-items: center;
}
.amount{
	display: grid;
	grid-template-columns: 1fr 5fr 1fr;
	justify-items: center;
	align-items: center;
}
.amount span{
	cursor: pointer;
	width: 100%;
	height: 100%;
	text-align: center;
	padding: 10px 0;
	display: grid;
	align-items: center;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	line-height: 18px;
}
.amount{
	border: 1px solid #333333;
}
.amount span[data-action='amount_minus']{
	border-right: 1px solid #333333;
}
.amount span[data-action='amount_plus']{
	border-left: 1px solid #333333;
}
input[type='submit']{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
    border: unset;
    letter-spacing: var(--letter-spacing);
    max-width: unset;
    text-transform: unset;
    font-size: 14px;
    font-weight: 300;
    cursor: pointer;
}
/* анимация появления фразы: добавлено */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}	
div[data-type='options']{
	background-color: #fff;
	cursor: pointer;
	border: 1px solid rgba(0,0,0,.8);
	padding: 5px 20px;
	line-height: 25px;
}
.color_list,
.size_list{
	position: relative;
}
.open_down_arrow{
	position: absolute;
	right: 0;
	top: 0;
	height: 100%;
	width: 35px;
}
.option_list{
	height: 0;
	opacity: 0;
	z-index: -1;
	position: relative;
}
.open + .option_list{
	height: auto;
	z-index: 1;
	opacity: 1;
	transition: .4s;
}
.option_list li {
	background-color: #fff;
	cursor: pointer;
	border: 1px solid rgba(0,0,0,0.6);
	padding: 5px 20px;
	line-height: 25px;
	border-top: unset;
	color: #000;
	transition: .4s;
}
.option_list:hover li {
	color: rgba(0,0,0,.6);
	transition: color .4s;
}
.option_list li:hover {
	transition: .4s;
    background-color: #f8f8f8;
	color: #000;
}
</style>