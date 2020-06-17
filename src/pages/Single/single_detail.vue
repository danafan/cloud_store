<template>
	<div>
		<el-card>
			<div class="card_title">风险订单</div>
			<div class="card_content">
				<el-table :data="dataObj.order_list" size="small" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
					<el-table-column width="150" prop="shop_num" label="收款户名" align="center">
					</el-table-column>
					<el-table-column width="150" prop="shop_num" label="创建订单时间" align="center">
					</el-table-column>
					<el-table-column width="150" prop="shop_num" label="平台订单号" align="center">
					</el-table-column>
					<el-table-column width="150" prop="shop_num" label="打款金额（元）" align="center">
					</el-table-column>
					<el-table-column width="150" prop="shop_num" label="打款通道" align="center">
					</el-table-column>
					<el-table-column width="150" prop="shop_num" label="收款账号" align="center">
					</el-table-column>
					<el-table-column width="150" prop="shop_num" label="证件号码" align="center">
					</el-table-column>
					<el-table-column width="150" prop="shop_num" label="银行预留手机号" align="center">
					</el-table-column>
					<el-table-column width="150" prop="shop_num" label="打款备注" align="center">
					</el-table-column>
					<el-table-column width="150" prop="shop_num" label="订单状态" align="center">
					</el-table-column>
				</el-table>
			</div>
		</el-card>
		<el-card style="margin-top: 24px">
			<div class="card_title">调单信息</div>
			<div class="card_content">
				<div>风险点：收款人疑似企业（含关联企业）董监高或内部员工</div>
				<div>调单说明：请确认该挂单人是否为董监高或内部员工，如是可点击放弃反馈，反之，可提供董监高或内部员工中小王的证件号</div>
				<div>反馈截止时间：2020-06-01 23:59:59</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px">
			<div class="card_title">反馈信息</div>
			<div class="card_content">
				<div>反馈时间：2020-06-01 23:59:59</div>
				<div>反馈说明：承诺函</div>
				<div class="file">反馈材料：
					<img src="../../assets/pink_¥.png">
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px">
			<div class="card_title">调单结论</div>
			<div class="card_content">
				<div>审核时间：2020-06-01 23:59:59</div>
				<div>审核结论：风险排除</div>
				<div>审核结论说明：</div>
			</div>
		</el-card>
	</div>
</template>
<style lang="less" scoped>
.card_title{
	font-size: 16px;
	color: #333333;
	font-weight:500;
	border-bottom: 1px solid #E8E8E8;
	padding-bottom: 16px;
}
.card_content{
	padding-top: 24px;
	font-size: 14px;
	color: #666666;
	line-height: 30px;
	.file{
		display: flex;
		img{
			border:1px solid red;
			width: 120px;
			height: 120px;
		}
	}
}
</style>
<script>
	export default{
		data(){
			return{
				dataObj:{
					order_list:[{
						shop_num:"哈哈哈"
					}],			
				},
			}
		}
	}
</script>








