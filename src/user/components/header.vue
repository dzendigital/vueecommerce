<template>
	<section>

		<!-- <nav :class="{'hidden' : !ASIDE_MENU_STATE }"
			 v-on:click="changeMenuStatus"
			 id="sidebar"> -->
		<transition name="menuSlide">	
			<nav v-show='ASIDE_MENU_STATE'
				 v-on:click="changeMenuStatus"
				 id="sidebar">	
				<div>
					<div id="close">
						<svg data-nav="close" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 224.512 224.512" style="enable-background:new 0 0 224.512 224.512;" xml:space="preserve">
							<g>
								<polygon fill="currentColor" points="224.507,6.997 217.521,0 112.256,105.258 6.998,0 0.005,6.997 105.263,112.254 
									0.005,217.512 6.998,224.512 112.256,119.24 217.521,224.512 224.507,217.512 119.249,112.254 	"></polygon>
							</g>
						</svg>
					</div>
					<div class="box">
						<div class="title">
							<router-link to="/">БÖНО</router-link>
						</div>
					</div>
					<div class="box">
						<category-component />
					</div>
					<div class="box">
						<router-link v-for='(li, index) in GET_NAVIGATION_MENU' 
							         :to="li.path"
							         :key='index'>
							{{ li.name }}
						</router-link>
					</div>
					<div class="box">
						<ul class="social-media">
							<li v-for='li in socialMedia'>
								<a :href="li.link" v-html='li.icon'></a>
							</li>
						</ul>
					</div>
					<div class="box">
						<a href="tel:+7999999999">+7 (999) 99 99 99</a>
						<a href="mailto:official_store@bono.com">official_store@bono.com</a>
						<a data-action='callback'>Обратная связь</a>
					</div>
				</div>
			</nav>
		</transition>	
		<!-- <<< навигационное меню -->
		<transition name='basketTransition'>
			<basket-component 
				v-on:changeBasketStatus="changeBasketStatus($event)" 
				v-show='ASIDE_BASKET_STATUS'/>
		</transition>
		<!-- <<< корзина -->
		<div class="inner">
			<header>
				<button data-nav="open"
					    v-on:click="changeMenuStatus">
					<span id="top"></span>
					<span id="middle"></span>
					<span id="bottom"></span>
				</button>
				<div class="title">
					<router-link to="/">БÖНО</router-link>
				</div>
				<div class="buttonset">
					<!-- <a data-action="search">
						<i class="fas fa-search"></i>
					</a>
					<a data-action="office">
						<i class="far fa-user-circle"></i>
					</a> -->
					<a data-action="cart"
					   @click.prevent='CHANGE_BASKET_STATUS'>
					   	<span class="basket_amount_label" 
					  	  v-if='this.BASKET_TOTAL.amount'>
					  	{{ this.BASKET_TOTAL.amount }}
					  </span>
						<svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; width: 1.6em; display: block;" xml:space="preserve">
							<path d="M11.68,13l-0.833-5h-2.99C7.411,6.28,5.859,5,4,5C1.794,5,0,6.794,0,9s1.794,4,4,4c1.859,0,3.411-1.28,3.858-3h1.294l0.5,3
								H9.614l5.171,26.016c-2.465,0.188-4.518,2.086-4.76,4.474c-0.142,1.405,0.32,2.812,1.268,3.858C12.242,48.397,13.594,49,15,49h2
								c0,3.309,2.691,6,6,6s6-2.691,6-6h11c0,3.309,2.691,6,6,6s6-2.691,6-6h4c0.553,0,1-0.447,1-1s-0.447-1-1-1h-4.35
								c-0.826-2.327-3.043-4-5.65-4s-4.824,1.673-5.65,4h-11.7c-0.826-2.327-3.043-4-5.65-4s-4.824,1.673-5.65,4H15
								c-0.842,0-1.652-0.362-2.224-0.993c-0.577-0.639-0.848-1.461-0.761-2.316c0.152-1.509,1.546-2.69,3.173-2.69h0.791
								c0.014,0,0.025,0,0.039,0h38.994C57.763,41,60,38.763,60,36.013V13H11.68z M4,11c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2
								S5.103,11,4,11z M46,45c2.206,0,4,1.794,4,4s-1.794,4-4,4s-4-1.794-4-4S43.794,45,46,45z M23,45c2.206,0,4,1.794,4,4s-1.794,4-4,4
								s-4-1.794-4-4S20.794,45,23,45z M58,36.013C58,37.66,56.66,39,55.013,39H16.821l-4.77-24H58V36.013z"></path>
						</svg>
					</a>
				</div>
			</header>
		</div>
	</section>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import Category from './category.vue'
