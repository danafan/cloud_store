<template>
	<div>
		<el-card>
			<div class="info_title">
				<div class="title_txt">基本信息</div>
			</div>
			<div class="info_row">
				<div class="row_item">企业名称：xxx公司</div>
				<div class="row_item">营业执照注册号：12364721634</div>
			</div>
			<div class="info_row">
				<div class="row_item">商户名称：等哈到家</div>
				<div class="row_item">商户ID：123123</div>
			</div>
			<div class="info_row">
				<div class="row_item">
					<div>反馈材料</div>
					<img src="../../assets/pink_¥.png">
				</div>
				
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">联系信息</div>
			</div>
			<div class="info_row">
				<div class="row_item">联系人姓名：小王</div>
				<div class="row_item">联系人手机号：12364721634</div>
			</div>
			<div class="info_row">
				<div class="row_item">联系人邮箱：1231312@qq.com</div>
				<div class="row_item">联系地址：撒打算</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">结算信息</div>
			</div>
			<div class="info_row">
				<div class="row_item">开户名称：撒大咖有限公司</div>
				<div class="row_item">对公账号：12364721634</div>
			</div>
			<div class="info_row">
				开户银行：卡上打卡机的哈快结束的支行
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">客户支持</div>
			</div>
			<div class="info_row">
				<div class="row_item">客户经理：小王</div>
				<div class="row_item">手机号：12364721634</div>
			</div>
			<div class="info_row">
				邮箱：2312313
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
</style>
<script>
	export default{

	}
</script>