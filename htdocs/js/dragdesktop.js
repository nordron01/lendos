$(document).ready(function() {

		var socket = io.connect('http://nordron01.ru:80');
		
		socket.emit('TUK TUK',{ids:1,name: "admin"} );
		socket.on('DUK DUK',function(data){
			console.log(data);
			socket.emit('preload_desktop',"open");
		});
		

		/* login */

		/* preload desktop*/
		$("#socket").click(function(){

			socket.emit('socket',"socket");
		});
		


		socket.on('load_desktop', function(data){
			for (let i = 0; i < data.length; i++) {
				
			
			console.log(data);
			let idor = data[i].idorder_desktop;
				        console.log("Clack");

				        $('<table></table>').data('number', idor).attr('id', 'desktop' + idor).appendTo('#pile').draggable({
				            containment: '#pile',
				            stack: '#pile div',

				            classes: {
				                "ui-draggable": "ui-state-hover"
				            },
				            cursor: 'move',
				            revert: false,
				             drag:function(event,ui){
				             	console.log(ui.position.left);
				             	console.log(ui.position.top);
				             	/*
				             	let offset = $(this).offset();
							 socket.emit('dragging',{
							 	id: parseInt(this.id.replace(/\D+/g,"")),
							 	x: offset.left,
							 	y: offset.top 
							 	

							 })
							*/
							socket.emit('dragging',{
								id:parseInt(this.id.replace(/\D+/g,"")),
								x:ui.position.left,
								y:ui.position.top	

							 })

							}

				        });

				        $("#desktop" + idor).attr('class', 'notable');
				        $("#desktop" + idor).css('top', data[i].pos_top);
				        $("#desktop" + idor).css('left', data[i].pos_left);		
				        $("#desktop" + idor).append("<tr><td> <input type='text' id='name"+idor+"' size='10' class='name_desk' value="+data[i].desktop_name+"> </input></td><tr>");
				        $("#desktop" + idor).append("<tr><td> <button id='addorder" + idor + "' class='butadd'> add </button> </td><tr>");
				        $("#desktop" + idor).append("<tr><td> <button id='addorder" + idor + "' class='calculation'> Расчитать </button> </td><tr>");
				        $("#desktop" + idor).append("<tr><td> <button id='addorder" + idor + "' class=''> Бронь </button> </td><tr>");

				    }

		}
			);	



    $("#dialog-form").hide();
    $("#result-form").hide();


    var i = 0;
    $("#pile").droppable({
        accept: '', // что можно пооложить
        classes: {
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: handleCardDrop
    });



    $("#create_desk").click(function() {

    	socket.emit('addorderdesk','');

    });


   





    socket.on('eventClient',function(data){

				        i = data;
				        console.log("Clack");

				        $('<table></table>').data('number', i).attr('id', 'desktop' + i).appendTo('#pile').draggable({
				            containment: '#pile',
				            stack: '#pile div',
				            classes: {
				                "ui-draggable": "ui-state-hover"
				            },
				            cursor: 'move',
				            revert: false,
				             drag:function(event, ui){
				             	console.log(ui.position.left);
				             	console.log(ui.position.top);
				             	/*
				             	let offset = $(this).offset();
										

							 socket.emit('dragging',{
							 	id: parseInt(this.id.replace(/\D+/g,"")),
							 	x: offset.left,
							 	y: offset.top 
							 	

							 })
							*/
							socket.emit('dragging',{
								id:parseInt(this.id.replace(/\D+/g,"")),
								x:ui.position.left,
								y:ui.position.top	

							 })


							}

				        });
				        $("#desktop" + i).attr('class', 'notable');
				        $("#desktop" + i).append("<tr><td> <input type='text' id='name"+i+"' size='10' class='name_desk' value=''> </input></td><tr>");
				        $("#desktop" + i).append("<tr><td> <button id='addorder " + i + "' class='butadd'> add </button> </td><tr>");
				        $("#desktop" + i).append("<tr><td> <button id='addorder" + i + "' class='calculation'> Расчитать </button> </td><tr>");
				        $("#desktop" + i).append("<tr><td> <button id='addorder" + i + "' class=''> Бронь </button> </td><tr>");

    });



    $("#select_items").on("change",function() {
    	console.log(this.value);
    	let formid = $("#select_items").parent();
    	console.log(formid[0].id);
    	socket.emit('add_order_pos',{val: this.value, id:formid[0].id   });
    	$(".tovar_bind").remove();
    	//console.log($('#select_items').select());
    });


    socket.on('combo_tovar_box_create',function(data){
    	console.log(data.row);
    	$("#"+data.id).append("<select id='sel_"+data.id+"' class='tovar_bind'> </select)");
    	$("#sel_"+data.id).append("<option value='0'> Выбрать... </option>");
    	for (let i = 0; i < data.row.length; i++) {
		
    		$("#sel_"+data.id).append("<option value='"+(data.row[i].idsklad_tovar)+"'>"+data.row[i].name_tovar+" "+data.row[i].finish_price+"р. " +" </option>")
    	}
    	

    });



    socket.on('draggster',function(data){
    	console.log(data);
    	

    	//$('#'+data.id).offset({top:data.y, left:data.x });
    	$('#'+data.id).css('top', data.y);
		$('#'+data.id).css('left', data.x);
    	//$('#'+data.id).offset. = data.y;

    });

    socket.on('upd_name_desk_all',function(data){
    	console.log(data);
    	$("#"+data.id).val(data.name);

    });

	    $(".notable").draggable({ drag:function(event, ui){

	  ui.position.left = x;
	  ui.position.top = y;
	}});

	    $("#pile").on("blur",".name_desk",function(){
	    	
	    	
	    	console.log(this);

	    	let textval = $(this).val();

	    	let idsh = parseInt(this.id.replace(/\D+/g,""));

	    	console.log(textval);

	    	let data = Promise.resolve( {id: idsh, name:textval });

	    	data.then(function(data){
	    		socket.emit('upd_name_desk',data);
	   	 });	

	    })


    function handleCardDrop(event, ui) {
        console.log(this);




    };



    var dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 200,
        width: 270,
        modal: true,
        buttons: [
        	{
            text: "Добавить",
            click: function() {
            		
            		console.log($(".form_desktop")[0].id.replace(/\D+/g,""));
            		let id_desktop = $(".form_desktop")[0].id.replace(/\D+/g,"");
            		console.log($(".tovar_bind").val());
            		let  tovar_id = $(".tovar_bind").val();
            		socket.emit('add_tovar_desktop_order',{id_tovar:tovar_id, id_desktop:id_desktop });
            		
            		$("#sel_add_form"+id_desktop).remove();
            		
            		$("#select_items").val(0);
				    
                dialog.dialog("close");
            }
        },
        {
            text: "Отмена",
            click: function() {
            	//$(".tovar_bind"+).remove();
            	dialog.dialog("close");
                
            }
        }
    ]
        

    });





    var dialogres = $("#result-form").dialog({
        autoOpen: false,
        height: 200,
        width: 270,
        modal: true,
        buttons: [
        	{
            text: "Расчёт",
            click: function() {
            		/*
            		console.log($(".form_desktop_res")[0].id.replace(/\D+/g,""));
            		let id_desktop = $(".form_desktop_res")[0].id.replace(/\D+/g,"");
            		socket.emit('res_desktop_order',{id_desktop:id_desktop });
            		*/
                //dialogres.dialog("close");
            }
        },
        {
            text: "Отмена",
            click: function() {
            	//$(".tovar_bind").remove();
            	
            	dialogres.dialog("close");
                
            }
        }
    ]
        

    });

    socket.on('res_desktop_order_to',(data)=>{
    	console.log(data.row);
    	console.log(data.id_desktop);
    	//console.log($('*').is("#calc_table"+data.id_desktop));
    	if($("*").is("#calc_table"+data.id_desktop) == false){
    	$("#calc_form"+data.id_desktop).append("<table id='calc_table"+data.id_desktop+"'> </table>");
    	$("#calc_table"+data.id_desktop).append("<tr><th>Наименование</th><th>Количество</th><th>Цена</th></tr>");
    	let itogovasum = 0;
    	for (let i = 0; i < data.row.length; i++) {
    		$("#calc_table"+data.id_desktop).append("<tr><td>"+data.row[i].name_tovar+" </td> <td>"+data.row[i].quantity_tovar+" </td> <td>"+data.row[i].finish_price+" </td> </tr>")
    		itogovasum = itogovasum + data.row[i].quantity_tovar * data.row[i].finish_price;
    		if( i >= 2){

    			dialogres.css("height",dialogres.height()+20);
    		}
    	}

    	$("#calc_table"+data.id_desktop).append("<tr><td></td><td>Итого: </td><td>"+itogovasum+"</td></tr>");

    } else {
    	for (let i = 0; i < data.row.length; i++) {
    		if( i >= 2){

    			dialogres.css("height",dialogres.height()+20);
    		}
    	}

    }

    });




    


    $("body").on("click", ".butadd", function() {

    	
        dialog.dialog("open");
        $("#dialog-form form").attr("id","add_form"+parseInt(this.id.replace(/\D+/g,"")));

        //console.log(this);
    });


    $("body").on("click", ".calculation", function() {

    		console.log('asda');
        dialogres.dialog("open");
        $("#result-form form").attr("id","calc_form"+parseInt(this.id.replace(/\D+/g,"")));
        console.log($(".form_desktop_res")[0].id.replace(/\D+/g,""));
            		let id_desktop = $(".form_desktop_res")[0].id.replace(/\D+/g,"");
            		socket.emit('res_desktop_order',{id_desktop:id_desktop });

        //console.log(this);
    });



});