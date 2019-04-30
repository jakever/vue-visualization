import index from './index.vue'
const appearance = { 
    color: {
        name: 'tColorPicker',
        label: '字体颜色',
        componentData: {
            value: '#495060'
        }
    },
    bgColor: {
        name: 'tColorPicker',
        label: '背景颜色',
        componentData: {
            value: '#fff'
        }
    },
    fontSize: {
        name: 'i-input',
        label: '字体大小',
        componentData: {
            value: 14
        }
    }
}
const content = {
    text: {
        name: 'i-input',
        label: '文本内容',
        componentData: {
            value: '默认文本'
        }
    }
}
index['setting'] = {
    appearance,
    content
}
export default index