<template>
    <div id="com-proInfoHead">
        <div class="et-detail">
            <div class="et-left">
                <p class="et-title">西安交通大学网信中心2019年度XXXXXXX项目</p>
                <div class="et-col-wrapper">
                    <div class="et-col-item">
                        <p>
                            <span>项目编号：</span>
                            <span>GS2019001</span>
                        </p>
                        <p>
                            <span>预算金额：</span>
                            <span>500万</span>
                        </p>
                        <p>
                            <span>立项时间：</span>
                            <span>2019-01-01</span>
                        </p>
                    </div>
                    <div class="et-col-item">
                        <p>
                            <span>项目负责人：</span>
                            <span>文华</span>
                        </p>
                        <p>
                            <span>项目类型：</span>
                            <span>货物 | 集成项目</span>
                        </p>
                        <p>
                            <span>计划周期：</span>
                            <span>2019-01-01~2019-06-18</span>
                        </p>
                    </div>
                    <div class="et-col-item">
                        <p>
                            <span>经费来源：</span>
                            <span>改善办学条件</span>
                        </p>
                        <p>
                            <span>供应商：</span>
                            <span>XXXXXXXXXXX公司</span>
                        </p>
                        <p>
                            <span>项目说明：</span>
                            <span>请于2个工作日内上传XXX确认书</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="et-right">
                <p class="et-flag">立项/立项准备</p>
                <p class="et-money-num">¥<span>0.00</span>万</p>
                <p class="et-money-txt">中标金额</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
#com-proInfoHead{
    .et-detail{
        height: 228px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 #EFF2F7;
        border-radius: 4px;
        display: flex;
        padding: 0 30px 0 40px;
        margin-bottom: 20px;
        .et-title{
            font-size: 28px;
            color: #404040;
            letter-spacing: 1px;
            margin: 30px 0 20px 0px;
        }
        .et-col-wrapper{
            display: flex;
            .et-col-item {
                margin-right: 3%;
            }
            .et-col-item >p {
                line-height: 36px;
                font-size: 16px;
                color: #39475B;
                letter-spacing: 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }

        .et-right{
            flex: 2;
            text-align: right;
            .et-flag{
                font-size: 18px;
                color: #3560F6;
                letter-spacing: 0;
                line-height: 24px;
                margin: 40px 0px 60px 0;
            }
            .et-money-num{
                font-size: 20px;
                color: #FE5959;
                span{
                    font-size: 40px;
                    color: #FE5959;
                    padding:0 5px;
                }
            }
            .et-money-txt{
                font-size: 14px;
                color: #7887A7;
            }

        }
    }
}
</style>