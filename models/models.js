// 数据模型
module.exports = { 
	user:{ 
		name:{type:String,required:true},
		password:{type:String,required:true}
	},
	depart:{
		name:{type:String,required:true}
	},
	apply:{
		name:{type:String,required:true}
	},
	notice:{
		name:{type:String,required:true}
	}
};