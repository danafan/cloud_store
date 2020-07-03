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
						<div class="butdf top_up_but">充值</div>
						<div class="butdf zhuan">转账</div>
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
						<div class="butdf top_up_but">充值</div>
						<div class="butdf zhuan">转账</div>
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
			}
		},
		created(){
			//获取顶部信息
			this.getStoreInfo();
		},
		methods:{
			//获取顶部信息
			getStoreInfo(){
				resource.storeInfo().then(res => {
					if(res.data.code == 1){
						this.storeInfo = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			checkTab(type){
				this.active_tab_index = type;
			}
		},
		components:{
			TopUp,
			Payment,
			Collection
		}
		
	}
</script>















