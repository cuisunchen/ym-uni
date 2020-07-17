<template>
	<view class="goodLuckPage flex-column">
		<ym-tabs :data-obj="tabs" :tab-index="swiperIndex" @change="tabChange"></ym-tabs>
		
		<!-- <ygc-refresh class="lists flex1"
		    @onRefresh="refresh" 
		    @scrolltolower="infiniteScroll"> -->
				<swiper class="swiper" :current="swiperIndex" :autoplay="false" :duration="500" @change="swiperChage">
					<swiper-item>
						<nationwide v-show="tabIndex == 1" :tab-index="tabIndex"></nationwide>
						<!-- <scroll-view scroll-y>
							<view class="recommendBox">
								<recommend-list :is-title-show="false" :data-obj="recommendList" @click="goDetail"></recommend-list>
							</view>
							
							<view class="listWrap" v-if="list.length > 0">
								<gl-list-item v-for="(item,index) in list" :key="index" :data-obj="item" @click="glDetail(item,index)"></gl-list-item>
								<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
							</view>
							<div class="nodata flex-column align-center" v-if="list.length == 0">
									<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
									<view class="desc">暂无数据</view>
							</div>
						</scroll-view> -->
					</swiper-item>
					
					<swiper-item>
						<same-city-list v-if="tabIndex == 2" :tab-index="tabIndex"></same-city-list>
						<!-- <scroll-view scroll-y>
							<view class="recommendBox">
								<recommend-list :is-title-show="false" :data-obj="recommendList" @click="goDetail"></recommend-list>
							</view>
							
							<view class="listWrap" v-if="list.length > 0">
								<gl-list-item v-for="(item,index) in list" :key="index" :data-obj="item" @click="glDetail(item,index)"></gl-list-item>
								<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
							</view>
							<div class="nodata flex-column align-center" v-if="list.length == 0">
									<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
									<view class="desc">暂无数据</view>
							</div>
						</scroll-view> -->
					</swiper-item>
					
					<swiper-item>
						<nearby-list v-if="tabIndex == 3" :tab-index="tabIndex"></nearby-list>
						<!-- <scroll-view scroll-y>
							<view class="recommendBox">
								<recommend-list :is-title-show="false" :data-obj="recommendList" @click="goDetail"></recommend-list>
							</view>
							
							<view class="listWrap" v-if="list.length > 0">
								<gl-list-item v-for="(item,index) in list" :key="index" :data-obj="item" @click="glDetail(item,index)"></gl-list-item>
								<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
							</view>
							<div class="nodata flex-column align-center" v-if="list.length == 0">
									<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
									<view class="desc">暂无数据</view>
							</div>
						</scroll-view> -->
					</swiper-item>
					<!-- <scroll-view scroll-y>
						<view class="recommendBox">
							<recommend-list :is-title-show="false" :data-obj="recommendList" @click="goDetail"></recommend-list>
						</view>
						
						<view class="listWrap" v-if="list.length > 0">
							<gl-list-item v-for="(item,index) in list" :key="index" :data-obj="item" @click="glDetail(item,index)"></gl-list-item>
							<uni-load-more v-if="pullupLoadingType == 'loading'" :status="pullupLoadingType"></uni-load-more>
						</view>
						<div class="nodata flex-column align-center" v-if="list.length == 0">
								<image class="img" src="../../../static/noData.png" mode="scaleToFill"></image>
								<view class="desc">暂无数据</view>
						</div>
					</scroll-view> -->
				</swiper>
		</ygc-refresh>
	</view>
</template>

