const ERROR = '服务端异常，请稍后重试'

const DELETEMSG="您确定要删除当前项吗？"
const DELETESUCCESS="删除成功"
const DELETEFAIL="删除失败"

const ADDSUCCESS="添加成功"
const EDITSUCCESS="编辑成功"
const SUBMITSUCCESS="提交成功"

const UPPICSUCCESS="图片上传成功"
const UPPICERROR="图片上传失败"
const UPPICONEM=1*1024*1024//kb5M
const UPPICFIVEM=5*1024*1024//kb5M
const UPPICBIGM=(v)=>`图片最大不能超过${v/1024/1024}M`
const UPPICBIGN=(v)=>`图片最多不能超过${v}张`
const UPPICBIGT=(v)=>`图片类型只能是${v.join('、')}类型` //['jpg']

export default {
    ERROR,
    DELETEMSG,
    DELETESUCCESS,
    DELETEFAIL,
    UPPICSUCCESS,
    UPPICERROR,
    UPPICONEM,
    UPPICFIVEM,
    UPPICBIGM,
    UPPICBIGN,
    UPPICBIGT,
    ADDSUCCESS,
    EDITSUCCESS,
    SUBMITSUCCESS
}