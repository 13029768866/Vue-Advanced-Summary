<template>
    <div v-click-outside>
        <input
            type="text"
            :value="formatDate"
            @focus="focus"
        >
        <div
            class="pannel"
            v-if="isVisible">
            <div class="pannel-nav">
                <span>&lt;</span>
                <span>&lt;&lt;</span>
                <span>xxx年</span>
                <span>xxx月</span>
                <span>&gt;&gt;</span>
                <span>&gt;</span>
            </div>
            <div class="pannel-content">
                <span
                    v-for="weekday in weekDays"
                    :key = "weekday"
                    class="cell"
                >
                    {{weekday}}
                </span>
                <div class="days">
                    <div v-for="i in 6" :key="i">
                        <span
                            v-for="j in 7"
                            :key="j"
                            class="cell"
                            @click="chooseDate(visibeDays[(i - 1) * 7 + (j - 1)])"
                            :class="[
                            {
                                notCurrentMonth: !isCurrentMonth(visibeDays[(i - 1) * 7 + (j - 1)])
                            },
                            {
                                currentDay: isCurrentDay(visibeDays[(i - 1) * 7 + (j - 1)])
                            }
                            ]"
                        >
                            {{visibeDays[(i - 1) * 7 + (j - 1)].getDate() }}
                        </span>
                    </div>

                </div>
            </div>
            <div class="pannel-footer">
                今天
            </div>
        </div>
    </div>
</template>

<script>
    import * as utils from './utils'
    export default {
        name: "date-picker",
        props: {
            value:{
                type: Date,
                default: () => new Date()
            }
        },
        directives:{
          clickOutside:{
              // 指令生命周期
              bind(el,bindings,vnode){
                  let handler = (e) => {
                      // console.log(e.target);
                      if(el.contains(e.target)){
                          if(!vnode.context.isVisible){
                              console.log('focus')
                              vnode.context.focus()
                          }

                      }else{
                          if(vnode.context.isVisible){
                              vnode.context.blur()
                              console.log('blur')
                          }
                      }
                  }
                  el.handler = handler
                  document.addEventListener('click',handler)
              },
              unbind(el){
                  document.removeEventListener('el',el.handler)
              }
          }
        },
        data(){
            return {
                weekDays: ['日','一','二','三','四','五','六'],
                isVisible: true
            }
        },
        methods:{
            focus(){
                  this.isVisible = true
              },
            blur(){
                  this.isVisible = false
              },
            isCurrentMonth(date){
                let {year,month} = utils.getYearMonthDay(this.value)
                let {year: y,month: m} = utils.getYearMonthDay(date)
                return year === y && month === m
              },
            isCurrentDay(date){
                let {year,month,day} = utils.getYearMonthDay(this.value)
                let {year: y, month: m,day: d} = utils.getYearMonthDay(date)
                return year === y && month === m && day === d
            },
            chooseDate(date){
                this.$emit('input',date)
                this.blur()
            }
        },
        mounted(){
            console.log(this.isCurrentMonth);
        },
        computed:{
            visibeDays(){
                // 获取当天的日期
                let {year,month} = utils.getYearMonthDay(this.value)
                // 获取当前月份第一天
               let currentFirstDay =utils.getDate(year,month,1)
                // 获取当前是周几
                let week = currentFirstDay.getDay()
                // 循环开始的天数
                let startDay = currentFirstDay - week * 60 * 60 * 1000 * 24
                // 循环42天
                let arr = []
                for(let i = 0; i< 42; i++){
                    arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
                }
                return arr
            },
            formatDate(){
                let {year,month,day} = utils.getYearMonthDay(this.value)
                return `${year}-${month + 1}-${day}`
            }
        }
    }
</script>

<style scoped lang="stylus">
.currentDay
    background-color: skyblue
    border-radius: 50%;
.notCurrentMonth
    color #ddd
.pannel
    position: absolute;
    width 32 * 7  px
    box-shadow 2px 2px 2px skyblue,-2px -2px 2px skyblue
    .pannel-nav
        display: flex;
        justify-content space-around
        height: 30px
        span
            cursor pointer
            user-select none
    .pannel-content
        .cell
            box-sizing border-box
            display inline-flex
            justify-content: center;
            align-items center
            width: 32px
            height: 32px
            font-weight: 700
            cursor pointer
            &:hover
                border: 1px solid skyblue
    .pannel-footer
        height: 30px
        text-align: center;
</style>