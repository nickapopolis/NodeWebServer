var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		request.setEncoding("utf8");
		
		//accumulate date from post request
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '"+
			postDataChunk + "'.");
		});
		
		//handle our post request once it is all received
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
		
	}
	//create the server and start listening 
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}
exports.start = start;