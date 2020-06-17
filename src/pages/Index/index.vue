<template>
	<div>
		<div class="tabs">
			<div class="tab_item">
				<img class="tab_icon" src="../../assets/index_top_up.png">
				<div class="tab_txt">账户充值</div>
			</div>
			<div class="tab_item">
				<img class="tab_icon" src="../../assets/index_send_money.png">
				<div class="tab_txt">批量打款</div>
			</div>
			<div class="tab_item">
				<img class="tab_icon" src="../../assets/index_ apply.png">
				<div class="tab_txt">发票申请</div>
			</div>
		</div>
		<el-card style="margin-top: 24px">
			<div class="index_card_title">
				<div class="title_text">待处理事务</div>
				<div class="title_right">
					更多详情
					<img class="right_icon" src="../../assets/right_icon.png">
				</div>
			</div>
			<div class="mess_box">
				<div class="mess_item">
					<img class="mess_icon" src="../../assets/announcement.png">
					<div class="mess_text">系统公告（<span>10</span>）</div>
				</div>
				<div class="line"></div>
				<div class="mess_item">
					<img class="mess_icon" src="../../assets/notice.png">
					<div class="mess_text">函件通知（<span>5</span>）</div>
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px">
			<div class="index_card_title">
				<div class="title_text">账户概览</div>
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
							<div class="content_item_val">1245.32</div>
						</div>
						<div class="content_item">
							<div class="content_item_label">不可用金额（元）</div>
							<div class="content_item_val">2373264</div>
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
							<div class="content_item_label">可用余额（元）</div>
							<div class="content_item_val">1245.32</div>
						</div>
						<div class="content_item">
							<div class="content_item_label">累计返还（元）</div>
							<div class="content_item_val">18825545.00</div>
						</div>
					</div>
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px">
			<div class="index_card_title">
				<div class="title_text">业务概览</div>
				<el-date-picker
				size="small"
				v-model="date_range"
				type="daterange"
				align="right"
				unlink-panels
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				:picker-options="pickerOptions">
			</el-date-picker>
		</div>
		<div class="business_box">
			<div class="business_item">
				<div class="business_content">
					<div class="business_content_item">
						<div class="business_item_label">打款成功总额（元）</div>
						<div class="business_item_val">1245.32</div>
						<div class="pink_yuan">
							<div>成功</div>
							<div>1000笔</div>
						</div>
					</div>
					<div class="business_content_item">
						<div class="business_item_label">请求打款总额（元）</div>
						<div class="business_item_val">2373264</div>
						<div class="blue_yuan">
							<div>共计</div>
							<div>1000笔</div>
						</div>
					</div>
				</div>
				<div class="tiao">查看交易订单>></div>
			</div>
			<div class="line"></div>
			<div class="business_item">
				<div class="business_content">
					<div class="business_content_item">
						<div class="business_item_label">签收发票总额（元）</div>
						<div class="business_item_val">1245.32</div>
						<div class="pink_yuan">
							<div>成功</div>
							<div>1000笔</div>
						</div>
					</div>
					<div class="business_content_item">
						<div class="business_item_label">申请发票总额（元）</div>
						<div class="business_item_val">2373264</div>
						<div class="blue_yuan">
							<div>共计</div>
							<div>1000笔</div>
						</div>
					</div>
				</div>
				<div class="tiao">查看发票申请记录>></div>
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
	export default{
		data(){
			return{
				date_range:"",		//业务概览日期范围
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
			}
		}
	}
</script>