<template>
	<div>
		<el-card>
			<div class="info_title">
				<div class="title_txt">基本信息</div>
			</div>
			<div class="info_row">
				<div class="row_item">企业名称：{{storeInfoObj.enterprise_name}}</div>
				<div class="row_item">营业执照注册号：{{storeInfoObj.business_license_sn}}</div>
			</div>
			<div class="info_row">
				<div class="row_item">商户名称：{{storeInfoObj.store_name}}</div>
				<div class="row_item">商户ID：{{storeInfoObj.store_sn}}</div>
			</div>
			<div class="info_row">
				<div class="row_item">
					<div>营业执照影印件</div>
					<img :src="storeInfoObj.business_license_img">
				</div>
				
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">联系信息</div>
			</div>
			<div class="info_row">
				<div class="row_item">联系人姓名：{{storeInfoObj.contacts_name}}</div>
				<div class="row_item">联系人手机号：{{storeInfoObj.contacts_phone}}</div>
			</div>
			<div class="info_row">
				<div class="row_item">联系人邮箱：{{storeInfoObj.contacts_email}}</div>
				<div class="row_item">联系地址：{{storeInfoObj.contacts_address}}</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">结算信息</div>
			</div>
			<div class="info_row">
				<div class="row_item">开户名称：{{storeInfoObj.enterprise_name}}</div>
				<div class="row_item">对公账号：{{storeInfoObj.open_bank_account}}</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">客户支持</div>
			</div>
			<div class="info_row">
				<div class="row_item">客户经理：{{storeInfoObj.account_manager_name}}</div>
				<div class="row_item">手机号：{{storeInfoObj.account_manager_phone}}</div>
			</div>
			<div class="info_row">
				邮箱：{{storeInfoObj.account_manager_email}}
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
				resource.storeInfo().then(res => {
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

























