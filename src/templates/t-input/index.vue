<template>
    <Input 
     :style="{width: width+'px'}"
     :type="type"
     :size="size"
     :placeholder="placeholder"
     :search="search"
     :icon="icon" />
</template>
<script>
export default {
    props: {
        width: [Number, String],
        type: String,
        size: String,
        placeholder: String,
        search: Boolean,
        icon: String
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