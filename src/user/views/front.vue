<template>
	<section class="front">
		<div class="outer slider">
			<div class="inner">
				<slider-front-component />							
			</div>
		</div>
		<div class="outer">
			<div class="inner">
				<category-component />
			</div>
		</div>
		<div class="outer advantage">
			<div class="inner">
				<article>
					<div class="img">
						<img src="/assets/img/other/o01.jpg" alt="">
					</div>
					<div>
						<div class="text">
							С каждым новым сезоном мы задаемся вопросом: “Что надеть?”. Шкаф полон одежды, но надеть снова нечего — это парадокс! Знакомая ситуация? Это означает, что в гардеробе нет самых необходимых вещей, которые составляют основу
						</div>
						<a class="main_button" 
						   data-action="catalog" 
						   @click.prevent="goTo('catalog')">
							Посмотреть
						</a>
					</div>
				</article>
			</div>
			<div class="inner">
				<article>
					<div class="img">
						<img src="/assets/img/other/o02.jpg" alt="">
					</div>
					<div data-side='left'>
						<div class="text">
							 Вещи базового гардероба можно носить каждый сезон, обновляя по мере изнашивания. Любая модная новинка всегда идеально встраивается в такой гардероб и смотрится восхитительно! Именно поэтому можно не тратить много денег, но всегда выглядеть стильно.
						</div>
						<a class="main_button" 
						   data-action="catalog" 
						   @click.prevent="goTo('catalog')">
							Посмотреть
						</a>
					</div>
				</article>
			</div>
		</div>
		<div class="outer feedback">
			<div class="inner">
				<div class="title">
					Отзывы покупателей
				</div>
				<section>
					<article>
						<div class="title">
							Анна
						</div>
						<div class="text">
							Хороший магазин, быстро ответили по наличию нужных размеров и рассказали, как заказать доставку. Понравилось, что отправили очень быстро и сразу написали трек-номер. Спасибо!  
						</div>
					</article>
				</section>
			</div>
		</div>
		<div class="outer special">
			<div class="inner">
				<div class="title">
					Каталог
				</div>
				<section>
					<slider-special-component />	
				</section>
			</div>
		</div>
		<div class="outer banner" style="background-image: url('/assets/img/background/b03.png');">
			<div class="inner">
				<article>
					<div class="text">
						В модных трендах весны-лета 2020 дизайнеры делают акцент на экологичности в своих коллекциях. Во-первых, мы должны отдать должное тем дизайнерам, которые уже много лет говорят об окружающей среде и работают над экологичностью.
					</div>
					<a class="main_button" data-action='catalog' 
					   @click.prevent="goTo('catalog')">
						Посмотреть
					</a>
				</article>
			</div>
		</div>
		<div class="outer smm">
			<div class="inner">
				<div class="title">
					Мы в Instagram
				</div>
				<a href="https://www.instagram.com/bono_store_official/">@böno</a>
			</div>
			<div class="inner">
				<section>
					<div class="img">
						<a href="/">
							<img src="/assets/img/other/i01.jpg" alt="">
						</a>
					</div>
					<div class="img">
						<a href="/">
							<img src="/assets/img/other/i02.jpg" alt="">
						</a>
					</div>
					<div class="img">
						<a href="/">
							<img src="/assets/img/other/i03.jpg" alt="">
						</a>
					</div>
					<div class="img">
						<a href="/">
							<img src="/assets/img/other/i01.jpg" alt="">
						</a>
					</div>
				</section>
				<div class="text">
					Подпишись на наш аккаунт и будь всегда в курсе акций, распродаж и скидок. При подписке на наш аккаунт получи скидку в нашем магазине. <a href="">Подробнее</a>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import Category from '../components/category.vue'
