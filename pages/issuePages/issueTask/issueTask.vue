<template>
	<view class="issueTaskPage flex-column">
		<view class="main flex1">
			<task-cell class="taskType" label="任务类型" desc="未选择" link="../../subPages/taskType/taskType"></task-cell>
			<task-cell class="taskName" label="任务名称" desc="未填写" link="../../subPages/taskName/taskName"></task-cell>
			<task-cell class="taskRequirement" label="任务要求" desc="未填写" link="../../subPages/taskRequirement/taskRequirement"></task-cell>
			
			<view class="taskSteps">
				<view class="title">任务步骤:</view>
				<task-cell class="taskUpload" label="上传二维码/链接/文本" desc="未填写" link="../../subPages/taskUpload/taskUpload"></task-cell>
				<task-cell class="taskStep" label="设置任务步骤(选填)" desc="未填写" :show-left-icon="false" link="../../subPages/taskStep/taskStep"></task-cell>
				<task-cell class="taskVoucher" label="用户截图凭证" desc="未填写" link="../../subPages/taskVoucher/taskVoucher"></task-cell>
			</view>
			
			<task-cell class="collectInfo" label="搜集用户信息" desc="不搜集" :show-left-icon="false" link="../../subPages/taskCollectInfo/taskCollectInfo"></task-cell>
			
			<task-input class="taskPrice" label="任务单价:" place-holder="最低0.3元"></task-input>
			<task-input class="taskTotalNum" label="任务总数:" place-holder="任务发布数量需≥10"></task-input>
			
			<view class="tip">
				<view class="tipTit">温馨提示:</view>
				<view class="con">
					<view class="tiptext">1. 用户提交任务后,请在24小时内审核完毕,超期系统会自动审核通过,资金不得追回</view>
					<view class="middleTip tiptext">2. 重复发布相同任务,用户会重复做该任务,您可选择增加任务数量或延迟任务截止时间</view>
					<view class="tiptext">3. 不同任务类型,任务单价不同;单价越高,越受欢迎,排名越高;单价2/3为用户所得,剩余部分按比例返给上级好友</view>
				</view>
			</view>
			
			<view class="payMoneyWrap">
				<view class="payMoney flex flex-end"><view class="label">预付金额(元):</view><view class="money">0.00</view></view>
				<view class="paydesc flex flex-end">(预付金额 = 任务单价 * 任务总数 * 1.1)</view>
			</view>
		</view>
		<view class="footer flex align-center">
			<button type="default" class="preview">预览</button>
			<button type="default" class="applyIssue flex1">申请发布</button>
		</view>
	</view>
</template>

<script>
	import taskCell from "@/components/task-cell/taskCell.vue"
	import taskInput from "@/components/task-input/task-input.vue"
	export default {
		components:{
			taskCell,taskInput
		},
		data() {
			return {
					
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
.issueTaskPage{
	height: 100%;
	.main{
		overflow-y: scroll;
		-webkit-overflow-scrolling:touch;
		.taskType, .collectInfo{
			margin: 20rpx 0;
		}
		.taskName, .taskUpload ,.taskStep, .taskPrice{
			margin-bottom: 1rpx;
		}
		.taskRequirement{
			margin-bottom: 20rpx;
		}
		.taskSteps{
			.title{
				color: #2C405A;
				padding: 20rpx 30rpx 0;
				background-color: #fff;
			}
		}
		.tip{
			padding: 30rpx;
			.tipTit{
				color: orange;
				line-height: 60rpx;
			}
			.tiptext{
				color: #666;
				font-size: 24rpx;
			}
			.middleTip{
				margin: 10rpx 0;
			}
		}
		.payMoneyWrap{
			padding: 50rpx 30rpx;
			.payMoney{
				align-items: flex-end;
				.label{
					color: #000;
					font-size: 24rpx;
					margin-right: 6rpx;
				}
				.money{
					color: red;
					font-size: 44rpx;
					line-height: 44rpx;
				}
			}
			.paydesc{
				color: #999;
			}
		}
		
	}
	.footer{
		height: 100rpx;
		padding: 0 20rpx;
		background-color: #fff;
		.preview{
			color: #666;
			width: 150rpx;
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
