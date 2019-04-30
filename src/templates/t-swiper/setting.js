import index from './index.vue'
const appearance = { 
    width: {
        name: 'i-input',
        label: '容器宽度',
        type: 'Number',
        componentData: {
            value: 400
        }
    },
    height: {
        name: 'i-input',
        label: '容器宽度',
        type: 'Number',
        componentData: {
            value: 380
        }
    },
    slidesPerView: {
        name: 'input-number',
        label: '视窗数量',
        type: 'Number',
        componentData: {
            value: 1
        }
    },
    slidesPerGroup: {
        name: 'input-number',
        label: '切换数量',
        type: 'Number',
        componentData: {
            value: 1
        }
    },
    spaceBetween: {
        name: 'input-number',
        label: '间隔',
        type: 'Number',
        componentData: {
            value: 30
        }
    },
    duration: {
        name: 'i-input',
        label: '过渡时间',
        type: 'Number',
        componentData: {
            value: 0.5
        }
    }
}
const content = {
    list: {
        name: 'swiperUploader',
        label: '图片路径',
        componentData: {
            value: Array.from({ length: 7 }).map(() => require('../images/default.png'))
        }
    }
}
index['setting'] = {
    appearance,
    content
}
export default index