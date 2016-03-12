// 数据模型

/*
 Bug tips : Sub Docs
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
	},
	apply:{
		title:{type:String,required:true},
		content:{type:String,required:true},
		applicant_id:{type:String,required:true},
		recipient_id:[{
			userId : {type:String,required:true},
			read : {type:String,required:true}
		}],
		delete_flag:{type:String,required:true}
	},
	// participant:{
	// 	userId : {type:String,required:true},
	// 	read : {type:String,required:true}
	// }
	// notice:{
	// 	title:{type:String,required:true},
	// 	content:{type:String,required:true},
	// 	applicant_id:{type:String,required:true},
	// 	recipient_id:{type:Array,required:false},
	// 	delete_flag:{type:String,required:true}
	// }
};