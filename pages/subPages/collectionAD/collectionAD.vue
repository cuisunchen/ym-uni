<template>
	<view class="collectionADPage flex-column">
		<ym-tabs class="head" :tab-index="swiperIndex" :data-obj="tabs" @change="tabChage"></ym-tabs>
			<view class="con" >
				<!-- <view class="" v-for="item in 100" :key="item">1111111</view> -->
				<view class="emptyBox"></view>
				<swiper class="swiper" :current="swiperIndex" :autoplay="false" :duration="500" @change="swiperChage">
					<swiper-item>
						<view class="swiper-item swiper-item1">
							<home-list-item v-for="(item,index) in questions" :key="index" :data-obj="item" @click="goDetail(item)"></home-list-item>
							<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
							<view class="nodata flex-column align-center" v-if="questions.length == 0">
									<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
									<view class="desc">暂无数据</view>
							</view>
						</view>
					</swiper-item>
					<!-- <swiper-item>
						<view class="swiper-item swiper-item2">
							<gl-list-item v-for="(item,index) in goodluckList" :key="index" :data-obj="item" @click="goDetail(item)"></gl-list-item>
							<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
							<view class="nodata flex-column align-center" v-if="goodluckList.length == 0">
									<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
									<view class="desc">暂无数据</view>
							</view>
						</view>
					</swiper-item> -->
					<!-- <swiper-item>
						<view class="swiper-item">
							<view class="" v-for="(item,index) in othersList" :key="index"></view>
							<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
							<view class="nodata flex-column align-center" v-if="othersList.length == 0">
									<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
									<view class="desc">暂无数据</view>
							</view>
						</view>
					</swiper-item> -->
				</swiper>
			</view>
				<view class="lists flex1">
					<swiper class="swiper" :current="swiperIndex" :autoplay="false" :duration="500" @change="swiperChage">
						<swiper-item>
							<view class="swiper-item swiper-item1">
								<home-list-item v-for="(item,index) in questions" :key="index" :data-obj="item" @click="goDetail(item)"></home-list-item>
								<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
								<view class="nodata flex-column align-center" v-if="questions.length == 0">
										<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
										<view class="desc">暂无数据</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item swiper-item2">
								<gl-list-item v-for="(item,index) in goodluckList" :key="index" :data-obj="item" @click="goDetail(item)"></gl-list-item>
								<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
								<view class="nodata flex-column align-center" v-if="goodluckList.length == 0">
										<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
										<view class="desc">暂无数据</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item">
								<view class="" v-for="(item,index) in othersList" :key="index"></view>
								<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
								<view class="nodata flex-column align-center" v-if="othersList.length == 0">
										<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
										<view class="desc">暂无数据</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
	</view>
</template>
<script>
	import ymTabs from "@/components/ym-tabs/ym-tabs.vue"
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	import homeListItem from "@/components/home-list-item/home-list-item.vue"
	import glListItem from "@/components/gl-list-item/gl-list-item.vue"
	export default {
		components:{ymTabs,ygcRefresh,homeListItem,glListItem},
		data() {
			return {
				tabs:['接单收藏','好运收藏','其他收藏'],
				pullupLoadingType:'more',
				swiperIndex: 0,
				questions:[],
				goodluckList:[],
				othersList:[],
				param:{
					"homeType": 8,
					"pageNum": 1,
					"pageSize": 10
				},
			}
		},
		created() {
			this.getDatas()
		},
		onPullDownRefresh() {
			this.refresh()
		},
		onReachBottom(){  //上拉触底函数
			this.infiniteScroll()
		},
		methods: {
			getDatas(){
				uni.showLoading({
					title:'加载中'
				})
				this.$request('/api/view/getMyCollect','post',this.param).then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh();
					// console.log(res)
					if(res.code == 200){
						if(this.swiperIndex == 0){
							this.questions = res.data.homeAdList
						}else if(this.swiperIndex == 1){ 
							this.goodluckList = res.data.homeAdList
						}else if(this.swiperIndex == 2){ 
							this.othersList = res.data.homeAdList
						}
						
						if(res.data.sumPage <= this.param.pageNum || res.data.sumPage < this.param.pagesNum){
							this.pullupLoadingType = 'noMore'
						}else{
							this.pullupLoadingType = 'more'
						}
					}else{
						this.showToast(res.msg)
					}
				})
			},
			goDetail(data){
				data.bigImg = data.bigImg ? data.bigImg: data.homeBigImgUrl || data.jumpUrl
				uni.navigateTo({
					url: "../../subPages/details/details?param=" + encodeURIComponent(JSON.stringify(data))
				})
			},
			refresh() {
				this.param.pageNum = 1,
				this.param.pageSize = 10
				this.getDatas()
			},
			infiniteScroll() {
				if(this.pullupLoadingType == 'noMore'){
					return
				}
				this.param.pageNum++
				this.pullupLoadingType = 'loading'
				setTimeout(() => {
					this.pullupLoadingType = 'noMore'
				}, 2000)
			},
			swiperChage(e){
				this.swiperIndex = e.detail.current
				if(this.swiperIndex == 0){
					this.param.homeType = 8
				}else if(this.swiperIndex == 1){
					this.param.homeType = 9
				}else if(this.swiperIndex == 2){
					this.param.homeType = 0
				}
				this.getDatas()
			},
			tabChage(i){
				this.swiperIndex = i
			}
		}
	}
</script>

<style lang="scss" scoped>
.collectionADPage{
	height: 100%;
	.con{
		height: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling:touch;
		.emptyBox{
			height: 100rpx;
			width: 100%;
		}
	}
	.swiper{
		// height: auto;
		height: calc(100% - 50px);
		/deep/ uni-swiper-item{
			overflow-y: scroll;
		}
	}
	/deep/ uni-scroll-view{
		width: auto;
	}
 // 	.lists{
	// 	overflow-y: scroll;
	// 	/deep/ .uni-scroll-view-content{
	// 		height: calc(100% + 100rpx);
	// 		.refresh-moudle{
	// 			height: 100%;
	// 			.down-tip{
	// 				height: 100rpx;
	// 			}
	// 		}
	// 	}
	// 	.swiper{
	// 		height: 100%;
	// 		/deep/ uni-swiper-item{
	// 			overflow-y: scroll;
	// 			&:nth-child(1){
	// 				background-color: #fff;
	// 			}
	// 		}
	// 		.swiper-item{
	// 			height: 100%;
	// 			padding: 0 30rpx;
	// 			overflow: scroll;
	// 			-webkit-overflow-scrolling: touch;
	// 		}
	// 		.swiper-item2{
	// 			height: 100%;
	// 			background-color: #eee;
	// 		}
	// 		.nodata{
	// 			 margin-top: 100rpx;
	// 			 .img{
	// 					width: 150rpx;
	// 					height: 150rpx;
	// 			 }
	// 			 .desc{
	// 					color: #999;
	// 			 }
	// 		}
	// 	}
	// }
}
</style>
