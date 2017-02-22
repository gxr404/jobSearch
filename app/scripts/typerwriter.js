define(function(){
	var TypeWriterObj={
		e:0,
		btext:" ",//原始的文本值
		jsq:"",
		typewriter:function (element){
			if(this.e!=0){
				$(element).html(this.btext);			
			}
			var c=$(element), 
			b=c.html(),		
			a=0, //a保存当前字符索引数目和
			d=0; 
			
			this.btext=c.html();
			c.html("");//清空当前内容
			var that=this;
			this.e=function(){
				if("<"==b.substring(a,a+1)){//如果当前索引字符为"<"
					for(;">"!=b.substring(a,a+1);){
						a++;
					}
					//跳过标签内容a加到标签内容位置
				}
				c.html(b.substring(d,a++)+(a&1?"_":""));
			
				if(!a>=b.length||!0){ this.jsq=setTimeout(that.e,40+1* Math.random());}
				
				 if(b.length<a){
				 	clearTimeout(this.jsq);
				 }
			}
			this.e();
			
		},
		qping:function(element){ //切屏时需要的函数
			this.e=1;
			clearTimeout(this.jsq);

			$(element).html(this.btext);
		}
	};
	
	return TypeWriterObj;
});