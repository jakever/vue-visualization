<template>
    <Form 
        :class="s.t_form"
        :label-position="labelPosition"
        :label-width="labelWidth">
        <slot></slot>
        <div :class="s.btn">
            <Button type="primary">确认</Button>
        </div>
    </Form>
</template>
<script>
import nestRender from './nest-render'
export default {
    name: 'tForm',
    props: {
        labelPosition: String,
        labelWidth: Number
    },
    components: {
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    },
    nest: true,
    nestRender
}
</script>
<style module="s" lang="scss">
.t_form {
    border: 1px solid #e1e6eb;
}
.btn {
    text-align: center;
    margin: 16px 0;
}
</style>