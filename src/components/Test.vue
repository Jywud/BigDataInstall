<template>
<div class="test">
	<input type="text" v-model="name">
	<div>啦啦啦啦lalalal{{name}}</div>
	<span v-for="item in list">{{item.name}}</span>
</div>

	
</template>
<script>
import {bus} from 'common/js/bus.js'
export default{
	mounted() {
		console.log(this.list[0].name);
	},
	props: ['list'],
	data (){
		return {
			name: '小新'
		}
	},
	watch: {
		list() {

		},
		name(newName) {
			bus.$emit('changeName', newName);
		}
	}	
}
	
</script>