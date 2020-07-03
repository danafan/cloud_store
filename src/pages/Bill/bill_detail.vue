<template>
	<div>
		<el-card>
			<div class="title">账户明细</div>
			<div class="content">
				<div class="column">
					<div class="column_item">账单金额（元）：123123</div>
					<div class="column_item">服务费金额（元）：123123</div>
				</div>
				<div class="column">
					<div class="column_item">打款金额（元）：123123</div>
					<div class="column_item">服务费抵扣金额（元）：123123</div>
				</div>
				<div class="column">
					<div class="column_item">退回金额：123123</div>
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px">
			<el-table :data="dataObj.order_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column width="150" prop="shop_num" label="平台订单号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="商户订单号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="创建订单时间" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="最后更新时间" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="收款账号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="收款户名" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="打款通道" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="打款凭证" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="打款请求金额（元）" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="交易类型" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="批次号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="身份证号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="银行预留手机号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="服务费应收金额（元）" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="服务费抵扣金额（元）" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="服务费实收金额（元）" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="实际应收金额（元）" align="center">
				</el-table-column>
				<el-table-column fixed="right" width="150" prop="shop_num" label="订单状态" align="center">
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="req.page"
				:pager-count="11"
				:page-sizes="[5, 10, 15, 20]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="dataObj.total"
				>
			</el-pagination>
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
		data(){
			return{
				req:{
					page:1,
					pagesize:10
				},
				dataObj:{
					order_list:[{
						shop_num:"哈哈哈"
					}],			//订单列表
					total:100
				},	
			}
		},
		methods:{
			//分页
			handleSizeChange(val) {
				this.req.pagesize = val;
				//获取列表
				this.getList();
			},
			handleCurrentChange(val) {
				this.req.page = val;
				//获取列表
				this.getList();
			},
		}
	}
</script>













