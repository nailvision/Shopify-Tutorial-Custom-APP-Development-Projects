var http = require('http');
var fs = require('fs');

const PORT=3000; 

fs.readFile('./MyOrderPrivateAppUI.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html", "Access-Control-Allow-Origin":"*"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});