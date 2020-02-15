<template>
    <div>
        grandson2拥有{{$attrs}}
        <button @click="$listeners.click">点我</button>
    </div>
</template>

<script>
    export default {
        name: "grandson2",
        inject:[
          'vm'
        ],
        mounted(){
            console.log(this.vm);
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>