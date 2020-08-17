<template>
	<div>
		<div class="tabs">
			<div class="tab_item" @click="$router.push('/account_management')">
				<img class="tab_icon" :src="qn_url + 'index_top_up.png'">
				<div class="tab_txt">账户充值</div>
			</div>
			<div class="tab_item" @click="$router.push('/batch_money')">
				<img class="tab_icon" :src="qn_url + 'index_send_money.png'">
				<div class="tab_txt">批量打款</div>
			</div>
			<div class="tab_item" @click="$router.push('/apply')">
				<img class="tab_icon" :src="qn_url + 'index_apply.png'">
				<div class="tab_txt">发票申请</div>
			</div>
		</div>
		<el-card style="margin-top: 24px">
			<div class="index_card_title">
				<div class="title_text">待处理事务</div>
			</div>
			<div class="mess_box">
				<div class="mess_item" @click="$router.push('/system')">
					<img class="mess_icon" src="../../assets/announcement.png">
					<div class="mess_text">系统公告（<span>{{indexObj.system_notice}}</span>）</div>
				</div>
				<div class="line"></div>
				<div class="mess_item" @click="$router.push('/correspondence')">
					<img class="mess_icon" src="../../assets/notice.png">
					<div class="mess_text">函件通知（<span>{{indexObj.system_leter}}</span>）</div>
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px">
			<div class="index_card_title">
				<div class="title_text">账户概览</div>
				<div class="title_right" @click="$router.push('/account_management')">
					更多详情
					<img class="right_icon" src="../../assets/right_icon.png">
				</div>
			</div>
			<div class="account_box">
				<div class="account_item">
					<div class="item_title">
						<img class="account_icon" src="../../assets/pink_¥.png">
						余额账户
					</div>
					<div class="account_content">
						<div class="content_item">
							<div class="content_item_label">可用余额（元）</div>
							<div class="content_item_val">{{indexObj.balance}}</div>
						</div>
						<div class="content_item">
							<div class="content_item_label">不可用金额（元）
								<el-popover
								placement="top-start"
								width="300"
								trigger="hover"
								content="当您发起打款、转账、提现后，资金在审核过程中暂不可用">
								<img class="reference" slot="reference" src="../../assets/reference.png">
							</el-popover>
						</div>
						<div class="content_item_val">{{indexObj.frozen_amount}}</div>
					</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="account_item">
				<div class="item_title">
					<img class="account_icon" src="../../assets/blue_¥.png">
					服务费抵扣账户
				</div>
				<div class="account_content">
					<div class="content_item">
						<div class="content_item_label">可用余额（元）
							<el-popover
							placement="top-start"
							width="300"
							trigger="hover"
							content="可用余额≥打款订单服务费时，服务费将由此账户可用余额进行抵扣。
							抵扣与返还记录可查询服务费抵扣账户明细">
							<img class="reference" slot="reference" src="../../assets/reference.png">
						</el-popover>
					</div>
					<div class="content_item_val">{{indexObj.service_balance}}</div>
				</div>
				<div class="content_item">
					<div class="content_item_label">累计返还（元）</div>
					<div class="content_item_val">{{indexObj.all_return_money}}</div>
				</div>
			</div>
		</div>
	</div>
</el-card>
<el-card style="margin-top: 24px">
	<div class="index_card_title">
		<div class="title_text">业务概览</div>
		<el-date-picker
		v-model="date"
		type="datetimerange"
		value-format="yyyy-MM-dd HH:mm:ss"
		:picker-options="pickerOptions"
		range-separator="至"
		start-placeholder="开始日期"
		end-placeholder="结束日期"
		align="right"
		:default-time="['00:00:00', '23:59:59']"
		>
	</el-date-picker>
</div>
<div class="business_box">
	<div class="business_item">
		<div class="business_content">
			<div class="business_content_item">
				<div class="business_item_label">打款成功总额（元）</div>
				<div class="business_item_val">{{accountInfoObj.total_success_money}}</div>
				<div class="pink_yuan">
					<div>成功</div>
					<div>{{accountInfoObj.total_success_num}}笔</div>
				</div>
			</div>
			<div class="business_content_item">
				<div class="business_item_label">请求打款总额（元）</div>
				<div class="business_item_val">{{accountInfoObj.total_pay_money}}</div>
				<div class="blue_yuan">
					<div>共计</div>
					<div>{{accountInfoObj.total_pay_num}}笔</div>
				</div>
			</div>
		</div>
		<div class="tiao" @click="$router.push('/trade_order')">查看交易订单>></div>
	</div>
	<div class="line"></div>
	<div class="business_item">
		<div class="business_content">
			<div class="business_content_item">
				<div class="business_item_label">签收发票总额（元）</div>
				<div class="business_item_val">{{accountInfoObj.finish_price_tax}}</div>
				<div class="pink_yuan">
					<div>成功</div>
					<div>{{accountInfoObj.finish_invoice_num}}笔</div>
				</div>
			</div>
			<div class="business_content_item">
				<div class="business_item_label">申请发票总额（元）</div>
				<div class="business_item_val">{{accountInfoObj.apply_price_tax}}</div>
				<div class="blue_yuan">
					<div>共计</div>
					<div>{{accountInfoObj.apply_invoice_num}}笔</div>
				</div>
			</div>
		</div>
		<div class="tiao" @click="$router.push('/apply_record')">查看发票申请记录>></div>
	</div>
