/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var status = "Close";
var ws;

var main = new UI.Card({
  title: 'OpenSesame',
  icon: 'images/menu_icon.png',
  subtitle: 'Open/Close Door',
  body: 'Choose an action.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Open',
        subtitle: 'Open the door'
      }, {
        title: 'Close',
        subtitle: 'Close the door'
      }]
    }]
  });
  menu.on('select', function(e) {
    
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    var card = new UI.Card({
      title:'Door Action',
      subtitle: e.item.title + ' operation in progress ...'
    });
    card.show();
    
    ws = new WebSocket('ws://10.0.0.120:1337');
    
    ws.onopen = function () {
       card.body( 'You are connected to Open Sesame System Server.');
        if(e.itemIndex===0){
          ws.send('22');
          card.subtitle( "Door Opened");
          status = "Open";
        }else{
          ws.send('2');
          card.subtitle( "Door Closed");
          status = "Close";
        }
    };
    ws.onerror = function (error) {
      card.body( 'Sorry, but there\'s some problem with your connection or the server is down.') ;  
    };
    
    
    
    
    
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Door status is ' + status,
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('Options');
  card.subtitle('Two availible');
  card.body('Select for the status. Up for the menue');
  card.show();
});