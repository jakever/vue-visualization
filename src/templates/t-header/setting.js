import index from './index'
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
    level: {
        name: 'levelType',
        label: '标题级别',
        componentData: {
            value: 2
        }
    }
}
const content = {
    text: {
        name: 'i-input',
        label: '标题内容',
        componentData: {
            value: '默认标题'
        }
    }
}
index['setting'] = {
    appearance,
    content
}
export default index