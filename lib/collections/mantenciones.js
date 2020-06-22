import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Images } from './images.js';

SimpleSchema.extendOptions(['autoform']);

export const MantencionesDMT = new Mongo.Collection('mantenciones_dmt');

MantencionesDMT.allow({
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


export const MantencionesSEM = new Mongo.Collection('mantenciones_sem');

MantencionesSEM.allow({
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

export const MantencionesAN = new Mongo.Collection('mantenciones_an');

MantencionesAN.allow({
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

dmtSchema = new SimpleSchema({
  item1: {
      type: String,
      label: 'Correcta Ubicación y Orientación del Equipo',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item2: {
      type: String,
      label: 'Acceso y Visibilidad Obstruídos',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item3: {
      type: String,
      label: 'Correcto estado sellos de seguridad y cumplimiento reas clasificadas',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item4: {
      type: String,
      label: 'Equipo esta correctamente identificado en campo',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item5: {
      type: String,
      label: 'Verificar correspondencia de color con T° de setteo ',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item6: {
      type: String,
      label: 'Realizar limpieza de sensor',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item7: {
      type: String,
      label: 'Suportación y fijaciones',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item8: {
      type: String,
      label: 'Limpieza e inspección visual del detector',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
});

semSchema = new SimpleSchema({
  item1: {
      type: String,
      label: 'Calibración de equipo',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item2: {
      type: String,
      label: 'Engrase de tornillería exterior ',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item3: {
      type: String,
      label: 'Sellado con vaselina o silicona ',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item4: {
      type: String,
      label: 'Verificación alarma de falla',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item5: {
      type: String,
      label: 'Verificación de de pre alarma ',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item6: {
      type: String,
      label: 'Verificación de alarma',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item7: {
      type: String,
      label: 'Entrega de equipo y comprobación de habilitación',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
});

anSchema = new SimpleSchema({
  item1: {
      type: String,
      label: 'Comprobación tensión de alimentación del equipo',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
  item2: {
      type: String,
      label: 'Pruebas Funcionales',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"SI",value:"SI"},{label:"NO",value:"NO"},{label:"N/A",value:"N/A"}]}
      }
  },
});

patSchema = new SimpleSchema({
  item1: {
      type: String,
      label: 'Comprobación tensión de alimentación del equipo',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"Porcentaje",value:"Porcentaje"},{label:"Db.",value:"Db."}]}
      }
  },
  item2: {
      type: String,
      label: 'Valor',
      optional: true
  },
});

icssSchema = new SimpleSchema({
  item1: {
      type: String,
      label: 'Lectura',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"Primera",value:"Primera Lectura"},{label:"Segunda",value:"Segunda Lectura"}]}
      }
  },
  item2: {
      type: String,
      label: 'Valor',
      optional: true
  },
});

campoSchema = new SimpleSchema({
  item1: {
      type: String,
      label: 'Lectura',
      optional: true,
      autoform:{
        type: 'select-radio-inline',
        options: function(){return[{label:"Primera",value:"Primera Lectura"},{label:"Segunda",value:"Segunda Lectura"}]}
      }
  },
  item2: {
      type: String,
      label: 'Valor',
      optional: true
  },
});

MantencionesDMTSchema = new SimpleSchema({
    idEquipo:{
        type: String,
        label: "Equipo",
        autoform:{
            type: "hidden",
        }
    },
    inicio: {
        type: Date,
        label: "Inicio",
        max: 200,
        defaultValue: new Date(),
        autoform:{
          type: 'datetime-local'
        }
    },
    mantform: {
      label: "Mantencion C/2 Días - Mensual - Trimestral",
      type: dmtSchema,
      optional: true
    },
    pat: {
      label: "Patrón",
      type: patSchema,
      optional: true
    },
    icss: {
      label: "ICSS",
      type: icssSchema,
      optional: true
    },
    campo: {
      label: "Campo",
      type: campoSchema,
      optional: true
    },
    details: {
        type: String,
        label: "Observaciones",
        optional: true,
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



MantencionesSEMSchema = new SimpleSchema({
    idEquipo:{
        type: String,
        label: "Equipo",
        autoform:{
            type: "hidden",
        }
    },
    inicio: {
        type: Date,
        label: "Inicio",
        max: 200,
        defaultValue: new Date(),
        autoform:{
          type: 'datetime-local'
        }
    },
    mantform: {
      label: "Mantencion Semestral",
      type: semSchema,
      optional: true
    },
    pat: {
      label: "Patrón",
      type: patSchema,
      optional: true
    },
    icss: {
      label: "ICSS",
      type: icssSchema,
      optional: true
    },
    campo: {
      label: "Campo",
      type: campoSchema,
      optional: true
    },
    details: {
        type: String,
        label: "Observaciones",
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

MantencionesANSchema = new SimpleSchema({
    idEquipo:{
        type: String,
        label: "Equipo",
        autoform:{
            type: "hidden",
        }
    },
    inicio: {
        type: Date,
        label: "Inicio",
        max: 200,
        defaultValue: new Date(),
        autoform:{
          type: 'datetime-local'
        }
    },
    mantform: {
      label: "Mantencion Anual",
      type: anSchema,
      optional: true
    },
    pat: {
      label: "Patrón",
      type: patSchema,
      optional: true
    },
    icss: {
      label: "ICSS",
      type: icssSchema,
      optional: true
    },
    campo: {
      label: "Campo",
      type: campoSchema,
      optional: true
    },
    details: {
        type: String,
        label: "Observaciones",
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

MantencionesDMT.attachSchema(MantencionesDMTSchema);
MantencionesSEM.attachSchema(MantencionesSEMSchema);
MantencionesAN.attachSchema(MantencionesANSchema);

var hooksObject = {
  before: {
    insert: function(doc){
      var postId = Router.current().params.current_id;
      console.log(postId);
      doc.idEquipo = postId;
      return doc;
    }
  },
}

if (Meteor.isClient) {
    Meteor.subscribe('mantenciones_dmt');
    Meteor.subscribe('mantenciones_sem');
    Meteor.subscribe('mantenciones_an');
    AutoForm.addHooks(['insertMantForm'], hooksObject);
}
