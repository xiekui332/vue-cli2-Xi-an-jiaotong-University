<template>
    <div class="de-header">
        <el-select v-model="sel1" placeholder="年度"
        >
            <el-option
            v-for="item in opt1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            </el-option>
        </el-select>

        <el-select v-model="sel2" placeholder="项目类型"
        >
            <el-option
            v-for="item in opt2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            </el-option>
        </el-select>

        <el-select v-model="sel3" placeholder="经费来源"
        >
            <el-option
            v-for="item in opt3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            </el-option>
        </el-select>

        <el-select v-model="sel4" placeholder="项目状态"
        >
            <el-option
            v-for="item in opt4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            </el-option>
        </el-select>

        <el-select v-model="sel5" placeholder="项目节点"
        >
            <el-option
            v-for="item in opt5"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            </el-option>
        </el-select>

        <el-input class="de-search-input" v-model="tex" placeholder="关键字搜索：负责人、编码、项目名称"></el-input>

        <div class="de-btn-wrapper">
            <el-row class="de-btn de-search-btn">
                <el-button type="primary" round @click="handleSearch('search')">查询</el-button>
            </el-row>

            <el-row class="de-btn de-reset-btn">
                <el-button type="primary" round @click="handleSearch('clear')">清空</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        'options1',
        'options2',
        'options3',
        'options4',
        'select1',
        'select2',
        'select3',
        'select4',
        'searchTex'
    ],
    name:'',
    data() {
        return {
            opt1:this.options1,
            opt2:this.options2,
            opt3:this.options3,
            opt4:this.options4,
            opt5:this.options5,
            sel1:this.select1,
            sel2:this.select2,
            sel3:this.select3,
            sel4:this.select4,
            sel5:this.select5,
            tex:this.searchTex
        }
    },
    methods:{
        handleSearch(type) {
            if(type === 'search') {
                this.$emit('handleSearchRes', this.dataCollation())
            }else if( type === 'clear') {
                this.$emit('handleSearchRes', this.dataCollation('clear'))
            }
        },

        dataCollation(type) {
            let obj = {}
            if(type === 'clear') {
                this.sel1 = ''
                this.sel2 = ''
                this.sel3 = ''
                this.tex = ''
                obj = {
                    a:this.sel1,
                    b:this.sel2,
                    c:this.sel3,
                    d:this.tex
                }
            }else{
                obj = {
                    a:this.sel1,
                    b:this.sel2,
                    c:this.sel3,
                    d:this.tex
                }
            }
            return obj
        }
    }
}
</script>

<style lang="less" scoped>
.de-header{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.el-select{
    width: 98px;
    height: 34px;
    background: #FFFFFF;
    margin: 0 15px 0 0; 
    box-shadow: 0 2px 4px 0 #EFF2F7;
    border-radius: 4px;
    border-radius: 4px;
    margin-bottom: 20px;
    & /deep/ .el-input__inner{
        font-size: 12px;
        color: #8998AC;
        letter-spacing: 0;
        line-height: 16px;
        padding: 0 0 0 10px;
        height: 34px;
    }
    .el-select .el-input .el-select__caret{
        font-size: 10px;
    }
    & /deep/ .el-input__icon{
        font-size: 10px;
        line-height: 34px;
    }
}

.de-search-input{
    width: 360px;
    height: 36px;
    margin-right: 40px;
}
& /deep/ .el-input__inner{
    height: 36px;
}
& /deep/ .el-input__inner::placeholder{
    font-size: 12px;
}
.de-btn button{
    width: 88px;
    height: 36px;
    margin-right: 20px;
}
.de-btn-wrapper{
    display: inline-flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    .de-search-btn button{
        background: #3B7CFF;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
    }
    .de-reset-btn button{
        background: #F9FAFC;
        border: 1px solid #AEB9CA;
        font-size: 14px;
        color: #8392A7;
        letter-spacing: 0;
        text-align: center;
    }
}
.el-select-dropdown__item{
    font-size: 12px;
}
</style>