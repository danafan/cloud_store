<template>
	<div>
		<el-card style="width: 80%">
			<div class="invoice_box" v-for="(invoice_item,index) in resData">
				<div class="top_box">
					<el-select v-model="invoice_item.invoice_type" size="small">
						<el-option
						v-for="item in invoice_item.taxpayer_type_list"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
				<div class="bank_info">{{invoice_item.bank_info}}</div>
				<div class="line"></div>
				<div>发票版面：一百万元版</div>
				<img class="deleteImg" src="../../assets/deleteImg.png" v-if="index != 0" @click="deteleInvoice(index)">
			</div>
			<div class="invoice_list">
				<div class="list_title">
					<div class="a all">货物或应税劳务、服务名称</div>
					<div class="b all">规格型号</div>
					<div class="c all">单位</div>
					<div class="d all">数量</div>
					<div class="e all">单价</div>
					<div class="f all">金额</div>
					<div class="g all">税率</div>
					<div class="h all">税额</div>
					<div class="i all">含税金额</div>
				</div>
				<div class="invoice_item" v-for="(invo_item,i) in invoice_item.invoice_list">
					<div class="a all">
						<el-select v-model="invo_item.default_cate_id" size="small">
							<el-option
							v-for="item in invoice_item.cate_list"
							:key="item.invoice_cate_id"
							:label="item.cate_name"
							:value="item.invoice_cate_id">
						</el-option>
					</el-select>
					<img style="margin-left: 10px" class="rotate" src="../../assets/close.png" v-if="i == invoice_item.invoice_list.length - 1" @click="addItem(index)">
					<img style="margin-left: 10px" src="../../assets/close.png" v-if="i > 0" @click="deleteItem(index,i)">
				</div>
				<div class="b all"></div>
				<div class="c all">次</div>
				<div class="d all">{{invo_item.itemNum}}</div>
				<div class="e all">{{itemPrice(invo_item.totalMoney,invo_item.itemNum)}}</div>
				<div class="f all">{{itemAmount(invo_item.itemNum,(invo_item.totalMoney/1.06/invo_item.itemNum).toFixed(8))}}</div>
				<div class="g all">{{invo_item.itemTaxRate}}</div>
				<div class="h all">{{itemtaxAmount(invo_item.totalMoney,itemAmount(invo_item.itemNum,(invo_item.totalMoney/1.06/invo_item.itemNum).toFixed(8)))}}</div>
				<div class="i all">
					<el-input v-model="invo_item.totalMoney" size="small"></el-input>
				</div>
			</div>
		</div>
		<div class="totla_levied">
			<div class="levied_label label">价税合计</div>
			<div class="levied_value">{{invoiceItemTotalMoney(invoice_item.invoice_list)}}</div>
		</div>
		<div class="remark">
			<div class="remark_label label">备注</div>
			<div class="remark_value">
				<el-input
				type="textarea"
				placeholder="此处内容会打印在发票票面备注栏中，确认后填写且不能超过200个字节（一个汉字占两个字节）"
				v-model="invoice_item.remark">
			</el-input>
		</div>
	</div>
</div>
<!-- 添加按钮 -->
<div class="add_box" @click="addInvoice">
	<img class="add_icon" src="../../assets/add.png">
</div>
<!-- 开票说明 -->
<el-input
class="desc"
:row="8"
type="textarea"
placeholder="请填写开票说明"
v-model="invoice_desc"></el-input>
<!-- 是否申请结算确认函 -->
<el-form :inline="true" size="small" class="demo-form-inline">
	<el-form-item label="是否申请结算确认函" required>
		<el-radio-group v-model="is_confirmation_letter">
			<el-radio :label="1">是</el-radio>
			<el-radio :label="0">否</el-radio>
		</el-radio-group>
	</el-form-item>
</el-form>
<!-- 底部金额框 -->
<div class="buttom_box">
	<div class="bottom_left">
		申请开票总金额：¥{{resData[0].total_money}} 发票总价税合计：¥{{changeTotalMoney()}}  差额：<span>¥{{resData[0].total_money - changeTotalMoney()}}</span>
	</div>
	<el-button size="small" type="primary" @click="step1Sub">提交</el-button>
