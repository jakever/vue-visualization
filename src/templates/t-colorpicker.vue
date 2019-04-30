<template>
    <ColorPicker 
        v-model="color" 
        recommend 
        @on-active-change="onChange" />
</template>
<script>
export default {
    props: {
        value: String,
    },
    data() {
        return {
            color: ''
        }
    },
    watch: {
        value: {
            handler: function (val) {
                this.color = val
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