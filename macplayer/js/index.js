/*
var console = {
		setscript : function(){
			//console.log(arguments);
		}
};*/

var initWithLogin = function(key){
	myInfo.memberKey = key;
	
	top100.init();
	eventCotroller.init();
	//player.init();

	if(myInfo.memberKey == "" || myInfo.memberKey == null){
		
		$("body").append("<div class = 'lg_dim'></div>");
		
		$("body").append('<div id="alert" style="height: 250px; width: 250px; left: 276.5px;"><div class="playlist_add_title">Melon 로그인<br><br><input type="text" class="playlist_add_input logid" placeholder="ID"><br><input type="password" class="playlist_add_input logpwd" placeholder="PASSWORD"><br><div class="playlist_add_title_confirm center" style="  margin-left: 70px;">Login</div></div></div>');
	
		$(".playlist_add_title_confirm").bind("click",function(){
			$(this).css("-webkit-transform","rotateY(3000px)");
			console.setscript("[logproc]:" + $.trim($(".logid").val()) + "||" + $.trim($(".logpwd").val()));
		});
		
		$(".logpwd").bind("keypress",function(e){
			
			if(e.keyCode == 13)
				console.setscript("[logproc]:" + $.trim($(".logid").val()) + "||" + $.trim($(".logpwd").val()));
		
		});
	}
	
}

function iframeLoaded(id,pass) {
    //alert("Iframe loaded!");
	$("#iFrame").contents().find(".text_id_main").val(id);
	$("#iFrame").contents().find(".text_password_main").val(pass);
	$("#iFrame").contents().find(".btn_main_login").trigger("click");
	setTimeout(function(){
		myInfo.memberKey = iFrame.contentWindow.getMemberKey();
		$(".lg_dim , #alert").remove();
		$("#iFrame").remove();
	},1000);
	
}

var isPC = true;

if(isPC){
	
	var console = {setscript : function(){}};
	var console = {log : function(){}};
}

var callbackPlaylist = function(data){
	
	
	
	if($("#music_scroller > ul > li").data("obj") == undefined){
		
	}else{
		var tmpArr = [];
		$("#music_scroller > ul > li").each(function(){
			tmpArr.push($(this).data("obj")["songId"]);
		});
		dataHandler.playlistUpdate(data.result , tmpPlName , tmpArr , PlplayListUpdateCallback);
	}
}

var PlplayListUpdateCallback = function(){
		
	alert("PlayList 추가 완료");
}
var rdm = function(){
	return Math.floor(Math.random() * 1000) + 1 ;
	
}

Date.prototype.yyyymmdd = function() {
	   var yyyy = this.getFullYear().toString();
	   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	   var dd  = this.getDate().toString();
	   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
	  };

var tmpPlName = "";

$(document).ready(function(){
	
	$("#loader").fadeOut(500,function(){
		$("#loader_main").fadeIn(100);
		
	})
	//localStorage.setItem("selecteddmusic","");
	//localStorage.setItem("currentmusic","");
	top100.init();
	eventCotroller.init();
	player.init();
	
	$(".add_pllist").bind("click",function(){

		var d = new Date();
		var tmp = d.yyyymmdd();
		
		tmp = tmp+ "_" + rdm();
		tmpPlName = tmp;
		if($("#music_scroller > ul > li").data("obj") != undefined){
			dataHandler.addPlaylist(tmp,callbackPlaylist);
		}
	});

	if(isPC){
		$("body").append("<div class = 'lg_dim'></div>");
			
		$("body").append('<div id="alert" style="height: 250px; width: 250px; left: 276.5px;"><div class="playlist_add_title">Melon <br><br><input type="text" class="playlist_add_input logid" placeholder="ID"><br><input type="password" class="playlist_add_input logpwd" placeholder="PASSWORD"><br><div class="playlist_add_title_confirm center" style="  margin-left: 70px;">Login</div></div></div>');

		$(".playlist_add_title_confirm").bind("click",function(){
			iframeLoaded($.trim($(".logid").val()),$.trim($(".logpwd").val()));
			
		});
		
		$(".logpwd").bind("keypress",function(e){
			
			if(e.keyCode == 13)
				iframeLoaded($.trim($(".logid").val()),$.trim($(".logpwd").val()));	
		});

	}else{
		
		console.setscript("[load]:");
	}
	/*top100.init();
	eventCotroller.init();
	player.init();
	//console.setscript("[myInfo]:" + myInfo.memberKey);
	//alert(myInfo.memberKey);*/
	/*if(myInfo.memberKey == "" || myInfo.memberKey == null){
		
		$("body").append("<div class = 'lg_dim'></div>");
		
		$("body").append('<div id="alert" style="height: 250px; width: 250px; left: 276.5px;"><div class="playlist_add_title">Melon 로그인<br><br><input type="text" class="playlist_add_input logid" placeholder="ID"><br><input type="password" class="playlist_add_input logpwd" placeholder="PASSWORD"><br><div class="playlist_add_title_confirm center" style="  margin-left: 70px;">Login</div></div></div>');
	
		$(".playlist_add_title_confirm").bind("click",function(){
			
			console.setscript("[logproc]:" + $.trim($(".logid").val()) + "||" + $.trim($(".logpwd").val()));
		});
		
		$(".logpwd").bind("keypress",function(e){
			
			if(e.keyCode == 13)
				console.setscript("[logproc]:" + $.trim($(".logid").val()) + "||" + $.trim($(".logpwd").val()));
		
		});
	}*/
	

	/*
	 * $.ajax({
    url: "https://www.melon.com/muid/login/web/login_informProcs.htm",
    cache:false,
    async: false,
    method:"post",
    data:{
      "memberId": melonId,
      "memberPwd": melonPw,
      "saveId": "",
      "returnPage": "http://www.melon.com",
      "reqType": "",
      "reqProtocol": ""
    },
    success:function(data, textStatus, request){
        if (data.indexOf("오류") > 0) {
          console.log("login fail");
        } else {
          console.log("login success");
          chrome.cookies.get({url:"http://www.melon.com", name:"keyCookie"}, function(cookies){
              var memberKey = cookies.value;
              myMemberKey = memberKey;
              chrome.storage.sync.set({
                "myMemberKey": memberKey
              }, function() {
                console.log("memberKey saved");
                chrome.runtime.sendMessage({"cmd":"loginSuccess"}, function(response) {
                });
              });


          });
        }
      }
  });
	 * */
});


