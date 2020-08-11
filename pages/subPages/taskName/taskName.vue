<template>
	<view class="taskNamePage">
		<view class="pageTitle">任务名称:</view>
		<view class="box">
			<view class="title">简单明确,不得超过15个字 如:今日友米下载</view>
			<input class="inputBox" type="text" value="" maxlength="15" placeholder="请输入..." placeholder-class="holderClass" />
		</view>
		<view class="footer flex align-center">
			<button type="default" class="preview">内容重置</button>
			<button type="default" class="applyIssue flex1">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.taskNamePage{
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
		}
		.inputBox{
			height: 70rpx;
			font-size: 26rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;
			padding: 0 10rpx;
			background-color: #fff;
		}
		.holderClass{
			line-height: 70rpx;
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
