var pvlog = {
	id : null,
	previd : null,
	serverUri : null,
	pocid : null,
	set : function(menuid,previd){
		this.id = menuid;
		
		pocid = window.POC_ID;
		this.previd = previd;
		if(!pocid) pocid="WP40";
		var lenid = parseInt(pocid.length);

		// app 일 경우
		if(pocid == "WP40") {
			appAPI(this.id,this.callUri(this.previd)); // 수정필요

		// m.com 일 경우
		} else {
			if($("div[data-logging]") != null){
				this.id = menuid;
				this.serverUri = $("div[data-logging]").data("logging");
				
				this.previd = localStorage.getItem('melonlogging');
				if(this.previd != null){
					$.get(this.serverUri.replace("CR1",this.previd));
				}
				localStorage.setItem('melonlogging',this.id);
			}
		}
	},
	get : function(){
		return this.id;
	}
}