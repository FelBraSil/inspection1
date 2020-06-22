import { Branches } from '/lib/collections/amp/branchescollection.js';
import { MQTTcollection } from '/lib/collections/collections.js';
import { Config } from '/lib/config/config.js';
import {resolveMQTTMessages} from '/lib/functions/mqttFunctions.js';
import {resolveMQTTMessagesSubElement} from '/lib/functions/mqttFunctions.js';
import download from 'downloadjs';

Template.branchconfig.onCreated(function () {
    this.subscribe('branches');
});

const branchhelpers = {
  branchCollection() {
      return Branches;
  },
  branchElements() {
      return Branches.find();
  },
  branchList(){
    let thisOption = Branches.find().map(function (c) {
      return {label: c.name, value: c._id};
    });
    thisOption.unshift({label:"No Branch", value:"0"});
    return thisOption;
  },
  getTreeElements(elementId){
    try {
      var localcollection = MQTTcollection.find({"topic" : {$regex : ".*"+elementId+".*"}}, { sort: { topic: 1 } });
      var currentsystem= Config.currentsystem;
      var resource= Config.resource;
      let mqttObjects = resolveMQTTMessages(localcollection,currentsystem,resource,null);
      console.log("mapped object");
      console.log(mqttObjects);
      //return PollingDevices.find({mapnum:"1"});
      return mqttObjects;
    } catch (e) {
      console.log(e);
      console.log("mapped object failed "+elementId);
      return null;
    }
  },
}


Template.branchElement.helpers(branchhelpers);
Template.ampitem.helpers(branchhelpers);
Template.branchconfig.helpers(branchhelpers);
Template.ampForm.helpers(branchhelpers);

Template.branchconfig.events({


});
