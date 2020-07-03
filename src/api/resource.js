import http from './request.js'
let path = {	
	index:"index",												//账户概览和待处理事务
	accountInfo:"accountInfo",									//首页业务概览
	letterslist:'message/letterslist',							//函件通知列表
	getLetters:'message/getletters',							//函件详情
	noticelist:'message/noticelist',							//系统公告
	getNotice:'message/getnotice',								//公告详情
	orderList:'order/list',										//交易订单
	receiptList:'order/receiptlist',							//电子回单
	hangList:'order/hanglist',									//挂起订单
	downLoadTemp:'order/download',								//点击下载模版
	importFile:'order/upload',									//批量打款（第一步上传）
	batchInfo:'order/batchinfo',								//获取批次信息（第二步）
	batchOrderList:'order/batchorderlist',						//批次订单列表（第二步下面）
	lockBatch:'order/lockbatch',								//锁批
	cancelBatch:'order/cancelbatch',							//撤销
	pay:'order/pay',											//打款
	batchList:'order/batchlist',								//批量打款记录
	cancel:'order/cancel',										//取消打款
	editOrder:'order/edit',										//修改信息
	editPayMoney:'order/editpaymoney',							//修改打款金额
	orderDetail:'order/detail',									//订单详情
	adjustList:'order/adjustlist',								//调单记录
	adjustDetail:'order/adjustdetail',							//调单记录详情
	storeInfo:'store/storeinfo',								//商铺信息
	rechargeRecord:'storebill/rechargerecord',					//充值记录
	transFerrecord:'storebill/transferrecord',					//转账付款、转账收款账户

}				
export default{
	//账户概览和待处理事务
	index(params){
		return http.get(path.index, params)
	},
	//首页业务概览
	accountInfo(params){
		return http.get(path.accountInfo, params)
	},
	//函件通知列表
	letterslist(params){
		return http.get(path.letterslist, params)
	},
	//函件详情
	getLetters(params){
		return http.get(path.getLetters, params)
	},
	//系统公告
	noticelist(params){
		return http.get(path.noticelist, params)
	},
	//公告详情
	getNotice(params){
		return http.get(path.getNotice, params)
	},
	//交易订单
	orderList(params){
		return http.get(path.orderList, params)
	},
	//电子回单
	receiptList(params){
		return http.get(path.receiptList, params)
	},
	//挂起订单
	hangList(params){
		return http.get(path.hangList, params)
	},
	//下载模版
	downLoadTemp(params){
		return http.get(path.downLoadTemp, params)
	},
	//批量打款第一步上传
	importFile(params){
		return http.post(path.importFile, params)
	},
	//获取批次信息（第二步）
	batchInfo(params){
		return http.get(path.batchInfo, params)
	},
	//批次订单列表
	batchOrderList(params){
		return http.get(path.batchOrderList, params)
	},
	//锁定批次
	lockBatch(params){
		return http.post(path.lockBatch, params)
	},
	//撤销批次
	cancelBatch(params){
		return http.post(path.cancelBatch, params)
	},
	//打款
	pay(params){
		return http.post(path.pay, params)
	},
	//批量打款记录
	batchList(params){
		return http.get(path.batchList, params)
	},
	//取消打款
	cancel(params){
		return http.post(path.cancel, params)
	},
	//修改信息
	editOrder(params){
		return http.post(path.editOrder, params)
	},
	//修改打款金额
	editPayMoney(params){
		return http.post(path.editPayMoney, params)
	},
	//订单详情
	orderDetail(params){
		return http.get(path.orderDetail, params)
	},
	//调单记录
	adjustList(params){
		return http.get(path.adjustList, params)
	},
	//调单记录详情
	adjustDetail(params){
		return http.get(path.adjustDetail, params)
	},
	//商铺详情
	storeInfo(params){
		return http.get(path.storeInfo, params)
	},
	//充值记录
	rechargeRecord(params){
		return http.get(path.rechargeRecord, params)
	},
	//转账付款、转账收款账户
	transFerrecord(params){
		return http.get(path.transFerrecord, params)
	},
}









