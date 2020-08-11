<template>
	<view class="taskStepPage flex-column">
		<view class="main flex1">
			<view class="item" v-for="(item,index) in items" :key="index">
				<view class="stepTit flex align-center flex-between">
					<view class="flex1">
						<text class="label">步骤:</text>
						<text class="desc">描写本操作步骤详情</text>
					</view>
					<view class="iconBox flex flex-end" v-if="items.length > 1" @click="removeItem(index)">
						<uni-icons class="flex all-center" type="minus-filled" color="red" size="22"></uni-icons>
					</view>
				</view>
				<textarea class="textareaBox" type="text" value="" placeholder="请描述需要用户注意的事项" placeholder-class="holderClass" />
				
				<view class="uploadCard flex">
					<view class="chooseImgBox flex all-center" @click="chooseImg(index)">
						<uni-icons type="plusempty" size="30" color="#999" v-if="!item.imgUrl"></uni-icons>
						<view class="wrap" v-else>
							<image src="../../../static/ali.png" mode="aspectFill"></image>
							<uni-icons class="deleteIcon" type="clear" size="20" color="#999"></uni-icons>
						</view>
					</view>
					<view class="con flex-column justifu-center">
						<view class="title">此为步骤图,用于引导用户操作</view>
						<view class="percent">用户无需上传此图片</view>
					</view>
				</view>
			</view>
			
			<view class="empty"></view>
		</view>
		<view class="footer flex align-center">
			<button type="default" class="preview flex1" @click="addItem">添加步骤 - 最多3步</button>
			<button type="default" class="applyIssue">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[
					{
						detail:'',
						imgUrl:''
					}
				]
			};
		},
		methods:{
			chooseImg(i){
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
								// this.items['imgUrl'] = res.data;
								this.$set(this.items[i],'imgUrl',res.data)
								// this.$emit('choose',this.imgUrl)
							}
						})
					}
				})
			},
			addItem(){
				if(this.items.length == 3){
					this.showToast('最多只能添加3步')
					return
				}
				let item = {
						detail:'',
						imgUrl:''
					}
				this.items.push(item)
			},
			removeItem(i){
				this.items.splice(i,1)
			}
		}
	}
</script>

<style lang="scss" scoped>
.taskStepPage{
	height: 100%;
	.main{
		padding-bottom: 50rpx;
		overflow-y: scroll;
		-webkit-overflow-scrolling:auto;
		.item{
			padding: 30rpx ;
			margin-bottom: 30rpx;
			background-color: #fff;
			&:last-child{
				margin-bottom: 0;
			}
			.stepTit{
				height: 60rpx;
				.label{
					color: #333;
					margin-right: 10rpx;
				}
				.desc{
					color: #999;
				}
				.iconBox{
					width: 100rpx;
				}
			}
			.textareaBox{
				width: auto;
				height: 250rpx;
				font-size: 26rpx;
				margin-top: 10rpx;
				border-radius: 10rpx;
				padding: 10rpx;
				background-color: #eee;
			}
			.uploadCard{
				margin-top: 30rpx;
				.chooseImgBox{
					width: 200rpx;
					height: 200rpx;
					background-color: #eee;
					position: relative;
					.wrap{
						width: 100%;
						height: 100%;
						image{
							width: 100%;
							height: 100%;
						}
						.deleteIcon{
							position: absolute;
							right: -22rpx;
							top: -22rpx;
						}
					}
				}
				.con{
					margin-left: 20rpx;
					.title{
						color: #666;
						font-size: 28rpx;
					}
					.percent{
						color: #666;
						font-size: 26rpx;
					}
				}
			}
			
			.holderClass{
				color: #999;
				line-height: 40rpx;
			}
		}
		.empty{
			height: 50rpx;
		}
	}
	.footer{
		height: 100rpx;
		padding: 0 30rpx;
		background-color: #fff;
		.preview{
			color: #666;
			margin-right: 20rpx;
			background-color: transparent;
			border: 1rpx solid #2C405A;
		}
		.applyIssue{
			color: #fff;
			width: 220rpx;
			background-color: #2C405A;
		}
	}
}
</style>
