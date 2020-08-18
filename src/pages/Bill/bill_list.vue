<template>
	<div>
		<el-card>
			<div class="toast_box">
				<div>温馨提示：因订单存在退汇情况，未出账单的金额和明细需要校准处理。实际金额和明细，以“待开发票”的账单为准</div>
				<div>1. 余额日账单状态将于 T+1 日后更新，更新后账单将由“未出账单”状态更新为“待开发票”状态。如果存在潜在的退汇订单，则账单会推迟 数日更新，具体时间由银行退汇时间确定。</div>
				<div>2. 账单金额 = 打款金额 - 退款金额 + 服务费金额 - 服务费抵扣金额。</div>
			</div>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="账单日期：">
					<el-date-picker
					v-model="date"
					type="datetimerange"
					value-format="yyyy-MM-dd HH:mm:ss"
					range-separator="至"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					:default-time="['00:00:00', '23:59:59']">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="账单状态：">
				<el-select v-model="req.type" placeholder="不限" clearable>
					<el-option v-for="item in bill_status_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="开票状态：">
				<el-select v-model="req.bill_status" placeholder="不限" clearable>
					<el-option v-for="item in invoice_status_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div class="but">
			<el-button type="primary" size="small" @click="getList">搜索</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="180" prop="bill_id" label="账单编号" align="center">
			</el-table-column>
			<el-table-column width="180" prop="add_time" label="账单日期" align="center">
			</el-table-column>
			<el-table-column width="150" prop="biil_money" label="账单金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="total_pay_money" label="打款金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="user_return_money" label="退款金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="total_service_money" label="服务费金额（元）" align="center">
			</el-table-column>
			<el-table-column width="180" prop="deduction_service_money" label="服务费抵扣金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="service_subject_name" label="综合服务主体" align="center">
			</el-table-column>
			<el-table-column width="150" label="账单状态" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.bill_status == '1'?'未出账单':'已出账单'}}</span>
				</template>
			</el-table-column>
			<el-table-column width="180" fixed="right" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="detail(scope.row.bill_id)">详情</el-button>
					<el-button type="text" size="small" @click="downDetail(scope.row.bill_id)">下载明细</el-button>
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
.toast_box{
	margin-bottom:24px;
	padding: 8px 30px;
	border:1px solid #008DFF;
	background:rgba(238,248,255,1);
	width: 738px;
	font-size: 14px;
	color: #666666;
}
</style>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					start_time:"",
					end_time:"",
					type:"1",
					bill_status:"1"
				},				//请求参数
				bill_status_list:[
				{
					id:"0",
					name:"不可开发票"
				},{
					id:"1",
					name:"可开发票"
				}],					//状态
				invoice_status_list:[{
					id:"1",
					name:"未出账单"
				},{
					id:"2",
					name:"已出账单"
				}],					//订单状态
				date:[],	//订单创建时间
				dataObj:{},	
				
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		watch:{
			//订单创建时间
			date:function(n){
				this.req.start_time = n && n.length> 0?n[0]:"";
				this.req.end_time = n && n.length> 0?n[1]:"";
			}
		},
		methods:{
			//获取列表
			getList(){
				resource.daybillIndex(this.req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//重置
			reset(){
				this.date = [];
				this.req = {
					page:1,
					pagesize:10,
					start_time:"",
					end_time:"",
					type:"1",
					bill_status:"1"
				}
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
			//详情
			detail(id){
				this.$router.push("/bill_detail?id=" + id);
			}
		}
	}
</script>














v x  ]