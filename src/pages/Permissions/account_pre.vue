<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="登录用户名：">
					<el-input v-model="req.username" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="联系人姓名：">
					<el-input v-model="req.admin_name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="联系人手机号：">
					<el-input v-model="req.phone" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="联系人邮箱：">
					<el-input v-model="req.email" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="账号状态：">
					<el-select v-model="req.status" placeholder="不限" clearable>
						<el-option v-for="item in status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div class="huajian">
				<el-button type="primary" size="small" icon="el-icon-upload" @click="uploadSign = true">创建</el-button>
				<div class="but">
					<el-button type="primary" size="small" @click="search">搜索</el-button>
					<el-button type="primary" size="small" @click="exportFile">导出</el-button>
					<el-button type="primary" size="small" @click="reset">重置</el-button>
				</div>
			</div>
			<el-table :data="dataObj.order_list" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column width="150" prop="shop_num" label="账号身份" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="登录用户名" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="角色权限" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="联系人姓名" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="联系人手机号" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="联系人邮箱" align="center">
				</el-table-column>
				<el-table-column width="150" prop="shop_num" label="账号状态" align="center">
				</el-table-column>
				<el-table-column fixed="right" label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit">编辑</el-button>
						<el-button type="text" size="small" @click="setting">禁用</el-button>
						<el-button type="text" size="small" @click="resetPassword">重置密码</el-button>
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
	<!-- 修改信息 -->
	<el-dialog title="编辑" :visible.sync="updateInfo">
		<el-form size="small" style="width: 60%;margin: 0 auto">
			<el-form-item label="登录用户名" label-width="180px" required>
				<el-input v-model="updateInfoReq.username"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" label-width="180px" required>
				<el-input v-model="updateInfoReq.admin_email"></el-input>
			</el-form-item>
			<el-form-item label="姓名" label-width="180px" required>
				<el-input v-model="updateInfoReq.admin_name"></el-input>
			</el-form-item>
			<el-form-item label="手机号" label-width="180px" required>
				<el-input v-model="updateInfoReq.username"></el-input>
			</el-form-item>
			<el-form-item label="备注" label-width="180px" required>
				<el-input type="textarea"
				:rows="3" v-model="updateInfoReq.phone"></el-input>
			</el-form-item>
			<el-form-item label="备注" label-width="180px" required>
				<el-checkbox-group v-model="checkList">
					<el-checkbox label="复选框 A"></el-checkbox>
					<el-checkbox label="复选框 B"></el-checkbox>
					<el-checkbox label="复选框 C"></el-checkbox>
				</el-checkbox-group>
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
					username:"",
					admin_name:"",
					email:"",
					status:"1"
				},				//请求参数
				status_list:[{
					id:"0",
					name:"停用"
				},{
					id:"1",
					name:"启用"
				}],					//信息状态
				dataObj:{
					order_list:[{
						shop_num:"哈哈哈"
					}],			//列表
					total:100
				},	
				uploadSign:false,		//上传签约用户信息
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
					username:"",
					admin_name:"",
					email:"",
					status:"1"	
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