var player = {
	
	state : false,
	currentMusic:null,
	storageEnv : function(){
		
		setInterval(function(){
			localStorage.setItem("selecteddmusic",JSON.stringify(player.currentMusic));
		},2000);
		
	},
	
	downicons : '<svg x="0px" y="0px" width="26px" height="26px" viewBox="0 0 306 306"><g><g ><polygon points="270.3,58.65 153,175.95 35.7,58.65 0,94.35 153,247.35 306,94.35   "></polygon></g></g></svg>',
	upicons :'<svg  x="0px" y="0px" width="26px" height="26px" viewBox="0 0 451.847 451.846" ><g><path d="M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0   L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4   c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z"></path></g></svg>' ,
	playicons : '<svg x="0px" y="0px" viewBox="0 0 16 16" width="20px" height="20px" ><g><g><path style="fill:#8347A0;" d="M8,0C3.5,0,0,3.5,0,8s3.5,8,8,8s8-3.5,8-8S12.5,0,8,0z M8,14c-3.5,0-6-2.5-6-6s2.5-6,6-6s6,2.5,6,6    S11.5,14,8,14z"></path><polygon style="fill:#030104;" points="6,12 11,8 6,4   "></polygon><rect style="display:none;fill:#030104;" x="5" y="5" width="6" height="6"></rect></g></g></svg>',
	forwardicons : '<svg  x="0px" y="0px" viewBox="0 0 32 32"  width="20px" height="20px" ><g><g><polygon style="fill:#8347A0;" points="0,28 12,15.999 0,4   "></polygon><rect x="28" y="4" style="fill:#8347A0;" width="4" height="24"></rect><polygon style="fill:#8347A0;" points="14,28 26,15.999 14,4   "></polygon></g></g></svg>',
	
	init : function(){
		
		if(localStorage.getItem("selecteddmusic") == "")
			player.currentMusic = (localStorage.getItem("selecteddmusic"));
		else
			player.currentMusic = JSON.parse(localStorage.getItem("selecteddmusic"));
		
		$("#music_player").css("-webkit-transform","translateY(-560px)");
		$(".mvpulldown").append(this.downicons);
		$(".mvplay").append(this.playicons);
		$(".mvforward").append(this.forwardicons);
		
		$(".mvplay").bind("click",this.playSelected);
		$(".mvforward").bind("click",this.forwardSelected);
		
		this.drawPlaying();
		this.storageEnv();
		
		$(".mvpulldown").bind("click",function(){
			if(player.state){
				$(".mvpulldown").empty();
				$(".mvpulldown").append(player.downicons);
				$("#music_player").css("-webkit-transform","translateY(-560px)");
				player.state = false;
			}else{
				$(".mvpulldown").empty();
				
				$(".mvpulldown").append(player.upicons);
				$("#music_player").css("-webkit-transform","translateY(-2px)");
				player.state = true;
			}
		//	$("#music_player").css("-webkit-transform","translateY(-70px)")
		});
		
		$(".player_indi").bind("mousedown",function(){
			player.moveIndicator.barProgress = true;
			$(".player_ctrl_wrp").css("cursor","hand");
			
		});
		

		
		$(".player_indi, .player_prog_bar, .player_ctrl_wrp").bind("mousemove",function(e){
			if(player.moveIndicator.barProgress){
				var movedistance = e.pageX - player.moveIndicator.initialX;
				if(movedistance > 0 && movedistance < 150){
					$(".player_indi").css("left",40 + movedistance);
					$(".player_prog_bar").css("width",movedistance);
				}else if(movedistance <= 0 ){
					$(".player_indi").css("left",40);
					$(".player_prog_bar").css("width",0);
				}else if (movedistance >= 150 ){
					$(".player_indi").css("left",190);
					$(".player_prog_bar").css("width",150);
				}
				
			}
				
			
		});
		
		$(".player_indi").bind("mouseout",function(e){
			player.moveIndicator.barProgress = false;
			setTimeout(function(){
				$(".player_ctrl_wrp").css("cursor","auto");
				player.moveposition();
			},200);
			
			
		});
		
		$(".player_indi").bind("mouseup",function(){
			player.moveIndicator.barProgress = false;
			$(".player_ctrl_wrp").css("cursor","auto");
			
			player.moveposition();
		});
		
		if(localStorage.getItem("shuffle") == null)
			localStorage.setItem("shuffle",false);
		
		if(localStorage.getItem("shuffle") == "true"){
			$("#shuffle").css("fill","#56E283");	
		}

		$("#shuffle").bind("click",function(){
			if(localStorage.getItem("shuffle") == "true"){
				localStorage.setItem("shuffle",false);
				$("#shuffle").css("fill","rgba(10,10,10,0.4)");
			}else{
				localStorage.setItem("shuffle",true);
				$("#shuffle").css("fill","#56E283");	
			}
		});
		
		$(".mvlist").bind("click",function(){
			player.drawPnl();
		});
	
	},
	
	drawPnlContent : function(){

		$(".song_info_pnl").empty();
		
		$(".song_info_pnl").append("<div class = 'pnl_song_title center'></div>");
		$(".pnl_song_title").append(player.musicAddIcon);
		$(".pnl_song_title").append(player.currentMusic["songName"]);
		$(".song_info_pnl").append("<div class = 'pnl_song_singer center'></div>");
		$(".pnl_song_singer").append(player.currentMusic["artistNameBasket"]);
		$(".song_info_pnl").append("<div class = 'pnl_song_img center'></div>");
		$(".pnl_song_img").css("background-image","url('http://image.melon.com/" + player.currentMusic["albumImgPath"] + "')");
		
		$(".song_info_pnl").append("<div class = 'pnl_lyric_wrp'></div>");
		
		
		$.getJSON("http://www.melon.com/song/detail.json?songId="+ player.currentMusic["songId"]+"&callback=?").done(function(data){

			try{
				$(".pnl_lyric_wrp").html(data.lyricEntity.LYRIC);
			}catch(e){}

		});
		
		
	},
	
	drawPnl : function(option){
		
		
		
		if(option == undefined || option == null){
			if(player.songInfoState){
				$(".song_info_pnl").css("-webkit-transform","rotateY(90deg)");
				player.songInfoState = false;
				player.drawPnlContent();
			}else{
				$(".song_info_pnl").css("-webkit-transform","rotateY(0deg)");
				player.songInfoState = true;
				player.drawPnlContent();
			}
		}else if(option){
			
			if(!player.songInfoState){
				//$(".song_info_pnl").css("-webkit-transform","rotateY(0deg)");
				//player.songInfoState = true;
				player.drawPnlContent();
			}else{
				$(".song_info_pnl").css("-webkit-transform","rotateY(90deg)");
				setTimeout(function(){
					$(".song_info_pnl").css("-webkit-transform","rotateY(0deg)");
					player.drawPnlContent();
				},500);
			}
		}
		
		

	},
	
	musicAddIcon : '<svg  x="0px" y="0px" width="20px" class = "icon_musicadd_pnl" height="20px" viewBox="0 0 561.373 561.373"  >' +
						'<g>' +
							'<g>' +
								'<path style="fill: rgb(43, 150, 65);" d="M505.629,224.316v183.945c-9.125-3.652-19.074-5.686-29.502-5.686c-43.85,0-79.398,35.549-79.398,79.398    s35.549,79.398,79.398,79.398s79.398-35.549,79.398-79.398c0-0.021,0-0.043,0-0.064l0,0V224.316v-99.793h-49.896H304.428    c0.648,5.79,1.012,11.662,1.012,17.623c0,30.092-8.5,58.235-23.203,82.17H505.629z"></path>' +
								'<path style="fill: rgb(43, 150, 65);" d="M250.608,261.41c-14.568,12.552-31.435,22.495-49.896,29.077v117.775c-9.125-3.652-19.073-5.686-29.501-5.686    c-43.85,0-79.397,35.549-79.397,79.398s35.548,79.398,79.397,79.398c43.85,0,79.398-35.549,79.398-79.398c0-0.021,0-0.043,0-0.064    l0,0V261.41z"></path>' +
								'<path style="fill: rgb(218, 24, 54);" d="M147.994,284.293c18.632,0,36.411-3.623,52.717-10.142c19.003-7.595,35.971-19.167,49.896-33.697    c4.829-5.04,9.287-10.431,13.339-16.138c16.475-23.204,26.194-51.546,26.194-82.17c0-5.97-0.41-11.842-1.127-17.623    C280.33,54.339,220.528,0,147.994,0C69.49,0,5.848,63.642,5.848,142.146C5.848,220.65,69.487,284.293,147.994,284.293z     M59.618,109.787h56.013V53.77h64.719v56.014h56.016v14.74v49.979h-35.655h-20.358v56.017h-64.719v-56.013H59.618V109.787z"></path>' +
							'</g>' +
						'</g>' +
					'</svg>',	

	
	songInfoState : false,

	moveposition : function(){
		if(!player.moveIndicator.barProgress){
			var left = parseInt((parseInt($(".player_indi").css("left")) - 40)*100/150);
			$("#mplayer").get(0).currentTime = (($("#mplayer").get(0).duration*left)/100);
		}
	},
	
	setPosition : function(){
		if(!player.moveIndicator.barProgress){
			var total = $("#mplayer").get(0).duration;
			var current = $("#mplayer").get(0).currentTime;
			$(".player_indi").css("left",((current*100/total)*150/100) + 40);
			$(".player_prog_bar").css("width",((current*100/total)*150/100));
		}
	},
	
	
	moveIndicator : {
			barProgress : false,
			initialX : 460,
		},
	
	
	scroller : null,
	fb_wrpScroller : null,
	fb_wrpScroller_Count : 0,
	fb_wrpScroller_Arr : null,
	musicDownIcon : '<svg class = "pl_down" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 433.5 433.5" style=" fill: #12A4F5;margin-top: 15px;margin-left: 2px;" xml:space="preserve" class="detail convertSvgInline replaced-svg" data-id="60721" data-kw="download164"><g><g id="file-download"><path d="M395.25,153h-102V0h-153v153h-102l178.5,178.5L395.25,153z M38.25,382.5v51h357v-51H38.25z"></path></g></g></svg>',
	findmode : '<svg class = "pl_mode" x="0px" y="0px" width="25px" height="25px" style = " margin-left: 7px;fill: #33B55F;top: 3px;position: relative;" viewBox="0 0 513.255 513.255"><g><path d="M331.895,421.526V237.344l108.475-17.588c-17.277-91.572-97.64-160.85-194.234-160.85   c-109.201,0-197.721,88.52-197.721,197.721c0,109.202,88.52,197.722,197.721,197.722c10.592,0,20.978-0.857,31.115-2.459   c7.938-13.176,22.177-23.75,40.258-28.271C322.285,422.437,327.108,421.727,331.895,421.526z M282.463,75.043l-21.184,92.811   h-21.185l-15.132-92.811C247.159,63.942,282.463,75.043,282.463,75.043z M246.136,330.033c-40.542,0-73.406-32.864-73.406-73.406   c0-40.542,32.864-73.405,73.406-73.405c40.542,0,73.406,32.864,73.406,73.405C319.542,297.169,286.678,330.033,246.136,330.033z    M246.136,200.658c-30.869,0-55.969,25.1-55.969,55.969c0,30.866,25.1,55.97,55.969,55.97c30.867,0,55.969-25.104,55.969-55.97   C302.105,225.758,277.002,200.658,246.136,200.658z M246.136,296.607c-22.044,0-39.977-17.933-39.977-39.98   c0-22.044,17.939-39.977,39.977-39.977c22.047,0,39.968,17.933,39.968,39.977C286.104,278.675,268.183,296.607,246.136,296.607z    M271.458,486.001c0.958,5.308,3.062,10.249,6.1,14.688c-10.296,1.318-20.77,2.075-31.415,2.075   C110.419,502.764,0,392.345,0,256.627C0,120.91,110.419,10.491,246.136,10.491c120.473,0,220.945,87.036,242.01,201.516   l-23.896,3.88C445.057,112.913,354.586,34.702,246.136,34.702c-122.371,0-221.925,99.555-221.925,221.925   c0,122.371,99.555,221.926,221.925,221.926c8.195,0,16.279-0.479,24.246-1.348C270.453,480.125,270.772,483.062,271.458,486.001z    M513.255,225.279v213.405c0,17.674-13.175,31.771-33.727,36.96c-22.562,5.592-44.343-3.854-48.67-21.148   c-4.326-17.324,10.45-35.902,33.006-41.547c10.196-2.518,20.227-2.004,28.626,0.952V285.336L377.119,306.42l-0.532,159.944h-0.023   c-0.101,15.15-13.761,30.016-33.408,34.88c-22.283,5.609-45.643-5.001-48.148-20.877c-4.285-17.129,10.32-35.518,32.663-41.115   c10.054-2.5,19.878-1.997,28.135,0.893V250.817L513.255,225.279z"></path></g></svg>',
	drawPlaying : function(){
		
		
		
		var tmpStr = localStorage.getItem("currentmusic");
		var tmpArr = [];
		if($.trim(tmpStr) == ""  )
			tmpArr = [];
		else
			tmpArr = JSON.parse(tmpStr);
		

		var tmpSelectedStr = localStorage.getItem("selecteddmusic");
		var tmpSelectedArr = [];
		
	
		
		if($.trim(tmpSelectedStr) == "" || $.trim(tmpSelectedStr)  == '""'){
			tmpSelectedArr = [];
		}else{
			tmpSelectedArr = JSON.parse(tmpSelectedStr);
			if(tmpSelectedArr == null){
				
				tmpSelectedArr = [];
			}
		}
		
		
		if(tmpSelectedArr.length < 1){
			tmpSelectedStr = [];
			
			if(tmpArr.length < 1){
				
			}else{
				tmpSelectedArr.push(tmpArr[0]);
			}
		}
		
		
		if(typeof(tmpSelectedArr) == "object"){
			player.setminiplayer(tmpSelectedArr);
		}else{
			player.setminiplayer("");
		}
		
		$("#music_wrp > .iScrollVerticalScrollbar").remove();
		
		this.scroller = new IScroll('#music_wrp', {
			scrollX: false,
			scrollY: true,
			scrollbars:true,
			momentum: true,
			snap: false,
			snapSpeed: 400,
			keyBindings: true,
			mouseWheel:true
			
		});
		$("#music_scroller > ul").empty();
		
	
		for(var i = 0 ; i < tmpArr.length ; i++){
			
			$("#music_scroller > ul").append("<li id = 'music_list_li_" + i + "'></li>");
			$("#music_list_li_" + i).append("<div class = 'musiclist_album'></div>")
			$("#music_list_li_" + i + " > .musiclist_album").css("background-image","url('http://image.melon.com/" + tmpArr[i]["albumImgPath"] + "/melon/resize/38')");
			$("#music_list_li_" + i).append("<div class = 'musiclist_str'>" + tmpArr[i]["songName"] + "</div>")
			$("#music_list_li_" + i).append("<div class = 'musiclist_artist'>" + tmpArr[i]["artistNameBasket"] + "</div>")
			$("#music_list_li_" + i).data("songid",tmpArr[i]["songId"]);
			$("#music_list_li_" + i).data("obj",tmpArr[i]);
			
			$("#music_list_li_" + i).append(player.musicDownIcon);
			$("#music_list_li_" + i).append(player.findmode);
			
			
			$("#music_list_li_" + i + " > .musiclist_album ,#music_list_li_" + i + " > .musiclist_str ,#music_list_li_" + i + " > .musiclist_artist ").touch(function(){
			
				player.currentMusic = $(this).parent().data("obj");
				
				player.displayCurrent(player.currentMusic);
				
				player.setminiplayer(player.currentMusic);
				setTimeout(function(){
					$(".mvplay > svg >  g > g > rect" ).show();
					$(".mvplay > svg >  g > g > polygon" ).hide();
					player.playing();
				},200);
			});
		}
		
		if(isPC){
			
			$(".pl_down").css("visibility","hidden");
		}
		
		$(".svg_trash1").unbind("click").bind("click",function(e){
			$("#music_scroller > ul").empty();
			$("#music_scroller > ul").append('<li class = "center" style = "color:gray;">검색 결과가 없습니다.</li>');
			localStorage.setItem("currentmusic","");
			localStorage.setItem("selecteddmusic","");
		});
		
		$(".pl_down").unbind("click").bind("click",function(e){
			player.currentMusic = $(this).parent().data("obj");
			
			player.download(player.currentMusic['songId'] ,player.currentMusic['songName']);
		});
		$(".pl_mode").unbind("click").bind("click",function(){
			$(".songmore_info_pnl").css("-webkit-transform","rotateY(0deg)");
			$("#fb_result_scroller > ul").empty();
			
			$("#songmore_info_pnl_close").unbind("click").bind("click",function(){
				
				$(".songmore_info_pnl").css("-webkit-transform","rotateY(90deg)");
			});
			player.currentMusic = $(this).parent().data("obj");
			
			if(player.fb_wrpScroller != null)
				player.fb_wrpScroller.destroy();
			
			player.fb_wrpScroller = new IScroll('#fb_wrp', {
				scrollX: false,
				scrollY: true,
				scrollbars:true,
				momentum: true,
				snap: false,
				snapSpeed: 1000,
				keyBindings: true,
				mouseWheel:true
				
			});
			player.fb_wrpScroller_Count = 0;
			$.get("http://211.234.237.72/hbase/recommendation/recommendation_maum_songs.do?contsIds=" + player.currentMusic['songId'] + "&gnrClasses=CC0006&maxSize=1000",function(data){ /* dcsapi.melon.com */
				
				var obj = JSON.parse(data.resultData.RecommendationMaumSongs.split('"[').join('[').split(']"').join(']') );
				player.fb_wrpScroller_Arr = obj;
				var idx = 0;
				obj = player.fb_wrpScroller_Arr;
				
				var loop;
				if(obj.length > 20*player.fb_wrpScroller_Count + 20){
					loop =  20 ;
				}else{
					loop = obj.length  -20*player.fb_wrpScroller_Count ;
				}
				
				for(var key = player.fb_wrpScroller_Count*20 ; key < player.fb_wrpScroller_Count*20  + loop ; key++){
					
					$("#fb_result_scroller > ul").append("<li id ='fb_" + obj[key]["contsId"] + "'></li>");
					
					$.getJSON("http://www.melon.com/song/detail.json?songId=" + obj[key]["contsId"]+"&callback=?",function(data,tmpKey){
						
						$("#fb_" + data["songInfo"]["SONGID"] ).append('<div class="musiclist_album" style="background-image: url(http://image.melon.com/' + data["songInfo"]["ALBUMIMGPATH"] + '/melon/resize/38);"></div>');
						$("#fb_" + data["songInfo"]["SONGID"] ).append('<div class="musiclist_str">' + data["songInfo"]["SONGNAMEWAP"] + '</div>');
						$("#fb_" + data["songInfo"]["SONGID"] ).append('<div class="musiclist_artist">' + data["songInfo"]["ARTISTNAMEBASKET"] + '</div>');
						$("#fb_" + data["songInfo"]["SONGID"] ).data("obj",data["songInfo"]);
						player.fb_wrpScroller.refresh();
						
						
						$("#fb_" + data["songInfo"]["SONGID"] ).bind("dblclick",function(){
								//$(this).parent().data("obj");
								var data = $(this).data("obj");
								//console.log("sss");
								var obj ={"albumImgPath":data["ALBUMIMGPATH"],"songId":data["SONGID"],"songName":data["SONGNAMEWAP"],"artistNameBasket":data["ARTISTNAMEBASKET"]};
								player.addMusicAndPlay(obj);
							
							}
								
						);
						$("#fb_wrp > .iScrollVerticalScrollbar > .iScrollIndicator").addClass("listIndicator");
						idx++;
						
						
					});
						
					
				}
				
				$("#fb_result_scroller > ul").append("<li id ='more'>더 보기</li>");
				player.fb_wrpScroller.refresh();
				
				$("#more").bind('click', function(e){
					player.reloadData();
				});
				
			});
			
		});
		
		
		
		$("#music_wrp > .iScrollVerticalScrollbar > .iScrollIndicator").addClass("listIndicator");
		
		$(".add_music_fv").unbind("mouseover");
		$(".add_music_fv").unbind("mouseout");
		$(".add_music_fv").bind("mouseover",function(){
			$(this).css("fill","rgba(57, 119, 57, 0.3)");
		});
		$(".add_music_fv").bind("mouseout",function(){
			$(this).css("fill","rgba(57, 119, 57, 0.7)");
		});
		
		$(".add_music_fv").bind("click",function(){
			console.log($(this).parent.data("obj"));
		});

		if(tmpArr.length == 0){
			$("#music_scroller > ul").append("<li id = 'music_list_li_0' class = 'center fr'>목록이 비어 있습니다.</li>");

		}else{
			this.scroller.refresh();
			this.displayCurrent(tmpSelectedArr);
			this.currentMusic = tmpSelectedArr;
		}
		
	},
	
	reloadData : function(){
		$("#more").remove();
		player.fb_wrpScroller_Count = player.fb_wrpScroller_Count + 1;
		
		obj = player.fb_wrpScroller_Arr;
		
		var loop;
		if(obj.length > 20*player.fb_wrpScroller_Count + 20){
			loop =  20 ;
		}else{
			loop = obj.length  -20*player.fb_wrpScroller_Count ;
		}
		
		for(var key = player.fb_wrpScroller_Count*20 ; key < player.fb_wrpScroller_Count*20  + loop ; key++){
			
			$("#fb_result_scroller > ul").append("<li id ='fb_" + obj[key]["contsId"] + "'></li>");
			
			$.getJSON("http://www.melon.com/song/detail.json?songId=" + obj[key]["contsId"]+"&callback=?",function(data,tmpKey){
				//$("#fb_result_scroller > ul").append("<li id ='fb_" + data["songInfo"]["SONGID"] + "'></li>");
				$("#fb_" + data["songInfo"]["SONGID"] ).append('<div class="musiclist_album" style="background-image: url(http://image.melon.com/' + data["songInfo"]["ALBUMIMGPATH"] + '/melon/resize/38);"></div>');
				$("#fb_" + data["songInfo"]["SONGID"] ).append('<div class="musiclist_str">' + data["songInfo"]["SONGNAMEWAP"] + '</div>');
				$("#fb_" + data["songInfo"]["SONGID"] ).append('<div class="musiclist_artist">' + data["songInfo"]["ARTISTNAMEBASKET"] + '</div>');
				$("#fb_" + data["songInfo"]["SONGID"] ).data("obj",data["songInfo"]);
				player.fb_wrpScroller.refresh();
				
				
				$("#fb_" + data["songInfo"]["SONGID"] ).bind("dblclick",function(){
						//$(this).parent().data("obj");
						var data = $(this).data("obj");
						//console.log("sss");
						var obj ={"albumImgPath":data["ALBUMIMGPATH"],"songId":data["SONGID"],"songName":data["SONGNAMEWAP"],"artistNameBasket":data["ARTISTNAMEBASKET"]};
						player.addMusicAndPlay(obj);
					
					}
						
				);
				$("#fb_wrp > .iScrollVerticalScrollbar > .iScrollIndicator").addClass("listIndicator");
				//idx++;
				
				
			});
				
			
		}
		
		setTimeout(function(){
			if(loop == 20){
				$("#fb_result_scroller > ul").append("<li id ='more'>더 보기</li>");
			}
			player.fb_wrpScroller.refresh();
			$("#more").unbind('click');
			$("#more").bind('click', function(e){
				player.reloadData();
			});
			
		},200);
	},
	
	setminiplayer : function(obj){
		if(obj == ""){
			$(".mv_title").text("목록이 비어있습니다.");
			$(".mvplay, .mvforward, .mv_album").hide();
			
		}else{
			$(".mvtxt").empty();
			$(".mvtxt").append("<div class='mv_album'></div>");
			$(".mvtxt").append("<div class='mv_title'></div>");
			$(".mvtxt").append("<div class='mv_artist'></div>");
			
			$(".mv_title").text(obj["songName"]);
			$(".mv_album").css("background-image","url('http://image.melon.com/" + obj["albumImgPath"] + "/melon/resize/28')");
			$(".mv_artist").text(obj["artistNameBasket"]);
			$(".mvplay, .mvforward, .mv_album").show();
		}
		
	},
	
	playing : function(){
		$("#music_scroller > ul > li").each(function(){
			if($(this).data("selected")){
				
				$(this).find(".musiclist_album").css("-webkit-transition-duration","1000s");
				$(this).find(".musiclist_album").css("-webkit-transform","rotateZ(360000deg)");
				$(".mv_album").css("-webkit-transition-duration","1000s").css("-webkit-transform","rotateZ(360000deg)");
			
				player.playMuic(player.currentMusic);
			}else{
				$(this).find(".musiclist_album").css("-webkit-transition-duration","0s");
				$(this).find(".musiclist_album").css("-webkit-transform","rotateZ(0deg)");
				
			}
			
		});
	},
	
	stoping : function(){
		$("#music_scroller > ul > li").each(function(){
			if($(this).data("selected")){
				
				$(this).find(".musiclist_album").css("-webkit-transition-duration","0s");
				$(this).find(".musiclist_album").css("transform","rotateZ(0deg)");
				$(".mv_album").css("-webkit-transition-duration","0s").css("-webkit-transform","rotateZ(0deg)");
			}
			
		});
		$("#mplayer").get(0).pause();
	},
	
	displayCurrent : function(obj,option){
		
	
		
		var initialCnt = 1;
		var thatObj = obj;
		player.stoping();
		
		$("#music_scroller > ul > li").each(function(){
			
			if(obj["songId"] == $(this).data("obj")["songId"]){
				$(this).css("background-color","#DEECE7");
				$(this).data("selected",true);
				if(option){
					
					player.scroller.scrollToElement("#" + $(this).attr("id"),200);
				}
			}else{
				$(this).css("background-color","transparent");
				$(this).data("selected",false);
			}
			
		});
	},
	
	playSelected : function(){
		if(player.currentMusic == null){
			player.musicNullEffect();
		}else{
			if($(".mvplay > svg >  g > g > polygon" ).css("display") == "none"){
				$(".mvplay > svg >  g > g > polygon" ).show();
				$(".mvplay > svg >  g > g > rect" ).hide();
				player.stoping();
			}else{
				$(".mvplay > svg >  g > g > rect" ).show();
				$(".mvplay > svg >  g > g > polygon" ).hide();
				player.playing();
			}
			
		}
	},
	
	forwardSelected : function(){
		if(player.currentMusic == null){
			player.musicNullEffect();
		}else{
			if(localStorage.getItem("shuffle") == "false")
				player.nextplay();
			else
				player.rdm_nextplay();
		}
	},
	
	rdm_nextplay : function(){
		
		var rdnum = Math.floor((Math.random() * $("#music_scroller > ul > li").size()));
		
		$("#music_scroller > ul > li").each(function(index){
			if(rdnum == index){
				player.currentMusic = $(this).data("obj");
			}
		});
		
		player.displayCurrent(player.currentMusic,true);
		player.setminiplayer(player.currentMusic);
		setTimeout(function(){
			$(".mvplay > svg >  g > g > rect" ).show();
			$(".mvplay > svg >  g > g > polygon" ).hide();
			player.playing();
			player.drawPnl(true);
		},200);
		
	},
	
	nextplay : function(){
		var selectedIndex = 0;
		var maxIndex = -1;
		$("#music_scroller > ul > li").each(function(index){
			maxIndex++;
			if($(this).data("obj")["songId"] == player.currentMusic["songId"]){
				selectedIndex = index;
			}
		});
		
		if(selectedIndex == maxIndex){
			selectedIndex = 0
		}else{
			selectedIndex = selectedIndex+1;
		}
		
		$("#music_scroller > ul > li").each(function(index){
			if(selectedIndex == index){
				player.currentMusic = $(this).data("obj");
			}
		});
		
		player.displayCurrent(player.currentMusic,true);
		player.setminiplayer(player.currentMusic);
		setTimeout(function(){
			$(".mvplay > svg >  g > g > rect" ).show();
			$(".mvplay > svg >  g > g > polygon" ).hide();
			player.playing();
			player.drawPnl(true);
		},200);
	},
	
	musicNullEffect : function(){
		
		//$(".mvtxt").css("font-weight","bold").css("transform","scale(1.1)");
		/*setTimeout(function(){
			$(".mvtxt").css("font-weight","normal").css("transform","scale(1)");
		},300);*/
	},
	
	addMusicAndPlay : function(obj){
		
		player.currentMusic = obj;
		localStorage.setItem("selecteddmusic",JSON.stringify(player.currentMusic));
		
		var sData = localStorage.getItem("currentmusic");
		
		if($.trim(sData) == "")
			sData = [];
		else
			sData = JSON.parse(sData);
		
		var sDataArr = [];
		
		for(var key in sData){
			
			sDataArr.push(sData[key]);
		}
		
		var tmpArr = [];
		
		var tmpKey = false;
		for(var key in sDataArr){
			if(sDataArr[key]["songId"] == obj["songId"]){
				tmpKey = true;
			}
		}
		if(!tmpKey)
			tmpArr.push(obj);
		
		tmpArr = sDataArr.concat(tmpArr);
		localStorage.setItem("currentmusic",JSON.stringify(tmpArr));
		
		player.drawPlaying();
		player.displayCurrent(player.currentMusic,true);
		player.setminiplayer(player.currentMusic);
		
		setTimeout(function(){
			$(".mvplay > svg >  g > g > rect" ).show();
			$(".mvplay > svg >  g > g > polygon" ).hide();
			player.playing();
		},200);
	},
	
	updateFromMusic : function(){
		var sData = localStorage.getItem("currentmusic");
		
		if($.trim(sData) == "")
			sData = [];
		else
			sData = JSON.parse(sData);
		
		var sDataArr = [];
		
		for(var key in sData){
			
			sDataArr.push(sData[key]);
		}
		
		var tmpArr = [];
		
		$(".list_li_selected").each(function(){
			if(sDataArr.length > 0){
				var tmpKey = false;
				for(var key in sDataArr){
					
					if(sDataArr[key]["songId"] == $(this).data("obj")["songId"]){
						tmpKey = true;
					}
				}
				if(!tmpKey)
					tmpArr.push($(this).data("obj"));
			}else{
				
				tmpArr.push($(this).data("obj"));
			}
		});
		
		tmpArr = sDataArr.concat(tmpArr);
		
		localStorage.setItem("currentmusic",JSON.stringify(tmpArr));
	},
	
	download : function(songid,songname){
		console.log(songid,songname);
		var url = "http://m.melon.com/cds/delivery/smartapp/mediadelivery_androidDelivery.json";
		
		var data = {
				"cpId": "AS40",
				"cpKey": "14LNM3",
				"command": "stream",
				"act": "getPath",
				"mdn": "88888888888",
				"menuid": "75010101",
				"hwkey": "01025850820%7CLGF240K8fd7f0c0%7CLGF240K%7C",
				"metatype": "SKM",
				"ukey": myInfo.memberKey,
				"ctype": "1", // 곡
				"cid": songid,
				"isadult": "Y",
				"real_name": "N",
				"sAdultAuth": "N",
				"metatype": "AAC"
			};
		
		var songname = songname;
		$.post( url , data , function(data){
				data.PATH
				console.setscript('[filedown]:' + data.PATH + '||' + songname);
			});
	},
	
	playMuic : function(obj){
		
		var url = "http://m.melon.com/cds/delivery/smartapp/mediadelivery_androidDelivery.json";
		
		var data = {
				"cpId": "AS40",
				"cpKey": "14LNM3",
				"command": "stream",
				"act": "getPath",
				"mdn": "88888888888",
				"menuid": "75010101",
				"hwkey": "01025850820%7CLGF240K8fd7f0c0%7CLGF240K%7C",
				"metatype": "SKM",
				"ukey": myInfo.memberKey,
				"ctype": "1", // 곡
				"cid": obj["songId"],
				"isadult": "Y",
				"real_name": "N",
				"sAdultAuth": "N",
				"metatype": "AAC"
			};

		$.post( url , data , function(data){
				$("#mplayer").bind('loadedmetadata', function(){
					//set TimeStampe
					player.setNexTime(this.duration);
				});

				$("#mplayer").bind('timeupdate', function(){
					player.setCurrentTime(this.currentTime);
					player.setPosition();
				});
				
				$("#mplayer").bind('ended', function(){
					$(".mvforward").trigger("click");
				});
	
				
				
				$("#mplayer").prop("src", data.PATH);
				$("#mplayer").get(0).play();
				
				var left = parseInt((parseInt($(".player_indi").css("left")) - 40)*100/150);
				$("#mplayer").get(0).currentTime = (left/100);
				
				$("#mplayer").prop("volume", 0.5);
				
				
			});
	},
	setCurrentTime : function(intTime){
		var min = parseInt(intTime/60);
		var sec = parseInt(intTime%60);
		if(min < 10){
			min = "0" + min;
		}
		
		if(sec < 10){
			sec = "0" + sec;
		}
		$(".player_prev_time").text(min + ":" + sec);
		
	},
	setNexTime : function(intTime){
		
		var min = parseInt(intTime/60);
		var sec = parseInt(intTime%60);
		if(min < 10){
			min = "0" + min;
		}
		
		if(sec < 10){
			sec = "0" + sec;
		}
		$(".player_next_time").text(min + ":" + sec);
	}
	
}

