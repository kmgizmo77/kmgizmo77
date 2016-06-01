var pvlog = {
	id : null,
	previd : null,
	serverUri : null,
	set : function(menuid){
		if($("div[data-logging]") != null){
			this.id = menuid;
			this.serverUri = $("div[data-logging]").data("logging");
			
			this.previd = localStorage.getItem('melonlogging');
			if(this.previd != null){
				$.get(this.serverUri.replace("CR1",this.previd));
			}
			localStorage.setItem('melonlogging',this.id);
		}
	},
	get : function(){
		return this.id;
	}
}