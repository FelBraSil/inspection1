import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

import { MQTTcollection } from '/lib/collections/collections.js';

export const ModbusDevices = new Mongo.Collection('modbusdevices');

ModbusDevices.allow({
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


ModbusDevicesSchema = new SimpleSchema({
  devicetag: {
      type: String,
      regEx: /^[a-z0-9A-Z_]{3,15}$/,
      label: 'Nombre (en sistema)',
      optional: false,
  },
  devicename: {
      type: String,
      label: 'Nombre',
      optional: false,
  },
  classd: {
      type: String,
      label: 'Clase',
      regEx: SimpleSchema.RegEx.Id,
      optional: false,
  },
  mbaddress: {
      type: Number,
      label: 'Modbus Address',
      min: 0,
      max: 255,
      defaultValue: 1,
      optional: false,
  },
  ip: {
      type: String,
      regEx: SimpleSchema.RegEx.IPv4,
      label: 'IP',
      optional: true,
  },
  port: {
      type: Number,
      label: 'Puerto',
      min: 1,
      max: 65534,
      defaultValue: 2001,
      optional: false,
  },
  details: {
      type: String,
      label: 'Detalles',
      optional: true,
      autoform: {
         type: 'textarea'
      }
  },
  author: {
    type: String,
    label: "Generado por",
    autoValue: function(){
        return this.userId;
    },
    autoform:{
        type: "hidden",
    }
  },
  createdAt:{
      type: Date,
      label: "Creado en",
      autoValue: function(){
        return new Date();
      },
      autoform:{
          type: "hidden",
      }

  },
  deploy: {
      type: Boolean,
      optional: true,
      label: "Borrar",
      autoform:{
          type: "hidden",
      },
      defaultValue: false,
  },
  dontShowThis: {
      type: Boolean,
      optional: true,
      label: "Borrar",
      autoform:{
          type: "hidden",
      },
      defaultValue: false,
  }
} , { tracker: Tracker });

var ModbusDevicesSchemaContext = ModbusDevicesSchema.newContext("modbusItem");
ModbusDevicesSchema.validator();

ModbusDevices.attachSchema(ModbusDevicesSchema);

if (Meteor.isClient) {
    Meteor.subscribe('modbusdevices');
}


if (Meteor.isServer) {
    Meteor.methods({
            removeTopicsMB: function(id){
                console.log(id);
                MQTTcollection.remove({"topic" : {$regex : ".*"+id+".*"}});
                ModbusDevices.update({_id:id},{$set:{dontShowThis:true}});
            },
            removeDevice: function(id){
                console.log(id);
                MQTTcollection.remove({"topic" : {$regex : ".*"+id+".*"}});
                ModbusDevices.remove({_id:id});
            },
    });

}