import Basket from './basket.vue'
export default{
	data(){
		return{
			socialMedia: [
				{
					name: 'Группа вконтакте',
					link: 'vk.com',
					icon: '<i class="fab fa-vk"></i>'
				},
				{
					name: 'Аккаунт инстаграм',
					link: 'instagram.com',
					icon: '<i class="fab fa-instagram"></i>'
				},
				{
					name: 'Группа Facebook',
					link: 'facebook.com',
					icon: '<i class="fab fa-facebook-square"></i>'
				}
			],
		}
	},
	computed: {
		...mapGetters([
			'ASIDE_MENU_STATE', 
			'BASKET_TOTAL',
			'ASIDE_BASKET_STATUS', 
			'GET_NAVIGATION_MENU',
		])
	},
	methods:{
		...mapActions(['TOGGLE_MENU', 'CHANGE_BASKET_STATUS']),
		categoryOpen(li){
			this.category.forEach(function(value, key){
				if(value != li)
				value.isVisible = false;
			});
			li.isVisible = !li.isVisible;
		},
		changeMenuStatus($event){
			if($event.target.dataset.nav || $event.target.id == 'sidebar'){
				this.TOGGLE_MENU();
			}
		},
		changeBasketStatus($event){
			if($event.target.dataset.nav || $event.target.id == 'basket'){
				this.CHANGE_BASKET_STATUS();
			}
		},
	},
	components: {
		'category-component' : Category,
		'basket-component' : Basket
	}
}
</script>
<style>
.box .category{
	display: block;
	width: max-content;
}
.box .category .child{
	/*display: block;*/
	grid-gap: 5px;
	padding-bottom: unset;
	position: static;
	padding-bottom: 10px;
	
}
.box .child li{
	padding-top: 10px;
	/*padding-left: 15px;*/
	position: relative;
	left: 15px;
    width: 75px;
}
.box li.parent{
	position: relative;
}
	
</style>
<style scoped="header">
#sidebar{
	z-index: 2;
}
.inner{
	/*background-color: rgb(255, 255, 255);*/
}
section{
	/*height: 108px;*/
	height: 48px;
	margin-bottom: calc(108px - 48px);
}
nav.visible{
	position: fixed;
	left: 0;
	top: 0;
	width: 20vw;
	height: 100%;
}
header{
	border-bottom: var(--border-bottom);
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	padding: 40px 0 30px;
	align-items: center;
}
button{
    justify-self: self-start;
    display: grid;
	align-items: center;
	width: 30px;
	height: 30px;
	z-index: 1;
}
button span{
	width: 100%;
	border-bottom: 1px solid;
	height: 0;
	z-index: -1;
}
.top{}
.middle{}
.bottom{}
.title{
    justify-self: center;
    font-size: 30px;
	letter-spacing: 10px;
}
.title a{
	letter-spacing: 10px;
}
.buttonset{
    width: max-content;
	font-size: 23px;
    display: grid;
    grid-template-columns: repeat(3, min-content);
	align-items: center;
    justify-self: self-end;
	justify-content: space-between;
}
.buttonset a{
	width: max-content;
	display: block;
	padding-left: 15px;
	position: relative;
}
.buttonset svg{
	display: block;
	height: 25px;
	width: auto;
}
.basket_amount_label{
	position: absolute;
	right: -2px;
	top: -4px;
	background-color: #fff;
	color: #000;
	border-radius: 50%;
	font-size: 10px;
	display: grid;
	align-items: center;
	grid-template-columns: 15px;
	grid-template-rows: 15px;
	justify-items: center;
	box-shadow: 0px 0px 0px 1px rgba(0,0,0,.9);
	transition: .4s;
}
.scrolled .basket_amount_label{
	grid-template-columns: 12px;
	grid-template-rows: 12px;
	transition: .4s;
}
/* всплывающее основное меню */
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
nav > div *{
	cursor: auto;
}
nav > div{
	cursor: auto;
	background-color: #fff;
	padding: 30px 35px 30px 40px;
	box-sizing: border-box;
	width: 330px;
	height: 100%;
	position: relative;
}
nav a{
	cursor: pointer;
}
nav *{
	letter-spacing: var(--letter-spacing);
}
nav .box{
	padding-bottom: 20px;
	margin-bottom: 20px;
	border-bottom: var(--border-bottom);
}
nav .box:last-child{
	border-bottom: unset;
	font-size: 14px;
}
.box > a,
nav li{
	padding-bottom: 10px;
}
nav .child > li{
	
}
.social-media{
	display: grid;
	grid-template-columns: max-content;
	grid-auto-flow: column;
	justify-content: flex-start;
	grid-gap: 5px;
}
.social-media li{
	padding-bottom: 0;
}
.box > a{
	display: block;
}
nav li a{
	padding-right: 10px;
}
li .fa-chevron-down{
	position: absolute;
	top: 5px;
	cursor: pointer;
	transition: .4s;
	font-size: 14px;
}
li.open .fa-chevron-down{
	transition: .4s;
	transform: rotate(-180deg);
}
#close svg{
	cursor: pointer;
}
#close{
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
nav a[data-action='callback']{
	color: #f7454d;
}
</style>