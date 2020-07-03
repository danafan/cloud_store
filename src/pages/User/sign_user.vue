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
					<el-select v-model="req.info_status" placeholder="不限" clearable>
						<el-option v-for="item in info_status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="签约状态：">
					<el-select v-model="req.sign_status" placeholder="不限" clearable>
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
		<el-button type="primary" size="small" icon="el-icon-upload" @click="uploadSign = true">上传签约用户信息</el-button>
		<div class="but">
			<el-button type="primary" size="small" @click="search">搜索</el-button>
			<el-button type="primary" size="small" @click="exportFile">导出</el-button>
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
	</div>
	<el-table :data="dataObj.order_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
		<el-table-column width="150" fixed prop="shop_num" label="创建时间" align="center">
		</el-table-column>
		<el-table-column width="150" prop="shop_num" label="更新时间" align="center">
		</el-table-column>
		<el-table-column width="150" prop="shop_num" label="用户姓名" align="center">
		</el-table-column>
		<el-table-column width="150" prop="shop_num" label="证件号码" align="center">
		</el-table-column>
		<el-table-column width="150" prop="shop_num" label="预签约手机号" align="center">
		</el-table-column>
		<el-table-column width="150" prop="shop_num" label="是否是海外或港澳台用户" align="center">
		</el-table-column>
		<el-table-column width="150" prop="shop_num" label="信息校验状态" align="center">
		</el-table-column>
		<el-table-column width="150" prop="shop_num" label="签约状态" align="center">
		</el-table-column>
		<el-table-column fixed="right" label="操作" align="center">
			<template slot-scope="scope">
				<el-button type="text" size="small" @click="edit">修改信息</el-button>
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
		<el-form-item label="上传签约用户文件：" required>
			<div class="down_box">
				<img class="down_icon" src="../../assets/down_icon.png">
				<div class="down_txt">下载签约用户模版</div>
			</div>
		</el-form-item>
		<el-form-item label="证件照片：" required>
			<div class="showimg" v-if="req.filename != ''" @mouseenter="isDel = true" @mouseleave="isDel = false">
				<div class="img">这是文件名</div>
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
<el-dialog title="编辑开票信息" :visible.sync="updateInfo">
	<el-form size="small" style="width: 60%;margin: 0 auto">
		<el-form-item label="用户姓名" label-width="180px" required>
			<el-input v-model="updateInfoReq.name"></el-input>
		</el-form-item>
		<el-form-item label="证件号码" label-width="180px" required>
			<el-input v-model="updateInfoReq.id_card_no"></el-input>
		</el-form-item>
		<el-form-item label="预签约手机号" label-width="180px" required>
			<el-input v-model="updateInfoReq.phone"></el-input>
		</el-form-item>
		<el-form-item label="是否海外或港澳台用户" label-width="180px" required>
			<el-radio-group v-model="updateInfoReq.overseas_user">
				<el-radio label="0">否</el-radio>
				<el-radio label="1">是</el-radio>
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
					sign_status:"",
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
				dataObj:{
					order_list:[{
						shop_num:"哈哈哈"
					}],			//列表
					total:100
				},	
				uploadSign:false,		//上传签约用户信息
				isDel:false,			//删除图片遮罩
				uploadSingReq:{
					filename:""
				},
				updateInfo:false,		//修改信息
				updateInfoReq:{
					name:"",
					id_card_no:"",
					phone:"",
					overseas_user:"0"
				},						//提交的用户信息
				
			}
		},
		created(){
			
		},
		watch:{
			//创建时间
			create_date:function(n){
				this.req.created_time_start = n?n[0]:"";
				this.req.created_time_end = n?n[1]:"";
			},
			//更新时间
			update_date:function(n){
				this.req.updated_time_start = n?n[0]:"";
				this.req.updated_time_end = n?n[1]:"";
			}
		},
		methods:{
			//上传签约用户信息
			upload(){

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
				this.req = {
					page:1,
					pagesize:10,
					name:"",
					id_card_no:"",
					phone:"",
					info_status:"-1",
					sign_status:"",
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
				this.getList();
			},
			handleCurrentChange(val) {
				this.req.page = val;
				//获取列表
				this.getList();
			},
			//修改信息
			edit(){
				this.updateInfo = true;
				console.log("sdasd")
			},
			//上传文件
			callbackFn(obj){
				console.log(obj)
				this.req.filename = "asd"
				// this.objReq.banner_img = obj.url;
				// this.domain = obj.domain;
			},
			//删除文件
			detele(){

			},
			//提交已签约用户信息
			subUploadSing(){

			},
			//提交用户信息
			subUpdateInfo(){
				console.log(applyInfo)
			}

		},
		components:{
			uploadFile
		}
	}
</script>













