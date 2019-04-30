const generateUuid = () => {
    return 'uuid' + new Date().getTime().toString(36)
}
const getChildComponent = (list = [], id) => {
    let res = null
    const iterator = (list, id) => {
        for(let i = 0;i<list.length;i++) {
            if (list[i].uuid === id) {
                res = list[i]
                break
            } else if (list[i].children){
                iterator(list[i].children, id)
            }
        }
        return res
    }
    return iterator(list, id)
    
}
module.exports = {
    generateUuid,
    getChildComponent
}