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
                value: 'date',
                label: 'date'
            }, {
                value: 'daterange',
                label: 'daterange'
            }, {
                value: 'datetime',
                label: 'datetime'
            }, {
                value: 'datetimerange',
                label: 'datetimerange'
            }, {
                value: 'year',
                label: 'year'
            }, {
                value: 'month',
                label: 'month'
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