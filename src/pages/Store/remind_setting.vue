<template>
	<div>
		<el-card>
			<div class="info_title">
				<div class="title_txt">资金提醒设置</div>
			</div>
			<div class="info_row">
				充值到账提醒         短信   邮件
			</div>
			<div class="info_row">
				账户余额提醒    
			</div>
			<div class="info_row">
				银行卡余额提醒阈值(元)：50,000.00    
			</div>
			<div class="info_row">
				支付宝余额提醒阈值(元)：0.00   
			</div>
			<div class="info_row">
				微信支付余额提醒阈值(元)：0.00 
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">接收提醒设置</div>
			</div>
			<div class="info_row">
				充值到账提醒：13968141381
			</div>
			<div class="info_row">
				账户余额不足提醒：13968141381
			</div>
			<div class="info_row">
				预警及提醒类邮件：wangshuyan1381@dingtalk.com
			</div>
			<div class="info_row">
				账单类提醒邮件：wangshuyan1381@dingtalk.com
			</div>
			<div class="info_row">
				报税信息类提醒邮件：wangshuyan1381@dingtalk.com
			</div>
		</el-card>
	</div>
</template>
<style lang="less" scoped>
.info_title{
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding-bottom: 20px;
	border-bottom: 1px solid #E8E8E8;
	.title_txt{
		font-size: 16px;
		color: #333333;
		font-weight:500;
	}
	.edit_box{
		display: flex;
		align-items: center;
		.edit_icon{
			margin-right: 5px;
			width:14px;
			height:14px;
		}
		.edit_txt{
			font-size: 14px;
			color: #333333;
		}
	}
}
.info_row{
	display: flex;
	margin-top: 18px;
	font-size: 14px;
	color: #666666;
	.row_item{
		width: 50%;
		display: flex;
	}
}
.toast{
	color: #008DFF;
}
</style>
<script>
	export default{

	}
</script>