<template>
	<div>
		<el-card>
			<div class="yue_info">
				<div class="info_item">
					<div class="info_item_title">服务费抵扣账户</div>
					<div class="info_row">
						<div class="row_item">
							<div class="row_item_label">可用余额（元）</div>
							<div class="row_item_val">0.00</div>
						</div>
						<div class="row_item">
							<div class="row_item_label">不可用余额（元）</div>
							<div class="row_item_val">0.00</div>
						</div>
					</div>
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 20px">
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
			<el-form-item label="交易类型：">
				<el-select v-model="req.trading_type" placeholder="不限" clearable>
					<el-option v-for="item in trading_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="收支类型">
				<el-select v-model="req.payments" placeholder="不限" clearable>
					<el-option v-for="item in payments_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div class="but">
			<el-button type="primary" size="small" @click="search">搜索</el-button>
			<el-button type="primary" size="small" @click="exportFile">导出</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
		<el-table :data="dataObj.order_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column prop="shop_num" label="入账时间" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="综合服务主体" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="流水号" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="交易类型" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="收支类型" align="center">
			</el-table-column>
			<el-table-column prop="shop_num" label="入账金额" align="center">
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
.yue_info{
	width: 100%;
	display: flex;
	justify-content: space-between;
	.info_item{
		width: 45%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.info_item_title{
			font-size: 18px;
			color: #333333;
		}
		.info_row{
			margin-top: 20px;
			width: 100%;
			display: flex;
			justify-content: space-around;
			.row_item{
				display: flex;
				flex-direction: column;
				align-items: center;
				.row_item_label{
					font-size: 16px;
					color: #666666;
				}
				.row_item_val{
					font-size: 26px;
					color: #333333;
				}
			}
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
					pagesize:10,
					created_time_start:"",
					created_time_end:"",
					trading_type:"0",
					payments:"0"
				},				//请求参数
				date:[],		//入账时间
				trading_list:[{
					id:"0",
					name:"不限"
				},{
					id:"1",
					name:"阶梯返点"
				},{
					id:"2",
					name:"额外返点"
				},{
					id:"3",
					name:"账单抵扣"
				},{
					id:"4",
					name:"实时抵扣"
				}],	//充值类型
				payments_list:[{
					id:"0",
					name:"不限"
				},{
					id:"1",
					name:"收入"
				},{
					id:"2",
					name:"支出"
				}],	//资金用途
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
			//入账时间
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
					created_time_start:"",
					created_time_end:"",
					trading_type:"0",
					payments:"0"
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