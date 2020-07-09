<template>
	<div>
		<el-card>
			<div class="toast_box">
				<div>温馨提示：您的发票申请，我公司会在5个工作日内受理并邮寄至贵公司。</div>
				<div>您的错误重开申请，我公司收到您寄出的发票后在5个工作日内受理并邮寄至贵公司。</div>
			</div>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="发票申请编号：">
					<el-input v-model="req.apply_id" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="申请时间：">
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
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="150" prop="apply_id" label="发票申请编号" align="center">
			</el-table-column>
			<el-table-column width="150" prop="invoice_num" label="已申请发票（张）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="total_price_tax" label="价税合计总额（元）" align="center">
			</el-table-column>
			<el-table-column width="150" prop="add_time" label="发票申请时间" align="center">
			</el-table-column>
			<el-table-column width="150" prop="status" label="状态" align="center">
			</el-table-column>
			<el-table-column width="150" prop="drawer" label="发票抬头" align="center">
			</el-table-column>
			<el-table-column width="150" prop="invoice_title" label="开票方" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="applyDetail(scope.row.apply_id)">查看</el-button>
					<el-button type="text" size="small" @click="downDetail(scope.row.apply_id)" v-if="scope.row.is_confirmation_letter == 1">结算确认函</el-button>
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
<!-- 查看 -->
<el-dialog :visible.sync="isDetail">
	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="开票申请" name="apply_detail">
			<div class="apply_item">
				<div class="apply_item_title">发票详情（已申请结算确认函）<span>已寄出</span></div>
				<div class="apply_item_content">
					<div class="content_item">发票申请编号：{{apply_info.apply_id}}</div>
					<div class="content_item">待申请发票（张）：{{apply_info.invoice_num}}</div>
					<div class="content_item">价税合计总额（元）：{{apply_info.total_price_tax}}</div>
				</div>
			</div>
			<div class="apply_item">
				<div class="apply_item_title">商户信息</div>
				<div class="apply_item_content">
					<div class="content_item">商户别名：{{store_info.store_name}}</div>
					<div class="content_item">纳税人类型：{{store_info.taxpayer_type_name}}</div>
				</div>
			</div>
			<div class="apply_item">
				<div class="apply_item_title">邮寄地址</div>
				<div class="hy">
					<div class="content_item">收件人姓名：{{store_info.recieve_user}}</div>
					<div class="content_item">收件人电话：{{store_info.recieve_phone}}</div>
					<div class="content_item">收件人地址：{{store_info.recieve_address}}</div>
				</div>
			</div>
			<div class="apply_item">
				<div class="apply_item_title">开票说明</div>
				<div class="hy">
					<div class="content_item">{{apply_info.remarks}}</div>
				</div>
			</div>
		</el-tab-pane>
		<el-tab-pane label="账单" name="bill">
			<div>
				<div class="bill_title">
					申请开票总金额：¥2000000
				</div>
				<el-table :data="bill_list" size="small" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
					<el-table-column prop="bill_id" label="账单编号" align="center">
					</el-table-column>
					<el-table-column prop="type" label="账单类型" align="center">
					</el-table-column>
					<el-table-column prop="biil_money" label="金额（元）" align="center">
					</el-table-column>
					<el-table-column prop="bill_date" label="日期" align="center">
					</el-table-column>
					<el-table-column prop="biil_money" label="申请开票金额（元）" align="center">
					</el-table-column>
				</el-table>
			</div>
		</el-tab-pane>
		<el-tab-pane label="发票预览" name="invoice_show">
			<el-carousel :interval="5000" arrow="always">
				<el-carousel-item v-for="item in pic_list" :key="item">
					<img :src="item">
				</el-carousel-item>
			</el-carousel>
			<div class="bottom_buts">
				<el-button size="small" type="primary">上一步</el-button>
				<el-button size="small" type="primary">确认提交</el-button>
			</div>
		</el-tab-pane>
	</el-tabs>
</el-dialog>

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
.apply_item{
	margin-bottom: 16px;
	border:1px solid rgba(240,240,240,1);
	width: 100%;
	.apply_item_title{
		border-bottom:1px solid rgba(240,240,240,1);
		width: 100%;
		height: 46px;
		display: flex;
		align-items: center;
		padding-left: 24px;
		background: #F0F0F0;
		font-size: 14px;
		color: #333333;
		font-weight:500;
		span{
			color: #008DFF;
		}
	}
	.apply_item_content{
		display: flex;
		justify-content: space-around;
	}
	.hy{
		padding-left: 24px;
	}
	.content_item{
		height: 46px;
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #666666;
	}
}
.bill_title{
	margin-bottom: 15px;
	font-size: 14px;
	color: #333333;
	font-weight:500;
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 18px;
	opacity: 0.75;
	line-height: 300px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
	background-color: #d3dce6;
}
.bottom_buts{
	margin-top: 20px;
	width: 100%;
	display: flex;
	justify-content: flex-end;
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
					apply_id:""
				},				//请求参数
				date:[],	//订单创建时间
				dataObj:{},	
				isDetail:false,		//默认详情不显示
				apply_info:{},
				store_info:{},
				bill_list:[],
				pic_list:[],
				activeName:"apply_detail",
				bill_type:"1",			//1:充值，2:打款
				bill_apply:[{
					shop_num:"哈哈哈"
				}],					//充值账单
				bill_da:[{
					shop_num:"哈哈哈"
				}],					//充值账单
				
			}
		},
		created(){
			//获取列表
			this.applyList();
		},
		watch:{
			//订单创建时间
			date:function(n){
				this.req.start_time = n?n[0]:"";
				this.req.end_time = n?n[1]:"";
			}
		},
		methods:{
			//获取列表
			applyList(){
				resource.applyList(this.req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取详情
			applyDetail(id){
				resource.applyDetail({apply_id:id}).then(res => {
					if(res.data.code == 1){
						this.isDetail = true;
						this.apply_info = res.data.data.apply_info;
						this.store_info = res.data.data.store_info;
						this.bill_list = res.data.data.bill_list;
						this.pic_list = res.data.data.pic_list;
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
				this.date = [];
				this.req = {
					page:1,
					pagesize:10,
					start_time:"",
					end_time:"",
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
			//结算确认函
			downDetail(id){
				resource.invoiceConfirm({apply_id:id}).then(res => {
					if(res.data.code == 1){
						
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换详情弹框导航
			handleClick(tab) {
				console.log(tab);
			}
		}
	}
</script>














v x  ]