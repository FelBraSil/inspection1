import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Images } from './images.js';

SimpleSchema.extendOptions(['autoform']);

export const Team = new Mongo.Collection('Team');

Team.allow({
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

TagSchema1= new SimpleSchema({
  Tagt: {
      type: String,
      label: "Tag",
      max: 200
  },
  nSerie: {
      type: String,
      label: "N° Serie",
      max: 200
  },
});

DetallesEquipo= new SimpleSchema({
  name: {
      type: String,
      label: 'Nombre',
      optional: true,
      max: 100
  },
  marca: {
      type: String,
      label: 'Marca',
      optional: true,
      max: 100
  },
  modelo: {
      type: String,
      label: 'Modelo',
      optional: true,
      max: 100
  },
  tipoequipo: {
      type: String,
      label: 'Tipo de Equipo',
      optional: false,
      autoform:{
        type: 'select-radio-inline',
        options: function(){
          return[
            {label:"Gas",value:"Gas"},
            {label:"Calor",value:"Calor"},
            {label:"Fuego",value:"Fuego"},
            {label:"Ruido",value:"Ruido"},
            {label:"Humo",value:"Humo"},
            {label:"Llama",value:"Llama"},
            {label:"Alarma",value:"Alarma"},
          ]
        }
      }
  },
  rangodet: {
      type: String,
      label: 'Rango Detección',
      optional: true,
      max: 100
  },
  layout: {
      type: String,
      label: 'Layout',
      optional: true,
      max: 100
  },
});

TeamSchema = new SimpleSchema({
    cabecera: {
      label: "Detalles Equipo",
      type: DetallesEquipo,
      optional: true,
    },
    Tagtx: {
        label: "Tag del Transmisor",
        type: TagSchema1,
        optional: true,
    },
    Tagrx: {
        label: "Tag del Receptor",
        type: TagSchema1,
        optional: true,
    },
    tipoMantencion: {
      type: Array,
      optional: true,
      autoform: {
         type: 'select-checkbox-inline',
         options: function(){
           return [
           {label:"C. 2 días",value:"d"},
           {label:"Mensual",value:"m"},
           {label:"Trimestral",value:"t"},
           {label:"Semestral",value:"s"},
           {label:"Anual",value:"a"}
         ]
       }
      }
    },
    'tipoMantencion.$': {
      type: String
   },
    details: {
        type: String,
        label: "Detalles",
        max: 200
    },
    picture: {
        type: String,
        label: "Foto",
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

Team.attachSchema(TeamSchema);

if (Meteor.isClient) {
    Meteor.subscribe('myteams');
}
