import index from './index.vue'
const appearance = { 
    width: {
        name: 'i-input',
        label: '控件宽度',
        componentData: {
            value: '200'
        }
    },
    type: {
        name: 'datepickerType',
        label: '显示类型',
        componentData: {
            value: 'date'
        }
    },
    format: {
        name: 'i-input',
        label: '显示格式',
        componentData: {
            value: 'yyyy-MM-dd'
        }
    },
    placeholder: {
        name: 'i-input',
        label: 'placeholder',
        componentData: {
            value: '请选择日期'
        }
    }
}
index['setting'] = {
    appearance
}
export default index