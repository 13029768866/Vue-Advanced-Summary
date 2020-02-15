<template>
    <div>
        <!--parent有{{money}}
        <son1 :money.sync = "money" @change="change"></son1>-->
        parent 拥有num: {{num}}
        <!-- sync和v-model语法糖-->
        <!--<son2 :num.sync = num></son2>
        <Son2 v-model="num" :num="num"></Son2>-->

        <!--    $attrs    -->
        <!--<Son2 :money="money" :num="num"></Son2>-->
        <!--  -->
        <Son2 :money="money" :num="num" @click="show"></Son2>
    </div>
</template>

<script>
    // import son1 from './son1'
    import son2 from './son2'
    export default {
        name: "parent",
        components: {
            // Son1: son1,
            Son2: son2
        },
        data(){
            return {
                money: 100,
                num: 1
            }
        },
        methods:{
            show(){
                console.log('show');
            },
            change(e){
                this.money = e
            }
        }
    }
</script>

<style scoped>

</style>