<template>
	<div>
		<el-card>
			<div class="yue_info">
				<div class="info_item">
					<div class="info_item_title">银行卡</div>
					<div class="info_row">
						<div class="row_item">
							<div class="row_item_label">可用余额（元）</div>
							<div class="row_item_val">{{storeInfo.bank_balance}}</div>
						</div>
						<div class="row_item">
							<div class="row_item_label">不可用余额（元）</div>
							<div class="row_item_val">{{storeInfo.bank_frozen_amount}}</div>
						</div>
					</div>
					<div class="buttons">
						<div class="butdf top_up_but" @click="showTop('1')">充值</div>
						<div class="butdf zhuan" @click="transTop('1')">转账</div>
					</div>
				</div>
				<div class="info_item">
					<div class="info_item_title">支付宝</div>
					<div class="info_row">
						<div class="row_item">
							<div class="row_item_label">可用余额（元）</div>
							<div class="row_item_val">{{storeInfo.alipay_balance}}</div>
						</div>
						<div class="row_item">
							<div class="row_item_label">不可用余额（元）</div>
							<div class="row_item_val">{{storeInfo.alipay_frozen_amount}}</div>
						</div>
					</div>
					<div class="buttons">
						<div class="butdf top_up_but" @click="showTop('2')">充值</div>
						<div class="butdf zhuan" @click="transTop('2')">转账</div>
					</div>
				</div>
			</div>
		</el-card>
		<el-card style="margin-top: 20px">
			<div class="card_tab">
				<div class="tab_item" :class="{'active_tab':active_tab_index == '1'}" @click="checkTab('1')">充值记录</div>
				<div class="tab_item" :class="{'active_tab':active_tab_index == '2'}" @click="checkTab('2')">转账付款记录</div>
				<div class="tab_item" :class="{'active_tab':active_tab_index == '3'}" @click="checkTab('3')">转账收款记录</div>
			</div>
			<TopUp v-if="active_tab_index == '1'"/>
			<Payment v-if="active_tab_index == '2'"/>
			<Collection v-if="active_tab_index == '3'"/>
		</el-card>
		<!-- 充值 -->
		<el-dialog title="汇款信息" :visible.sync="showTopUp">
			<div class="info_box">
				<div class="info_row">
					<div class="row_left">预期付款账户：{{storeInfo.enterprise_name}}</div>
				</div>
				<div class="info_row">
					<div class="row_left">账户名称：{{accountObj.service_subject_company_name}}</div>
					<button type="button" 
					class="copy" 
					v-clipboard:copy="accountObj.service_subject_company_name"
					v-clipboard:success="onCopy"
					>复制</button>
				</div>
				<div class="info_row">
					<div class="row_left">开户银行：{{accountObj.bank_name}}</div>
					<button type="button" 
					class="copy" 
					v-clipboard:copy="accountObj.bank_name"
					v-clipboard:success="onCopy"
					>复制</button>
				</div>
				<div class="info_row">
					<div class="row_left">专属账户：{{accountObj.bank_no}}</div>
					<button type="button" 
					class="copy" 
					v-clipboard:copy="accountObj.bank_no"
					v-clipboard:success="onCopy"
					>复制</button>
				</div>
				<div class="info_row">
					<div class="row_left">用途：{{useTxt}}</div>
					<button type="button" 
					class="copy" 
					v-clipboard:copy="useTxt"
					v-clipboard:success="onCopy"
					>复制</button>
				</div>
			</div>
			<div class="info_toast">汇款时请务必填写以上用途，以便充值到您期望的通道</div>
			<div class="toast_box">
				<div>温馨提示：1.请使用网银对公充值，充值金额在100万元（含）以下，不受时间限制， 预计2小时内到账。</div>
				<div>2.充值金额在100万元以上，法定工作日23:30～次日17:15充值预计2小时内到账， 其他时间充值预计第二个工作日到账。</div>
				<div>3.各银行系统的处理时间不同，充值资金到账时间以各收款银行入账时间为准， 请您根据自身需要合理安排充值时间。 </div>
				<div>4.请注意查收到账短信或邮件，前往 提醒设置 查看配置的手机号和邮箱。</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="showTopUp = false">确 认</el-button>
			</div>
		</el-dialog>
		<!-- 转账 -->
		<el-dialog title="转账" :visible.sync="showTransfer">
			<div class="transfer">
				<div class="trans_item">转出账户：{{transferReq.pay_account == '1'?'银行卡':'支付宝'}}</div>
				<div class="trans_item">余额：¥{{transferReq.pay_account == '1'?storeInfo.bank_balance:storeInfo.alipay_balance}}</div>
				<div class="trans_item">所属企业：{{storeInfo.enterprise_name}}</div>
			</div>
			<el-form size="small" class="from_box">
				<el-form-item label="综合服务主体：" label-width="120px">
					<span>{{accountObj.service_subject_name}}</span>
				</el-form-item>
				<el-form-item label-width="80px" label="转出账户">
					<el-select v-model="transferReq.pay_account">
						<el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in accountList"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label-width="80px" label="收款账户">
					<el-select v-model="transferReq.receive_account">
						<el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in accountList" :disabled="transferReq.pay_account == item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label-width="80px" label="转账金额">
					<el-input placeholder="输入转账金额" type="number" v-model="transferReq.money" style="width: 200px">
						<template slot="append">元</template>
					</el-input>
				</el-form-item>
				<el-form-item label-width="80px" label="转账备注">
					<el-input type="textarea" v-model="transferReq.remark" style="width: 200px" placeholder="最多不超过15字"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showTransfer = false" size="small">取 消</el-button>
				<el-button type="primary" @click="subTransfer" size="small">确 认</el-button>
			</div>
		</el-dialog>
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
		.buttons{
			margin-top: 10px;
			width: 100%;
			display: flex;
			justify-content: space-around;
			.butdf{
				width:74px;
				text-align: center;
				height:32px;
				line-height: 32px;
				border-radius:2px;
				font-size: 14px;
				color: #fff;
			}
			.top_up_but{
				background: #008DFF;
			}
			.zhuan{
				background: #FFA74B;
			}
		}
	}
}
.card_tab{
	margin-bottom: 20px;
	border-bottom: 1px solid #E8E8E8;
	height: 54px;
	width: 100%;
	display: flex;
	align-items: center;
	.tab_item{
		margin-right: 70px;
		font-size: 16px;
		color: #666666;
	}
	.active_tab{
		border-bottom:2px solid #008DFF;
		height: 54px;
		line-height: 54px;
		color: #008DFF;
	}
}
.info_box{
	.info_row{
		width: 100%;
		margin-bottom: 20px;
		display: flex;
		align-items: center;
		font-size: 14px;
		.copy{	
			outline: none;
			border: none;
			margin-left: 47px;
			color:#008DFF;
		}
	}
}
.info_toast{
	margin-bottom: 20px;
	font-size: 12px;
	color:#666666;
}
.toast_box{
	margin-bottom:24px;
	padding: 8px 30px;
	border:1px solid #008DFF;
	background:rgba(238,248,255,1);
	width: 100%;
	font-size: 14px;
	color: #666666;
}
.transfer{
	margin-bottom: 20px;
	padding-right: 9px;
	padding-left: 9px;
	background:rgba(238,248,255,1);
	display: flex;
	align-items: center;
	justify-content: space-between;
	border:1px solid #008DFF;
	height:43px;
	line-height: 43px;
	font-size: 13px;
	color:#333333;
}
.from_box{
	width: 60%;
	position: relative;
	left: 50%;
	transform: translate(-50%);
}
</style>
<script>
	import TopUp from './top_up.vue'
	import Payment from './payment.vue'
	import Collection from './collection.vue'
	import resource from '../../../../api/resource.js'
	export default{
		data(){
			return{
				active_tab_index:'1',
				storeInfo:{},			//顶部信息
				accountObj:{},			
				showTopUp:false,		//默认充值弹框不显示
				useTxt:"",				//用途
				showTransfer:false,		//转账弹框
				accountList:[
				{
					id:"1",
					name:"银行卡"
				},
				{
					id:"2",
					name:"支付宝"
				}
				],
				//转账的提交参数
				transferReq:{
					pay_account:"",
					receive_account:"",
					money:"",
					remark:""
				}
			}
		},
		created(){
			//获取顶部信息
			this.getStoreInfo();
		},
		watch:{
			'transferReq.pay_account':{
				deep:true,
				handler: function(n, o) {
					if(n != o){
						this.transferReq.receive_account = "";
					}
				}
			}
		},
		methods:{
			//获取顶部信息
			getStoreInfo(){
				resource.storeInfo().then(res => {
					if(res.data.code == 1){
						this.storeInfo = res.data.data;
						this.accountObj = this.storeInfo.account;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			checkTab(type){
				this.active_tab_index = type;
			},
			//充值
			showTop(type){
				this.showTopUp = true;
				if(type == '1'){
					this.useTxt = "银行卡通道充值"
				}else{
					this.useTxt = "支付宝通道充值"
				}
			},
			//转账
			transTop(type){
				this.showTransfer = true;
				if(type == '1'){
					this.transferReq.pay_account = "1";
				}else if(type == '2'){
					this.transferReq.pay_account = "2";
				}
			},
			//点击复制
			onCopy(){
				this.$message.success("复制成功");
			},
			//点击提交转账
			subTransfer(){
				if(this.transferReq.pay_account == ''){
					this.$message.warning("请选择收款商户");
				}else if(this.transferReq.receive_account == ''){
					this.$message.warning("请选择收款账户");
				}else if(this.transferReq.money == ''){
					this.$message.warning("输入转账金额");
				}else{
					resource.transfer(this.transferReq).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.showTransfer = false;
							//获取顶部信息
							this.getStoreInfo();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			}
		},
		components:{
			TopUp,
			Payment,
			Collection
		}
		
	}
</script>















