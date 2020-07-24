import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>require(['@/pages/Login/login'],resolve)
const home = resolve=>require(['@/pages/Home/home'],resolve)
const index = resolve=>require(['@/pages/Index/index'],resolve)
const trade_order = resolve=>require(['@/pages/Trading/trade_order'],resolve)
const order_detail = resolve=>require(['@/pages/Trading/order_detail'],resolve)
const receipt = resolve=>require(['@/pages/Trading/receipt'],resolve)
const hang_order = resolve=>require(['@/pages/Trading/hang_order'],resolve)
const batch_money = resolve=>require(['@/pages/Trading/batch_money'],resolve)
const money_record = resolve=>require(['@/pages/Trading/money_record'],resolve)
const money_detail = resolve=>require(['@/pages/Trading/money_detail'],resolve)
const single = resolve=>require(['@/pages/Single/single'],resolve)
const single_detail = resolve=>require(['@/pages/Single/single_detail'],resolve)
const account_management = resolve=>require(['@/pages/MoneyManagement/AccountManagement/account_management'],resolve)
const money_dis = resolve=>require(['@/pages/MoneyManagement/money_dis'],resolve)
const bill_list = resolve=>require(['@/pages/Bill/bill_list'],resolve)
const bill_detail = resolve=>require(['@/pages/Bill/bill_detail'],resolve)
const apply = resolve=>require(['@/pages/Invoice/apply'],resolve)
const invoice_apply = resolve=>require(['@/pages/Invoice/invoice_apply'],resolve)
const apply_record = resolve=>require(['@/pages/Invoice/apply_record'],resolve)
const has_invoice = resolve=>require(['@/pages/Invoice/has_invoice'],resolve)
const invoice_info = resolve=>require(['@/pages/Invoice/invoice_info'],resolve)
const sign_user = resolve=>require(['@/pages/User/sign_user'],resolve)
const store_info = resolve=>require(['@/pages/Store/store_info'],resolve)
const sign_info = resolve=>require(['@/pages/Store/sign_info'],resolve)
const remind_setting = resolve=>require(['@/pages/Store/remind_setting'],resolve)
const data_management = resolve=>require(['@/pages/Data/data_management'],resolve)
const correspondence = resolve=>require(['@/pages/Message/correspondence'],resolve)
const system = resolve=>require(['@/pages/Message/system'],resolve)
const account_pre = resolve=>require(['@/pages/Permissions/account_pre'],resolve)
const management = resolve=>require(['@/pages/Permissions/management'],resolve)
const buckle_pay = resolve=>require(['@/pages/Tax/buckle_pay'],resolve)

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
    { path: '/account_management',name:"资金管理/账户管理", component: account_management},
    { path: '/money_dis',name:"资金管理/资金流水", component: money_dis},
    { path: '/bill_list',name:"账单管理/余额日账单", component: bill_list},
    { path: '/bill_detail',name:"余额日账单/详情", component: bill_detail},
    { path: '/apply',name:"发票管理/发票申请", component: apply},
    { path: '/invoice_apply',name:"发票管理/发票申请", component: invoice_apply},
    { path: '/apply_record',name:"发票管理/申请记录", component: apply_record},
    { path: '/has_invoice',name:"发票管理/已开发票", component: has_invoice},
    { path: '/invoice_info',name:"发票管理/开票信息", component: invoice_info},
    { path: '/sign_user',name:"用户管理/签约用户", component: sign_user},
    { path: '/store_info',name:"商户管理/商户信息", component: store_info},
    { path: '/sign_info',name:"商户管理/签约信息", component: sign_info},
    { path: '/remind_setting',name:"商户管理/提醒设置", component: remind_setting},
    { path: '/data_management',name:"数据管理/商户数据", component: data_management},
    { path: '/correspondence',name:"消息管理/函件通知", component: correspondence},
    { path: '/system',name:"消息管理/系统公告", component: system},
    { path: '/account_pre',name:"权限管理/账号管理", component: account_pre},
    { path: '/management',name:"权限管理/权限管理", component: management},
    { path: '/buckle_pay',name:"税务管理管理/个税扣缴明细", component: buckle_pay},
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