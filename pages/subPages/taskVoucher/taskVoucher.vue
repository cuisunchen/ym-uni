<template>
	<view class="taskVoucherPage">
		<view class="main">
			<textarea class="textareaBox" type="text" value="" placeholder='请准确描述用户所需提交图片的具体要求,如"个人中心页面截图","请勿涂鸦"等' placeholder-class="holderClass" />
			
			<view class="pics flex-wrap">
				<view class="picItem" v-for="(item,index) in pics" :key="index">
					<image :src="item" mode="aspectFill"></image>
					<uni-icons class="deleteIcon" type="clear" size="16" color="#999" @click="remove(index)"></uni-icons>
				</view>
				<view class="uploadCard flex" v-if="pics.length < 3">
					<view class="chooseImgBox flex all-center" @click="chooseImg">
						<uni-icons type="plusempty" size="36" color="#999"></uni-icons>
					</view>
				</view>
			</view>
			<view class="desc">提供示例图可提高用户上传图片的准确性,最多3张</view>
		</view>
		<button class="saveBtn flex all-center" type="default">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pics:[],
			};
		},
		methods:{
			chooseImg(){
				uni.chooseImage({
					count: 1,
					success: res => {
						const tempFilePaths = res.tempFilePaths;
						uni.showLoading({
							title:'图片上传中'
						});
						this.$upload('/image/upload',tempFilePaths[0]).then(res => {
							uni.hideLoading();
							if(res.code=="200"){
								this.pics.push(res.data)
								// this.$emit('choose',this.imgUrl)
							}
						})
					}
				})
			},
			remove(i){
				this.pics.splice(i,1)
			}
		}
	}
</script>

<style lang="scss" scoped>
.taskVoucherPage{
	.main{
		padding: 30rpx 0;
		background-color: #fff;
		.textareaBox{
			width: auto;
			height: 250rpx;
			font-size: 26rpx;
			border-radius: 10rpx;
			padding: 20rpx 30rpx;
		}
		.holderClass{
			color: #999;
			line-height: 40rpx;
		}
		.pics{
			padding: 20rpx 30rpx;
			.picItem{
				width: 150rpx;
				height: 150rpx;
				margin-right: 26rpx;
				margin-bottom: 26rpx;
				position: relative;
				image{
					width: 100%;
					height: 100%;
				}
				.deleteIcon{
					position: absolute;
					right: -18rpx;
					top: -18rpx;
				}
			}
			.chooseImgBox{
				width: 150rpx;
				height: 150rpx;
				border: 2rpx solid #eee;
				border-radius: 6rpx;
			}
		}
		.desc{
			color: #2C405A;
			padding: 0 30rpx;
		}
	}
	.saveBtn{
		color: #fff;
		height: 90rpx;
		margin: 70rpx 30rpx;
		background-color: #2C405A;
	}
}

</style>
