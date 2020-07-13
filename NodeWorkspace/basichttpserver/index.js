var http = require('http');
const { read } = require('fs');
const port = 8000;
const fs = require('fs');


function requestHandler(req, res) {
    
    console.log(req.url);

    res.writeHead(200,{'content-type':'text/html'});

    let filepath = '';

    switch(req.url) {

        case '/' : {
            filepath = './index.html';
            break;
        }

        case '/profile' : {
            filepath = './profile.html';
            break;
        }

        default : {
            filepath = './404.html';
            break;
        }
    }

    fs.readFile(filepath, function(err, data) {
        if(err) {
            console.log('error',err);
            res.end("Error Rendering the requested file");
        }

        return res.end(data);
    });

}


const server = http.createServer(requestHandler);

server.listen(8000, (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log("server is running on port : ",port);
});