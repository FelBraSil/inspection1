import {Team} from '../../lib/collections/team.js';
import { Images } from '../../lib/collections/images.js';
import { Repetidores } from '../../lib/collections/repetidores.js';
import { OpticPortDevices } from '../../lib/collections/repetidores.js';
import download from 'downloadjs';

Template.elementForm.onCreated(function () {
    Meteor.subscribe('repetidores');
    Meteor.subscribe('opticportdevices');
});
 



Template.repeaterstatics.helpers({
    formCollection() {
        return Repetidores;
    },
});

Template.repeaterstatics.events({
    'click #downloadMasterConf'(){
      console.log(this.config);
      let newConfig = this.config;
      delete newConfig.NetworkParam;
      delete newConfig.RealTimeParams;
      const jsonObject = JSON.stringify(newConfig);
      const setConfig = JSON.parse(jsonObject);
      //const groups = ["","","",""];
       let defaultconf = {
          confname: this.meta.content.elements.__name,
          DeviceInfo: {
            deviceType: (!newConfig.DeviceInfo.deviceType==="__null") ? newConfig.DeviceInfo.deviceType : 3,
          },
          Alarms: {
            suplyPowerFailAlarmSet: (!newConfig.Alarms.suplyPowerFailAlarmSet==="__null") ? newConfig.Alarms.suplyPowerFailAlarmSet : false,
            masterSlaveLinkAlarmSet: (!newConfig.Alarms.masterSlaveLinkAlarmSet==="__null") ? newConfig.Alarms.masterSlaveLinkAlarmSet : false,
            downlinkOverInputAlarmSet: (!newConfig.Alarms.downlinkOverInputAlarmSet==="__null") ? newConfig.Alarms.downlinkOverInputAlarmSet : false,
            downlinkLowInputAlarmSet: (!newConfig.Alarms.downlinkLowInputAlarmSet==="__null") ? newConfig.Alarms.downlinkLowInputAlarmSet : false
          },
          Thresholds: {
            downlinkInputMinThreshold: (!newConfig.Thresholds.downlinkInputMinThreshold==="__null") ? newConfig.Thresholds.downlinkInputMinThreshold : 0,
            downlinkInputMaxThreshold: (!newConfig.Thresholds.downlinkInputMaxThreshold==="__null") ? newConfig.Thresholds.downlinkInputMaxThreshold : 0,
            alarmDelay: (!newConfig.Thresholds.alarmDelay==="__null") ? newConfig.Thresholds.alarmDelay : 20
          },
          Frequency: {
            rfPowerSwitch: (!newConfig.Frequency.rfPowerSwitch==="__null") ? newConfig.Frequency.rfPowerSwitch : false,
            ch01frequency: (!newConfig.Frequency.ch01frequency==="__null") ? newConfig.Frequency.ch01frequency : 0,
            ch02frequency: (!newConfig.Frequency.ch02frequency==="__null") ? newConfig.Frequency.ch02frequency : 0,
            ch04frequency: (!newConfig.Frequency.ch04frequency==="__null") ? newConfig.Frequency.ch04frequency : 0,
            ch03frequency: (!newConfig.Frequency.ch03frequency==="__null") ? newConfig.Frequency.ch03frequency : 0,
            ch05frequency: (!newConfig.Frequency.ch05frequency==="__null") ? newConfig.Frequency.ch05frequency : 0,
            ch06frequency: (!newConfig.Frequency.ch06frequency==="__null") ? newConfig.Frequency.ch06frequency : 0,
            ch07frequency: (!newConfig.Frequency.ch07frequency==="__null") ? newConfig.Frequency.ch07frequency : 0,
            ch08frequency: (!newConfig.Frequency.ch08frequency==="__null") ? newConfig.Frequency.ch08frequency : 0,
            ch09frequency: (!newConfig.Frequency.ch09frequency==="__null") ? newConfig.Frequency.ch09frequency : 0,
            ch10frequency: (!newConfig.Frequency.ch10frequency==="__null") ? newConfig.Frequency.ch10frequency : 0,
            ch11frequency: (!newConfig.Frequency.ch11frequency==="__null") ? newConfig.Frequency.ch11frequency : 0,
            ch12frequency: (!newConfig.Frequency.ch12frequency==="__null") ? newConfig.Frequency.ch12frequency : 0,
            ch13frequency: (!newConfig.Frequency.ch13frequency==="__null") ? newConfig.Frequency.ch13frequency : 0,
            ch14frequency: (!newConfig.Frequency.ch14frequency==="__null") ? newConfig.Frequency.ch14frequency : 0,
            ch15frequency: (!newConfig.Frequency.ch15frequency==="__null") ? newConfig.Frequency.ch15frequency : 0,
            ch16frequency: (!newConfig.Frequency.ch16frequency==="__null") ? newConfig.Frequency.ch16frequency : 0,
            uplinkATT: (!newConfig.Frequency.uplinkATT==="__null") ? newConfig.Frequency.uplinkATT : 0,
            downlinkATT: (!newConfig.Frequency.downlinkATT==="__null") ? newConfig.Frequency.downlinkATT : 0,
            channelSwitchArray: [],
            channelSwitch: (!newConfig.Frequency.channelSwitch==="__null") ? newConfig.Frequency.channelSwitch : 0,
            choiceOfWorkingMode: (!newConfig.Frequency.choiceOfWorkingMode==="__null") ? newConfig.Frequency.choiceOfWorkingMode : 2
          },
          author: "wmCRwDmnD2FdgSFeD",
          createdAt: "2019-12-17T11:48:10.253Z"
        };
       const jsonObject2 = JSON.stringify(defaultconf);
       download(jsonObject2, `${defaultconf.confname}.sdc`, "text/plain");
    },
});


