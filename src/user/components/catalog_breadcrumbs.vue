<template>
	<div class="outer breadcrumbs">
		<div class="inner breadcrumbs_list">
			<ul>
				<li>
					<router-link to="/">Главная</router-link>
					-
					<router-link to="/catalog/">Каталог</router-link>
				</li>
			</ul>
		</div>
		<div class="inner">
			<div class="title">
				Каталог
			</div>
			<div class="amount">
				{{ CATALOG_LIST_BY_CATEGORY.length }} 
				{{ CATALOG_LIST_BY_CATEGORY.length | declensionFormat({0: 'товар', 1: 'товара', 2: 'товаров'}) }}
			</div>

		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default{
	data(){
		return {

		}
	},
	computed: {
		...mapGetters([
			'CATALOG_LIST_BY_CATEGORY'
		]),
	},
	methods: {
		...mapActions([])
	}
}
</script>
<style scoped="breadcrumbsCatalog">
.inner{
	position: relative;
}
.breadcrumbs{
	background-image: url('/assets/img/background/b04.png');
	background-clip: content-box;
	-ms-background-position-y: 35%;
	background-position-y: 35%;
	position: relative;
}
.breadcrumbs:before{
	position: absolute;
	content: '';
	top: 40px;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.3);
}
.breadcrumbs_list{
	text-align: center;
	text-align: center;
	font-size: 14px;
}
ul{
	padding: 35px 0;
}
a,
span,
.title,
.amount{
	letter-spacing: var(--letter-spacing);
	color: #fff;
}
.title{
	font-size: 43px;
	text-align: center;
}
.amount{
    text-align: center;
    font-size: 14px;
    padding: 10px 0 30px;
}

a .svg-inline--fa{
	font-size: 18px;
}
span{
	padding-left: 16px;
}
</style>