<template>
	<div>
		<el-card>
			<div class="toast_box">
				<div>发票申请说明：有多个可申请开票的账单/流水时，请您合并申请开票！</div>
				<div>1. 每个商户每月小于20万元的发票申请只能申请一次，请尽量合并申请开票；</div>
				<div>2.大于等于20万元发票申请无限制，但不允许拆分成多张小于20万元的专用发票后申请开票。 </div>
				<div>3. 电子普通发票开具成功后可到申请记录页面、发票管理页面打开已开具的电子普通发票进行下载PDF。</div>
				<div>发票同步说明</div>
				<div>目前开具的发票信息数据同步到增值税发票选择确认平台需要1-3个工作日，如遇开出发票在增值税发票选择确认平台查询不到的情况，请耐心等待。</div>
			</div>
		</el-card>
		<el-card style="margin-top: 20px">
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="时间范围：">
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
			<el-button type="primary" size="small" @click="getList">搜索</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</el-form>
		<div class="apply_money">
			<div class="apply_left">
				<div class="title">本次开票金额</div>
				<div class="label">0.00</div>
			</div>
			<el-button type="primary" size="small" @click="apply">申请发票</el-button>
		</div>
		<el-table :data="dataObj.data" size="small" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}" @selection-change="handleSelectionChange">
			<el-table-column type="selection" align="center">
			</el-table-column>
			<el-table-column prop="bill_id" label="账单编号" align="center">
			</el-table-column>
			<el-table-column prop="type" label="账单类型" align="center">
			</el-table-column>
			<el-table-column prop="biil_money" label="账单金额（元）" align="center">
			</el-table-column>
			<el-table-column prop="bill_date" label="账单完成日期" align="center">
			</el-table-column>
			<el-table-column prop="biil_money" label="账单申请开票金额（元）" align="center">
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
.apply_money{
	margin-bottom: 24px;
	padding-left: 24px;
	border:1px solid #008DFF;
	width: 100%;
	height: 138px;
	display: flex;
	align-items: center;
	.apply_left{
		margin-right: 30px;
		.title{
			font-size: 18px;
			color:#333333;
		}
		.label{
			font-size: 26px;
			color:#333333;
			font-weight:500;
		}
	}
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
				},				//请求参数
				date:[],		//入账时间
				dataObj:{},	
				bill_ids:""
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		watch:{
			//入账时间
			date:function(n){
				this.req.start_time = n?n[0]:"";
				this.req.end_time = n?n[1]:"";
			}
		},
		methods:{
			//获取列表
			getList(){
				resource.billlist(this.req).then(res => {
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
			handleSelectionChange(v){
				if(v.length > 0){
					var arr = [];
					v.map(item => {
						arr.push(item.bill_id);
					})
					this.bill_ids = arr.join(",");
				}
			},
			//点击申请
			apply(){
				if(this.bill_ids == ''){
					this.$message.warning("请选择账单")
				}else{
					this.$router.push('/invoice_apply?bill_ids=' + this.bill_ids);
				}
				
			}
		}
	}
</script>



