Template.opticportform.helpers({
    formCollection() {
        return OpticPortDevices;
    },
});

Template.opticportbox.helpers({
    formCollection(portnum) {
        return OpticPortDevices.find({idEquipo:this.current_id},{opticPort:portnum});;
    },
});

Template.repeaterconfigs.helpers({
    formCollection() {
        return Repetidores;
    },
    inprocess(thisvalue) {
        if(thisvalue>0) return true;
        else return false;
    },
});

Template.confsubmitbutton.helpers({
    inprocess(thisvalue) {
        if(thisvalue>0) return true;
        else return false;
    },
});


Template.subelement.helpers({
  displayelement(){
      var myelement = Repetidores.findOne({_id:this.current_id});
      return myelement;
  },
  formCollection() {
      return Repetidores;
  },
});

Template.formelement.helpers({
  displayelement(){
      var myelement = Repetidores.findOne({_id:this.current_id});
      return myelement;
  },
  formCollection(portnum) {
      return OpticPortDevices.find({idEquipo:this.current_id},{opticPort:portnum});;
  },
  editenable(){
      try {
        var thisedit = this.edit;
        return myelement;
      } catch (e) {
        return false;
      }
  },
  infodisp(){
      const counting = Repetidores.findOne({_id:this.current_id});
      const counter = counting.Settings.deviceinfo;
      return counter;
  },
  opticport1q(){
      try {
        const counting = Repetidores.findOne({_id:this.current_id});
        const counter = counting.opticport1.opticportdevice.length;
        return counter;
      }
      catch(err) {
        return 0;
      }

  },
  opticport2q(){
    try {
      const counting = Repetidores.findOne({_id:this.current_id});
      const counter = counting.opticport2.opticportdevice.length;
      return counter;
    }
    catch(err) {
      return 0;
    }

  },
  opticport3q(){
    try {
      const counting = Repetidores.findOne({_id:this.current_id});
      const counter = counting.opticport3.opticportdevice.length;
      return counter;
    }
    catch(err) {
      return 0;
    }

  },
  opticport4q(){
    try {
      const counting = Repetidores.findOne({_id:this.current_id});
      const counter = counting.opticport4.opticportdevice.length;
      return counter;
    }
    catch(err) {
      return 0;
    }

  },
  opticportsq(){
      var counting;
      var counter1 = 0;
      var counter2 = 0;
      var counter3 = 0;
      var counter4 = 0;

      try {
        counting =  Repetidores.findOne({_id:this.current_id});
        try {
          counter1 = counting.opticport1.opticportdevice.length;
        }
        catch(err) {
          //do nothing
        }
        try {
          counter2 = counting.opticport2.opticportdevice.length;
        }
        catch(err) {
          //do nothing
        }
        try {
          counter3 = counting.opticport3.opticportdevice.length;
        }
        catch(err) {
          //do nothing
        }
        try {
          counter4 = counting.opticport4.opticportdevice.length;
        }
        catch(err) {
          //do nothing
        }
      } catch(err) {
        //do nothing
      }


      const counter = counter1 + counter2  + counter3  + counter4 ;
      return counter;
  },
  imageFile(pictureId){
      //const fileRef = Images.collection.findOne(pictureId);
      //return Images.link(fileRef, 'thumbnail','/');
      return null;
  },
  fullImageFile(pictureId){
      //var fileRef = Images.collection.findOne(pictureId);
      //return Images.link(fileRef, 'original','/');
      return null;
  },

});

