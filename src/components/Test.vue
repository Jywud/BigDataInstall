<template>
<div class="test">
	<input type="text" v-model="name">
	<div>啦啦啦啦lalalal{{name}}</div>
</div>

	
</template>
<script>
import {bus} from 'common/js/bus.js'
export default{
	data (){
		return {
			name: '小新'
		}
	},
	watch: {
		name(newName) {
			bus.$emit('changeName', newName);
		}
	}	
}
	
</script>