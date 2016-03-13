var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./models");

// Docs
for(var m in models){ 
	mongoose.model(m,new Schema(models[m]));
};

// Sub Docs
var participant = new mongoose.Schema({
	userId : {type:String,required:true},
	read : {type:String,required:true}
});

mongoose.model('notice',new Schema({
	title:{type:String,required:true},
	content:{type:String,required:true},
	applicant_id:{type:String,required:true},
	recipient_id:[participant],
	delete_flag:{type:String,required:true}
}));

mongoose.model('apply',new Schema({
	title:{type:String,required:true},
	content:{type:String,required:true},
	applicant_id:{type:String,required:true},
	recipient_id:[participant],
	delete_flag:{type:String,required:true}
}));

module.exports = { 
	getModel: function(type){ 
		return _getModel(type);
	}
};

var _getModel = function(type){ 
	return mongoose.model(type);
};