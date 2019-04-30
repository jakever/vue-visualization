import index from './index.vue'
const appearance = { 
    type: {
        name: 'buttonType',
        label: '按钮类型',
        componentData: {
            value: 'primary'
        }
    },
    size: {
        name: 'tSize',
        label: '按钮尺寸',
        componentData: {
            value: 'default'
        }
    },
    icon: {
        name: 'i-input',
        label: '按钮图标',
        componentData: {
            value: ''
        }
    }
}
const content = {
    text: {
        name: 'i-input',
        label: '按钮内容',
        componentData: {
            value: '按钮'
        }
    }
}
index['setting'] = {
    appearance,
    content
}
export default index