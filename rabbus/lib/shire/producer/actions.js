// Constructor
// -----------

function ProducerActions(config, message){
  this.config = config;
  this.message = message;
}

// Action API
// ----------

ProducerActions.prototype.next = function(){
  this.config.emit("next");
};

// Exports
// -------

module.exports = ProducerActions;
