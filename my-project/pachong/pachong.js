var http =require("http")
var cheerio = require("cheerio")
var url = require("url")
var fs = require("fs")
var targetUrl="http://www.1000phone.com/";

var html = "";
var imgArr=[]
http.get(targetUrl,function(res){
	res.on("data",function(data){
		html+=data
	})
	res.on("end",function(){
		var $ = cheerio.load(html)
		var arr = $("img");
		for(var i in arr){
			if(arr[i].attribs && arr[i].attribs.src){
				var tempUrl= url.resolve(targetUrl,arr[i].attribs.src);
				imgArr.push(tempUrl);
				downloadPic(tempUrl)
			}
		}
		console.log(imgArr)
	})
})
function downloadPic(imgUrl){
	var content='';
	http.get(imgUrl,function(res){
		res.on("data",function(data){
			content+=data;
		})
		res.on("end",function(){
			var fileName = imgUrl.substr(imgUrl.lastIndexOf("/")+1);
			fs.writeFile("img/"+fileName,content,function(err){
				if(!err){
					console.log("图片下载成功："+fileName)
				}
			})
		})
	})
}
