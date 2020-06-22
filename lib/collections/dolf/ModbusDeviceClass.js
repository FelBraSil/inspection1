import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const ModbusDeviceClass = new Mongo.Collection('modbusdeviceclass');

ModbusDeviceClass.allow({
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


ModbusDeviceClassSchema = new SimpleSchema({
 name: {
      type: String,
      label: 'Nombre',
      optional: false,
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

var ModbusDeviceClassSchemaContext = ModbusDeviceClassSchema.newContext("modbusItem");
ModbusDeviceClassSchema.validator();

Meteor.methods({
        toggleMBClassItem: function(id, current){
            console.log(id);
            ModbusDeviceClass.update({_id:id},{
              $set: {
                dontShowThis: !current
              }
            });
        },
        insertlvl3: function(){
          console.log("user id "+this.userId);
          if (Roles.userIsInRole(this.userId, ["admin"],"admin-group")) {
            return true;
          } else return false;
        }
});

ModbusDeviceClass.attachSchema(ModbusDeviceClassSchema);

if (Meteor.isClient) {
    Meteor.subscribe('modbusdevicesclass');
}
