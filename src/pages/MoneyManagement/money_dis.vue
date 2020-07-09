<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="入账时间：">
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
			<el-form-item label="资金流水号：">
				<el-input v-model="req.bill_id" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="商户订单号：">
				<el-input v-model="req.sorder_sn" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="业务类型：">
				<el-select v-model="req.business_type" placeholder="不限" clearable>
					<el-option v-for="item in top_up_type" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="收支类型：">
				<el-select v-model="req.io_type" placeholder="不限" clearable>
					<el-option v-for="item in money_use_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div class="but">
			<el-button type="primary" size="small" @click="search">搜索</el-button>
			<el-button type="primary" size="small" @click="exportFile">导出</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column prop="finished_time" label="入账时间" align="center">
			</el-table-column>
			<el-table-column prop="store_id" label="商户ID" align="center">
			</el-table-column>
			<el-table-column prop="service_subject_name" label="综合服务主体" align="center">
			</el-table-column>
			<el-table-column prop="order_id" label="平台订单号" align="center">
			</el-table-column>
			<el-table-column prop="sorder_sn" label="商户订单号" align="center">
			</el-table-column>
			<el-table-column prop="bill_id" label="资金流水号" align="center">
			</el-table-column>
			<el-table-column prop="business_type1" label="业务类型" align="center">
			</el-table-column>
			<el-table-column prop="business_type2" label="业务子类" align="center">
			</el-table-column>
			<el-table-column prop="io_type" label="收支类型" align="center">
			</el-table-column>
			<el-table-column prop="money" label="入账金额（元）" align="center">
			</el-table-column>
			<el-table-column prop="balance" label="账户余额（元）" align="center">
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

</style>
<script>
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					finished_time_start:"",
					finished_time_start:"",
					bill_id:"",
					sorder_sn:"",
					business_type:"0",
					io_type:"0"
				},				//请求参数
				date:[],		//入账时间
				top_up_type:[{
					id:"0",
					name:"不限"
				},{
					id:"1",
					name:"充值"
				},{
					id:"2",
					name:"提现"
				},{
					id:"3",
					name:"打款"
				},{
					id:"4",
					name:"系统返点"
				},{
					id:"5",
					name:"转账"
				},{
					id:"6",
					name:"提现取消"
				},{
					id:"7",
					name:"打款退款"
				}],	//充值类型
				money_use_list:[{
					id:"0",
					name:"不限"
				},{
					id:"1",
					name:"收入"
				},{
					id:"2",
					name:"支出"
				}],	//资金用途
				dataObj:{},	
				
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		watch:{
			//入账时间
			date:function(n){
				this.req.finished_time_start = n?n[0]:"";
					finished_time_start:"",
				this.req.finished_time_end = n?n[1]:"";
			}
		},
		methods:{
			//获取列表
			getList(){
				resource.accountChange(this.req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//搜索
			search(){
				console.log(this.req);
			},
			//导出
			exportFile(){
				console.log(this.req);
			},
			//重置
			reset(){
				this.req = {
					page:1,
					pagesize:10,
					finished_time_start:"",
					finished_time_end:"",
					bill_id:"",
					sorder_sn:"",
					business_type:"0",
					io_type:"0"
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
			}
		}
	}
</script>














v x  ]