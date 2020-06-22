import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

export const DRSConfs = new Mongo.Collection('drsconfigs');

DRSConfs.allow({
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


const communicationStyle = [
  {label:"Local RS232",value:0},
  {label:"Remote SMS",value:1},
  {label:"GPRS",value:2},
  {label:"Ethernet",value:3},
];

const alarmDelay = [
  {label:"Delay 180 s",value:180},
  {label:"Delay 60 s",value:60},
  {label:"Delay 20 s",value:20},
];

const deviceType = [
               {label:"Band Selective",value:1},
               {label:"Channel Selective",value:2},
               {label:"F.O. Wired Coupling Local Unit",value:3},
               {label:"F.O. Wireless Coupling Local Unit",value:4},
               {label:"F.O. Broadband remote Unit",value:5},
               {label:"F.O. Freq. Select. remote Unit",value:6},
];

const psProtocol = [
  {label:"IP+UDP",value:1},
  {label:"IP+TCP",value:2},
];

const choiceOfWorkingMode = [
  {label:"Wideband",value:2},
  {label:"Channel",value:3},
];

const channels = [];

for(let i=0; i < 241; i++) {
			let freq1 = 417 + (i* 0.0125);
			let freq2 = 427 + (i* 0.0125);
      let label = `CH ${i} : ${freq1} - ${freq2} [Mhz]`;
      channels.push({label:label, value:i});
}

const channelsSwitch = [];

for(let i=0; i < 16; i++) {
			let thisValue= Math.pow(2, i);
      let name = `CH ${i+1} `;
      channelsSwitch.push({label:name, value:thisValue});
}


deviceinfoSchema = new SimpleSchema({
    deviceType: {
      type: Number,
      label: "Device Type",
      defaultValue: 3,
      autoform:{
        type: 'select',
        options: function(){
          return deviceType;
        }
      }
    },
});



alarmparSchema = new SimpleSchema({
    suplyPowerFailAlarmSet: {
      type: Boolean,
      label: "Supply Power Fail Alarm",
      defaultValue: false
    },
    masterSlaveLinkAlarmSet: {
      type: Boolean,
      label: "Master Slave Link Fail Alarm",
      defaultValue: false
    },
    downlinkOverInputAlarmSet: {
      type: Boolean,
      label: "Downlink Over Input Fail Alarm",
      defaultValue: false
    },
    downlinkLowInputAlarmSet: {
      type: Boolean,
      label: "Downlink Low Input Fail Alarm",
      defaultValue: false
    },
});

limitparSchema = new SimpleSchema({
    downlinkInputMinThreshold: {
      type: Number,
      label: "Supply Power DownLink Min.",
      defaultValue: 0
    },
    downlinkInputMaxThreshold: {
      type: Number,
      label: "Supply Power DownLink Max",
      defaultValue: 0
    },
    alarmDelay: {
      type: Number,
      label: "Alarm Delay",
      defaultValue: 20,
      autoform:{
        type: 'select',
        options: function(){
          return alarmDelay;
        }
      }
    },
});


settingpar = new SimpleSchema({
  rfPowerSwitch: {
    type: Boolean,
    label: "RF Power Switch",
    defaultValue: false,
  },
  ch01frequency: {
    type: Number,
    label: "Freq. CH1 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch02frequency: {
    type: Number,
    label: "Freq. CH2 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch03frequency: {
    type: Number,
    label: "Freq. CH3 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch04frequency: {
    type: Number,
    label: "Freq. CH4 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch05frequency: {
    type: Number,
    label: "Freq. CH5 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch06frequency: {
    type: Number,
    label: "Freq. CH6 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch07frequency: {
    type: Number,
    label: "Freq. CH7 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch08frequency: {
    type: Number,
    label: "Freq. CH8 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch09frequency: {
    type: Number,
    label: "Freq. CH9 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch10frequency: {
    type: Number,
    label: "Freq. CH10 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch11frequency: {
    type: Number,
    label: "Freq. CH11 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch12frequency: {
    type: Number,
    label: "Freq. CH12 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch13frequency: {
    type: Number,
    label: "Freq. CH13 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch14frequency: {
    type: Number,
    label: "Freq. CH14 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch15frequency: {
    type: Number,
    label: "Freq. CH15 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  ch16frequency: {
    type: Number,
    label: "Freq. CH16 [MHz]",
    defaultValue: 0,
    autoform:{
      type: 'select',
      options: function(){
        return channels;
      }
    }
  },
  uplinkATT: {
    type: Number,
    label: "UpLink ATT [dB]",
    defaultValue: 0
  },
  downlinkATT: {
    type: Number,
    label: "DownLink ATT [dB]",
    defaultValue: "0"
  },
  channelSwitchArray: {
    type: Array,
    label: "Channel Switch",
    optional:true,
    autoform: {
       multiple:true,
       type:'select-checkbox-inline',
       options: function(){
         return channelsSwitch;
       }
    }
  },
  'channelSwitchArray.$': {
    type:Number
  },
  channelSwitch: {
    type: Number,
    label: "channelSum",
    defaultValue: "0",
    autoform:{
        type: "hidden",
    },
  },
  choiceOfWorkingMode: {
    type: Number,
    label: "Working Mode",
    defaultValue: 2,
    autoform:{
      type: 'select',
      options: function(){
        return choiceOfWorkingMode;
      }
    }
  },
});



DRSConfsSchema = new SimpleSchema({
    confname: {
      type: String,
      label: "Config. Name",
      autoform:{
          placeholder:"Configuration name"
      },
    },
    DeviceInfo: {
      label: "General Config",
      type: deviceinfoSchema,
      defaultValue: {}
    },
    Alarms: {
      label: "Alarm Parameters",
      type: alarmparSchema,
      defaultValue: {}
    },
    Thresholds: {
      label: "Thresholds",
      type: limitparSchema,
      defaultValue: {}
    },
    Frequency: {
      label: "Frequencies Conf.",
      type: settingpar,
      defaultValue: {}
    },
    details: {
        type: String,
        label: "Details",
        max: 2000,
        optional:true,
        autoform:{
            type: "textarea",
        }
    },
    author: {
      type: String,
      label: "Generated by",
      autoValue: function(){
          return this.userId;
      },
      autoform:{
          type: "hidden",
      }
    },
    createdAt:{
        type: Date,
        label: "Created at",
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

var DRSConfsSchemaContext = DRSConfsSchema.newContext("drsconfsItem");
DRSConfsSchema.validator();


DRSConfs.attachSchema(DRSConfsSchema);


var hookChannelBits = {
  before: {
    insert: function(doc){
      try {
        const channelBits = doc.Frequency.channelSwitchArray;
        let total = 0;
        channelBits.forEach( item =>{
          total += item;
        });
        doc.Frequency.channelSwitch = total;
      } catch (e) {

      } finally {
        return doc;
      }
    },
    update: function(doc){
      try {
        const channelBits = doc.$set["Frequency.channelSwitchArray"];
        let total = 0;
        channelBits.forEach( item =>{
          total += item;
          console.log(item);
        });
        doc.$set["Frequency.channelSwitch"]= total;
      } catch (e) {

      } finally {
        return doc;
      }
    }
  },
}

if (Meteor.isClient) {

  Template.deviceconfig.onCreated(function () {
      Meteor.subscribe('drsconfs');
      AutoForm.addHooks(null, hookChannelBits);
  });
}


if (Meteor.isServer) {

    DRSConfs._ensureIndex({confname: 1}, {unique: 1});

    Meteor.methods({
            insertConfig: function(data){
                try {
                  data["author"]=Meteor.userId();
                  DRSConfs.insert(data);
                } catch (e) {
                   return e;
                }
            },
    });

}