Template.displayElement.helpers({
    formCollection() {
        return Repetidores;
    },
    team(){
        var localcoll = Repetidores.find({});
        //localcoll= {uno:{_id:1},dos:{_id:2},tres:{_id:3}};
        console.log("localcoll:");
        console.log(localcoll);
        return localcoll;
    },
    alerts(thisId){
        var thisRepeater = Repetidores.findOne({_id:thisId});
        //console.log(thisRepeater);
    },
    imageFile(pictureId){
        const fileRef = Images.collection.findOne(pictureId);
        return Images.link(fileRef, 'thumbnail','/');
    },
    fullImageFile(pictureId){
        var fileRef = Images.collection.findOne(pictureId);
        return Images.link(fileRef, 'original','/');
    },
});

Template.opticportbox.helpers({
    displaythis(opticportbox){
        console.log(opticportbox);
    },
});



Template.displayElement.events({
    'click #deleteTeamMember'(){
      var r = confirm("Delete?");
      if (r == true) {
        //Images.remove(this.picture);
        //Team.remove(this._id);
        Team.update({_id:this._id},{$set:{dontShowThis:true}});
        alert("Deleted");
      }
    },
    'click #editTeamMember'(){
        console.log("insert edit action here, programmer!");
    }
});

Template.displayElementNE.helpers({
    formCollection() {
        return Repetidores;
    },
    team(){
        return Repetidores.find({});
    },
    imageFile(pictureId){
        const fileRef = Images.collection.findOne(pictureId);
        return Images.link(fileRef, 'thumbnail','/');
    },
    fullImageFile(pictureId){
        var fileRef = Images.collection.findOne(pictureId);
        return Images.link(fileRef, 'original','/');
    },
});

Template.displayElementNE.events({
    'click #deleteTeamMember'(){
      var r = confirm("Delete?");
      if (r == true) {
        //Images.remove(this.picture);
        //Team.remove(this._id);
        Team.update({_id:this._id},{$set:{dontShowThis:true}});
        alert("Deleted");
      }
    },
    'click #editTeamMember'(){
        console.log("insert edit action here, programmer!");
    }
});


Template.mantenimiento_c.helpers({
  /*mantCollection() {
      return MantencionesDMT;
  },*/
});

Template.elementForm.helpers({
    formCollection() {
        return Repetidores;
    },
    team(){
        return Repetidores.find({});
    },
    imageFile(pictureId){
        console.log("imagefile has been called from elementform helpers");
        var fileRef = Images.collection.findOne(pictureId);
        return Images.link(fileRef, 'thumbnail','/');
    },
});

Template.appbody.onRendered(function(){

})
