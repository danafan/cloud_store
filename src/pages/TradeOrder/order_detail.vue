<template>
	<div>
		<el-card>
			<div class="title">订单详情</div>
			<div class="content">
				<div class="column">
					<div class="column_item">商户订单号：123123</div>
					<div class="column_item">批次号：123123</div>
					<div class="column_item">打款通道：123123</div>
					<div class="column_item">综合服务主体：123123</div>
				</div>
				<div class="column">
					<div class="column_item">订单状态：123123</div>
					<div class="column_item">订单创建时间：123123</div>
					<div class="column_item">打款凭证：123123</div>
				</div>
				<div class="column">
					<div class="column_item">平台订单号：123123</div>
					<div class="column_item">订单更新时间：123123</div>
					<div class="column_item">打款备注：123123</div>
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px">
			<div class="title">订单金额信息</div>
			<div class="content">
				<div class="column">
					<div class="column_item">商户打款金额（元）：123123</div>
				</div>
				<div class="column">
					<div class="column_item">用户实收金额（元）：123123</div>
				</div>
				<div class="column">
					<div class="column_item">商户服务费（元）：123123</div>
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px">
			<div class="title">收款账户信息</div>
			<div class="content">
				<div class="column">
					<div class="column_item">收款账户名：123123</div>
					<div class="column_item">证件号码：123123</div>
				</div>
				<div class="column">
					<div class="column_item">收款银行名称：123123</div>
					<div class="column_item">银行预留手机号：123123</div>
				</div>
				<div class="column">
					<div class="column_item">收款账号：123123</div>
				</div>
			</div>
		</el-card>
	</div>
</template>
<style lang="less" scoped>
.title{
	padding-bottom: 15px;
	width: 100%;
	border-bottom: 2px solid #F0F0F0;
	font-size: 16px;
	color: #333333;
	font-weight:500;
}
.content{
	display: flex;
	justify-content: space-between;
	font-size: 14px;
	color: #333333;
	.column{
		width: 30%;
		.column_item{
			margin-top: 15px;
		}
	}
}
</style>
<script>
	export default{
		
	}
</script>