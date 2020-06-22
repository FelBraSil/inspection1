import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const MBPollingDevices = new Mongo.Collection('MBPollingDevices');



MBPollingDevices.allow({
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


MBPollingDevicesSchema = new SimpleSchema({
  devicename: {
      type: String,
      label: 'Nombre Dispositivo',
      optional: false,
  },
  ip: {
      type: String,
      regEx: SimpleSchema.RegEx.IPv4,
      label: 'IP',
      optional: false,
  },
  port: {
      type: Number,
      label: 'Puerto',
      min: 1,
      max: 65534,
      defaultValue: 5000,
      optional: false,
  },
  classd:{
    type: String,
    label: 'Clase',
    optional: false
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

var MBPollingDevicesSchemaContext = MBPollingDevicesSchema.newContext("pollingItem");
MBPollingDevicesSchema.validator();

MBPollingDevices.attachSchema(MBPollingDevicesSchema);

if (Meteor.isClient) {
    Meteor.subscribe('mbpollingdevices');
    Meteor.subscribe('modbusdevicesclass');
}
