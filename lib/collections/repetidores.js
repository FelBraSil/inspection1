import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Images } from './images.js';

SimpleSchema.extendOptions(['autoform']);

export const Repetidores = new Mongo.Collection('repetidores');
export const OpticPortDevices = new Mongo.Collection('opticportdevices');

Repetidores.allow({
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

OpticPortDevices.allow({
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





deviceinfoSchema = new SimpleSchema({
    devicetype: {
      type: String,
      label: "Tipo de Dispositivo",
      max: 50,
      autoform:{
          placeholder:"Tipo"
      },
      defaultValue: "Desconocido"
    },
    devicemodel: {
      type: String,
      label: "Modelo",
      max: 50,
      autoform:{
          placeholder:"Modelo"
      },
      defaultValue: "Desconocido"
    },
    deviceserial: {
      type: String,
      label: "Serial",
      max: 50,
      autoform:{
          placeholder:"Serial Num."
      },
      defaultValue: "Desconocido"
    },
    channelnum: {
      type: String,
      label: "Numero de Canal",
      max: 50,
      autoform:{
          placeholder:"Numero Canal (CH)"
      },
      defaultValue: "Desconocido"
    },
    swversion: {
      type: String,
      label: "Version Software",
      max: 50,
      autoform:{
          placeholder:"Version Software"
      },
      defaultValue: "Desconocido"
    },
    slavenum: {
      type: String,
      label: "Numero esclavo",
      max: 50,
      autoform:{
          placeholder:"Numero de esclavo (direccion)"
      },
      defaultValue: "Desconocido"
    },
    set:{
        type: Number,
        label: "Creado en",
        defaultValue: 0,
        autoform:{
            type: "hidden",
        }

    },
});

networkparSchema = new SimpleSchema({
    sitenumber: {
      type: String,
      label: "Numero Sitio",
      max: 50,
      optional: true,
      autoform:{
          placeholder:"0"
      },
      defaultValue: "0000"
    },
    subdevicenum: {
      type: String,
      label: "Numero Subdispositivo",
      max: 50,
      optional: true,
      autoform:{
          placeholder:"0"
      },
      defaultValue: "Desconocido"
    },
    mcipaddress: {
      type: String,
      label: "IP Centro Monitoreo",
      max: 50,
      optional: true,
      autoform:{
          placeholder:"127.0.0.1"
      },
      defaultValue: "127.0.0.1"
    },
    mcipport: {
      type: Number,
      label: "Puerto Centro Monitoreo",
      optional: true,
      autoform:{
          placeholder:"5000"
      },
      defaultValue: 5000
    },
    psprotocol: {
      type: String,
      label: "Protocolo PS",
      max: 50,
      optional: true,
      autoform:{
          placeholder:"protocolo"
      },
      defaultValue: "Desconocido"
    },
    repeaterip: {
      type: String,
      label: "IP Repetidor",
      max: 50,
      optional: true,
      autoform:{
          placeholder:"127.0.0.1"
      },
      defaultValue: "127.0.0.1"
    },
    repeateripport: {
      type: Number,
      label: "Puerto Repetidor",
      optional: true,
      autoform:{
          placeholder:"5000"
      },
      defaultValue: 5000
    },
    repeatermask: {
      type: String,
      label: "Mascara Red Repetidor",
      max: 50,
      optional: true,
      autoform:{
          placeholder:"255.255.255.0"
      },
      defaultValue: "255.255.255.0"
    },
    repeatergw: {
      type: String,
      label: "GateWay Repetidor",
      max: 50,
      optional: true,
      autoform:{
          placeholder:"127.0.0.1"
      },
      defaultValue: "127.0.0.1"
    },
    macaddress: {
      type: String,
      label: "MAC Repetidor",
      max: 50,
      optional: true,
      autoform:{
          placeholder:"FF:FF:FF:FF:FF:FF"
      },
      defaultValue: "FF:FF:FF:FF:FF:FF"
    },
    comstyle: {
      type: String,
      label: "Estilo Comm.",
      max: 50,
      optional: true,
      autoform:{
          placeholder:"estilo comunicacion"
      },
      defaultValue: "Desconocido"
    },
    set:{
        type: Number,
        label: "Creado en",
        defaultValue: 0,
        autoform:{
            type: "hidden",
        }

    },
});



workingparSchema = new SimpleSchema({
    downlinkinpow: {
      type: Number,
      label: "Potencia Entrada DownLink [dBm]",
      optional: true,
      autoform:{
          placeholder:"0"
      },
      defaultValue: 0
    },
    uplinkoutpow: {
      type: Number,
      label: "Potencia Salida UpLink [dBm]",
      optional: true,
      autoform:{
          placeholder:"0"
      },
      defaultValue: 0
    },
});

alarmparSchema = new SimpleSchema({
    supplypower: {
      type: Boolean,
      label: " ",
      defaultValue: false
    },
    masterslavelink: {
      type: Boolean,
      label: " ",
      defaultValue: false
    },
    downlinkover: {
      type: Boolean,
      label: " ",
      defaultValue: false
    },
    downlinklow: {
      type: Boolean,
      label: " ",
      defaultValue: false
    },
    set:{
        type: Number,
        label: "Creado en",
        defaultValue: 0,
        autoform:{
            type: "hidden",
        }

    },
});

limitparSchema = new SimpleSchema({
    dlinputlmin: {
      type: Number,
      label: "Poder Entrada DownLink Mínimo",
      optional: true,
      defaultValue: 0
    },
    dlinputlmax: {
      type: Number,
      label: "Poder Entrada DownLink Máximo",
      optional: true,
      defaultValue: 0
    },
    alarmdelay: {
      type: Number,
      label: "Retardo de Alarma",
      optional: true,
      defaultValue: 0
    },
    set:{
        type: Number,
        label: "Creado en",
        defaultValue: 0,
        autoform:{
            type: "hidden",
        }

    },
});


settingpar = new SimpleSchema({
  rfpowerswitch: {
    type: String,
    label: "Switch de Poder RF",
    optional: true,
    defaultValue: "Desconocido"
  },
  ch1freq: {
    type: Number,
    label: "Frecuencia CH1 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch2freq: {
    type: Number,
    label: "Frecuencia CH2 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch3freq: {
    type: Number,
    label: "Frecuencia CH3 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch4freq: {
    type: Number,
    label: "Frecuencia CH4 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch5freq: {
    type: Number,
    label: "Frecuencia CH5 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch6freq: {
    type: Number,
    label: "Frecuencia CH6 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch7freq: {
    type: Number,
    label: "Frecuencia CH7 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch8freq: {
    type: Number,
    label: "Frecuencia CH8 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch9freq: {
    type: Number,
    label: "Frecuencia CH9 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch10freq: {
    type: Number,
    label: "Frecuencia CH10 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch11freq: {
    type: Number,
    label: "Frecuencia CH11 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch12freq: {
    type: Number,
    label: "Frecuencia CH12 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch13freq: {
    type: Number,
    label: "Frecuencia CH13 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch14freq: {
    type: Number,
    label: "Frecuencia CH14 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch15freq: {
    type: Number,
    label: "Frecuencia CH15 [MHz]",
    optional: true,
    defaultValue: 0
  },
  ch16freq: {
    type: Number,
    label: "Frecuencia CH16 [MHz]",
    optional: true,
    defaultValue: 0
  },
  uplinkatt: {
    type: Number,
    label: "UpLink ATT [dB]",
    optional: true,
    defaultValue: 0
  },
  downlinkatt: {
    type: String,
    label: "DownLink ATT [dB]",
    optional: true,
    defaultValue: "Desconocido"
  },
  channelswitch: {
    type: String,
    label: "Channel Switch",
    optional: true,
    defaultValue: "Desconocido"
  },
  choicemode: {
    type: String,
    label: "Seleccion de Modo de Trabajo",
    optional: true,
    defaultValue: "Desconocido"
  },

    set:{
        type: Number,
        label: "Creado en",
        autoform:{
            type: "hidden",
        },
        defaultValue:0

    },
});


settingsSchema = new SimpleSchema({
  deviceinfo: {
    label: "Informacion de Dispositivo",
    type: deviceinfoSchema,
    defaultValue: {}
  },
  networkpar: {
    label: "Parametros de red",
    type: networkparSchema,
    defaultValue: {}
  },
  workingpar: {
    label: "Parametros de trabajo",
    type: workingparSchema,
    defaultValue: {}
  },
  alarmpar: {
    label: "Parametros de Alarmas",
    type: alarmparSchema,
    defaultValue: {}
  },
  alarmstate: {
    label: "Estados de Alarmas",
    type: alarmparSchema,
    defaultValue: {}
  },
  limitpar: {
    label: "Parametros de Límites",
    type: limitparSchema,
    defaultValue: {}
  },
  settingpar: {
    label: "Parametros de Configuracion",
    type: settingpar,
    defaultValue: {}
  },
  deviceinfo_set: {
    label: "Informacion de Dispositivo",
    type: deviceinfoSchema,
    defaultValue: {}
  },
  networkpar_set: {
    label: "Parametros de red",
    type: networkparSchema,
    defaultValue: {}
  },
  workingpar_set: {
    label: "Parametros de trabajo",
    type: networkparSchema,
    defaultValue: {}
  },
  alarmpar_set: {
    label: "Parametros de Alarmas",
    type: alarmparSchema,
    defaultValue: {}
  },
  limitpar_set: {
    label: "Parametros de Límites",
    type: limitparSchema,
    defaultValue: {}
  },
  settingpar_set: {
    label: "Parametros de Configuracion",
    type: settingpar,
    defaultValue: {}
  },
  set:{
      type: Number,
      label: "set",
      autoform:{
          type: "hidden",
      },
      defaultValue: 0

  },
});

confSchema = new SimpleSchema({
    Settings: {
      type: settingsSchema,
      label: "Configuración Dispositivo",
      optional: true
    },
});

opticportSchema = new SimpleSchema({
    opticportdevice: { label: "Optical Port Devices",
                       type: Array },
    'opticportdevice.$': {
      label: "Device",
      type: confSchema,
      optional: true
    },
});

RepetidoresSchema = new SimpleSchema({

    nombre: {
        type: String,
        label: "Nombre de Sitio",
        max: 50,
        optional: false
    },
    Settings: {
      label: "Configuración",
      type: settingsSchema,
      defaultValue: {}
    },
    details: {
        type: String,
        label: "Detalles",
        max: 2000,
        autoform:{
            type: "textarea",
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

OpticportSchema = new SimpleSchema({
  idEquipo:{
      type: String,
      label: "Equipo",
      autoform:{
          type: "hidden",
      },
  },
  opticPort:{
      type: Number,
      label: "Puerto",
      defaultValue: 1,
      autoform: {
         type: 'select',
         options: function(){
                  return[
                          {label:"Puerto 1",value:1},
                          {label:"Puerto 2",value:2},
                          {label:"Puerto 3",value:3},
                          {label:"Puerto 4",value:4}
                        ]
                  }
      }
  },
  nombre: {
      type: String,
      label: "Nombre",
      max: 50,
      defaultValue: "Equipo Esclavo",
      optional: false
  },
  Settings: {
    type: settingsSchema,
    label: "Configuración Dispositivo",
    optional: true
  },
});

Repetidores.attachSchema(RepetidoresSchema);
OpticPortDevices.attachSchema(OpticportSchema);


var opticHooksObject = {
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
    Meteor.subscribe('repetidores');
    Meteor.subscribe('opticportdevices');
    AutoForm.addHooks(['opticeditform'], opticHooksObject);
}