<script>
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	import recommendList from "@/components/recommend-list/recommend-list.vue"
	import glListItem from "@/components/gl-list-item/gl-list-item.vue"
	import ymTabs from "@/components/ym-tabs/ym-tabs.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import nationwide from './nationwideList.vue'
	import sameCityList from './sameCityList.vue'
	import nearbyList from './nearbyList.vue'
	export default {
		data() {
			return {
				tabs:['祝您好运','同城活动','附近活动'],
				tabIndex:1,
				swiperIndex: 0,
				list: [],
				recommendDatas:{},
				recommendList: [],
				pullupLoadingType:'more',
				param:{
					"typeId": '1',
					"cityCode": '',
					"pagesNum": 1,
					"pageSize": 8
			  },
			}
		},
		onShow() {
			uni.$on('sendGL', e =>{
				console.log(e)
				this.$set(this.list,e.index,e.data)
			})
		},
		onLoad() {
			this.param.cityCode = uni.getStorageSync('location')? JSON.parse(uni.getStorageSync('location')).adcode : '440306'
			// this.getGoodLuckTask()
			// this.getRecommendData()
		},
		onUnload() {
			 uni.$off('sendGL'); 
		},
		methods: {
			userClick(item){
				let param = {homeAdId : item.homeAdId}
				this.$request('/api/userClick','post',param).then(res => {
					if(res.code != 200){
						this.showToast(res.msg || res.data)
						return
					}
					item.clickNum ++
					this.$set(this.list,index,item)
				})
			},
			getGoodLuckTask(type){
				this.$request('/api/view/goodLuckTask','post',this.param).then(res => {
					uni.hideLoading()
					if(res.code == 200){
						if(type == 'loadmore'){
							this.list.push(...res.data.homeAdList)
						}else{
							this.list = res.data.homeAdList
						}
						
						if(res.data.sumPage == this.param.pagesNum || res.data.sumPage < this.param.pagesNum){
							this.pullupLoadingType = 'noMore'
						}else{
							this.pullupLoadingType = 'more'
						}
					}else{
						this.showToast(res.msg)
					}
				})
			},
			getRecommendData(){
				this.$request('/api/weChat/goodLuck','post',{"cityCode": this.param.cityCode}).then(res => {
					if(res.code == 200){
						this.recommendDatas = res.data
						this.recommendList = this.recommendDatas.nationwide
					}else{
						this.showToast(res.msg)
					}
				})
			},
			tabChange(i){
				console.log(i)
				this.tabIndex = i + 1
				this.param.typeId = this.tabIndex
				this.param.pagesNum = 1
				this.swiperIndex = i
				
				switch (i){
					case 0:
						this.recommendList = this.recommendDatas.nationwide
						break;
					case 1:
						this.recommendList = this.recommendDatas.sameCity
						break;
					case 2:
						this.recommendList = this.recommendDatas.nearby
						break;
				}	
				// this.getGoodLuckTask()
			},
			swiperChage(e){
				this.swiperIndex = e.detail.current
				// if(this.swiperIndex == 0){
				// 	this.param.homeType = 8
				// }else if(this.swiperIndex == 1){
				// 	this.param.homeType = 9
				// }else if(this.swiperIndex == 2){
				// 	this.param.homeType = 0
				// }
				// this.getDatas()
			},
			refresh() {
				this.param.pageSize = 10
				this.param.pageNum = 1
				uni.showLoading({
					title:'加载中'
				})
				this.pullupLoadingType == 'more'
				this.getGoodLuckTask('refresh')
			},
			infiniteScroll() {
				// if(this.param.pagesNum < 5 && this.pullupLoadingType == 'noMore'){
				// 	uni.showModal({
				// 		title:'提示',
				// 		content:'等级不足,邀请好友提升等级,可展示更多广告,获取更多收益!',
				// 		confirmText:'去分享',
				// 		success: (res)=> {
				// 			if (res.confirm) {
				// 					uni.navigateTo({
				// 						url:'../../subPages/download/download'
				// 					})
				// 			}
				// 		}
				// 	})
				// 	return
				// }
				this.param.pagesNum ++
				this.pullupLoadingType = 'loading'
				uni.showLoading({
					title:'加载中'
				})
				this.getGoodLuckTask('loadmore')
			},
			glDetail(data,index){
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)"; 
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服1')
					return
				}
				this.userClick(data)
				
				uni.navigateTo({
					url: '../../subPages/details/details?param='+ encodeURIComponent(JSON.stringify(data)) + '&type=goodLuck&index='+ index
				})
			},
			goDetail(data){
				if(!data.homeBigImgUrl && !data.bigImg && !data.contentImg){return}
				data.bigImg = data.homeBigImgUrl
				var strRegex = "((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)";
				let re=new RegExp(strRegex);
				if (!re.test(data.bigImg)) {
					this.showToast('详情页地址有误,请联系客服')
					return
				}
				uni.navigateTo({
					url: "../../subPages/details/details?param=" + encodeURIComponent(JSON.stringify(data))
				})
			}
		},
		components: {ygcRefresh,recommendList,glListItem,ymTabs,uniLoadMore,nationwide,sameCityList,nearbyList}
	}
</script>

<style>
	page{
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.goodLuckPage{
		height: 100%;
		overflow-y: hidden;
		background-color: #f6f6f6;
		.recommendBox{
			background-color: #fff;
			padding: 20rpx 0 0;
		}
		.swiper{
			height: calc(100% - 50px);
			/deep/ uni-swiper-item{
				overflow-y: scroll;
			}
		}
		.lists{
			overflow-y: scroll;
			/deep/ .uni-scroll-view-content{
				height: calc(100% + 50px);
				.refresh-moudle{
					height: 100%;
				}
			}
			.listWrap{
				padding: 0 20rpx 30rpx;
			}
			.nodata{
				 margin-top: 100rpx;
				 .img{
						width: 150rpx;
						height: 150rpx;
				 }
				 .desc{
						color: #999;
				 }
			}
		}
	}
	
	@keyframes descAnimation {
		0% {
			opacity: 1;
		}
		25% {
			opacity: .5;
		}
		50% {
			opacity: 0;
		}
		75% {
			opacity: .5;
		}
		100% {
			opacity: 1;
		}
	}
	
</style>
