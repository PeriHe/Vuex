# Vuex

vuex一些你必知的概念
--
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态，并一种可预测的方式发生变化（来自vuex官网）。

总之，vuex特点：
1. 集中式存储管理
2. 一种可预测的方式发生变化

状态分为两种：
1. 组件内部状态：仅在一个组件内使用的状态（data字段）
2. 应用级别状态：多个组件共用状态

使用vux的情况：
1. 多个视图依赖于同一状态
2. 来自不同视图的行为需要变更同一状态

使用vue
1. 安装<br>
![](https://images2018.cnblogs.com/blog/1079732/201803/1079732-20180330195507532-195635588.png)<br>
2.作为插件使用
3.定义容器
```
//引入
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 定义store
let store = new Vuex.Store({
})
export default store
```
4.注入根实例
在main.js中：
将store里的index.js引入进来;
```
import store from './store'
```
将store注入到根实例中;
```
new Vue({
  el: '#app',
  store:store,
  components: { App },
  template: '<App/>'
})
```
这样，在每个组件中就可以使用vuex了。<br>
更具体的操作说明，需要弄懂如下图：

vuex示意图
---
![](https://images2018.cnblogs.com/blog/1079732/201803/1079732-20180330195104017-1530425980.png)
<br>
store（仓库）：就是一个容器，它包含着你的应用中大部分的状态，状态存储是响应式的，不能直接改变store中的状态。<br>
　　state（状态）：定义应用的单一状态树，用一个对象就包含了全部应用层级状态。<br>
　　getter（派分的状态）：抽离操作状态的逻辑，可被多组件使用。<br>
　　mutation（修改状态的唯一途径）：要使改变状态被记录，必须要commit一个mutation；mutation必须是同步更新状态。<br>
　　action（异步操作）：异步操作产生结果；action提交的是mutation而不是直接变更状态。<br>
例一（定义状态与获取状态）：
我们现在在刚才定义的store中定义一个状态count（store里的index.js文件），我们将在pp.vue中使用这个状态。
```
// 定义store
let store = new Vuex.Store({
    state: {
        count: 10 //定义一个状态
    }
})
 （hello.vue）

<template>
  <div>
      hello,pp vue
      <!-- 在p里显示一个数字 -->
      <p>{{n}}</p>
  </div>
</template>
<script>
export default {
  data() {
   return {
      n:this.$store.state.count //n的初始值从vuex的state中拿
   }
  }
}
</script>
```
$store是组件实例上的一个属性，所以当然也可以这样取（pp.vue）：
```
<template>
  <div>
      <h2>我是pp组件</h2>
      <p>{{$store.state.count}}</p>
  </div>
</template>
```
例二（更改状态）：
mutations登场！想改变状态，必须提交mutations（store里的index.js文件）
```
let store = new Vuex.Store({
    state: {
        count: 10 //定义一个状态
    },
    mutations: {
        updateCount(state) { //改变state状态的，需要接受一个参数，内部传过来的，只要接收就行
            state.count += 1;
        }
    }
})
```
然后就可以在组件里加一个button，点击以改变状态（hello.vue）
```
<button @click="changeCount">点击改变状态</button>
$store上有个方法commit，用来提交mutation，括号里面是mutation名：
methods: {
    changeCount() { //改变vuex中的状态
      this.$store.commit('updateCount'); //$store上有个方法commit用来提交mutation    
    }
  }
  ```
 这时候就成功点击使pp.vue数值每次加一了。题外话，因为hello.vue使用的是data，data是只会在本组件被改变，所以不会改变。这时候计算属性就派上用场了。
```
（hello.vue）
computed: {
    m() { 
      return this.$store.state.count
    }
  }
<template>
  <div>
      hello,pp vue
      <p>{{n}}</p>
      <p>{{m}}</p>
      <button @click="changeCount">点击改变状态</button>
  </div>
</template>
```
这时候点击，hello里的也会改变了。
我们当然不能写死数据（每次加1），这时候就可以通过给mutation传第二个参数（store里面index.js）：
```
mutations: {
        updateCount(state, payload) { 
            //必须接受第一个state参数（也可以叫别的名字），内部传过来的，只要接收就行
            //可以接收一个对象传值过来
            state.count += payload.add;
        }
    }
 ```
 ```
（hello.vue）
 methods: {
    changeCount() {
      this.$store.commit('updateCount', {
        add: 10
      }); 
      }
  },
  ```
这样每次就加10了

例三（计算）：
对一组数据进行加减控制，同时响应的计算出总数，需要用到getters。<br>
首先mock一组数据（store里的index.js）
```
const shopList = [
    {
        id: 123,
        count: 4
    },
    {
        id: 456,
        count: 1
    }
]
```
定义一个状态
```
state: {
        shopList
    },
（hello.vue）

shopList() { 
      return this.$store.state.shopList
    }
<template>
  <div>
    <div :key="item.id" v-for="item in shopList">
      <button>+</button>
      <span>{{item.count}}</span>
      <button>-</button>
  </div>
  </div>
</template>
```
reduce方法统计总数，第二个参数是开始值。是数组的一个方法。这样就可以计算出总数。（store里index.js）
```
getters: {
        totals(state) {
            // reduce处理每一项，把每一项加起来
            return state.shopList.reduce((startCount, item)=>startCount+item.count, 0)
        }
    },
 ```
 在pp.vue中拿到并显示总数
```
<h2>total:{{$store.getters.totals}}</h2>
```
结合以上例子，要更改状态必须要用mutations，给按钮绑定事件，这里要根据id找到符合条件的一项，即点击改变的是数组中的哪个对象，find方法找到符合某条件的第一项。<br>
直接上代码（store里的index.js）
```
mutations: {
        updateCountById(state, payload) {
            let item = state.shopList.find(item => item.id==payload.id)
            item.count += 1 * payload.flag
        }
    }
```
在事件中提交mutations（hello.js）
```
add(id) { 
      this.$store.commit('updateCountById', {
        id,
        flag:1
      })
    },
    des(id) {
      this.$store.commit('updateCountById', {
        id,
        flag:-1
      })
    }
```
这样就可以看到效果了。

 例四（异步操作）：<br>
异步操作必须放在actions里面。mutations是同步的。只要提交mutations就有记录，如果mutations中有异步操作，记录的值还是以前的值。所以异步操作都要放在actions中。
store/index.js:
```
mutations: {
    updateCountById(state, payload) {
        let item = state.shopList.find(item => item.id==payload.id)
        item.count += 1 * payload.flag
    }
},
actions: {
    updateCountAction(store, params) { 
        setTimeout(()=>{
            //改变状态就要提交mutations
            store.commit('updateCountById', params)
        }, 3000)
    }
}
```
派发action。hello.vue:
```
add(id) { 
      this.$store.dispatch(' updateCountAction',  {
        id,
        flag:1
      })
    },
 ```
 等待3秒钟后数值发生改变，状态同时改变。

最后总结几个原则
---
1. 每个引用仅仅包含一个store实例（如果页面中有很多块，用module去划分，购物车有个module，支付一个module...）<br>

2. 更改store中状态唯一方法是提交mutation<br>

3. mutation必须是同步函数<br>

4. action可以包含任意异步操作<br>

5. action提交的是mutation，而不是直接变更状态 <br>

 

 

 

 
