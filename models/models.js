// 数据模型

/*
 Bug tips : Sub Docs 此处只解决单个文档模型
 */
module.exports = { 
	user:{ 
		name:{type:String,required:true},
		password:{type:String,required:true},
		depart_id:{type:String,required:true},
		delete_flag:{type:String,required:true}
	},
	depart:{
		name:{type:String,required:true},
		leader_id:{type:String,required:true},
		depart_upper_id:{type:String,required:true},
		delete_flag:{type:String,required:true}
	}
};