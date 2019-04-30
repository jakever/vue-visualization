import tButton from '../templates/t-button/setting'
import tDatePicker from '../templates/t-datepicker/setting'
import tForm from '../templates/t-form/setting'
import tInput from '../templates/t-input/setting'
import tHeader from '../templates/t-header/setting'
import tText from '../templates/t-text/setting'
import tImage from '../templates/t-image/setting'
import tSwiper from '../templates/t-swiper/setting'
import { Modal } from 'iview'
import { mapState } from 'vuex';
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    components: {
        tButton,
        tDatePicker,
        tForm,
        tInput,
        tHeader,
        tText,
        tImage,
        tSwiper
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState([
            'componentsList'
        ]),
        optionComponents() {
            return this.$options.components
        },
        s() {
            return this.$parent.s
        }
    },
    methods: {
        close() {
            this.$emit('input', false)
        },
        renderComponents(h, list, nestItem) {
            return list.map(item => {
                const componentOptions = this.optionComponents[item.name]
                const itemIsNest = componentOptions ? componentOptions.nest : false // 组件是否可嵌套
                if (itemIsNest) {
                    if (!item.children) {
                        Vue.set(item, 'children', []);
                    }
                }
                return (
                    <div 
                        data-uuid={item.uuid}>
                        {
                            (() => {
                                if (nestItem) {
                                    const nestComponentOptions = this.optionComponents[nestItem.name]
                                    if (itemIsNest) {
                                        return nestComponentOptions.nestRender(h, h(item.name, {
                                            props: { ...item.appearance, ...item.content }
                                        }, [
                                            this.renderComponents(h, item.children, item)
                                        ]), item)
                                    } else {
                                        return nestComponentOptions.nestRender(h, h(item.name, {
                                            props: { ...item.appearance, ...item.content }
                                        }), item)
                                    }
                                } else {
                                    if (itemIsNest) {
                                        return h(item.name, {
                                            props: { ...item.appearance, ...item.content }
                                        }, [
                                            this.renderComponents(h, item.children, item)
                                        ])
                                    } else {
                                        return h(item.name, {
                                            props: { ...item.appearance, ...item.content }
                                        })
                                    }
                                }
                            })()
                        }
                    </div>
                )
            })
        }
    },
    render(h) {
        return (
            <div>
                {
                    h('Modal', {
                        props: {
                            transfer: true,
                            value: this.value,
                            width: 400
                        },
                        on: {
                            'on-cancel': this.close,
                            'on-ok': this.close
                        }
                    }, [
                        <div class={this.s.priview_modal}>
                            {
                                this.renderComponents(h, this.componentsList)
                            }
                        </div>
                    ])
                }
            </div>
        )
    }
}