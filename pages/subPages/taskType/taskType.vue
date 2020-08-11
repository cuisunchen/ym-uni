<template>
	<view class="taskTypePage">
		<task-type-card v-for="(item,index) in taskTypes" :key="index" :data-obj="item" :isChecked="currentIndex == index" @click="itemClick(index)"></task-type-card>
	</view>
</template>

<script>
	import taskTypeCard from '../../../components/task-type-card/task-type-card.vue'
	export default {
		components:{
			taskTypeCard
		},
		data() {
			return {
				currentIndex: null,
				taskTypes:[
					{
						title:'下载任务',
						price: 0.30,
						desc:'手机下载APP,电脑下载软件等,推广应用'
					},
					{
						title:'注册任务',
						price: 0.30,
						desc:'APP注册,网站注册等,增加用户'
					},
					{
						title:'关注任务',
						price: 0.30,
						desc:'抖音,快手,今日头条等平台,增加粉丝'
					},
					{
						title:'下载任务',
						price: 0.30,
						desc:'手机下载APP,电脑下载软件等,推广应用'
					},
					{
						title:'注册任务',
						price: 0.30,
						desc:'APP注册,网站注册等,增加用户'
					},
					{
						title:'关注任务',
						price: 0.30,
						desc:'抖音,快手,今日头条等平台,增加粉丝'
					},
					{
						title:'下载任务',
						price: 0.30,
						desc:'手机下载APP,电脑下载软件等,推广应用'
					},
					{
						title:'注册任务',
						price: 0.30,
						desc:'APP注册,网站注册等,增加用户'
					},
					{
						title:'关注任务',
						price: 0.30,
						desc:'抖音,快手,今日头条等平台,增加粉丝'
					},
					{
						title:'下载任务',
						price: 0.30,
						desc:'手机下载APP,电脑下载软件等,推广应用'
					},
					{
						title:'注册任务',
						price: 0.30,
						desc:'APP注册,网站注册等,增加用户'
					},
					{
						title:'关注任务',
						price: 0.30,
						desc:'抖音,快手,今日头条等平台,增加粉丝'
					},
				]
			}
		},
		methods: {
			itemClick(i){
				this.currentIndex = i
			}
		}
	}
</script>

<style lang="scss" scoped>
.taskTypePage{
	padding: 20rpx;
	.taskTypeCard{
		margin-bottom: 20rpx;
	}
}
</style>
