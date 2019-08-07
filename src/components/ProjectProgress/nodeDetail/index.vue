<template>
    <div id="node-wrapper">
        <!-- <TrackSteps /> -->
        <StepsComponents v-if="currentstep === 'excutingstep1'" />
    </div>
</template>

<script>
import TrackSteps from '@/components/ProjectProgress/ChildComponents/Signing'
import StepsComponents from '@/components/ProjectProgress/StepsComponents'
export default {
    components:{
        TrackSteps,
        StepsComponents
    },
    data() {
        return {
            type:'',
            currentstep:this.$route.name
        }
    },

    mounted() {
        
    },

    watch:{
        "$route.name"(newname, oldname){
            this.currentstep = newname

        }
    }
}
</script>

<style lang="less" scoped>

</style>