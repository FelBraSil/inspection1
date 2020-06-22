import { MQTTcollection } from '/lib/collections/collections.js';
import { SystemVars } from '/lib/collections/systemvars.js';
import { AlarmHistory } from '/lib/collections/alarmsCollection.js';
import {resolveMQTTMessages} from '/lib/functions/mqttFunctions.js';
import {resolveMQTTMessagesSubElement}  from '/lib/functions/mqttFunctions.js';
import { AmpDevices } from '/lib/collections/amp/ampcollection.js';
import { Branches } from '/lib/collections/amp/branchescollection.js';
import { Config } from '/lib/config/config.js';
import "jquery-knob";
import moment from 'moment';
import 'moment/locale/es';
import { Mongo } from 'meteor/mongo';


const localTestCollection = new Mongo.Collection(null);
const localBranchCollection = new Mongo.Collection(null);


const testList = [
      { _id: "1", name:"Amplifier" ,voltage: 23.2, downlink: 0.9 , online: true, branchid: "1", parent: "0" },
      { _id: "2", name:"Amplifier", voltage: 23.1, downlink: 0.7 , online: true, branchid: "1", parent: "1" },
      { _id: "3", name:"Amplifier", voltage: 23.2, downlink: 0.6 , online: true, branchid: "1", parent: "1" },
      { _id: "4", name:"Amplifier", voltage: 24, downlink: 0.7 , online: false, branchid: "1", parent: "0" },
      { _id: "5", name:"Amplifier", voltage: 23.9, downlink: 0.9 , online: true, branchid: "2", parent: "0" },
      { _id: "6", name:"Amplifier", voltage: 24, downlink: 0.5 , online: true, branchid: "0", parent: "0" },
      { _id: "7", name:"Amplifier", voltage: 23.3, downlink: 0.7 , online: true, branchid: "1", parent: "2" },
      { _id: "8", name:"Amplifier", voltage: 23.7, downlink: 0.9 , online: true, branchid: "1", parent: "7" },
];

const branchlist = [
  { _id: "1", name: "branch 1", detail: "branch 1 test" , enable: true},
    { _id: "2", name: "branch 2", detail: "branch 2 test" , enable: true},
      { _id: "3", name: "branch 3", detail: "branch 3 test" , enable: true},
];

testList.forEach( (element) => {
    localTestCollection.insert(element);
});
branchlist.forEach( (element) => {
    localBranchCollection.insert(element);
});

var branchHelpers = {
  getBranch(branchId){
      console.log("branch "+branchId);
      const thisResult = AmpDevices.find({branch:branchId, parent:"0"});
      console.log(thisResult.count());
      return thisResult;
  },
  getChilds(parentId){
    console.log("get childs");
    const thisResult = AmpDevices.find({parent:parentId});
    console.log(thisResult.count());
    return thisResult;
  },
  getChildsNum(parentId){
    const thisResult = AmpDevices.find({parent:parentId}).count();
    return thisResult;
  },
  getBranches(){
    console.log("get branches");
    const thisResult =  Branches.find({dontShowThis:false});
    console.log(thisResult.count());
    return thisResult;
  },
  getLevel(thisLevel){
     var countArr = [];
    if(isNaN(thisLevel)){
    	thisLevel=0;
     }
    for (var i=0; i<thisLevel; i++){
      countArr.push({});
    }
    console.log("level "+thisLevel);
    return countArr;
  },
  addLevel(thisLevel){
    return thisLevel+1;
  },
  logThis(myThis){
    console.log(myThis);
  },
}


Template.branchlist.helpers(branchHelpers);//
Template.branchElement.helpers(branchHelpers);//branchElement
