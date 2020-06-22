import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const RTPHistory = new Mongo.Collection('rtphistory');

RTPHistory.allow({
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


RTPHistorySchema = new SimpleSchema({
  topicId: {
      type: String,
      label: 'Id Topico',
      optional: false,
  },
  value: {
      type: Number,
      label: 'Valor'
  },
  unit: {
      type: String,
      label: 'Unidad',
      optional: true
  },
  createdAt:{
      type: Number,
      label: "Timestamp"
  }
});

RTPHistory.attachSchema(RTPHistorySchema);

if (Meteor.isClient) {
    //Meteor.subscribe('rtphistory');
}
