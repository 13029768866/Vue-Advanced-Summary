<template>
    <div>
        son1有{{money}}
        <button @click="changeMoney(200)" >加钱</button>
        <Grandson1 :money.sync="money" @change="change(300)"></Grandson1>
    </div>
</template>

<script>
    import Grandson1 from './grandson1'
    export default {
        name: "son1",
        components:{
          Grandson1
        },
        props:{
            money:{
                type: Number,
                default: 100
            }
        },
        methods:{
            changeMoney(money){
                this.$emit('update:money',money)
            },
            change(newVal){
                this.$emit('change',newVal)

            }
        }
    }
</script>

<style scoped>

</style>