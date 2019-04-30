<!-- 
    可以考虑无需上传到七牛，直接用base64来展示图片
-->
<template>
    <div :class="s.wrap">
        <Qiniu-upload ref="qnUpload" 
            v-show="qnShow" 
            v-model="uploading"
            :max-size="5 * 2014"
            :percent.sync="percent" 
            :before-upload="beforeUpload" 
            :on-success="onSuccess">
            <Button icon="ios-cloud-upload-outline" style="width: 194px;">选择文件</Button>
        </Qiniu-upload>
        <Button icon="ios-cloud-upload-outline" v-show="!qnShow" :loading="true" style="width: 194px;">
            {{percent ? `已上传${percent}%` : '正在导入' }}
        </Button>
        <!-- <div>
            <input type="file" id="dmCropperuploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
            <label class="ivu-btn" style="width:194px" for="dmCropperuploads">选取文件</label>
        </div> -->
        <p v-if="filename">已上传：{{filename}}</p>
    </div>
</template>
<script>
    import QiniuUpload from '../components/qiniu-upload'
    import axios from 'axios'
    export default {
        props: {
            index: Number
        },
        components: {
            QiniuUpload
        },
        data() {
            return {
                percent: 0,
                uploading: false,
                submitting: false,
                filename: ''
            }
        },
        computed: {
            qnShow() {
                return !this.percent && !this.submitting
            }
        },
        methods: {
            async beforeUpload(resolve, reject, file) {
                try {
                    this.uploading = true
                    const data = await axios.post('https://api-dev.2haohr.com/v1/upload/get_token/', {
                        api_type: 1,
                        file_name: file.name,
                        mime_type: file.type
                    }, {
                        headers: {
                            accesstoken: 'c3ta1rea8g9ugrpq3gunws1agmgm7t5w'
                        }
                    })
                    resolve({
                        token: data.data.data.upload_token,
                        key: data.data.data.key
                    })
                } catch (e) {
                    reject()
                }
            },
            async onSuccess(response, file, fileList) {
                // 得到上传文件的资源地址，返回给组件
                const sourceLink = response.data.url
                this.filename = response.data.filename
                this.$emit('input', sourceLink, this.index)
            },
            uploadImg(e) { // 上传图片
                let file = e.target.files[0]
                if (!file) {
                    return
                }
                if (file.size > 5 * 1024 * 1000) {
                    return alert('文件大小超出限制')
                }
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    return alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                }
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.$emit('input', e.target.result, this.index)
                    this.filename = file.name
                }
                reader.readAsDataURL(file)
            },
        }
    }
</script>
<style module="s">
    .wrap {
        display: inline-block;
    }
    .uploadSpan {
        display: inline-flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
</style>