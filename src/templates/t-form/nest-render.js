export default function nestRender(h, component, item) {
    var label = '默认'
    return (
        <form-item label={label}>
            {component}
        </form-item>
    )
}
