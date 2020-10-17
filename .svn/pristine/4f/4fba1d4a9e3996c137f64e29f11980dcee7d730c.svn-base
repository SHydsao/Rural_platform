HTMLElement.prototype.hasClass = function (className) {
  return this.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}
HTMLElement.prototype.addClass = function (className) {
  var name = " " + className;
  if (!this.hasClass(className)) {
    this.className += name;
  }
}
HTMLElement.prototype.removeClass = function (className) {
  if (this.hasClass(className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    this.className = this.className.replace(reg, " ");
  }
}
HTMLElement.prototype.closest = function (selector) {
  var el = this;
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}
HTMLElement.prototype.siblings = function (selector) {
  var el = this;
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.nextElementSibling;
  }
  if (el === null) {
    el = this;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        break;
      }
      el = el.previousElementSibling;
    }
  }
  return el;
}
HTMLElement.prototype.isHidden = function () {
  return (this.style.display === "none");
}
HTMLElement.prototype.hide = function () {
  this.style.display = "none";
}
HTMLElement.prototype.show = function () {
  this.style.display = "block";
}
Number.prototype.toFixed = function (len) {
  if (len > 20 || len < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }
  // .123转为0.123
  var number = Number(this);
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString();
  }
  if (typeof (len) == 'undefined' || len == 0) {
    return (Math.round(number)).toString();
  }
  var result = number.toString(),
    numberArr = result.split('.');

  if (numberArr.length < 2) {
    //整数的情况
    return padNum(result);
  }
  var intNum = numberArr[0], //整数部分
    deciNum = numberArr[1],//小数部分
    lastNum = deciNum.substr(len, 1);//最后一个数字

  if (deciNum.length == len) {
    //需要截取的长度等于当前长度
    return result;
  }
  if (deciNum.length < len) {
    //需要截取的长度大于当前长度 1.3.toFixed(2)
    return padNum(result)
  }
  //需要截取的长度小于当前长度，需要判断最后一位数字
  result = intNum + '.' + deciNum.substr(0, len);
  if (parseInt(lastNum, 10) >= 5) {
    //最后一位数字大于5，要进位
    var times = Math.pow(10, len); //需要放大的倍数
    var changedInt = Number(result.replace('.', ''));//截取后转为整数
    changedInt++;//整数进位
    changedInt /= times;//整数转为小数，注：有可能还是整数
    result = padNum(changedInt + '');
  }
  return result;

  //对数字末尾加0
  function padNum(num) {
    var dotPos = num.indexOf('.');
    if (dotPos === -1) {
      //整数的情况
      num += '.';
      for (var i = 0; i < len; i++) {
        num += '0';
      }
      return num;
    } else {
      //小数的情况
      var need = len - (num.length - dotPos - 1);
      for (var j = 0; j < need; j++) {
        num += '0';
      }
      return num;
    }
  }
}
Date.prototype.format = function (format) {
  var args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var i in args) {
    var n = args[i];
    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
  }
  return format;
}
String.prototype.trim = function(){
  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}
