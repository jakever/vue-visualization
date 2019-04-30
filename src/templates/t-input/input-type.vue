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
                value: 'text',
                label: 'text'
            }, {
                value: 'password',
                label: 'password'
            }, {
                value: 'textarea',
                label: 'textarea'
            }, {
                value: 'url',
                label: 'url'
            }, {
                value: 'email',
                label: 'email'
            }, {
                value: 'date',
                label: 'date'
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