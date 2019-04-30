<template>
	<div :class="s.wraper">
		<div :class="s.left">
			<h3 :class="s.title">基础组件</h3>
			<drag-area></drag-area>
		</div>
		<div :class="s.content">
			<view-area></view-area>
		</div>
		<div :class="s.right">
			<edit-area></edit-area>
		</div>
		<div :class="s.btnBar">
			<Button type="default" style="margin-right: 16px;" @click="show=true">预览</Button>
			<Button type="primary" @click="getData">提交配置</Button>
		</div>
		<priview-modal v-if="show" v-model="show"></priview-modal>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import dragArea from './drag-area'
import viewArea from './view-area'
import editArea from './edit-area'
import priviewModal from './priview-modal'
export default {
	name: "homePage",
	components: {
		dragArea,
		viewArea,
		editArea,
		priviewModal
	},
	data() {
		return {
			show: false
		}
	},
	computed: {
		...mapState([
            'componentsList'
        ])
	},
	methods: {
		getData() {
			console.log('最终模版JSON配置：------------------------->', this.componentsList);
		}
	}
}
</script>
<style module="s" lang="scss" src="./index.scss"></style>
<style>
	.no-move {
		transition: transform 0s;
	}
	
	.smart-web-ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}
</style>