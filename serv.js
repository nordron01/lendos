var express = require('express');
const fs = require('fs');
const path = require('path');
var app = express();
var server = require('http').createServer(app);
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
const EventEmitter = require('events');
var jsonParser = bodyParser.json();
const ee = new EventEmitter();
var port = process.env.PORT || 80;
var k = 0;
usersgl = [];
connections = [];
rooms = [];
roomsgl = [];
privateroom = [];
var globalsocket = 'global room';
var globalbattle = new Array();
var roomg = new Array();
var persipton = new Array();
var cardround = [];
var card = 30;






server.listen(port, function() {
    console.log("Start server go port:" + port);
});

var io = require('socket.io')(server, { 'pingInterval': 2000, 'pingTimeout': 6000 });
var mysql = require('mysql');
var connectionMy = mysql.createPool({
    host: 'localhost',
    user: 'RootShop',
    password: 'zq1xw2ce3',
    database: 'tobacco'
});



connectionMy.getConnection(function(err) {
    if (err) {
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000);
    }
});

connectionMy.on('error', function(err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        connectionMy.destroy();
    } else {
        throw err;
    }
});


app.use(express.static(__dirname + '/htdocs'));

/*
app.post("/user", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    //response.json(`${request.body.userName} - ${request.body.userAge}`);

});
*/

var i = 0;


