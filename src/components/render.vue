<template>
	<component :is="node.component" :config="node.config" :attr="node.config">
		<template v-if="node.nest && node.children && node.children.length > 0">
			<render v-for="child in node.children" :key="child.id" :node="child" />
		</template>
	</component>
</template>
<script>
import tButton from './templates/t-button/setting'
export default {
	name: 'render',
	nest: true,
    props: {
		node: {
			type: Object,
			default: function() {
				return {}
			}
		}
	},
	components: {
		tButton
	}
}
</script>