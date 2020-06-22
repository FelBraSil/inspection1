import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const AlarmHistory = new Mongo.Collection('alarmhistory');


if (Meteor.isServer){
  AlarmHistory.rawCollection().createIndex({ createdAt: -1 });
}


if (Meteor.isServer) {
    Meteor.methods({
            deleteAlarmHistory: function(){
                try {
                  if( (Roles.userIsInRole(Meteor.userId(),'admin','admin')  || Roles.userIsInRole(Meteor.userId(),'superadmin','admin') ) && Roles.userIsInRole(Meteor.userId(),'enabled','enabled') ) {
                      AlarmHistory.remove({});
                      return "A.H. removed";
                  }
                } catch (e) {
                   return e;
                }
            },
    });

}