io.on('connection', function(socket) {

    socket.on('TUK TUK', function(data) {
      console.log(data.ids);
      connectionMy.query('select *  from server_setting where id_socket ='+data.ids, function(err, row) {
     
           socket.username = data.name;
        socket.room = row[0].name_room;
        socket.join(socket.room);

    //     console.log(socket.id);
//console.log(socket.room);
    //    console.log(socket.rooms);
//console.log(socket.disconnected);
     //   console.log(socket.username);

        socket.emit('DUK DUK', data);

        });

        

       
    });



    socket.on('addorderdesk', function(data) {

        let desk = {
            pos_left: 0,
            pos_top: 0,
            desktop_name: "Заказ",
            status_order: "Создан"

        };



        connectionMy.query('INSERT INTO order_desktop SET ?', desk, function(err, row) {
            //console.log(row.insertId);

            //console.log(err);
            io.in(globalsocket).emit('eventClient', row.insertId);
        });

        // i++;
        //io.sockets.in(globalsocket).emit('eventClient', row.insertId);


    });


    socket.on('upd_name_desk', function(data) {
        //console.log(data);

        connectionMy.query('UPDATE order_desktop set desktop_name=?  WHERE idorder_desktop=?', [data.name, data.id], function(err, row) {

            io.in(globalsocket).emit('upd_name_desk_all', { name: data.name, id: "name" + data.id });
        })


    });



    socket.on('preload_desktop', function(data) {

        connectionMy.query("select * from order_desktop where status_order = 'Создан'", function(err, row) {

            socket.emit('load_desktop', row);
        });



    });




    socket.on('dragging', function(data) {

        connectionMy.query('UPDATE order_desktop set pos_left=?, pos_top=?  WHERE idorder_desktop=?', [data.x, data.y, data.id], function(err, row) {
            socket.broadcast.to(globalsocket).emit('draggster', { id: "desktop" + data.id, x: data.x, y: data.y });
        });

    });


    socket.on('add_tovar_desktop_order', function(data) {


        let insert = { id_sklad_tovar: data.id_tovar, id_desktop: data.id_desktop, quantity_tovar: 1, sale: 0 };
        connectionMy.query('INSERT INTO order_position set ?', insert, function(err, row) {

            }

        );


    });









    socket.on('add_order_pos', function(data) {

        if (data.val == 3) {

        }
        let = search_tovar = "";

        switch (data.val) {
            case "1":
                { search_tovar = "hookah" }
                break;
            case "2":
                { search_tovar = "cofe" }
                break;
            case "3":
                { search_tovar = "tea" }
                break;
            case "4":
                { search_tovar = "water" }
                break;
        }
        connectionMy.query("select * from sklad  where class_tovar='" + search_tovar + "'", function(err, row) {

            socket.emit('combo_tovar_box_create', { row: row, id: data.id });
        });

    });


    socket.on('res_desktop_order', function(data) {

        connectionMy.query("select * from order_position left join sklad on sklad.idsklad_tovar = order_position.id_sklad_tovar   where order_position.id_desktop =" + data.id_desktop, function(err, row) {

            socket.emit('res_desktop_order_to', { row: row, id_desktop: data.id_desktop });

        });


    });



    socket.on('accountant_load_page', function(data) {


        connectionMy.query("select * from tobacco", function(err, row, fields) {
            io.in(globalsocket).emit('bd_date_load_tobacco', row);
        });

    });

    socket.on('accountant_insert_tobacco', function(data) {

        connectionMy.query('INSERT INTO tobacco SET ?', data, function(err, row) {


            connectionMy.query("select * from tobacco", function(err, row, fields) {
                io.in(globalsocket).emit('bd_date_load_tobacco', row);
            });

        });

    });


    socket.on('accountant_update_tobacco', function(data) {

        connectionMy.query("update tobacco set name=?,taste=?, price=?,sales=?, photo=?, strong =?,description=?, lukas=?,dislukas=?   where idtobacco=? ", [data.name, data.taste, data.price, data.sales, data.photo, data.strong, data.description, data.lukas, data.dislukas, data.idtobacco], function(err, row) {
            connectionMy.query("select * from tobacco", function(err, row, fields) {
                io.in(globalsocket).emit('bd_date_load_tobacco', row);
            });

        });


    });

    socket.on('accountant_delete_tobacco', function(data) {

        connectionMy.query('DELETE FROM tobacco  WHERE idtobacco = "' + data.idtobacco + '"', function(err, row) {
            connectionMy.query("select * from tobacco", function(err, row, fields) {
                io.in(globalsocket).emit('bd_date_load_tobacco', row);
            });
        });

    });



    socket.on('sklad_load_data', function(data) {

        connectionMy.query("select * from sklad", function(err, row, fields) {
            io.in(globalsocket).emit('sklad_load_data_page', row);

        });


    });


    socket.on('sklad_insert_data', function(data) {

        connectionMy.query('INSERT INTO sklad SET ?', data, function(err, row) {

            connectionMy.query("select * from sklad", function(err, row, fields) {
                io.in(globalsocket).emit('sklad_load_data_page', row);
            });
        });


    });


    socket.on('sklad_update_data', function(data) {

        connectionMy.query("update sklad set name_tovar=?,quantity=?, measurement=?, class_tovar=?, description=?, starting_price =?  where idsklad_tovar=? ", [data.name_tovar, data.quantity, data.measurement, data.class_tovar, data.description, data.starting_price, data.idsklad_tovar], function(err, row) {
            connectionMy.query("select * from sklad", function(err, row, fields) {
                io.in(globalsocket).emit('sklad_load_data_page', row);

            });
        });


    });


    socket.on('sklad_delete_data', function(data) {

        connectionMy.query('DELETE FROM sklad  WHERE idsklad_tovar = "' + data.idsklad_tovar + '"', function(err, row) {

            connectionMy.query("select * from sklad", function(err, row, fields) {
                io.in(globalsocket).emit('sklad_load_data_page', row);

            });


        });


    });



    socket.on('order_position_load_data', function(data) {

        connectionMy.query("select * from order_position", function(err, row, fields) {
            io.in(globalsocket).emit('order_position_load_page', row);

        });


    });
    socket.on('order_position_insert_data', function(data) {

        connectionMy.query('INSERT INTO order_position SET ?', data, function(err, row) {

            connectionMy.query("select * from order_position", function(err, row, fields) {
                io.in(globalsocket).emit('order_position_load_page', row);

            });


        });



    });


    socket.on('order_position_update_data', function(data) {

        connectionMy.query("update order_position set id_desktop=?,id_sklad_tovar=?, quantity_tovar=?, sale=?  where idorder_position=? ", [data.id_desktop, data.id_sklad_tovar, data.quantity_tovar, data.sale, data.idorder_position], function(err, row) {

            connectionMy.query("select * from order_position", function(err, row, fields) {
                io.in(globalsocket).emit('order_position_load_page', row);

            });
        });




    });


    socket.on('order_position_delete_data', function(data) {

        connectionMy.query('DELETE FROM order_position  WHERE idorder_position = "' + data.idorder_position + '"', function(err, row) {

            connectionMy.query("select * from order_position", function(err, row, fields) {
                io.in(globalsocket).emit('order_position_load_page', row);

            });

        });


    });






    socket.on('desktop_order_load_page', function(data) {


        connectionMy.query("select * from order_desktop", function(err, row, fields) {
            io.in(globalsocket).emit('bd_desktop_order_load_page', row);
        });

    });

    socket.on('desktop_order_insert_tobacco', function(data) {

        connectionMy.query('INSERT INTO order_desktop SET ?', data, function(err, row) {

            connectionMy.query("select * from order_desktop", function(err, row, fields) {
                io.in(globalsocket).emit('bd_desktop_order_load_page', row);
            });

        });

    });


    socket.on('desktop_order_update_tobacco', function(data) {

        connectionMy.query("update tobacco set name=?,taste=?, price=?,sales=?, photo=?, strong =?,description=?, lukas=?,dislukas=?   where idtobacco=? ", [data.name, data.taste, data.price, data.sales, data.photo, data.strong, data.description, data.lukas, data.dislukas, data.idtobacco], function(err, row) {

            connectionMy.query("select * from order_desktop", function(err, row, fields) {
                io.in(globalsocket).emit('bd_desktop_order_load_page', row);
            });
        });


    });

    socket.on('desktop_order_delete_tobacco', function(data) {

        connectionMy.query('DELETE FROM tobacco  WHERE idtobacco = "' + data.idtobacco + '"', function(err, row) {
            connectionMy.query("select * from order_desktop", function(err, row, fields) {
                io.in(globalsocket).emit('bd_desktop_order_load_page', row);
            });
        });

    });






































    socket.on('add user', function(data) {
        var created_bool = false;
        console.log(data);

        socket.username = data.reglogin;
        if (data.regteg === true) {



            connectionMy.query('SELECT * FROM accounting where login="' + data.reglogin + '"', function(er, row, fields) {
                if (typeof row[0] === 'undefined') {
                    console.log('таких нет');

                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(data.regpswd, salt, function(err, hash) {

                            var user = {
                                login: data.reglogin,
                                passwd: hash,

                            };

                            connectionMy.query('INSERT INTO accounting SET ?', user, function(err, row) {
                                console.log(err);
                                console.log(row.insertId);
                                if (row.insertId) {
                                    var stud = {
                                        firstname: data.regname,
                                        othername: data.othername,
                                        lastname: data.lastname,
                                        id_account: row.insertId


                                    };
                                    if (data.type_hero === "student") {
                                        connectionMy.query('INSERT INTO student SET ?', stud, function(error, rowes) {
                                            console.log(error);
                                            console.log(rowes);

                                        });
                                    }


                                    if (data.type_hero === "teachers") {
                                        connectionMy.query('INSERT INTO teachers SET ?', stud, function(error, rowes) {
                                            console.log(error);
                                            console.log(rowes);
                                            created_bool = true;

                                        });

                                    }

                                }

                            });






                        });
                    });
                } else {
                    var user = {
                        connected: false
                    };
                    socket.emit('login', { user });
                }

            });

            console.log(created_bool);
            if (created_bool === true) {
                socket.room = globalsocket;
                socket.join(globalsocket);

                var user = {
                    connected: true,
                    name_login: data.reglogin,
                };
                socket.emit('login', { user });
                socket.broadcast.to(socket.room).emit('user joined', {
                    username: socket.username
                });
                usersgl.push(socket.username);
            }








        }
        if (data.regteg === false) {
            connectionMy.query("SELECT * FROM teackers.accounting left join teackers.teachers on accounting.id = teachers.id_account left join teackers.student on accounting.id = student.id_account   where accounting.login = '" + data.reglogin + "'", function(error, row, fields) {
                console.log(error);
                console.log(row[0]);
                if (typeof row[0] !== 'undefined') {



                    bcrypt.compare(data.regpswd, row[0].passwd, function(err, res) {
                        if (res == true) {

                            socket.room = globalsocket;
                            socket.join(globalsocket);
                            var user = {
                                connected: true,
                                name_login: data.login,
                            };
                            socket.emit('login', { user });
                            socket.broadcast.to(socket.room).emit('user joined', {
                                username: socket.username
                            });
                            usersgl.push(socket.username);










                        }

                    });
                } else {
                    var user = {
                        connected: false
                    }
                    socket.emit('login', { user });
                }

            });

        }
    });




    socket.on('socket', () => {
        console.log(socket);
    });









    socket.on('disconnect', function(data) {
        console.log(socket.username);
        if (connections.length > 0) {
            usersgl.splice(usersgl.indexOf(socket.username), 1);
            updateUsernames();
            connections.splice(connections.indexOf(socket.id), 1);
        }
    });

    socket.on('create room', function(data) {
        users = {
            room: data,
            nameplayer: socket.username
        };
        roomsgl.push(users);
        socket.leave(socket.room);
        usersgl.splice(usersgl.indexOf(socket.username), 1);
        socket.room = data;
        socket.join(socket.room);
        var gam = 'conn1';
        io.sockets.in(socket.room).emit('draw game', gam);
        privateroom.push({
            room: socket.room,
            user: socket.username,
            id: socket.id
        });
        refreshRoomsgl();
    });

    socket.on('connect_room', function(data) {
        socket.leave(socket.room);
        usersgl.splice(usersgl.indexOf(socket.username), 1);
        updateUsernames();
        socket.room = data;
        socket.join(socket.room);
        privateroom.push({
            room: socket.room,
            user: socket.username,
            id: socket.id

        });
        var gam = 'conn2';
        socket.emit('draw game', gam);
        socket.broadcast.to(socket.room).emit('start1', 'Play');
        socket.emit('start2', socket.username);
        roomsgl.splice(roomsgl.indexOf(socket.room), 1);
        refreshRoomsgl();
        updateRooms();
    });
    socket.on('refresh room', function() {
        refreshRoomsgl();
    });

    function updateUsernames() {
        io.sockets.emit('get users', usersgl);
    }

    function refreshRoomsgl() {
        io.sockets.emit('gl up rooms', roomsgl);
    }


    function updateRooms() {
        socket.emit('up rooms', socket.room);
    }

});