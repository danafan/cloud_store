<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="批次号：">
					<el-input v-model="req.batch_no" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="订单状态：">
					<el-select v-model="req.order_status" placeholder="不限" clearable>
						<el-option v-for="item in order_status" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="打款通道：">
					<el-select v-model="req.pay_method" placeholder="不限" clearable>
						<el-option v-for="item in channel_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
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
		</el-form>
		<div class="but">
			<el-button type="primary" size="small" @click="search">搜索</el-button>
			<el-button type="primary" size="small" @click="exportFile">导出</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
		<el-table :data="dataObj.order_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="150" fixed prop="shop_num" label="订单创建时间" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="批次号" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="打款通道" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="打款记录（条）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="商户打款金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="创建人" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="订单状态" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="setting">详情</el-button>
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
					batch_no:"",
					order_status:"",
					pay_method:"",
					created_time_start:"",
					created_time_end:"",	
				},				//请求参数
				channel_list:[
				{
					id:"0",
					name:"不限"
				},{
					id:"1",
					name:"支付宝"
				},{
					id:"2",
					name:"微信"
				},{
					id:"3",
					name:"银行卡"
				}
				],					//打款通道
				order_status:[{
					id:"0",
					name:"不限"
				},{
					id:"1",
					name:"已受理"
				},{
					id:"2",
					name:"打款失败"
				},{
					id:"3",
					name:"订单挂起"
				},{
					id:"4",
					name:"待打款"
				},{
					id:"5",
					name:"打款中"
				},{
					id:"6",
					name:"已打款"
				},{
					id:"7",
					name:"批次取消"
				},{
					id:"8",
					name:"订单取消"
				}],					//订单状态
				order_create_date:[],	//订单创建时间
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
					batch_no:"",
					order_status:"",
					pay_method:"",
					created_time_start:"",
					created_time_end:"",	
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
			//操作
			setting(){
				this.$router.push("/money_detail");
			}
		}
	}
</script>














v x  ]