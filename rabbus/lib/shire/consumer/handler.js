var Actions = require("./actions");

// Constructor
// -----------

function Handler(config, queue){
  this.handle = this.handle.bind(this);
  this.config = config;
  this.queue = queue;
}

// API
// ---

Handler.prototype.handle = function(message){
  var config = this.config;
  var actions = this.actions;

  function processMiddlewareFunction(queue, message){
    var fn = queue.next;
    if (!fn){ 
      config.removeAllListeners();
      config.emit("complete");
      return; 
    }

    var body = message.body;
    var properties = message.properties;
    config.on("next", function(){
      processMiddlewareFunction(queue, message);
    });

    var actions = new Actions(config, message);
    fn.call(null, body, properties, actions);
  }

  processMiddlewareFunction(this.queue, message);
};

// Exports
// -------

module.exports = Handler;
