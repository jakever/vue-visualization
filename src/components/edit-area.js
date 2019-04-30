import { Tabs, TabPane } from 'iview'
import tSize from '../templates/t-size.vue'
import buttonType from '../templates/t-button/button-type.vue'
import inputType from '../templates/t-input/input-type.vue'
import datepickerType from '../templates/t-datepicker/datepicker-type.vue'
import levelType from '../templates/t-header/level-type.vue'
import tColorPicker from '../templates/t-colorpicker.vue'
import tUploader from '../templates/t-uploader.vue'
import swiperUploader from '../templates/t-swiper/swiper-uploader.vue'
import tPosition from '../templates/t-position.vue'
import eventBus from '../utils/eventBus'
import { 
	mapState, 
	mapMutations 
} from 'vuex'
export default {
    name: 'editArea',
    props: {
    },
    components: {
        tSize,
        buttonType,
        inputType,
        levelType,
        datepickerType,
        tColorPicker,
        tUploader,
        swiperUploader,
        tPosition
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState([
            'editSettng'
        ]),
        s() {
            return this.$parent.s
        }
    },
    watch: {
        editSettng: {
            deep: true,
            handler: function(val) {
                eventBus.$emit('update-setting', val)
            }
        }
    },
    methods: {
        ...mapMutations([
            'updateSetting'
        ])
    },
    render(h) {
        return (
            <Tabs>
                <TabPane label="外观">
                    {
                        (() => {
                            return Object.keys(this.editSettng.appearance || {}).map(key => {
                                let itemSetting = this.editSettng.appearance[key]
                                return (
                                    <i-form label-position="left" label-width={80}>
                                        <form-item label={itemSetting.label}>
                                            {
                                                h(itemSetting.name, {
                                                    props: itemSetting.componentData,
                                                    on: {
                                                        input: (val) => {
                                                            if (itemSetting.type && itemSetting.type === 'Number') {
                                                                itemSetting.componentData.value = ~~val
                                                            } else {
                                                                itemSetting.componentData.value = val
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                        </form-item>
                                    </i-form>
                                )
                            })
                        })()
                    }
                </TabPane>
                <TabPane label="数据">
                    {
                        (() => {
                            return Object.keys(this.editSettng.content || {}).map(key => {
                                let itemSetting = this.editSettng.content[key]
                                return (
                                    <i-form label-position="left" labelWidth={80}>
                                        <form-item label={itemSetting.label}>
                                            {
                                                h(itemSetting.name, {
                                                    props: itemSetting.componentData,
                                                    on: {
                                                        input: (val) => {
                                                            itemSetting.componentData.value = val
                                                        }
                                                    }
                                                })
                                            }
                                        </form-item>
                                    </i-form>
                                )
                            })
                        })()
                    }
                </TabPane>
            </Tabs>
        )
    }
}