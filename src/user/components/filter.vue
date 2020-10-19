<!-- 
для добавления filter-component нужно:
1. add component:
import Filter from '../components/filter.vue'
components: {
	'filter-component' : Filter,
	'item-component' : Item
}
<filter-component />

2. store_catalog:
UPDATE_FILTER_STATUS

3. add filter button template:
<div class="inner filter_button">
	<div>
		<a data-action='filter' @click.prevent='OPEN_FILTER'>
			<i class="fas fa-sliders-h"></i>
			<span>Фильтр</span>
		</a>
	</div>
</div>
.filter_button > div{
	border-top: var(--border-bottom);
	border-color: rgba(255, 255, 255, .6);
}
.filter_button a{
	display: grid;
	grid-template-columns: max-content;
	grid-auto-flow: column;
	align-items: center;
	padding: 30px 0;
	font-size: 14px;
	line-height: 22px;
	width: max-content;
}
4. catalog_breadcrumbs.vue:
вызвать OPEN_FILTER для изменения состояния фильтра
 -->
<template>
		<form action="">
			<div>
				<div class="title">
					Цена
					 <i data-v-39cd8628="" class="fas fa-chevron-down"></i> 
				</div>
				<div class="filter_item range_slider">
					<input type="range" value="0" min="0" max="5000" name="price_min">
					<input type="range" value="0" min="0" max="5000" name="price_max">
				</div>
			</div>
			<div>
				<div class="title">
					Материал
					 <i data-v-39cd8628="" class="fas fa-chevron-down"></i> 
				</div>
				<div class="filter_item">
					<input type="hidden" name="fabric">
					<ul>
						<li>
							Хлопок 
						</li>
						<li>
							Шерсть
						</li>
					</ul>
				</div>
			</div>
			<div>
				<div class="title">
					Цвет
					 <i data-v-39cd8628="" class="fas fa-chevron-down"></i> 
				</div>
				<div class="filter_item">
					<input type="hidden" name="сщдщк">
					<ul>
						<li>
							Белый
						</li>
						<li>
							Серый
						</li>
					</ul>
				</div>
			</div>
			<div>
				<div class="title">
					Размер
					 <i data-v-39cd8628="" class="fas fa-chevron-down"></i> 
				</div>
				<div class="filter_item">
					<input type="hidden" name="color">
					<ul>
						<li>
							S
						</li>
						<li>
							M
						</li>
						<li>
							L
						</li>
					</ul>
				</div>
			</div>
			<div class="submit">
				<input type="submit"
					   value="Применить"
					   @click.prevent>
			</div>
		</form>
</template>
<script>
import { mapGetters } from 'vuex'
export default{
	data(){
		return {

		}
	}
}
</script>
<style scoped="filter">
form > div{
	/*padding: 10px 0;*/
	font-size: 14px;
	letter-spacing: var(--letter-spacing);
}
form{
	width: 100%;
	padding: 0 30px 0 0;
	box-sizing: border-box;
}
.filter_item{
	border-bottom: var(--border-bottom);
	padding: 0 0 20px 0;
	margin: 20px 0;
}
.title{
	position: relative;
	/*padding: 0 0 40px;*/
}
.title > .fa-chevron-down {
	position: absolute;
	right: 0;
}
input{
	width: 100%;
	display: block;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	border: none;
}
</style>