<template>
	<view class="taskRequirementPage">
		<view class="pageTitle">任务要求:</view>
		<view class="box">
			<view class="title">如"仅限未注册过的新用户申请此任务",要求简单明了,不得超过80个字,不得使用特殊符号。</view>
			<textarea class="inputBox" maxlength="80" type="text" value="" placeholder="请输入..." placeholder-class="holderClass" />
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
.taskRequirementPage{
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
			height: 160rpx;
			font-size: 26rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;
			padding: 10rpx;
			background-color: #fff;
		}
		.holderClass{
			line-height: 40rpx;
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
