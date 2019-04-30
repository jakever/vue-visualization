
<template>
    <div :class="s.swiper">
        <!-- 外层设置overflow:hidden的盒子 -->
        <div :class="s.swiperContainer" :style="{width: wrapWidth+'px', height: height+'px'}">
            <!-- transform盒子 -->
            <div :class="s.swiperWrapper" :style="wrapSty">
                <div :class="s.swiperItem" v-for="(item, index) in list" :style="itemSty" :key="index">
                    <img :src="item">
                </div>
            </div>
        </div>
        <!-- 向前按钮 -->
        <div :class="{[s.buttonPrev]:true,[s.disabled]:currIndex === 0}" @click="toPrevSlide">
            <Icon type="ios-arrow-back" />
        </div>
        <!-- 向后按钮 -->
        <div :class="{
            [s.buttonNext]:true,
            [s.disabled]: currIndex + slidesPerView >= list.length}" 
            @click="toNextSlide">
            <Icon type="ios-arrow-forward" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'swiper',
    props: {
        width: [Number, String], // swiper容器的宽度
        height: [Number, String], // swiper容器的高度
        pagination: Boolean,
        paginationClickable: Boolean,
        slidesPerView: Number, // swiper容器能够同时显示的slides数量
        slidesPerGroup: Number, // 一次性同时切换的silde个数
        spaceBetween: Number, // slide之间的间距
        duration: Number,
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currIndex: 1,
            currConfig: {},
            outerWidth: 0,
            responsive: {
                //当宽度小于等于320
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                //当宽度小于等于480
                480: { 
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                //当宽度小于等于640
                640: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        }
    },
    computed: {
        _spaceBetween() {
            return this.slidesPerView > 1 ? this.spaceBetween : 0
        },
        wrapWidth() {
            return this.slideW * this.slidesPerView + (this.slidesPerView - 1) * this._spaceBetween
        },
        otherWidth() {
            return this.width > this.outerWidth ? this.outerWidth : this.width
        },
        slideW() { // 每一张单片的宽度
            const w = ~~((this.otherWidth - (this.slidesPerView - 1) * this._spaceBetween) / this.slidesPerView)
            return w
        },
        wrapSty() {
            let w = this.slideW
            if (-this.currIndex !== 0) w += this._spaceBetween
            return {
                transition: 'all ' + this.duration + 's',
                transform: 'translate3d(' + (-this.currIndex * w) + 'px,0,0)'
            }
        },
        itemSty() {
            return {
                width: this.slideW + 'px',
                height: this.height + 'px',
                marginRight: this._spaceBetween + 'px'
            }
        }
    },
    methods: {
        toPrevSlide() {
            if (this.currIndex === 0) return
            if (this.currIndex > this.slidesPerGroup) {
                this.currIndex = this.currIndex - this.slidesPerGroup
            } else {
                this.currIndex = 0
            }
        },
        toNextSlide() {
            // 如果剩下未出现在视图里的张数大于每次切换的张数slidesPerGroup，才切换slidesPerGroup这么多张
            if (this.currIndex + this.slidesPerView >= this.list.length) return
            const diff = this.list.length - (this.currIndex + this.slidesPerView)
            if (diff > this.slidesPerGroup) {
                this.currIndex = this.currIndex + this.slidesPerGroup
            } else {
                this.currIndex = this.currIndex + diff
            }
            
        },
        _resize() {
            let viewW = document.documentElement.clientWidth || document.body.clientWidth
            for (let k in this.responsive) {
                let value = Number(k)
                if (!isNaN(value)) {
                    if (viewW <= value) {
                        Object.keys(this.responsive[k]).forEach(item => {
                            this.currConfig[item] = this.responsive[k][item]
                        })
                    } else {
                        this.currConfig.width = this.width
                        this.currConfig.spaceBetween = this.spaceBetween
                        this.currConfig.slidesPerView = this.slidesPerView
                        this.currConfig.slidesPerGroup = this.slidesPerGroup
                    }
                }
            }
        }
    },
    created() {
        Vue.nextTick(() => {
            this.outerWidth = this.$el.offsetWidth // 这里在真实环境或许是视窗宽度
        })
        this.currConfig = Object.assign({}, { // 响应式布局需要改变的配置项
            width: this.width,
            spaceBetween: this.spaceBetween,
            slidesPerView: this.slidesPerView,
            slidesPerGroup: this.slidesPerGroup
        })
    },
    mounted() {
        window.addEventListener('resize', this._resize)
    },
    destoryed() {
        window.removeEventListener('resize', this._resize)
    }
}
</script>
<style module="s" lang="scss">
.swiper {
    position: relative;
}

.swiperContainer {
    margin: 0 auto;
    max-width: 100%;
    position: relative;
    overflow: hidden;
    z-index: 1;
    box-sizing: content-box;
    transition: all 0.3s;
}

.swiperWrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
}

.swiperItem {
    position: relative;
    flex-shrink: 0;
    transition: all 0.3s;
    max-width: 100%;
    > img {
        width: 100%;
        height: 100%;
    }
}

.buttonPrev,
.buttonNext {
    width: 48px;
    height: 48px;
    line-height: 56px;
    position: absolute;
    top: 50%;
    z-index: 1;
    left: 10px;
    right: auto;
    margin-top: -22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    i {
        font-size: 30px;
        color: #999;
    }

    &:hover {
        border: 1px solid #e1e6eb;
        border-radius: 50%;

        > i {
            color: #0bb27a;
        }
    }

    &.disabled {
        opacity: 0.35;
        cursor: auto;
        pointer-events: none;
    }
}

.buttonNext {
    right: 10px;
    left: auto;
}
</style>