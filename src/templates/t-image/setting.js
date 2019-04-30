import index from './index.vue'
const appearance = { 
    alt: {
        name: 'i-input',
        label: 'Alt',
        componentData: {
            value: '这是一张图片'
        }
    },
    width: {
        name: 'i-input',
        label: '宽度',
        componentData: {
            value: '350'
        }
    },
    height: {
        name: 'i-input',
        label: '高度',
        componentData: {
            value: '300'
        }
    },
    position: {
        name: 'tPosition',
        label: '位置',
        componentData: {
            value: 'left'
        }
    }
}
const content = {
    url: {
        name: 'tUploader',
        label: '图片路径',
        componentData: {
            value: require('../images/default.png')
        }
    }
}
index['setting'] = {
    appearance,
    content
}
export default index