</div>
</el-card>
</div>
</template>
<style lang="less" scoped>
.tabs{
	display: flex;
	align-items: center;
	justify-content: space-between;
	.tab_item{
		width: 360px;
		height: 130px;
		position: relative;
		.tab_icon,.tab_txt{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.tab_txt{
			text-align: center;
			line-height: 130px;
			font-size: 28px;
			color: #FFFFFF;
		}
	}
}
.index_card_title{
	padding-bottom: 16px;
	border-bottom: 1px solid #E8E8E8;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.title_text{
		font-size: 16px;
		color: #333333;
	}
	.title_right{
		font-size: 14px;
		color: #666666;
		display: flex;
		align-items: center;
		.right_icon{
			margin-left: 6px;
			width: 8px;
			height: 13px;
		}
	}
}
.mess_box{
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding-top: 16px;
	.mess_item{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #000000;
		.mess_icon{
			margin-right: 8px;
			width: 22px;
			height: 22px;
		}
		.mess_text span{
			color: red;
		}
	}
	.line{
		border-right: 1px solid #E8E8E8;
		height: 33px;
	}
}
.account_box{
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding-top: 16px;
	.line{
		border-right: 1px solid #E8E8E8;
		height: 95px;
	}
	.account_item{
		width: 50%;
		.item_title{
			margin-bottom: 19px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #333333;
			.account_icon{
				margin-right: 4px;
				width: 20px;
				height: 22px;
				
			}
		}
		.account_content{
			display: flex;
			align-items: center;
			justify-content: space-around;
			.content_item_label{
				margin-bottom: 6px;
				font-size: 14px;
				color: #666666;
				display: flex;
				align-items: center;
				.reference{
					width: 16px;
					height: 16px;
				}
			}
			.content_item_val{
				font-size: 26px;
				color: #333333;
			}
		}
	}
}
.business_box{
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding-top: 16px;
	.business_item{
		width: 50%;
	}
	.business_content{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.business_content_item{
			display: flex;
			flex-direction: column;
			align-items: center;
			.business_item_label{
				margin-bottom: 6px;
				font-size: 14px;
				color: #666666;
			}
			.business_item_val{
				font-size: 26px;
				color: #333333;
			}
			.blue_yuan{
				margin-top: 7px;
				width: 60px;
				height: 60px;
				border-radius: 50%;
				background: #68ABFF;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 12px;
				color: #FFFFFF;
			}
			.pink_yuan{
				margin-top: 7px;
				width: 60px;
				height: 60px;
				border-radius: 50%;
				background: #F68080;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 12px;
				color: #FFFFFF;
			}
		}
	}
	.tiao{
		margin-top: 42px;
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #008DFF;
	}
}
</style>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				date:[],		//业务概览日期范围
				req:{
					start_time:"",
					end_time:""
				},
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				indexObj:{},		//账户概览和待处理事务
				accountInfoObj:{},	//业务概览
			}
		},
		created(){
			//当前设定的日期时间
			let d = new Date
			let year1,month1,day1,hours1,minutes1,seconds1;
			[year1,month1,day1,hours1,minutes1,seconds1] = [d.getFullYear(),d.getMonth() + 1,d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()]
			let date1 = year1 + '-' + month1 + '-' + day1 + ' ' + hours1 + ':' + minutes1 + ':' + seconds1
			this.date.push(date1)
			//前一天设定的日期时间
			let year2,month2,day2,hours2,minutes2,seconds2
			d.setTime(d.getTime() - 3600 * 1000 * 24 * 30);
			[year2,month2,day2,hours2,minutes2,seconds2] = [d.getFullYear(),d.getMonth() + 1,d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()]
			let date2 = year2 + '-' + month2 + '-' + day2 + ' ' + hours2 + ':' + minutes2 + ':' + seconds2
			this.date.unshift(date2)
			//账户概览和待处理事务
			this.index();
		},
		watch:{
			//订单创建时间
			date:function(n){
				this.req.start_time = n && n.length> 0?n[0]:"";
				this.req.end_time = n && n.length> 0?n[1]:"";
				//业务概览
				this.accountInfo()
			}
		},
		methods:{
			//账户概览和待处理事务
			index(){
				resource.index().then(res => {
					if(res.data.code == 1){
						this.indexObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//业务概览
			accountInfo(){
				resource.accountInfo(this.req).then(res => {
					if(res.data.code == 1){
						this.accountInfoObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			}
		}
	}
</script>
















