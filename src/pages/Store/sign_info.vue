<template>
	<div>
		<el-card>
			<div class="info_title">
				<div class="title_txt">基本信息</div>
			</div>
			<div class="info_row">
				<div class="row_item">企业名称：xxx公司</div>
				<div class="row_item">综合服务主体：xxxxxx</div>
			</div>
			<div class="info_row">
				<div class="row_item">服务状态：服务中</div>
				<div class="row_item">c端签约模式：微信签约</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">计费模式</div>
			</div>
			<div class="info_row">
				商户服务费率：7.1%
			</div>
			<div class="info_row toast">
				说明：每当用户产生一笔打款时，将按照（打款金额*打款管理费费率的方式计算管理费）
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">限额信息</div>
			</div>
			<div class="info_row">
				全网单人月累计金额限制(元)：98,475.00
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">合同信息</div>
			</div>
			<div class="info_row">
				<div class="row_item">合同编号：asdkajd</div>
				<div class="row_item">合同名称：xxxxx</div>
			</div>
			<div class="info_row">
				合同有效期：2010-07-26 ~ 2033-03-18
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