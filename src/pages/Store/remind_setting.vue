<template>
	<div>
		<el-card>
			<div class="info_title">
				<div class="title_txt">资金提醒设置</div>
			</div>
			<div class="info_row">
				充值到账提醒：{{storeInfoObj.recharge_notice_type == 0 ? '短信和邮件' : (storeInfoObj.recharge_notice_type == 1 ? '短信' : '邮件')}}
			</div>
			<div class="info_row">
				账户余额提醒：{{storeInfoObj.balance_notice_type == 0 ? '短信和邮件' : (storeInfoObj.recharge_notice_type == 1 ? '短信' : '邮件')}}   
			</div>
			<div class="info_row">
				银行卡余额提醒阈值(元)：{{storeInfoObj.bank_limit}}    
			</div>
			<div class="info_row">
				支付宝余额提醒阈值(元)：{{storeInfoObj.alipay_limt}}   
			</div>
			<div class="info_row">
				微信支付余额提醒阈值(元)：{{storeInfoObj.wx_limt}}
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">接收提醒设置</div>
			</div>
			<div class="info_row">
				充值到账提醒：{{storeInfoObj.recharge_notice_type_name}}
			</div>
			<div class="info_row">
				账户余额不足提醒：{{storeInfoObj.balance_notice_type_name}}
			</div>
			<div class="info_row">
				预警及提醒类邮件：{{storeInfoObj.warning_notice_email}}
			</div>
			<div class="info_row">
				账单类提醒邮件：{{storeInfoObj.bill_notice_email}}
			</div>
			<div class="info_row">
				报税信息类提醒邮件：{{storeInfoObj.tax_notice_email}}
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
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				storeInfoObj:{}
			}
		},
		created(){
			//获取信息
			this.storeInfo();
		},
		methods:{
			//获取信息
			storeInfo(){
				resource.storeRemind().then(res => {
					if(res.data.code == 1){
						this.storeInfoObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			}
		}

	}
</script>










