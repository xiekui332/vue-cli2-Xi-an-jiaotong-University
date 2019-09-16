<template>
    <div class="st-icon-file-name">
        <el-upload
            :class="extitle?'upload-demo upload-title':'upload-demo'"
            :action= uploadUrl
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :before-upload="handleBefore"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            ref="upload"
            accept='.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.doc,.docx'
            :file-list="fileListL">
            <el-button size="small" type="primary">
                <i class="pub-css st-upload-icon" v-if="!extitle"></i>
                <span v-else class="upload-title">{{extitle}}</span>
            </el-button>
        </el-upload>
        <p v-if="exhasTips && !extitle">支持扩展名：.doc .docx .pdf .jpg...</p>
    </div>
</template>
<script>
import { uploadUrl } from '../../utils/util.js'
export default {
    props:[
        'title',
        'hasTips',
        'handleUpload',
        'fileName1',
        'isClear'
    ],
    data() {
        return {
            fileListL:[],
            extitle:this.title,
            exhasTips:this.hasTips,
            uploadParams:{},
            uploadUrl:uploadUrl,
            isclears:false
        }
    },
    methods:{
        handlePreview(file) {
            console.log(file);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        beforeRemove(file, fileList) {
           
        },
        handleBefore(file, fileList) {
            // console.log(file, fileList);
            // console.log(file.size);
            if(file.size > 5242880) {
                this.$message.warning('请选择5M以下的文件上传')
                return false
            }
        },

        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        handleSuccess(res,file,fileList){
           if(res.code=="00000"){
              this.uploadParams=res.data;
           }else{
               this.fileListL=[];
               this.$message(res.message);
           }
        }

    },
    mounted() {
       
    },
    watch:{
        uploadParams(oldmsg,newMsg){
            this.$emit('handleUpload',oldmsg)
        },
        isClear(oldmsg,newMsg){//保存成功后清楚上传列表
            this.$refs.upload.clearFiles();
        }
    }
}
</script>

<style lang="less" scoped>
.st-icon-file-name{
    // min-width: 400px;
    display: flex;
    align-items: center;
    flex-direction: column;
    >p{
        width: 100%;
        font-size: 12px;
        color: #8998AC;
    }
    .upload-demo{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .upload-title{
            font-size: 14px;
            color: #3B7CFF;
        }
    }
    .upload-title{
        display:block;
    }
    & /deep/ .el-upload-list{
        
    }
    & /deep/ .el-upload{
        // float: left;
    }
    .el-button--primary{
        background: rgba(59, 124, 255, 0);
        border: none;
        padding: 6px 10px;
    }
    .st-upload-icon{
        display: inline-block;
        width: 20px;
        height: 20px;
        background-position: -10px -365px;
        margin-top: 10px;
    }
}
</style>