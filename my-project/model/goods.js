var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// 创建文档的定义
var goods = new Schema({
    goods_name : String,
    price      : String,
    sphh      : String,
    create_date : { type: Date, default: Date.now }
});

// 创建model对象，与数据库中的文档（表）映射
var UserModel = mongoose.model('goods', goods);
// commonJS规范(暴露接口)
module.exports = UserModel;