</div>
</el-card>
<!-- 生成发票弹框 -->
<el-dialog :visible.sync="isDetail">
	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="开票申请" name="apply_detail">
			<div class="apply_item">
				<div class="apply_item_title">发票详情{{is_confirmation_letter == 1?'（已申请结算确认函）':''}}</div>
				<div class="apply_item_content">
					<div class="content_item">待申请发票（张）：{{resData.length}}</div>
					<div class="content_item">价税合计总额（元）：{{resData[0].total_money}}</div>
				</div>
			</div>
			<div class="apply_item">
				<div class="apply_item_title">商户信息</div>
				<div class="apply_item_content">
					<div class="content_item">商户别名：{{resData[0].store_name}}</div>
					<div class="content_item">纳税人类型：{{resData[0].taxpayer_type_name}}</div>
				</div>
			</div>
			<div class="apply_item">
				<div class="apply_item_title">邮寄地址</div>
				<div class="hy">
					<div class="content_item">收件人姓名：{{resData[0].recieve_user}}</div>
					<div class="content_item">收件人电话：{{resData[0].recieve_phone}}</div>
					<div class="content_item">收件人地址：{{resData[0].recieve_address}}</div>
				</div>
			</div>
			<div class="apply_item">
				<div class="apply_item_title">开票说明</div>
				<div class="hy">
					<div class="content_item">{{resData[0].remark}}</div>
				</div>
			</div>
		</el-tab-pane>
		<el-tab-pane label="账单" name="bill">
			<div>
				<div class="bill_title">
					申请开票总金额：¥{{resData[0].total_money}}
				</div>
				<el-table :data="resData[0].bill_list" size="small" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
					<el-table-column prop="bill_id" label="账单编号" align="center">
					</el-table-column>
					<el-table-column prop="type" label="账单类型" align="center">
					</el-table-column>
					<el-table-column prop="biil_money" label="账单金额（元）" align="center">
					</el-table-column>
					<el-table-column prop="bill_date" label="账单完成日期" align="center">
					</el-table-column>
					<el-table-column prop="biil_money" label="账单申请开票金额（元）" align="center">
					</el-table-column>
				</el-table>
			</div>
		</el-tab-pane>
		<el-tab-pane label="发票预览" name="invoice_show">
			<el-carousel :interval="5000" arrow="always" style="height: 550px;width: 100%">
				<el-carousel-item v-for="item in pic_list" :key="item" style="height: 550px;width: 100%">
					<img style="height: 100%;width: 100%" :src="item">
				</el-carousel-item>
			</el-carousel>
			<div class="bottom_buts">
				<el-button size="small" type="primary" @click="step2Invoice">确认提交</el-button>
			</div>
		</el-tab-pane>
	</el-tabs>
