<template>
	<div>
		<el-card>
			<div class="info_title">
				<div class="title_txt">限额信息</div>
			</div>
			<div class="toast_box">
				<div>温馨提示：1. 商户未启用IP白名单，您从任意IP都可以调用账户综合服务平台</div>
				<div>2. 如果您是使用固定IP访问账户综合服务平台，可以开启白名单进一步提升安全性。 注意：任何新增、删除、编辑操作，请务必在技术负责人协助下进行，以免影响业务的正常进行。</div>
			</div>
			<div class="info_row">
				商户平台ID（dealer_id）：1111112
			</div>
			<div class="info_row">
				综合服务主体（broker_id）：1111111 IP
			</div>
			<div class="info_row">
				商户平台ID（dealer_id）：1111112            
			</div>
			<div class="info_row">
				IP 白名单
			</div>
			<div class="info_row">
				App Key：1187**********11111111111111111111o  
				<div class="toast">查看</div>
			</div>
			<div class="info_row">
				3DES Key：1111**********22222222222     
				<div class="toast">查看</div>             
			</div>
			<div class="info_row">
				订单状态回调地址：-/-
			</div>
			<div class="info_row">
				更新时间：2020-03-25 16:11:27
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
.toast_box{
	margin-bottom:24px;
	padding: 8px 30px;
	border:1px solid #008DFF;
	background:rgba(238,248,255,1);
	width: 738px;
	font-size: 14px;
	color: #666666;
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
	margin-left: 20px;
	color: #008DFF;
}
</style>
<script>
	export default{

	}
</script>