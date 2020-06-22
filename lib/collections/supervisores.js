import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Images } from './images.js';

SimpleSchema.extendOptions(['autoform']);

export const Supervisores = new Mongo.Collection('supervisores');

Supervisores.allow({
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

SupervisoresSchema = new SimpleSchema({

    nombre: {
        type: String,
        label: "Nombre",
        max: 50,
        optional: false
    },
    nombre2: {
        type: String,
        label: "Segundo Nombre",
        max: 50,
        optional: false,
        autoform:{
            placeholder:"opcional"
        }
    },
    apellidop: {
        type: String,
        label: "Apellido Paterno",
        max: 50,
        optional: false
    },
    apellidom: {
        type: String,
        label: "Apellido Materno",
        max: 50,
        optional: true,
        autoform:{
            placeholder:"opcional"
        }
    },
    idn: {
      label: "Rut",
      max: 15,
      type: String,
      optional: false
    },
    email: {
      label: "E-Mail",
      type: String,
      optional: false
    },
    phone: {
      label: "Número Contacto",
      type: String,
      optional: false
    },
    details: {
        type: String,
        label: "Detalles",
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

Supervisores.attachSchema(SupervisoresSchema);


if (Meteor.isClient) {
    Meteor.subscribe('supervisores');
}
