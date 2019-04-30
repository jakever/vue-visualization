<template>
    <DatePicker transfer
        v-model="date"
        :type="type" 
        :format="format"
        :placeholder="placeholder" 
        :style="{width: width+'px'}"
        @on-change="onChange">
    </DatePicker>
</template>
<script>
export default {
    name: 'tDatePicker',
    props: {
        width: [String, Number],
        type: String,
        format: String,
        placeholder: String
    },
    data() {
        return {
            date: ''
        }
    },
    computed: {
    },
    methods: {
        onChange(val) {
            // this.$emit('input', val)
        }
    }
}
</script>