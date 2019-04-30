<template>
    <Select v-model="type" style="width:194px" transfer @on-change="onChange">
        <Option 
            v-for="item in typeList" 
            :value="item.value" 
            :key="item.value">{{ item.label }}</Option>
    </Select>
</template>
<script>
export default {
    props: {
        value: String,
    },
    data() {
        return {
            type: '',
            typeList: [{
                value: 'default',
                label: 'default'
            }, {
                value: 'primary',
                label: 'primary'
            }, {
                value: 'dashed',
                label: 'dashed'
            }, {
                value: 'text',
                label: 'text'
            }, {
                value: 'info',
                label: 'info'
            }, {
                value: 'success',
                label: 'success'
            }, {
                value: 'warning',
                label: 'warning'
            }, {
                value: 'error',
                label: 'error'
            }]
        }
    },
    watch: {
        value: {
            handler: function (val) {
                this.type = val
            },
            immediate: true
        }
    },
    methods: {
        onChange(val) {
            this.$emit('input', val)
        }
    }
}
</script>