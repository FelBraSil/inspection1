import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const ModbusLog = new Mongo.Collection('modbuslog');

ModbusLog.allow({
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


ModbusLogSchema = new SimpleSchema({ 
  idVar: {
      type: String,
      label: 'Id Var',
      optional: false,
      autoform:{
          type: "hidden",
      }
  },
  valueVar: {
      type: Number,
      label: 'Valor'
  },
  idDevice: {
      type: String,
      label: 'Id Device',
      optional: false,
      autoform:{
          type: "hidden",
      }
  },
  fecha:{
      type: Number,
      label: "Timestamp"
  }
});

ModbusLog.attachSchema(ModbusLogSchema);

if (Meteor.isClient) {
    //Meteor.subscribe('rtphistory');
}
