import tree from "../components/tree";
import treebox from "../components/treebox";
import easyConfirm from "../components/easyConfirm";
import transfer from "../components/transfer";
import timer from "../components/fantTimePicker";
import timeGroup from "../components/fantTimeGroup";
let emptyFunc = (vm) => {

};
/*
 * element框架的封装js
 */
let fantVueElement = {};
fantVueElement.install = function(Vue, options) {
	let keyHandler = function(target, flag) {
		if (!target) {
			return false;
		}
		var selected = "";
		var row = "";
		var index = "";
		var field = "";
		var panel = "";
		var id = target.id;
		panel = target;
		var item = panel.getElementsByTagName("input")[0];
		if (item.focusEvent) {
			item.removeEventListener("focus", item.focusEvent)
		}
		item.addEventListener("focus", item.focusEvent = function(e) {
			selected = this;
			row = this.closest("tr");
		});
		if (panel.keydownEvent) {
			panel.removeEventListener("keydown", panel.keydownEvent);
		}
		panel.addEventListener("keydown", panel.keydownEvent = function(e) {
			switch (e.keyCode) {
				case 37: // left
					if (selected) {
						var ed = "";
						ed = getLastField(row, target, selected);
						if (ed) {
							var form = ed.getElementsByClassName("fant-table-form");
							var clickDiv = "",
								input = "";
							if (ed.getElementsByTagName("input").length > 0) {
								input = ed.getElementsByTagName("input")[0];
							} else if (form.length > 0) {
								clickDiv = form[0].getElementsByClassName("el-form-item__content")[0].childNodes[0];
							} else {
								clickDiv = ed.getElementsByClassName("cell")[0].childNodes[0];
							}
							//延迟聚焦下一个input，修复选择组件回车不聚焦下一个input的问题
							setTimeout(function() {
								if (selected.vueEl) {
									if (selected.vueEl.$el.className.indexOf("el-date-editor") != -1) { //修复日期控件切换焦点后不选择下拉框不消失的问题
										var today = this.$fromArray(this.$getEl(".today"));
										for (let item of today.values()) {
											var a = item.closest(".el-date-picker");
											if (a.isHidden()) {
												continue;
											}
											item.click();
											break;
										}
									}
									selected.vueEl.$children[0].blur();
									selected.blur();
								}
								if (input != "") {
									if (input.vueEl) {
										input.vueEl.$children[0].focus();
									} else {
										input.focus();
									}
								} else {
									clickDiv.click();
								}
							}, 100);
						}
					}
					break;

				case 38: // up
					if (selected) {
						var ed = "";
						ed = getUpField(row, target, selected);
						if (ed) {
							var form = ed.getElementsByClassName("fant-table-form");
							var clickDiv = "",
								input = "";
							if (ed.getElementsByTagName("input").length > 0) {
								input = ed.getElementsByTagName("input")[0];
							} else if (form.length > 0) {
								clickDiv = form[0].getElementsByClassName("el-form-item__content")[0].childNodes[0];
							} else {
								clickDiv = ed.getElementsByClassName("cell")[0].childNodes[0];
							}
							//延迟聚焦下一个input，修复选择组件回车不聚焦下一个input的问题
							setTimeout(function() {
								if (selected.vueEl) {
									if (selected.vueEl.$el.className.indexOf("el-select") != -1 || selected.vueEl.$el.className.indexOf(
											"el-cascader") != -1 || selected.vueEl.$el.className.indexOf("el-date-editor") != -1) {
										return false;
									}
									selected.vueEl.$children[0].blur();
									selected.blur();
								}
								if (input != "") {
									if (input.vueEl) {
										input.vueEl.$children[0].focus();
									} else {
										input.focus();
									}
								} else {
									clickDiv.click();
								}
							}, 100);
						}
					}
					break;

				case 39: // right
					if (selected) {
						var ed = "";
						ed = getNextField(row, target, selected, flag);
						if (ed) {
							var form = ed.getElementsByClassName("fant-table-form");
							var clickDiv = "",
								input = "";
							if (ed.getElementsByTagName("input").length > 0) {
								input = ed.getElementsByTagName("input")[0];
							} else if (form.length > 0) {
								clickDiv = form[0].getElementsByClassName("el-form-item__content")[0].childNodes[0];
							} else {
								clickDiv = ed.getElementsByClassName("cell")[0].childNodes[0];
							}
							//延迟聚焦下一个input，修复选择组件回车不聚焦下一个input的问题
							setTimeout(function() {
								if (selected.vueEl) {
									if (selected.vueEl.$el.className.indexOf("el-date-editor") != -1) { //修复日期控件切换焦点后不选择下拉框不消失的问题
										var today = Vue.fromArray(Vue.getEl(".today"));
										for (let item of today.values()) {
											var a = item.closest(".el-date-picker");
											if (a.isHidden()) {
												continue;
											}
											item.click();
											break;
										}
									}
									selected.vueEl.$children[0].blur();
									selected.blur();
								}
								if (input != "") {
									if (input.vueEl) {
										input.vueEl.$children[0].focus();
									} else {
										input.focus();
									}
								} else {
									clickDiv.click();
								}

							}, 100);
						}
					}
					break;
				case 40: // down
					if (selected) {
						var ed = "";
						ed = getDownField(row, target, selected);
						if (ed) {
							var form = ed.getElementsByClassName("fant-table-form");
							var clickDiv = "",
								input = "";
							if (ed.getElementsByTagName("input").length > 0) {
								input = ed.getElementsByTagName("input")[0];
							} else if (form.length > 0) {
								clickDiv = form[0].getElementsByClassName("el-form-item__content")[0].childNodes[0];
							} else {
								clickDiv = ed.getElementsByClassName("cell")[0].childNodes[0];
							}
							//延迟聚焦下一个input，修复选择组件回车不聚焦下一个input的问题
							setTimeout(function() {
								if (selected.vueEl) {
									if (selected.vueEl.$el.className.indexOf("el-select") != -1 || selected.vueEl.$el.className.indexOf(
											"el-cascader") != -1 || selected.vueEl.$el.className.indexOf("el-date-editor") != -1) {
										return false;
									}
									selected.vueEl.$children[0].blur();
									selected.blur();
								}
								if (input != "") {
									if (input.vueEl) {
										input.vueEl.$children[0].focus();
									} else {
										input.focus();
									}
								} else {
									clickDiv.click();
								}
							}, 100);
						}
					}
					break;
				case 13: // enter 需求变更
					if (selected) {
						var ed = "";
						ed = getNextField(row, target, selected, flag);

						if (ed) {
							var form = ed.getElementsByClassName("fant-table-form");
							var clickDiv = "",
								input = "";
							if (ed.getElementsByTagName("input").length > 0) {
								input = ed.getElementsByTagName("input")[0];
							} else if (form.length > 0) {
								clickDiv = form[0].getElementsByClassName("el-form-item__content")[0].childNodes[0];
							} else {
								clickDiv = ed.getElementsByClassName("cell")[0].childNodes[0];
							}
							//延迟聚焦下一个input，修复选择组件回车不聚焦下一个input的问题
							setTimeout(function() {
								if (selected.vueEl) {
									if (selected.vueEl.$el.className.indexOf("el-date-editor") != -1) { //修复日期控件切换焦点后不选择下拉框不消失的问题
										var today = Vue.fromArray(Vue.getEl(".today"));
										for (let item of today.values()) {
											var a = item.closest(".el-date-picker");
											if (a.isHidden()) {
												continue;
											}
											item.click();
											break;
										}
									}
									selected.vueEl.$children[0].blur();
									selected.blur();
								}
								if (input != "") {
									if (input.vueEl) {
										input.vueEl.$children[0].focus();
									} else {
										input.focus();
									}
								} else {
									clickDiv.click();
								}
							}, 100);
						}
					}
					break;
			}
		});
	}

	//获取指定行的编辑列
	function getEdFields(row) {
		if (row) {
			var tds = row.getElementsByTagName("td");
			var edFields = [];
			Vue.fromArray(tds).forEach(function(item, index) {
				if (item.getElementsByClassName("cell")[0].childNodes.length > 0 && item.getElementsByClassName("cell")[0].innerHTML !=
					"") {
					edFields.push(item);
				}
			});
			return edFields;
		}
	}
	//获取下一个编辑框
	//参数 target:列表对象
	function getNextField(row, target, selected, flag) {
		var result = "";
		var listTarget = "";
		if (!target) {
			return false;
		}
		listTarget = target;
		var edFields = getEdFields(row);
		var selected_ = selected.closest("td");
		for (var i in edFields) {
			var item = edFields[i];
			var index = parseInt(i);
			if (item === selected_ && index + 1 < edFields.length) {
				result = edFields[index + 1];
				if (!result) {
					return false;
				}
				if (result.getAttribute("disabled") && (result.getAttribute("disabled") == 'disabled' || result.getAttribute(
						"disabled") == true)) {
					result = getLastField(row, result);
				}
				return result;
			} else if (item === selected_ && i + 1 >= edFields.length) {
				if (!flag) {
					return;
				}
				var nextRow = row.nextSibling.length != 0 ? row.nextSibling : null;
				var fields = "";
				if (nextRow) {
					fields = getEdFields(nextRow);
					result = fields[0];
					if (result.getAttribute("disabled") && (result.getAttribute("disabled") == 'disabled' || result.getAttribute(
							"disabled") == true)) {
						result = getLastField(nextRow, result);
					}
					return result;
				}
			}
		}
	}
	//获取上一个编辑框
	//参数 target:列表对象
	function getLastField(row, target, selected) {
		var edFields = getEdFields(row);
		var result = "";
		var listTarget = "";
		if (!target) {
			return false;
		}
		listTarget = target;
		var selected_ = selected.closest("td");
		for (var i in edFields) {
			var item = edFields[i];
			var index = parseInt(i);
			if (item === selected_ && index - 1 >= 0) {
				result = edFields[index - 1];
				if (result.getAttribute("disabled") && (result.getAttribute("disabled") == 'disabled' || result.getAttribute(
						"disabled") == true)) {
					result = getLastField(row, result);
				}
				return result;
			} else if (item === selected_ && index - 1 < 0) {
				var lastRow = row.previousSibling;
				var fields = "";
				if (lastRow) {
					fields = getEdFields(lastRow);
					result = fields[fields.length - 1];
					if (result.getAttribute("disabled") && (result.getAttribute("disabled") == 'disabled' || result.getAttribute(
							"disabled") == true)) {
						result = getLastField(lastRow, result);
					}
					return result;
				}
			}
		}
	}
	//获取上一行编辑框
	//参数 target:列表对象
	function getUpField(row, target, selected) {
		var edFields = getEdFields(row);
		var selected_ = selected.closest("td");
		var oindex = Vue.indexOfArray(edFields, selected_);
		var lastRow = "";
		var fields = "";
		var listTarget = "";
		if (!target) {
			return false;
		}
		listTarget = target;
		lastRow = row;
		while (lastRow.previousSibling) {
			lastRow = lastRow.previousSibling;
			// if(lastRow.getElementsByTagName("input").length==0){
			//   lastRow.getElementsByClassName("editBtn")[0].click();
			// }
			fields = getEdFields(lastRow);
			if (fields && fields.length > 0) {
				return fields[oindex];
			}
		}
	}
	//获取下一行编辑框
	//参数 target:列表对象
	function getDownField(row, target, selected) {
		var edFields = getEdFields(row);
		var selected_ = selected.closest("td");
		var oindex = Vue.indexOfArray(edFields, selected_);
		var listTarget = "";
		if (!target) {
			return false;
		}
		listTarget = target;
		var nextRow = "";
		var fields = "";
		nextRow = row;
		while (nextRow.nextSibling.length != 0) {
			nextRow = nextRow.nextSibling;
			// if(nextRow.getElementsByTagName("input").length==0){
			//   nextRow.getElementsByClassName("editBtn")[0].click();
			// }
			fields = getEdFields(nextRow);
			if (fields && fields.length > 0) {
				return fields[oindex];
			}
		}
	}
	Vue.config.fant = Vue.config.fant || {};
	Vue.config.fant.beforeOpenWin = Vue.config.fant.beforeOpenWin || emptyFunc;
	Vue.config.fant.beforeCloseWin = Vue.config.fant.beforeCloseWin || emptyFunc;
	Vue.config.fant.winOnRender = Vue.config.fant.winOnRender || emptyFunc;
	Vue.config.fant.tableBeforeUpdate = Vue.config.fant.tableBeforeUpdate || emptyFunc;

	Vue.config.fant.tableOnRender = Vue.config.fant.tableOnRender || emptyFunc;
	Vue.config.fant.tableOnUpdated = Vue.config.fant.tableOnUpdated || emptyFunc;
	Vue.config.fant.winOnClose = Vue.config.fant.winOnClose || emptyFunc;
	let elementTemp = {
		//弹窗封装
		windowDom: {
			data: function() {
				return {
					visible: this.show ? true : false
				};
			},
			props: {
				show: {
					type: [Boolean, Number],
					default: false
				},
				opt: {
					type: Object,
					required: true
				},
				beforeClose: {
					type: Function
				}
			},
			watch: {
				show: function(val) {
					if (!val) {
						Vue.config.fant.beforeCloseWin(this);
						if (typeof this.beforeClose == "function") {
							this.beforeCloseHandler().then(() => {
								this.visible = false;
							}, err => {
								this.visible = true;
							})
						} else {
							this.visible = false;
						}
					} else {
						this.visible = true;
					}
				},
				visible(val) {
					this.show = val;
				}
			},
			methods: {
				beforeCloseHandler() {
					return new Promise((resolve, reject) => {
						this.beforeClose(resolve);
					});
				},
				handleClose: function(done) {
					this.$emit('update:show', false);
					done();
				},
				open: function() {
					Vue.config.fant.beforeOpenWin(this);
					this.$nextTick(() => {
						//居中
						let elDialog = this.$el.getElementsByClassName("el-dialog")[0];
						if (elDialog.getElementsByClassName('content-wrap')[0] && elDialog.getElementsByClassName('action')[0]) {
							let otherH = 61;
							if (elDialog.getElementsByClassName('content-wrap')[0].hasClass('el-col') || elDialog.getElementsByClassName(
									'content-wrap')[0].hasClass('el-row')) {
								otherH = 51;
							}
							if (elDialog.getElementsByClassName('content-wrap')[0].previousSibling) {
								otherH += elDialog.getElementsByClassName('content-wrap')[0].previousSibling.offsetHeight;
							}
							elDialog.getElementsByClassName('content-wrap')[0].style.height = 'calc(100% - ' + otherH + 'px)';
						} else if (elDialog.getElementsByClassName('content-wrap')[0]) {
							elDialog.getElementsByClassName('content-wrap')[0].style.height = '100%';
						}
						if (this.opt.size !== 'large') {
							let height = elDialog.offsetHeight;
							elDialog.style.height = height + 'px';
							let width = elDialog.offsetWidth;
							elDialog.style.width = width + 'px';
							elDialog.style.top = '50%';
							elDialog.style.left = '50%';
							elDialog.style.marginTop = -(height / 2) + 'px';
							elDialog.style.marginLeft = -(width / 2) + 'px';
						}
						let header = elDialog.getElementsByClassName("el-dialog__header")[0].clientHeight;
						let $f = elDialog.getElementsByClassName("el-dialog__footer");
						let footer = $f.length == 0 ? 0 : $f[0].clientHeight;
						if (elDialog.getElementsByClassName("el-dialog__body").length != 0) {
							elDialog.getElementsByClassName("el-dialog__body")[0].style.height = "calc(100% - " + (header + footer) +
								"px)";
							elDialog.getElementsByClassName("el-dialog__body")[0].style.overflow = "auto";
						}
					})
					this.$emit('open');
				},
				closeEvent: function() {
					this.$emit('close');
				},
				close() {
					this.$el.getElementsByClassName("el-dialog__headerbtn")[0].click();
				},
				opened() {
					Vue.config.fant.winOnRender(this);
					this.$emit('opened');
				},
				closed() {
					Vue.config.fant.winOnClose(this);
					this.$emit('closed');
				}
			},
			created: function() {
				// this.opt.size = this.opt.size?this.opt.size:'small' //默认小号窗口
				var s = this.opt;
				if (s.size) {
					if (s.size === "large") {
						s.width = "100%";
						s.fullscreen = true;
					} else if (s.size === "small") {
						s.width = "596px";
						s.fullscreen = false;
					} else if (s.size === "middle") {
						s.width = "784px";
						s.fullscreen = false;
					}
				}
				var opt_ = {
					title: s.title ? s.title : "提示",
					width: s.width,
					// modalAppendToBody:typeof s.modalAppendToBody === "boolean"?s.modalAppendToBody:true,
					closeonclickmodal: false,
					closeonpressescape: false
				};
				Object.assign(this.opt, this.opt, opt_);
			},
			mounted: function() {
				this.$el.$vueEl = this;
				let height = this.opt.height;
				let width = this.opt.width;
				var elDialog = this.$el.getElementsByClassName("el-dialog")[0];
				elDialog.style.position = 'absolute';
				elDialog.style.marginBottom = '0px';
				if (height) {
					elDialog.style.height = height;
				}
				elDialog.style.minHeight = '150px';
				if (this.opt.size === 'large') {
					elDialog.style.maxHeight = '100%';
				} else {
					elDialog.style.maxHeight = 'calc(100% - 10px)';
				}
				if (!width) {
					elDialog.style.minWidth = '320px';
					elDialog.style.maxWidth = 'calc(100% - 10px)';
				}
				if (typeof this.opt.header === "boolean" && !this.opt.header) {
					elDialog.getElementsByClassName("el-dialog__header")[0].style.display = "none";
				}
			},
			// v-dialogDrag
			template: '<el-dialog ref="elWin" v-dialogDrag  :class="{\'fant-is-show\':visible}" @opened="opened" @open="open" @close="closeEvent" :before-close="handleClose" @closed="closed" :modal="false"  :append-to-body="opt.appendToBody" :close-on-click-modal="opt.closeonclickmodal" :close-on-press-escape="opt.closeonpressescape" :visible.sync="visible" :fullscreen="opt.fullscreen" :width="opt.width"><span slot="title" class="dialog-title"><slot name="title">{{opt.title}}</slot></span><slot></slot><span v-if="opt.footer" slot="footer" class="dialog-footer"><slot name="footer"></slot></span></el-dialog>',
		},
		//日期下拉选择框封装
		dateDom: {
			data: function() {
				return {
					mytime: this.value,
					rangeCuts: [{
						text: '最近一周',
						onClick: function(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick: function(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick: function(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}],
					pickerCuts: [{
						text: '今天',
						onClick: function(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick: function(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick: function(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				}
			},
			props: {
				opt: {
					type: Object,
					required: true
				},
				value: {
					type: [String, Array, Date],
					default: ""
				},
				disabled: {
					type: Boolean,
					default: false
				}
			},
			watch: {
				value: function(val) {
					this.mytime = this.value;
				},
				opt(val) {
					//修复多次选择日期后，日期格式出错的问题
					val.valueFormat = val.valueFormat ? val.valueFormat : (val.type === "datetime" || val.type === "datetimerange") ?
						"yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";
					val.format = val.format ? val.format : (val.type === "datetime" || val.type === "datetimerange") ?
						"yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";
				}
			},
			model: {
				prop: 'value',
				event: 'change'
			},
			methods: {
				change: function(value) {
					this.$emit('change', value);
				},
				focus: function(e) {
					this.$emit('focus', e);
				},
				blur: function(e) {
					this.$emit('blur', e);
				}
			},
			created: function() {
				this.opt.type = this.opt.type ? this.opt.type : "date";
				var shortcuts = (this.opt.type === "date" || this.opt.type === "datetime") ? this.pickerCuts : (this.opt.type ===
					"daterange" || this.opt.type === "datetimerange") ? this.rangeCuts : [];
				this.opt.valueFormat = this.opt.valueFormat ? this.opt.valueFormat : (this.opt.type === "datetime" || this.opt.type ===
					"datetimerange") ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";
				this.opt.format = this.opt.format ? this.opt.format : (this.opt.type === "datetime" || this.opt.type ===
					"datetimerange") ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";
				if (!this.opt.pickerOptions) {
					this.opt.pickerOptions = {};
					this.opt.pickerOptions.shortcuts = shortcuts;
				} else if (typeof this.opt.pickerOptions === "object" && !this.opt.pickerOptions.shortcuts) {
					this.opt.pickerOptions.shortcuts = shortcuts;
				}
			},
			mounted: function() {
				var $input = this.$el.getElementsByTagName("input")[0];
				//将vue对象绑定在input里面
				$input.vueEl = this;
			},
			template: '<el-date-picker :style="{width:opt.width,height:opt.height}" v-model="mytime" @blur="blur" @focus="focus" @change="change" :readonly="opt.readonly" :disabled="disabled" :editable="opt.editable" :type="opt.type" :placeholder="opt.prompt" :clearable="opt.clearable" :size="opt.size?opt.size:\'small\'" :format="opt.format" :popper-class="opt.popperClass" :picker-options="opt.pickerOptions"  :default-value="opt.defaultValue" :default-time="opt.defaultTime" :clear-icon="opt.clearIcon" :prefix-icon="opt.prefixIcon" :value-format="opt.valueFormat" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>'
		},
		//级联下拉选择框封装
		cascaderDom: {
			data: function() {
				return {
					mydata: this.data,
					myvalue: this.value,
					//定义url接口的返回数据参数名,data为空时，直接取返回对象,为next的时候，直接取树的下一级数据
					dataProp: this.opt.dataProp ? this.opt.dataProp : {
						data: "data"
					},
				}
			},
			props: {
				opt: {
					type: Object,
					required: true
				},
				data: {
					type: Array,
					default: function() {
						return [];
					}
				},
				beforeFilter: {
					type: Function
				},
				value: {
					type: Array,
					default: function() {
						return [];
					}
				},
				disabled: {
					type: Boolean,
					default: false
				}
			},
			watch: {
				value: function() {
					this.myvalue = this.value;
				},
				data(value) {
					this.mydata = value;
				}
			},
			model: {
				prop: 'value',
				event: 'change'
			},
			methods: {
				change: function(value) {
					this.$emit('change', value);
				},
				focus: function(e) {
					this.$emit('focus', e);
				},
				blur: function(e) {
					this.$emit('blur', e);
				},
				activeItemChange: function(arr) {
					this.$emit('active-item-change', arr);
				},
				reload: function() {
					if (!this.opt.url) {
						return false;
					}
					var data = this.opt.postData || {};
					if (this.opt.extendParams) data = this.$assign(data, this.opt.extendParams)
					var vm = this;
					this.$ajax({
						url: this.opt.url,
						method: this.opt.method ? this.opt.method : "post",
						data: data,
						emulateJSON: this.opt.emulateJSON ? this.opt.emulateJSON : false,
						success: function(re) {
							if (vm.dataProp.data == "") {
								Vue.set(vm, "mydata", re ? re : []);
							} else {
								Vue.set(vm, "mydata", ___getDeep(re, vm.dataProp.data) ? ___getDeep(re, vm.dataProp.data) : []);
							}
						}
					});
				}
			},
			created: function() {
				this.opt.props = typeof this.opt.props === "object" ? this.opt.props : {
					value: "id",
					label: "text"
				};
				this.opt.width = typeof this.opt.width === "string" ? this.opt.width : typeof this.opt.width === "number" ? this
					.opt.width + "px" : "200px";
				this.opt.height = typeof this.opt.height === "string" ? this.opt.height : typeof this.opt.height === "number" ?
					this.opt.height + "px" : null;
				//设置url后，data会失效
				if (this.opt.url && typeof this.opt.url === "string") {
					this.reload();
				}
			},
			template: '<el-cascader :style="{width:opt.width,height:opt.height}" :options="mydata" v-model="myvalue" :props="opt.props" :popper-class="opt.popperClass" :placeholder="opt.prompt" :disabled="disabled" :clearable="opt.clearable" :expand-trigger="opt.expandTrigger?opt.expandTrigger:\'click\'" :show-all-levels="opt.showAllLevels" :filterable="opt.filterable" :change-on-select="opt.changeOnSelect" :size="opt.size?opt.size:\'small\'" :before-filter="beforeFilter" @change="change" @active-item-change="activeItemChange" @blur="blur" @focus="focus"></el-cascader>'
		},
		//下拉选择框封装
		selectDom: {
			data: function() {
				return {
					mydata: this.data,
					//定义url接口的返回数据参数名,data为空时，直接取返回对象
					dataProp: this.opt.dataProp ? this.opt.dataProp : {
						data: ""
					},
					oldVal: "",
					ref: false,
					add: false,
					actionBar: false,
					myvalue: this.value,
				}
			},
			props: {
				opt: {
					type: Object,
					default: function() {
						return {};
					}
				},
				data: {
					type: Array,
					default: function() {
						return [];
					}
				},
				localSearch: {
					type: Function
				},
				value: {
					type: [String, Number, Object, Array, Boolean],
					default: ""
				},
				disabled: {
					type: Boolean,
					default: false
				},
				auth: {
					type: Object,
					default () {
						return {};
					}
				}
			},
			watch: {
				data(value) {
					this.mydata = value;
				},
				value(value) {
					this.myvalue = value;
					let arr = this.mydata.filter(item => item[this.opt.idField] === value);
					if (arr.length === 0) {
						this.myvalue = '';
					}
				}
			},
			model: {
				prop: 'value',
				event: 'change'
			},
			methods: {
				change: function(value) {
					let obj = [];
					if (this.opt.idField) {
						obj = this.mydata.filter(item => item[this.opt.idField] == value);
						this.$emit('change', value, obj[0]);
					} else {
						this.$emit('change', value);
					}
				},
				focus: function(e) {
					this.$emit('focus', e);
				},
				blur: function(e) {
					this.$emit('blur', e);
				},
				clearValue: function() {
					this.$emit('clear');
				},
				clearData() {
					this.$set(this, "mydata", []);
				},
				clear() {
					this.myvalue = '';
					this.$emit('clear');
				},
				visibleChange(bool) {
					//修复有下拉图标的可搜索下拉框多次点击下拉图标隐藏显示下拉框时失效的问题
					if (!bool && this.$el.getElementsByClassName("el-select__caret").length > 0) {
						const $icon = this.$el.getElementsByClassName("el-select__caret")[0];
						$icon.removeClass("iconClick");
					}
					this.$emit('visible-change', bool);
				},
				removeTag: function(value) {
					this.$emit('remove-tag', value);
				},
				remoteSearch: function(query) {
					var vm = this;
					if (this.opt.remote && this.oldVal != query) {
						var key = "searchKey";
						if (typeof this.opt.searchKey === "string") {
							key = this.opt.searchKey;
						}
						var data = {};
						this.oldVal = query;
						data[key] = query;
						this.reload(data);
					}
				},
				reload: function(data) {
					// let value = this.value;
					// this.myvalue = '';
					if (!this.opt.url) {
						return false;
					}
					data = data || {};
					if (this.opt.extendParams) data = this.$assign(data, this.opt.extendParams)
					this.$ajax({
						url: this.opt.url,
						method: this.opt.method ? this.opt.method : "post",
						data: data,
						success: (re) => {
							if (this.dataProp.data == "") {
								this.$set(this, "mydata", re ? re : []);
							} else {
								this.$set(this, "mydata", ___getDeep(re, this.dataProp.data) ? ___getDeep(re, this.dataProp.data) : []);
							}
							this.$nextTick(() => {
								let value = this.myvalue;
								let _item = this.mydata.filter(item => item[this.opt.idField] == value);
								if (_item.length == 0) {
									this.myvalue = '';
								} else {
									this.myvalue = value;
								}
								this.$emit('reloadSuccess');
							});
						}
					});
				},
				actionAdd() {
					if (this.opt.toolsBar.addFunc) {
						eval(this.opt.toolsBar.addFunc())
					} else if (self !== top && this.opt.toolsBar.addUrl) {
						var $root = window.parent.$vueEl.$children[0];
						$root.tabOpen(this.opt.toolsBar.title, this.opt.toolsBar.addUrl);
					}
				},
				actionRef() {
					this.reload();
				}
			},
			created: function() {
				var s = this.opt;
				this.actionBar = s.toolsBar || this.$slots.action;
				if (s.toolsBar) {
					this.ref = s.toolsBar.ref;
					this.add = s.toolsBar.addUrl || typeof s.toolsBar.addFunc === 'function' ? true : false;
				}
				if (typeof s.columns == "object") {
					this.opt.panelWidth = typeof this.opt.panelWidth == "string" ? this.opt.panelWidth : typeof this.opt.panelWidth ==
						"number" ? this.opt.panelWidth + "px" : "500px";
					var sum = 0;
					for (var i in s.columns) {
						s.columns[i].width = s.columns[i].width ? s.columns[i].width : 10;
						sum += s.columns[i].width;
					}
					for (var i in this.opt.columns) {
						this.opt.columns[i].width = s.columns[i].width / sum * 100;
					}
				}
				var opt_ = {
					width: typeof s.width == "string" ? s.width : typeof s.width == "number" ? s.width + "px" : null,
					filterable: typeof s.filterable != "undefined" ? s.filterable : true,
					idField: s.idField ? s.idField : false,
					textField: s.textField ? s.textField : "name"
				};
				Object.assign(this.opt, this.opt, opt_);
			},
			mounted: function() {
				var panel = this.$el.getElementsByClassName("el-popper")[0];
				panel.style.width = this.opt.panelWidth;
				//设置url后，data会失效
				if (this.opt.url && typeof this.opt.url === "string") {
					this.reload();
				}
				if (this.actionBar) {
					panel.getElementsByClassName("el-select-dropdown__wrap")[0].addClass("fant-footer-add");
					if (panel.getElementsByClassName("el-select-dropdown__empty").length === 1) {
						panel.getElementsByClassName("el-scrollbar")[0].show();
						panel.insertBefore(panel.getElementsByClassName("el-select-dropdown__empty")[0], panel.childNodes[0]);
					}
				}
				if (this.opt.columns) {
					panel.getElementsByClassName("el-select-dropdown__wrap")[0].addClass("fant-header-add");
				}
				this.$nextTick(() => {
					let toolsBar = this.$refs.toolsBar
					if (toolsBar) {
						let dropdowm = toolsBar.closest(".el-select-dropdown__wrap");
						if (dropdowm.style.marginBottom) {
							let bottom = parseFloat(dropdowm.style.marginBottom.replace('px', ''));
							dropdowm.style.marginBottom = 30 + bottom + 'px';
						}
					}
				});
				//修复有下拉图标的可搜索下拉框多次点击下拉图标隐藏显示下拉框时失效的问题
				if (this.$el.getElementsByClassName("el-select__caret").length > 0) {
					const $icon = this.$el.getElementsByClassName("el-select__caret")[0];
					$icon.addEventListener("click", () => {
						if ($icon.hasClass("is-reverse") && $icon.hasClass("iconClick")) {
							this.$el.getElementsByTagName("input")[0].click();
							this.$el.getElementsByTagName("input")[0].click();
						} else if ($icon.hasClass("is-reverse")) {
							setTimeout(() => {
								this.$children[0].blur();
							}, 50);
						} else {
							$icon.addClass("iconClick");
						}
					});
				}

				var $input = this.$el.getElementsByTagName("input")[0];
				//将vue对象绑定在input里面
				$input.vueEl = this;
			},
			template: '<el-select :disabled="disabled" :value-key="opt.valueKey" :style="{width:opt.width,height:opt.height}" :name="opt.name" :remote="opt.remote" :clearable="opt.clearable" :size="opt.size?opt.size:\'small\'" :value="myvalue" @change="change" @focus="focus" @blur="blur"  @visible-change="visibleChange" @remove-tag="removeTag" @clear="clearValue" :multiple="opt.multiple" popper-class="selectMain" :filterable="opt.filterable" :filter-method="localSearch" :remote-method="remoteSearch" :placeholder="opt.prompt"><div class="fant-select-header" v-if="opt.columns"><span v-for="val in opt.columns" :style="{ display: \'inline-block\',width: val.width + \'%\' }">{{val.name}}</span></div><el-option :disabled="item.disabled" v-for="(item,index) in mydata" :key="opt.idField?item[opt.idField]:item[opt.textField]" :label="item[opt.textField]" :value="opt.idField?item[opt.idField]:item"><span :style="{ display: \'inline-block\',width: val.width + \'%\' }" v-for="val in opt.columns">{{val.formatter?val.formatter(item[val.key],item,index):item[val.key]}}</span></el-option><div ref="toolsBar" class="fant-select-toolsBar" v-if="actionBar"><slot name="action"><el-button v-if="add && $hasAuth(auth.add)" type="text" class="el-icon-fant-addition" @click="actionAdd">新增</el-button><el-button type="text" v-if="ref" class="el-icon-fant-refresh" @click="actionRef">刷新</el-button></slot></div></el-select>',
		},
		//form封装
		formDom: {
			props: {
				opt: {
					type: Object,
					default: function() {
						return {};
					}
				},
				model: {
					type: Object
				}
			},
			watch: {
				opt(val) {
					val.labelPosition = val.labelPosition ? val.labelPosition : "right";
					val.labelWidth = val.labelWidth ? val.labelWidth : "120px";
				}
			},
			methods: {
				myValidate: function(prop, valid) {
					this.$emit('validate', prop, valid);
				},
				validate(callback) {
					return this.$children[0].validate(callback);
				},
				validateField(prop, callback) {
					return this.$children[0].validateField(prop, callback);
				},
				resetFields() {
					this.$children[0].resetFields();
				},
				clearValidate(props) {
					return this.$children[0].clearValidate(props);
				}
			},
			created: function() {
				if (typeof this.opt === "object") {
					this.opt.labelPosition = this.opt.labelPosition ? this.opt.labelPosition : "right";
					this.opt.labelWidth = this.opt.labelWidth ? this.opt.labelWidth : "120px";
				}
			},
			mounted() {
				this.$el.$vueEl = this;
			},
			template: '<el-form :model="model" @submit.native.prevent :label-position="opt.labelPosition" :label-width="opt.labelWidth" :rules="opt.rules" :inline="opt.inline" :label-suffix="opt.labelSuffix" :show-message="opt.showMessage" :inline-message="opt.inlineMessage" :status-icon="opt.statusIcon" :size="opt.size?opt.size:\'small\'" @validate="myValidate"><slot></slot></el-form>'
		},
		//formItem封装
		formItemDom: {
			props: {
				opt: {
					type: Object,
					default: function() {
						return {};
					}
				},
			},
			// watch:{
			//     opt(val){
			//         val.labelPosition = val.labelPosition?val.labelPosition:"right";
			//         val.labelWidth = val.labelWidth?val.labelWidth:"120px";
			//     }
			// },
			created: function() {
				if (typeof this.opt === "object") {
					this.opt.label = this.opt.label ? this.opt.label : "";
				}
			},
			updated() {
				let width = '100%'
				if (this.$el.getElementsByClassName('el-form-item__label').length > 0) {
					width = 'calc(100% - ' + (this.$el.getElementsByClassName('el-form-item__label')[0].offsetWidth + 1) + 'px)'
				}
				this.$el.getElementsByClassName("el-form-item__content")[0].style.width = width
			},
			mounted() {
				let width = '100%'
				if (this.$el.getElementsByClassName('el-form-item__label').length > 0) {
					width = 'calc(100% - ' + (this.$el.getElementsByClassName('el-form-item__label')[0].offsetWidth + 1) + 'px)'
				}
				this.$el.getElementsByClassName("el-form-item__content")[0].style.width = width
			},
			template: '<el-form-item :label="opt.label" :prop="opt.prop" :label-width="opt.labelWidth" :required="opt.required" :rules="opt.rules" :error="opt.error" :show-message="opt.showMessage" :inline-aaa="opt.inlineMessage" :size="opt.size?opt.size:\'small\'"><slot></slot></el-form-item>'
		},
		//用于表格的编辑行
		tableFormDom: {
			data: function() {
				var vm = this;
				var columns = this.$parent.$parent.$parent.columns;
				var rules_ = {};
				let formatter_ = "";
				columns.map(function(i) {
					if (i.prop == vm.scope.column.property) {
						rules_[vm.prop] = i.rules ? i.rules : [];
						if (i.required) {
							rules_[vm.prop].push({
								required: true,
								trigger: 'change',
								message: '此项不能为空'
							});
						}
						formatter_ = i.formatter ? i.formatter : "";
					}
				});
				return {
					rules: rules_,
					formatter: formatter_
				}
			},
			props: {
				scope: {
					type: Object,
					required: true
				},
				prop: {
					type: String,
					required: true
				}
			},
			mounted() {
				if (this.formatter && this.scope.row) {
					this.$set(this.scope.row, this.prop, this.formatter(this.scope.row, this.scope.column, this.scope.row[this.prop]));
				}
			},
			updated() {
				if (this.$el.closest(".el-dialog__wrapper") && this.$el.closest(".el-dialog__wrapper").isHidden()) {
					//解决弹窗关闭前表格验证不会自动关闭，并且再次打开弹窗时验证依然存在的问题
					this.$refs.fantForm.clearValidate();
				}
			},
			template: '<fant-form ref="fantForm" :model="scope.row" :class="\'form-row-\'+scope.$index+\' row\'+scope.$index+\'-\'+prop+\' fant-table-form\'" :opt="{rules:rules,inlineMessage:true}"><el-form-item :prop="prop"><slot></slot></el-form-item></fant-form>'
		},
		//table封装
		tableDom: {
			data: function() {
				return {
					mydata: this.data,
					//定义url接口的分页参数名
					pageProp: this.opt.page && this.page.pageProp ? this.page.pageProp : {
						pageSize: "pageSize",
						currentPage: "pageNo"
					},
					//定义url接口的返回数据参数名
					dataProp: this.opt.dataProp ? this.opt.dataProp : {
						data: "rows",
						total: "totalCount"
					},
					selected: {},
					page_: {},
					//存放上一次的参数和url
					oldParams: {},
					oldUrl: '',
					cloumnArr:[],
					cellIndex:-1,
				}
			},
			model: {
				prop: 'data',
				event: 'getdata'
			},
			watch: {
				data(val) {
					this.mydata = val;
				},
				mydata(val) {
					this.$emit("getdata", val);
				},
				cloumnArr:{
					handler(val){
						if(val){
							this.handlerData();
						}
					},
					deep:true,
					immediate:true
				}
			},
			props: {
				opt: {
					type: Object,
					default: function() {
						return {};
					}
				},
				columns: {
					type: Array,
					required: true
				},
				page: {
					type: Object,
					default: function() {
						return {};
					}
				},
				data: {
					type: Array,
					required: true
				}
			},
			methods: {
				formatter(row, column, prop, format) {
					let val = typeof row[prop] != 'undefined' ? row[prop] : format;
					this.$set(row, prop, val);
					return format;
				},
				currentChange: function(currentRow, oldCurrentRow) {
					if (!this.opt.multiple) {
						this.selected = currentRow;
					}
					this.$emit('current-change', currentRow, oldCurrentRow);
				},
				select:function(selection, row){
				  //系统定制的多选单选并存的选中特例
				  if(this.opt.multiple && this.opt.checkOnSelect){
					  let index = this.mydata.indexOf(row);
					  if(this.opt.spanMethod && this.opt.selectAll){  // 如果是合并的表格 点击选中所有合并的列
						  let sameData=this.mydata.filter(item=>item.order==row.order);
						  if(selection.indexOf(row) == -1){
							 sameData.forEach(item=>{
								 this.$refs.elTable.toggleRowSelection(item,false);
								 this.$set(item,'$checked',false)
							 });
						  }else{
							  sameData.forEach(item=>{
								 this.$refs.elTable.toggleRowSelection(item,true);
								 this.$set(item,'$checked',true)
							  });				 
							 
						  }
						  return;
					  }
					  if(selection.indexOf(row) == -1){
						  row.$checked = false;
					  }else{
						 row.$checked = true;
						  
					  }
				  }
				  this.selected = selection;
				  this.$emit('select', selection, row);
				},
				selectAll: function(selection) {
					//系统定制的多选单选并存的选中特例
					if (this.opt.multiple && this.opt.checkOnSelect) {
						this.mydata.forEach((item, index) => {
							if (selection.length == 0) {
								item.$checked = false
							} else {
								item.$checked = true;
							}
						});
					}
					this.selected = selection;
					this.$emit('select-all', selection);
				},
				selectionChange: function(selection) {
					this.selected = selection;
					this.$emit('selection-change', selection);
				},
				cellMouseEnter: function(row, column, cell, event) {
					if(this.opt.spanMethod){
						this.mydata.forEach((item) => {
						if (row.order === item.order) {
						  this.cellIndex = row.order;
						}
					  })
					}
					this.$emit('cell-mouse-enter', row, column, cell, event);
				},
				cellMouseLeave: function(row, column, cell, event) {
					if(this.opt.spanMethod){
						this.cellIndex=-1;  
					}
					this.$emit('cell-mouse-leave', row, column, cell, event);
				},
				cellClick: function(row, column, cell, event) {
					this.$emit('cell-click', row, column, cell, event);
				},
				cellDblclick: function(row, column, cell, event) {
					this.$emit('cell-dblclick', row, column, cell, event);
				},
				clearSelection() {
					this.$refs.elTable.clearSelection();
				},
				toggleAllSelection() {
					this.$refs.elTable.toggleAllSelection();
					let selected = this.selected.length != 0;
					this.mydata.forEach(item => {
						item.$checked = selected;
					});
				},
				toggleRowSelection(row, selected) {
					this.$refs.elTable.toggleRowSelection(row, selected);
					if (typeof selected !== 'undefined') {
						row.$checked = selected;
					} else {
						row.$checked = this.selected.indexOf(row) != -1;
					}
				},
				// rowClick: function(row, column, event) {
				// 	//系统定制的多选单选并存的选中特例

				// 	if (this.opt.multiple && this.opt.checkOnSelect) {
				// 		//需要触发select事件
				// 		if(event.target.closest('tr')){
				// 			event.target.closest('tr').getElementsByClassName('el-checkbox')[0].click();
				// 			// this.$refs.elTable.toggleRowSelection(row);
				// 			if (event.target.closest('tr').hasClass('fant-current-row')) {
				// 				this.$refs.elTable.setCurrentRow();
				// 				row.$checked = false;
				// 			} else {
				// 				this.$refs.elTable.setCurrentRow(row);
				// 				row.$checked = true;
				// 			}
				// 		}
						
				// 	}
				// 	this.$emit('row-click', row, event, column);
				// },
				rowClick:function(row, column, event){
				  //系统定制的多选单选并存的选中特例
				  if(this.opt.multiple && this.opt.checkOnSelect){
					  //需要触发select事件
					  // event.target.closest('tr').getElementsByClassName('el-checkbox')[0].click();
					  // this.$refs.elTable.toggleRowSelection(row);
					  if(this.opt.spanMethod && this.opt.selectAll){  // 如果是合并的表格 点击选中所有合并的列
							let sameData=this.mydata.filter(item=>item.order==row.order);
						  if(event.target.closest('tr').hasClass('fant-current-row')){
							 sameData.forEach(item=>{
								 this.$refs.elTable.toggleRowSelection(item,false);
								 this.$set(item,'$checked',false)
							 });
						  }else{
							  sameData.forEach(item=>{
								 this.$refs.elTable.toggleRowSelection(item,true);
								 this.$set(item,'$checked',true)
							  });				 
							 
						  }
						  return;
					  }
					  event.currentTarget.closest('tr').getElementsByClassName('el-checkbox')[0].click();
					  if(event.currentTarget.closest('tr').hasClass('fant-current-row')){
						  this.$refs.elTable.setCurrentRow();
						   this.$set(row,'$checked',false);
					  }else{
						  this.$refs.elTable.setCurrentRow(row);
						  this.$set(row,'$checked',true);
					  }
				
				  }
				  this.$emit('row-click', row, event, column);
				},
				rowContextmenu: function(row, column, event) {
					this.$emit('row-contextmenu', row, event);
				},
				rowDblclick: function(row, column, event) {
					this.$emit('row-dblclick', row, event);
				},
				sortChange: function(opt) {
					this.$emit('sort-change', opt);
				},
				headerDragend: function(newWidth, oldWidth, column, event) {
					this.$emit('header-dragend', newWidth, oldWidth, column, event);
				},
				nextClick: function(page) {
					this.$emit('next-click', page);
				},
				prevClick: function(page) {
					this.$emit('prev-click', page);
				},
				sizeChange: function(pagesize) {
					this.$set(this.page, "pageSize", pagesize);
					this.$set(this.page, "currentPage", 1);
					if (this.opt.url) {
						this.page_[this.pageProp.currentPage] = 1;
						this.page_[this.pageProp.pageSize] = pagesize;
						this.reload();
					}
					this.$emit('size-change', pagesize);
				},
				pageChange: function(page) {
					this.$set(this.page, "currentPage", page);
					if (this.opt.url) {
						this.page_[this.pageProp.currentPage] = page;
						this.page_[this.pageProp.pageSize] = this.page.pageSize;
						this.reload();
					}
					this.$emit('page-change', page);
				},
				validate(index, fn) {
					let arr = this.$fromArray(this.$el.getElementsByClassName("form-row-" + index));
					let valid_ = true;
					if (arr.length > 0) {
						arr.forEach(item => {
							if (item.getElementsByTagName('input').length > 0) {
								item.$vueEl.validate(valid => {
									valid_ = valid_ && valid;
								});
							}
						});
					}
					eval(fn(valid_));
				},
				getSummaries: function(param) {
					const vm = this;
					const columns_ = [];
					vm.columns.forEach(item => {
						if (!item.hidden) {
							columns_.push(item);
						}
					});
					let columns = this.$deepCopy(param.columns),
						data = param.data;
					if (this.opt.multiple) {
						// columns.splice(0,1);
					}

					const sums = [];
					let that = this;
					let showTextIndex = that.opt.showTextIndex || 0;
					columns.forEach(function(column, index) {
						if (index === showTextIndex) {
							sums[index] = that.opt.showSummaryText || '合计：';
							return;
						}
						// // console.log(columns_[index].sum)
						// if(!columns_[index].sum){
						//   return;
						// }
						//	  	              const values = data.map(item => Number(item[column.property]));
						const values = data.map(function(item) {
							return Number(item[column.property]);
						});
						let showIndex = that.opt.showSummaryIndex || 4;
						let isArray = that.opt.showSummaryIndex instanceof Array;

						if (!isArray && index == showIndex && !values.every(function(value) {
								return isNaN(value)
							})) {
							sums[index] = values.reduce(function(prev, curr) {
								const value = Number(curr);

								if (!isNaN(value)) {
									return prev + curr;
								} else {
									return prev;
								}
							}, 0);
							sums[index] = (that.opt.showSummaryVal || that.opt.showSummaryVal == '') ?
								(typeof that.opt.showSummaryVal == 'string' ? that.opt.showSummaryVal : Number(that.opt.showSummaryVal).toFixed(
									2).replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,')) :
								vm.formatMoney(Math.abs(sums[index]));

						} else if (isArray && !values.every(function(value) {
								return isNaN(value)
							})) {
							that.opt.showSummaryIndex.forEach((list, listIndex) => {
								if (index == list) {
									sums[index] = values.reduce(function(
										prev, curr) {
										const value = Number(curr);
										if (!isNaN(value)) {
											return prev + curr;
										} else {
											return prev;
										}
									}, 0);
									sums[index] = that.opt.showSummaryVal ?
										(
											columns[list].property.indexOf('Num') > -1 ?
											Number(that.opt.showSummaryVal[listIndex]).toFixed(0).replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,') :
											Number(that.opt.showSummaryVal[listIndex]).toFixed(2).replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,')
										) :
										vm.formatMoney(Math.abs(sums[index]));
								}
							})
						} else {
							sums[index] = '';
						}
						// console.log(sums)
					});
					return sums;
				},
				refresh: function() {
					this.page_[this.pageProp.currentPage] = this.page.currentPage;
					this.page_[this.pageProp.pageSize] = this.page.pageSize;
					this.reload();
					this.$emit('refresh');
				},
				reload: function(data) {
					if (!this.opt.url || (typeof this.opt.readyLoad != "undefined" && !this.opt.readyLoad)) {
						//重置页数和页显示数
						this.page_[this.pageProp.currentPage] = 1;
						this.page.currentPage = 1;
						this.page_[this.pageProp.pageSize] = this.page.pageSize;
						return false;
					}
					if (!data) {
						data = {};
					}
					this.opt.extendParams = this.opt.extendParams || {};
					//判断参数或者url是否变化，如果改变了则把页数和页显示数重置
					if (JSON.stringify(this.opt.extendParams) != JSON.stringify(this.oldParams) || this.opt.url != this.oldUrl) {
						this.page_[this.pageProp.currentPage] = 1;
						this.page.currentPage = 1;
						this.page_[this.pageProp.pageSize] = this.page.pageSize;
					}
					data = this.$assign(data, this.page_, this.opt.extendParams)
					var vm = this;
					this.oldUrl = this.opt.url;
					this.oldParams = this.$deepCopy(this.opt.extendParams);
					this.$ajax({
						url: this.opt.url,
						emulateJSON: typeof this.opt.emulateJSON === "boolean" ? this.opt.emulateJSON : true,
						method: this.opt.method ? this.opt.method : "post",
						data: data,
						success: function(re) {
							if (re[vm.dataProp.data] && re[vm.dataProp.data].length == 0 && vm.page_[vm.pageProp.currentPage] != 1) {
								vm.page_[vm.pageProp.currentPage] -= 1;
								vm.page.currentPage -= 1;
								vm.$nextTick(() => {
									vm.reload();
								})
							} else {
								if (vm.dataProp.data == "") {
									Vue.set(vm, "mydata", re ? re : []);
								} else {
									Vue.set(vm, "mydata", ___getDeep(re, vm.dataProp.data) ? ___getDeep(re, vm.dataProp.data) : []);
								}
								Vue.set(vm.page, "total", re[vm.dataProp.total] ? re[vm.dataProp.total] : 0);
								vm.selected = [];
							}
							vm.$emit('reloadSuccess', re[vm.dataProp.data] && re[vm.dataProp.data].length);
						}
					});
				},
				expandChange: function(row, expandedRows) {
					this.$emit('expand-change', row, expandedRows);
				},
				requiredHeader(h, {
					column,
					$index
				}) {
					return h("span", {
						style: {
							'color': 'red'
						}
					}, ['*', h("span", {
						style: {
							'color': 'black'
						}
					}, [column.label])]);
				},
				getRealData() {
					let mydata = this.$deepCopy(this.mydata);
					let saveData = mydata.filter(item => {
						let valid = true;
						for (let i in this.columns) {
							if (this.columns[i].required && !item[this.columns[i].prop]) {
								valid = false;
							}
							if (!item[this.columns[i].prop]) {
								item[this.columns[i].prop] = null;
							}
						}
						if (valid) {
							return item;
						}
					})
					return saveData;
				},
				// rowClassName({
				// 	row,
				// 	index
				// }) {
				// 	if (row.$checked) {
				// 		return 'fant-current-row fant-table-row' + this.opt.rowClassName;
				// 	} else {
				// 		return 'fant-table-row' + this.opt.rowClassName;
				// 	}
				// },
				rowClassName({row, index}){
					if(this.opt.spanMethod){
						let r = -2;
					    this.mydata.forEach((item) => {
							if (this.cellIndex === row.order) {
								r = index;
							}
					    });
						
						// [0, 0, 2, 3, 3, 5, 5]
					   if(row.$checked){
							return 'fant-current-row fant-table-row'+this.opt.rowClassName;
					   }else if (index === r) {
							return 'current-row fant-table-row'+this.opt.rowClassName;
					   }else{
						   return 'fant-table-row'+this.opt.rowClassName;
					   }
					}else{
						if(row.$checked){
						  return 'fant-current-row fant-table-row'+this.opt.rowClassName;
						}else{
							return 'fant-table-row'+this.opt.rowClassName;
						}
					}
				},
				getSpanArr(data,attr) {
					var arr=[],pos;
					for (var i = 0; i < data.length; i++) {
						if(i === 0) {
							arr.push(1);
							pos = 0
						}else {
						  // 判断当前元素与上一个元素是否相同
							if(Array.isArray(attr)){
								let num=0;
								attr.forEach(item=>{
									if (data[i][item] && data[i - 1][item] && data[i][item] === data[i - 1][item]){
										num++;
									}
								})
								if(num == attr.length){
									arr[pos] += 1;
									arr.push(0);
								}else{
									arr.push(1);
									pos = i;
								}
								
								// console.log(attr,'attr',num)
							}else if (data[i][attr] && data[i - 1][attr] && data[i][attr] === data[i - 1][attr]) {
								arr[pos] += 1;
								arr.push(0);
							}else {
								arr.push(1);
								pos = i;
							}
						}
					}	
					return arr;
				},
				handlerData(){
					let cloneColumn=this.$deepCopy(this.cloumnArr),arr=[],indexArr=[];
					//  [2, 0, 1, 2, 0]
				
					cloneColumn.forEach((item,index)=>{
						if(cloneColumn[index] == 0){
							arr[index]=arr[index-1];
							indexArr.push(index);  
						}else{
							arr.push(index);
						}
					});
					this.mydata.forEach((item,index)=>{
						item.order=arr[index];
					})
					if(this.$refs.elTable){  //  合并表格复选框只保留一个
						indexArr.forEach(item=>this.$refs.elTable.$el.getElementsByTagName('tr')[item+1].addClass('hide'));
					}
				},
				spanMethod({ row, column, rowIndex, columnIndex }){
					if(this.opt.spanMethod && this.opt.columnData.length){
						let indexArr=this.opt.columnData.map(item=>item.index);
						let attrArr=this.opt.columnData.map(item=>item.name);		
						for(let i=0;i<indexArr.length;i++){
							if(columnIndex == indexArr[i]){
								let data=this.getSpanArr(this.mydata,attrArr[i]);
								this.cloumnArr=data;
								for(var j=0;j<data.length;j++){
									if(rowIndex == j){
										return [data[j],1];
										break;
									}
								}
							}
						}
					}
				},
				renderFormatter(col, scope){
					if(typeof col.money === "boolean"&&col.money){
					  if(col.formatter){
						return this.formatMoney(this.formatter(scope.row, scope.column, col.prop, col.formatter(scope.row, scope.column, scope.row[col.prop])))
					  }else{
						return this.formatMoney(this.formatter(scope.row, scope.column, col.prop, scope.row[col.prop]))
					  }
					}else{
					  if(col.formatter){
						return this.formatter(scope.row, scope.column, col.prop, col.formatter(scope.row, scope.column, scope.row[col.prop]))
					  }else{
						return scope.row[col.prop]
					  }
					}
				  }
			},
			created: function() {
				if (typeof this.page == "object") {
					this.page.pageSize = typeof this.page.pageSize === "string" || typeof this.page.pageSize === "number" ? this.page
						.pageSize : 10;
					this.page.total = typeof this.page.total === "string" || typeof this.page.total === "number" ? this.page.total :
						0;
					this.page.currentPage = typeof this.page.currentPage === "string" || typeof this.page.currentPage === "number" ?
						this.page.currentPage : 1;
					this.page.ref = typeof this.page.ref === "boolean" ? this.page.ref : true;
					//若不设置url，则分页的刷新按钮不显示
					if (typeof this.opt.url === "undefined") {
						this.page.ref = false;
					}
				}
				if (typeof this.opt == "object") {
					this.opt.width = typeof this.opt.width === "string" || typeof this.opt.width === "number" ? this.opt.width :
						"100%";
					// this.opt.height = typeof this.opt.height === "string" || typeof this.opt.height === "number"?this.opt.height:"500px";
					typeof this.opt.height === "number" ? this.opt.height = this.opt.height + "px" : null;
					typeof this.opt.cellStyle === "object" ? (this.opt.cellStyle = this.$assign({
						overflow: 'hidden'
					}, this.opt.cellStyle)) : null;
					this.opt.selectAll = typeof this.opt.selectAll === "boolean" ? this.opt.selectAll : false;
					this.opt.stripe = typeof this.opt.stripe === "boolean" ? this.opt.stripe : true;
					this.opt.rowClassName = this.opt.rowClassName ? this.opt.rowClassName : "";
					this.opt.cellClassName = this.opt.cellClassName ? this.opt.cellClassName : "";
					this.opt.headerRowClassName = this.opt.headerRowClassName ? this.opt.headerRowClassName : "";
					this.opt.headerCellClassName = this.opt.headerCellClassName ? this.opt.headerCellClassName : "";
					this.opt.border = typeof this.opt.border === "boolean" ? this.opt.border : true;
				}
			},
			beforeUpdate() {
				// Vue.config.fant.tableBeforeUpdate(this);
			},
			mounted: function() {
				//设置url后，data会失效
				if (!this.opt.mountedNotLoad) { //mountedNotLoad 安装时不请求接口
					this.reload();
				}
				var target = this.$el.getElementsByClassName("el-table__empty-block");
				if (this.$slots.append && target.length > 0) {
					target[0].style.display = "none";
				}
				this.$nextTick(() => {
					// Vue.config.fant.tableOnRender(this);
				});
			},
			// updated(){
			//   var target = this.$el.getElementsByClassName("el-table__empty-block");
			//   if(this.$slots.append&&target.length>0){
			//     target[0].style.display="none";
			//   }
			//   this.$nextTick(()=>{
			//       Vue.config.fant.tableOnUpdated(this);
			//   });
			// },  
			updated() {
				// this.$refs.empty.$nextTick(()=>{
				// Vue.config.fant.tableOnRender(this);
				// })

				var target = this.$el.getElementsByClassName("el-table__empty-block");
				if (this.$slots.append && target.length > 0) {
					target[0].style.display = "none";
				}
				// this.$nextTick(()=>{
				//     Vue.config.fant.tableOnUpdated(this);
				// });
			},
			// template: '<div :class="{\'fantTable\':true,\'check-on-select\':opt.multiple && opt.checkOnSelect}" :style="{height:opt.height,width:opt.width,position:\'relative\'}"><el-table :row-key="opt.rowKey" :current-row-key="opt.currentRowKey" :expand-row-keys="opt.expandRowKeys" :empty-text="opt.emptyText" @expand-change="expandChange" ref="elTable" :sum-text="opt.sumText" tooltip-effect="dark" :cell-style="opt.cellStyle" :row-class-name="rowClassName" :cell-class-name="\'fant-table-cell \'+opt.cellClassName" :header-row-class-name="\'fant-table-header-row \'+opt.headerRowClassName" :header-cell-class-name="\'fant-table-header-cell \'+opt.headerCellClassName" @select="select" @select-all="selectAll" @selection-change="selectionChange" @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseLeave" @cell-click="cellClick" @cell-dblclick="cellDblclick" @row-click="rowClick" @row-contextmenu="rowContextmenu" @row-dblclick="rowDblclick" @sort-change="sortChange" @header-dragend="headerDragend" :data="mydata" :size="opt.size?opt.size:\'small\'" :show-summary="opt.showSummary" :summary-method="getSummaries" :highlight-current-row="true" :border="opt.border" :stripe="opt.stripe" :height="opt.page?\'calc(100% - 40px)\':\'100%\'" :style="{width: opt.width}" @current-change="currentChange"><el-table-column v-if="opt.multiple" type="selection" width="30"></el-table-column><slot></slot><template slot="empty" ref="empty"><slot name="empty"></slot></template><el-table-column v-if="!col.hidden" v-for="(col, i) of columns" :type="col.type" :index="col.index" :resizable="col.resizable" :align="col.align?col.align:\'left\'" header-align="center" :show-overflow-tooltip="col.label === \'操作\'||col.label === \'状态\'?false:typeof col.showTooltip === \'boolean\'?col.showTooltip:true" :selectable="col.selectable" :reserve-selection="col.reserveSelection" :sort-by="col.sortBy" :render-header="col.renderHeader?col.renderHeader:col.required?requiredHeader:null" :prop="col.prop" :label="col.label" :fixed="col.fixed" :sortable="col.sortable" :min-width="col.minWidth" :width="col.width"><template slot-scope="scope"><slot :name="col.prop" :row="scope.row" :column="scope.column" :$index="scope.$index">{{typeof col.money === "boolean"&&col.money?(col.formatter?formatMoney(formatter(scope.row, scope.column, col.prop, col.formatter(scope.row, scope.column, scope.row[col.prop]))):formatMoney(formatter(scope.row, scope.column, col.prop, scope.row[col.prop]))):(col.formatter?formatter(scope.row, scope.column, col.prop, col.formatter(scope.row, scope.column, scope.row[col.prop])):scope.row[col.prop])}}</slot></template></el-table-column><div slot="append" v-if="$slots.append"><slot name="append"></slot></div></el-table><el-pagination ref="elPagination" v-if="opt.page" background layout="total, sizes, prev, pager, next, jumper, slot" :pager-count="page.count ? page.count : 7" @size-change="sizeChange" :current-page="page.currentPage" :page-sizes="page.sizes ? page.sizes : [10, 20, 30, 40]" :page-size="page.pageSize" :total="page.total" @next-click="nextClick" @prev-click="prevClick" @current-change="pageChange"><div slot style="display:inline-block;"><el-button v-if="page.ref" type="primary" @click="refresh" plain icon="el-icon-fant-refresh"><slot name="pageSlot"></slot></el-button></div></el-pagination></div>'
			template:'<div :class="{\'fantTable\':true,\'check-on-select\':opt.multiple && opt.checkOnSelect}" :style="{height:opt.height,width:opt.width,position:\'relative\'}"><el-table :row-key="opt.rowKey"  :current-row-key="opt.currentRowKey" :span-method="spanMethod" :expand-row-keys="opt.expandRowKeys" :empty-text="opt.emptyText" @expand-change="expandChange" ref="elTable" :sum-text="opt.sumText" tooltip-effect="dark" :cell-style="opt.cellStyle" :row-class-name="rowClassName" :cell-class-name="\'fant-table-cell \'+opt.cellClassName" :header-row-class-name="\'fant-table-header-row \'+opt.headerRowClassName" :header-cell-class-name="\'fant-table-header-cell \'+opt.headerCellClassName" @select="select" @select-all="selectAll" @selection-change="selectionChange" @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseLeave" @cell-click="cellClick" @cell-dblclick="cellDblclick" @row-click="rowClick" @row-contextmenu="rowContextmenu" @row-dblclick="rowDblclick" @sort-change="sortChange" @header-dragend="headerDragend" :data="mydata" :size="opt.size?opt.size:\'small\'" :show-summary="opt.showSummary" :summary-method="getSummaries" :highlight-current-row="false" :border="opt.border" :stripe="opt.stripe" :height="opt.page?\'calc(100% - 40px)\':\'100%\'" :style="{width: opt.width}" @current-change="currentChange"><el-table-column v-if="opt.multiple" type="selection" width="30"></el-table-column><slot></slot><template slot="empty" ref="empty"><slot name="empty"></slot></template><el-table-column v-if="!col.hidden" v-for="(col, i) of columns" :type="col.type" :index="col.index" :resizable="col.resizable" :align="col.align?col.align:\'left\'" header-align="center" :show-overflow-tooltip="col.label === \'操作\'||col.label === \'状态\'?false:typeof col.showTooltip === \'boolean\'?col.showTooltip:true" :selectable="col.selectable" :reserve-selection="col.reserveSelection" :sort-by="col.sortBy" :render-header="col.renderHeader?col.renderHeader:col.required?requiredHeader:null" :prop="col.prop" :label="col.label" :fixed="col.fixed" :sortable="col.sortable" :min-width="col.minWidth" :width="col.width"><el-table-column v-for="(c, ci) of col.children" :key="`children${ci}`"  :resizable="c.resizable" :align="c.align?c.align:\'left\'" header-align="center" :show-overflow-tooltip="c.label === \'操作\'||c.label === \'状态\'?false:typeof c.showTooltip === \'boolean\'?c.showTooltip:true" :selectable="c.selectable" :reserve-selection="c.reserveSelection" :sort-by="c.sortBy" :render-header="c.renderHeader?c.renderHeader:c.required?requiredHeader:null" :prop="c.prop" :label="c.label" :fixed="c.fixed" :sortable="c.sortable" :min-width="c.minWidth" :width="c.width"><template slot-scope="scope"><slot :name="c.prop" :row="scope.row" :column="scope.column" :$index="scope.$index">{{typeof c.money === "boolean"&&c.money?(c.formatter?formatMoney(formatter(scope.row, scope.column, c.prop, c.formatter(scope.row, scope.column, scope.row[c.prop]))):formatMoney(formatter(scope.row, scope.column, c.prop, scope.row[c.prop]))):(c.formatter?formatter(scope.row, scope.column, c.prop, c.formatter(scope.row, scope.column, scope.row[c.prop])):scope.row[c.prop])}}</slot></template></el-table-column><template slot-scope="scope"><slot :name="col.prop" :row="scope.row" :column="scope.column" :$index="scope.$index"><div v-if="col.html" v-html="renderFormatter(col, scope)"></div><template v-else>{{renderFormatter(col, scope)}}</template></slot></template></el-table-column><div slot="append" v-if="$slots.append"><slot name="append"></slot></div></el-table><el-pagination ref="elPagination" v-if="opt.page" background layout="total, sizes, prev, pager, next, jumper, slot" :pager-count="page.count ? page.count : 7" @size-change="sizeChange" :current-page="page.currentPage" :page-sizes="page.sizes ? page.sizes : [10, 20, 30, 40]" :page-size="page.pageSize" :total="page.total" @next-click="nextClick" @prev-click="prevClick" @current-change="pageChange"><div slot style="display:inline-block;"><el-button v-if="page.ref" type="primary" @click="refresh" plain icon="el-icon-fant-refresh"><slot name="pageSlot"></slot></el-button></div></el-pagination></div>'
			// template:'<div :class="{\'fantTable\':true,\'check-on-select\':opt.multiple && opt.checkOnSelect}" :style="{height:opt.height,width:opt.width,position:\'relative\'}"><el-table :row-key="opt.rowKey"  :current-row-key="opt.currentRowKey" :span-method="spanMethod" :expand-row-keys="opt.expandRowKeys" :empty-text="opt.emptyText" @expand-change="expandChange" ref="elTable" :sum-text="opt.sumText" tooltip-effect="dark" :cell-style="opt.cellStyle" :row-class-name="rowClassName" :cell-class-name="\'fant-table-cell \'+opt.cellClassName" :header-row-class-name="\'fant-table-header-row \'+opt.headerRowClassName" :header-cell-class-name="\'fant-table-header-cell \'+opt.headerCellClassName" @select="select" @select-all="selectAll" @selection-change="selectionChange" @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseLeave" @cell-click="cellClick" @cell-dblclick="cellDblclick" @row-click="rowClick" @row-contextmenu="rowContextmenu" @row-dblclick="rowDblclick" @sort-change="sortChange" @header-dragend="headerDragend" :data="mydata" :size="opt.size?opt.size:\'small\'" :show-summary="opt.showSummary" :summary-method="getSummaries" :highlight-current-row="false" :border="opt.border" :stripe="opt.stripe" :height="opt.page?\'calc(100% - 40px)\':\'100%\'" :style="{width: opt.width}" @current-change="currentChange"><el-table-column v-if="opt.multiple" type="selection" width="30"></el-table-column><slot></slot><template slot="empty" ref="empty"><slot name="empty"></slot></template><el-table-column v-if="!col.hidden" v-for="(col, i) of columns" :type="col.type" :index="col.index" :resizable="col.resizable" :align="col.align?col.align:\'left\'" header-align="center"  :selectable="col.selectable" :reserve-selection="col.reserveSelection" :sort-by="col.sortBy" :render-header="col.renderHeader?col.renderHeader:col.required?requiredHeader:null" :prop="col.prop" :label="col.label" :fixed="col.fixed" :sortable="col.sortable" :min-width="col.minWidth" :width="col.width"><el-table-column v-for="(c, ci) of col.children" :key="`children${ci}`"  :resizable="c.resizable" :align="c.align?c.align:\'left\'" header-align="center" :show-overflow-tooltip="c.label === \'操作\'||c.label === \'状态\'?false:typeof c.showTooltip === \'boolean\'?c.showTooltip:true" :selectable="c.selectable" :reserve-selection="c.reserveSelection" :sort-by="c.sortBy" :render-header="c.renderHeader?c.renderHeader:c.required?requiredHeader:null" :prop="c.prop" :label="c.label" :fixed="c.fixed" :sortable="c.sortable" :min-width="c.minWidth" :width="c.width"><template slot-scope="scope"><slot :name="c.prop" :row="scope.row" :column="scope.column" :$index="scope.$index">{{typeof c.money === "boolean"&&c.money?(c.formatter?formatMoney(formatter(scope.row, scope.column, c.prop, c.formatter(scope.row, scope.column, scope.row[c.prop]))):formatMoney(formatter(scope.row, scope.column, c.prop, scope.row[c.prop]))):(c.formatter?formatter(scope.row, scope.column, c.prop, c.formatter(scope.row, scope.column, scope.row[c.prop])):scope.row[c.prop])}}</slot></template></el-table-column><template slot-scope="scope"><slot :name="col.prop" :row="scope.row" :column="scope.column" :$index="scope.$index"><div v-if="col.html" v-html="renderFormatter(col, scope)"></div><template v-else>{{renderFormatter(col, scope)}}</template></slot></template></el-table-column><div slot="append" v-if="$slots.append"><slot name="append"></slot></div></el-table><el-pagination ref="elPagination" v-if="opt.page" background layout="total, sizes, prev, pager, next, jumper, slot" :pager-count="page.count ? page.count : 7" @size-change="sizeChange" :current-page="page.currentPage" :page-sizes="page.sizes ? page.sizes : [10, 20, 30, 40]" :page-size="page.pageSize" :total="page.total" @next-click="nextClick" @prev-click="prevClick" @current-change="pageChange"><div slot style="display:inline-block;"><el-button v-if="page.ref" type="primary" @click="refresh" plain icon="el-icon-fant-refresh"><slot name="pageSlot"></slot></el-button></div></el-pagination></div>'
		},
		//tooltip封装
		tipsDom: {
			props: {
				value: {
					type: String,
					required: true
				},
				theme: {
					type: String,
					default: "dark"
				}
			},
			template: '<el-tooltip class="item" :effect="theme" :content="value" placement="top"><slot></slot></el-tooltip>',
		}
	};
	const Message = Vue.prototype.$message;
	const Alert = Vue.prototype.$alert;
	const Confirm = Vue.prototype.$confirm;
	const Prompt = Vue.prototype.$prompt;
	const Msgbox = Vue.prototype.$msgbox;
	Vue.keyHandler = keyHandler;
	Vue.prototype.$keyHandler = keyHandler;

	var methods = {
		/**
		 * 调用提示信息组件
		 * @param s
		 * title  -- 标题
		 * msg -- 提示信息
		 * buttonText -- 确认按钮文本
		 * timeout -- 可设置自动消失的时间
		 * fn -- 参数action，返回状态，回调函数
		 * 其他属性继承element UI的MessageBox组件
		 * @returns
		 */
		alert: function(s) {
			if (!s) {
				return false;
			}
			s.dangerouslyUseHTMLString = true; //默认使用HTML片段
			var opt = {
				title: "提示",
				msg: "",
				confirmButtonText: s.buttonText ? s.buttonText : '知道了',
				callback: function(action) {
					typeof s.fn == "function" ? eval(s.fn(action)) : null;
					clearInterval(t1);
				}
			};

			Object.assign(opt, opt, s);
			if (typeof opt.timeout == "number") {
				var second = opt.timeout / 1000;
				opt.msg = opt.msg + "<span class='opsTimeout' ref='opsTimeout'>" + second + "秒后关闭</span>";
				var t = second - 1;
				var t1 = setInterval(function() {
					Vue.getEl(".opsTimeout")[0].innerHTML = (t--) + "秒后关闭";
				}, 1000);
				setTimeout(function() {
					clearInterval(t1);
					Vue.getEl(".el-aaa-box__wrapper")[0].getElementsByClassName('el-aaa-box__headerbtn')[0].click();
				}, opt.timeout);
			}
			Alert(opt.msg, opt.title, opt);
		},
		/**
		 * 调用确认提示信息组件
		 * @param s
		 * title  -- 标题
		 * msg -- 提示信息
		 * buttonText -- 确认按钮文本
		 * cancelText -- 取消按钮文本
		 * fn -- 参数action，返回状态，回调函数
		 * 其他属性继承element UI的MessageBox组件
		 * @returns
		 */
		confirm: function(s) {
			if (!s) {
				return false;
			}
			s.dangerouslyUseHTMLString = true; //默认使用HTML片段
			var opt = {
				title: "提示",
				msg: "",
				confirmButtonText: s.buttonText ? s.buttonText : '确认',
				cancelButtonText: s.cancelText ? s.cancelText : '取消',
				callback: function(action) {
					//解决快速按下回车键的时候不停点击按钮的问题
					document.activeElement.blur();
					var a = action === "confirm" ? 1 : 0;
					typeof s.fn == "function" ? eval(s.fn(a)) : null;
				}
			};

			Object.assign(opt, opt, s);
			Confirm(opt.msg, opt.title, opt);
		},
		/**
		 * 调用输入框提交提示信息组件
		 * @param s
		 * title  -- 标题
		 * msg -- 提示信息
		 * buttonText -- 确认按钮文本
		 * cancelText -- 取消按钮文本
		 * then -- 参数value，返回填写的数据，确认后的回调函数
		 * cancel -- 参数 status,返回状态,取消后的回调函数
		 * loadTime -- 毫秒，按确认后窗口关闭前显示loading图标等待关闭的时间
		 * htmlUse -- boolean,msg是否使用html片段
		 * 其他属性继承element UI的MessageBox组件
		 * @returns
		 */
		prompt: function(s) {
			if (!s) {
				return false;
			}
			var opt = {
				title: "提示",
				msg: "",
				cancelButtonClass: "fant-btn-secondary2 approval-bottom-right",
				confirmButtonClass: "fant-btn-secondary",
				cancelButtonText: s.cancelText ? s.cancelText : '关闭',
				confirmButtonText: s.buttonText ? s.buttonText : '确认',
				dangerouslyUseHTMLString: typeof s.htmlUse == "boolean" ? s.htmlUse : false,
				beforeClose: function(action, instance, done) {
					if (typeof s.loadTime == "number") {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = '执行中...';
							setTimeout(function() {
								if (typeof s.beforeClose == "function") {
									eval(s.beforeClose(action, instance, done))
								} else {
									done();
								}
								setTimeout(function() {
									instance.confirmButtonLoading = false;
								}, 300);
							}, s.loadTime);
						} else {
							if (typeof s.beforeClose == "function") {
								eval(s.beforeClose(action, instance, done))
							} else {
								done();
							}
						}
					} else {
						if (typeof s.beforeClose == "function") {
							eval(s.beforeClose(action, instance, done))
						} else {
							done();
						}
					}
				}
			};
			if (s.beforeClose) delete s.beforeClose;
			Object.assign(opt, opt, s);
			Prompt(opt.msg, opt.title, opt).then(function(a) {
				typeof s.then == "function" ? eval(s.then(a.value)) : null;
			}).catch(function(status) {
				typeof s.cancel == "function" ? eval(s.cancel(status)) : null;
			});
		},
		/**
		 * 调用自定义提示信息组件
		 * @param s
		 * title  -- 标题
		 * msg -- 提示信息，可以是函数，返回显示内容，可以编写VNode,可以是html代码
		 * buttonText -- 确认按钮文本
		 * cancelText -- 取消按钮文本
		 * then -- 参数status，返回状态，确认后的回调函数
		 * cancel -- 参数 status,返回状态,取消后的回调函数
		 * htmlUse -- boolean,msg是否使用html片段
		 * loadTime -- 毫秒，按确认后窗口关闭前显示loading图标等待关闭的时间
		 * 其他属性继承element UI的MessageBox组件
		 * @returns
		 */
		msgbox: function(s) {
			if (!s) {
				return false;
			}
			const h = this.$createElement; //引入vue的渲染组件
			var opt = {
				title: "消息",
				message: s.msg ? typeof s.msg == "function" ? eval(s.msg(h)) : s.msg : '',
				confirmButtonText: s.buttonText ? s.buttonText : '确认',
				showCancelButton: true,
				dangerouslyUseHTMLString: typeof s.htmlUse == "boolean" ? s.htmlUse : false,
				cancelButtonText: s.cancelText ? s.cancelText : '取消',
				beforeClose: function(action, instance, done) {
					if (typeof s.loadTime == "number") {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = '执行中...';
							setTimeout(function() {
								if (typeof s.beforeClose == "function") {
									eval(s.beforeClose(action, instance, done))
								} else {
									done();
								}
								setTimeout(function() {
									instance.confirmButtonLoading = false;
								}, 300);
							}, s.loadTime);
						} else {
							if (typeof s.beforeClose == "function") {
								eval(s.beforeClose(action, instance, done))
							} else {
								done();
							}
						}
					} else {
						if (typeof s.beforeClose == "function") {
							eval(s.beforeClose(action, instance, done))
						} else {
							done();
						}
					}
				}
			};
			if (s.beforeClose) delete s.beforeClose;
			Object.assign(opt, opt, s);
			Msgbox(opt).then(function(a) {
				typeof s.then == "function" ? eval(s.then(a)) : null;
			}).catch(function(status) {
				typeof s.cancel == "function" ? eval(s.cancel(status)) : null;
			});
		},
		/**
		 * 调用状态简略信息提示组件
		 * @param s
		 * msg -- 提示信息，可以是函数，返回显示内容，可以编写VNode,可以是html代码
		 * timeout -- 毫秒，自动消失的时间，设置为0时不会消失
		 * type -- 消息类型，success/warning/info/error
		 * htmlUse -- boolean,msg是否使用html片段
		 * close() -- 实例本身的方法，关闭提示框
		 * 其他属性继承element UI的message组件
		 * @returns
		 */
		message: function(s) {
			if (!s) {
				return false;
			}
			if (typeof s == "string") {
				return Message(s);
			} else {
				const h = this.$createElement; //引入vue的渲染组件
				var opt = {
					message: s.msg ? typeof s.msg == "function" ? eval(s.msg(h)) : s.msg : '',
					showClose: true,
					dangerouslyUseHTMLString: typeof s.htmlUse == "boolean" ? s.htmlUse : false,
					duration: typeof s.timeout == "number" ? s.timeout : 4000,
				};
				Object.assign(opt, opt, s);
				return Message(opt);
			}
		}
	}
	Vue.prototype.$message = methods.message;
	Vue.prototype.$alert = methods.alert;
	Vue.prototype.$confirm = methods.confirm;
	Vue.prototype.$prompt = methods.prompt;
	Vue.prototype.$msgbox = methods.msgbox;
	/**
	 * 调用自定义组件
	 */
	Vue.component("win", elementTemp.windowDom);
	Vue.component("datebox", elementTemp.dateDom);
	Vue.component("fantSelect", elementTemp.selectDom);
	Vue.component("cascader", elementTemp.cascaderDom);
	Vue.component("tips", elementTemp.tipsDom);
	Vue.component("fantTable", elementTemp.tableDom);
	Vue.component("fantForm", elementTemp.formDom);
	Vue.component("fantFormItem", elementTemp.formItemDom);
	Vue.component("tableForm", elementTemp.tableFormDom);
	Vue.component("tree", tree);
	Vue.component("treebox", treebox);
	Vue.component("confirm", easyConfirm);
	Vue.component("transfer", transfer);
	Vue.component("fantTimePicker", timer);
	Vue.component("fantTimeGroup", timeGroup);
	/**
	 * 调用全局信息提示组件
	 * @param s
	 * title -- 提示信息的标题
	 * msg -- 提示信息，可以是函数，返回显示内容，可以编写VNode,可以是html代码
	 * timeout -- 毫秒，自动消失的时间，设置为0时不会消失，默认为0
	 * type -- 消息类型，success/warning/info/error，默认为空
	 * htmlUse -- boolean,msg是否使用html片段
	 * onClose() -- 实例本身的方法，关闭提示框时的回调函数
	 * onClick() -- 实例本身的方法，点击 Notification 时的回调函数
	 * 其他属性继承element UI的Notification组件
	 * @returns
	 */
	Vue.prototype.$gobalMsg = function(s) {
		if (!s) {
			return false;
		}
		const h = this.$createElement; //引入vue的渲染组件
		var opt = {
			title: s.title ? s.title : "系统提示",
			message: s.msg ? typeof s.msg == "function" ? eval(s.msg(h)) : s.msg : '',
			dangerouslyUseHTMLString: typeof s.htmlUse == "boolean" ? s.htmlUse : false,
			duration: typeof s.timeout == "number" ? s.timeout : 0,
		};
		Object.assign(opt, opt, s);
		return this.$notify(opt);
	}
}

function ___getDeep(data, prop) {
	let arr = prop ? prop.split('.') : [];
	let data_ = data;
	for (let item of arr) {
		if (data_[item]) {
			data_ = data_[item];
		} else {
			data_ = [];
			break;
		}
	}
	return data_;
}

export default fantVueElement;
