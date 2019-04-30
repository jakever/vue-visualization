import index from './index.vue'
const appearance = { 
    labelWidth: {
        name: 'i-input',
        label: '标签宽度',
        type: 'Number',
        componentData: {
            value: 80
        }
    },
    labelPosition: {
        name: 'i-input',
        label: '标签位置',
        componentData: {
            value: 'left'
        }
    }
}
index['setting'] = {
    appearance
}
export default index