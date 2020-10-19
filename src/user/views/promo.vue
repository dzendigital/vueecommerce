<template>
	<div class="outer catalog">
		<div class="inner">
			<ul>
				<li v-for='item in catalogList' @click='openArticle(item)'>
					<a :data-id="item.id">
						<div class="img">
							<img :src="item.img | srclize">
						</div>
						<div class="title">
							{{ item.title }}
						</div>
						<div class="preview">
							{{ item.preview }}
						</div>

					</a>
				</li>
			</ul>
		</div>
		<article :class="{'visible': isActive}" :id='articleItem.id'>
			<div id="close" @click='closeArticle'>
				
			</div>
			<div class="bg">
				<div class="inner">
					<div class="title">
						{{ articleItem.title }}
					</div>
					<div class="preview">
						{{ articleItem.preview }}
					</div>
					<div class="price">
						₽ {{ articleItem.price | priceFormat }}
					</div>
					<div class="description">
						{{ articleItem.description }}
					</div>
				</div>
				<img :src="articleItem.img | srclize" alt="">
			</div>
		</article>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'promo',
	data: function(){
		return{
			// catalogList: [],
			isActive: false,
			articleItem: {
				id: 1,
				title: 'Двойная пепперони',
				preview: 'Двойная порция пепперони',
				price: 550,
				description: 'Соус «Томатный», сыр «Моцарелла», двойная порция пепперони.',
				img: '01.png',
			}
		}
	},
	computed: {
		...mapGetters(['catalogList']),
	},
	methods: {
		...mapActions(['getCatalogList']),
		closeArticle(){
			this.isActive = !this.isActive;
		},
		openArticle(item){
			this.articleItem = item;
			this.isActive = !this.isActive;
		}
	},
	async mounted(){
		switch (this.catalogList.length){
			case 0:
				this.getCatalogList();
			break;
		}
	},
	filters: {
		srclize(value) {
			value = `/assets/img/items/${value}`;
			return value;
		},
		priceFormat(value){
			value = new Intl.NumberFormat(
				{ 
					style: 'currency', 
					currency: 'RUB',
					maximumSignificantDigits: 3
				}
			).format(value);
			return value;
		}
	}
}
</script>
<style scoped='promo'>
div[data-v-ef5001ca]{
	--font-bold: 700;
	--font-light: 300;
}
ul{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin-top: 30vh;
}
li{
	padding: 50px;
}
li:nth-of-type(even){
	margin-top: 150px;
}
a{
	cursor: pointer;
}
.img{
	width: 300px;
	height: 300px;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	padding: 40px;
	background-color: #eee;
	position: relative;
}
.img img{
	position: absolute;
	top: -80px;
	right: -80px;
	max-width: unset;
	width: 350px;
}
.title{
	font-weight: var(--font-bold);
	padding-top: 8px;
	font-size: 24px;
}
.preview{
	padding-top: 6px;
	color: #a09897;
	text-transform: uppercase;
	font-size: 14px;
}
a:hover .preview{
	color: #d35066;
}
/* >>> article */
article{
	display: none;
}
article.visible{
	position: fixed;
	display: grid;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: #fff;
}
article .bg {
    width: 100%;
    height: 50vh;
    background-color: #eee;
    position: absolute;
    bottom: 0; 
}
article .title{
	padding: 0;
	position: relative;
	margin-top: -80px;
	font-size: 60px;
}
article .preview{
	padding-top: 15px;
	font-size: 19px;
}
article .price{
	color: #d35066;
	font-weight: var(--font-bold);
	font-size: 50px;
	padding: 30px 0;
}
article img{
    z-index: 1;
	display: block;
	justify-self: right;
	position: absolute;
	right: 20px;
	bottom: 120px;
	width: 40vw;
}
article .description{
	font-size: 22px;
	max-width: 50vw;
}
#close{
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 2;
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: center;
    background: url(https://cdn.onlinewebfonts.com/svg/img_246967.png);
    background-size: contain;
    cursor: pointer;
}
/* <<< article */
</style>