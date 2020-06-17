<template>
	<div>
		<el-card>
			<div class="lock_box">
				<div class="lock_title">
					<div class="batch_num">批次号：18273618</div>
				</div>
				<div class="lock_content">
					<div class="lock_item">
						<div class="itme_title">成功订单</div>
						<div class="contents">
							<div class="conttent_item">
								<div>笔数（笔）</div>
								<div>0.00</div>
							</div>
							<div class="conttent_item">
								<div>金额（元）</div>
								<div>0.00</div>
							</div>
							<div class="conttent_item">
								<div>服务费（元）</div>
								<div>0.00</div>
							</div>
						</div>
					</div>
					<div class="line"></div>
					<div class="lock_item chang">
						<div class="itme_title">预计付款金额</div>
						<div class="contents">
							<div class="conttent_item">
								<div>笔数（笔）</div>
								<div>0.00</div>
							</div>
							<div class="conttent_item">
								<div>金额（元）</div>
								<div>0.00</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="姓名：">
					<el-input v-model="req.name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="手机号：">
					<el-input v-model="req.phone" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="证件号：">
					<el-input v-model="req.id_card_no" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="订单状态：">
					<el-select v-model="req.order_status" placeholder="不限" clearable>
						<el-option v-for="item in order_status" :key="item.id" :label="item.name" :value="item.id">
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
						<el-button type="text" size="small" @click="setting">取消打款</el-button>
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
.lock_box{
	border: 1px solid #008DFF;
	margin-bottom: 30px;
	.lock_title{
		width: 100%;
		height: 46px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 20px;
		padding-left: 20px;
		.batch_num{
			font-size: 14px;
			color: #333333;
		}
	}
	.lock_content{
		border-top: 1px solid #008DFF;
		padding-top: 30px;
		padding-bottom: 30px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		.lock_item{
			border-right: 1px solid #F0F0F0;
			width: 50%;
			.itme_title{
				margin-bottom: 24px;
				width: 100%;
				text-align: center;
				font-size: 18px;
				color: #333333;
			}
			.contents{
				display: flex;
				justify-content: space-around;
				.conttent_item{
					font-size: 16px;
					color: #666666;
				}
			}
		}
		.line{
			height: 100%;
		}
		.chang{
			border:none;
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
					name:"",
					phone:"",
					id_card_no:"",
					order_status:"",
				},						//请求参数
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
				dataObj:{
					order_list:[{
						shop_num:"哈哈哈"
					}],			//订单列表
					total:100
				},	
			}
		},
		methods:{
			//搜索
			search(){
				console.log(this.orderReq);
			},
			//导出
			exportFile(){
				console.log(this.orderReq);
			},
			//重置
			reset(){
				this.orderReq = {
					page:1,
					pagesize:10,
					name:"",
					phone:"",
					id_card_no:"",
					order_status:"",
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
				// this.$router.push('/order_detail');
			}
		}
	}
</script>