var myInfo = {
	memberKey : null
}

var dataHandler = {
	
	playlistUpdate : function(playListIndex,playListName,ListArr,callback){
		
		var url = "http://www.melon.com/mymusic/playlist/mymusicplaylistupdate_updateAction.json?callback=?";
		
		var tmpSongId = "";
		for(var key in ListArr){
			if (key != 0) {
				tmpSongId += "&";
			}
			tmpSongId += "songIds%5B%5D=";
			tmpSongId += ListArr[key] + "%3AY";
		}
		
		url = url + tmpSongId;
		
		var data = {
				"plylstSeq": playListIndex,
				"plylstTitle": encodeURI(playListName),
						"playlistDesc": "",
						"openYn": "Y",
						"repntImageCheck": "N",
						"songChangeCheck": "true",
						"repntImagePathDefaultYn": "N"
			};
		var thatCallback = callback;
		
		$.getJSON( url , data , function(data){
				eval(thatCallback());
			});

	},
	
	console : function(data){
		console.log(data);
	},
	
	getSonglist : function(index,callback){
		var playlistIndex = index;
		var thatCallback = callback;
		var rtnObj = null;
		$.getJSON("http://www.melon.com/mymusic/playlist/mymusicplaylistview_listPagingSong.json?startIndex=0&pageSize=50&plylstSeq=" + playlistIndex+"&callback=?" , function(data){
			rtnObj = data;
			if(data.songList.length == 50){
				$.getJSON("http://www.melon.com/mymusic/playlist/mymusicplaylistview_listPagingSong.json?startIndex=51&pageSize=50&plylstSeq=" + playlistIndex+"&callback=?" , function(data){
				
					for(var key in data.songList){
						rtnObj.songList.push(data.songList[key]);
					}
					if(data.songList.length == 50){
						$.getJSON("http://www.melon.com/mymusic/playlist/mymusicplaylistview_listPagingSong.json?startIndex=101&pageSize=50&plylstSeq=" + playlistIndex +"&callback=?", function(data){
							
							for(var key in data.songList){
								rtnObj.songList.push(data.songList[key]);
							}
							if(data.songList.length == 50){
								$.getJSON("http://www.melon.com/mymusic/playlist/mymusicplaylistview_listPagingSong.json?startIndex=151&pageSize=50&plylstSeq=" + playlistIndex +"&callback=?", function(data){
									for(var key in data.songList){
										rtnObj.songList.push(data.songList[key]);
									}
									eval(thatCallback(rtnObj));	
								});
							}else{
								eval(thatCallback(rtnObj));	
							}
							
						});
					}else{
						eval(thatCallback(rtnObj));
					}
					
				});
			}else{
				eval(thatCallback(rtnObj));
			}
		});
	},
	
	addPlaylist : function(playlistName,callback){
		
		var url = "http://www.melon.com/mymusic/playlist/mymusicplaylistinsert_insertAction.json?callback=?";
		

		var data = {
			"plylstTitle": encodeURI(playlistName),
			"playlistDesc": "",
			"openYn": "Y",
			"repntImagePathDefaultYn": "N"
		}
		
		var thatCallback = callback;
		
		$.post( url , data , function(data){
				
				eval(thatCallback(data));
			});
		
	}
	
}

var myMusic = {
	init : function(){
		this._procUI(true);
		this.getInfo();
	},
	_procUI : function(bool){
		if(bool){
			$("#main_mymusic").css("display","block");
			$(".music_title").text("My Music");
		}
	},
	
	getInfo : function(){
		
		var that = this;
		$.getJSON("http://www.melon.com/mymusic/main/mymusicmain_list.json?memberKey=" + myInfo.memberKey+"&callback=?" ,function(data){
			that.drawProfileImage(data["profileInfo"]["MYPAGEIMG"]);
			that.setNickName(data["profileInfo"]["MEMBERNICKNAME"]);
			that.setGenre(data["profileInfo"]["GNR1CODE"],data["profileInfo"]["GNR2CODE"],data["profileInfo"]["GNR3CODE"]);
			that.setGraph(data["profileInfo"]["PREFE1SCORE"],data["profileInfo"]["PREFE2SCORE"],data["profileInfo"]["PREFE3SCORE"]);
			
			that.getMyplaylist();
		});
	},
	
	drawProfileImage : function(path){
		$(".profile_img").css("background-image","url('http://image.melon.com" + path  + "/" + myInfo.memberKey + "_194.jpg')");
	},
	
	setNickName : function(str){
		$(".nickname").text(str);
	},
	
	setGenre : function(str1,str2,str3){
		$(".genre_info1").text(str1);
		$(".genre_info2").text(str2);
		$(".genre_info3").text(str3);
	},
	
	setGraph : function(value1,value2,value3){
		$(".genre_info_bar1 > div ").css("-webkit-transform","translateX(0px)");
		$(".genre_info_bar2 > div ").css("-webkit-transform","translateX(0px)");
		$(".genre_info_bar3 > div ").css("-webkit-transform","translateX(0px)");
		
		var tmp1 = value1;
		var tmp2 = value2;
		var tmp3 = value3;
		
		setTimeout(function(){
		$(".genre_info_bar1 > div ").css("-webkit-transform","translateX(" + tmp1*1.5 + "px)");
		$(".genre_info_bar2 > div ").css("-webkit-transform","translateX(" + tmp2*1.5 + "px)");
		$(".genre_info_bar3 > div ").css("-webkit-transform","translateX(" + tmp3*1.5 + "px)");
		},500);
	
	},
	
	scroller : null,
	
	getMyplaylist:function(){
		var that = this;
		$.getJSON("http://www.melon.com/mymusic/playlist/mymusicplaylist_list.json?memberKey=" + myInfo.memberKey +"&callback=?",function(data){
			
			$("#playlist_wrp > .iScrollHorizontalScrollbar").remove();
			
			this.scroller = new IScroll('#playlist_wrp', {
				scrollX: true,
				scrollY: false,
				scrollbars:true,
				momentum: true,
				snap: false,
				snapSpeed: 400,
				keyBindings: true,
				mouseWheel:true
				
			});
			
			$("#playlist_wrp > #scroller").empty();
			
			
			for(var i = 0 ; i < data.playlistList.length ; i++){
				
				
				var imgpath = data.playlistList[i]["thumbImagePath"];
				if(imgpath == null || imgpath == "null")
					imgpath = "http://image.melon.co.kr/resource/image/web/default/noAlbum_200.jpg";
				else
					imgpath = "http://image.melon.com" + imgpath; 
				
				$("#playlist_wrp > #scroller").append("<div class='slide' id = 'slide_" + i + "' ><img src = '" + imgpath + "' width='100px' height = '100px' ><div class = 'slide_1st'>" + data.playlistList[i]["plylstName"] + "</div></div>");
				$("#slide_" + i + "").append("<div class = 'slide_2nd'>장르구성 : " + data.playlistList[i]["genreName"] +  "</div>");
				$("#slide_" + i + "").append("<div class = 'slide_3rd'>수록곡 : 총 " + data.playlistList[i]["songCnt"] +  "곡 </div>");
				$("#slide_" + i + "").data("obj",data.playlistList[i]);
				if(parseInt(data.playlistList[i]["songCnt"]) > 0)
					$("#slide_" + i + "").append("<div class = 'slide_4th'>" + data.playlistList[i]["songList"][0]["songNameWebList"] +  "곡 </div>");
				
				if(parseInt(data.playlistList[i]["songCnt"]) > 1)
					$("#slide_" + i + "").append("<div class = 'slide_4th'>" + data.playlistList[i]["songList"][1]["songNameWebList"] +  "곡 </div>");
			}
			
			$("#playlist_wrp > #scroller").css("width",$(".slide").width()*data.playlistList.length);
			
			this.scroller.refresh();
			$(".slide > img").unbind("mouseover");
			$(".slide > img").unbind("mouseout");
			//$(".slide > img").unbind("click");
			$(".slide > img").bind("mouseover",function(){
				$(this).css("-webkit-filter","opacity(0.6)").css("cursor","hand");
			});
			$(".slide > img").bind("mouseout",function(){
				$(this).css("-webkit-filter","opacity(1)");
			});
			
			$(".slide > img").touch(function(){
				commonUI.openPlaylist($(this).parent().data("obj"));
			});
			
		});
	},
	
	
	
	
	
}

