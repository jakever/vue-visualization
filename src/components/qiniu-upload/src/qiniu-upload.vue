<template>
    <Upload
        ref="upload"
        :action="action"
        :headers="headers"
        :multiple="multiple"
        :data="data"
        :name="name"
        :with-credentials="withCredentials"
        :show-upload-list="showUploadList"
        :type="type"
        :accept="accept"
        :format="format"
        :max-size="maxSize"
        :before-upload="handleBefore"
        :on-success="handleSuccess"
        :on-exceeded-size="handleMaxSize"
        :on-format-error="handleFormatError"
        :on-progress="handleProgress"
        :on-error="handleError"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :default-file-list="defaultFileList">
        <slot></slot>
        <slot name="tip"></slot>
    </Upload>
</template>
<script>
// eslint-disable-next-line
import ajax from './ajax'
import _ from 'lodash'
export default {
    name: 'QiniuUpload',
    model: {
        prop: 'uploading',
        event: 'change'
    },
    props: {
        debug: {
            type: Boolean,
            default: false
        },
        file: { // 当前正在上传的文件, multiple=false 时生效
            type: Object,
            default() {
                return {}
            }
        },
        percent: { // 当前正在上传的文件百分比, multiple=false 时生效
            type: Number,
            default: 0
        },
        uploading: { // 当前是否有文件正在上传, multiple=false 时生效
            type: Boolean,
            default: false
        },
        action: {
            type: String,
            default: '//upload.qiniup.com/'
        },
        headers: {
            type: Object,
            default() {
                return {}
            }
        },
        multiple: {
            type: Boolean,
            default: false
        },
        params: {
            type: Object,
            default() {
                return {}
            }
        },
        name: {
            type: String,
            default: 'file'
        },
        withCredentials: {
            type: Boolean,
            default: false
        },
        showUploadList: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'select'
        },
        accept: {
            type: String
        },
        format: {
            type: Array,
            default() {
                return ['jpg', 'jpeg', 'png']
            }
        },
        maxSize: {
            type: Number,
            default: 2048
        },
        beforeUpload: {
            type: Function, // args: resolve, reject, file
            required: true
        },
        onProgress: {
            type: Function,
            default() { }
        },
        onSuccess: {
            type: Function,
            default() { }
        },
        onError: {
            type: Function,
            default() { }
        },
        onPreview: {
            type: Function,
            default() { }
        },
        onRemove: {
            type: Function,
            default() { }
        },
        onFormatError: {
            type: Function,
            default() { }
        },
        onExceededSize: {
            type: Function,
            default() { }
        },
        defaultFileList: {
            type: Array,
            default() {
                return []
            }
        },
        beforeTimeout: { // 上传前获取token配置信息响应超时设置
            type: Number,
            default: 5000
        },
        maxFileCount: { // multiple=true时，最多允许上传的文件个数
            type: Number,
            default: 10000
        },
        onExceededFileCount: { // 文件个数超出最大上传限制
            type: Function,
            default(file, fileList, maxFileCount) {
                this.showExceededFileCountMsg()
            }
        }
    },
    data() {
        return {
            data: {},
            fileList: []
        }
    },
    created() {
    },
    mounted() {
        const $upload = this.$refs.upload
        $upload.post = (file) => {
            // check format
            if ($upload.format.length) {
                const _file_format = file.name.split('.').pop().toLocaleLowerCase()
                const checked = $upload.format.some(item => item.toLocaleLowerCase() === _file_format)
                if (!checked) {
                    $upload.onFormatError(file, $upload.fileList)
                    return false
                }
            }

            // check maxSize
            if ($upload.maxSize) {
                if (file.size > $upload.maxSize * 1024) {
                    $upload.onExceededSize(file, $upload.fileList)
                    return false
                }
            }

            // check max file count before push file when multiple equals true
            if ($upload.multiple && $upload.fileList.length + 1 > this.maxFileCount) {
                this.onExceededFileCount(file, $upload.fileList, this.maxFileCount)
                return false
            }

            // push file
            $upload.handleStart(file)
            let formData = new FormData()
            formData.append($upload.name, file)

            ajax({
                headers: $upload.headers,
                withCredentials: $upload.withCredentials,
                file: file,
                data: $upload.data,
                filename: $upload.name,
                action: $upload.action,
                onProgress: e => {
                    $upload.handleProgress(e, file)
                },
                onSuccess: res => {
                    $upload.handleSuccess(res, file)
                },
                onError: (err, response) => {
                    $upload.handleError(err, response, file)
                }
            })
        }
        this.fileList = this.$refs.upload.fileList
    },
    methods: {
        log(...args) {
            if (this.debug && console.log) {
                let logs = [...args]
                for (let i in logs) {
                    console.log(logs[i])
                }
            }
        },
        showExceededFileCountMsg: _.debounce(async function() {
            this.$Message.warning(`最多只能上传${this.maxFileCount}个文件！`)
        }, 100),
        handlePreview(file) {
            return this.onPreview(file)
        },
        handleRemove(file, fileList) {
            return this.onRemove(file, fileList)
        },
        handleSuccess(response, file, fileList) {
            this.log('on-success: ', response)
            this.updateFile(file)
            this.updatePercent(file.percentage)
            setTimeout(() => {
                this.updateFile()
                this.updateUploading(false)
                this.updatePercent(0)
            }, 200)
            return this.onSuccess(response, file, fileList)
        },
        handleMaxSize(file, fileList) {
            this.updateFile()
            this.updateUploading(false)
            let sizeTip = this.maxSize < 1024 ? `${this.maxSize}K` : `${this.maxSize / 1024}M`
            let output = {
                title: `文件大小不超过${sizeTip}！`
            }
            // this.$Notice.warning(output)
            this.$Message.warning(`文件大小不超过${sizeTip}！`)
            this.log('on-exceeded-size: ' + output.title)
            return this.onExceededSize(file, fileList)
        },
        handleFormatError(file, fileList) {
            this.updateFile()
            this.updateUploading(false)
            let format = this.format.join('、').toUpperCase()
            let output = {
                title: '文件格式有误',
                desc: `请选择${format}格式！`
            }
            // this.$Notice.warning(output)
            this.$Message.warning(`文件格式有误，请选择${format}格式！`)
            this.log('on-format-error: ' + output.desc)
            return this.onFormatError(file, fileList)
        },
        handleProgress(event, file, fileList) {
            this.log('on-progress: ' + file.percentage)
            this.updateFile(file)
            this.updatePercent(file.percentage)
            return this.onProgress(event, file, fileList)
        },
        handleBefore(file) {
            this.log('before-upload: ', file)
            if (!this.multiple && this.uploading) {
                // 如果是单个上传模式，有文件正在上传时，拒绝再次上传
                /* this.$Notice.warning({
                    title: '有图片正在上传，请稍候。'
                }) */
                this.$Message.warning('有图片正在上传，请稍候。')
                return false
            }
            this.updateFile()
            this.updateUploading(true)
            this.updatePercent(0)
            if (!this.beforeUpload) {
                return true
            }
            return new Promise((resolve, reject) => {
                // 若未正确提供配置信息，或者resolve时间间隔太久，自动reject
                setTimeout(() => {
                    reject(new Error())
                }, this.beforeTimeout)
                // 获取token配置
                this.beforeUpload(resolve, reject, file, this)
            }).then((data) => {
                // this.data = Object.assign({}, this.data, this.params, data, { name: file.name })
                Object.assign(this.data, this.params, data, { name: file.name })
                return Promise.resolve()
            }, (error) => {
                this.log('before-upload钩子中止，未提供正确的token配置或获取token配置响应超时')
                this.log('请为组件配置属性 :before-upload="beforeUpload"')
                this.log('async beforeUpload (resolve, reject, file) {\n  try {\n    let data = await this.getToken()\n    resolve({\n      token: data.upload_token,\n      key: data.key\n    })\n  } catch (data) {\n    reject()\n  }\n}')
                if (!error || !error.message) {
                    error = Object.assign({}, {
                        message: '服务器繁忙，请稍后重试！'
                    }, error)
                }
                this.updateFile()
                this.updateUploading(false)
                /* this.$Notice.error({
                    title: error.message
                }) */
                switch (error.type) {
                    case 'warning':
                        this.$Message.warning(error.message)
                        break
                    case 'error':
                    default:
                        this.$Message.error(error.message)
                        break
                }
                return Promise.reject(error)
            })
        },
        handleError(error, resError, file) {
            this.log('on-error: ', error, resError)
            setTimeout(() => {
                this.updateFile()
                this.updateUploading(false)
                this.updatePercent(0)
            }, 200)
            let errorMsg = '服务器繁忙，请稍后重试！'
            switch (resError.error) {
                case 'expired token':
                    errorMsg = '客户端认证授权失败。请重试或提交反馈。'
                    break
            }
            /* this.$Notice.error({
                title: '上传失败',
                desc: errorMsg
            }) */
            this.$Message.error(errorMsg)
            return this.onError(error, resError, file)
        },
        clearFiles() {
            this.$refs.upload.clearFiles()
        },
        updateUploading(val) {
            !this.multiple && this.$emit('change', val)
        },
        updatePercent(val) {
            !this.multiple && this.$emit('update:percent', Math.ceil(val || 0))
        },
        updateFile(val) {
            !this.multiple && this.$emit('update:file', val || {})
        }
    }
}
</script>
<style>
</style>