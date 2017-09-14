function dinastyPrice(url,price){
	var zona=$("#game_area_purchase");
	
	var html='<div class="game_area_purchase_game_wrapper"><div class="game_area_purchase_game"><div class="game_area_purchase_platform"><img src="https://store.dinasty.com.ar/img/iso.png?545" width="90" /></div><h1>Comprar en Dinasty</h1><div class="game_purchase_action"><div class="game_purchase_action_bg"><div class="game_purchase_price price">'+price+'</div><div class="btn_addtocart"><a class="btnv6_green_white_innerfade btn_medium" href="'+url+'" target="_blank"><span>Dinasty</span></a></div></div></div></div></div>';
	zona.html(html+zona.html());
}

function getIdByUrl(url){
	var idSteam=url.substr(url.indexOf("app/")+4);
	if(idSteam.indexOf("/")>0){
		idSteam=idSteam.substring(0,idSteam.indexOf("/"));
	}
	return idSteam;
}

function obtenerPreciowl(elem){
		var txt=elem.innerHTML;
		txt=txt.substr(txt.indexOf('<a href="')+9);
		txt=txt.substr(0,txt.indexOf('"'));
		var id=getIdByUrl(txt)
		var urlQuery=urldin+id;
		$.getJSON(urlQuery+'?json', function( data ) {
			$.each( data, function( key, val ) {
				if('precio'==key){
					if(val=='0') val="No disponible";
					else val='$'+val+' ARS';
					
					elem.setAttribute("style","padding-top: 0px;");
					elem.innerHTML+="<div class='price'>Precio Dinasty: "+val+"</div> <div class='storepage_btn_ctn'><a href='https://store.dinasty.com.ar/game/"+id+"' class='btnv6_blue_hoverfade btn_small ' target='_blank'><span>Ver en Dinasty Store</span></a></div>";
					//elem.innerHTML=val;
				}
			});
		});
}

var urldin='https://store.dinasty.com.ar/game/';

var urlSteam=document.URL;

if(urlSteam.indexOf('wishlist')<0){

	var idSteam=getIdByUrl(urlSteam);

	var urlQuery=urldin+idSteam;

			
	$.getJSON(urlQuery+'?json', function( data ) {
			$.each( data, function( key, val ) {
				if('precio'==key){
					if(val=='0') val="No disponible";
					else val='$'+val+' ARS';
					dinastyPrice(urlQuery,val);
				}
			});
		});
	
}
else{
	var wl=$('.wishlistRowItem');
	for(i=0;i<wl.length;i++){
		var va=wl[i].children;
		obtenerPreciowl(va[0]);
	}
}