/**
 * 指令扩展集合
 */
let _directives = {}
_directives.install = function (Vue, options) {
    /**
     * v-to，路由跳转自定义属性
     */
    Vue.directive('to', {
        bind(el, binding, vnode) {
            function clickHandler(e) {
                // 这里判断点击的元素是否是本身，是本身，则返回
                if (!el.contains(e.target)) {
                    return false;
                }
                if (window.$router && (typeof binding.value === 'string' || typeof binding.value === 'object')) {
                    window.$router.push(binding.value);
                }
               
            }
            // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
            el.__vueRouteTo__ = clickHandler;
            document.addEventListener('click', clickHandler);
        },
        update(el, binding, vnode) {
            function clickHandler(e) {
                // 这里判断点击的元素是否是本身，是本身，则返回
                if (!el.contains(e.target)) {
                    return false;
                }
                if (window.$router && (typeof binding.value === 'string' || typeof binding.value === 'object')) {
                    window.$router.push(binding.value);
                }
            }
            document.removeEventListener('click', el.__vueRouteTo__);
            // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
            el.__vueRouteTo__ = clickHandler;
            document.addEventListener('click', clickHandler);
        },
        unbind(el, binding) {
            // 解除事件监听
            document.removeEventListener('click', el.__vueRouteTo__);
            delete el.__vueRouteTo__;
        },
    });
    Vue.directive('repeatClick',{
		bind(el,binding,vnode){		
			let time = binding.value instanceof Object ?  binding.value.time : binding.value;
			function handlerClick(e){
				if (!el.contains(e.target) || el.disabled) {
				    return false;
				}				
				el.disabled=true;
				el.classList.add('is-disabled');
				
				el.__timer__=setTimeout(()=>{
					el.disabled=false;
					el.classList.remove('is-disabled');
				},time || 2000);
			}
			el.__vueClick__ = handlerClick;
			el.__arg__=binding.arg;			
			document.addEventListener('click',handlerClick,false);
		},
		componentUpdated(el,binding,vnode){
			if(el.__arg__ !== binding.arg){
				clearTimeout(el.__timer__);
				el.__timer__=setTimeout(()=>{
					el.disabled=false;
					el.classList.remove('is-disabled');
				},0);
			}
		},
		unbind(el, binding) {
		    document.removeEventListener('click', el.__vueClick__);
		    delete el.__vueClick__;
			delete el.__arg__;
			delete el.__timer__;
		}
	});
	 Vue.directive('tableScroll',{
		bind: function(el, binding, vnode, oldVnode) {
			let cb_name = binding.expression;
			let cb = vnode.context[cb_name];
			let wrapper=el.querySelector('.el-table__body-wrapper');
			wrapper.__handler__=function(){
				if (wrapper.offsetHeight + wrapper.scrollTop >= wrapper.scrollHeight) {
					cb && cb();
				}
			}
			wrapper.addEventListener('scroll', wrapper.__handler__)
		},
		unbind:function(el, binding, vnode, oldVnode){
			let wrapper=el.querySelector('.el-table__body-wrapper');
			wrapper.removeEventListener('scroll', wrapper.__handler__);
			delete wrapper.__handler__;
		}
	})
	
    Vue.directive('dialogDrag', {
        bind(el, binding, vnode, oldVnode) {
            const dialogHeaderEl = el.querySelector('.el-dialog__header');
            const dragDom = el.querySelector('.el-dialog');
            //dialogHeaderEl.style.cursor = 'move';
            dialogHeaderEl.style.cssText += ';cursor:move;'
            dragDom.style.cssText += ';top:0px;'
     
            // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
            const sty = (function() {
                if (window.document.currentStyle) {
                    return (dom, attr) => dom.currentStyle[attr];
                } else{
                    return (dom, attr) => getComputedStyle(dom, false)[attr];
                }
            })()       
            
            dialogHeaderEl.onmousedown = (e) => {
                // 鼠标按下，计算当前元素距离可视区的距离
                const disX = e.clientX - dialogHeaderEl.offsetLeft;
                const disY = e.clientY - dialogHeaderEl.offsetTop;
                
                const screenWidth = document.documentElement.clientWidth; // body当前宽度
                const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取) 

                const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
                const dragDomheight = dragDom.offsetHeight; // 对话框高度
                
                const minDragDomLeft = dragDom.offsetLeft;
                const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
                
                const minDragDomTop = dragDom.offsetTop;
                const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;
     
                
                // 获取到的值带px 正则匹配替换
                let styL = sty(dragDom, 'left');
                let styT = sty(dragDom, 'top');
     
                // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                if(styL.includes('%')) {
                    styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
                    styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
                }else {
                    styL = +styL.replace(/\px/g, '');
                    styT = +styT.replace(/\px/g, '');
                };
                
                document.onmousemove = function (e) {
                    // 通过事件委托，计算移动的距离 
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    
                    // 边界处理
                    if (-(left) > minDragDomLeft) {
                        left = -(minDragDomLeft);
                    } else if (left > maxDragDomLeft) {
                        left = maxDragDomLeft;
                    }
                    
                    if (-(top) > minDragDomTop) {
                        top = -(minDragDomTop);
                    } else if (top > maxDragDomTop-1) {
                        top = maxDragDomTop-1;
                    }
 
                    dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
                };
     
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                return false;
            }  
        }
    })
}
export default _directives;