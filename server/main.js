/*import '../lib/collections/collections.js';
*/
import { MQTTcollection } from '../lib/collections/collections.js';
import { SystemVars } from '/lib/collections/systemvars.js';

var serverState="none";

if(Meteor.isProduction){
 // MQTTcollection.mqttConnect("mqtt://172.17.0.1", ["symbiot/#"],{}, {username: "user", password: "pass"});
 MQTTcollection.mqttConnect("mqtt://broker.mqtt.cl", ["#"],{}); 
 MQTTcollection.insert({ topic: "symbiot/__server/__var/mode", message: "production", broadcast: true });
  serverState = "production";
} else {
  MQTTcollection.mqttConnect("mqtt://broker.mqtt.cl", ["#"],{});
  MQTTcollection.insert({ topic: "symbiot/__server/__var/mode", message: "development", broadcast: true });
  serverState = "dev";
}

Meteor.methods({
  'serverState'() {
    return serverState;
  }
});


startMQTTSystemVars();

Meteor.setInterval(function() {
    MQTTcollection.insert({ topic: "symbiot/__server/__var/status", message: "online", broadcast: true });
    if(Meteor.isProduction){
      MQTTcollection.insert({ topic: "symbiot/__server/__var/mode", message: "production", broadcast: true });
    } else {
      MQTTcollection.insert({ topic: "symbiot/__server/__var/mode", message: "development", broadcast: true });
    }
}, 60 * 5000);

SystemVars._ensureIndex({systemitem: 1}, {unique: 1});


function startMQTTSystemVars(){
/*
  var alarms= {
       value: false,
       quantity: 0,
  }

  var offlineDev= {
       value: false,
       quantity: 0,
  }
*/
  MQTTcollection.insert({ topic: "symbiot/__server/__var/status", message: "online", broadcast: true });
//  MQTTcollection.insert({ topic: "symbiot/__server/__var/alarms", message: alarms, broadcast: true });
//  MQTTcollection.insert({ topic: "symbiot/__server/__var/offlinedev", message: offlineDev, broadcast: true });
  systemobject = {
    systemitem: "alarms",
    alarms: {
         value: false,
         quantity: 0,
    },
    offlineDev: {
         value: false,
         quantity: 0,
    }
  };
  try {
    SystemVars.insert(systemobject);
  } catch (e) {

  } finally {

  }

  systemobject = {
   systemitem: "ampAddress",
   min:  1,
   max: 250,
   apply: true,
 };
 try {
   SystemVars.insert(systemobject);
 } catch (e) {

 } finally {

 }

}
 
