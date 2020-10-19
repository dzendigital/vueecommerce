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
	</div>
</template>
<script>
export default{
	data(){
		return {

		}
	}
}
</script>
<style scoped="breadcrumbs">
.inner{
	position: relative;
}
.breadcrumbs{
	background-color: #f8f8f8;
	position: relative;
	background-clip: content-box;
	/*margin-bottom: 50px;*/
}
.breadcrumbs_list{
	text-align: center;
	text-align: center;
	font-size: 14px;
}
ul{
	padding: 35px 0;
}
a{
	color: unset;	
}
span{
	padding-left: 16px;
}
</style>