var commonUI = {
	
	openPlaylist : function(obj){
		this.openMainDim({type:"dismiss",obj:$(".playlistbox")});
		$(".playlistbox").css("-webkit-transform","translateX(730px)");
		
		this.playlistBoxDraw(obj);
		//thumbnail
		
		
		
	
	},
	
	playlistInfoMake : function(obj){
		if(obj["PLYLSTTITLE"] != undefined){
			var imgpath = obj["THUMBIMAGEPATH"];
			var playlistName = obj["PLYLSTTITLE"];
			var playlistSeq = obj["PLYLSTSEQ"];
			var tmpgenre; // = obj["genreName"];
			for(var key in obj["PLYLSTGNRS"]){
				if(key == 0){
					tmpgenre = obj["PLYLSTGNRS"][key]["GNRNAME"];
				}else{
					tmpgenre = tmpgenre + "," + obj["PLYLSTGNRS"][key]["GNRNAME"];
				}
			}
			var playlistSongCnt = obj["SONGCNT"];	
		}else{
			var imgpath = obj["thumbImagePath"];
			var playlistName = obj["plylstName"];
			var playlistSeq = obj["plylstSeq"];
			var tmpgenre = obj["genreName"];
			var playlistSongCnt = obj["songCnt"];
		}
		if(imgpath == null || imgpath == "null")
			imgpath = "http://image.melon.co.kr/resource/image/web/default/noAlbum_200.jpg";
		else
			imgpath = "http://image.melon.com" + imgpath; 
		
		$(".playlist_item").empty();
		$(".playlist_item").append("<div class = 'playlist_img_box'></div>");
		$(".playlist_item").append("<div class = 'playlist_subtitle'>제목 :</div>");
		$(".playlist_item").append("<div class = 'playlist_edittile'>" + playlistName + "</div>");
		$(".playlist_item").data("seq",playlistSeq);
		$(".playlist_item").data("obj",obj);
		if(tmpgenre == null || tmpgenre == "")
			tmpgenre = "장르가 없습니다.";
		
		$(".playlist_item").append("<div class = 'playlist_genretitle'>장르구성 : " + tmpgenre +  "</div>");
		$(".playlist_item").append("<div class = 'playlist_genretitle'>수록곡 : " + playlistSongCnt +  "곡</div>");
		$(".playlist_img_box").css("background-image","url('" + imgpath  + "')");
		
		this.addEventEditTitle();
	},
	
	playlistBoxDraw : function(obj){
		
		this.playlistInfoMake(obj);
		
		this.makelist(obj["plylstSeq"],obj["songCnt"] );
		
		if(_isSafari && !_isChrome){
			$(".playlist_arrow").css("margin-left","-24px");
			$(".playlistadd").css("margin-left","-24px");
		}
		
		this.setIconPlayList();
	},
	
	setIconPlayList : function(){
		var that = this;
		$(".svg_close, .svg_add, .svg_done, .svg_unchecked, .svg_checked, .svg_play").unbind("mouseover");
		$(".svg_close, .svg_add, .svg_done, .svg_unchecked, .svg_checked, .svg_play").bind("mouseover",function(){
			//$(this).css("opacity","0.5");
		
			if($.trim($(this).attr("class")) == "svg_add"){
				$(".status_msgbox").text("곡 추가");
				$(".status_msg").css("top",65).css("left",657);
				$(".status_msg").css("-webkit-filter","opacity(0.8)");
				$(".status_arrow").css("-webkit-transform","rotateZ(90deg) translateX(20px) translateY(33px)");
			}
			
			if($.trim($(this).attr("class")) == "svg_close"){
				$(".status_msgbox").text("창 닫기");
				$(".status_msg").css("top",65).css("left",657);
				$(".status_msg").css("-webkit-filter","opacity(0.8)");
				$(".status_arrow").css("-webkit-transform","rotateZ(270deg) translateX(17px) translateY(-33px)");
			}
			
			if($.trim($(this).attr("class")) == "svg_done"){
				$(".status_msgbox").text("완료");
				$(".status_msg").css("top",65).css("left",657)
				$(".status_msg").css("-webkit-filter","opacity(0.8)");
				$(".status_arrow").css("-webkit-transform","rotateZ(90deg) translateX(20px) translateY(33px)");
			}
			
			if($.trim($(this).attr("class")) == "svg_unchecked"){
				$(".status_msgbox").text("전체 해제");
				$(".status_msg").css("top",405).css("left",110)
				$(".status_msg").css("-webkit-filter","opacity(0.8)");
				$(".status_arrow").css("-webkit-transform","rotateZ(90deg) translateX(20px) translateY(33px)");
			}
			
			if($.trim($(this).attr("class")) == "svg_checked"){
				$(".status_msgbox").text("전체 선택");
				$(".status_msg").css("top",405).css("left",30)
				$(".status_msg").css("-webkit-filter","opacity(0.8)");
				$(".status_arrow").css("-webkit-transform","rotateZ(90deg) translateX(20px) translateY(33px)");
			}
			
			if($.trim($(this).attr("class")) == "svg_play"){
				$(".status_msgbox").text("재생 목록");
				$(".status_msg").css("top",300).css("left",105)
				$(".status_msg").css("-webkit-filter","opacity(0.8)");
				$(".status_arrow").css("-webkit-transform","rotateZ(90deg) translateX(20px) translateY(33px)");
			}
		});
		
		$(".svg_close, .svg_add, .svg_done, .svg_unchecked, .svg_checked, .svg_play").unbind("mouseout");
		$(".svg_close, .svg_add, .svg_done, .svg_unchecked, .svg_checked, .svg_play").bind("mouseout",function(){
			$(this).css("opacity","1");
			$(".status_msg").css("-webkit-filter","opacity(0.0)");
		});
		
		$(".svg_close, .svg_add, .svg_unchecked, .svg_checked, .svg_move ,.svg_play").unbind("click");
		
		
		
		$(".svg_unchecked").bind("click",function(){
			if($(".svg_done").css("display") == "none"){
				$("#list_scroller > ul > li").each(function(){
					if($(this).attr("class") == "list_li_selected")
						commonUI.listItem_unChecked(this);
				});
			}
			
			if(commonUI.isSongMove){
				commonUI.setSelectDummy();
			}
		});
		
		$(".svg_checked").bind("click",function(){
			//$(".maindim").trigger("click");
			if($(".svg_done").css("display") == "none"){
				$("#list_scroller > ul > li").each(function(){
					if($(this).attr("class") == undefined || $(this).attr("class") == "")
						commonUI.listItem_checked(this);
				});
			} 
			
			if(commonUI.isSongMove){
				commonUI.setSelectDummy();
			}
		});
		
		$(".svg_play").bind("click",function(){
			
			var count = 0;
			$(".list_li_selected").each(function(){
				count++;
			});
			
			var option = {type:"musiclist_add",items:count}
			commonUI.openAlert(option);
			
			/**/
		});
		
		$(".svg_close").bind("click",function(){
			$(".maindim").trigger("click");
		});
		$(".svg_add").bind("click",function(){
			if(!that.isChange){
				$(".svg_add").css("display","none");
				that.isChange = true;
				that.playlistReduce();
				
				setTimeout(function(){
					that.isChange = false;
				},200);
				
				$("#list_scroller > ul > li").each(function(){
					if($(this).data("flag") != "none"){
						that.listItem_unChecked(this);
					}
				});
				//listItem_unChecked
			}
		});
		
		$(".playlistbox").append(commonUI.moveSVGIcon);
		//$(".playlistbox").append(commonUI.listMoveSVGIcon);
		
		$(".svg_move").bind("mouseover",function(){
			$(".status_msgbox").text("PlayList 편집");
			$(".status_msg").css("top",373).css("left",637).width(80);
			$(".status_msg").css("-webkit-filter","opacity(0.8)");
			$(".status_arrow").css("-webkit-transform","rotateZ(90deg) translateX(20px) translateY(33px)");
		});

		$(".svg_move").bind("mouseout",function(){
			$(".status_msg").css("-webkit-filter","opacity(0.0)").width(60);;
		});
		
		$(".svg_move").bind("click",function(e){
			
			var timer = 10;
			if($(".svg_done").css("display") == "block"){
				$(".svg_done").trigger("click");
				timer = 1000;
			}
			
			setTimeout(function(){
				commonUI.moveSelectDummy(e);
				
				$(".playlistbox").bind("mousemove",function(e){
					commonUI.moveSelectDummy(e)
				});
				
				commonUI.songMove();
			},timer);
		});
		

	},
	
	isChange : false,
	
	playlistReduce : function(){
		var that = this;
		
		$(".playlist_list").css("width",150);
		$("#list_wrp").css("width",140);
		$("#list_wrp > .iScrollVerticalScrollbar").css("left","416").css("-webkit-transition","0.4s");
		$(".svg_add, .svg_unchecked , .svg_checked").css("display","none");
		$(".svg_done ").css("display","block");
		

		
		$(".svg_done").unbind("click");
		this.makeSearchArea();
		
		$(".svg_done").bind("click",function(){
			that.playlistRecover();
		});
	},
	
	searchInputResize : function(bool){
		var that = this;
		if(bool){
			setTimeout(function(){
				$(".search_result_popup_arrow").css("display","block");
					$(".search_input, .search_result_popup , .search_result_popup_arrow").css("-webkit-transform","rotateY(0deg)");
					$(".search_input").focus();
					$(".addmusic_list").css("display","none");
					$(".addmusic_list_drag").css("display","block");
					that.setEventSearchInput();
				},400);
		}else{
			//setTimeout(function(){
					$(".search_result_popup_arrow").css("display","none");
					$(".addmusic_list").css("display","block");
					$(".addmusic_list_drag").css("display","none");
					
					$(".search_input, .search_result_popup, .search_result_popup_arrow").css("-webkit-transform","rotateY(90deg)");
			//	},400);
		}
	},
	
	setEventSearchInput : function(){
		var that = this;
		$(".search_input").bind("keyup",function(e){
			that.searchLoading(true);
			that.search($(this).val());
			e.stopPropagation();
		});
	},
	
	searchLoading : function(bool){
		if(bool){
			$(".loading_circle").remove();
			$("#popup_scroller").css("display","none");
			$("#popup_wrp").append("<div class = 'loading_circle'><div class = 'loading_circle_inner'></div></div>");
			setTimeout(function(){
				//$(".loading_circle").css("-webkit-transform","rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)");
				$(".loading_circle").css("-webkit-transform","rotateZ(3600deg)");
				},100);
			
		}else{
			$("#popup_scroller").css("display","block");
		}
	},
	
	searchScroll : null,
	isSearch : false,
	musicAddIcon : '<svg  x="0px" y="0px" width="20px" class = "icon_musicadd" height="20px" viewBox="0 0 561.373 561.373"  >' +
						'<g>' +
							'<g>' +
								'<path style="fill: rgb(43, 150, 65);" d="M505.629,224.316v183.945c-9.125-3.652-19.074-5.686-29.502-5.686c-43.85,0-79.398,35.549-79.398,79.398    s35.549,79.398,79.398,79.398s79.398-35.549,79.398-79.398c0-0.021,0-0.043,0-0.064l0,0V224.316v-99.793h-49.896H304.428    c0.648,5.79,1.012,11.662,1.012,17.623c0,30.092-8.5,58.235-23.203,82.17H505.629z"></path>' +
								'<path style="fill: rgb(43, 150, 65);" d="M250.608,261.41c-14.568,12.552-31.435,22.495-49.896,29.077v117.775c-9.125-3.652-19.073-5.686-29.501-5.686    c-43.85,0-79.397,35.549-79.397,79.398s35.548,79.398,79.397,79.398c43.85,0,79.398-35.549,79.398-79.398c0-0.021,0-0.043,0-0.064    l0,0V261.41z"></path>' +
								'<path style="fill: rgb(218, 24, 54);" d="M147.994,284.293c18.632,0,36.411-3.623,52.717-10.142c19.003-7.595,35.971-19.167,49.896-33.697    c4.829-5.04,9.287-10.431,13.339-16.138c16.475-23.204,26.194-51.546,26.194-82.17c0-5.97-0.41-11.842-1.127-17.623    C280.33,54.339,220.528,0,147.994,0C69.49,0,5.848,63.642,5.848,142.146C5.848,220.65,69.487,284.293,147.994,284.293z     M59.618,109.787h56.013V53.77h64.719v56.014h56.016v14.74v49.979h-35.655h-20.358v56.017h-64.719v-56.013H59.618V109.787z"></path>' +
							'</g>' +
						'</g>' +
					'</svg>',	
	
	search : function(str){
		
		$("#popup_wrp > #popup_scroller > ul ").empty();
		$("#popup_wrp > .iScrollVerticalScrollbar ").remove();
		
		this.searchScroll  = new IScroll('#popup_wrp', { mouseWheel: true,scrollbars:true });
		
		var that = this;
		
		if(!this.isSearch){
		
			this.isSearch = true;
			
			$.getJSON("http://www.melon.com/search/keyword/index.json?query=" + encodeURI(str)+"&callback=?",function(data){
				
				if(data["STATUS"] == "3001"){
					$("#popup_scroller > ul").append("<li><div class = 'search_none'>검색 결과가 없습니다.</div> </li>");
					
				}else{
					
					if(data["SONGCONTENTS"].length < 1){
						$("#popup_scroller > ul").append("<li><div class = 'search_none'>검색 결과가 없습니다.</div> </li>");
					}else{
						for(var key in data["SONGCONTENTS"]){
							//$("#list_scroller > ul").append("<li id = 'listItem_li_" + key +"' ><div>" + data["songList"][key]["songName"] + "</div></li>");
							$("#popup_scroller > ul").append("<li id = 'popup_Item_li_" + key +"' ></li>");
							$("#popup_Item_li_" + key).append("<div class = 'popup_album' data-type = 'search'></div>");
							$("#popup_Item_li_" + key + " > .popup_album").css("background-image","url('http://image.melon.com" + data["SONGCONTENTS"][key]["ALBUMIMG"]  + "')");
							$("#popup_Item_li_" + key).append('<div class="popup_singer" data-type="search">' +data["SONGCONTENTS"][key]["ARTISTNAME"] + '</div>');
							$("#popup_Item_li_" + key).append(that.musicAddIcon);
							$("#popup_Item_li_" + key).append('<div class="popup_title" data-type="search">' +data["SONGCONTENTS"][key]["SONGNAME"] + '</div>');
							$("#popup_Item_li_" + key).data("obj",data["SONGCONTENTS"][key]);
							
						}
						
						$("#popup_scroller > ul > li").bind("mouseover",function(){
							$(this).addClass("list_li_over");
						});
						
						$("#popup_scroller > ul > li").bind("mouseout",function(){
							$(this).removeClass("list_li_over");
						});
						
						$(".icon_musicadd").bind("mouseover",function(){
							if(!that.isSearchArrow){
								$(this).css("-webkit-transform","scale(1.2)");
							}
						});
						
						$(".icon_musicadd").bind("mouseout",function(){
							if(!that.isSearchArrow){
								$(this).css("-webkit-transform","scale(0.8)");
							}
						});
						
						$(".icon_musicadd").bind("mousedown",function(){
							$(this).css("-webkit-transform","scale(1.2)");
							that.isSearchArrow = true;
							that.isSearchObject = $(this);
							that.isSearchArrowStartPosition = $(this).offset();
							$(".move_dummy").css("background-image","url('http://image.melon.com" + $(this).parent().data("obj")["ALBUMIMG"]  + "')");
							$(".move_dummy").data("obj",$(this).parent().data("obj"));
							that.searchScroll.enabled = false;
						});
						
						$(document).bind("mousemove",function(e){
							that.searchAddItem_move(e);
						});
						
						$(document).bind("mouseup",function(e){
							that.searchAddItem_up(e);
						});
					}
				}
	
				var thatObj = that;
				
				setTimeout(function(){
					$(".loading_circle").css("display","none");
					$("#popup_scroller").css("display","block");
	
					thatObj.searchScroll.refresh();
					thatObj.isSearch = false;
					$("#popup_wrp > .iScrollVerticalScrollbar ").css("left",198);
					$("#popup_wrp > .iScrollVerticalScrollbar > .iScrollIndicator").addClass("listIndicator");
	
				},400);
				
				
	
			});
		
		}
	},
	
	searchAddItem_up : function(e){
		if(commonUI.isSearchArrow){
			commonUI.isSearchObject.css("-webkit-transform","scale(0.8)");
			commonUI.isSearchArrow = false;
			commonUI.isSearchObject = null;
			if(commonUI.isSearchArrowAtthced){
				commonUI.isSearchArrowAtthced = false;
				$(".move_dummy").css("display","none");
				commonUI.searchScroll.enabled = true;
				commonUI.addPlayList(e.target);
			}
		}
	},
	
	openAlert : function(option){

		var callback = function(){};

		$(".alertdim").css("display","block");
		$(".alertdim, .playlist_duplicate").unbind("click");
		
		if(option["type"] == "playlist_duplicate"){
			var tmpname = option["name"];
			var tmpsong = option["song"];
			$(".alertdim").append("<div class = 'playlist_duplicate center'> 이미 등록이 되어 있습니다.</div>");
			setTimeout(function(){
				$(".playlist_duplicate").css("-webkit-transform","translateY(300px)");
			},100);
			
			$(".alertdim , .playlist_duplicate").bind("click",function(e){
				$(".playlist_duplicate").css("-webkit-transform","translateY(0px)");
				setTimeout(function(){
					commonUI.claseAlert();
				},400);
			});
		}

		if(option["type"] == "playlist_song_del"){
			var songCnt = option.items.length;
			$(".alertdim").append("<div class = 'playlist_duplicate center'><div class = 'del_msg'>" + songCnt + "곡을 삭제하겠습니까?</div><div class = 'del_yes center'>예</div><div  class = 'del_no center'>아니요</div></div>");
			
			$(".playlist_duplicate").css("height",120);
			setTimeout(function(){
				$(".playlist_duplicate").css("-webkit-transform","translateY(300px)");
			},100);
			callback = commonUI.playListUpdateCallback;
			
			$(".del_yes").touch(function(){
				eval(callback("del"));
				
				setTimeout(function(){
					commonUI.claseAlert();
					
					//$(".svg_trash, .svg_move").
				},800);
			},"del_touch");
			
			$(".del_no").touch(function(){
				//setTimeout(function(){
					commonUI.claseAlert();
				//},400);
			},"del_touch");
			
		}
		
		if(option["type"] == "musiclist_add"){
			var songCnt = option.items;
			$(".alertdim").append("<div class = 'playlist_duplicate center'><div class = 'del_msg'>" + songCnt + "곡을 현재재생 목록에 추가 하시겠습니까?</div><div class = 'del_yes center'>예</div><div  class = 'del_no center'>아니요</div></div>");
			$(".del_msg").css("left",10);
			
			$(".playlist_duplicate").css("height",120);
			setTimeout(function(){
				$(".playlist_duplicate").css("-webkit-transform","translateY(300px)");
			},100);
			
			$(".del_yes").touch(function(){
				setTimeout(function(){
					
					player.updateFromMusic();
					
					commonUI.claseAlert();
					player.drawPlaying();
					
				},800);
			},"del_touch");
			
			$(".del_no").touch(function(){
					commonUI.claseAlert();
				
			},"del_touch");
			
		}
		
		var that = this;
		
		
	},
	
	claseAlert : function(){
		$(".alertdim").empty();
		$(".alertdim").css("display","none");
	},
	
	checkPlayList : function(id){
		
		var selectedSongId = id;
		var rtnValue = true;
		
		$("#list_scroller > ul > li").each(function(){
			if($(this).data("obj") != undefined){
				if(selectedSongId == $(this).data("obj")["songId"]){
					rtnValue = false;
				}
			}
		});
		
		return rtnValue
	},
	
	addPlayList : function(obj){
		
		if($(obj).data("type") == "list"){
			
			if(!this.checkPlayList($(".move_dummy").data("obj")["SONGID"])){
				this.openAlert({type:"playlist_duplicate",name:$(".move_dummy").data("obj")["ARTISTNAME"] , song:$(".move_dummy").data("obj")["SONGNAME"]});
				//alert("Exist");
				return false
			}
			
			var targets = null;
			var owner = null;
			var prev_targets = null;
			
			if($(obj).get(0).tagName == "LI"){
				targets = $(obj).nextAll();
				owner = $(obj);
				prev_targets = Array.prototype.reverse.call($(obj).prevAll());
			}else{
				targets = $(obj).parent().nextAll();
				owner = $(obj).parent();
				prev_targets = Array.prototype.reverse.call($(obj).parent().prevAll());
			}

			var ArrsongId = [];
			
			
			prev_targets.each(function(){
				if($(this).data("obj") != undefined)
					ArrsongId.push($(this).data("obj")["songId"]);
			});
			
			ArrsongId.push(parseInt($(".move_dummy").data("obj")["SONGID"]));
			if(owner.data("obj") != undefined){
				ArrsongId.push(owner.data("obj")["songId"]);
			}
			
			targets.each(function(){
				if($(this).data("obj") != undefined)
					ArrsongId.push($(this).data("obj")["songId"]);
			});
			
			var playListSeq = $(".playlist_item").data("seq");
			var playListName = $(".playlist_edittile").text();
				
			var tmpTop = owner.offset()["top"] - this.listScroll.y;
			
			targets.css("-webkit-transform","translateY(50px)");
			owner.css("-webkit-transform","translateY(50px)");//.css("border-top","1px dotted rgba(10,10,10,0.3)");
			this.listScroll.enabled = false;
			
			$("#list_scroller").append('<div class="list_into_dummy" ><div class = "list_album"></div><div class = "list_singer"></div><div class = "list_title"></div></div>');
			$(".list_into_dummy").css("top",tmpTop - 53);
			
			setTimeout(function(){
				$(".list_into_dummy").css("display","block").css("-webkit-transform","translateX(140px)");
				
				$(".list_into_dummy > .list_album").css("background-image","url('http://image.melon.com" + $(".move_dummy").data("obj")["ALBUMIMG"]  + "/melon/resize/38')");
				$(".list_into_dummy > .list_singer").text($(".move_dummy").data("obj")["ARTISTNAME"]);
				$(".list_into_dummy > .list_title").html($(".move_dummy").data("obj")["SONGNAMEDP"]);
				$(".list_into_dummy > .list_album").css("-webkit-transform","rotateZ(7200deg)");
				
				dataHandler.playlistUpdate(playListSeq , playListName , ArrsongId , commonUI.playListUpdateCallback);

			},300);
			
		}
		
	},
	
	deleteSongFromPlaylist : function(){
		var ArrsongId = [];
		$("#list_scroller > ul > li").each(function(){
			if($(this).attr("class") == "" || $(this).attr("class") == undefined){
				
				ArrsongId.push($(this).data("obj")["songId"]);
			}
		});
		
		var playListSeq = $(".playlist_item").data("seq");
		var playListName = $(".playlist_edittile").text();
		
		dataHandler.playlistUpdate(playListSeq , playListName , ArrsongId , commonUI.playListUpdateCallback);
	},
	
	playListUpdateCallback : function(option){
		
		if(option == "del"){
			commonUI.deleteSongFromPlaylist();
		}else{
		
			setTimeout(function(){
				
				$(".list_into_dummy").remove();
				
				setTimeout(function(){
					commonUI.makelist(commonUI.currentPlaylistIndex);
					var tmpUrl = "http://www.melon.com/mymusic/playlist/mymusicplaylistview_inform.json?plylstSeq=" + $(".playlist_item").data("seq")+"&callback=?";
					
					$.getJSON(tmpUrl,function(data){
						commonUI.playlistInfoMake(data["playlist"]);
					});
					
					},100);
			},1000);
			
		}
	},
	
	dragCurrentObj : null,
	
	dragCheckPlayList : function(obj){
		
		if($(obj).data("type") == "list"){
			/*
			
			var targets = null;
			var owner = null;
			if($(obj).tagName == "LI"){
				targets = $(obj).nextAll();
				owner = $(obj);
			}else{
				targets = $(obj).parent().nextAll();
				owner = $(obj).parent();
			}
			
			
			if(this.dragCurrentObj != owner){
				console.log("AAAAAAAA");
				targets.css("-webkit-transform","translateY(0px)");
				owner.css("-webkit-transform","translateY(0px)").css("border-top","0px dotted rgba(10,10,10,0.3)");
				
				var thatTargets = targets;
				var thatOwner = owner;
				this.dragCurrentObj = owner;
				
				setTimeout(function(){
					thatTargets.css("-webkit-transform","translateY(40px)");
					thatOwner.css("-webkit-transform","translateY(40px)").css("border-top","1px dotted rgba(10,10,10,0.3)");
					
				},100);
				
			}else{
			
				console.log("BBBBBBBBB");
				targets.css("-webkit-transform","translateY(40px)");
				owner.css("-webkit-transform","translateY(40px)").css("border-top","1px dotted rgba(10,10,10,0.3)");
			}*/
		}
	},
	
	searchAddItem_move: function(e){
		if(commonUI.isSearchArrow){
			if((commonUI.isSearchArrowStartPosition.left - e.clientX) > 20 ){
				commonUI.isSearchArrowAtthced = true;
			}
			
			if(commonUI.isSearchArrowAtthced){
				$(".move_dummy").css("display","block");
				if(_isSafari && !_isChrome){
					$(".move_dummy").css("left",(e.clientX - 5) + "px").css("top",(e.clientY - 2) + "px");
				}else{
					$(".move_dummy").css("left",(e.clientX - 0) + "px").css("top",(e.clientY - 5) + "px");
				}
				commonUI.dragCheckPlayList(e.target);
			}
		}
	},
	
	lineObject : null,
	isSearchArrowStartPosition : null,
	isSearchArrow : false,
	isSearchArrowAtthced : false,
	isSearchObject : null,
	
	
	makeSearchArea : function(){
		$(".search_result_popup").remove();
		$(".playlistbox").append("<input type = 'text' class = 'search_input' placeholder = 'Search'>");
		$(".playlistbox").append("<div class = 'search_result_popup'><div class = 'search_result_popup_content'></div></div>");
		$(".search_result_popup_content").append("<div id = 'popup_wrp'></div>");
		$("#popup_wrp").append("<div id = 'popup_scroller'><ul><li><div class = 'search_none'>검색 결과가 없습니다.</div> </li></ul></div>");
		

		
	
		$(".playlistbox").append("<div class = 'search_result_popup_arrow'></div>");
		this.searchInputResize(true);
	},
	
	playlistRecover : function(){
	
		setTimeout(function(){
			$(".playlist_list").css("width",350);
			$("#list_wrp").css("width",340);
			$("#list_wrp > .iScrollVerticalScrollbar").css("left","616").css("-webkit-transition","0.4s");
		},400);
		$(".svg_add, .svg_unchecked , .svg_checked").css("display","block");
		$(".svg_done").css("display","none");
		
		$(".search_input").remove();
		
		$(".select_dummy").empty().css("display","none");
		$(".playlist_popup").remove();
		this.isSongMove = false;
		this.searchInputResize(false);
	},
	
	listScroll : null,
	currentPlaylistIndex : null,
	makelist_proc :  function(data){
		var that = commonUI;
		for(var key in data["songList"]){
			//$("#list_scroller > ul").append("<li id = 'listItem_li_" + key +"' ><div>" + data["songList"][key]["songName"] + "</div></li>");
			$("#list_scroller > ul").append("<li id = 'listItem_li_" + key +"' data-type = 'list'></li>");
			$("#listItem_li_" + key).append("<div class = 'list_album' data-type = 'list'></div>");
			$("#listItem_li_" + key + " > .list_album").css("background-image","url('http://image.melon.com" + data["songList"][key]["albumImgPath"]  + "/melon/resize/38')");
			$("#listItem_li_" + key).append('<div class="list_singer" data-type="list">' +data["songList"][key]["artistNameBasket"] + '</div>');
			$("#listItem_li_" + key).append('<div class="list_albumname" data-type="list">' +data["songList"][key]["albumName"] + '</div>');
			$("#listItem_li_" + key).append('<div class="list_title" data-type="list">' +data["songList"][key]["songName"] + '</div>');
			$("#listItem_li_" + key).data("obj",data["songList"][key]);
		}
		
		$("#list_scroller > ul").append("<li id = 'listItem_li_" + (key + 1) +"' class = 'addmusic_list_drag' data-type = 'list' data-flag = 'none' >Drag!</li>");
		
		$("#list_scroller > ul").append("<li id = 'listItem_li_" + (key + 1) +"' class = 'addmusic_list center' data-type = 'list' data-flag = 'none'> + 원하는 곡을 추가해주세요 !!</li>");
		
		$(".addmusic_list").bind("click",function(){
			$(".svg_add").trigger("click");
		});
		
		that.listScroll.refresh();
		if($(".svg_done").css("display") == "block"){
			$("#list_wrp > .iScrollVerticalScrollbar ").css("top",30).css("left",416).css("height",435);
		}else{
			$("#list_wrp > .iScrollVerticalScrollbar ").css("top",30).css("left",616).css("height",435);
		}
		$("#list_wrp > .iScrollVerticalScrollbar > .iScrollIndicator").addClass("listIndicator");
		
		that.rotationAlbums($(".list_album"));
		
		$("#list_scroller > ul > li").bind("mouseover",function(){
			$(this).addClass("list_li_over");
		});
		
		$("#list_scroller > ul > li").bind("mouseout",function(){
			$(this).removeClass("list_li_over");
		});
		
		$("#list_scroller > ul > li").bind("click",function(){
			
			if(($(".svg_add").css("display") != "none" && $(this).data("flag") != "none") || that.isSongMove == true ){
				if($(this).data("checked") != "true"){
					that.listItem_checked(this);
				}else{
					that.listItem_unChecked(this);
				}
				
				if(that.isSongMove){
					that.setSelectDummy();
				}
			}
		});
		
		commonUI.appendListTrash(false);
	},
	
	makelist : function(playlistIndex,count){
		this.currentPlaylistIndex = playlistIndex;
		
		var tmpCnt = parseInt(count);
		
		$("#list_scroller > ul").empty();
		$("#list_wrp > .iScrollVerticalScrollbar ").remove();
		
		this.listScroll  = new IScroll('#list_wrp', { mouseWheel: true,scrollbars:true });
		
		
		var that = this;
		
		dataHandler.getSonglist(playlistIndex,this.makelist_proc);
		
	},
	
	listItem_unChecked:function(obj){
		$(obj).data("checked","false");
		$(obj).find('svg').remove();
		$(obj).removeClass("list_li_selected");
		$(obj).find("div,svg").each(function(){
			$(this).css("-webkit-transition","0.2s");
			$(this).css("-webkit-transform","translateX(0px)");
			if($(this).attr("class") == "list_albumname")
				$(this).css("width",170);
			if($(this).attr("class") == "list_title")
				$(this).css("width",240);
			
			commonUI.appendListTrash(false);

		});
	},
	
	addPopUpMsbBox : function(){
		$(".svg_trash").unbind("mouseover");
		$(".svg_trash").unbind("mouseout");

		$(".svg_trash").bind("mouseover",function(){
			$(".status_msgbox").text("곡 삭제");
			$(".status_msg").css("top",273).css("left",657);
			$(".status_msg").css("-webkit-filter","opacity(0.8)");
			$(".status_arrow").css("-webkit-transform","rotateZ(90deg) translateX(20px) translateY(33px)");
		});

		$(".svg_trash").bind("mouseout",function(){
			$(".status_msg").css("-webkit-filter","opacity(0.0)");
		});
		
		$(".svg_trash").bind("click",function(){

			var items = [];
			$(".list_li_selected").each(function(){
				items.push($(this).data("obj"));
			});
			var option = {type:"playlist_song_del",items:items}
			commonUI.openAlert(option);
		});

		
		
	},
	
	moveSelectDummy: function(e){
		var tmpX = e.pageX;
		var tmpY = e.pageY + 10;
		$(".select_dummy").css("top",tmpY);
		$(".select_dummy").css("left",tmpX);
	},
	
	isSongMove : false,
	
	songMove : function(){
		if(this.isSongMove)
			this.isSongMove = false;
		else
			this.isSongMove = true;
		
		this.songMove_UI(this.isSongMove);
	},
	
	songMove_UI : function(bool){
		if(bool){
			$(" .svg_trash , .svg_add").css("display","none");
			$(".playlist_list").css("width",170);
			$("#list_wrp > .iScrollVerticalScrollbar").css("left","438").css("-webkit-transition","0.4s");
			this.setSelectDummy();
			this.makePlayList();
	
		}else{
			$(".svg_trash, .svg_add").css("display","block");
			$(".playlist_list").css("width",350);
			$("#list_wrp > .iScrollVerticalScrollbar").css("left","616").css("-webkit-transition","0.4s");
			$(".playlistbox").unbind("mousemove");
			$(".select_dummy").empty().css("display","none");
			$(".playlist_popup").remove();
		}
	},
	
	popupPlayListScroller : null,
	
	addMusicSVGIcon : '<svg id = "musicadd" x="0px" style = "-webkit-filter: opacity(0.4);margin-top:15px;margin-left:30px;" y="0px" viewBox="0 0 36 36" width="36px" height="36px" >' +
						'<g>' +
							'<g>' +
								'<path style="fill:rgba(57, 119, 57 , 0.7);" d="M24,14.059V5.584L18.414,0H0v32h24v-0.059c4.499-0.5,7.998-4.309,8-8.941    C31.998,18.366,28.499,14.557,24,14.059z M17.998,2.413L21.586,6h-3.588C17.998,6,17.998,2.413,17.998,2.413z M2,30V1.998h14    v6.001h6v6.06c-1.469,0.162-2.831,0.676-4,1.458V12L8,10v8.174C7.686,18.062,7.351,18,7,18c-1.658,0-3,1.346-3,3    c0,1.656,1.342,3,3,3c1.655,0,3-1.344,3-3v-8l6,1v3.348c-0.646,0.799-1.152,1.713-1.496,2.702C13.084,20.288,12,21.516,12,23    c0,1.486,1.084,2.713,2.505,2.95c0.558,1.604,1.55,3.004,2.845,4.05H2z M23,29.883c-3.801-0.009-6.876-3.084-6.885-6.883    c0.009-3.801,3.084-6.876,6.885-6.885c3.799,0.009,6.874,3.084,6.883,6.885C29.874,26.799,26.799,29.874,23,29.883z"></path>' +
								'<polygon style="fill:red;" points="24.002,22 24.002,18 22,18 22,22 18,22 18,24 22,24 22,28 24.002,28 24.002,24 28,24     28,22   "></polygon></g></g></svg>',
	
	movePlayListSVGIcon : '<img style = "margin: 10px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABr0lEQVRIS62VP1LCQBjF34NxoJMbEE6gnEAtHNJJEWrlBEIXrKiEDjyBWiMzsQMtzA3kBuINsIMB8jkbkkxkwh9JttzJvF/e2/ftEjGWWSmN6LDT6g+eN8kwhj5Mo2SRvBJgDEG1/TKw1/X2BpiG3gRw9keA0Aho/p4I7BSX9fve+8jf2x9QKXUJ3m5zLJAfOnLT6r9Z/wZECTcM/QnEtRKGsJtdTLtNy56Ev93bwQbAGICdWUxr68KJODDLuta2BgqycbkOVBsAHh/aKFImmfmsGuWC6i94hK9DxYMGQR7avWEtsqbuwIAnEKkLGFRsL+iqqo+AjFq9YTES0DBKNZAdWfuLlTvmd4LEsUDmHJFyiim3RTKXb3U+qzPwYlIT2e4NCuG9neJbPpA5CkFNG4Y+BpEnlkU1iaahn5P4iAUQXAQA05tUP6bEAXeVy1NB+tOPKXGAiiIckyPpXKIRuQfrX2heXRMH+DGpTouwnjggHJMA1dUAHb4k3CJfJmiTyKt6rQ6XB6IBCfQ/uJ+iHHiHPWGM23UnwH+p4sTj3kebHKg2OUjZcVyoZzQ7n2m/BgrVBezZIjIAAAAASUVORK5CYII="/>',	
	addPlayListItemSVGIcon : '<svg id = "add_playlist"  x="0px" y="0px" viewBox="0 0 40 40"  width="40px" height="40px" >' +
								'<path style="fill:#DB0F26;-webkit-transform: scale(0.11);" d="M316.242,223.775h-10.051v-10.051c0-14.585-6.906-27.579-17.611-35.91V73.703  c0-3.934-1.561-7.705-4.344-10.483L225.361,4.34C222.576,1.562,218.811,0,214.877,0H37.691C21.639,0,8.58,13.061,8.58,29.113  v312.095c0,16.054,13.058,29.112,29.111,29.112h221.777h1.225c25.088,0,45.498-20.41,45.498-45.498v-10.051h10.051  c25.088,0,45.498-20.41,45.498-45.498S341.33,223.775,316.242,223.775z M40.193,337.907V32.414h154.088v43.577  c0,10.554,8.555,19.106,19.105,19.106h43.58v73.294c-23.35,1.903-41.771,21.501-41.771,45.333v10.051h-10.051  c-25.088,0-45.498,20.41-45.498,45.498s20.41,45.498,45.498,45.498h10.051v10.051c0,4.548,0.678,8.939,1.926,13.085H40.193z   M316.107,289.205h-35.051v35.051c0,11.303-9.195,20.498-20.498,20.498c-11.303,0-20.498-9.195-20.498-20.498v-35.051H205.01  c-11.303,0-20.498-9.195-20.498-20.498c0-11.303,9.195-20.498,20.498-20.498h35.051v-35.051c0-11.303,9.195-20.498,20.498-20.498  c11.303,0,20.498,9.195,20.498,20.498v35.051h35.051c11.303,0,20.498,9.195,20.498,20.498  C336.605,280.01,327.41,289.205,316.107,289.205z"></path>'+
							'</svg>',
							
	makePlayList : function(){
			
			$(".playlistbox").append("<div class = 'playlist_popup'><div class = 'playlist_content'></div></div>");
			
			$(".playlist_content").append("<div id = 'playlist_popup_wrp'><div id = 'playlist_popup_scroller'><ul></ul></div></div>");
			
			setTimeout(function(){
				$(".playlist_popup").css("-webkit-transform","rotateY(0deg)");
			},200);

			var that = this;
			$.getJSON("http://www.melon.com/mymusic/playlist/mymusicplaylist_list.json?memberKey=" + myInfo.memberKey +"&callback=?",function(data){
				
				this.popupPlayListScroller = new IScroll('#playlist_popup_wrp', { mouseWheel: true,scrollbars:true });
				
				for(var i = 0 ; i < data.playlistList.length ; i++){
					if(parseInt($(".playlist_item").data("seq")) != parseInt(data.playlistList[i]["plylstSeq"])){
						$("#playlist_popup_scroller > ul").append("<li id = 'playlist_popup_itme_" + i + "'></li>");
						$("#playlist_popup_itme_" + i ).append("<div class = 'playlist_popup_albumname'></div>");
						$("#playlist_popup_itme_" + i ).append("<div class = 'playlist_popup_count center'>" +  data.playlistList[i]["songCnt"] + " 곡 </div>");
						$("#playlist_popup_itme_" + i ).append(that.addMusicSVGIcon);
						$("#playlist_popup_itme_" + i +" > .playlist_popup_count").data("count",data.playlistList[i]["songCnt"]);
						
						$("#playlist_popup_itme_" + i ).append("<div class = 'playlist_popup_li_title '>" +  data.playlistList[i]["plylstTitle"] + " </div>");
						$("#playlist_popup_itme_" + i ).append("<div class = 'playlist_popup_li_gen '>" +  data.playlistList[i]["genreName"] + " </div>");
						$("#playlist_popup_itme_" + i ).append(that.movePlayListSVGIcon);
						
						$("#playlist_popup_itme_" + i ).data("obj",data.playlistList[i]);
						
						var imgpath = data.playlistList[i]["thumbImagePath"];
						if(imgpath == null || imgpath == "null")
							imgpath = "http://image.melon.co.kr/resource/image/web/default/noAlbum_200.jpg";
						else
							imgpath = "http://image.melon.com" + imgpath; 
	
						
						$("#playlist_popup_itme_" + i + " > .playlist_popup_albumname ").css("background-image","url('" +imgpath + "')");
					}
				}
				
				$("#playlist_popup_scroller > ul").append("<li class = '' style = 'height:80px;' id = 'playlist_popup_itme_" + i + "'><div class = 'playlist_popup_add center'>Add PlayList</div></li>");
				
				this.popupPlayListScroller.refresh();
				
				$("#playlist_popup_wrp > .iScrollVerticalScrollbar > .iScrollIndicator").addClass("listIndicator");
				

				$("#playlist_popup_scroller > ul > li > #musicadd").bind("mouseover",function(){
					$(this).parent().addClass("list_li_over");
					$(".select_dummy").css("opacity",1);
					$(this).css("-webkit-transition","0.3s").css("-webkit-transform","scale(1.3)").css("-webkit-filter","opacity(1)");
					
				});
				
				$("#playlist_popup_scroller > ul > li  > #musicadd").bind("mouseout",function(){
					$(this).parent().removeClass("list_li_over");
					$(".select_dummy").css("opacity",0.7);
					$(this).css("-webkit-transition","0.3s").css("-webkit-transform","scale(1)").css("-webkit-filter","opacity(0.4)");
				});
				
				$(".playlist_popup_add").bind("mouseover",function(){
					$(this).css("box-shadow","rgba(0, 0, 0, 0.6) 2px 2px 2px 2px");
				});
				$(".playlist_popup_add").bind("mouseout",function(){
					//
					$(this).css("box-shadow","rgba(0, 0, 0, 0.4) 2px 2px 2px 1px");
				});
				$(".playlist_popup_add").bind("click",function(){
					$(".playlistbox").append("<div class = 'playlist_dimaddbox'></div>");
					$(".playlistbox").append("<div class = 'playlist_addbox'><div class = 'playlist_addbox_div1'>PlayList 추가</div><input type='text' class='playlist_add_input' placeholder='play list name'></div>");
					$(".playlist_addbox").append("<div class = 'playlist_addbox_btn_add center'>추가</div>");
					$(".playlist_addbox").append("<div class = 'playlist_addbox_btn_cancel center'>취소</div>");
					
					$(".playlist_add_input").focus();
					
					$(".playlist_addbox_btn_add").touch(function(){
						var tmpName = $(".playlist_add_input").val();
						$(".playlist_dimaddbox, .playlist_addbox").remove();
						dataHandler.addPlaylist(tmpName ,commonUI.playListAddCallback);
					},"alert_selected");
					
					$(".playlist_addbox_btn_cancel").touch(function(){
						$(".playlist_dimaddbox, .playlist_addbox").remove();
					},"alert_selected");
					
					
					$(".playlist_dimaddbox").bind("click",function(){
						$(".playlist_dimaddbox, .playlist_addbox").remove();
					});
					
				});
				
				$("#playlist_popup_scroller > ul > li  > img").bind("mouseout",function(){
					
					$(this).css("-webkit-transition","0.3s").css("-webkit-transform","scale(1)");
				});
				
				$("#playlist_popup_scroller > ul > li > img").bind("click",function(){
					
					var obj = $(this).parent().data("obj");
					
					$(".svg_close").trigger("click");
					setTimeout(function(){
						commonUI.openPlaylist(obj);
					},500);
				});
				
				$("#playlist_popup_scroller > ul > li  > #musicadd").bind("click",function(){
					that.updatePlaylist($(this).parent());
				});
				
			});
			

	},
	
	playListAddCallback : function(){
		$(".playlist_popup").remove();
		commonUI.makePlayList();
	},
	
	updatePlaylist : function(targetObj){
		this.moveSelectList(targetObj);
		this.updateCount(targetObj);
	},
	
	moveSelectList : function(targetObj){
		/*
		 * 	var playListSeq = $(".playlist_item").data("seq");
				var playListName = $(".playlist_edittile").text();
				dataHandler.playlistUpdate(playListSeq , playListName , ArrsongId , commonUI.playListUpdateCallback);

		 * */
		var ArrsongId = [];
		
		$("#list_scroller > ul > li").each(function(){
			if($(this).data("flag") == undefined){
				if($(this).attr("class") == "list_li_selected"){
					$(this).css("-webkit-transform","translateX(200px)");
				}else{
					ArrsongId.push($(this).data("obj")["songId"]);
				}
			}
		});
		
		var thatObj = targetObj;
		
		setTimeout(function(){
			$(".list_li_selected").remove();
			var playListSeq = $(".playlist_item").data("seq");
			var playListName = $(".playlist_edittile").text();
			dataHandler.playlistUpdate(playListSeq , playListName , ArrsongId , commonUI.playListCallbackUpdate);
			
			var playListSeq = thatObj.data("obj")["plylstSeq"];
			var playListName =  thatObj.data("obj")["plylstTitle"];
			commonUI.tmpTargetObj = thatObj;
			
			dataHandler.getSonglist(playListSeq,commonUI.CallBackSortTargetPlaylist);
			//dataHandler.playlistUpdate(playListSeq , playListName , ArrsongId , commonUI.playListCallbackUpdate);
		},300);
		
		$(".list_li_selected").each(function(){
			$(this).css("-webkit-transform","translateX(200px)");
			//setTimeout();
		});
	},
	
	tmpTargetObj : null,
	
	sortTargetPlaylist : function(data){
		
		var playListName =  commonUI.tmpTargetObj.data("obj")["plylstTitle"];
		var ArrsongId = [];
		
		for(var key in $(".select_dummy").data("obj")){
			ArrsongId.push($(".select_dummy").data("obj")[key]);
		}
		for(var key in data["songList"]){
			ArrsongId.push(data["songList"][key]["songId"]);
		}
		dataHandler.playlistUpdate(data["plylstSeq"] , playListName , ArrsongId , commonUI.playListCallbackUpdate_target);
		
	},
	
	CallBackSortTargetPlaylist:function(data){
		commonUI.sortTargetPlaylist(data);
	},
	
	playListCallbackUpdate : function(){
		commonUI.listScroll.refresh();
	},
	
	playListCallbackUpdate_target : function(){
		commonUI.listScroll.refresh();
		$(".select_dummy").css("-webkit-transform","scale(0.01)");
		setTimeout(function(){
			commonUI.setSelectDummy();
		},300);
	},
	
	updateCount : function(targetObj){
		var tmpCnt = parseInt(targetObj.find(".playlist_popup_count").data("count"));
		var currentSelCount = parseInt($(".select_dummy").data("obj").length);
		targetObj.find(".playlist_popup_count").data("count",(tmpCnt+currentSelCount));
		this.updateCountDiv(targetObj.find(".playlist_popup_count"));
	},
	
	updateCountDiv : function(jObj){
		jObj.text(jObj.data("count") + " 곡");
		var thatJObj = jObj;
		setTimeout(function(){
			thatJObj.css("-webkit-transform","scale(1.2)");
			setTimeout(function(){
				thatJObj.css("-webkit-transform","scale(1)");
			},500);
		},10);
	},
	
	setSelectDummy : function(){
		$(".select_dummy").css("display","block");
		$(".select_dummy").css("-webkit-transform","scale(1)");
		$(".select_dummy").empty();
		
		if($(".list_li_selected").size() < 1){
			$(".select_dummy").css("display","none");
			
		}else{
			var SongIdArr = [];
			$(".list_li_selected").each(function(index){
				var row = parseInt(Math.sqrt(index+1));
				$(".select_dummy").css("width",30 + 40*(row));
				SongIdArr.push($(this).data("obj")["songId"]);
				$(".select_dummy").append("<img class = 'dummyimg' src = 'http://image.melon.com" + $(this).data("obj")["albumImgPath"] + "'>");
			});
			$(".select_dummy").data("obj",SongIdArr);
		}
		
		
	},
	
	appendListTrash : function(bool){
		if(bool){
			if($(".list_li_selected").size() < 1){
				$(".playlistbox").append(this.trashSVGIcon);
				$(".svg_trash ").css("display","block");
				this.addPopUpMsbBox();
			}
		}else{
			if($(".list_li_selected").size() < 1){
				$(".svg_trash ").remove();
			}
		}
	},
	
	listItem_checked:function(obj){
		
		this.appendListTrash(true);
		
		$(obj).data("checked","true");
		$(obj).addClass("list_li_selected");
		
		//setTimeout(function(){
		$(obj).prepend(commonUI.checkedListSVGIcon);
		//},300);
		
		$(obj).find("div,svg").each(function(){
			
			if($(this).get(0).tagName == "svg"){
				$(this).css("-webkit-transition","0.0s");
				$(this).css("-webkit-transform","translateX(0px)");
				$(this).css("-webkit-transition","0.2s");
				$(this).css("-webkit-transform","translateX(50px)");
			}else{
				$(this).css("-webkit-transition","0.0s");
				if($(this).attr("class") == "list_albumname")
					$(this).css("width",120);
				if($(this).attr("class") == "list_title")
					$(this).css("width",200);
				
				
				var that = this;
				setTimeout(function(){
					
					$(that).css("-webkit-transition","0.2s");
					$(that).css("-webkit-transform","translateX(30px)");
					
				},10);
			}
			
		});
	},
	
	checkedListSVGIcon : '<svg x="0px" y="0px" width="20px" height="20px" viewBox="0 0 415.582 415.582" style="margin-top: 13px;fill: red;position: relative;   left:-30;float:left;">' +
							'<g>' + 
								'<path d="M411.47,96.426l-46.319-46.32c-5.482-5.482-14.371-5.482-19.853,0L152.348,243.058l-82.066-82.064   c-5.48-5.482-14.37-5.482-19.851,0l-46.319,46.32c-5.482,5.481-5.482,14.37,0,19.852l138.311,138.31   c2.741,2.742,6.334,4.112,9.926,4.112c3.593,0,7.186-1.37,9.926-4.112L411.47,116.277c2.633-2.632,4.111-6.203,4.111-9.925   C415.582,102.628,414.103,99.059,411.47,96.426z"></path>' +
							'</g>' +	
						'</svg>',
						
	trashSVGIcon : '<svg  class="svg_trash" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 774.266 774.266">' +
						'<g>' +
							'<g>' +
								'<path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875    C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916    c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703    c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z     M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282    c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802    H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"></path>' +
								'<rect x="475.031" y="286.593" width="48.418" height="396.942"></rect>' +
								'<rect x="363.361" y="286.593" width="48.418" height="396.942"></rect>' +
								'<rect x="251.69" y="286.593" width="48.418" height="396.942"></rect>' +
							'</g>' +
						'</g>' +
					'</svg>',
					
	moveSVGIcon : '<svg class="svg_move"  x="0px" y="0px" viewBox="0 0 26 26" width="36px" height="36px">' +
					'<g>' +
						'<g>' +
						'<path style="fill:red;" d="M17.921,17.796c0.073-0.176,0.032-0.381-0.103-0.516l-4.465-5.016    c-0.184-0.184-0.484-0.184-0.668,0L8.181,17.28c-0.091,0.09-0.139,0.211-0.139,0.334c0,0.061,0.012,0.123,0.036,0.182    c0.074,0.176,0.246,0.281,0.438,0.281h2.473c0,4.186-0.719,6.462-5.488,7.846c7.986,0,9.551-4.619,9.551-7.846h2.434    C17.676,18.077,17.848,17.972,17.921,17.796z"></path>' +
						'</g>' +
						'<path style="fill:rgba(57, 119, 57 , 0.7);" d="M23,0.077H3c-1.656,0-3,1.343-3,3v16c0,1.656,1.344,3,3,3h5v-2H3c-0.551,0-1-0.449-1-1v-12h22v12   c0,0.551-0.449,1-1,1h-6v2h6c1.656,0,3-1.344,3-3v-16C26,1.42,24.656,0.077,23,0.077z M4.078,4.436   c0,0.397-0.321,0.719-0.719,0.719H2.641c-0.397,0-0.719-0.321-0.719-0.719V3.718c0-0.397,0.321-0.719,0.719-0.719H3.36   c0.397,0,0.719,0.321,0.719,0.719L4.078,4.436L4.078,4.436z M7.078,4.436c0,0.397-0.321,0.719-0.719,0.719H5.641   c-0.397,0-0.719-0.321-0.719-0.719V3.718c0-0.397,0.321-0.719,0.719-0.719H6.36c0.397,0,0.719,0.321,0.719,0.719L7.078,4.436   L7.078,4.436z M24,5.077H8v-2h16V5.077z"></path>' +
					'</g>' +
				'</svg>',
	
	listMoveSVGIcon : '<svg x="0px" y="0px" viewBox="0 0 40 40" width="40px" height="40px"><g><path style="fill:#030104;" d="M70,26H20V16L0,33l20,16v-9h50V26z M100,68L80,51v10H30v14h50v9L100,68z"></path></g></svg>',
	
	rotationAlbums : function(jObj){
		jObj.css("-webkit-transform","rotateZ(3600deg)");
	},
	
	addEventEditTitle : function(obj){
		
		$(".playlist_edittile").unbind("click");
		$(".playlist_edittile").bind("click",function(){
			var tmpStr = $(this).text();
			$(this).text("");
			$(this).append("<input type = 'text' class = 'playlist_title_editmode_input' placeholder = '" + tmpStr + "'>");
			$(".playlist_title_editmode_input").focus();
			var that = this;
			$(".playlist_title_editmode_input").bind("blur",function(){
				var tmpValStr = $(".playlist_title_editmode_input").val();
				$(".playlist_title_editmode_input").remove();
				if(tmpValStr == ""){
					$(that).text(tmpStr);
				}else{
					$(that).text(tmpValStr);
				}
			});
		});
	},
	
	openMainDim : function(options){
		
		$(".maindim").css("display","block");
		if(options != undefined && options["type"] == "dismiss"){
			$(".maindim").unbind("click");
			$(".maindim").bind("click",function(){
				commonUI.playlistRecover();
				var that = this;
				options["obj"].css("-webkit-transform","translateX(0px)");
				setTimeout(function(){
					$(that).css("display","none");
					myMusic.getInfo();
				},400);
			});
		}
	},

	closeMainDim : function(){
		$(".maindim").css("display","none");
		/*
		 * 
		 * */
		
	}
}

