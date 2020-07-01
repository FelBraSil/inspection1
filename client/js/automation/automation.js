import { Macros } from '/lib/collections/symbiot/macros.js';
import { Scheduler } from '/lib/collections/symbiot/scheduler.js';
import { Condition } from '/lib/collections/symbiot/conditioned.js';
import { MQTTcollection } from '/lib/collections/collections.js';

var automationHelpers = {
     macrosCollection(){
       return Macros;
     },
     getMacrosCollection(){
       return Macros.find({});
     },
     getMacrosCollectionPinned(){
       return Macros.find({ dashboard: true });
     },
     getIfMacrosCollectionPinned(){
       return (Macros.find({ dashboard: true }).count() > 0 ) ? true : false ;
     },
     getSetTopics(){
       const results = MQTTcollection.find({ topic: { $regex: /\$settable$/ } }).map(function (c) {
         return {_id: c._id, topic: c.topic.replace("$settable","set")};
       });
       //console.log(results);
       return results;
     },
};

var schedulerHelpers = {
  schedulerCollection(){
    return Scheduler;
  },
  getSchedulerCollection(){
    return Scheduler.find({});
  },
}


var conditionHelpers = {
  conditionCollection(){
    return Condition;
  },
  getConditionCollection(){
    return Condition.find({});
  },
}

Template.macros.helpers(automationHelpers);
Template.automenu.helpers(automationHelpers);
Template.displayMqttListTemplate.helpers(automationHelpers);

Template.automenu.helpers(schedulerHelpers);
Template.macrosscheduler.helpers(schedulerHelpers);


Template.automenu.helpers(conditionHelpers);
Template.macrosconditioned.helpers(conditionHelpers);


var automationEvents = {
  'click .macrosbutton.mbutton.on'(){
    const thisElement = this.element._id;
    //PollingDevices.update({_id:this._id},{$set:{ deploy: true, isSetup: false}});
    console.log("on to "+thisElement);
    Meteor.call("macrosOn",thisElement);
  },
  'click .macrosbutton.mbutton.off'(){
    const thisElement = this.element._id;
    //PollingDevices.update({_id:this._id},{$set:{ deploy: true, isSetup: false}});
    console.log("off to "+thisElement);
    Meteor.call("macrosOff",thisElement);
  },
};


var conditionEvents = {
    'click .disableCondition'(){
      Meteor.call("enableCondition", this._id, false );
      console.log(this._id+" is disabled");
    },
    'click .enableCondition'(){
      Meteor.call("enableCondition", this._id, true );
      console.log(this._id+" is enabled");
    } ,
};

var schedulerEvents = {
    'click .disableSchedule'(){
      Meteor.call("enableSchedule", this._id, false );
      console.log(this._id+" is disabled");
    },
    'click .enableSchedule'(){
      Meteor.call("enableSchedule", this._id, true );
      console.log(this._id+" is enabled");
    } ,
};


Template.automenu.events(automationEvents);
Template.displayMqttListTemplate.events(automationEvents);

Template.automenu.events(conditionEvents);
Template.macrosconditioned.events(conditionEvents);

Template.automenu.events(schedulerEvents);
Template.macrosscheduler.events(schedulerEvents);
