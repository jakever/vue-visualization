<template>
    <RadioGroup v-model="size" type="button" @on-change="onChange">
        <Radio label="small"></Radio>
        <Radio label="default"></Radio>
        <Radio label="large"></Radio>
    </RadioGroup>
</template>
<script>
export default {
    props: {
        value: String,
    },
    data() {
        return {
            size: ''
        }
    },
    watch: {
        value: {
            handler: function (val) {
                this.size = val
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