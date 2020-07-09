<template>
	<div>
		<el-card>
			<div class="title">账户明细</div>
			<div class="content">
				<div class="column">
					<div class="column_item">账单金额（元）：{{topDetail.biil_money}}</div>
					<div class="column_item">服务费金额（元）：{{topDetail.total_service_money}}</div>
				</div>
				<div class="column">
					<div class="column_item">打款金额（元）：{{topDetail.total_pay_money}}</div>
					<div class="column_item">服务费抵扣金额（元）：{{topDetail.deduction_service_money}}</div>
				</div>
				<div class="column">
					<div class="column_item">退回金额：{{topDetail.user_return_money}}</div>
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px">
			<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column width="150" prop="order_id" label="平台订单号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="sorder_sn" label="商户订单号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="created_time" label="创建订单时间" align="center">
				</el-table-column>
				<el-table-column width="150" prop="updated_time" label="最后更新时间" align="center">
				</el-table-column>
				<el-table-column width="150" prop="bank_card_no" label="收款账号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="name" label="收款户名" align="center">
				</el-table-column>
				<el-table-column width="150" label="打款通道" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.pay_method | payMethod}}</span>
					</template>
				</el-table-column>
				<el-table-column width="150" prop="pay_voucher" label="打款凭证" align="center">
				</el-table-column>
				<el-table-column width="150" prop="pay_money" label="打款请求金额（元）" align="center">
				</el-table-column>
				<el-table-column width="150" label="交易类型" align="center">
					<template slot-scope="scope"><span>批量打款</span></template>
				</el-table-column>
				<el-table-column width="150" prop="batch_id" label="批次号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="id_card_no" label="身份证号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="bank_phone" label="银行预留手机号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="service_charge" label="服务费应收金额（元）" align="center">
				</el-table-column>
				<el-table-column width="150" prop="deduction_service_charge" label="服务费抵扣金额（元）" align="center">
				</el-table-column>
				<el-table-column width="150" prop="receive_service_money" label="服务费实收金额（元）" align="center">
				</el-table-column>
				<el-table-column width="150" prop="receive_money" label="实际应收金额（元）" align="center">
				</el-table-column>
				<el-table-column fixed="right" width="150" label="订单状态" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.order_status1 | orderStatus}}</span>
					</template>
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
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				bill_id:"",
				req:{
					page:1,
					pagesize:10
				},
				topDetail:{},
				dataObj:{},	
			}
		},
		created(){
			this.bill_id = this.$route.query.id;
			//获取详情（顶部）
			this.getDetail();
			//获取详情（列表）
			this.getList();
		},
		methods:{
			//获取详情（顶部）
			getDetail(){
				resource.getBillInfo({bill_id:this.bill_id}).then(res => {
					if(res.data.code == 1){
						this.topDetail = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取详情
			getList(){
				resource.billOrderList({bill_id:this.bill_id}).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
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
		},
		filters:{
			payMethod:function(v){
				switch(v){
					case 1:
					return '银行卡'
					case 2:
					return '支付宝'
				}
			},
			orderStatus:function(v){
				switch(v){
					case 1:
					return '平台已受理'
					case 2:
					return '打款失败'
					case 3:
					return '订单挂起'
					case 4:
					return '待打款'
					case 5:
					return '打款中'
					case 6:
					return '已打款'
					case 7:
					return '批次取消'
					case 8:
					return '订单取消'
				}
			},
		}
	}
</script>













