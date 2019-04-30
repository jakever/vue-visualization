import index from './index.vue'
const appearance = { 
    width: {
        name: 'i-input',
        label: '标签宽度',
        componentData: {
            value: 200
        }
    },
    type: {
        name: 'inputType',
        label: '输入框类型',
        componentData: {
            value: 'text'
        }
    },
    size: {
        name: 'tSize',
        label: '输入框尺寸',
        componentData: {
            value: 'default'
        }
    },
    placeholder: {
        name: 'i-input',
        label: 'placeholder',
        componentData: {
            value: '请输入...'
        }
    },
    search: {
        name: 'Checkbox',
        label: '是否为搜索',
        componentData: {
            value: false
        }
    },
    icon: {
        name: 'i-input',
        label: '尾部图标',
        componentData: {
            value: ''
        }
    }
}
index['setting'] = {
    appearance
}
export default index