<template>
	<div>
		<el-card>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="税款属期：">
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
			<el-button type="primary" size="small" @click="reset">重置</el-button>
		</div>
		<el-table :data="dataObj.data" border style="width: 100%" :header-cell-style="{'background':'#f4f4f4'}">
			<el-table-column width="300" prop="tax_day" label="所属期" align="center">
			</el-table-column>
			<el-table-column prop="service_subject_name" label="综合服务主体" align="center">
			</el-table-column>
			<el-table-column label="扣缴明细名称" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.service_subject_name}}_{{scope.row.tax_day}}_个人所得税扣缴明细表</span>
				</template>
			</el-table-column>
			<el-table-column prop="email" label="接收扣缴明细解压密码邮箱" align="center">
			</el-table-column>
			<el-table-column prop="title" label="下载状态" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.status == 0 ? '未下载' : '已下载'}}</span>
				</template>
			</el-table-column>
			<el-table-column label="下载信息" align="center">
				<template slot-scope="scope">
					<div v-for="item in scope.row.download_log">{{item}}</div>
				</template>
			</el-table-column>
			<el-table-column width="150" label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="down(scope.row.id)" v-if="scope.row.status == 0">下载明细</el-button>
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
				},				//请求参数
				date:[],	//时间
				dataObj:{},	
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		watch:{
			//时间
			date:function(n){
				this.req.start_time = n && n.length> 0?n[0]:"";
				this.req.end_time = n && n.length> 0?n[1]:"";
			}
		},
		methods:{
			//获取列表
			getList(){
				resource.taxIndex(this.req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//下载
			down(id){
				resource.taxDownload({id:id}).then(res => {
					if(res.data.code == 1){
						let url = res.data.data.url;
						window.open(url);
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//重置
			reset(){
				this.date = [];
				this.req = {
					page:1,
					pagesize:10,
					start_time:"",
					end_time:"",	
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
			}
		}
	}
</script>














v x  ]