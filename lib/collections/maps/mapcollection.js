import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Images } from '/lib/collections/images.js';

SimpleSchema.extendOptions(['autoform']);

export const MapCollection = new Mongo.Collection('mapcollection');

MapCollection.allow({
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

MapCollectionSchema = new SimpleSchema({

    nombre: {
        type: String,
        label: "Name",
        max: 50,
        optional: false
    },
    details: {
        type: String,
        label: "Details",
        max: 2000,
        autoform:{
            type: "textarea",
        }
    },
    picture: {
        type: String,
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
});

MapCollection.attachSchema(MapCollectionSchema);


if (Meteor.isClient) {
    Meteor.subscribe('mapcollection');
}

if (Meteor.isServer) {
    Meteor.methods({
            removemap: function(id){
                console.log(id);
                MapCollection.remove({_id:id});
            },
    });

}
