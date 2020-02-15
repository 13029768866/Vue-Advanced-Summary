<template>
    <div>
        grandson1有{{money}}
        <button @click="change(300)">修改钱</button>
    </div>
</template>

<script>
    export default {
        name: "grandson",
        props:{
            money:{
                type: Number,
                default: 100
            }
        },
        methods:{
            change(money){
                // this.$emit('change',money)
                this.$parent.$emit('change',money)
            }
        }
    }
</script>

<style scoped>

</style>