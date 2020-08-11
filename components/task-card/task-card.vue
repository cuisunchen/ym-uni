<template>
	<div class="task row">
		<div class="imgBox">
			<image class="img" src="../../../static/naozhong.png" :autoBitmapRecycleAndroid="false"></image>
		</div>
		<div class="con flex1 flex-column flex-between">
			<text class="title">携程酒店砍一刀</text>
			<text class="done">1944人已赚</text>
			<div class="tags row">
				<text class="tag all-center">下载任务</text>
				<text class="tag">未做</text>
			</div>
		</div>
		<div class="rightCon flex-end">
			<text class="reward">赏4元</text>
			<text class="surplus">剩462名额</text>
		</div>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style scoped>
	.task{
		padding: 30rpx 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
	}
	.imgBox{
		width: 130rpx;
		height: 115rpx;
	}
	.img{
		width: 130rpx;
		height: 115rpx;
	}
	.con{
		padding: 0 20rpx;
	}
	.title{
		font-size: 30rpx;
	}
	.done{
		color: #666;
		font-size: 26rpx;
	}
	.tag{
		color: #666;
		font-size: 24rpx;
		line-height: 20rpx;
		padding: 6rpx;
		background-color: #eee;
		margin-right: 10rpx;
		border-radius: 4rpx;
	}
	.reward{
		color: #4CD964;
		font-size: 32rpx;
		text-align: right;
		margin-bottom: 6rpx;
	}
	.surplus{
		color: orange;
		font-size: 26rpx;
	}
</style>
