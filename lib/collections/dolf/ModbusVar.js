import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const ModbusVar = new Mongo.Collection('modbusvar');

ModbusVar.allow({
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


ModbusVarSchema = new SimpleSchema({
  tag: {
      type: String,
      regEx: /^[a-z0-9A-Z_]{3,15}$/,
      label: 'Nombre (en sistema)',
      optional: false,
  },
  name: {
      type: String,
      label: 'Nombre',
      optional: false,
  },
  groupid: {
      type: String,
      label: 'Id Grupo',
      optional: false,
      autoform:{
          type: "hidden",
      }
  },
  classd: {
      type: String,
      label: 'Clase',
      optional: true,
      autoform:{
          type: "hidden",
      }
  },
  modbusdataaddress: {
      type: Number,
      label: 'Modbus Data Address',
      optional: false,
      defaultValue: 0,
  },
  type: {
      type: String,
      label: 'Tipo de Variable',
      optional: true,
      autoform: {
         type: 'select',
         options: function(){return[
                                    {
                                            optgroup: "Holding Register",
                                            options: [
                                                {label: "uint1 [byte 0]", value: "uint1.0.h"},
                                                {label: "uint1 [byte 1]", value: "uint1.1.h"},
                                                {label: "sint1 [byte 0]", value: "sint1.0.h"},
                                                {label: "sint1 [byte 1]", value: "sint1.1.h"},
                                                {label: "uint 2 bytes", value: "uint2.h"},
                                                {label: "sint 2 bytes", value: "sint2.h"},
                                            ]
                                    },{
                                            optgroup: "Input Register",
                                            options: [
                                                {label: "uint1 [byte 0]", value: "uint1.0.i"},
                                                {label: "uint1 [byte 1]", value: "uint1.1.i"},
                                                {label: "sint1 [byte 0]", value: "sint1.0.i"},
                                                {label: "sint1 [byte 1]", value: "sint1.1.i"},
                                                {label: "uint 2 bytes", value: "uint2.i"},
                                                {label: "sint 2 bytes", value: "sint2.i"},
                                            ]
                                    },{
                                            optgroup: "Discretos (Coil/Input)",
                                            options: [
                                                {label: "Coil", value: "coil"},
                                                {label: "input", value: "bitinput"},
                                            ]
                                    },{
                                              optgroup: "String",
                                              options: [
                                                  {label: "String(2 bytes)", value: "string2"},
                                              ]
                                     }
                                  ]
                            }
      }
  },
  meassureunit: {
      type: String,
      label: 'Unidad',
      optional: true,
  },
  defaultval: {
      type: String,
      label: 'Valor por defecto (si es discreto: 1 o 0)',
      optional: true,
      defaultValue: "0",
  },
  alarm: {
    type: Boolean,
    label: "Activar Alarma (ver Maximo y Minimo Aceptable)",
    defaultValue: false
  },
  normalmax: {
      type: Number,
      label: 'Maximo Aceptable (para alarma)',
      optional: true,
      defaultValue: 999999,
  },
  normalmin: {
      type: Number,
      label: 'Minimo Aceptable (para alarma)',
      optional: true,
      defaultValue: 0,
  },
  onFront: {
      type: String,
      label: "Mostrar en Dashboard",
      optional: false,
      autoform: {
         type: 'select',
         options: function(){return[{label:"Mostrar en Dashboard",value:"true"},{label:"Ver solo dentro del Elemento",value:"false"}]}
      },
      defaultValue: "false",
   },

   toLog: {
       type: String,
       label: "Guardar mediciones en log",
       optional: false,
       autoform: {
          type: 'select',
          options: function(){return[{label:"Guardar en log",value:"true"},{label:"No guardar en log",value:"false"}]}
       },
       defaultValue: "false",
    },
  readonly: {
       type: String,
       label: "Solo lectura",
       optional: false,
       autoform: {
          type: 'select',
          options: function(){return[{label:"Solo Lectura",value:"true"},{label:"Lectura y escritura",value:"false"}]}
       },
       defaultValue: "false",
  },
  formulak: {
    type: Number,
    label: "Ecuacion(Constante)",
    defaultValue: 0,
    optional: true
  },
  formulaA: {
     type: Number,
     label: "Ecuacion(pendiente)",
     defaultValue: 1,
     optional: true
  },
  formulaN: {
      type: Number,
      label: "Ecuacion(potencia)",
      defaultValue: 1,
      optional: true
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

var ModbusVarSchemaContext = ModbusVarSchema.newContext("modbusvarItem");
ModbusVarSchema.validator();

ModbusVar.attachSchema(ModbusVarSchema);

if (Meteor.isClient) {
    Meteor.subscribe('modbusvar');
}

if (Meteor.isServer) {
    Meteor.methods({
            removeMBVar: function(id){
                console.log(id);
                ModbusVar.remove({_id:id});
            }, });

}
