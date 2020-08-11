<template>
	<view class="taskCollectInfo">
		<view class="pageTitle">收集用户信息</view>
		<view class="box">
			<view class="title">收集敏感信息,可提高任务单价,提高完成度</view>
			<task-input class="taskTotalNum" :show-left-space="false" label="收集信息:" label-color="#000" place-holder="如: 手机号码,银行卡号等"></task-input>
			<task-input class="taskTotalNum" :show-left-space="false" label="信息说明:" label-color="#000" place-holder="可添加信息说明,非必填"></task-input>
		</view>
		<view class="footer flex align-center">
			<button type="default" class="preview">不收集</button>
			<button type="default" class="applyIssue flex1">确认收集</button>
		</view>
	</view>
</template>

<script>
	import taskInput from "@/components/task-input/task-input.vue"
	export default {
		components:{
			taskInput
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.taskCollectInfo{
	height: 100%;
	padding: 30rpx;
	background-color: #fff;
	.pageTitle{
		color: #2C405A;
		font-size: 28rpx;
		font-weight: bold;
	}
	.box{
		margin-top: 20rpx;
		border-radius: 12rpx;
		padding: 30rpx;
		background-color: #eee;
		.title{
			color: #333;
			margin-bottom: 20rpx;
		}
		.taskTotalNum{
			border-radius: 6rpx;
			margin-bottom: 1rpx;
		}
	}
	.footer{
			height: 100rpx;
			padding: 0 20rpx;
			margin-top: 50rpx;
			background-color: #fff;
			.preview{
				color: #666;
				width: 180rpx;
				margin-right: 20rpx;
				background-color: transparent;
				border: 1rpx solid #2C405A;
			}
			.applyIssue{
				color: #fff;
				background-color: #2C405A;
			}
		}
}

</style>
