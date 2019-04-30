<template>
    <Button 
        :type="type" 
        :size="size"
        :icon="icon">
        {{text}}
    </Button>
</template>
<script>
export default {
    name: 'tButton',
    props: {
        text: String,
        type: String,
        size: String,
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