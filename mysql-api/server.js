var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var open = require('open') // open -npm
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var connection = mysql.createConnection({ // Mysql Connection
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodeapi',
});
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); // Body parser use JSON data

// get list from table

app.get('/book', function (req, res) {
    var data = {
        "error": 1,
        "Books": ""
    };

    connection.query("SELECT * from books", function (err, rows, fields) {
        
        if (rows.length != 0) {
            data["error"] = 0;
            data["Books"] = rows;
            res.json(data);
        } else {
            data["Books"] = 'No books Found..';
            res.json(data);
        }
    });
});

// get data using specific id

app.get('/book/:bookname', function (req, res) {
    var Bookname = req.params.bookname;       
    var data = {
        "error": 1,
        "Books": ""
    };

    connection.query("SELECT * from books WHERE BookName=? ",[Bookname], function (err, rows, fields) {
        
        if (rows.length != 0) {
            data["error"] = 0;
            data["Books"] = rows;
            res.json(data);
        } else {
            data["Books"] = 'No books Found..';
            res.json(data);
        }
    });
});


// post date ro table
app.post('/book',function(req,res){
    var Bookname = req.body.bookname;
    var Authorname = req.body.authorname;
    var Price = req.body.price;
    var data = {
        "error":1,
        "Books":""
    };
    if(!!Bookname && !!Authorname && !!Price){
        connection.query("INSERT INTO books VALUES('',?,?,?)",[Bookname,Authorname,Price],function(err, rows, fields){
            if(!!err){
                data["Books"] = "Error Adding data";
            }else{
                data["error"] = 0;
                data["Books"] = "Book Added Successfully";
            }
            res.json(data);
        });
    }else{
        data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
        res.json(data);
    }
});


// put (update) exsiting data from table

app.put('/book',function(req,res){
    var Bookname = req.body.bookname;
    var Authorname = req.body.authorname;
    var Price = req.body.price;
    var data = {
        "error":1,
        "Books":""
    };
    if(!!Id && !!Bookname && !!Authorname && !!Price){
        connection.query("UPDATE book SET BookName=?, AuthorName=?, Price=? WHERE BookName=?",[Bookname,Authorname,Price],function(err, rows, fields){
            if(!!err){
                data["Books"] = "Error Updating data";
            }else{
                data["error"] = 0;
                data["Books"] = "Updated Book Successfully";
            }
            res.json(data);
        });
    }else{
        data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
        res.json(data);
    }
});


// delete data from table

app.delete('/book',function(req,res){
    var Bookname = req.body.bookname;
    var Authorname = req.body.authorname;
    var data = {
        "error":1,
        "Books":""
    };
    if(!!Id){
        connection.query("DELETE FROM book WHERE Bookname=? AND Authorname=?",[Id],function(err, rows, fields){
            if(!!err){
                data["Books"] = "Error deleting data";
            }else{
                data["error"] = 0;
                data["Books"] = "Delete Book Successfully";
            }
            res.json(data);
        });
    }else{
        data["Books"] = "Please provide all required data (i.e : id )";
        res.json(data);
    }
});


http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
    open('http://localhost:8080/book', 'firefox');
});

