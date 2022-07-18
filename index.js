const Board = require('firmata');

Board.requestPort(function(err, port) {

  if(err) {
    console.log('Sorry! An error ocurred:', error);
    return;
  }

  // Open the connection to the board
  var board = new Board(port.path);

  // When the board is ready, print a message ready
  board.on("ready", function() {
    
    // set start state of your variables
    var led12State = true;
    var sensorA0 = 0;
    var sensorA1 = 0;

    // set if you want as a output or input or analog
    board.pinMode(12, board.MODES.OUTPUT);
    board.pinMode(0, board.MODES.ANALOG);
    board.pinMode(1, board.MODES.ANALOG);
    
    // blink the led
    setInterval(function() {
    // -----here you can start write your code------

      // read the value of the pin A0
      board.analogRead(0, function(value) {
        sensorA0 = value;
      });

      // read the value of the pin A1
      board.analogRead(1, function(value) {
        sensorA1 = value;
      });
      

      if(sensorA0 < 500) {
        board.digitalWrite(12, board.HIGH);
        led12State = true;
      }
      else {
        board.digitalWrite(12, board.LOW);
        led12State = false;
      }
      
      console.log('LED 12', led12State);
      console.log('Sensor A0:'+ sensorA0);
      console.log('Sensor A1', sensorA1);
  




    // -----here you can end your code------
    }, 1000);

  });

})
