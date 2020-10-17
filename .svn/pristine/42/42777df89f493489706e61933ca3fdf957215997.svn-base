export var authenticationEnums = [
	{ text: '未认证', value: 'NOT_FINISH' }, 
	{ text: '部分认证', value: 'HALF_FINISH' }, 
	{ text: '已认证', value: 'FINISHED' }, 
	{ text: '未上传', value: 'NOT_UPLOAD' },
];

export var identificationEnums = [
	{ text: '未审核', value: 'NOT_UPLOAD' },
	{ text:'不通过',value:'NOT_FINISH'},
	{ text: '已审核', value: 'FINISHED' },
];


export var sexEnums = [
	{ text: '男', value: 'MAN' }, 
	{ text: '女', value: 'LADY' },
];

export function getText(val,constant){
	let text = "";
	for (let item of constant) {
		if (item.value == val) {
		text = item.text;
		break;
		}
	}
	return text;
}
export function getJSON(constant,text,value){
	text = text || 'text'
	value = value || 'value'
	let json = {};
	for (let item of constant) {
	  json[item[value]] = item[text]
	}
	return json;
}
  
export function getEnumsText(val, enums) {
	let text = "";
	for (let item of enums) {
		if (item.value == val) {
			text = item.text;
			break;
		}
	}
	return text;
}
