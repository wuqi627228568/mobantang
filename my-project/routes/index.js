var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel")
var goods = require("../model/goods")
/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: '登入页面' });
});
router.get('/shouye', function(req, res) {
  res.render('shouye', { title: '' });
});
router.get('/sptj', function(req, res) {
  res.render('sptj', { title: '' });
});
router.get('/splb', function(req, res) {
	var pageNo=parseInt(req.query.pageNo||1);
	var count=parseInt(req.query.count||3)

	var query=goods.find({}).skip((pageNo-1)*count).limit(count).sort({date:-1})
	query.exec(function(err,results){
		console.log(err)
		 res.render('splb', {list:results,pageNo:pageNo,count:count});
	})
//	goods.find({},function(err,results){
//		  res.render('splb', {list:results });
//	})
});

router.post("/api/login", function(req, res) {
	var username = req.body.username;
	var psw = req.body.psw;
	var result = {
		status: 1,
		message: "登录成功"
	}
	UserModel.find({username: username, psw: psw}, function(err, docs){
		if(!err && docs.length > 0) {
			console.log("登录成功");
			res.send(result);
		} else {
			console.log("登录失败，请检查您的用户名或者密码");
			result.status = -109;
			result.mssagee = "登录失败，请检查您的用户名或者密码"
			res.send(result);
		}
	})
})

router.post("/api/sptj",function(req,res){
	var gm = new goods();
	gm.goods_name=req.body.goods_name;
	gm.price =req.body.price;
	gm.sphh =req.body.sphh;
	gm.save(function(err){
		var result={
			status:1,
			message:"商品上传成功"
		};
		if(err){
			result.status=-110;
			result.message="商品上传失败";
		}
		res.send(result);
	})
	
})
router.get('/api/goods_del', function(req, res) {
goods.findByIdAndRemove({_id:req.query.gid},function(err){
	var result={
			status:1,
			message:"商品删除成功"
		};
		if(err){
			result.status=-119;
			result.message="商品删除失败";
		}
		res.send(result);
	})
})

module.exports = router;
