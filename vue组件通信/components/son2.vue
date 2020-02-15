<template>
    <div>
        <!--son2拥有num:{{num}}
        <button @click="changeNum">修改大法</button>-->
        son2拥有: {{$attrs}}
        <!--v-bind讲属性全部向下传递-->
        <!-- v-on向下传递所有方法 -->
        <grandson2 v-bind="$attrs" v-on="$listeners"></grandson2>
    </div>
</template>

<script>
    /*$attrs传递过来未被使用的属性的集合,props使用会移除*/
    import Grandson2 from "./grandson2";
    export default {
        name: "son2",
        components:{
            Grandson2
        },
        inheritAttrs: false,
        /*props:{
            num:{
                type: Number,
                default: 100
            }
        },*/
        methods:{
            changeNum(){
                // this.$emit('update:num',100)
                this.$emit('input',100)
            }
        },
        mounted(){
            console.log(this.$listeners);
        }
    }
</script>

<style scoped>

</style>