// Etsy Command Line example, in Node/JS
// Author: Ghan Patel. Ghanpatel@gmail.com, Ghanpatel.com, github.com/Ghan

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

var InputMethods = {
  input : "",
  library : [],
  
  _buildBookString : function(lib){
    var toDisplay = "";
    toDisplay = '"' + lib[0] + '" by ' + lib[1];
  	toDisplay += (lib[2]) ? " (read)\n" : " (unread)\n";
  	return toDisplay;
  },
  
  _containsObj : function(obj,lib){
        for (var i = 0; i < lib.length; i++) {
            if (lib[i][0] === obj) {
                return true;
            }
        }
        return false;
  },
  
  parse : function(){
    //split up array
    var splitString = InputMethods.input.replace(/^\s\s*/, '').replace(/\s\s*$/, '').substring(0, InputMethods.input.length - 1).split('"');
    //remove garbage from array
    for(var i=0;i<splitString.length;i++){
    	if (splitString[i] === " " || splitString[i] ==="") splitString.splice(i, 1);
    }
    
    switch(splitString[0]){
      case 'show all' : InputMethods.showAll();
        break;
      case 'show all by ' : InputMethods.showAllBy(splitString[1]);
        break;
      case 'show unread' : InputMethods.showUnread();
        break;
      case 'show unread by ' : InputMethods.showUnreadBy(splitString[1]);
        break;
      case 'add ': InputMethods.addit(splitString[1],splitString[2]);
        break;
      case 'read ': InputMethods.read(splitString[1]);
        break;
      case 'quit' : InputMethods.done();
        break;
      default: InputMethods.errorit();
    };
  },
  
  addit : function(book,author){
    var lib = InputMethods.library;
    if(InputMethods._containsObj(book,lib)){
      console.log("already in!");
    } else {
      lib.push([book,author,0]);
      console.log("Added "+book+" by "+author);
    }
  },
  
  read : function(book){
    var lib = InputMethods.library;
    for(var i=0;i<lib.length;i++){
    	if(lib[i][0] === book){
    	  lib[i][2] = 1;
    	  console.log('You\'ve read "'+ book+'"!');
    	}
    }
  },
  
  showAll : function(){
    var lib = InputMethods.library;
    for(var i=0;i<lib.length;i++){
    	console.log(InputMethods._buildBookString(lib[i]));
    }
  },
  
  showAllBy : function(author){
    var lib = InputMethods.library;
    for(var i=0;i<lib.length;i++){
      if(lib[i][1] === author) console.log(InputMethods._buildBookString(lib[i]));
    }
  },
  
  showUnread : function(){
    var lib = InputMethods.library;
    for(var i=0;i<lib.length;i++){
    	if(!lib[i][2]) console.log(InputMethods._buildBookString(lib[i]));
    }
  },
  
  showUnreadBy : function(author){
    var lib = InputMethods.library;
    for(var i=0;i<lib.length;i++){
      if(lib[i][1] === author && !lib[i][2]) console.log(InputMethods._buildBookString(lib[i]));
    }
  },
  
  errorit : function(){
    console.log("Bad input! use 'add' 'read' 'show' or 'quit'");
  },
  
  done : function() {
    console.log('Bye!');
    process.exit();
  }  
}

process.stdin.on('data', function (text) {
  InputMethods.input = text;
  InputMethods.parse();
});