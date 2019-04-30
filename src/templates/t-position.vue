<template>
     <RadioGroup v-model="position" type="button" @on-change="onChange">
        <Radio label="left"></Radio>
        <Radio label="center"></Radio>
        <Radio label="right"></Radio>
    </RadioGroup>
</template>
<script>
export default {
    props: {
        value: String,
    },
    data() {
        return {
            position: ''
        }
    },
    watch: {
        value: {
            handler: function (val) {
                this.position = val
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