import http from './request.js'
let path = {	
	getmainmenus:'storeadmin/mymenulist',					//获取所有主菜单
	login:'storeadmin/login',									//登录
	quit:'storeadmin/quit',										//退出登录
	getCaptcha:'storeadmin/captcha',							//获取手机号验证码
	index:"index/index",										//账户概览和待处理事务
	accountInfo:"index/accountInfo",							//首页业务概览
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
	feedback:'order/feedback',									//反馈
	abandonFeedback:'order/abandonfeedback',					//放弃反馈
	storeInfo:'store/getstoreinfo',								//商铺信息
	rechargeRecord:'storebill/rechargerecord',					//充值记录
	transFerrecord:'storebill/transferrecord',					//转账付款、转账收款账户
	transfer:'storebill/transfer',								//转账
	serviceChargeRecord:'storebill/servicechargerecord',		//服务费记录
	accountChange:'storebill/accountchange',					//资金流水
	daybillIndex:'daybill/index',								//余额日账单表
	billOrderList:'daybill/orderlist',							//余额日账单详情
	getBillInfo:'daybill/getinfo',								//余额日账单详情（顶部）
	billlist:'invoice/billlist',								//发票申请账单列表
	applyList:'invoice/applylist',								//发票申请记录
	applyDetail:'invoice/applydetail',							//发票详情
	invoiceConfirm:'invoice/confirmleter',						//生成确认函
	invoiceList:'invoice/invoicelist',							//已开发票列表
	invoiceInfo:'invoice/storeinvoiceinfo',						//商户开票信息
	editInvoiceInfo:'invoice/editstoreinvoiceInfo',				//修改商户信息（获取和修改）
	invitationSignList:'user/invitationsignlist',				//签约用户列表
	getInfo:'user/getinfo',										//获取签约用户信息
	editInfo:'user/editinfo',									//修改用户信息
	userDownLoad:'user/download',								//下载签约用户模版
	userUpload:'user/upload',									//上传邀请签约的用户	
	storeSub:'store/getstoresubscription',						//商户签约信息
	storeRemind:'store/getstoreremind',							//商户提醒设置信息
	statistics:'daystatistics/index',							//商户数据
	taxIndex:'persionaltax/index',								//个税扣缴明细
	taxDownload:'persionaltax/download',						//下载个税明细
	invoiceStep1:'invoice/addstep1',							//申请发票第一步
	imageShow:'invoice/createimage',							//生成图片预览
	step2Invoice:'invoice/addstep2',							//申请发票第二步
	adminIndex:'storeadmin/index',								//管理员列表
	getaccesslist:'storeaccess/getaccesslist',					//获取权限列表（添加或修改角色）
	adminAdd:'storeadmin/add',									//创建普通管理员接口
	adminEdit:'storeadmin/edit',								//编辑普通管理员
	adminEditGet:'storeadmin/edit',								//编辑普通管理员
	adminStartStop:'storeadmin/startstop',						//管理员设置
	editPassword:'storeadmin/editpassword',						//重置密码
	getMainMenus:'storeaccess/getmainmenus',					//获取所有主菜单
	getControllers:'storeaccess/getControllers',				//获取所有控制器
	getMethods:'storeaccess/getmethods',						//获取某控制器中所有方法
	accessList:'storeaccess/accesslist',						//获取权限列表（单独页面展示使用）
	getaccessinfo:'storeaccess/getinfo',						//权限信息获取
	delaccess:'storeaccess/del',								//权限删除
	addaccess:'storeaccess/add',								//权限添加
	editaccess:'storeaccess/edit',								//权限修改

}				
export default{
	//获取所有主菜单
	getmainmenus(params){
		return http.get(path.getmainmenus, params)
	},
	//登录
	login(params){
		return http.post(path.login, params)
	},
	//验证登录
	checkLogin(params){
		return http.get(path.login, params)
	},
	//退出登录
	quit(params){
		return http.get(path.quit, params)
	},
	//获取手机验证码
	getCaptcha(params){
		return http.get(path.getCaptcha, params)
	},
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
	//反馈
	feedback(params){
		return http.post(path.feedback, params)
	},
	//放弃反馈
	abandonFeedback(params){
		return http.post(path.abandonFeedback, params)
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
	//转账
	transfer(params){
		return http.post(path.transfer, params)
	},
	//服务费记录
	serviceChargeRecord(params){
		return http.get(path.serviceChargeRecord, params)
	},
	//资金流水
	accountChange(params){
		return http.get(path.accountChange, params)
	},
	//余额日账单列表
	daybillIndex(params){
		return http.get(path.daybillIndex, params)
	},
	//余额日账单详情
	billOrderList(params){
		return http.get(path.billOrderList, params)
	},
	//余额日账单详情（顶部）
	getBillInfo(params){
		return http.get(path.getBillInfo, params)
	},
	//发票申请账单列表
	billlist(params){
		return http.get(path.billlist, params)
	},
	//发票申请记录
	applyList(params){
		return http.get(path.applyList, params)
	},
	//获取发票详情
	applyDetail(params){
		return http.get(path.applyDetail, params)
	},
	//生成确认函
	invoiceConfirm(params){
		return http.get(path.invoiceConfirm, params)
	},
	//已开发票列表
	invoiceList(params){
		return http.get(path.invoiceList, params)
	},
	//还是那个户开票信息
	invoiceInfo(params){
		return http.get(path.invoiceInfo, params)
	},
	//编辑商户信息（获取信息）
	getEditInvoiceInfo(params){
		return http.get(path.editInvoiceInfo, params)
	},
	//编辑商户信息（获取信息）
	postEditInvoiceInfo(params){
		return http.post(path.editInvoiceInfo, params)
	},
	//签约用户列表
	invitationSignList(params){
		return http.get(path.invitationSignList, params)
	},
	//获取签约用户信息
	getInfo(params){
		return http.get(path.getInfo, params)
	},
	//修改用户信息
	editInfo(params){
		return http.post(path.editInfo, params)
	},
	//下载签约用户模版
	userDownLoad(params){
		return http.get(path.userDownLoad, params)
	},
	//上传邀请签约的用户
	userUpload(params){
		return http.post(path.userUpload, params)
	},
	//商户签约信息
	storeSub(params){
		return http.get(path.storeSub, params)
	},
	//商户提醒设置信息
	storeRemind(params){
		return http.get(path.storeRemind, params)
	},
	//商户数据
	statistics(params){
		return http.get(path.statistics, params)
	},
	//个税扣缴明细
	taxIndex(params){
		return http.get(path.taxIndex, params)
	},
	//下载个税明细
	taxDownload(params){
		return http.get(path.taxDownload, params)
	},
	//申请发票第一步
	invoiceStep1(params){
		return http.get(path.invoiceStep1, params)
	},
	//生成图片预览
	imageShow(params){
		return http.post(path.imageShow, params)
	},
	//申请发票第二步
	step2Invoice(params){
		return http.post(path.step2Invoice, params)
	},
	//管理员列表
	adminIndex(params){
		return http.get(path.adminIndex, params)
	},
	//获取权限列表（添加或修改角色）
	getaccesslist(params){
		return http.get(path.getaccesslist, params)
	},
	//创建普通管理员接口
	adminAdd(params){
		return http.post(path.adminAdd, params)
	},
	//编辑普通管理员接口(post)
	adminEdit(params){
		return http.post(path.adminEdit, params)
	},
	//编辑普通管理员接口(get)
	adminEditGet(params){
		return http.get(path.adminEditGet, params)
	},
	//管理员设置
	adminStartStop(params){
		return http.post(path.adminStartStop, params)
	},
	//重置密码
	editPassword(params){
		return http.post(path.editPassword, params)
	},
	//获取所有主菜单
	getMainMenus(params){
		return http.get(path.getMainMenus, params)
	},
	//获取所有控制器
	getControllers(params){
		return http.get(path.getControllers, params)
	},
	//获取某控制器中所有方法
	getMethods(params){
		return http.get(path.getMethods, params)
	},
	//获取权限列表（单独页面展示使用）
	accessList(params){
		return http.get(path.accessList, params)
	},
	//权限信息获取
	getaccessinfo(params){
		return http.get(path.getaccessinfo, params)
	},
	//权限删除
	delaccess(params){
		return http.post(path.delaccess, params)
	},
	//权限添加
	addaccess(params){
		return http.post(path.addaccess, params)
	},
	//权限修改
	editaccess(params){
		return http.post(path.editaccess, params)
	},
}









