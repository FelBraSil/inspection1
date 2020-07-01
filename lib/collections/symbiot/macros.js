import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Images } from '/lib/collections/images.js';
import { MQTTcollection } from '/lib/collections/collections.js';

SimpleSchema.extendOptions(['autoform']);

export const Macros = new Mongo.Collection('macros');

Macros.allow({
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



topicSchema = new SimpleSchema({
  topic: {
      type: String,
      label: 'Topic',
      optional: false,
      autoform: {
        options: function () {
          const results = MQTTcollection.find({ topic: { $regex: /\$settable$/ } }).map(function (c) {
            return {value: c._id, label: c.topic.replace("$settable","set")};
          });
          //console.log(results);
          return results;
        }
      }
  },
  startValue: {
      type: String,
      label: 'ON Value',
      optional: false,
  },
  endValue: {
      type: String,
      label: 'OFF Value',
      optional: false,
  },
});


MacrosShema = new SimpleSchema({
    name:{
        type: String,
        label: "Name",
        max: 20,
    },
    dashboard: {
        type: Boolean,
        label: 'Show on Dashboard',
        optional: true,
    },
    topics: {
      type: Array
    },
    'topics.$': {
      label: "Topics",
      type: topicSchema,
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
    }
});

Macros.attachSchema(MacrosShema);


if (Meteor.isClient) {
    Meteor.subscribe('macros');
}

if (Meteor.isServer){
  Meteor.methods({
          macrosOn: function(macrosId){
              try {

                const macrosItem = Macros.findOne({ _id: macrosId });
                try {
                  macrosItem.topics.forEach( (item) => {

                      let topicId = item.topic;
                      let sendValue = item.startValue;
                      let topicObject = MQTTcollection.findOne({ _id: topicId });
                      let topic = topicObject.topic.replace("$settable","set");
                      MQTTcollection.insert({ topic: topic, message: sendValue, broadcast: true });


                  });

                } catch (e) {
                  return e;
                }
              } catch (e) {
                 return e;
              }
          },
          macrosOff: function(macrosId){
              try {

                const macrosItem = Macros.findOne({ _id: macrosId });
                try {
                  macrosItem.topics.forEach( (item) => {

                      let topicId = item.topic;
                      let sendValue = item.endValue;
                      let topicObject = MQTTcollection.findOne({ _id: topicId });
                      let topic = topicObject.topic.replace("$settable","set");
                      MQTTcollection.insert({ topic: topic, message: sendValue, broadcast: true });

                  });

                } catch (e) {
                  return e;
                }
              } catch (e) {
                 return e;
              }
          },
  });

}
