import $ from 'jquery'
import layer from 'static/layer/layer'
import { btnReloadClass, windowCenter, setConfig } from 'common/commonClass'
import GridPanel from 'component/gridPanel'
import { getFormatDate } from 'common/method'
import interactForm from 'code/menu/review/interact/interactForm'

export default function reviewInteractGrid(opt) {
	var btns = {
		reload: {
			extraClass: btnReloadClass,
			events: {
				click: function(opt) {
					opt.panel.refresh()
					opt.panel.clearAllItem()
				},
				mouseenter: function(opt) {
					$(opt.btn).addClass('fa-spin')
				},
				mouseleave: function(opt) {
					$(opt.btn).removeClass('fa-spin')
				}
			}
		}
	}
	var operationBtns = {
		edit: {
			extraClass: ['fa', 'fa-eye', 'btn', 'btn-sm', 'btn-info', 'btn-space'],
			events: {
				mouseenter: function(opt) {
					opt.btn.tips = layer.tips('查看详情', opt.btn, {
						tips: [1, '#5bc0de']
					})
				},
				mouseleave: function(opt) {
					layer.close(opt.btn.tips)
				},
				click: function(opt) {
					opt.panel.items['interactForm'] = interactForm({
						owner: opt.panel,
						ownerBtn: opt.panel,
						data: {
							id: opt.tr.getAttribute('uid')
						}
					})
				}
			}
		}
	}
	var fields = [{
		text: '序号',
		type: 'increment',
		style: 'width:45px;'
	}, {
		text: '互动标题',
		name: 'interactionTitle'
	}, {
		text: '互动类型',
		name: 'interactivThemeName'
	}, {
		text: '发布人',
		name: 'publisherNickname'
	}, {
		text: '提交时间',
		name: 'submitTime'
	}, {
		text: '审核状态',
		name: 'auditStatus',
		type: 'enumeration'
	}, {
		text: '审核人',
		name: 'auditName'
	}, {
		text: '审核时间',
		name: 'auditTime'
	}, {
		type: 'operations',
		text: '操作'
	}]
	return new GridPanel(setConfig({
		opt: opt,
		fnName: 'reviewInteractGrid',
		btns: btns,
		operationBtns: operationBtns,
		classGroup: 'GridPanel',
		config: {
			container: windowCenter,
			url: '/auditManagement/getInteractiveContentAuditList',
			type: 'post',
			pageSize: 10,
			pageNo: 1,
			fields: fields,
			title: {
				innerHTML: '审核管理-互动'
			},
			boxExtraClass: ['col-sm-12'],
			render: (opt) => {},
			search: {
				fields: [
					{
						name: 'auditStatus',
						text: '发布状态',
						type: 'select',
						async: {
			              url: '/auditManagement/getAuditStatusList',
			              type: 'post',
			              data: {
			                send: {},
			                set: 'value'
			              }
			            }
					},
					{
						name: 'startTime',
						text: '开始时间',
						type: 'date'
					},
					{
						name: 'endTime',
						text: '结束时间',
						type: 'date'
					}
				]
			}
		}
	}))
}