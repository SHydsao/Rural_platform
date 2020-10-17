/**
 * Condition对象类
 * expressions -- 操作表达式集合，必须是数组，数组值为Logic或者Exp对象
 * orders -- 定义排序集合，必须是数组，数组值为Order对象
 * page -- 默认为1，必须是number类型
 * pageSize -- 默认是10，必须是number类型
 * toString() -- 输出对象的Json字符串格式
 */
var Condition  = (function(){
    function condition(expressions, orders, page, pageSize){
        var _this = this;
        //构造函数安全模式，避免创建时候丢掉new关键字
        if(_this instanceof condition){
            _this.expressions = expressions;
            _this.orders = orders;
            _this.page = typeof page === "number"?page:1;
            _this.pageSize = typeof pageSize === "number"?pageSize:10;
        }else{
            return new condition(expressions, orders, page, pageSize);
        }
    }
    condition.prototype = {
        constructor: condition,
        toString: function(){
            return JSON.stringify(this);
        }
    }
    return condition;
})();
/**
 * Expression对象类
 * op -- 操作符，必须是string类型，备选值：OR,AND,EQ,NE,GT,LT,GTE,LTE,LIKE,BTW,IN,NULL,NNULL
 */
var Expression = function(op){
    this.op = op;
}
/**
 * Exp对象类，继承Expression类，操作表达式
 * name -- 操作符对应的字段名
 * value -- 操作符对应的判断值1
 * standbyValue -- 操作符对应的判断值2
 */
var Exp = (function(){
    function exp(op, name, value, standbyValue){
        var _this = this;
        //构造函数安全模式，避免创建时候丢掉new关键字
        if(_this instanceof exp){
            Expression.call(_this, op);
            _this.name = name;
            _this.value = value;
            if(typeof standbyValue != "undefined"){
                _this.value2 = standbyValue;
            }
        }else{
            return new exp(op, name, value, standbyValue);
        }
    }
    exp.property = new Expression();
    exp.prototype = {
        constructor: exp,
    }
    return exp;
})();
/**
 * Logic对象类，继承Expression类，逻辑表达式
 * expressions -- 操作表达式集合，必须是数组，数组值为Logic或者Exp对象
 */
var Logic = (function(){
    function logic(op, expressions){
        var _this = this;
        //构造函数安全模式，避免创建时候丢掉new关键字
        if(_this instanceof logic){
            Expression.call(_this, op);
            if(expressions instanceof Array){
                _this.expressions = expressions;
            }
        }else{
            return new logic(op, expressions);
        }
    }
    logic.property = new Expression();
    logic.prototype = {
        constructor: logic,
    }
    return logic;
})();
/**
 * Order对象类，定义排序
 * name -- 需要排序的字段名
 * direction  -- 排序的方向，默认升序，ASC,DESC
 */
var Order = (function(){
    function order(name, direction){
        var _this = this;
        //构造函数安全模式，避免创建时候丢掉new关键字
        if(_this instanceof order){
            _this.name = name;
            _this.direction = typeof direction === "string"?direction:"ASC";
        }else{
            return new order(name, direction);
        }
    }
    order.prototype = {
        constructor: order,
    }
    return order;
})();

export default {Condition,Exp,Logic,Order}
