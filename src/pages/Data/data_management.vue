<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="时间：">
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
	</el-form>
	<div class="but">
		<el-button type="primary" size="small" @click="search">搜索</el-button>
		<el-button type="primary" size="small" @click="exportFile">导出</el-button>
		<el-button type="primary" size="small" @click="reset">重置</el-button>
	</div>
	<el-table :data="dataObj.order_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="150" fixed prop="shop_num" label="日期" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="公司名称" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="成功订单总金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="银行卡成功订单金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="支付宝成功订单金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="用户成功收款总金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="银行卡用户成功收款金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="支付宝用户成功收款金额" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="部分退款订单用户实收金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="成功打款笔数" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="银行卡成功打款笔数" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="支付宝成功打款笔数" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="失败订单笔数" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="失败订单金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="充值总笔数" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="充值总金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="实收成功订单商户服务费金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="退款订单商户服务费金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="服务费返点使用总额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="商户ID" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="C端签约" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="客户经理" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="技术对接" align="center">
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
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					start_time:"",
					end_time:"",	
				},				//请求参数
				date:[],	//时间
				dataObj:{
					order_list:[{
						shop_num:"哈哈哈"
					}],			//订单列表
					total:100
				},	
				
			}
		},
		created(){
			
		},
		watch:{
			//时间
			date:function(n){
				this.req.created_time_start = n?n[0]:"";
				this.req.created_time_end = n?n[1]:"";
			}
		},
		methods:{
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
			}
		}
	}
</script>














v x  ]