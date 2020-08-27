<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="姓名：">
					<el-input v-model="req.name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="证件号：">
					<el-input v-model="req.id_card_no" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="预签约手机号：">
					<el-input v-model="req.phone" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="信息校验状态：">
					<el-select v-model="req.info_status">
						<el-option v-for="item in info_status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="签约状态：">
					<el-select v-model="req.sign_status">
						<el-option v-for="item in sign_status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="创建时间：">
					<el-date-picker
					v-model="create_date"
					type="datetimerange"
					value-format="yyyy-MM-dd HH:mm:ss"
					range-separator="至"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					:default-time="['00:00:00', '23:59:59']">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="更新时间：">
				<el-date-picker
				v-model="update_date"
				type="datetimerange"
				value-format="yyyy-MM-dd HH:mm:ss"
				range-separator="至"
				start-placeholder="开始时间"
				end-placeholder="结束时间"
				:default-time="['00:00:00', '23:59:59']">
			</el-date-picker>
		</el-form-item>
	</el-form>
	<div class="huajian">
		<el-button type="primary" size="small" icon="el-icon-upload" @click="uploadUserInfo()" v-if="dataObj.is_supper == 1 || (dataObj.is_supper == 0 && dataObj.button_list.upload == 1)">上传签约用户信息</el-button>
		<div class="but">
			<el-button type="primary" size="small" @click="invitationSignList">搜索</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
	</div>
	<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
		<el-table-column width="180" fixed prop="create_time" label="创建时间" align="center">
		</el-table-column>
		<el-table-column width="180" prop="update_time" label="更新时间" align="center">
		</el-table-column>
		<el-table-column width="150" prop="name" label="用户姓名" align="center">
		</el-table-column>
		<el-table-column width="200" prop="id_card_no" label="证件号码" align="center">
		</el-table-column>
		<el-table-column width="150" prop="phone" label="预签约手机号" align="center">
		</el-table-column>
		<el-table-column width="200" prop="overseas_user" label="是否是海外或港澳台用户" align="center">
		</el-table-column>
		<el-table-column width="150" label="信息校验状态" align="center">
			<template slot-scope="scope">
				<span>{{scope.row.info_status == 0 ? '信息不匹配' : '校验通过'}}</span>
			</template>
		</el-table-column>
		<el-table-column width="150" prop="sign_status" label="签约状态" align="center">
		</el-table-column>
		<el-table-column fixed="right" label="操作" align="center">
			<template slot-scope="scope">
				<el-button type="text" size="small" @click="edit(scope.row.invitation_id,scope.row.info_status)" v-if="dataObj.is_supper == 1 || (dataObj.is_supper == 0 && dataObj.button_list.edit == 1)">修改信息</el-button>
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
<!-- 上传签约用户信息 -->
<el-dialog title="上传签约用户信息" :visible.sync="uploadSign">
	<el-form size="small" label-width="150px" style="width: 60%;margin: 0 auto">
		<el-form-item label="下载模版：" required>
			<div class="down_box" @click="downTemp">
				<img class="down_icon" src="../../assets/down_icon.png">
				<div class="down_txt">下载模版</div>
			</div>
		</el-form-item>
		<el-form-item label="上传文件：" required>
			<div class="showimg" v-if="fileObj" @mouseenter="isDel = true" @mouseleave="isDel = false">
				<div class="img">{{fileName}}</div>
				<div class="modal" v-if="isDel == true">
					<img src="../../assets/deleteImg.png" @click="detele">
				</div>
			</div>
			<upload-file @callbackFn="callbackFn" v-else></upload-file>
			<div class="upload_toast">只支持xlsx格式的文件</div>
		</el-form-item>
		<div class="shuo">签约用户文件说明：</div>
		<div class="shuo">1. 单个文件最多支持上传1000条数据，同一证件号不允许重复上传 </div>
		<div class="shuo">2. 信息校验通过后，将短信通知用户去小程序中进行签约</div>
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click="uploadSign = false">取 消</el-button>
		<el-button type="primary" @click="subUploadSing">确 定</el-button>
	</div>
</el-dialog>
<!-- 修改信息 -->
<el-dialog title="编辑用户信息" :visible.sync="updateInfo">
	<el-form size="small" style="width: 60%;margin: 0 auto">
		<el-form-item label="用户姓名" label-width="180px" required>
			<el-input v-model="updateInfoReq.name" :disabled="info_status == 1"></el-input>
		</el-form-item>
		<el-form-item label="证件号码" label-width="180px" required>
			<el-input v-model="updateInfoReq.id_card_no" :disabled="info_status == 1"></el-input>
		</el-form-item>
		<el-form-item label="预签约手机号" label-width="180px" required>
			<el-input v-model="updateInfoReq.phone"></el-input>
		</el-form-item>
		<el-form-item label="是否海外或港澳台用户" label-width="180px" required>
			<el-radio-group v-model="updateInfoReq.overseas_user">
				<el-radio :label="0">否</el-radio>
				<el-radio :label="1">是</el-radio>
			</el-radio-group>
		</el-form-item>
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click="updateInfo = false">取 消</el-button>
		<el-button type="primary" @click="subUpdateInfo">确 定</el-button>
	</div>
