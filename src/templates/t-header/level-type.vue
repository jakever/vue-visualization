<template>
    <Select v-model="level" style="width:194px" transfer @on-change="onChange">
        <Option 
            v-for="item in levelList" 
            :value="item.value" 
            :key="item.value">{{ item.label }}</Option>
    </Select>
</template>
<script>
export default {
    props: {
        value: [Number, String],
    },
    data() {
        return {
            level: '',
            levelList: [{
                value: 1,
                label: 'H1'
            }, {
                value: 2,
                label: 'H2'
            }, {
                value: 3,
                label: 'H3'
            }, {
                value: 4,
                label: 'H4'
            }, {
                value: 5,
                label: 'H5'
            }, {
                value: 6,
                label: 'H6'
            }]
        }
    },
    watch: {
        value: {
            handler: function (val) {
                this.level = val
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