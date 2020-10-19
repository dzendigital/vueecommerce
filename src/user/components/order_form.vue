<template>
	<section>
		<div class="order-form" 
			 v-if='orderForm'
			 >
			<form data-action='order'>
				<div>
					<input type="text"
						   placeholder="Ваше имя"
						   name="name" 
						   autocomplete="off" 
						   v-model='orderFormData.name'>
				</div>
				<div>
					<input type="text"
						   placeholder="Ваш телефон"
						   name="phone" 
						   autocomplete="off" 
						   v-model='orderFormData.phone'>
				</div>
				<div :class="{ 'open' : way_list_status }">
					<input type="text"
						   placeholder="Удобный способ связи"
						   name="way" 
						   autocomplete="off" 
						   v-model='orderFormData.way'
						   readonly
						   @click.prevent='changeWayListStatus()'>
					<div class="open_down_arrow"
						 @click.prevent='changeWayListStatus()'></div>
					<ul class="waylist" v-show='way_list_status'>
						<li v-for='way of way_list'
							@click.prevent='setWayValue(way)'>
							{{ way }}
						</li>
					</ul>
				</div>
			</form>
			<div class="submit" v-if='orderForm'>
					<div class="system_error" v-if='this.errorStatus'>
						{{ errorText }}
					</div>
					<input type="submit" 
						   value="Оформить" 
						   class="main_button"
						   @click.prevent="postOrder($event, 'order')">
			</div>
		</div>
	</section>
</template>
<script>
import { mapActions } from 'vuex'
export default{
	name: 'orderForm',
	props: ['orderForm'],
	data(){
		return{
			orderFormData: {
				name: '',
				phone: '',
				way: '',
			},
			way_list: ['whatsup', 'telegram', 'insta', 'vk'],
			way_list_value: '',
			way_list_status: false,
			errorText: 'Ошибок нет',
			errorStatus: false,
			ordrerResponseMessage: ''	
		}
	},
	methods: {
		...mapActions([
			'CLEAR_BASKET',
			'CALCULATE_BASKET_INFO',
			'CHANGE_ORDER_POSTED_STATUS'
		]),
		validateForm($event){
			this.errorStatus = false;
			if(this.orderFormData.name.replace(/\s+/g,'') == ""){
				this.errorText = 'Нужно заполнить поле Имя';
				this.errorStatus = true;
				return false;
			}
			if(this.orderFormData.phone.replace(/\s+/g,'') == ""){
				this.errorText = 'Нужно заполнить поле Телефон';
				this.errorStatus = true;
				return false;
			}
			if(this.orderFormData.way.replace(/\s+/g,'') == ""){
				this.errorText = 'Нужно заполнить поле Способ связи';
				this.errorStatus = true;
				return false;
			}
		},
		closeAllOptions(option = null){
			switch (option){
				default:
					this.way_list_status = false;
				break;
			}
		},
		changeWayListStatus(){
			this.way_list_status = !this.way_list_status;
		},
		setWayValue(way){
			this.orderFormData.way = way;
			this.closeAllOptions();
		},
		postOrder($event, order){
			this.validateForm();
			if(this.errorStatus){
				console.log('не заполнены поля');
				return false;
			}
			let vm_form = this;
			let form = document.querySelector(`form[data-action='${order}']`);
			let formData = new FormData(form);
			async function postRequest(){
				let request = await fetch('/api/order.php', {
					method: 'POST',
					header: {
						'Content-Type': 'form/multipart'
					},
					body: formData
				});
				let response = await request.json();
				return response;
			}
			postRequest()
			.then( (response) => vm_form.CLEAR_BASKET() )
			.then( () => vm_form.CALCULATE_BASKET_INFO() )
			.then( () => vm_form.CHANGE_ORDER_POSTED_STATUS(true) )
			// console.log('Заказ отправлен');
			for(let key in this.orderFormData){
				this.orderFormData[key] = '';
			}
			// console.log('Форма отчищена');

		},
	}
}	
</script>
<style scoped="orderForm">
input[type="text"]{
    width: 100%;
    box-sizing: border-box;
    padding: 5px 20px;
    border: 1px solid rgba(0,0,0,.8);
    line-height: 25px;
	background-color: unset;
}
form{
	display: grid;
	grid-template-rows: repeat(3, max-content);
	grid-gap: 10px;
	padding: 0 0 15px;
}
form > div{
	position: relative;
}
.submit{
	border-top: 1px solid #31313163;
	padding: 15px 0;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}
input[type='submit']{
	cursor: pointer;
	width: 100%;
	max-width: unset;
	border: unset;
	text-transform: unset;
	font-weight: 300;
	letter-spacing: var(--letter-spacing);
	font-size: 14px;
	grid-column: 2/3;
	padding: 10px 10px;
	box-sizing: border-box;
	display: block;
	color: #fff;
	background-color: #333333;
	text-shadow: 0px 0px 1px #fff;
	height: max-content;
}
input[readonly="readonly"]{
	cursor: pointer;
}
.waylist li {
    width: 100%;
    box-sizing: border-box;
    padding: 5px 20px;
    border: 1px solid rgba(0,0,0,.8);
    line-height: 25px;
    border-top: unset;
    font-size: 13px;
	cursor: pointer;
}
</style>