import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//mock数组
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


// 定义store
let store = new Vuex.Store({
    state: {
        shopList
    },
    getters: {
        totals(state) {
            // reduce处理每一项，把每一项加起来
            return state.shopList.reduce((startCount, item)=>startCount+item.count, 0)
        }
    },
    mutations: {
        updateCountById(state, payload) {
            //找到符合某条件的第一项
            let item = state.shopList.find(item => item.id==payload.id)
            item.count += 1 * payload.flag
        }
    }
})

export default store
