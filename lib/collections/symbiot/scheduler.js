import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Images } from '/lib/collections/images.js';
import { MQTTcollection } from '/lib/collections/collections.js';
import { Macros } from '/lib/collections/symbiot/macros.js';

SimpleSchema.extendOptions(['autoform']);

export const Scheduler = new Mongo.Collection('sheduler');

Scheduler.allow({
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




macrosSubSchema = new SimpleSchema({
  macros: {
      type: String,
      label: 'Macro',
      optional: false,
      autoform: {
        options: function () {
          const results = Macros.find().map(function (c) {
            return {value: c._id, label: c.name };
          });
          return results;
        }
      }
  },
  not: {
      type: Boolean,
      label: 'Inverse ON/OFF values',
      optional: true,
      defaultValue: false,
  },
});


SchedulerSchema = new SimpleSchema({
    name:{
        type: String,
        label: "Name",
        max: 20,
    },
    enabled: {
        type: Boolean,
        label: 'Enable Condition',
        defaultValue: false,
        autoform:{
            type: "hidden",
        },
    },
    execution: {
        type: Boolean,
        label: 'Execute Start Only',
        optional: true,
        defaultValue: false,
    },
    startTime: {
      type: String,
      label: "Start time (ON)",
      defaultValue: "00:00",
      regEx: /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/,
    },
    endTime: {
      type: String,
      label: "End time (OFF)",
      defaultValue: "01:00",
      regEx: /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/,
    },
    macros: {
      type: Array
    },
    'macros.$': {
      label: "Macros to execute",
      type: macrosSubSchema,
      optional: false,
    },
    details: {
        type: String,
        label: "Descripcion",
        max: 2000,
        autoform:{
            type: "textarea",
        }
    },
/*    picture: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                // uploadTemplate: 'uploadField', // <- Optional
                // previewTemplate: 'uploadPreview', // <- Optional
                insertConfig: { // <- Optional, .insert() method options, see: https://github.com/VeliovGroup/Meteor-Files/wiki/Insert-(Upload)
                    meta: {},
                    isBase64: false,
                    transport: 'ddp',
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    allowWebWorkers: true
                }
            }
        }
    },*/
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
    },
  }, { tracker: Tracker });

var SchedulerSchemaContext = SchedulerSchema.newContext("scheduleritem");
SchedulerSchema.validator();

Scheduler.attachSchema(SchedulerSchema);


if (Meteor.isClient) {
    Meteor.subscribe('scheduler');
}

if (Meteor.isServer){
  Meteor.methods({
          enableSchedule: function(scheduleId, value){
              try {

                const scheduleValue = (value) ? true : false;

                try {
                   Scheduler.update({ _id: scheduleId },{$set:{ enabled: scheduleValue }});
                   console.log( scheduleId + " enable value changed to "+ scheduleValue );
                } catch (e) {
                  return e;
                }
              } catch (e) {
                 return e;
              }
          },
  });

}
