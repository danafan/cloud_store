<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="发票代码号码：">
					<el-input v-model="req.invoice_code" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="发票申请编码：">
					<el-input v-model="req.apply_id" placeholder="请输入"></el-input>
				</el-form-item>
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
		</el-form>
		<div class="but">
			<el-button type="primary" size="small" @click="search">搜索</el-button>
			<el-button type="primary" size="small" @click="exportFile">导出</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
		<el-table :data="dataObj.order_list" size="small" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="150" prop="shop_num" label="开票时间" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="开票类型" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="发票代码" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="所属月份" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="货物或应税劳务、服务名称" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="金额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="税率" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="税额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="价税合计（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="购买方" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="发票备注" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="操作人信息" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="作废标志" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="邮寄地址" align="center">
			</el-table-column>
			<el-table-column width="150" prop="shop_num" label="发票申请编号" align="center">
			</el-table-column>
			<el-table-column fixed="right" width="150" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="detail">查看</el-button>
					<el-button type="text" size="small" @click="download">下载</el-button>
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
					start_time:"",
					end_time:"",
					invoice_code:"",
					apply_id:""
				},				//请求参数
				date:[],		//入账时间
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
					start_time:"",
					end_time:"",
					invoice_code:"",
					apply_id:""
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
			//查看
			detail(){

			},
			//下载
			download(){
				
			}
		}
	}
</script>














v x  ]