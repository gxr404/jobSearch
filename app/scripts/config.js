require.config({
	baseUrl: '/scripts',
	paths: {
		'jquery': 'libs/jquery.min',
		'jquery.fullPage': 'libs/jquery.fullPage.min',
		'typerwriter':'typerwriter'
	},
	shim: {
		'jquery.fullPage': {
			deps: ['jquery']
		},
		'typerwriter' :{
			deps:['jquery']
		}
	},
	waitSeconds:120
});
require(['jquery', 'jquery.fullPage','typerwriter'], function($, fullpage,typerwriter) {
	

	// alert($().jquery);
	var typerwriterJSQ,aa2JSQ,lineInfoJSQ,lineInfo2JSQ,signJSQ,waveJSQ,page3JSQ;//,page5JSQ;
	typerwriter.btext=$('#typerwriter').html();
	

	$('#fullpage').fullpage({
		// 'verticalCentered': false,
		// 'css3': true,
		// 'sectionsColor': ['#5e5e5e', '#00FF00', '#254587', '#695684'],
		// anchors: ['page1', 'page2', 'page3', 'page4'],
		// 'navigation': true,
		// 'navigationPosition': 'right',
		// 'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple']
		anchors:['firstPage', 'secondPage', 'thirdPage','fourthlyPage','fifthPage'],
		onLeave: function( index, nextIndex, direction ){
			$('.radius-wrap').attr('class', 'radius-wrap state'+nextIndex);
			// alert(index);
			// console.log("x22");
			// 
			if(nextIndex===1){
				$("#page1").addClass("active2");
			}
			if(nextIndex!==1){
				// document.getElementById("page1").className+=" active2";
				$("#page1").removeClass("active2");
			}
			if(nextIndex!==2){
				 clearTimeout(typerwriterJSQ);
				 clearTimeout(aa2JSQ);
				 clearTimeout(lineInfoJSQ);
				 clearTimeout(lineInfo2JSQ); 
				 clearTimeout(signJSQ);
				 clearTimeout(waveJSQ);
				 // $('#typerwriter').html("");
				 typerwriter.qping("#typerwriter");
			}
			if(nextIndex===3){
				page3JSQ=setTimeout(page3info,1000);
			}
			if(nextIndex!==3){
				 clearTimeout(page3JSQ);
				 $(".content").find("ul").removeAttr('id');
			}
			function page3info(){
				$(".content").find("ul").attr('id','info1s');

			}

			//if(nextIndex===4){
				// $(){
				// 	.addClass("mh");
				// }
				// $(".warp4").find("li").hover(function(){
				// 	$(".warp4").find("li").addClass("mh");
				// 	$(this).removeClass("mh");
				// }, function () {
				//     $(".warp4").find("li").removeClass("mh");
				//   }
				// );
			//}
			// if(nextIndex===5){
			// 	page5JSQ=setTimeout(page5,2000);

			// }
			// if(nextIndex!==5){
			// 	clearTimeout(page5JSQ);
			// 	$('.radius-wrap').removeClass("state6");
			// 	$(".ct").removeClass("ct2");
			// }
			// function page5(){
			// 	$('.radius-wrap').addClass("state6");
			// 	$(".ct").addClass("ct2");
			// }

		},
		afterLoad:function (anchorLink, index){
			// $('.nav-list').find("li").find("a").removeClass("xz");
			// alert(index);
			$('.nav-list').find("li").find("a").removeClass("xz");
			$('.nav-list').find("li").eq(index-1).find("a").addClass("xz");
			
			if(index===1){
				// $('.nav-list').
				$(".warp").addClass("warp-into");
			}
			
			if(index===2){
			
				$("#mapwarp").css({"overflow":"inherit"});
				typerwriterJSQ=setTimeout(aa('#typerwriter'),1500);
				aa2JSQ=setTimeout(aa2,1500);
				lineInfoJSQ=setTimeout(lineInfo,5000);
			}else{				
				$('#typerwriter').removeClass("txtTmd");
				$(".sign").removeClass("signInfo");
				$(".line2").height(0);
				$(".line").width(0);
				$(".wave").removeClass("waveInfo");	
				// $('#typerwriter').html("");
			}

			function aa(str){
				return function(){
					typerwriter.typewriter(str);
				};
			}
			function aa2(str){
				$('#typerwriter').addClass("txtTmd");
			}
			function lineInfo(){
				$(".line").width(493);
				lineInfo2JSQ=setTimeout(lineInfo2,1000);
			}
			function lineInfo2(){
				$(".line2").height(209);
				signJSQ=setTimeout(sign,1000);
			}
			function sign(){
				$(".sign").addClass("signInfo");
				waveJSQ=setTimeout(wave,1000);
			}
			function wave(){
				$(".wave").addClass("waveInfo");
			}

		}
	});

});
