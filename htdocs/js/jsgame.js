$( document ).ready(function() {
        console.log( "document loaded" );



	
 function get_sis(){
 return $.ajax({
		url: "js/jq_json1.php",
		dataType: 'json',
		async:false,
		success: function(datas){
						
			return datas;
		} 
	});
 }
var i = 0;  
var j = 0; 
var globalbattle = new Array();
globalbattle[1] = new Array();
globalbattle[2] = new Array();
globalbattle[3] = new Array();
globalbattle[4] = new Array();
globalbattle[5] = new Array();
globalbattle[6] = new Array();
globalbattle[7] = new Array();
globalbattle[8] = new Array();
globalbattle[9] = new Array();
globalbattle[10] = new Array();

var stol_slot_card  =[];
var winloss_mass = [];



var hand_card_id_bot = [];
var deck_card_id_bot = [];

var hand_card_id_player = [];
var deck_card_id_player = [];

/// рефакторинг на ИД
var  bot_name_card_id = [];
var  bot_damage_card_id = [];
var 	bot_heals_card_id  = [];
var   bot_block_card_id  = [];
var   bot_image_card_id  = [];
var bot_key_card_id = [];
var bot_desc_card_id = [];
i = 0;
var name_cardus_bot =  get_sis();
name_cardus_bot.done(function(datas) {
	$.each( datas, function( key, value ) {
		if(datas[key].type == "player1"){
			bot_key_card_id[i] = parseInt(key);
			bot_name_card_id [key] = datas[key].name_card;
			bot_damage_card_id[key] = datas[key].damage;
			bot_heals_card_id[key] = datas[key].heals;
			bot_block_card_id[key] = datas[key].block;
			bot_image_card_id[key] = datas[key].image_icon;
			bot_desc_card_id[key] = datas[key].descriptionin;
			i = i + 1;
		}
		});
	return  bot_key_card_id, bot_name_card_id, bot_damage_card_id,bot_heals_card_id, bot_block_card_id, bot_image_card_id  ;
});


var  player_name_card_id = [];
var  player_damage_card_id = [];
var  player_heals_card_id  = [];
var  player_block_card_id  = [];
var  player_image_card_id  = [];
var player_key_card_id = [];
var player_desc_card_id = [];

i = 0;
var name_cardus_player =  get_sis();
name_cardus_player.done(function(datas) {
	$.each( datas, function( key, value ) {
		if(datas[key].type == "player2"){
			player_key_card_id[i] = parseInt(key);
			player_name_card_id [key] = datas[key].name_card;
			player_damage_card_id[key] = datas[key].damage;
			player_heals_card_id[key] = datas[key].heals;
			player_block_card_id[key] = datas[key].block;
			player_image_card_id[key] = datas[key].image_icon;
			player_desc_card_id[key] = datas[key].descriptionin;
			i = i + 1;
		}
		});
	return  player_key_card_id, player_name_card_id, player_damage_card_id,player_heals_card_id, player_block_card_id, player_image_card_id  ;
});




$( init );
var correctCards = 0;


function init() {

  // Hide the success message
 $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );
  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );
  

  
  // карты бота отрисовка
  for ( var i=0; i<bot_key_card_id.length; i++ ) { 
     if( i < 10){
	$('<div> </div> ').data( 'number', bot_key_card_id[i] ).attr( 'id', 'card'+bot_key_card_id[i] ).appendTo( '#cardPile1' ).draggable( {
      containment: '#content',
      stack: '#cardPile1 div',
      cursor: 'move',
      revert: true
    } );
	
	hand_card_id_bot[i] = bot_key_card_id[i] ;
	//console.log("в руке лежат "+hand_card_id_bot[i]);
	
	//$('<table class="card"> <tr><td class="cardtop" id="cardtops'+bot_key_card_id[i]+'"> </td> </tr><tr><td class="cent"> </td></tr><tr class="card"><td class="cardbot" id="cardbots'+bot_key_card_id[i]+'"></td></tr></table>').appendTo('#card'+bot_key_card_id[i]);
	
	$('#card'+bot_key_card_id[i]).attr("aria-disabled",true);
	$('#card'+bot_key_card_id[i]).draggable( "disable" );
	$('#card'+bot_key_card_id[i]).css('background-image', 'url(../../../images/onload/113.png');
  }
	else
	{
	  $('<div></div> ').data( 'number', bot_key_card_id[i] ).attr( 'id', 'card'+bot_key_card_id[i]).appendTo( '#cardPile1' ).draggable( {
      containment: '#content',
      stack: '#cardPile1 div',
      cursor: 'move',
      revert: true
    } );
	deck_card_id_bot[i] = bot_key_card_id[i] ;
//console.log("в колоде лежит  номер" +i+ " "+deck_card_id_bot[i]);	
	//$('<table class="card"> <tr><td class="cardtop" id="cardtops'+bot_key_card_id[i]+'"> </td> </tr><tr><td class="cent"> </td></tr><tr class="card"><td class="cardbot" id="cardbots'+bot_key_card_id[i]+'"></td></tr></table>').appendTo('#card'+bot_key_card_id[i]);
	$('#card'+bot_key_card_id[i]).attr("aria-disabled",true);
	$('#card'+bot_key_card_id[i]).draggable( "disable" );
	$('#card'+bot_key_card_id[i]).css('background-image', 'url(../../../images/onload/113.png');
		document.getElementById('card'+bot_key_card_id[i]).style.display = "none";
	}
  }
  
  
 
  
  
  // карты игрока
  
	for ( var i=0; i<player_key_card_id.length; i++ ) {
    if( i < 10){
	
	$('<div> </div> ').data( 'number', player_key_card_id[i] ).attr( 'id', "card"+player_key_card_id[i] ).appendTo( '#cardPile2' ).draggable( {
      containment: '#content',
      stack: '#cardPile2 div',
      cursor: 'move',
      revert: true
    } );
	hand_card_id_player[i] = player_key_card_id[i] ;
	
	$('<table class="card"> <tr><td class="cardtop"><a class="tooltip" href="#"> ' + player_name_card_id[player_key_card_id[i]] +' <span class="classic">'+player_desc_card_id[player_key_card_id[i]]+'</span></a></td></tr><tr><td class="cent">        </td></tr><tr class="card"><td class="cardbot">' +player_damage_card_id[player_key_card_id[i]]+' ' +player_heals_card_id[player_key_card_id[i]]+' '+player_block_card_id[player_key_card_id[i]] + '</td></tr></table>').appendTo('#card'+player_key_card_id[i]);
	$('#card'+player_key_card_id[i]).css('background-image', 'url(../../../images/onload/'+player_image_card_id[player_key_card_id[i]]+')');
	}
	else{
	$('<div> </div> ').data( 'number', player_key_card_id[i] ).attr( 'id', "card"+player_key_card_id[i] ).appendTo( '#cardPile2' ).draggable( {
      containment: '#content',
      stack: '#cardPile2 div',
      cursor: 'move',
      revert: true
    } );
	deck_card_id_player[i] = player_key_card_id[i] ;
	//console.log(deck_card_id_player[i]);
	$('<table class="card"> <tr><td class="cardtop"><a class="tooltip" href="#"> ' + player_name_card_id[player_key_card_id[i]] +' <span class="classic">'+player_desc_card_id[player_key_card_id[i]]+'</span></a></td></tr><tr><td class="cent">        </td></tr><tr class="card"><td class="cardbot">' +player_damage_card_id[player_key_card_id[i]]+' ' +player_heals_card_id[player_key_card_id[i]]+' '+player_block_card_id[player_key_card_id[i]] + '</td></tr></table>').appendTo('#card'+player_key_card_id[i]);
	$('#card'+player_key_card_id[i]).css('background-image', 'url(../../../images/onload/'+player_image_card_id[player_key_card_id[i]]+')');
	document.getElementById('card'+player_key_card_id[i]).style.display = "none";
	}	
	}
	
	
	
  

  // Игровое поле 
  
  for ( var i=1; i<=10; i++ ) {
    $('<div>' + '</div>').data( 'number1', i ).appendTo( '#cardSlots' ).attr( 'id', 'cardslot'+i ).droppable( {
      accept: '#cardPile1 div', // возня врезания
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
  for ( var i=1; i<=10; i++ ) {
    $('<div>' + '</div>').data( 'number2', i ).appendTo( '#cardSlots' ).attr( 'id', 'cardslot'+(i+10)).droppable( {
      accept: '#cardPile2 div', // возня врезания
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
 
 
	
 
 
 
 
deck_card_id_player.splice(0,10);
deck_card_id_bot.splice(0,10);


 document.getElementById("deck_player").value = deck_card_id_player.length;	
	document.getElementById("deck_bot").value = deck_card_id_bot.length; 
  //document.getElementById("hand_player").value = hand_card_id_player.length;
  // document.getElementById("hand_bot").value = hand_card_id_bot.length;
 
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min)
  rand = Math.round(rand);
  return rand;
}

  var am =0;
   var om =0;
   var slot_pis =  [];


function drawtext(nums){
	text = "Атакует " +player_name_card_id[nums]+"\r\n";
	$('#textcoment').append(text);
	
}


function drawtext_bot_id(key_id){
	text =  "Атакует " + bot_name_card_id[key_id]+"\r\n";
	$('#textcoment').append(text);
}


// отрисовка выброса карты бота 
function card_sell_bot(id, pos, id_ran ){
	
	//$(bot_name_card_id).appendTo('#cardbots'+id);
			  // console.log(bot_name_card_id[id]+" id="+ id );
			  
			  $('<table class="card"> <tr><td class="cardtop" id="cardtops'+id+'"> '+bot_name_card_id[id]+' </td> </tr><tr><td class="cent"> </td></tr><tr class="card"><td class="cardbot" id="cardbots'+id+'">'+bot_damage_card_id[id]+" "+bot_heals_card_id[id]+ " "+ bot_block_card_id[id] +' </td></tr></table>').appendTo('#card'+id);
			  /* $("<i>"+bot_name_card_id[id]+"</i>").appendTo('#cardtops'+id);
			   $("<i>"+bot_damage_card_id[id]+" "+bot_heals_card_id[id]+ " "+ bot_block_card_id[id] +"</i>").appendTo('#cardbots'+id); */
			  var position = $("#cardslot"+pos).position();
			   $('#card'+id).css('background-image', 'url(../../../images/onload/'+bot_image_card_id[id]);
			   $( "#card"+id).css('position','absolute').animate({ "left": (position.left), "top": (position.top) }, {duration:1200});
			   drawtext_bot_id(id);
			   
			   
			    globalbattle[pos][5] = bot_damage_card_id[id];
				globalbattle[pos][6] = bot_heals_card_id[id];
				globalbattle[pos][7] = bot_block_card_id[id];
				globalbattle[pos][8] = "k";
				globalbattle[pos][9] = "s";
				/*
				console.log("damage "+ globalbattle[pos][5]);
				console.log("heals "+  globalbattle[pos][6]);
				console.log("block "+  globalbattle[pos][7]);
				console.log("klass "+  globalbattle[pos][8]);
				console.log("spell "+  globalbattle[pos][9]); */
			   //drawtext_bot();
			   //stol_id_card.push(numbers1[ran]);
			  // console.log("бот выкинул карту"+id );
			   hand_card_id_bot.splice(id_ran,1);
			   //document.getElementById("hand_bot").value = hand_card_id_bot.length;
			   //console.log(pos);
			   if(id !== undefined){
			   stol_id_card.push(id);
			   }
			   
			   
			   
			   
			   //hand_card1.splice(ran,1);
}
	


var k =10;
// очистить карты ии взять
 function   clearadd(){ 

	//$('#statistik').remove();
	/* var k =10;
	for(var j = k; j < (k+(12-hand_card_id_player.length)); j++){
		console.log(j);
		hand_card_id_player.push(deck_card_id_player[j]);
		//deck_card_id_player.splice(j,1);
		
	} */
	if(hand_card_id_player.length === 10){
	console.log('карт в руке максимально');
	}else{
		
	k =  10 - hand_card_id_player.length;
	if(deck_card_id_player.length < k){
		console.log('карт в колоде меньше');
		k = deck_card_id_player.length;
	}
	for(var j = 0 ; j < k; j++){
	hand_card_id_player.push(deck_card_id_player[j]);
	hand_card_id_bot.push(deck_card_id_bot[j]);
	document.getElementById('card'+deck_card_id_bot[j]).style.display = '';
	document.getElementById('card'+deck_card_id_player[j]).style.display = '';
	}
	deck_card_id_player.splice(0,k);
	deck_card_id_bot.splice(0,k);
	}

	
	//  document.getElementById("hand_player").value = hand_card_id_player.length;
  // document.getElementById("hand_bot").value = hand_card_id_bot.length;	
	document.getElementById("deck_player").value = deck_card_id_player.length;	
	document.getElementById("deck_bot").value = deck_card_id_bot.length;
	
	
	
	if((deck_card_id_bot.length === 0) &&  (deck_card_id_player.length === 0) &&   (hand_card_id_player.length === 0) &&  (hand_card_id_bot.length === 0)){
		
		if(kin > win){
		alert("конец игры выйграл бот  со счётом" + kin + "нажмите кнопку завершить" );	
		}else {
		alert("конец игры выйграл игрок  со счётом" +win + "нажмите кнопку завершить" );	
		}
		
		document.getElementById("exitgame").style.display ="";
		
	}
	
	

 }
 
 
 var kin=0;
 var win=0;
 var neo = 0;
 //бой
 function battle(){ 
  for(var j=0;  j < stol_slot_card.length; j++){
  batleefunc(stol_slot_card[j]);
 //console.log("количество разыгранных карт "+(j+1));
 
 }
// console.log(winloss_mass);
 
for(var ij = 0; ij <  winloss_mass.length; ij++){
	if(winloss_mass[ij] === "W1"){
		kin += 1;
	}else if(winloss_mass[ij] === "W2"){
		win += 1;
	} else {neo +=1;}
	
	
}
winloss_mass.splice(0, winloss_mass.length);
stol_slot_card.splice(0, stol_slot_card.length);
 document.getElementById("score_player").value = win ;
 document.getElementById("score_bot").value = kin ;
 
 
 return winloss_mass, stol_slot_card;
 }
 
 
 function batleefunc(slot){
	 
	var result1 = 0 ;
	var result2 = 0 ;
	var damage1 =0;
	var damage2 = 0;
	console.log("чё там в слоте"+slot);
	while(true) {
	damage1 = 	globalbattle[slot][5]-globalbattle[slot][2];
	damage2 =   globalbattle[slot][0]-globalbattle[slot][7];
	if( damage1 < 0 ) damage1 = 0; 	
	if( damage2 < 0 ) damage2 = 0; 
if(damage1 ===0 && damage2 ===0){
	console.log("ничья ");
	winloss_mass.push('N');
	break;	
	}	
	globalbattle[slot][1] =  globalbattle[slot][1]  - damage1  ;
	globalbattle[slot][6] =  globalbattle[slot][6]  - damage2  ;
		
	if( globalbattle[slot][1] <=  0) {
	//console.log("1 карта проиграла "+globalbattle[slot][1]);
	//console.log("2 карта выйграла "+globalbattle[slot][6]);
	winloss_mass.push('W2');
	break;
	}
	if( globalbattle[slot][6] <=  0) {
		//console.log("1 карта выйграла "+globalbattle[slot][1]);
		//console.log("2 карта проиграла "+globalbattle[slot][6]);
		winloss_mass.push('W1');
		
	break;
	}

	
	
	}
 }

 var stol_id_card= [];
//закончить ход
document.getElementById("EndXod").addEventListener("click", function(){ 



battle();
/*
for(var x = 0; x < stol_id_card.length; x++){
	//console.log(stol_id_card[x]);
$('#card'+stol_id_card[x]).css('background-image', 'url(../../../images/onload/').hide( "drop", { direction: "down" }, 1500 );
}*/


stol_id_card.forEach(function(item, i, stol_id_card) {
	document.getElementById('card'+item).style.display = 'none';
	
 // alert( i + ": " + item + " (массив:" + stol_id_card + ")" );

}); 
	
	 $('#cardslot11').droppable('enable');
	 $('#cardslot12').droppable('enable');
	 $('#cardslot13').droppable('enable');
	 $('#cardslot14').droppable('enable');
	 $('#cardslot15').droppable('enable');
	 $('#cardslot16').droppable('enable');
	 $('#cardslot17').droppable('enable');
	 $('#cardslot18').droppable('enable');
	 $('#cardslot19').droppable('enable');
	 $('#cardslot20').droppable('enable');
	stol_id_card = [];
	
	
	clearadd();
	 return stol_id_card;
	 
	 
 });
 
    
 

var id_ran = 0;


//ход игрока


function handleCardDrop( event, ui ) {
	
var slotNumber1 = $(this).data('number1');
var slotNumber2 = $(this).data('number2');
var cardNumber = ui.draggable.data('number');
 

drawtext(cardNumber);
//alert(slotNumber2);
stol_id_card.push(cardNumber);
stol_slot_card.push(slotNumber2);


hand_card_id_player.splice(hand_card_id_player[cardNumber],1);
//document.getElementById("hand_player").value = hand_card_id_player.length;

globalbattle[slotNumber2][0] = player_damage_card_id[cardNumber];
globalbattle[slotNumber2][1] = player_heals_card_id[cardNumber];
globalbattle[slotNumber2][2] = player_block_card_id[cardNumber];
globalbattle[slotNumber2][3] = "k";
globalbattle[slotNumber2][4] = "s";

/*
console.log("damage "+ globalbattle[slotNumber2][0]);
console.log("heals "+  globalbattle[slotNumber2][1]);
console.log("block "+  globalbattle[slotNumber2][2]);
console.log("klass "+  globalbattle[slotNumber2][3]);
console.log("spell "+  globalbattle[slotNumber2][4]);
*/
id_ran = Math.floor(Math.random() *  hand_card_id_bot.length);
//console.log("комер из руки "+id_ran);
//console.log("id руки "+ hand_card_id_bot[id_ran]);




	 switch(slotNumber2) {
		  case 1:{
			  card_sell_bot(hand_card_id_bot[id_ran], 1, id_ran )
			  }
		 break;
		 case 2:{
			 card_sell_bot(hand_card_id_bot[id_ran], 2, id_ran )
				  }
		 break;
		 case 3:{
			  card_sell_bot(hand_card_id_bot[id_ran], 3, id_ran )
		  }
		 break;
		 case 4:{
			  card_sell_bot(hand_card_id_bot[id_ran], 4, id_ran )
		  }
		 break;
		 case 5:{
			 card_sell_bot(hand_card_id_bot[id_ran], 5, id_ran )
		  }
		 break;
		 case 6:{
			 
	card_sell_bot(hand_card_id_bot[id_ran], 6, id_ran )
		  }
		 break;
		 case 7:{
			 card_sell_bot(hand_card_id_bot[id_ran], 7, id_ran )
		  }
		 break;
		 case 8:{
			 card_sell_bot(hand_card_id_bot[id_ran], 8, id_ran )
		  }
		 break;
		 case 9:{
			 card_sell_bot(hand_card_id_bot[id_ran], 9, id_ran )
		  }
		 break;
		 case 10:{
			card_sell_bot(hand_card_id_bot[id_ran], 10, id_ran )
		  }
		 break;
	 }
	 


  console.log( "stol="+stol_id_card);

  slot_pis[1]= $(this);
  //alert(slot_pis[1]);
    ui.draggable.draggable( 'disable' );
    $(slot_pis[1]).droppable( "disable" );
	ui.draggable.position( { of: $(slot_pis[1]), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false);
    
	//for (var i = 0; i < attrs11.length; i++) {
	//     console.log( attrs11[i].name + " = " + attrs11[i].value );
   // }
	//om=1;
 
  
 //alert(am+'  '+om);
 //alert(attrs1[2].value+' ' + attrs11[2].value);
/* if(om !=0 && am !=0 ){

 if(attrs1[2].value == attrs11[2].value){
	  cardslot11.removeAttribute('aria-disabled');
	  cardslot11.classList.remove('ui-droppable-disabled');
	 cardslot11.classList.remove('ui-state-disabled');
	//slot_pis[1].droppable('enable');	 
	 //classList.add('ui-droppable');
	 
	
	 
	 
	// document.getElementById('card'+cardNumber).style.display = 'none';
	//document.getElementById('card'+numbers[0]).style.display = 'none';
	 alert('asd');
 }
 }
	*/

  
  
  
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if ( correctCards == 10 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );
  }

 

  
  
 return am,om,slot_pis,stol_id_card; 
}
 });