<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="hello">
    <!--    <h1>{{ msg }}</h1>-->
    <h1>currentScrollIndex:{{ currentScrollIndex }}</h1>
    <h3 class="cy-f-22px">Essential Links</h3>
    <ce-swiper-scroll style="height:60px;" :active-class-name="'cy-t-success'" :current-index="currentScrollIndex" direction="y">
      <template v-slot:scrollItems>
        <div v-for="item in list" class="cy-t-hide">
          {{item}}
        </div>
      </template>
    </ce-swiper-scroll>

    <ce-swiper-scroll style="width:60px;margin: 0 auto" :active-class-name="'cy-t-success'" :current-index="currentScrollIndex">
      <template v-slot:scrollItems>
        <span v-for="item in list" class="cy-t-hide">
          {{item}}{{item}}
        </span>
      </template>
    </ce-swiper-scroll>

    <div class='notice cy-w-100 cy-pd-tb-5px cy-pd-lr-15px'  ref='noticeRef'>
      <span class='cy-f-b'>系统公告：</span>
      <span>欢迎来到xxx的直播间，我们将在今晚8点推出全新的，你一定会值的拥有</span>
    </div>

  </div>
</template>

<script>
import { reactive, ref, toRefs, computed, onMounted, getCurrentInstance } from 'vue'

export default {
  name: 'HelloWorld',
  //  props: {
  //    msg: {
  //      type: String,
  //      default: ''
  //    }
  //  },
  setup() {
    //    let state = init()
    //    return {
    //      ...state
    //    }
    // 列表滚动
    let { currentScrollIndex, list } = init()
    // 公告滚动
    let { noticeRef } = noticeScroll()
    return { currentScrollIndex, list, noticeRef }
  }

}
// 列表滚动
function init() {
  let timer = null
  let state = reactive({
    currentScrollIndex: 0,
    list: ['文本1', '文本2', '文本3', '文本4', '文本5']
  })

  onMounted(() => {
    auto()
  })

  function auto() {
    timer = setTimeout(() => {
      if (state.currentScrollIndex === (state.list.length - 1)) {
        state.currentScrollIndex = 0
      } else {
        ++state.currentScrollIndex
      }
      auto()
    }, 2000)
  }

  return { ...toRefs(state) }
}

// 公告滚动
function noticeScroll() {
  let noticeRef = ref(null) // 定义的常量名要跟ref定义的名字一致

  console.dir(noticeRef) // console.dir()可以显示一个对象所有的属性和方法

  scrollLoop()
  function scrollLoop() {
    setTimeout(() => {
      let notice = noticeRef.value.scrollLeft
      let allWidth = noticeRef.value.scrollWidth
      let equipmentWidth = noticeRef.value.offsetWidth

      noticeRef.value.scrollLeft += 1

      if (notice >= allWidth - equipmentWidth) {
        noticeRef.value.scrollLeft = 0
      }

      scrollLoop()
    }, 50)
  }

  return { noticeRef }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .creator-tips {
    top: 0;
    left: 50%;
    width: 100%;
    height: 28px;
    transform: translateX(-50%);
  }
  creator-tips-two{
    top: 0;
    left: 50%;
    width: 100%;
    width: 30px;
    height: 28px;
    transform: translateX(-50%);
  }
  /*公告*/
  .notice{
    background-color: #F4E3A1;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    .name{
      color: #FF0000;
    }
  }
</style>
