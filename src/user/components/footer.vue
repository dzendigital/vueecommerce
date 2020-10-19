<template>
	<div class="outer footer">
		<div class="inner">
			<footer>
				<div class="title">
					БÖНО
				</div>
				<ul>
					<li v-for='(li, index) in GET_NAVIGATION_MENU'>
						<router-link :key='index' :to="li.path">{{ li.name }}</router-link>
					</li>
				</ul>
				<ul class="social-media">
					<li v-for='li in socialMedia'>
						<a :href="li.link" v-html='li.icon'></a>
					</li>
				</ul>
				<a href="tel:+7999999999">+7 (999) 99 99 99</a>
				<a href="mailto:official_store@bono.com">official_store@bono.com</a>
				<a data-action='callback'>Обратная связь</a>
			</footer>
		</div>
		<div class="inner">
			Интернет-мазагин БÖНО&trade;
		</div>
	</div>
</template>
<style scoped="footer">
.outer{
	align-self: flex-end;
	background-color: #f8f8f8;
	background-clip: content-box;
}
footer{
	padding: 50px 0px 30px;
}
.title{
	text-align: center;
    font-size: 30px;
	letter-spacing: 10px;
}
ul{
	display: grid;
	grid-template-columns: max-content;
	grid-auto-flow: column;
	justify-content: center;
	grid-gap: 20px;
	font-size: 14px;
	letter-spacing: .6px;
	padding: 20px 0;
}
.social-media{
	font-size: 18px;
}
footer > a{
	display: block;
	text-align: center;
	padding: 0 0 10px;
}
.inner:last-child{
	border-top: var(--border-bottom);
	text-align: center;
	padding: 20px 0 20px;
	font-size: 11px;
	letter-spacing: .6px;
}
</style>
<script>
import { mapGetters } from 'vuex'
export default{
	data(){
		return {
			footerMenu: ['Блог', 'Обратная связь', 'Каталог', 'Контакты', 'Доставка и оплата'],
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
			]
		}
	},
	computed: {
		...mapGetters([
			'GET_NAVIGATION_MENU'
		])
	}
}
</script>