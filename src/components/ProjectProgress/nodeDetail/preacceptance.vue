<template>
    <div class="node-wrapper">
        <!-- 验收-预验收 -->
        <div class="st-item st-templates st-icon-none">
            <div class="st-item-header">
                <span class="pub-family">模板资料</span>
            </div>

            <div class="st-edit-content">
                <div class="st-edit-item st-ed-head">
                    <div> <span>资料模板</span></div>
                    <div> <span>上传资料</span></div>
                </div>

                <div class="st-edit-item">
                    <div class="st-icon-file-title">
                        <i class="pub-css st-icon-file"></i>
                        <span class="st-file-title"><i class="st-tips-required">*</i> 网络信息中心货物类采购项目自验单</span>
                    </div>
                    <div class="st-icon-file-name">
                        <CommUpload :hasTips='hasTips' />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import CommUpload from '@/components/Common/commUpload'
export default {
    components:{
        CommUpload
    },
    data() {
        return {
            hasTips:false
        }
    },

    methods:{
        
    }
}
</script>

<style lang="less" scoped>
.node-wrapper{
    @import url('../../Common/less/comItem.less');

    .st-icon-none{
        .st-icon-file{
            background-position: 0 0!important;
        }
    }
}
</style>


