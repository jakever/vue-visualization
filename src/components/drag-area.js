import { Tabs, TabPane } from 'iview'
import draggable from 'vuedraggable'
import config from '../templates/config'
import { generateUuid } from '../utils/index'
import { 
	mapMutations 
} from 'vuex'
export default {
    name: 'dragArea',
    components: { draggable },
    data() {
        return {
            dragOptions: {
                animation: 150,
				group: {
					name: 'templateComponents',
					pull: 'clone',
					put: false
                },
                sort: false,
                ghostClass: 'smart-web-ghost'
            }
        }
    },
    computed: {
        style() {
            return this.$parent.s
        }
    },
    methods: {
        ...mapMutations([
            'updateUuid'
        ]),
        onMove(obj) {
			// console.log(obj, 'onMove');
		},
		onUpdate(evt) {
			// console.log('onUpdate: ', evt);
		},
		onChange(evt) {
			// console.log('onChange: ', evt);
		},
		onSort(res) {
			// console.log('onSort: ', res);
        },
        onClone(res) {
            const uuid = generateUuid()
            this.updateUuid({id: uuid, prefix: 'temp'})
            return {
                ...res,
                uuid,
                appearance: {},
                content: {}
            }
        }
    },
    // render(h) {
    //     return h('draggable', {
    //         props: {
    //             list: config,
    //             options: this.dragOptions,
    //             move: this.onMove,
    //             clone: this.onClone,
    //         },
    //     }, [
    //         config.map(item => h('div', {
    //             class: this.style.groupItem,
    //             attrs: {
    //                 name: item.name
    //             }
    //         }, [
    //             item.text
    //         ]))
    //     ])
    // }
    render(h) {
        return (
            <Tabs>
                <TabPane label="基础组件">
                    <draggable list={config.base}
                            options={this.dragOptions}
                            clone={this.onClone}>
                        {
                            config.base.map(item => {
                                return (
                                    <div class={this.style.groupItem}
                                        name={item.name}>{item.text}</div>
                                )
                            })
                        }
                    </draggable>
                </TabPane>
                <TabPane label="模块组件">
                    <draggable list={config.module}
                            options={this.dragOptions}
                            clone={this.onClone}>
                        {
                            config.module.map(item => {
                                return (
                                    <div class={this.style.groupItem}
                                        name={item.name}>{item.text}</div>
                                )
                            })
                        }
                    </draggable>
                </TabPane>
            </Tabs>
            
        )
    }
}