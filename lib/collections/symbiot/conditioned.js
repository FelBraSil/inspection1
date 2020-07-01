import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Images } from '/lib/collections/images.js';
import { MQTTcollection } from '/lib/collections/collections.js';
import { Macros } from '/lib/collections/symbiot/macros.js';

SimpleSchema.extendOptions(['autoform']);

export const Condition = new Mongo.Collection('condition');

Condition.allow({
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
      label: 'Execute OFF values',
      optional: true,
      defaultValue: false,
  },
});


topicSchema = new SimpleSchema({
  topic: {
      type: String,
      label: 'Topic',
      optional: false,
      autoform: {
        options: function () {
          const results = MQTTcollection.find({ topic: { $regex: /\/value/ } }).map(function (c) {
            return {value: c._id, label: c.topic };
          });
          //console.log(results);
          return results;
        }
      }
  },
  not: {
      type: Boolean,
      label: 'NOT (inverse condition)',
      optional: true,
      defaultValue: false,
  },
  conditionType: {
      type: Number,
      label: 'Condition Type',
      optional: false,
      defaultValue: 0,
      autoform: {
        options:  [
          {label: "Equal", value: 0},
          {label: "Bigger", value: 1},
          {label: "Bigger or equal", value: 2},
          {label: "Lower", value: 3},
          {label: "Lower or equal", value: 4},
          {label: "Between (not inclusive)", value: 5},
          {label: "Between (inclusive)", value: 6},
        ]
      }
  },
  maxValue: {
      type: String,
      label: 'Value (between: Max value)',
      optional: false,
  },
  minValue: {
      type: String,
      label: 'Min Value (only for: between)',
      defaultValue: "--",
      optional: true,
  },
});


gateSchema = new SimpleSchema({
  gateType: {
      type: Number,
      label: 'Gate Type',
      optional: false,
      defaultValue: 0,
      autoform: {
        options:  [
          {label: "AND", value: 0},
          {label: "OR", value: 1},
          {label: "XOR", value: 2},
          {label: "Lower", value: 3},
          {label: "Lower or equal", value: 4},
          {label: "Between (not inclusive)", value: 5},
          {label: "Between (inclusive)", value: 6},
        ]
      }
  },
  not: {
      type: Boolean,
      label: 'NOT (inverse Gate ie:NAND)',
      optional: true,
      defaultValue: false,
  },
  topic: {
    type: Array,
    label: "Topics to analyze",
  },
  'topic.$': {
    type: topicSchema,
    label: "Topic",
    optional: false,
  },
});


ConditionSchema = new SimpleSchema({
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
    timed: {
       type: Boolean,
       label: 'Timed Condition',
       defaultValue: false,
       optional: true,
       regEx: /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/,
    },
    startTime:{
      type: String,
      label: "Start Time",
      defaultValue: "00:00",
      max: 20,
      optional: true,
      regEx: /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/,
    },
    endTime:{
      type: String,
      label: "End Time",
      defaultValue: "01:00",
      max: 20,
      optional: true,
    },
    gate: {
      type: Array,
      label: "List of logic gates",
    },
    'gate.$': {
      type: gateSchema,
      label: "Logic Gate & conditions",
      optional: false,
    },
    macros: {
      type: Array,
      label: "THEN execute Macros",
    },
    'macros.$': {
      type: macrosSubSchema,
      label: "Macro",
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

var ConditionSchemaContext = ConditionSchema.newContext("conditionitem");
ConditionSchema.validator();

Condition.attachSchema(ConditionSchema);


if (Meteor.isClient) {
    Meteor.subscribe('condition');
}

if (Meteor.isServer){
  Meteor.methods({
          enableCondition: function(conditionId, value){
              try {

                const conditionValue = (value) ? true : false;

                try {
                   Condition.update({ _id: conditionId },{$set:{ enabled: conditionValue }});
                   console.log( conditionId + " enable value changed to "+ conditionValue );
                } catch (e) {
                  return e;
                }
              } catch (e) {
                 return e;
              }
          },
  });

}