import SliderFront from '../components/sliderFront.vue'
import SliderSpecial from '../components/sliderSpecialItems.vue'
export default {
	name: 'frontpage',
	data: function(){
		return {
			
		}
	},
	methods: {
		goTo(route){
			console.log(route)
			this.$router.push({name: route});
		},
	},
	mounted(){

	},
	components:{
		'category-component' : Category,
		'slider-front-component' : SliderFront,
		'slider-special-component' : SliderSpecial
	}

}
</script>
<style scoped="front">
.slide{
	width: 100%;
	height: 525px;
	-webkit-background-size: cover;
	background-size: cover;
	background-position: top right;
	background-repeat: no-repeat;
	display: grid;
	grid-template-rows: repeat(3, 1fr);
}
.slide article{
	grid-row: 2/4;
	margin-left: 100px;
	max-width: max-content;
	position: relative;
	padding: 50px 80px;
	box-sizing: border-box;
	height: max-content;
}
.slide article:before,
.slide article:after{
	position: absolute;
	z-index: 1;
	content: '';
	width: 50%;
	height: 50%;
}
.slide article:before{
	top: 0;
	left: 0;
	border-top: 1px solid #fff;
	border-left: 1px solid #fff;
	box-shadow: -1px -1px 0px 0px #000;
}
.slide article:after{
	right: 0;
	bottom: 0;
	border-right: 1px solid #fff;
	border-bottom: 1px solid #fff;
	box-shadow: 1px 1px 0px 0px #000;
}
.slide .title{
	letter-spacing: .6px;
}
.slide .title,
.slide .text{
	color: var(--main-color);
}
.slide .title{
	font-size: 40px;
}
.slide .text{
	font-size: 20px;
	padding-top: 5px;
	padding-bottom: 25px;
}
.special .inner > .title{
  text-align: center;
  font-weight: 500;
  font-size: 30px;
  padding: 15px 0 30px;
  letter-spacing: .6px;
}
.advantage article{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	padding: 40px 0 35px;
}
.advantage article:not(:last-child){
	border-bottom: 1px solid rgba(0,0,0,0.3);
}
.advantage img{
	width: 255px;
	margin: 0 auto;
	display: block;
}
.advantage div[data-side='left']{
	order: -1;
}
.advantage article > div:not(.img){
	display: grid;
	grid-template-rows: repeat(3, 1fr);
}
.advantage .text{
	grid-row: 2/3;
	letter-spacing: .6px;
	line-height: var(--line-height);
}
.advantage a{
	grid-row: 3/4;
	text-transform: unset;
	font-weight: unset;
	font-size: 14px;
	letter-spacing: .6px;
}
.feedback{
	background-color: #f8f8f8;
	background-clip: content-box;
}
.feedback .inner > .title{
	text-align: center;
	font-size: 30px;
	font-weight: 500;
	padding-top: 30px;
	letter-spacing: .6px;
}
.feedback section{
	padding: 70px 0 90px;
	text-align: center;
	max-width: 640px;
	margin: auto;
}
.feedback section .title{
	font-size: 22px;
}
.feedback .text{
	font-size: 14px;
	line-height: var(--line-height);
	letter-spacing: .6px;
}
.feedback article{
	display: grid;
	grid-gap: 20px;
}
.outer.banner{
	display: grid;
	justify-content: center;
	align-items: center;
	grid-template-rows: 475px;
	background-clip: content-box;
	background-size: cover;
	background-position: top left;
	background-repeat: no-repeat;
}
.banner article{
	margin: 0 auto;
	max-width: 530px;
	background-color: rgba(255,255,255,.6);
	padding: 50px 50px 20px;
	display: grid;
	justify-content: center;
	grid-template-rows: repeat(2, max-content);
	text-align: center;
}
.banner a{
	margin: 30px 0;
	text-transform: unset;
	font-weight: unset;
	font-size: 14px;
	letter-spacing: .6px;
	display: block;
	justify-self: center;
	width: 148px;
}
.banner .text{
    font-size: 14px;
    letter-spacing: .6px;
    line-height: 21px;
}
.outer.smm{}
.smm .inner > .title{
	text-align: center;
	font-size: 30px;
	font-weight: 500;
	padding: 10px 0 5px;
	letter-spacing: .6px;
}
.smm .inner a{
	display: block;
	text-align: center;
	font-size: 24px;
	letter-spacing: 1px;
}
.smm .inner section{
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	padding: 35px 0 25px;
}
.smm .inner .text{
	font-size: 14px;
	letter-spacing: .6px;
}
.smm .inner .text a{
	font-size: 14px;
	display: inline;
	color: #f7454d;
}

</style>