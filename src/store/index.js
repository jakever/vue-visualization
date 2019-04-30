import Vue from 'vue'
import Vuex from 'vuex'
import { getChildComponent } from '../utils/index'

Vue.use(Vuex)

const store =  new Vuex.Store({
	state: {
		colWidth: 160,
		sheetData: {
			header: [],
			rows: [],
        },
        editUuid: '',
        tempUuid: '',
        componentsList: [],
        editSettng: {} // 每个组件的可设置属性
	},
    mutations: {
        updateUuid(state, {id, prefix}) {
            state[prefix+'Uuid'] = id
        },
        addItem(state) {
            // console.log(state.componentsList);
        },
        editItem(state, {uuid, itemData, componentSetting}) {
            state.editUuid = uuid
            let set = Object.assign({}, JSON.parse(JSON.stringify(componentSetting)))
            Object.keys(set.appearance || {}).forEach(key => {
                set.appearance[key].componentData.value = itemData.appearance[key] || set.appearance[key].componentData.value
            })
            Object.keys(set.content || {}).forEach(key => {
                set.content[key].componentData.value = itemData.content[key] || set.content[key].componentData.value
            })
            state.editSettng = set
        },
        updateSetting(state, data = {}) {
            let appearance = {}
            let content = {}
            let item = getChildComponent(state.componentsList, state.editUuid)
            Object.keys(data.appearance || {}).forEach(key => {
                appearance[key] = data.appearance[key].componentData.value
            })
            Object.keys(data.content || {}).forEach(key => {
                content[key] = data.content[key].componentData.value
            })
            item.appearance = appearance
            item.content = content
        }
    },
    actions: {
    },
    getters: {
    }
})
Vue.$Store = Vue.prototype.$Store = store

export default store