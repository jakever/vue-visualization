<template>
    <span :style="{
        color, 
        backgroundColor: bgColor, 
        fontSize: fontSize + 'px',
        display: 'inline-flex'}">{{text}}</span>
</template>
<script>
export default {
    props: {
        color: String,
        bgColor: String,
        fontSize: [Number, String],
        text: String
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    },
}
</script>