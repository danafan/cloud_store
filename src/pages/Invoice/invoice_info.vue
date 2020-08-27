<template>
	<div>
		<el-card>
			<div class="info_title">
				<div class="title_txt">开票信息</div>
				<div class="edit_box" @click="editApply" v-if="invoiceInfo.is_supper == 1 || (invoiceInfo.is_supper == 0 && invoiceInfo.button_list.edit == 1)">
					<img class="edit_icon" src="../../assets/edit_icon.png">
					<div class="edit_txt">编辑</div>
				</div>
			</div>
			<div class="info_row">
				<div>企业名称：{{invoiceInfo.enterprise_name}}</div>
				<div>纳税人识别号：{{invoiceInfo.taxpayer_id}}</div>
			</div>
			<div class="info_row">
				<div>纳税人类型：{{invoiceInfo.taxpayer_type}}</div>
				<div>单位注册地址及电话：{{invoiceInfo.address_phone}}</div>
			</div>
			<div class="info_row">发票类目：{{invoiceInfo.cate_ids}}</div>
			<div class="info_row">
				<div>开户行及账号：{{invoiceInfo.bank_info}}</div>
				<div>默认发票类目：{{invoiceInfo.default_cate_id}}</div>
			</div>
		</el-card>
		<el-card style="margin-top: 24px;">
			<div class="info_title">
				<div class="title_txt">邮寄地址</div>
				<div class="edit_box" @click="editAddress" v-if="invoiceInfo.is_supper == 1 || (invoiceInfo.is_supper == 0 && invoiceInfo.button_list.edit == 1)">
					<img class="edit_icon" src="../../assets/edit_icon.png">
					<div class="edit_txt">编辑</div>
				</div>
			</div>
			<div class="info_row">收件人姓名：{{invoiceInfo.recieve_user}}</div>
			<div class="info_row">收件人电话：{{invoiceInfo.recieve_phone}}</div>
			<div class="info_row">收件人地址：{{invoiceInfo.recieve_address}}</div>
		</el-card>
		<!-- 编辑开票信息 -->
		<el-dialog title="编辑开票信息" :visible.sync="showApply">
			<el-form size="small" style="width: 60%;margin: 0 auto">
				<el-form-item label="企业名称" label-width="130px" required>
					<el-input v-model="applyInfo.enterprise_name" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="纳税人识别号" label-width="130px" required>
					<el-input v-model="applyInfo.taxpayer_id" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="纳税人类型" label-width="130px" required>
					<el-radio-group v-model="applyInfo.taxpayer_type" :disabled="true">
						<el-radio :label="1">一般纳税人</el-radio>
						<el-radio :label="2">小规模纳税人</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="单位注册及地址" label-width="130px" required>
					<el-input v-model="applyInfo.address_phone" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="开户行及帐号" label-width="130px" required>
					<el-input v-model="applyInfo.bank_info" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="发票类目" label-width="130px" required>
					<el-input v-model="applyInfo.cate_ids" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="默认发票类目：">
					<el-select v-model="applyInfo.default_cate_id">
						<el-option v-for="item in applyInfo.cate_list" :key="item.invoice_cate_id" :label="item.cate_name" :value="item.invoice_cate_id">
						</el-option>
					</el-select>
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
					<el-input v-model="applyInfo.recieve_user"></el-input>
				</el-form-item>
				<el-form-item label="收件人电话" label-width="130px" required>
					<el-input v-model="applyInfo.recieve_phone"></el-input>
				</el-form-item>
				<el-form-item label="收件人地址" label-width="130px" required>
					<el-input v-model="applyInfo.recieve_address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showAddress = false">取 消</el-button>
				<el-button type="primary" @click="submitEditApply">确 定</el-button>
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
	import resource from '../../api/resource.js'
	export default{
		data(){
			return{
				invoiceInfo:{},
				type:1,					//弹框类型
				showApply:false,		//编辑开票信息弹框
				applyInfo:{},			//获取的编辑开票信息内容
				showAddress:false,		//编辑邮寄地址弹框
			}
		},
		created(){
			//获取开票信息
			this.getInvoiceInfo();
		},
		methods:{
			//获取开票信息
			getInvoiceInfo(){
				resource.invoiceInfo().then(res => {
					if(res.data.code == 1){
						this.invoiceInfo = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击编辑开票信息
			editApply(){
				resource.getEditInvoiceInfo().then(res => {
					if(res.data.code == 1){
						this.showApply = true;
						this.type = 1;
						this.applyInfo = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//编辑邮寄地址
			editAddress(){
				resource.getEditInvoiceInfo().then(res => {
					if(res.data.code == 1){
						this.showAddress = true;
						this.type = 2;
						this.applyInfo = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击确定提交编辑开票信息
			submitEditApply(){
				let req = {
					type:this.type
				};
				if(this.type == 1){
					req.default_cate_id = this.applyInfo.default_cate_id;
				}else{
					if(this.applyInfo.recieve_user == ''){
						this.$message.warning("请输入收件人姓名");
					}else if(this.applyInfo.recieve_phone == ''){
						this.$message.warning("请输入收件人手机号");
					}else if(this.applyInfo.recieve_address == ''){
						this.$message.warning("请输入收件人地址");
					}else{
						req.recieve_user = this.applyInfo.recieve_user;
						req.recieve_phone = this.applyInfo.recieve_phone;
						req.recieve_address = this.applyInfo.recieve_address;
					}
					
				}
				resource.postEditInvoiceInfo(req).then(res => {
					if(res.data.code == 1){
						this.showApply = false;
						this.showAddress = false;
						this.$message.success(res.data.msg);
						//获取开票信息
						this.getInvoiceInfo();
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			}
		}
	}
</script>






