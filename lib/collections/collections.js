import { Mongo } from 'meteor/mongo';

export const MQTTcollection = new Mongo.Collection('mqttcollection');


MQTTcollection.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});


if (Meteor.isClient) {
  Template.appbody.onCreated(function bodyOnCreated() {
    Meteor.subscribe('mqttcollection');
  });
}

if (Meteor.isServer){
  MQTTcollection.rawCollection().createIndex({ topic: -1 });
  
}
