$( document ).ready(function() {

        console.log( "document loaded" );
   var socket = io.connect('http://nordron01.ru:80');
document.getElementById('usernameInput').focus();
var bd_collection_fields = [];
var bd_login_fields = [];
var bd_name_group = [];
var bd_subject =[];
var bd_couple_feilds =[
{Name: "", Id: 0 },
{Name: "1 пара", Id: 1 },
{Name: "2 пара", Id: 2 },
{Name: "3 пара", Id: 3 },
{Name: "4 пара", Id: 4 },
{Name: "5 пара", Id: 5 },
{Name: "6 пара", Id: 6 },
{Name: "Совещание", Id: 7 }

];

var bd_status_feilds =[
{Name: "", Id: 0 },
{Name: "Провести", Id: 1 },
{Name: "Проведена", Id: 2 },
{Name: "Перенесена", Id: 3 },
{Name: "Отмена", Id: 4 },
{Name: "Заболел", Id: 5 },
{Name: "Командировка", Id: 6 }

];


	socket.on('add_up_name_group', function (data) {
		bd_name_group.push(data);
	    socket.emit('refresh');
	    return bd_name_group;

	});
	socket.on('del_up_name_group', function (data) {
		for (var i = 0; i < bd_name_group.length; i++) {
	    if(bd_name_group[i].Id === data.id ){
   		bd_name_group.splice(i,1);
 		 	}
		 }
	    socket.emit('refresh');
	} );
	socket.on('upd_up_name_group', function (data) {
		for (var i = 0; i < bd_name_group.length; i++) {
	    if(bd_name_group[i].Id  === data.id) {
   		bd_name_group[i].Name = data.name_group;
 		 	}
		 }
	    socket.emit('refresh');
	} );
socket.on('add_up_subject_o_study', function (data) {
			bd_collection_fields.push(data);
	    socket.emit('refresh');
	    return bd_collection_fields;
	});
	socket.on('del_up_subject_o_study', function (data) {
	for (var i = 0; i < bd_collection_fields.length; i++) {
	    if(bd_collection_fields[i].Id === data.id ){
   		bd_collection_fields.splice(i,1);
 		 	}
		 }
	    socket.emit('refresh');
	} );
	socket.on('upd_up_subject_o_study', function (data) {
		for (var i = 0; i < bd_collection_fields.length; i++) {
	    if(bd_collection_fields[i].Id  === data.id) {
   		bd_collection_fields[i].Name = data.subject;
 		 	}
		 }
	    socket.emit('refresh');
	} );
socket.on('add_up_teachers', function (data) {
		bd_login_fields.push(data);
	    socket.emit('refresh');
	    errormsg(1);
	    return bd_login_fields;

	});
socket.on('del_up_teachers', function (data) {
		for (var i = 0; i < bd_login_fields.length; i++) {
	    if(bd_login_fields[i].Id === data.id ){
   		bd_login_fields.splice(i,1);
 		 	}
		 }
	    socket.emit('refresh');
	} );
	socket.on('upd_up_teachers', function (data) {
		for (var i = 0; i < bd_login_fields.length; i++) {
	    if(bd_login_fields[i].Id  === data.id) {
   		bd_login_fields[i].Name = data.login;
 		 	}
		 }
	    socket.emit('refresh');
	} );
document.getElementById('resfresh_load').addEventListener("click", function(){
	socket.emit('refresh');

});
socket.on('bd_subject_o_studyselect', function(data){
	var  serms = [ ];
	bd_collection_fields.push({Name: "", Id: 0});					
	for(var i = 0 ;  i < data.length; i++){
		serms = {Name: data[i].subject, Id: data[i].id };
	bd_collection_fields.push(serms);
}
	return bd_collection_fields;
});


socket.on('bd_teachers_login', function(data){
	console.log(data);
var  serms = [ ];
	bd_login_fields.push({Name: "", Id: 0});					
	for(var i = 0 ;  i < data.length; i++){
		var cur_str = data[i].lastname+' '+data[i].firstname.substring(0,1)+'.'+data[i].othername.substring(0,1);
		console.log(cur_str);
		serms = {Name:cur_str , Id: data[i].id_tech };
	bd_login_fields.push(serms);
}
	return bd_login_fields;
});


socket.on('bd_name_group_select', function(data){
var  serms = [ ];
	bd_name_group.push({Name: "", Id: 0});					
	for(var i = 0 ;  i < data.length; i++){
		serms = {Name:data[i].name_group,Id: data[i].id }
			bd_name_group.push(serms);
}
	return bd_name_group;
});
var DateFieldTheachers = function(config) {
                jsGrid.Field.call(this, config);
           		 };
					DateFieldTheachers.prototype = new jsGrid.Field({
                sorter: function(date1, date2) {
                    return new Date(date1) - new Date(date2);
                },

                itemTemplate: function(value) {
                return new Date(value).toLocaleString('ru', {
     		       year: 'numeric',
     			   month: 'long',
       			   day: 'numeric'
     			 });

                },
                filterTemplate: function() {
			        var now = new Date();
			        this._fromPicker = $("<input>").datepicker({ defaultDate: now.setFullYear(now.getFullYear() - 1) });
			        this._toPicker = $("<input>").datepicker({ defaultDate: now.setFullYear(now.getFullYear() + 1) });
			        return $("<div>").append(this._fromPicker).append(this._toPicker);
			    },

                insertTemplate: function(value) {
                    return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
                },

                editTemplate: function(value) {
                    return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
                },

                insertValue: function() {
                    return this._insertPicker.datepicker("getDate").toISOString();
                },

                editValue: function() {
                    return this._editPicker.datepicker("getDate").toISOString();
                },
                filterValue: function() {
        		return	{
		            from: this._fromPicker.datepicker("getDate"),
		            to: this._toPicker.datepicker("getDate")
        			};
            	}	


						});
var DateFieldLoad = function(config)
 {
                jsGrid.Field.call(this, config);
            };
           DateFieldLoad.prototype = new jsGrid.Field({
                sorter: function(date1, date2) {
                    return new Date(date1) - new Date(date2);
                },
               itemTemplate: function(value) {
                 return new Date(value).toLocaleString('ru', {
     		       year: 'numeric',
     			   month: 'long',
       			   day: 'numeric'
     			 });

                },
                filterTemplate: function() {
			        var now = new Date();
			        this._fromPicker = $("<input>").datepicker({ defaultDate: now.setFullYear(now.getFullYear() - 1) });
			        this._toPicker = $("<input>").datepicker({ defaultDate: now.setFullYear(now.getFullYear() + 1) });
			        return $("<div>").append(this._fromPicker).append(this._toPicker);
			    },

                insertTemplate: function(value) {
                    return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
                },

                editTemplate: function(value) {
                    return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
                },

                insertValue: function() {
                    return this._insertPicker.datepicker("getDate").toISOString();
                },

                editValue: function() {
                    return this._editPicker.datepicker("getDate").toISOString();
                },
                filterValue: function() {
        		return	{
		            from: this._fromPicker.datepicker("getDate"),
		            to: this._toPicker.datepicker("getDate")
        			};
           	}	
		});
function mysum(val, name, record)
{
    return parseFloat(val||0) + parseFloat((record[name]||0));
}
socket.on('errorin',function() {
socket.emit('refresh');
});


socket.on('bd_date_load',function (data) {	
	console.log(data);
 		var db_load = {

		        loadData: function(filter) {
		   	            return $.grep(this.clients, function(client) {
		                return (filter.login_id === 0 || client.login_id  === filter.login_id )
		                    && (filter.name_group_id === 0 || client.name_group_id === filter.name_group_id)
		                    && (filter.subject_id === 0 || client.subject_id === filter.subject_id)
		                    && (filter.hour === undefined || client.hour === filter.hour)
		                    && (!filter.dates.from || new Date(client.dates) >= filter.dates.from) 
		                    && (!filter.dates.to || new Date(client.dates) <= filter.dates.to) 
							&& (!filter.status || client.status.indexOf(filter.status) > -1)
							&& (!filter.lecture_hall || client.lecture_hall.indexOf(filter.lecture_hall) > -1)
							&& (!filter.couple || client.couple.indexOf(filter.couple) > -1)
							&& (!filter.comment || client.comment.indexOf(filter.comment) > -1)   
	                    ;
		            });
		        },
	        insertItem: function(insertingClient) {
		            this.clients.push(insertingClient);
		            socket.emit('ins_load_teachers',insertingClient );
		        },
		        updateItem: function(updatingClient) {
		        	socket.emit('upd_load_teachers',updatingClient );
		         },
		        deleteItem: function(deletingClient) {
		          	socket.emit('del_load_teachers',deletingClient );
	            var clientIndex = $.inArray(deletingClient, this.clients);
	            this.clients.splice(clientIndex, 1);
	        }

    	};

		    window.db_load = db_load;
		db_load.clients = data ;
			jsGrid.fields.DateFieldLoad = DateFieldLoad;
		if (db_load.clients[0].dates ===  undefined){
		    $("#jsGrid_Load").jsGrid({
		        width: "100%",
		        height: "640px",
		 				
		                filtering: true,
		                editing: true,
		                sorting: true,
		                paging: true,
		                autoload: true,
		                pageSize: 20,
		                pageButtonCount: 5,
		        controller: db_load,
		   	fields: [

					{ name: "login_id", title: "Преподаватель", type: "select", items: bd_login_fields, valueField: "Id", textField: "Name", width: 150 },
                    { name: "name_group_id", title: "Группа", type: "select", items: bd_name_group, valueField: "Id", textField: "Name", width: 70  },
                    { name: "subject_id", title: "Предмет", type: "select", items: bd_collection_fields, valueField: "Id", textField: "Name", width: 150 },
                    { name: "hour",title: "Часы",  type: "number", width: 50 , align: "center"  },
                    { name: "dates",title: "",  type: "", width: 0, align: "center" },
                    { name: "status", title: "",  type: "", items: bd_status_feilds, valueField: "Name", textField: "Name", width: 0, align: "center"  },     
                  	{ name: "lecture_hall", title: "",  type: "", width: 0, align: "center"  },
                  	{ name: "couple", title: "",  type: "", items: bd_couple_feilds, valueField: "Name", textField: "Name", width: 0, align: "center"  },
                  	{ name: "comment", title: "",  type: "", width: 0 , align: "center" },
                  	{ type: "", modeSwitchButton: false, editButton: true , align: "center",width: 0 } //readOnly: true
                   
                ]

	    });
		    	} else {
	$("#jsGrid_Load").jsGrid({
		        width: "100%",
		        height: "640px",
		                filtering: true,
		                editing: true,
		                sorting: true,
		                paging: true,
		                autoload: true,
		                pageSize: 20,
		                pageButtonCount: 5,
		        controller: db_load,
				fields: [
					{ name: "login_id", title: "Преподаватель", type: "select", items: bd_login_fields, valueField: "Id", textField: "Name", width: 150 },
                    { name: "name_group_id", title: "Группа", type: "select", items: bd_name_group, valueField: "Id", textField: "Name", width: 70 },
                    { name: "subject_id", title: "Предмет", type: "select", items: bd_collection_fields, valueField: "Id", textField: "Name", width: 150 },
                    { name: "hour",title: "Часы",  type: "number", width: 50 , align: "center"  }, //readOnly: true
                    { name: "dates",title: "Дата",  type: "DateFieldLoad", width: 100, align: "center" },
                    { name: "status", title: "Статус",  type: "select", items: bd_status_feilds, valueField: "Name", textField: "Name", width: 70, align: "center"  },     
                  	{ name: "lecture_hall", title: "Аудитория",  type: "text", width: 50, align: "center"  },
                  	{ name: "couple", title: "Пара",  type: "select", items: bd_couple_feilds, valueField: "Name", textField: "Name", width: 70, align: "center"  },
                  	{ name: "comment", title: "Коментарий",  type: "text", width: 150 , align: "center" },
                  	{ type: "control", modeSwitchButton: false, editButton: true , align: "center" }
                ]

	    });

		    	}


		    	//keyup

		    	

 });
            	$(".config-panel input[type=checkbox]").on("click", function() {
                var $cb = $(this);
                $("#jsGrid_Load").jsGrid("option", $cb.attr("id"), $cb.is(":checked"));

                

                $("#jsGrid_Load").data("JSGrid").refresh();
            });







$('.shorting').keyup(function(){
						var j =0;
						$("div#res_search").remove();
						console.log($(this).parent());
						$(this).parent().append('<div id ="res_search" class="droupbox"> </div>');

						var slovbo =  $(this).val().toUpperCase() ;
						var i=0;
								//console.log(this.id);	

						//$('select[id="'+this.id+'"]').children("option").map(function() {
							$('select[id="select_items"]').children("option").map(function() {

							console.log(this);
							var text =  $( this ).text().toUpperCase();
							var val = 	$( this ).val();

							if( $( this ).text().toUpperCase().search(slovbo)  >= 0){
								$('#res_search').append('<li class="src_combo" value="'+val+'" tabindex="'+i+'"  id="li'+i+'"   >'+ $( this ).text()+"</li>");
								i++;
								//console.log($( this ).text());

										$('.src_combo').click(function(){
									console.log($(this).text() +  $( this ).val() + val );
									$('.shorting').val($(this).text());
									$(this).val($( this ).val()).attr("selected", "selected") ;
									$("div#res_search").remove();

								});

							}
							if(slovbo == text ){
								//console.log( $( this ).text());
							$(this).val($( this ).val()).attr("selected", "selected") ;
												
						}

						
						});



							$('#res_search').keydown(function(eventObject){
								console.log('key down');
							if (event.keyCode == 40) { //если нажали Enter, то true

						    $('#li'+j).focus();
						   	j++;
						    console.log( j);
						   	//$('#search_item').val($('#li'+j).text());
						  }
						  if (event.keyCode == 38) { //если нажали Enter, то true
						  	j--;
						    $('#li'+j).focus();
						   	
						    console.log( j);
						   	//$('#search_item').val($('#li'+j).text());
						  }
						   

						});

							$('#search_item').keydown(function(eventObject){
								console.log('key down');
							if (event.keyCode == 40) { //если нажали Enter, то true

						    $('#li'+j).focus();
						   j++;
						    console.log( j);
						   	//$('#search_item').val($('#li'+j).text());
						  }
						  if (event.keyCode == 38) { //если нажали Enter, то true
						  	j--;
						    $('#li'+j).focus();
						   	
						    console.log( j);
						   	//$('#search_item').val($('#li'+j).text());
						  }
						   

						});


          						

						

					});























socket.on('bd_subject_o_study',function (data) {
 		var db_subject = {
	       loadData: function(filter) {
		            return $.grep(this.clients, function(client) {
		                return (!filter.subject || client.subject.indexOf(filter.subject) > -1);
		   });
		        },
		        insertItem: function(insertingClient) {
		            this.clients.push(insertingClient);
		                    socket.emit('ins_subject_o_study',insertingClient );
		        },
		        updateItem: function(updatingClient) {
		        	socket.emit('upd_subject_o_study',updatingClient );
		         },
		        deleteItem: function(deletingClient) {
		        	socket.emit('del_subject_o_study',deletingClient );
		            var clientIndex = $.inArray(deletingClient, this.clients);
		            this.clients.splice(clientIndex, 1);
		        }
   	};
	    window.db_subject = db_subject;
			db_subject.clients = data ;			
		    $("#jsGrid_Subject").jsGrid({
		        width: "100%",
		        height: "640px",
		 		        filtering: true,
		                editing: true,
		                sorting: true,
		                paging: true,
		                autoload: true,
		                pageSize: 20,
		                pageButtonCount: 5,
		        controller: db_subject,
		      	fields: [
					{ name: "subject", title: "Предмет", type: "text", width: 150 },
                    { type: "control", modeSwitchButton: false, editButton: true }
                ]    });
    });
            	$(".config-panel2 input[type=checkbox]").on("click", function() {
                var $cb = $(this);
                $("#jsGrid_Subject").jsGrid("option", $cb.attr("id"), $cb.is(":checked"));
                $("#jsGrid_Subject").data("JSGrid").refresh();
            });
socket.on('bd_date_teachers',function (data) {
	console.log(data);
 		var db_teachers = {
		        loadData: function(filter) {
		            return $.grep(this.clients, function(client) {
		                return (!filter.login || client.login.indexOf(filter.login) > -1)
		                    && (!filter.firstname || client.firstname.indexOf(filter.firstname) > -1)
		                    && (!filter.lastname || client.lastname.indexOf(filter.lastname) > -1)
		                    && (!filter.othername || client.othername.indexOf(filter.othername) > -1)
 							&& (!filter.studstep || client.studstep.indexOf(filter.studstep) > -1)
		                    && (!filter.position || client.position.indexOf(filter.position) > -1)
		                    //&& (!filter.email || client.hour.indexOf(filter.hour) > -1)
							//&& (!filter.tel_fon || client.status.indexOf(filter.status) > -1)
		                    && (!filter.recruited.from || new Date(client.recruited) >= filter.recruited.from) 
		                    && (!filter.recruited.to || new Date(client.recruited) <= filter.recruited.to) 
		                    ;
		                    });
		        },


		        insertItem: function(insertingClient) {
		            this.clients.push(insertingClient);
		            socket.emit('ins_teather',insertingClient );
		        },
	        updateItem: function(updatingClient) {
	        	socket.emit('upd_teather',updatingClient );
		         },

		        deleteItem: function(deletingClient) {
		        	socket.emit('del_teather',deletingClient );
 	            var clientIndex = $.inArray(deletingClient, this.clients);
		            this.clients.splice(clientIndex, 1);
		        }
   	};

		    window.db_teachers = db_teachers;
			db_teachers.clients = data;
			jsGrid.fields.DateFieldTheachers = DateFieldTheachers;
 		    $("#jsGrid_Theachers").jsGrid({
		        width: "100%",
		        height: "640px",
		 			    filtering: true,
		                editing: true,
		                sorting: true,
		                paging: true,
		                autoload: true,
		                pageSize: 20,
		                pageButtonCount: 5,
		        controller: db_teachers,
		      fields: [
					{ name: "lastname", title: "Фамилия", type: "text", width: 150 },
                    { name: "firstname", title: "Имя", type: "text", width: 150 },
                    { name: "othername", title: "Отчество", type: "text", width: 150 },
                    { name: "studstep",title: "Уч.степень",  type: "text", width: 150 },
                    { name: "recruited",title: "Дата регистрации",  type: "DateFieldTheachers", width: 150, align: "center" },
                  	{ name: "position", title: "Статус",  type: "text", width: 150 },
                  //	{ name: "login", title: "Логин",  type: "text", width: 150 },
                 // 	{ name: "email", title: "Email",  type: "text", width: 150 },
                  //	{ name: "tel_fon", title: "Телефон",  type: "text", width: 150 },
                  	{ type: "control", modeSwitchButton: false, editButton: true }
                ]

	    });

		 });
            	$(".config-panel4 input[type=checkbox]").on("click", function() {
                var $cb = $(this);
                $("#jsGrid_Theachers").jsGrid("option", $cb.attr("id"), $cb.is(":checked"));

                

                $("#jsGrid_Theachers").data("JSGrid").refresh();
            });




socket.on('bd_group_info',function (data) {



 		var db_group_info = {

		        loadData: function(filter) {
		            return $.grep(this.clients, function(client) {
		                return (!filter.name_group || client.name_group.indexOf(filter.name_group) > -1)
		                  && (!filter.course || client.course.indexOf(filter.course) > -1)
		                  && (!filter.pulpit || client.pulpit.indexOf(filter.pulpit) > -1)
		                  && (!filter.leader || client.leader.indexOf(filter.leader) > -1)
		                    ;
		                    
		            });
		        },




		        insertItem: function(insertingClient) {
		            this.clients.push(insertingClient);
		         socket.emit('ins_group_info',insertingClient );

		        },

		        updateItem: function(updatingClient) {

		        	console.log(updatingClient);
		        	socket.emit('upd_group_info',updatingClient );
		         },

		        deleteItem: function(deletingClient) {
		          	socket.emit('del_group_info',deletingClient );
		            var clientIndex = $.inArray(deletingClient, this.clients);
		            this.clients.splice(clientIndex, 1);
       }

    	};

		    window.db_group_info = db_group_info;
		db_group_info.clients = data ;			
		    $("#jsGrid_group_info").jsGrid({
		        width: "100%",
		        height: "640px",
		 				
		                filtering: true,
		                editing: true,
		                sorting: true,
		                paging: true,
		                autoload: true,
		                pageSize: 20,
		                pageButtonCount: 5,
		        controller: db_group_info,
				fields: [
		   { name: "name_group", title: "Группа", type: "text", width: 150 },
                   { name: "course", title: "Курс", type: "text", width: 150 },
                   { name: "pulpit", title: "Кафедра", type: "text", width: 150 },
                   { name: "leader", title: "Староста", type: "text", width: 150 },
                   { type: "control", modeSwitchButton: false, editButton: true }
                ]

	    });
 		});


            	$(".config-panel3 input[type=checkbox]").on("click", function() {
                var $cb = $(this);
                $("#jsGrid_group_info").jsGrid("option", $cb.attr("id"), $cb.is(":checked"));
                $("#jsGrid_group_info").data("JSGrid").refresh();
            });
document.getElementById('row_is_column').addEventListener("click", function(){
 var result = {};
           $("#jsGrid_Load").data("JSGrid")._eachField(function(field) {
                if(field.filtering) {
                    this._setItemFieldValue(result, field, field.filterValue());
                }
            });
            console.log(result);
            data = {	
            login_id : result.login_id,
            name_group_id: result.name_group_id,
            status : result.status,
            subject_id : result.subject_id,
            datesot: result.dates.from,
            datesdo: result.dates.to

            };


socket.emit('asd', data);
});
			 var roomis_id = [];
			 var connect1 = false;
			 var connect2 = false;
			 
					$('#reg').click(function (){
						console.log('12321');
				    var reglogin = $('#reglogin').val();
				    var regpswd = $('#regpswd').val();
				    var regpswd1 = $('#regpswd1').val();
				    var regname =   $('#reg_name').val();
				    var othername =   $('#reg_othername').val();
				    var lastname =   $('#reg_lastname').val();
				    var unique_key =  $('#unique_key').val();
				    var type_hero = $('#reg_form_type').val();
				 	if(reglogin == '' ||  regpswd =='' ||  regpswd1 =='' || regname =='' || othername=='' || lastname =='' || unique_key == '' ||  type_hero =='' ) {
				 		errormsg(5);
				 	}else{


				      if(regpswd !== regpswd1){ 
				        errormsg(5);
				 		}else{
				 			/*
					  var adr_pattern=/[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i;
					  var par_pattern=/[0-9a-z]+/i;
					  var prov2=par_pattern.test(reglogin);
					  var prov3=par_pattern.test(regpswd);
					  if (prov3===true && prov2===true) {
				        */
				        var reguser = {

				          reglogin : reglogin,
				          regpswd : regpswd,
				          regname     : regname,
				          othername     : othername,
				          lastname    : lastname,
				          unique_key : unique_key,
				          type_hero : type_hero,
				          regteg: true

				        }
				        //console.log(reguser);
				       socket.emit('add user', reguser);
				        
				  	}

					}
				  });
				
			

				 $('#login').click(function (){
					    var reglogin = $('#usernameInput').val();
					    var regpswd = $('#passnameInput').val();
					    if(reglogin === '' && regpswd === ''  ){
					      alert('Надо ввести Логин и Пароль');
					    }  else {
					    var users = {
					      reglogin :  reglogin,
					      regpswd : regpswd,
					      regteg: false
					    }
					    socket.emit('add user',users);
					   }
					  });

				  	
				  		$('#registration').click(function (){
				  	    $('#login_from').css("display","none");
					    $('#reg_menu_combo').css("display","block");
					    $('#student_form').css("display","block");


					  });


				  	$('#reg_form_type').click(function (){
				  		
				  	});







  		socket.on('login', function (data) {
		 // console.log(data.user.connected);


		    if (data.user.connected === true){
		    		console.log('Login');
			   	$("#tabs").css('display','block');
		    	$("#menus").css('display','block');
		    	$("#loginform").css('display','none');
	     }else{
	     		//console.log('Не логин');
  						console.log('false login');
	     		errormsg(5);

		     }
		      });



			  		$('.popup .close_window, .overlay').click(function (){
					$('.popup, .overlay').css({'opacity': 0, 'visibility': 'hidden'});
					});


			  		$('#loginin').click(function (){
			  		$('#student_form').css('display','none');
			  		$('#login_from').css('display','block');
			  		});
			  		/*
					$('.open_window').click(function (e){

					var  srt = ' <div class="close_window">x</div><p>Добавлено</p>';	
					$('.popup').append(srt);			
					$('.popup').css('display','block');

					$('.popup, .overlay').css({'opacity': 1, 'visibility': 'visible'});
					e.preventDefault();
					$('.popup').delay(2000).fadeOut(function(){
						$('.popup').empty();
					});
				 	



					});

					*/
						$('#strv').click(function(){
							//$('#src0').combobox();
						errormsg(1);	
						});

					function errormsg(cases){
						console.log('cases'+cases);
						var  srt = '';	
					switch(cases){
							case 1:{ srt = '<div class="close_window">x</div><p>Добавлено</p>';}
							break;
							case 2:{ srt = '<div class="close_window">x</div><p>Удалено</p>';}
							break;
							case 3:{ srt = '<div class="close_window">x</div><p>Обновлено</p>';}
							break;
							case 4:{ srt = '<div class="close_window">x</div><p>Добавлено</p>'; }
							break;
							case 5:{ srt = '<div class="close_window">x</div><p>Не верный логин или пароль</p>'; }
							break;

					}	

							
					$('.popup').css('display', 'block');
					$('.popup, .overlay').css({'opacity': 1, 'visibility': 'visible'});
					$('.popup').append(srt);
					$('.popup').delay(2000).fadeOut(function(){
					$('.popup').empty();
					});
					}
/*
					var bd_status_feilds =[
{Name: "", Id: 0 },
{Name: "Провести", Id: 1 },
{Name: "Проведена", Id: 2 },
{Name: "Перенесена", Id: 3 },
{Name: "Отмена", Id: 4 },
{Name: "Заболел", Id: 5 },
{Name: "Командировка", Id: 6 }

];
*/
					// собственно поиск
					
					
						
						$('html').click(function() { 

							$("div#res_search").remove();
						});
							
						
						
						

					


					$( function() {
    $.widget( "custom.combobox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox" )
          .insertAfter( this.element );
 
        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },
 
      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";
 
        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" )
          })
          .tooltip({
            classes: {
              "ui-tooltip": "ui-state-highlight"
            }
          });
 
        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
            ui.item.option.selected = true;
            this._trigger( "select", event, {
              item: ui.item.option
            });
          },
 
          autocompletechange: "_removeIfInvalid"
        });
      },
 
      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;
 
        $( "<a>" )
          .attr( "tabIndex", -1 )
          .attr( "title", "Show All Items" )
          .tooltip()
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "custom-combobox-toggle ui-corner-right" )
          .on( "mousedown", function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .on( "click", function() {
            input.trigger( "focus" );
 
            // Close if already visible
            if ( wasOpen ) {
              return;
            }
 
            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
          });
      },
 
      _source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        response( this.element.children( "option" ).map(function() {
          var text = $( this ).text();
          if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
      },
 
      _removeIfInvalid: function( event, ui ) {
 
        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }
 
        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });
 
        // Found a match, nothing to do
        if ( valid ) {
          return;
        }
 
        // Remove invalid value
        this.input
          .val( "" )
          .attr( "title", value + " didn't match any item" )
          .tooltip( "open" );
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.autocomplete( "instance" ).term = "";
      },
 
      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });
 
    $( "#combobox" ).combobox();
    $( "#toggle" ).on( "click", function() {
      $( "#combobox" ).toggle();
    });
  } );



          


 });
