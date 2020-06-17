<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="平台订单号：">
					<el-input v-model="req.order_id" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="商户订单号：">
					<el-input v-model="req.sorder_sn" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="收款账户：">
					<el-input v-model="req.bank_card_no" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="收款户名：">
					<el-input v-model="req.name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="批次号：">
					<el-input v-model="req.batch_no" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="回单状态：">
					<el-select v-model="req.receipt_status" placeholder="不限" clearable>
						<el-option v-for="item in receipt_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			<el-form-item label="订单完成时间：">
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
			<el-table-column width="150" prop="shop_num" label="订单完成时间" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="批次号" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="平台订单号" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="商户订单号" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="回单名称" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="打款通道" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="用户收款金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="收款户名" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="收款账号" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="状态" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="downLoad">下载</el-button>
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
					sorder_sn:"",
					bank_card_no:"",
					name:"",
					batch_no:"",
					receipt_status:"",
					finished_time_start:"",
					finished_time_end:"",
				},				//请求参数
				receipt_list:[
				{
					id:"-1",
					name:"不限"
				},{
					id:"0",
					name:"待处理"
				},{
					id:"1",
					name:"已完成"
				}],
				date:[],	//订单创建时间
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
			//订单完成时间
			date:function(n){
				this.req.finished_time_start = n?n[0]:"";
				this.req.finished_time_end = n?n[1]:"";
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
					order_id:"",
					sorder_sn:"",
					bank_card_no:"",
					name:"",
					batch_no:"",
					receipt_status:"",
					finished_time_start:"",
					finished_time_end:"",
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
			//下载
			downLoad(){
				console.log("下载");
			}
			
		}
	}
</script>














v x  ]