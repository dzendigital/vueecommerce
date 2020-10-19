<template>
	<ul class="category">
		<li class="parent">
			<a href="" @click.prevent='goToCatalogCategory(null)'>Все разделы</a>
		</li>
		<li v-for='li in CATEGORY_LIST' 
			:key='li.id' 
			class="parent"
			:class="{'open' : li.isVisible, 'hasChildren' : li.children}"
			>
			<div class="category_item">
				<div class="icon" 
					 @click.prevent='categoryOpen(li, $event)'>
					<div class="open_down_arrow"
					   	 v-if='li.children'>
						
					</div>
				</div>
				<a href="" @click.prevent='goToCatalogCategory(li.id)'>
					{{ li.name }}
				</a>
			</div>
			

			<ul class="child hidden" v-if='li.children'>
				<li v-for='child in li.children'>
					<a href=""
					   @click.prevent='goToCatalogCategory(child.id)'> 
						{{ child.name }}
					</a>
				</li>
			</ul>
		</li>
	</ul>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default{
	data(){
		return{
		}
	},
	methods: {
		...mapActions([
			'CREATE_CATALOG_LIST_BY_CATEGORY',
		]),
		goToCatalogCategory(id){
			if(id == null){
				this.$router.push( {name: 'catalog' } );

			}else{
				let prevCategory = this.$route.params.category;
				let nextCategory = id;
				if(prevCategory != nextCategory){
					// this.CREATE_CATALOG_LIST_BY_CATEGORY(id);
					this.$router.push( {name: 'catalog', params: {category: id} } );
				}
			}
		},
		categoryOpen(li, event){ 
			if(event.target.closest('li').classList.contains('open')){
				event.target.closest('li').classList.remove('open');
			}else{
				event.target.closest('ul.category').querySelectorAll('li.parent').forEach(function(value, key){
					value.classList.remove('open');
				});
				event.target.closest('li').classList.add('open');
			}
		}
	},
	computed: {
		...mapGetters(['CATEGORY_LIST'])
	},
}
</script>
<style scoped="category">
.category{
	line-height: 22px;
}
ul{
	display: grid;
	grid-template-columns: repeat(4, max-content);
	justify-content: center;
	grid-gap: 25px;
}
.parent{
	z-index: 1;
	position: relative;
}
.hasChildren{
	padding-right: 20px;
}
.child{
	position: absolute;
	grid-template-columns: auto;
	top: 0px;
}
.child.hidden{
	display: none;
}
.open .child{
	display: grid;
}
.hasChildren.open .child{
	padding-top: 40px;
}
#sidebar .child{
	padding-top: 0;
}
#sidebar .parent{
	min-height: 30px;
}
.category_item{
	z-index: 2;
	position: relative;
}
.box .category_item{
	position: static;
}

</style>