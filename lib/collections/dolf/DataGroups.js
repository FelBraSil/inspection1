import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const DataGroups = new Mongo.Collection('datagroups');

if (Meteor.isServer) {
  DataGroups.allow({
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
}



DataGroupsSchema = new SimpleSchema({
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
  classd: {
      type: String,
      label: 'Clase',
      optional: true,
      autoform:{
          type: "hidden",
      }
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

var DataGroupsSchemaContext = DataGroupsSchema.newContext("datagroupItem");
DataGroupsSchema.validator();

DataGroups.attachSchema(DataGroupsSchema);

if (Meteor.isClient) {
    Meteor.subscribe('datagroups');
}

if (Meteor.isServer) {
    Meteor.methods({
            removeMBGroup: function(id){
                console.log(id);
                DataGroups.remove({_id:id});
            }, });

}