</el-dialog>
</div>
</template>
<style lang="less" scoped>
.invoice_box{
	margin-bottom: 16px;
	border: 1px solid #008DFF;
	font-size: 12px;
	color: #666666;
	.top_box{
		border-bottom:1px solid #008DFF;
		padding-left: 10px;
		width: 100%;
		display: flex;
		align-items: center;
		height: 45px;
		position: relative;
		.bank_info{
			margin-left: 15px;
		}
		.line{
			margin-left: 15px;
			margin-right: 15px;
			border-right:1px solid #979797;
			height: 17px;
		}
		.deleteImg{
			width: 18px;
			height: 18px;
			position: absolute;
			right: 10px;
		}
	}
	.invoice_list{
		.list_title,.invoice_item{
			height: 40px;
			font-weight:500;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
		.all{
			border-right: 1px solid #008DFF;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.a{
			width: 272px;
		}
		.b{
			width: 75px;
		}
		.c{
			width: 48px;
		}
		.d{
			width: 48px;
		}
		.e{
			width: 138px;
		}
		.f{
			width: 110px;
		}
		.g{
			width: 49px;
		}
		.h{
			width: 108px;
		}
		.i{
			border: none;
			padding-left: 20px;
			padding-right: 20px;
			flex:1;
		}
	}
	.totla_levied{
		border-top:1px solid #008DFF;
		border-bottom:1px solid #008DFF;
		width: 100%;
		display: flex;
		.levied_label{
			border-right:1px solid #008DFF;
			height: 30px;
			line-height: 30px;
			width: 272px;
			text-align: center;
		}
		.levied_value{
			padding-right: 10px;
			flex:1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}
	.remark{
		width: 100%;
		display: flex;
		.remark_label{
			border-right:1px solid #008DFF;
			height: 79px;
			line-height: 79px;
			width: 400px;
			text-align: center;
		}
		.remark_value{
			padding: 10px;
			flex:1;
			height: 79px;
			display: flex;
			align-items: center;
			justify-content: center;
			input{
				width: 100%;
			}
		}
	}
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
.add_box{
	margin-top: 16px;
	border:1px dashed #DDDDDD;
	width: 100%;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	.add_icon{
		width: 23px;
		height: 23px;
	}
}
.rotate{
	transform: rotate(45deg);
}
.desc{
	margin-top: 16px;
}
.buttom_box{
	background: #ECF6FF;
	width: 100%;
	height: 53px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: 10px;
	padding-left: 10px;
	.bottom_left{
		display: flex;
		align-items: center;
		font-size: 12px;
		color:#008DFF;
		span{
			color:red;
		}
	}
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
				resData:[],							//获取的信息
				isDetail:false,						//生成发票弹框
				activeName:"apply_detail",
				invoice_desc:"",					//开票说明
				is_confirmation_letter:1,			//是否申请结算确认函
				bill_ids:"",						//上一级选中的id
				pic_list:[],						//发票图片列表
				reqList:[],							//第二步的提交参数
			}
		},
		created(){
			this.bill_ids = this.$route.query.bill_ids;
			//获取信息
			this.invoiceStep1();
		},
		methods:{
			//获取信息
			invoiceStep1(){
				resource.invoiceStep1({bill_ids:this.bill_ids}).then(res => {
					if(res.data.code == 1){
						let obj = res.data.data;
						obj.remark = "";
						this.resData.push(obj);
						//发票总价合计（最底部）
						this.changeTotalMoney()
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换详情弹框导航
			handleClick(tab) {
				console.log(tab);
			},
			//计算某一张发票的总金额
			invoiceItemTotalMoney(list){
				var num = 0;
				list.map(item => {
					num += parseFloat(!item.totalMoney?0:item.totalMoney);
				})
				return num
			},
			//添加某张发票内的某一条
			addItem(index){
				let obj = {
					default_cate_id: 1,
					itemAmount: "",
					itemNum: 1,
					itemPrice: "",
					itemTaxRate: "6%",
					itemtaxAmount: "",
					totalMoney: 0
				}
				this.resData[index].invoice_list.push(obj);
			},
			//删除某张发票内的某一条
			deleteItem(index,i){
				this.resData[index].invoice_list.splice(i,1);
			},
			//添加一张空白发票
			addInvoice(){
				if(this.resData.length >= 3){
					this.$message.warning('总数量不能超过3张');
					return;
				}
				let invoiceObj = {
					bank_info:"中国农业银行  11111111111111",
					cate_list:[{
						cate_name: "营销服务费1",
						invoice_cate_id: 1
					},{
						cate_name: "营销推广费",
						invoice_cate_id: 2
					}],
					invoice_list:[{
						default_cate_id: 1,
						itemNum: 1,
						itemTaxRate: "6%",
						totalMoney: 0
					}],
					invoice_type: 1,
					taxpayer_type_list:[{
						id: 1,
						name: "增值税专用发票"
					},{
						id: 2,
						name: "增值税普通发票"
					}],
					remark:""
				}
				this.resData.push(invoiceObj)
			},
			//删除发票
			deteleInvoice(index){
				this.resData.splice(index,1);
			},
			//单价
			itemPrice(v,i){
				return (v/1.06/i).toFixed(8)
			},
			//金额
			itemAmount(v,i){
				return (v*i).toFixed(2)
			},
			//税额
			itemtaxAmount(v,i){
				return (v-i).toFixed(2)
			},
			//发票总价合计（最底部）
			changeTotalMoney(){
				var num = 0;
				this.resData.map(item => {
					let hhh = this.invoiceItemTotalMoney(item.invoice_list)
					num += hhh;
				})
				return num;
			},
			//初步提交
			step1Sub(){
				let cha = this.resData[0].total_money - this.changeTotalMoney();
				if(cha > 0){
					this.$message.warning('发票总价税不能少于申请开票总金额');
					return;
				}else if(cha < 0){
					this.$message.warning('发票总价税不能大于申请开票总金额');
					return;
				}
				var invoice_json = [];
				this.resData.map(item => {
					if(this.invoiceItemTotalMoney(item.invoice_list) > 0){
						var obj = {
							invoice_type:item.invoice_type,
							taxpayer_type:item.taxpayer_type,
							bank_info:item.bank_info,
							tax_amount:this.invoiceItemTotalMoney(item.invoice_list),
							remark:item.remark,
							json_item:[]
						}
						item.invoice_list.map(i => {
							let jsonObj = {};
							jsonObj.itemId = i.default_cate_id;
							jsonObj.itemName = this.filterItemName(i.default_cate_id);
							jsonObj.total_money = i.totalMoney;
							obj.json_item.push(jsonObj);
						})
						invoice_json.push(obj);
					}
				})
				console.log(invoice_json)
				//生成图片预览
				this.imageShow(JSON.stringify(invoice_json));
			},
			//过滤选中的货物或应税劳务、服务名称
			filterItemName(id){
				var str = "";
				this.resData[0].cate_list.map(item => {
					if(item.invoice_cate_id == id){
						str = item.cate_name;
						return
					}	
				})
				return str;
			},
			//生成图片预览
			imageShow(invoice_json){
				let req = {
					bill_ids:this.bill_ids,
					invoice_json:invoice_json
				}
				resource.imageShow(req).then(res => {
					if(res.data.code == 1){
						this.pic_list = res.data.data.image_list;
						this.reqList = res.data.data.json_data;
						this.isDetail = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//申请发票第二步
			step2Invoice(){
				let req = {
					bill_ids:this.bill_ids,
					invoice_json:JSON.stringify(this.reqList),
					remarks:this.invoice_desc,
					is_confirmation_letter:this.is_confirmation_letter
				}
				resource.step2Invoice(req).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
						this.isDetail = false;
						this.$router.push('/apply_record');
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			}
		}

	}
</script>














