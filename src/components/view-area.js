import { getChildComponent } from '../utils/index'
import draggable from 'vuedraggable'
import tButton from '../templates/t-button/setting'
import tDatePicker from '../templates/t-datepicker/setting'
import tForm from '../templates/t-form/setting'
import tInput from '../templates/t-input/setting'
import tHeader from '../templates/t-header/setting'
import tText from '../templates/t-text/setting'
import tImage from '../templates/t-image/setting'
import tSwiper from '../templates/t-swiper/setting'
import eventBus from '../utils/eventBus'
import { Icon } from 'iview'
import { 
	mapState, 
	mapMutations 
} from 'vuex'
export default {
    name: 'viewArea',
    components: { 
        draggable,
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
            itemSetting: {},
            viewOptions: {
				animation: 150,
				group: {
					name: 'templateWebsite',
					pull: false,
					put: ['templateComponents']
				},
                ghostClass: 'smart-web-ghost'
            }
        }
    },
    computed: {
        ...mapState([
            'componentsList',
            'editUuid',
            'tempUuid'
        ]),
        s() {
            return this.$parent.s
        },
        optionComponents() {
            return this.$options.components
        }
    },
    methods: {
        ...mapMutations([
            'removeItem',
            'editItem',
            'updateUuid'
        ]),
		onAdd(res) {
            this.updateUuid({id: this.tempUuid, prefix: 'edit'})
            // const cloneNode = res.clone
            // this.doEdit({name: cloneNode.attributes.name.value}, res.newIndex)
            // const item = this.componentsList[res.newIndex]
        },
        onSort() {
            const item = getChildComponent(this.componentsList, this.editUuid)
            this.doEdit(item)
        },
        doEdit(item, e) {
            e && e.stopPropagation()
            const componentOptions = this.optionComponents[item.name]
            const componentSetting = componentOptions.setting 
            const itemData = { appearance: item.appearance, content: item.content }
            this.itemSetting = item
            this.editItem({uuid: item.uuid, itemData, componentSetting})
        },
        renderComponents(h, list, nestItem) {
            return h('draggable', {
                class: this.s.view_area,
                props: {
                    list,
                    options: this.viewOptions
                },
                on: {
                    sort: this.onSort,
                    add: this.onAdd
                }
            }, [
                list.map(item => {
                    const componentOptions = this.optionComponents[item.name]
                    const itemIsNest = componentOptions ? componentOptions.nest : false // 组件是否可嵌套
                    if (itemIsNest) {
                        if (!item.children) {
                            Vue.set(item, 'children', []);
                        }
                    }
                    return (
                        <div 
                            class={[this.s.component_row, this.editUuid === item.uuid ? this.s.active : '']}
                            data-uuid={item.uuid}
                            onClick={this.doEdit.bind(this, item)}>
                            <div class={this.s.toolbar} onClick={this.removeItem.bind(this, item)}>
                                <Icon type="ios-trash" />
                            </div>
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
            ])
        }
    },
    created() {
        eventBus.$on('update-setting', data => {
            let appearance = {}
            let content = {}
            Object.keys(data.appearance || {}).forEach(key => {
                appearance[key] = data.appearance[key].componentData.value
            })
            Object.keys(data.content || {}).forEach(key => {
                content[key] = data.content[key].componentData.value
            })
            Vue.set(this.itemSetting, 'appearance', appearance)
            Vue.set(this.itemSetting, 'content', content)
        })
    },
    render(h) {
        return this.renderComponents(h, this.componentsList)
    }
}