<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="平台订单号：">
					<el-input v-model="req.order_id" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="收款户名：">
					<el-input v-model="req.name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="订单创建时间：">
					<el-date-picker
					v-model="order_create_date"
					type="datetimerange"
					value-format="yyyy-MM-dd HH:mm:ss"
					range-separator="至"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					:default-time="['00:00:00', '23:59:59']">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="最后更新时间：">
				<el-date-picker
				v-model="update_date"
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
			<el-table-column width="150" fixed prop="shop_num" label="订单创建时间" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="最后更改时间" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="批次号" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="平台订单号" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="商户打款金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="商户实收服务费（元）" align="center">
			</el-table-column>
			<!-- <el-table-column width="150" prop="shop_num" label="已抵扣服务费（元）" align="center">
			</el-table-column> -->
			<el-table-column width="150" prop="shop_num" label="打款通道" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="收款银行名称" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="商户订单号" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="收款姓名" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="证件号码" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="收款账号" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="银行预留手机号" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="综合服务主体" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="打款凭证" align="center">
			</el-table-column>
			<!-- <el-table-column width="150" prop="shop_num" label="已退商户服务费（元）" align="center">
			</el-table-column> -->
			<el-table-column width="150" prop="shop_num" label="打款备注" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="订单完成时间" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="订单状态" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="orderDetail">取消打款</el-button>
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

</style>
<script>
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					order_id:"",
					name:"",
					created_time_start:"",
					created_time_end:"",	
					updated_time_start:"",
					updated_time_end:"",
				},				//请求参数
				order_create_date:[],	//订单创建时间
				update_date:[],			//最后更新时间
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
			//订单创建时间
			order_create_date:function(n){
				this.req.created_time_start = n?n[0]:"";
				this.req.created_time_end = n?n[1]:"";
			},
			//最后更新时间
			update_date:function(n){
				this.req.updated_time_start = n?n[0]:"";
				this.req.updated_time_end = n?n[1]:"";
			},
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
					order_id:"",
					name:"",
					created_time_start:"",
					created_time_end:"",	
					updated_time_start:"",
					updated_time_end:"",
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
			//订单详情
			orderDetail(){
				this.$router.push('/order_detail');
			}
		}
	}
</script>














v x  ]