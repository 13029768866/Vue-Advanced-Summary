<template>
    <div id="app">
        <parent></parent>
    </div>
</template>

<script>
    import Parent from './components/parent'

    export default {
        name: "App",
        // 暴露全局方法
        provide(){
            return {
                vm:this
            }
        },
        components:{
            Parent
        }
    }
</script>

<style scoped>

</style>