<template>
	<div>
		<el-form :inline="true" size="small" class="demo-form-inline">
			<el-form-item label="创建时间：">
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
		<el-form-item label="转账单号：">
			<el-input v-model="req.bill_id" placeholder="请输入"></el-input>
		</el-form-item>
	</el-form>
	<div class="but">
		<el-button type="primary" size="small" @click="getList">搜索</el-button>
		<el-button type="primary" size="small" @click="reset">重置</el-button>
	</div>
	<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
		<el-table-column prop="happen_time" label="创建时间" align="center">
		</el-table-column>
		<el-table-column prop="applicant" label="转账申请人" align="center">
		</el-table-column>
		<el-table-column prop="bill_id" label="转账单号" align="center">
		</el-table-column>
		<el-table-column prop="money" label="转账金额（元）" align="center">
		</el-table-column>
		<el-table-column prop="remark" label="备注" align="center">
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
</div>
</template>
<style lang="less" scoped>

</style>
<script>
	import resource from '../../../../api/resource.js'
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					created_time_start:"",
					created_time_end:"",
					bill_id:""
				},				//请求参数
				date:[],		//入账时间
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
				this.req.created_time_start = n && n.length> 0?n[0]:"";
				this.req.created_time_end = n && n.length> 0?n[1]:"";
			}
		},
		methods:{
			//获取列表
			getList(){
				resource.transFerrecord(this.req).then(res => {
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
					created_time_start:"",
					created_time_end:"",
					bill_id:""
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