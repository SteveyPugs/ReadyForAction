var Hapi = require('hapi');
var server = Hapi.createServer('0.0.0.0', 7332);
var addNumbers = function(){
	var number1 = parseInt(this.params.num1)
	var number2 = parseInt(this.params.num2)
	var total = number1 + number2
	this.reply("I am adding <b>" + number1 + "</b> and <b>" + number2 + "</b> and the sum is <b>" + total + "</b>!");
}

var squareNumber = function(){
	var number = parseInt(this.params.number)
	var total = Math.sqrt(number)
	this.reply("I am squaring <b>" + number + "</b> and the result is <b>" + total + "</b>!");
}


var check = function() {
	return {
	        firstname: Hapi.types.String().required().min(1),
	        lastname: Hapi.types.String().required().min(1)
	}
}

var makeAName = function(){
	if (this.method === 'post') {
		var fName = this.payload.firstname
		var lName = this.payload.lastname
		this.reply("Hello World, " + fName + " " + lName + "!");
    }

    if (this.method === 'get') {
		var fName = this.query.firstname
		var lName = this.query.lastname
		this.reply("Hello World, " + fName + " " + lName + "!");
    }
  
}

server.route([
    { method: 'GET', path: '/add/{num1}/{num2}', handler: addNumbers },
    { method: 'GET', path: '/square/{number}', handler: squareNumber },
    { method: '*', path: '/hello', config: { handler: makeAName , validate: {payload: check() }}}
]);

// Start the server
server.start();