var search = {
		
	init : function(){
		$(".search_title").text("검색");
		
		$(".search_input_main").focus();
		
		$(".trend_align").unbind("click");
		$(".trend_align").bind("click",this.trendMenuClick);
		
		//$(".trend_menu1").trigger("click");
		
		this.addInputEvent();
		this.rotateType(0);
		
		$(".search_type").bind("click",function(){
			
			var idx = parseInt($(this).data("idx"));
			search.rotateType(idx);
		});
	},
	
	addInputEvent : function(){
		
		$("#search_icon").bind("click",function(e){
			if($(".t3").data("idx") == "0"){
				search.searchSend(1);
				search.searchSend(2);
				search.searchSend(3);
			}
			
			if($(".t3").data("idx") == "1"){
				search.searchSend(3);
				
				$("#search_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
				$("#searchalbum_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
				search.searchScroller.refresh();
				search.searchAlbumScroller.refresh();
				
			}
			
			if($(".t3").data("idx") == "2"){
				search.searchSend(2);
				
				$("#searchsinger_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
				$("#search_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
				search.searchScroller.refresh();
				search.searchSingerScroller.refresh();

				
			}
			
			if($(".t3").data("idx") == "3"){
				search.searchSend(1);
				
				$("#searchsinger_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
				$("#searchalbum_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
				search.searchAlbumScroller.refresh();
				search.searchSingerScroller.refresh();

				
			}
		});
		
		$(".search_input_main").bind("keydown",function(e){
			
			if($(".search_input_main").val().length > 0){
			
				if(e.keyCode == 13){
					
					if($(".t3").data("idx") == "0"){
						search.searchSend(1);
						search.searchSend(2);
						search.searchSend(3);
					}
					
					if($(".t3").data("idx") == "1"){
						search.searchSend(3);
						
						$("#search_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
						$("#searchalbum_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
						search.searchScroller.refresh();
						search.searchAlbumScroller.refresh();
						
					}
					
					if($(".t3").data("idx") == "2"){
						search.searchSend(2);
						
						$("#searchsinger_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
						$("#search_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
						search.searchScroller.refresh();
						search.searchSingerScroller.refresh();

						
					}
					
					if($(".t3").data("idx") == "3"){
						search.searchSend(1);
						
						$("#searchsinger_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
						$("#searchalbum_result_scroller > ul").empty().append("<li class = 'center'>검색 결과가 없습니다.</li>");;
						search.searchAlbumScroller.refresh();
						search.searchSingerScroller.refresh();

						
					}
				}
				
			}
			
		});
	},
	
	searchSend : function(index,option){
		
		var uri;
		
		if(index == 1)
			uri = "http://www.melon.com/search/song/index.json?q=" + encodeURI($(".search_input_main").val()) + "&section=song";

		if(index == 2)
			uri = "http://www.melon.com/search/album/index.json?q=" + encodeURI($(".search_input_main").val());

		if(index == 3)
			uri = "http://www.melon.com/search/artist/index.json?q=" + encodeURI($(".search_input_main").val());
		
		if(index == 4){
			uri = "http://www.melon.com/album/detail.json?albumId=" + option;
			
		}
		//uri = "http://www.melon.com/search/keyword/index.json?query=" + encodeURI($(".search_input_main").val());
		
		$.getJSON(uri+"&callback=?",function(data){
			
			//console.log(data);
			search.searchResultlist(data,index);
		});
	},
	
	searchResultlist : function(obj,index){
		
		var jObj;
	
		
		if(index == 1 || index == 4)
			jObj = $("#search_result_view");
		
		if(index == 2)
			jObj = $("#searchalbum_result_view");

		if(index == 3 )
			jObj = $("#searchsinger_result_view");
		
		jObj.find("ul").empty();
		jObj.find(".iScrollVerticalScrollbar").remove();
		
	
		//searchAlbumScroller
		
		if(index == 1 || index == 4)
			this.searchScroller  = new IScroll('#' + jObj.attr("id"), { mouseWheel: true,scrollbars:true });
		
		if(index == 2)
			this.searchAlbumScroller  = new IScroll('#' + jObj.attr("id"), { mouseWheel: true,scrollbars:true });
		
		if(index == 3 )
			this.searchSingerScroller  = new IScroll('#' + jObj.attr("id"), { mouseWheel: true,scrollbars:true });

		
		var data;
		
		

		if(index == 1)
			data = obj["songList"];
		
		if(index == 2)
			data = obj["albumList"];

		if(index == 3)
			data = obj["artistList"];

		if(index == 4)
			data = obj["cdSongList"][0];

	
		for(var key in data){
			
			jObj.find("ul").append("<li id = '" + jObj.attr("id") + "_" + key + "'></li>");
			
			if(index == 1 || index == 4){
				
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_song_title'>" + data[key]["songName"] + "</div>");
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_song_album'>" + data[key]["albumName"] + "</div>");
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_song_singer'>- " + data[key]["artistNameBasket"].split("|").join("") + "</div>");
				$("#" + jObj.attr("id") + "_" + key).data("obj",data[key]);
			}
				
			if(index == 2){
				
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_album_img'></div>");
				$("#" + jObj.attr("id") + "_" + key).find(".search_album_img").css("background-image","url('http://image.melon.com" + data[key]["albumImgPath"]  + "/melon/resize/30')");
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_album_title'>" + data[key]["albumName"] + "</div>");
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_album_artist'>" + data[key]["artistNameBasket"].split("|").join("") + "</div>");
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_album_count'>" + data[key]["totSongCnt"] + " 곡</div>");
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_album_date'>" + data[key]["issueDate"] + "</div>");
				$("#" + jObj.attr("id") + "_" + key).data("obj",data[key]);
			}

			if(index == 3 ){
				
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_singer_img'></div>");
				
				if(data[key]["artistImgPath"]  =="")
					data[key]["artistImgPath"] = "/resource/image/web/default/noArtist_120.jpg";
				
				$("#" + jObj.attr("id") + "_" + key).find(".search_singer_img").css("background-image","url('http://image.melon.com" + data[key]["artistImgPath"]  + "/melon/resize/30')");
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_singer_title'>" + data[key]["artistName"] + "</div>");
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_singer_category'>" + data[key]["nationalityName"] + "/" + data[key]["sex"] + "/" + data[key]["actTypeName"] + "</div>");
				$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_singer_genre'>" + search.cutpipe(data[key]["artistGnrBasket"]) + "</div>");
				//$("#" + jObj.attr("id") + "_" + key).append("<div class = 'search_album_date'>" + data[key]["issueDate"] + "</div>");
				$("#" + jObj.attr("id") + "_" + key).data("obj",data[key]);
			}

			
		}
		
		
		if(data.length == 0){
			jObj.find("ul").append("<li class = 'center'>검색 결과가 없습니다.</li>");
		}
		
		jObj.find("ul").find("li").bind("mouseover",function(){
			$(this).css("background-color","rgba(154, 236, 207, 0.4)");
		});
		
		jObj.find("ul").find("li").bind("mouseout",function(){
			$(this).css("background-color","transparent");
		});
		
		jObj.find("ul").find("li").touch(function(){
			//$(this).css("background-color","transparent");
			
			var that = this;
			if(index == 1 || index == 4){
				$.getJSON('http://www.melon.com/song/detail.json?songId=' + $(this).data("obj")["songId"]+"&callback=?",function(data){
					var imgapth = data["songInfo"]["ALBUMIMGPATH"];
					var tmpObj = $(that).data("obj");
					tmpObj["albumImgPath"] = imgapth;
					tmpObj["songName"] = tmpObj["songName"].split("<b>").join("").split("</b>").join("");
					tmpObj["albumName"] = tmpObj["albumName"].split("<b>").join("").split("</b>").join("");
					tmpObj["artistNameBasket"] = tmpObj["artistNameBasket"].split("|").join("").split("<b>").join("").split("</b>").join("");
					
					$(that).data("obj",tmpObj);
					player.addMusicAndPlay($(that).data("obj"));
					
				});
			}
			
			if(index == 3){
				$(".search_input_main").val($(this).find(".search_singer_title").text());
				
				search.searchSend(2);
				search.searchSend(1);
			
				
				
			}

			if(index == 2){
				//$(".search_input_main").val($(this).find(".search_singer_title").text());
				
				//search.searchSend(2);
				//search.searchSend(1);
				//console.log($(this).data("obj"));
				 
				 
				search.searchSend(4,$(this).data("obj")["albumId"]);
			}

		});
		
		
		
		jObj.find("ul").append("<li style = 'border-bottom: 0px;'></li>");

		
		jObj.find(".iScrollIndicator").addClass("listIndicator");
		
		
		if(index == 1 || index == 4)
			this.searchScroller.refresh();
		
		if(index == 2)
			this.searchAlbumScroller.refresh();
		
		if(index == 3)
			this.searchSingerScroller.refresh();

		
		
	},
	
	rotateType : function(idx){
		var tmpIdx = idx;
		$(".search_type").each(function(index){
			var diff = parseInt(index) - parseInt(tmpIdx);
			
			$(this).removeClass("t1").removeClass("t2").removeClass("t3").removeClass("t4").removeClass("t5").removeClass("tm").removeClass("tp");
			
			if(diff == -3){
				$(this).addClass("tm");
			}

			if(diff == -2){
				$(this).addClass("t1");
			}
			
			if(diff == -1){
				$(this).addClass("t2");
			}
			
			if(diff == 0){
				$(this).addClass("t3");
			}
			
			if(diff == 1){
				$(this).addClass("t4");
			}
			
			if(diff == 2){
				$(this).addClass("t5");
			}
			
			if(diff == 3){
				$(this).addClass("tp");
			}

		});
		
		$(".search_input_main").attr("placeholder",$(".t3").text() + " 검색");
		
	},
	
	cutpipe : function(str){
		var tmpStrArr = str.split("|");
		var rtnStr = "";
		for(var key in tmpStrArr){
			if(key < 3)
				rtnStr = rtnStr + tmpStrArr[key] + ",";	
		}
		rtnStr = rtnStr.substr(0,rtnStr.length-1);
		
		return rtnStr;
	},
	
	searchScroller : null,
	searchAlbumScroller : null,
	searchSingerScroller : null,
	
	trendMenuClick : function(){

		var index = parseInt($(this).data("index"));
		
		$(".trend_align").each(function(idx){
			
			if(index == idx){
				$(this).addClass("trend_menu_on");
				search.trendSend(idx);
			}else{
				$(this).removeClass("trend_menu_on");
			}
		});
	},
	
	trendSend : function(index){
		
		var url;
		
		if(index == 0)
			url = "http://www.melon.com/search/trend/index.json?callback=?";
		
		if(index == 1)
			url = "http://www.melon.com/search/trend/listPage.json?tabNo=0&period=day&callback=?";
		
		if(index == 2)
			url = "http://www.melon.com/search/trend/listPage.json?tabNo=1&period=week&callback=?";
		
		if(index == 3)
			url = "		http://www.melon.com/search/trend/listPage.json?tabNo=2&period=month&callback=?";
		
		
		var idx = index;
		
		$.getJSON(url,function(data){
			//console.log(data);
			if(idx == 0){
				search.trendlist(data,0);
			}
			
			if(idx == 1){
				search.trendlist(data,1);
			}
			
			if(idx == 2){
				search.trendlist(data,2);
			}
			
			if(idx == 3){
				search.trendlist(data,3);
			}
		});
		
	},
	
	scroller : null,
	
	upicon : '<svg  x="0px" y="0px" width="10px" height="10px" style = "fill:red;" viewBox="0 0 401.949 401.949" ><g><g><g id="Layer_5_60_"><path d="M328.508,173.212L211.214,4.948c-5.633-6.598-14.846-6.598-20.479,0L73.445,173.209     c-5.631,6.599-3.146,11.996,5.529,11.996h49.068c8.672,0,15.77,7.097,15.77,15.771l0.077,51.518v133.428l-0.021,0.292     c0.003,8.676,7.321,15.734,15.991,15.736l82.789-0.002c8.674,0,15.771-7.096,15.771-15.766l-0.279-185.207     c0-8.674,7.094-15.771,15.769-15.771h49.066C331.647,185.205,334.136,179.808,328.508,173.212z"></path></g></g></g></svg>',
	downicon : '<svg  x="0px" y="0px" width="10px" height="10px" style = "fill:blue;-webkit-transform: rotateZ(180deg);" viewBox="0 0 401.949 401.949" ><g><g><g id="Layer_5_60_"><path d="M328.508,173.212L211.214,4.948c-5.633-6.598-14.846-6.598-20.479,0L73.445,173.209     c-5.631,6.599-3.146,11.996,5.529,11.996h49.068c8.672,0,15.77,7.097,15.77,15.771l0.077,51.518v133.428l-0.021,0.292     c0.003,8.676,7.321,15.734,15.991,15.736l82.789-0.002c8.674,0,15.771-7.096,15.771-15.766l-0.279-185.207     c0-8.674,7.094-15.771,15.769-15.771h49.066C331.647,185.205,334.136,179.808,328.508,173.212z"></path></g></g></g></svg>',
	
	trendlist : function(obj,index){
		
		$("#trend_view > #trend_view_scroller > ul ").empty();
		$("#trend_view > .iScrollVerticalScrollbar ").remove();
		
		this.scroller  = new IScroll('#trend_view', { mouseWheel: true,scrollbars:true });
		
		var data;
		
		if(index ==0)
			data = obj["keywordRealList"];

		if(index ==1 || index ==2 || index ==3)
			data = obj["keywordList"];

		
		for(var key in data){
			
			$("#trend_view > #trend_view_scroller > ul ").append("<li id = 'trend_list_" + key + "'><div class = 'trend_num center'>" + data[key]["ranking"] + "</div><div class = 'trend_title'>" + data[key]["keyword"] + "</div></li>");
			
			if(data[key]["rankingGap"] == "+"){
				$("#trend_list_" + key).append("<div class = 'trend_svgicon'><font style = 'color:red;font-size:12px;'>new</font></div>");
			}else{
				if(parseInt(data[key]["rankingGap"]) > 0){
					$("#trend_list_" + key).append("<div class = 'trend_svgicon'>" + search.upicon + " " + data[key]["rankingGap"] + "</div>");
				}else if(parseInt(data[key]["rankingGap"]) == 0){
					$("#trend_list_" + key).append("<div class = 'trend_svgicon'>- " + data[key]["rankingGap"] + "</div>");
					
				}else{
					$("#trend_list_" + key).append("<div class = 'trend_svgicon'>" + search.downicon + " " + data[key]["rankingGap"] + "</div>");
				}
			}
		}
		
		$("#trend_view > #trend_view_scroller > ul ").append("<li></li>");
		
		
		$("#trend_view > .iScrollVerticalScrollbar > .iScrollIndicator").addClass("listIndicator");
		
		
		this.scroller.refresh();
		
		
	}
}

var eventCotroller = {
	init : function(){
		
		this.menuLookup();
		this.btmOn();
		var that = this;
		
		//$(".menuIndi").css("background-color",$(".box1").css("background-color"));
		
		$(".box1").unbind("click");
		$(".box1").bind("click",function(){
			$("#main_top100").css("display","block");
			$("#main_mymusic").css("display","none");
			$("#search_wrp").css("display","none");
		
			top100.category = "top100",
			top100.init();
			$("#main_top100").trigger("click");
			that.setMenuColor(this);
		});
		
		$(".box2").unbind("click");
		$(".box2").bind("click",function(){
			$("#main_top100").css("display","block");
			$("#main_mymusic").css("display","none");
			$("#search_wrp").css("display","none");
			
			top100.category = "lastest"
			top100.init();
			$("#main_top100").trigger("click");
			that.setMenuColor(this);
		});
		

		$(".box3").unbind("click");
		$(".box3").bind("click",function(){
			$("#main_top100").css("display","none");
			$("#main_mymusic").css("display","none");
			$("#search_wrp").css("display","block");
			//top100.category = "search"
			search.init();
			//$("#main_top100").trigger("click");
			that.setMenuColor(this);
		});
		
		$(".box4").unbind("click");
		$(".box4").bind("click",function(){
			$("#main_top100").css("display","none");
			$("#main_mymusic").css("display","block");
			$("#search_wrp").css("display","none");
			/*$("#btmwrp").css("-webkit-transform","translateY(120px)");*/
			myMusic.init();
			$("#main_mymusic").trigger("click");
			that.setMenuColor(this);
		});
	},
	
	setMenuColor : function(jObj){
		$(".menuIndi").css("background-color",$(jObj).css("background-color"));
	},
	
	btmOn : function(){
		$(".btm").unbind("mouseover");
		$(".btm").unbind("mouseout");
		$(".btm").bind("mouseover",function(){
			$(this).addClass("btm_on");
		});
		$(".btm").bind("mouseout",function(){
			$(this).removeClass("btm_on");
		});
	},
	
	menuLookup : function(){
		$("#lookup").unbind("mouseover")
		$("#lookup").bind("mouseover",function(){
			$("#main_top100 , #main_mymusic").css("-webkit-filter","invert(0.4) blur(1px)");
			/*$("#btmwrp").css("-webkit-transform","translateY(0px)");*/
			$("#main_top100 , #main_mymusic").bind("click",function(){
				$("#main_top100 , #main_mymusic").css("-webkit-filter","invert(0) blur(0px)");
				
				/*$("#btmwrp").css("-webkit-transform","translateY(120px)");*/
			});
		});
	},
	
	genEdit : function(){
		$(".sort1").unbind("click");
		$(".sort2").unbind("click");
		$(".sort3").unbind("click");
		$(".sort4").unbind("click");
		$(".sort5").unbind("click");
		
		$(".sort3").bind("click",function(){
			//top100.setgen(top100.genIndex);
			//console.log("111",$(this).data("url"));
			
		});
		
		$(".sort4").bind("click",function(){
			top100.genIndex++;
			top100.setgen(top100.genIndex);
			
		});
		$(".sort5").bind("click",function(){
			top100.genIndex++;
			top100.genIndex++;
			top100.setgen(top100.genIndex);
		});
		$(".sort2").bind("click",function(){
			top100.genIndex--;
			top100.setgen(top100.genIndex);
		});
		$(".sort1").bind("click",function(){
			top100.genIndex--;
			top100.genIndex--;
			top100.setgen(top100.genIndex);
		});
	},
	
	isWheel : false,
	
	addTop100 : function(){
		$(document).unbind("keydown");
		$(document).unbind("mousewheel");

		$(document).bind("keydown",function(e){
			if(e.keyCode == 39 || e.keyCode == 38 || e.originalEvent.wheelDelta / 120 < 0){
				if(top100.currentIndex > 0){
					top100.currentIndex--;
					top100.setCvfl(top100.currentIndex);
				}
			}
			if(e.keyCode == 37 || e.keyCode == 40 || e.originalEvent.wheelDelta / 120 > 0){
				if(top100.currentIndex < top100.data.length){
					top100.currentIndex++;
					top100.setCvfl(top100.currentIndex);
				}
			}
		});
		var that = this;
		$(document).bind("mousewheel",function(e){
			
			if(!that.isWheel){
				that.isWheel = true;
				if(e.originalEvent.wheelDelta / 120 < 0){
					if(top100.currentIndex > 0){
						top100.currentIndex--;
						top100.setCvfl(top100.currentIndex);
						
						
					}
				}
				if(e.originalEvent.wheelDelta / 120 > 0){
					if(top100.currentIndex < 100){
						top100.currentIndex++;
						top100.setCvfl(top100.currentIndex);
						
					}
				}
				setTimeout(function(){
					that.isWheel = false;
				},300);
			}
		});
		
	}
}

/*
 * Top 100
 */

var top100 = {
	
	classList : 
		[
		 	"top100_0",
		 	"top100_1",
		 	"top100_2",
		 	"top100_3",
		 	"top100_4",
		 	"top100_5",
		 	"top100_6",
		 	"top100_7",
		 	"top100_8",
		 	"top100_9",
		 	"top100_10",
	 	],
	 	
	genClassList : 
			[
			 	"sort_min_exit",
			 	"sort_min",
			 	"sort1",
			 	"sort2",
			 	"sort3",
			 	"sort4",
			 	"sort5",
			 	"sort_max",
			 	"sort_max_exit",
		 	],
	
	category : null,
	data : null,
	currentIndex : null,
	genIndex : 0,
		
	init: function(){
		if(this.category == null || this.category == "top100"){
			$("#main_top100").css("display","block");
			$("#search_wrp").css("display","none");
			var that = this;
			eventCotroller.addTop100();
			
			that.cateClick(1);
			that.top100Menu();
			
			$(".cate1").bind("click",function(){
				that.cateClick(1);
			});
			
			$(".cate2").bind("click",function(){
				that.cateClick(2);
			});
			
			$(".cate3").bind("click",function(){
				that.cateClick(3);
			});
			
			$(".cate4").bind("click",function(){
				that.cateClick(4);
			});
			
			$(".cate5").bind("click",function(){
				that.cateClick(5);
			});
		}else if(this.category == "lastest"){
			var that = this;
			//eventCotroller.addTop100();
			
			that.cateClick(10);
			that.lastestMenu();
		}
	},
	
	top100Menu : function(){
		$(".title").text("멜론차트 - Melon Top 100");
		$(".indicator, .diffnum,  .subtitle").css("display","block");
		$(".gentitle , .gen").css("display","none");
	},
	
	lastestMenu : function(){
		$(".title").text("최신 음악");
		$(".indicator, .diffnum, .subtitle").css("display","none");
		$(".gentitle, .gen").css("display","block");
		
		top100.setgen(0);
	},
	
	cateClick : function(idx){
		$("#top100 > div").css("-webkit-transition","1s");
		if(idx == 1){
			this.cate1Click();
		}
		if(idx == 2){
			this.cate2Click();		
		}
		if(idx == 3){
			this.cate3Click();
		}
		if(idx == 4){
			this.cate4Click();
		}
		if(idx == 5){
			this.cate5Click();
		}
		if(idx == 10){
			this.lastestClick();
		}
	},
	
	//-webkit-transition: 1s;
	
	cateInitial : function(idx){
		$("#top100 > div").css("-webkit-transition","0.1s");
		$(".subtitle").css("-webkit-filter","opacity(0.2)");
		$(".cate" + idx).css("-webkit-filter","opacity(0.9)");
	},
	
	lastestClick : function(){
		//$("#top100").empty();
		/*var that = this;
		$.get("http://www.melon.com/new/index.json",function(data){
			that.data = data.songList;
			that.drawCvfl(data.songList);
			that.cateInitial(1);
		});*/
	},
	
	CustomlastestClick : function(uri){
		//$("#top100").empty();
		var that = this;
		$.get(uri,function(data){
			that.data = data.songList;
			that.drawCvfl(data.songList);
			that.cateInitial(1);
			
			$(".title").empty();
			$(".title").append("최신음악 - " + $(".sort3").text());
		});
	},
	
	cate1Click : function(){
		//$("#top100").empty();
		var that = this;
		$.getJSON("http://www.melon.com/chart/index.json?callback=?",function(data){
			that.data = data.songList;
			that.drawCvfl(data.songList);
			that.cateInitial(1);
		});
	},
	
	cate2Click : function(){
		//$("#top100").empty();
		var that = this;
		$.getJSON("http://www.melon.com/chart/rise/index.json#params%5Bidx%5D=1?callback=?",function(data){
			that.data = data.songList;
			that.drawCvfl(data.songList);
			that.cateInitial(2);
		});
	},
	
	cate3Click : function(){
		//$("#top100").empty();
		var that = this;
		$.getJSON("http://www.melon.com/chart/day/index.json?callback=?",function(data){
			that.data = data.songList;
			that.drawCvfl(data.songList);
			that.cateInitial(3);
		});
	},
	
	cate4Click : function(){
		//$("#top100").empty();
		var that = this;
		$.getJSON("http://www.melon.com/chart/month/index.json#params%5Bidx%5D=1&params%5BrankMonth%5D=201506&params%5BisFirstDate%5D=false&params%5BisLastDate%5D=true&callback=?",function(data){
			that.data = data.songList;
			that.drawCvfl(data.songList);
			that.cateInitial(4);
		});
	},
	
	cate5Click : function(){
		//$("#top100").empty();
		var that = this;
		$.getJSON("http://www.melon.com/chart/week/index.json#params%5Bidx%5D=1&params%5BstartDay%5D=20150629&params%5BendDay%5D=20150705&params%5BisFirstDate%5D=false&params%5BisLastDate%5D=true&callback=?",function(data){
			that.data = data.songList;
			that.drawCvfl(data.songList);
			that.cateInitial(5);
		});
	},
	
	drawCvfl : function(data){
		var that = this;
		
		$("#top100_scroller").css("width",107*data.length);
		
		if(this.scroller != null){
			this.scroller.destroy();
		}
		
		$("#top100_thum,#top100_scroller").empty();
		//$("#top100_scroller").empty().css("width",132*data.length);
		
		$("#top100 > .iScrollHorizontalScrollbar").remove();
		
		this.scroller = new IScroll('#top100', {
			scrollX: true,
			scrollY: false,
			scrollbars:true,
			momentum: true,
			snap: true,
			snapSpeed: 1000,
			keyBindings: true,
			mouseWheel:true
			
		});
		
		
		
		
		for(var key in data){

			$("#top100_scroller").append('<div id = "top100_item' + key + '" class = "top100_album" ></div>');
			$('#top100_item' + key ).css("background-image","url('http://image.melon.com" + data[key]["albumImgPath"]  + "/melon/resize/100')");
			$('#top100_item' + key ).data("key",key);
			$('#top100_item' + key ).data("obj",data[key]);
			
			$('#top100_item' + key ).append(that.circleSVGstr);
			/*$('#top100_item' + key ).bind("click",function(e){
				
				var tmpkey = $(this).data("key");
				that.setCvfl(parseInt(tmpkey));
				e.stopPropagation();
			
			});*/
		
			$("#top100_thum").append('<div id = "top100_thum_' + key + '" class = "minithum"></div>');
			$('#top100_thum_' + key ).css("background-image","url('http://image.melon.com" + data[key]["albumImgPath"]  + "/melon/resize/22')");
			$('#top100_thum_' + key ).data("obj",data[key]);
			$('#top100_thum_' + key ).data("key",key);
			
		}
		
		for(var key in data){
			$("#top100_scroller").append('<div id = "top100_item_txt_' + key + '" class = "top100_album_txt" ></div>');
			
			if(data[key]["diff"] > 0)
				$('#top100_item_txt_' + key ).append(this.plusSVGstr);
			
			if(data[key]["diff"] < 0)
				$('#top100_item_txt_' + key ).append(this.minusSVGstr);
			
			if(data[key]["diff"] == 0)
				$('#top100_item_txt_' + key ).append(this.equalSVGstr);
			
			$('#top100_item_txt_' + key ).append("<div class = 'top100_item_txt_num'>" + (parseInt(key)+1) + "</div>")
			
			$('#top100_item_txt_' + key ).append("<div class = 'top100_item_txt_title'> " + data[key]["songName"] + "</div>")
			$('#top100_item_txt_' + key ).append("<div class = 'top100_item_txt_singer'> " + data[key]["artistNameBasket"] + "</div>")
			
			
		}

		//var ul = $('#top100'); // your parent ul element
		//ul.children().each(function(i,li){ul.prepend(li)})
		$(".minithum").bind("mouseover",function(){
			$(this).addClass("top10_thum_on");
		//	console.log($(this).data("obj"));
			$(this).css("background-image","url('http://image.melon.com" + $(this).data("obj")["albumImgPath"]  + "')");
		});
		
		$(".minithum").bind("mouseout",function(){
			$(this).removeClass("top10_thum_on");
		});
		
		$(".minithum").bind("click",function(){
			//top100.setCvfl(parseInt($(this).data("key")));
			//console.log($(this).data("key"));	
			top100.scroller.scrollToElement("#top100_item"+$(this).data("key"),400);
			$("#top100_item"+$(this).data("key")).trigger("mouseover");
		});
		
		$(".top100_album").bind("mouseover",function(){
			$(this).addClass("top100_on");
			$(this).find("svg").show();
		});
		
		$(".top100_album").bind("mouseout",function(){
			$(this).removeClass("top100_on");
			$(this).find("svg").hide();
		});
		
		
		
		setTimeout(function(){
			that.setCvfl(0);
		},10)
		
		$(".addPlay").touch(function(){
			
			player.addMusicAndPlay($(this).parent().data("obj"));
		});
		

		setTimeout(function(){
			that.scroller.refresh();
		},1000);
	},
	
	equalSVGstr :'	<svg id="top100_arrow_equal" x="0px" y="0px" viewBox="0 0 259.773 259.773" width="256px" height="256px"style="position:relative;display:block;relative;top: -120px;left: -125px;enable-background: new 0 0 401.949 401.949; fill: rgb(114, 140, 152);; -webkit-transform: scale(0.05);"><g><rect x="0" y="18.65" width="259.773" height="75.663"></rect><rect x="0" y="165.459" width="259.773" height="75.664"></rect></g></svg>', 
	plusSVGstr : '<svg id="top100_arrow_up" version="1.1" x="0px" y="0px" width="256px" height="256px" viewBox="0 0 401.949 401.949" style="display:block;enable-background: new 0 0 401.949 401.949; fill: red; -webkit-transform: scale(0.05);position: relative;top: -120px;left: -125px;">' +
		'<g>' +
			'<g>' +
				'<g id="Layer_5_60_">' +
					'<path d="M328.508,173.212L211.214,4.948c-5.633-6.598-14.846-6.598-20.479,0L73.445,173.209     c-5.631,6.599-3.146,11.996,5.529,11.996h49.068c8.672,0,15.77,7.097,15.77,15.771l0.077,51.518v133.428l-0.021,0.292     c0.003,8.676,7.321,15.734,15.991,15.736l82.789-0.002c8.674,0,15.771-7.096,15.771-15.766l-0.279-185.207     c0-8.674,7.094-15.771,15.769-15.771h49.066C331.647,185.205,334.136,179.808,328.508,173.212z"></path>' +
				'</g>' +
			'</g>' +
		'</g>' +
		'</svg>',
	minusSVGstr : '<svg id="top100_arrow_down" version="1.1" id="imgView" x="0px"y="0px" width="256px" height="256px" viewBox="0 0 401.949 401.949" style="display:block;enable-background: new 0 0 401.949 401.949; fill: rgb(15, 177, 247); -webkit-transform: scale(0.05) rotateX(-180deg);position: relative;top: -120px;left: -125px;"><g><g><g id="Layer_5_60_"><path d="M328.508,173.212L211.214,4.948c-5.633-6.598-14.846-6.598-20.479,0L73.445,173.209     c-5.631,6.599-3.146,11.996,5.529,11.996h49.068c8.672,0,15.77,7.097,15.77,15.771l0.077,51.518v133.428l-0.021,0.292     c0.003,8.676,7.321,15.734,15.991,15.736l82.789-0.002c8.674,0,15.771-7.096,15.771-15.766l-0.279-185.207     c0-8.674,7.094-15.771,15.769-15.771h49.066C331.647,185.205,334.136,179.808,328.508,173.212z"></path></g></g></g></svg>',
	circleSVGstr : '<svg class="addPlay" width="130" height="130" viewBox="0 0 30 30" style=""><path d="M10.0 6.0L10.0 24.0L24.0 15.0Z"></path><circle cx="14" cy="15" r="13" stroke="white" stroke-width="1" fill="transparent"></circle></svg>', 
	
	setCvfl :function(idx){
		/*this.currentIndex = idx; 
		var idx = idx;
		var that = this;
		
		$("#top100 > div").each(function(index){
			
			//index = 99 -index;
			
			$(this).removeClass();
			$(this).empty();
			
			if(idx > index){
				$(this).addClass("top100_m");
			}
			
			if((idx-1) == index){
				$(this).addClass(that.classList[0]).removeClass("top100_none");
				
			}
			
			if(idx == index){
				
				//$(this).css("z-index","999");
				
				if(that.category == null || that.category == "top100"){
					$(".currentTitle").text(that.data[index]["curRank"] + ". " + that.data[index]["songName"]);
				}else{
					$(".currentTitle").text("" + that.data[index]["songName"]);
				}
				$(".currentSinger").text(that.data[index]["artistNameBasket"]);
				$(".diffnum").text(that.data[index]["diff"]);
				
				$(this).addClass(that.classList[1]).removeClass("top100_none");
				if(that.data[index]["diff"] > 0){
					$("#top100_arrow_up").css("display","block");
					$("#top100_arrow_down").css("display","none");
					$("#top100_arrow_equal").css("display","none");
					
				}
				if(that.data[index]["diff"] < 0){
					$("#top100_arrow_up").css("display","none");
					$("#top100_arrow_down").css("display","block");
					$("#top100_arrow_equal").css("display","none");
				}
				if(that.data[index]["diff"] == 0){
					$("#top100_arrow_up").css("display","none");
					$("#top100_arrow_down").css("display","none");
					$("#top100_arrow_equal").css("display","block");
				}
				
				$(this).append(that.circleSVGstr);
				
				$("#addPlay").unbind("click");
				$("#addPlay").bind("click",function(){
					player.addMusicAndPlay($(this).parent().data("obj"));
				});
				
			}
			if((idx+1) == index){
				$(this).addClass(that.classList[2]).removeClass("top100_none");
			}
			if((idx+2) == index){
				$(this).addClass(that.classList[3]).removeClass("top100_none");
			}
			if((idx+3) == index){
				$(this).addClass(that.classList[4]).removeClass("top100_none");
			}
			if((idx+4) == index){
				$(this).addClass(that.classList[5]).removeClass("top100_none");
			}
			if((idx+5) == index){
				$(this).addClass(that.classList[6]).removeClass("top100_none");
			}
			if((idx+6) == index){
				$(this).addClass(that.classList[7]).removeClass("top100_none");
			}
			if((idx+7) == index){
				$(this).addClass(that.classList[8]).removeClass("top100_none");
			}
			if((idx+8) == index){
				$(this).addClass(that.classList[9]).removeClass("top100_none");
			}
			if((idx+9) == index){
				$(this).addClass(that.classList[10]).removeClass("top100_none");
			}
		
			
			if((idx + 9) < index){
				$(this).addClass("top100_none");
			}
			
		});
		*/
	},
	
	setgen : function(idx){
		this.genIndex = idx;
		var that = this;
		
		$(".gen").each(function(index){
			if(index < $(".gen").size()){
				$(this).data("url",that.genreData[index]["url"]);
				$(this).text(that.genreData[index]["name"]);
			}
			$(this).removeClass().addClass("gen");
			
			if(idx > index){
				$(this).addClass(that.genClassList[0]);
			}
			
			if((idx-3) == index){
				$(this).addClass(that.genClassList[1]);
			}
			
			
			if((idx-2) == index){
				$(this).addClass(that.genClassList[2]);
			}
			
			if((idx-1) == index){
				$(this).addClass(that.genClassList[3]);
			}
			
			if((idx) == index){
				$(this).addClass(that.genClassList[4]);
				that.CustomlastestClick($(this).data("url"));
			}
			
			if((idx + 1) == index){
				$(this).addClass(that.genClassList[5]);
			}
			
			if((idx + 2) == index){
				$(this).addClass(that.genClassList[6]);
			}
			
			if((idx + 3) == index){
				$(this).addClass(that.genClassList[7]);
			}
			
			if((idx + 4) == index){
				$(this).addClass(that.genClassList[8]);
			}
			if((idx + 4) <index){
				$(this).addClass(that.genClassList[8]);
			}
			
			if(index == ($(".gen").size()-1)){
				eventCotroller.genEdit();
			}
		});
	},
	
	genreData : [
	 {idx:0,name:"종합",url:"http://www.melon.com/new/index.json?genreCode=DP0000&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:1,name:"가요",url:"http://www.melon.com/new/index.json?genreCode=DP0100&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:2,name:"팝",url:"http://www.melon.com/new/index.json?genreCode=DP0200&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:3,name:"OST",url:"http://www.melon.com/new/index.json?genreCode=DP0300&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:4,name:"일렉트로니카",url:"http://www.melon.com/new/index.json?genreCode=DP1400&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:5,name:"록/메탈",url:"http://www.melon.com/new/index.json?genreCode=DP1500&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:6,name:"R&B/Soul",url:"http://www.melon.com/new/index.json?genreCode=DP1600&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:7,name:"랩/힙합",url:"http://www.melon.com/new/index.json?genreCode=DP1700&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:8,name:"인디음악",url:"http://www.melon.com/new/index.json?genreCode=DP1800&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:9,name:"트로트",url:"http://www.melon.com/new/index.json?genreCode=DP1900&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:10,name:"J-POP",url:"http://www.melon.com/new/index.json?genreCode=DP0400&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:11,name:"클래식",url:"http://www.melon.com/new/index.json?genreCode=DP0500&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:12,name:"재즈",url:"http://www.melon.com/new/index.json?genreCode=DP0900&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:13,name:"뉴에이지",url:"http://www.melon.com/new/index.json?genreCode=DP0800&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:14,name:"어린이",url:"http://www.melon.com/new/index.json?genreCode=DP0700&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:15,name:"태교",url:"http://www.melon.com/new/index.json?genreCode=DP2000&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:16,name:"CCM",url:"http://www.melon.com/new/index.json?genreCode=DP0600&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	 {idx:17,name:"종교음악",url:"http://www.melon.com/new/index.json?genreCode=DP1100&params%5BorderBy%5D=&po=pageObj&startIndex=1"	},
	
	]
}