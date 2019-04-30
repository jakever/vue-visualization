export default {
    props: {
        color: String,
        bgColor: String,
        level: {
            type: [Number, String],
            default: 2
        },
        text: String
    },
    render(h) {
        return h('h' + this.level, {
            style: {
                color: this.color,
                backgroundColor: this.bgColor
            }
        }, [
            this.text
        ])
    }
}