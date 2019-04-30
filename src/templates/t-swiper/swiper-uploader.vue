<template>
    <div :class="s.wraper">
        <div :class="s.item" v-for="(item, index) in list" :key="index">
            <t-uploader @input="onSuccess" :index="index"></t-uploader>
        </div>
        <div>
            <Button @click="add" type="dashed" icon="ios-add" long>增加一张</Button>
        </div>
    </div>
</template>
<script>
import tUploader from '../t-uploader.vue'
export default {
    components: {
        tUploader
    },
    props: {
        value: Array,
    },
    data() {
        return {
            list: []
        }
    },
    watch: {
        value: {
            handler: function (val) {
                this.list = JSON.parse(JSON.stringify(val))
            },
            immediate: true
        }
    },
    computed: {
    },
    methods: {
        add() {
            this.list.push(require('../images/default.png'))
            this.$emit('input', this.list)
        },
        onSuccess(url, index) {
            Vue.set(this.list, index, url)
            this.$emit('input', this.list)
        }
    },
}
</script>
<style module="s">
.item {
    margin-bottom: 16px;
}
</style>