</el-dialog>
</div>
</template>
<style lang="less" scoped>
.huajian{
	margin-bottom: 10px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.down_box{
	border:1px solid #D9D9D9;
	padding-left: 20px;
	padding-right: 20px;
	height: 32px;
	display: flex;
	align-items: center;
	.down_icon{
		margin-right: 12px;
		width: 18px;
		height: 18px;
	}
	.down_txt{
		font-size: 14px;
		color: #666666;
	}
}
.showimg{
	position: relative;
	width: 200px;
	height: 200px;
	.img{
		border:1px solid #D9D9D9;
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal{
		background: rgba(0,0,0,.6);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		img{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			display:block;
			width: 30px;
			height: 30px;
		}
	}
}
.upload_toast{
	color: #999999;
	font-size: 14px;
}
.shuo{
	font-size: 14px;
	color: #333333;
}
</style>
<script>
	import resource from '../../api/resource.js'
	import uploadFile from '../../components/Upload.vue'
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					name:"",
					id_card_no:"",
					phone:"",
					info_status:"-1",
					sign_status:"-1",
					created_time_start:"",
					created_time_end:"",
					updated_time_start:"",
					updated_time_end:""
				},				//请求参数
				info_status_list:[{
					id:"-1",
					name:"不限"
				},{
					id:"0",
					name:"信息不匹配"
				},{
					id:"1",
					name:"校验通过"
				}],					//信息状态
				sign_status_list:[{
					id:"-1",
					name:"不限"
				},{
					id:"0",
					name:"未签约"
				},{
					id:"1",
					name:"待签约"
				},{
					id:"2",
					name:"已签约"
				},{
					id:"3",
					name:"已失效"
				},{
					id:"4",
					name:"已解约"
				},{
					id:"5",
					name:"即将失效"
				}],					//签约状态
				create_date:[],	//创建时间
				update_date:[],	//更新时间
				dataObj:{},	
				uploadSign:false,		//上传签约用户信息
				isDel:false,			//删除图片遮罩
				fileName:"",
				fileObj:null,
				updateInfo:false,		//修改信息
				info_status:null,		//校验信息是否通过
				updateInfoReq:{
					name:"",
					id_card_no:"",
					phone:"",
					overseas_user:"0"
				},						//提交的用户信息
				
			}
		},
		created(){
			//获取列表
			this.invitationSignList();
		},
		watch:{
			//创建时间
			create_date:function(n){
				this.req.created_time_start = n && n.length> 0?n[0]:"";
				this.req.created_time_end = n && n.length> 0?n[1]:"";
			},
			//更新时间
			update_date:function(n){
				this.req.updated_time_start = n && n.length> 0?n[0]:"";
				this.req.updated_time_end = n && n.length> 0?n[1]:"";
			}
		},
		methods:{
			//获取列表
			invitationSignList(){
				resource.invitationSignList(this.req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//重置
			reset(){
				this.create_date = [];
				this.update_date = [];
				this.req = {
					page:1,
					pagesize:10,
					name:"",
					id_card_no:"",
					phone:"",
					info_status:"-1",
					sign_status:"-1",
					created_time_start:"",
					created_time_end:"",
					updated_time_start:"",
					updated_time_end:""
				}
			},
			//分页
			handleSizeChange(val) {
				this.req.pagesize = val;
				//获取列表
				this.invitationSignList();
			},
			handleCurrentChange(val) {
				this.req.page = val;
				//获取列表
				this.invitationSignList();
			},
			//修改信息
			edit(id,info_status){
				this.info_status = info_status;
				resource.getInfo({invitation_id:id}).then(res => {
					if(res.data.code == 1){
						this.updateInfo = true;
						this.updateInfoReq = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//提交修改用户信息
			subUpdateInfo(){
				if(this.updateInfoReq.name == ''){
					this.$message.warning("请输入用户姓名");
				}else if(this.updateInfoReq.id_card_no == ''){
					this.$message.warning("请输入证件号码");
				}else if(this.updateInfoReq.phone == ''){
					this.$message.warning("请输入预约手机号");
				}else{
					resource.editInfo(this.updateInfoReq).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.updateInfo = false;
							//获取列表
							this.invitationSignList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//点击下载模版
			downTemp(){
				resource.userDownLoad().then(res => {
					if(res.data.code == 1){
						let downUrl = res.data.data;
						window.open(downUrl)
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击上传用户信息
			uploadUserInfo(){
			 	this.uploadSign = true;
			 	this.fileObj = null;
			 },
			//上传文件
			callbackFn(obj){
				var reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
                if (!reg.test(obj.name)) {//校验不通过
                    this.$message.warning("请上传xlsx类型的文件");
                    return;
                }
				this.fileName = obj.name;
				this.fileObj = obj;
			},
			//删除文件
			detele(){
				this.fileName = "";
				this.fileObj = null;
			},
			subUploadSing(){
				if(this.fileName == ""){
					this.$message.warning("请上传文件");
				}else{
					resource.userUpload({invitation_user:this.fileObj}).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.invitationSignList();
							this.uploadSign = false;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			}

		},
		components:{
			uploadFile
		}
	}
</script>













