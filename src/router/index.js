import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>require(['@/pages/Login/login'],resolve)
const home = resolve=>require(['@/pages/Home/home'],resolve)
const index = resolve=>require(['@/pages/Index/index'],resolve)
const trade_order = resolve=>require(['@/pages/TradeOrder/trade_order'],resolve)
const order_detail = resolve=>require(['@/pages/TradeOrder/order_detail'],resolve)
const receipt = resolve=>require(['@/pages/Receipt/receipt'],resolve)
const hang_order = resolve=>require(['@/pages/HangOrder/hang_order'],resolve)
const batch_money = resolve=>require(['@/pages/BatchMoney/batch_money'],resolve)
const money_record = resolve=>require(['@/pages/MoneyRecord/money_record'],resolve)
const money_detail = resolve=>require(['@/pages/MoneyRecord/money_detail'],resolve)
const single = resolve=>require(['@/pages/Single/single'],resolve)
const single_detail = resolve=>require(['@/pages/Single/single_detail'],resolve)

Vue.use(Router)

const router = new Router({
  routes: [
  {
    path: '/login',
    component: login,
  },
  {
    path: '/home',
    component: home,
    children:[
    { path: '/index',name:"首页列表", component: index},
    { path: '/trade_order',name:"交易订单", component: trade_order},
    { path: '/order_detail',name:"订单详情", component: order_detail},
    { path: '/receipt',name:"电子回单", component: receipt},
    { path: '/hang_order',name:"挂起订单", component: hang_order},
    { path: '/batch_money',name:"批量打款", component: batch_money},
    { path: '/money_record',name:"批量打款记录", component: money_record},
    { path: '/money_detail',name:"打款详情", component: money_detail},
    { path: '/single',name:"调单记录", component: single},
    { path: '/single_detail',name:"调单记录/详情", component: single_detail},
    ]
  }
  ]
})
// 路由跳转前的钩子
router.beforeEach(function (to, from, next) {
  let path = to.fullPath;
  sessionStorage.setItem("tab",path);
  next()
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router;