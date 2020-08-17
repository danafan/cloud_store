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
			<el-button type="primary" size="small" @click="getList">搜索</el-button>
			<el-button type="primary" size="small" @click="exportFile">导出</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
		<el-table :data="dataObj.data" size="small" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="150" prop="invoice_time" label="开票时间" align="center">
			</el-table-column>
			<el-table-column width="150" prop="invoice_type" label="开票类型" align="center">
			</el-table-column>
			<el-table-column width="150" prop="invoice_code" label="发票代码" align="center">
			</el-table-column>
			<el-table-column width="150" prop="invoice_date" label="所属月份" align="center">
			</el-table-column>
			<el-table-column width="150" label="货物或应税劳务、服务名称" align="center">
				<template slot-scope="scope">
					<div v-for="item in scope.row.child_invoice_json">{{item.itemName}}</div>
				</template>
			</el-table-column>
			<el-table-column width="150" label="金额（元）" align="center">
				<template slot-scope="scope">
					<div v-for="item in scope.row.child_invoice_json">{{item.itemAmount}}</div>
				</template>
			</el-table-column>
			<el-table-column width="150" label="税率" align="center">
				<template slot-scope="scope">
					<div v-for="item in scope.row.child_invoice_json">{{item.itemTaxRate}}</div>
				</template>
			</el-table-column>
			<el-table-column width="150" label="税额（元）" align="center">
				<template slot-scope="scope">
					<div v-for="item in scope.row.child_invoice_json">{{item.itemtaxAmount}}</div>
				</template>
			</el-table-column>
			<el-table-column width="150" label="价税合计（元）" align="center">
				<template slot-scope="scope">
					<div v-for="item in scope.row.child_invoice_json">{{item.totalMoney}}</div>
				</template>
			</el-table-column>
			<el-table-column width="150" label="购买方" align="center">
				<template slot-scope="scope">
					<div>名称：{{scope.row.enterprise_name}}</div>
					<div>纳税人识别号：{{scope.row.taxpayer_id}}</div>
					<div>地址和电话：{{scope.row.address_phone}}</div>
					<div>开户行及账号：{{scope.row.bank_info}}</div>
				</template>
			</el-table-column>
			<el-table-column width="150" prop="remark" label="发票备注" align="center">
			</el-table-column>
			<el-table-column width="150" label="操作人信息" align="center">
				<template slot-scope="scope">
					<div>收款人：{{scope.row.payee}}</div>
					<div>复核：{{scope.row.checker}}</div>
					<div>开票人：{{scope.row.clerk}}</div>
				</template>
			</el-table-column>
			<el-table-column width="150" prop="status_msg" label="作废标志" align="center">
			</el-table-column>
			<el-table-column width="150" label="邮寄地址" align="center">
				<template slot-scope="scope">
					<div>收件人姓名：{{scope.row.recieve_user}}</div>
					<div>联系电话：{{scope.row.recieve_phone}}</div>
					<div>详细地址：{{scope.row.recieve_address}}</div>
				</template>
			</el-table-column>
			<el-table-column width="150" prop="apply_id" label="发票申请编号" align="center">
			</el-table-column>
			<el-table-column fixed="right" width="150" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="detail(scope.row.picture_url)">查看</el-button>
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
<el-dialog :visible.sync="isDetail">
	<el-carousel :interval="5000" arrow="always">
		<el-carousel-item v-for="item in pic_list" :key="item">
			<img :src="item">
		</el-carousel-item>
	</el-carousel>
</el-dialog>
</div>
</template>
<style lang="less" scoped>

</style>
<script>
	import resource from '../../api/resource.js'
	import exportFile from '../../api/export.js'
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
				dataObj:{},	
				isDetail:false,	
				pic_list:[]
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		watch:{
			//入账时间
			date:function(n){
				this.req.start_time = n && n.length> 0?n[0]:"";
				this.req.end_time = n && n.length> 0?n[1]:"";
			}
		},
		methods:{
			//获取列表
			getList(){
				resource.invoiceList(this.req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//导出
			exportFile(){
				var arr = [];
				for(var item in this.req){
					let str = item + '=' + this.req[item];
					arr.push(str);
				};
				exportFile.exportUp(`invoice/invoicelistexport?${arr.join('&')}`)
			},
			//重置
			reset(){
				this.date = [];
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
			detail(picture_url){
				this.pic_list.push(picture_url);
				this.isDetail = true;
			}
		}
	}
</script>














v x  ]