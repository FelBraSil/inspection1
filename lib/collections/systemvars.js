import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const SystemVars = new Mongo.Collection('systemvars');

SystemVars.allow({
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
    Meteor.subscribe('systemvars');

}

if (Meteor.isServer) {
    Meteor.methods({
            updateSystemVars: function(object){
                try {
                  //console.log(object);
                  var systemitem = object.systemitem;
                  var alarms = object.alarms;
                  var offlineDev = object.offlineDev;
                  /*
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
                  */
                  SystemVars.update({systemitem:systemitem},{$set:{alarms:alarms,offlineDev,offlineDev}});
                } catch (e) {
                   return e;
                }
            },
            updateSystemVarsAmp: function(object){
                try {
                  //console.log(object);
                  var systemitem = object.systemitem;
                  var min = parseInt( object.min);
                  var max = parseInt( object.max);
                  var apply = object.apply;
                  /*
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
                  */
                  SystemVars.update({systemitem:systemitem},{$set:{min:min,max:max,apply:apply}});
                } catch (e) {
                   return e;
                }
            },
    });

}
