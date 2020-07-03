<template>
	<div>
		<el-card>
			<div class="info_title">
				<div class="title_txt">开票信息</div>
				<div class="edit_box" @click="editApply">
					<img class="edit_icon" src="../../assets/edit_icon.png">
					<div class="edit_txt">编辑</div>
				</div>
			</div>
			<div class="info_row">
				<div>企业名称：xxx公司</div>
				<div>纳税人识别号：12364721634</div>
			</div>
			<div class="info_row">
				<div>纳税人类型：一般纳税人</div>
				<div>单位注册地址及电话：杭州市萧山区</div>
			</div>
			<div class="info_row">发票类目：*现代服务*营销服务费   *现代服务*推广服务费    *现代服务*信息服务费</div>
			<div class="info_row">
				<div>开户行及账号：台州银行杭州西湖支行 11111111122222222</div>
				<div>默认发票类目：*现代服务*营销服务费</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">邮寄地址</div>
				<div class="edit_box" @click="editAddress">
					<img class="edit_icon" src="../../assets/edit_icon.png">
					<div class="edit_txt">编辑</div>
				</div>
			</div>
			<div class="info_row">收件人姓名：小王</div>
			<div class="info_row">收件人电话：1388888888</div>
			<div class="info_row">收件人地址：浙江省杭州市萧山区XXXXXXXX</div>
		</el-card>
		<!-- 编辑开票信息 -->
		<el-dialog title="编辑开票信息" :visible.sync="showApply">
			<el-form size="small" style="width: 60%;margin: 0 auto">
				<el-form-item label="企业名称" label-width="130px" required>
					<el-input v-model="applyInfo.store_id"></el-input>
				</el-form-item>
				<el-form-item label="纳税人识别号" label-width="130px" required>
					<el-input v-model="applyInfo.taxpayer_id"></el-input>
				</el-form-item>
				<el-form-item label="纳税人类型" label-width="130px" required>
					<el-radio-group v-model="applyInfo.taxpayer_type">
						<el-radio label="1">一般纳税人</el-radio>
						<el-radio label="2">小规模纳税人</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="单位注册及地址" label-width="130px" required>
					<el-input v-model="applyInfo.address_phone"></el-input>
				</el-form-item>
				<el-form-item label="开户行及帐号" label-width="130px" required>
					<el-input v-model="applyInfo.bank_info"></el-input>
				</el-form-item>
				<el-form-item label="发票类目" label-width="130px" required>
					<el-input v-model="applyInfo.default_cate_id"></el-input>
				</el-form-item>
				<el-form-item label="默认发票类目" label-width="130px" required>
					<el-input v-model="applyInfo.default_cate_id"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showApply = false">取 消</el-button>
				<el-button type="primary" @click="submitEditApply">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 编辑邮寄地址 -->
		<el-dialog title="编辑邮寄地址" :visible.sync="showAddress">
			<el-form size="small" style="width: 60%;margin: 0 auto">
				<el-form-item label="收件人姓名" label-width="130px" required>
					<el-input v-model="addressInfo.recieve_user"></el-input>
				</el-form-item>
				<el-form-item label="收件人电话" label-width="130px" required>
					<el-input v-model="addressInfo.recieve_phone"></el-input>
				</el-form-item>
				<el-form-item label="收件人地址" label-width="130px" required>
					<el-input v-model="addressInfo.recieve_address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showAddress = false">取 消</el-button>
				<el-button type="primary" @click="submitEditAddress">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<style lang="less" scoped>
.info_title{
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding-bottom: 20px;
	border-bottom: 1px solid #E8E8E8;
	.title_txt{
		font-size: 16px;
		color: #333333;
		font-weight:500;
	}
	.edit_box{
		display: flex;
		align-items: center;
		.edit_icon{
			margin-right: 5px;
			width:14px;
			height:14px;
		}
		.edit_txt{
			font-size: 14px;
			color: #333333;
		}
	}
}
.info_row{
	display: flex;
	margin-top: 18px;
	font-size: 14px;
	color: #666666;
	div{
		width: 50%;
	}
}
</style>
<script>
	export default{
		data(){
			return{
				showApply:false,		//编辑开票信息弹框
				applyInfo:{
					store_id:"",
					taxpayer_id:"",
					taxpayer_type:"2",
					address_phone:"",
					bank_info:"",
					default_cate_id:"",

				},						//编辑开票信息内容
				showAddress:false,		//编辑邮寄地址弹框
				addressInfo:{
					recieve_user:"",
					recieve_phone:"",
					recieve_address:"",
				},						//编辑邮寄地址内容
			}
		},
		methods:{
			//编辑开票信息
			editApply(){
				this.showApply = true;
			},
			//点击确定提交编辑开票信息
			submitEditApply(){
				console.log(this.applyInfo);
			},
			//编辑邮寄地址
			editAddress(){
				this.showAddress = true;
			},
			//点击确定提交邮寄地址信息
			submitEditAddress(){
				console.log(this.addressInfo);
			}
		}
	}
</script>






