<template>
    <div
        :class="s.t_image"
        :style="imgPos">
        <img :alt="alt" 
            :src="url"
            :style="{
            width: width + 'px',
            height: height + 'px'}">
    </div>
</template>
<script>
export default {
    props: {
        alt: String,
        height: [Number, String],
        width: [Number, String],
        position: [String],
        url: String
    },
    data() {
        return {
        }
    },
    computed: {
        imgPos() {
            let sty = {}
            if (this.position === 'left') {
                sty['justify-content'] = 'flex-start'
            } else if (this.position === 'center') {
                sty['justify-content'] = 'center'
            } else {
                sty['justify-content'] = 'flex-end'
            }
            return sty
        }
    },
    methods: {
    },
}
</script>
<style module="s">
    .t_image {
        display: flex;
        align-items: center;
    }
</style>