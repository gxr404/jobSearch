(function(){
	var IE={
		init:function(){
			var warp=document.createElement("div");
			document.body.appendChild(warp);
			warp.className="warpIe";
			warp.innerHTML ="温馨提示：请在ie10ie10以上Firefox或Chrome查看该站效果最佳!<br/><br/><a id='btn'>关闭继续</a>";
			document.getElementById("btn").onclick=function(){
				warp.className="warpIEhidden";
			}
		}
	};

	IE.init();
})();