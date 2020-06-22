import { MQTTcollection } from '/lib/collections/collections.js';
import { SystemVars } from '/lib/collections/systemvars.js';
import { AlarmHistory } from '/lib/collections/alarmsCollection.js';
import {resolveMQTTMessages} from '/lib/functions/mqttFunctions.js';
import {resolveMQTTMessagesSubElement}  from '/lib/functions/mqttFunctions.js';
import { Config } from '/lib/config/config.js';
import "jquery-knob";
import moment from 'moment';
import 'moment/locale/es';




var mqttFormHelpers = {
  check_if_stat(value){
     if(value=="true") return true;
     else return false;
  },
  echoThis(variableToEcho){
    console.log("echothis");
    console.log(variableToEcho);
  },
  firstIndex(thisparam){
    try {
      if (typeof thisparam !== 'undefined'){
        if(thisparam==0){
          return true;
        }
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
    return false;
  },
  getParam(thisparam){
     try {
       if (typeof thisparam !== 'undefined'){
         return thisparam;
       } else {
         return "Not Set";
       }
     } catch (e) {
       return "Not Set";
     }
  },
  getParamText(thisparam, fallbacktext){
     try {
       if (typeof thisparam !== 'undefined'){
         return thisparam;
       } else {
         return fallbacktext;
       }
     } catch (e) {
       return fallbacktext;
     }
  },
  paramExists(thisparam){
     try {
       if (typeof thisparam !== 'undefined'){
         return true;
       } else {
         return false;
       }
     } catch (e) {
       return false;
     }
  },
  setCurrentText(){
     try {
            if(this.stat.__current.toString().toLowerCase()=="__first_set" || this.stat.__current.toString().toLowerCase()=="__null"){
              if(this.stat.__class.toString().toLowerCase()=="number"){
                this.stat.__current=0;
                if (typeof this.stat.__set !== 'undefined'){this.stat.__set=this.stat.__current;}
              } else {
                this.stat.__current="On Query";
                if (typeof this.stat.__set !== 'undefined'){this.stat.__set=this.stat.__current;}
              }
            }
            else{
              if (typeof this.stat.__set !== 'undefined'){this.stat.__set=this.stat.__current;}
            }
     } catch (e) {
       return false;
     }
  },
  setExists(){
     try {
       if (typeof this.stat.__set !== 'undefined'){
        // console.log("not undefined "+this.stat.__set);
         if(this.stat.__set.toString().toLowerCase()=="__first_set" || this.stat.__set.toString().toLowerCase()=="__null"){
            if(this.stat.__current.toString().toLowerCase()=="__first_set" || this.stat.__current.toString().toLowerCase()=="__null"){
              if(this.stat.__class.toString().toLowerCase()=="number"){
                this.stat.__current=0;
                this.stat.__set=this.stat.__current;
              } else {
                this.stat.__current="On Query";
                this.stat.__set=this.stat.__current;
              }
            }
            else{
              this.stat.__set=this.stat.__current;
            }
            return true;
         } else {
           return true;
         }
       } else {
         return false;
       }
     } catch (e) {
       return false;
     }
  },
  getParamIf(thisparam, orThisParam){
     try {
       if (typeof thisparam !== 'undefined'){
         return thisparam;
       } else {
         if (typeof orThisParam !== 'undefined'){
           return orThisParam;
         } else {
           return "Not Set";
         }
       }
     } catch (e) {
       return "Not Set";
     }
  },
  evalParam(thisparam, toThisParam){
     try {
       if (typeof thisparam !== 'undefined'){
         if(thisparam.toString().toLowerCase()=="__first_set"){
           return true;
         } else if(thisparam.toString().toLowerCase()==toThisParam.toString().toLowerCase()){
           return true;
         }
         else{
           return false;
         }
       } else {
         return false;
       }
     } catch (e) {
       return false;
     }
  },
  stringToObject(thisparam){
    return thisparam;
  },
  evalNum(thisparam, toThisParam){
     try {
       if (typeof thisparam !== 'undefined'){
         if(thisparam==toThisParam){
           //console.log("match");
           return true;
         }
         else{
           return false;
         }
       } else {
         return false;
       }
     } catch (e) {
       return false;
     }
  },
  evalMulti(thisparam, index, thisvalue){
     var mask = Math.pow(2,index);
     //console.log("masking: " +mask.toString(2)+ " - " + parseInt(thisparam).toString(2)+ " - "+ parseInt(thisvalue).toString(2));
     var maskSolve = ((mask & parseInt(thisparam)) & parseInt(thisvalue));
     if (maskSolve>0) return true;
     else return false;
  },
  evalSet(thisSet, thisCurrent ){
     try {
       if (typeof thisparam !== 'undefined'){
         if(thisSet.toString().toLowerCase()=="__first_set" || thisSet.toString().toLowerCase()=="null"){
           return thisCurrent;
         } else {
           return thisSet;
         }
       } else {
         return thisCurrent;
       }
     } catch (e) {
       return thisCurrent;
     }
  },
  evalBool(thisparam){
     try {
       if (typeof thisparam !== 'undefined'){
           return thisparam;
       } else {
         return false;
       }
     } catch (e) {
       return false;
     }
  },
  evalToBool(thisparam){
     try {
       if (typeof thisparam !== 'undefined'){
         if ( thisparam == 'true'){
            return true;
         } else {
           return false;
         }
       } else {
         return false;
       }
     } catch (e) {
       return false;
     }
  },
  dateFormat: function(){
     //return moment(this.createdAt).format('D MMMM YYYY - hh:mm');
     var thisMoment = moment(this.createdAt);
     thisMoment.locale('es');
     return thisMoment.format('D MMMM YYYY');
  },
  dateFormatFull: function(){
     //return moment(this.createdAt).format('D MMMM YYYY - hh:mm');
     var thisMoment = moment(this.createdAt);
     thisMoment.locale('es');
     return thisMoment.format('D MMMM YYYY HH:mm:ss');
  },
  getGroupPar(groups,groupname,varname, parameter){
    var result = "Not Set";
    groups.forEach(
       function(thisgroup){
         try {
           if(thisgroup.__id==groupname){
             thisgroup.variables.forEach(
                function(variable){
                   try {
                     if(variable.__id==varname){
                        result = variable[parameter];
                     }
                   } catch (e) {  //do nothing
                   } finally {     //do nothing
                   }
                }
             );
           }
         } catch (e) {
            //do nothing
         } finally {
           //do nothing
         }
       }
    );
    return result;
  },
  getGroupVar(groups,groupname,varname, parameter){
    var result = "Not Set";
    groups.forEach(
       function(thisgroup){
         try {
           if(thisgroup.__id==groupname){
             thisgroup.variables.forEach(
                function(variable){
                   try {
                     if(variable.__id==varname){
                        result = variable;
                     }
                   } catch (e) {  //do nothing
                   } finally {     //do nothing
                   }
                }
             );
           }
         } catch (e) {
            //do nothing
         } finally {
           //do nothing
         }
       }
    );
    return result;
  },
  getPar(variables,varname,parameter){
    var result = "Not Set";
    variables.forEach(
        function(variable){
           try {
               if(variable.__id==varname){
                  result = variable[parameter];
               }
           } catch (e) {  //do nothing
           } finally {     //do nothing
           }
        }
    );
    return result;
  },
  evalSystem(thisSystem){
     try {
       thisSystem=thisSystem.toString().toLowerCase();
       var toCurrentsystem= Config.currentsystem.toString().toLowerCase();
       if (typeof thisSystem !== 'undefined'){
         if(thisSystem==toCurrentsystem){
           return true;
         }
         else{
           console.log("system: evalSystem this "+thisSystem+"  - To this "+toCurrentsystem);
           return false;
         }
       } else {
         console.log("system: evalSystem this undefined");
         return false;
       }
     } catch (e) {
        console.log("system: evalSystem this error");
       return false;
     }
  },
  displayMqttListSearch() {  //mensajes con formato definitivo
    var currentsystem= Config.currentsystem;
    var resource= Config.resource;
    var resourceID = this.current_id;
    var localcollection = MQTTcollection.find({}, { sort: { topic: 1 } });
    return resolveMQTTMessages(localcollection,currentsystem,resource,resourceID);
  },
  displaySubMqttListSearch(){
    var currentsystem= Config.currentsystem;
    var resource= Config.resource;
    var localcollection = MQTTcollection.find({}, { sort: { topic: 1 } });
    var resourceID = this.current_id;
    var subresourceID = this.current_subr_id;
    var subresourceElementID = this.current_subrel_id;
    return resolveMQTTMessagesSubElement (localcollection,currentsystem,resource,resourceID,subresourceID,subresourceElementID);
  },
  getSubStats(){
    var current_id = this.current_id;
    var current_subr_id = this.current_subr_id;
    var current_subrel_id = this.current_subrel_id;
    return {current_id:current_id, current_subr_id:current_subr_id, current_subrel_id:current_subrel_id };
  },
  setAlarmVarValue() {  //mensajes con formato definitivo
    try {
      var alarms = SystemVars.findOne({systemitem: "alarms"});
      return alarms.alarms.value || alarms.offlineDev.value;
    } catch (e) {
      return false;
    }
  },
  setAlarmVarValueNum() {
    try {
      var alarms = SystemVars.findOne({systemitem: "alarms"});
      return alarms.alarms.quantity;
    } catch (e) {
      return 0;
    }
  },
  onAlarm() {
    try {
      var alarms = SystemVars.findOne({systemitem: "alarms"});
      return alarms.alarms.quantity;
    } catch (e) {
      return 0;
    }
  },
  offlineAlarm() {
    try {
      var alarms = SystemVars.findOne({systemitem: "alarms"});
      return alarms.offlineDev.value;
    } catch (e) {
      return false;
    }
  },
  offlineAlarmQ() {
    try {
      var alarms = SystemVars.findOne({systemitem: "alarms"});
      return alarms.offlineDev.quantity;
    } catch (e) {
      return 0;
    }
  },
  getSystem() {
    var currentsystem= Config.currentsystem;
    return currentsystem;
  },
  backEndStatus(){
    try {
      console.log("backEndStatus");
      var localcollection = MQTTcollection.findOne({topic: "symbiot/__system/____backend/java/__var/online/__value"});
      console.log(localcollection);
      if (localcollection.message=="1"){
        console.log("backend OK");
        return false;
      } else {
        console.log("backend OFFLINE");
        return true;
      }
    } catch (e) {
      return true;
    }
  },
  getAlarmList() {  //mensajes con formato definitivo
    return alarmObj;
  },
  statusToText(status) {  //mensajes con formato definitivo
    var textstatus = "undefined";
    if(status==true){
      textstatus = "Activado";
    } else {
      textstatus = "Desactivado";
    }
    return textstatus;
  },
  resolveTopicById(id,url){
      var elementTopicFromDB = MQTTcollection.find({_id:id});
      var topicFromDB;
      elementTopicFromDB.forEach(function(item){
        topicFromDB=item;
      });
      console.log("topic id "+id);
      console.log("topic "+topicFromDB.topic);

      var splitTopic= topicFromDB.topic.split("/");
      var resource;
      var subresource;
      var resourcegroup;
      var group;
      var varname;
      var thisObj={};
      var currentsystem= Config.currentsystem;
      var resource= Config.resource;
      if(splitTopic[1]=="____"+currentsystem){
          if(splitTopic[2]=="__"+resource){
              if (typeof(resource) == "undefined") resource=splitTopic[3];

              if(splitTopic[4]=="__var"){
                  if (typeof(varname) == "undefined") varname=splitTopic[5];
                   thisObj= {url:"/element/"+splitTopic[3],name:resource+">"+varname};
              } else if(splitTopic[4]=="__group"){
                 if (typeof(group) == "undefined") group=splitTopic[5];

                 if(splitTopic[6]=="__var"){
                     if (typeof(varname) == "undefined") varname=splitTopic[7];
                      thisObj= {url:"/element/"+splitTopic[3],
                      name:[{class:"resource",value:resource},{class:"group",value:group},{class:"varname",value:varname}]};
                 }

              } else if(splitTopic[4]=="__resourcegroup"){
                  if (typeof(resourcegroup) == "undefined") resourcegroup=splitTopic[5];

                  if(splitTopic[6]=="__dev"){
                      if (typeof(subresource) == "undefined") subresource=splitTopic[7];

                      if(splitTopic[8]=="__var"){
                          if (typeof(varname) == "undefined") varname=splitTopic[9];
                           thisObj= {
                                      url:"/element/"+splitTopic[3]+"/"+splitTopic[5]+"/"+splitTopic[7],
                                      name:[
                                        {class:"resource",value:resource},
                                        {class:"resourcegroup",value:resourcegroup},
                                        {class:"subresource",value:subresource},
                                        {class:"varname",value:varname}
                                        ]
                                       };

                      } else if(splitTopic[8]=="__group"){
                         if (typeof(group) == "undefined") group=splitTopic[9];

                         if(splitTopic[10]=="__var"){
                             if (typeof(varname) == "undefined") varname=splitTopic[11];
                              thisObj= {
                                url:"/element/"+splitTopic[3]+"/"+splitTopic[5]+"/"+splitTopic[7],
                                name:[
                                  {class:"resource",value:resource},
                                  {class:"resourcegroup",value:resourcegroup},
                                  {class:"subresource",value:subresource},
                                  {class:"group",value:group},
                                  {class:"varname",value:varname}
                                ]
                              };
                         }

                      }
                  }
              }
          }
      }
      if (url==false) return thisObj.name;
      else return thisObj.url;
  },
  resolveTopic(item,url){
      var splitTopic= item.topic.split("/");
      var resource=item.resource.content.name;
      var subresource=item.subresource;
      var resourcegroup=item.resourcegroup;
      var group=item.group;
      var varname=item.varname;
      var thisObj={};
      var currentsystem= Config.currentsystem;
      var resource= Config.resource;
      if(splitTopic[1]=="____"+currentsystem){
          if(splitTopic[2]=="__"+resource){
              if (typeof(resource) == "undefined") resource=splitTopic[3];

              if(splitTopic[4]=="__var"){
                  if (typeof(varname) == "undefined") varname=splitTopic[5];
                   thisObj= {url:"/element/"+splitTopic[3],name:resource+">"+varname};
              } else if(splitTopic[4]=="__group"){
                 if (typeof(group) == "undefined") group=splitTopic[5];

                 if(splitTopic[6]=="__var"){
                     if (typeof(varname) == "undefined") varname=splitTopic[7];
                      thisObj= {url:"/element/"+splitTopic[3],
                      name:[{class:"resource",value:resource},{class:"group",value:group},{class:"varname",value:varname}]};
                 }

              } else if(splitTopic[4]=="__resourcegroup"){
                  if (typeof(resourcegroup) == "undefined") resourcegroup=splitTopic[5];

                  if(splitTopic[6]=="__dev"){
                      if (typeof(subresource) == "undefined") subresource=splitTopic[7];

                      if(splitTopic[8]=="__var"){
                          if (typeof(varname) == "undefined") varname=splitTopic[9];
                           thisObj= {
                                      url:"/element/"+splitTopic[3]+"/"+splitTopic[5]+"/"+splitTopic[7],
                                      name:[
                                        {class:"resource",value:resource},
                                        {class:"resourcegroup",value:resourcegroup},
                                        {class:"subresource",value:subresource},
                                        {class:"varname",value:varname}
                                        ]
                                       };

                      } else if(splitTopic[8]=="__group"){
                         if (typeof(group) == "undefined") group=splitTopic[9];

                         if(splitTopic[10]=="__var"){
                             if (typeof(varname) == "undefined") varname=splitTopic[11];
                              thisObj= {
                                url:"/element/"+splitTopic[3]+"/"+splitTopic[5]+"/"+splitTopic[7],
                                name:[
                                  {class:"resource",value:resource},
                                  {class:"resourcegroup",value:resourcegroup},
                                  {class:"subresource",value:subresource},
                                  {class:"group",value:group},
                                  {class:"varname",value:varname}
                                ]
                              };
                         }

                      }
                  }
              }
          }
      }
      if (url==false) return thisObj.name;
      else return thisObj.url;
  },
  getAlarmHistory() {  //mensajes con formato definitivo
    var localcollection = AlarmHistory.find({}, { sort: { createdAt: -1 } });
    return localcollection;
  },
  getAlarmHistoryById() {  //mensajes con formato definitivo
    console.log("history id "+this.currentTopicId);
    var localcollection = AlarmHistory.find({topicId:this.currentTopicId}, { sort: { createdAt: -1 } });
    return localcollection;
  },
}


Template.nodecontrol.helpers(mqttFormHelpers);
Template.mininode.helpers(mqttFormHelpers);
Template.ministat.helpers(mqttFormHelpers);
Template.branchElement.helpers(mqttFormHelpers);
Template.drsGraphics.helpers(mqttFormHelpers);
Template.navlist.helpers(mqttFormHelpers);
Template.alarmhistory.helpers(mqttFormHelpers);
Template.alarmmodule.helpers(mqttFormHelpers);
Template.alarmlist.helpers(mqttFormHelpers);
Template.floatingAlert.helpers(mqttFormHelpers);
Template.mqttElement.helpers(mqttFormHelpers);
Template.repeaterstatics.helpers(mqttFormHelpers);
Template.repeaterconfigs.helpers(mqttFormHelpers);
Template.statselement.helpers(mqttFormHelpers);
Template.subelementgroups.helpers(mqttFormHelpers);
Template.mqttsubelementtemplate.helpers(mqttFormHelpers);
Template.listControls.helpers(mqttFormHelpers);
Template.pollinglist.helpers(mqttFormHelpers);
Template.pollinglisttemplate.helpers(mqttFormHelpers);
Template.displayMqttListTemplate.helpers(mqttFormHelpers);
Template.minimalMqttObject.helpers(mqttFormHelpers);
Template.config.helpers(mqttFormHelpers);
Template.alarmhistorytemplate.helpers(mqttFormHelpers);

Template.mqttElement.onCreated(
  function(){
    if(Config.currentsystem == "DOLF"){
      Meteor.subscribe("modbuslogfiltered","0","0");
    } else if(Config.currentsystem == "DRS"){
      Meteor.subscribe("rtphistorybytopic","0");
    }
    Meteor.subscribe("mqttcollection");
  }
);

Template.mqttsubelementtemplate.onCreated(
  function(){
    if(Config.currentsystem == "DOLF"){
      Meteor.subscribe("modbuslogfiltered","0","0");
    } else if(Config.currentsystem == "DRS"){
      Meteor.subscribe("rtphistorybytopic","0");
    }
    Meteor.subscribe("mqttcollection");
  }
);


var mqttEvents = {
  'submit form[class="metaform"]'(event) {
    event.preventDefault();

    const target = event.currentTarget;
    var id = target.id.value;
    var name = target.name_set.value;
    var details = target.details.value;
    var toTopic = target.topic.value;

    var thisTopic = MQTTcollection.findOne({"topic" : {$regex : ".*"+toTopic+".*"}});
    var thisMessage = thisTopic.message;
    thisMessage.elements.__details = details;
    thisMessage.elements.__name = name;

    console.log("metaform :: "+toTopic+" "+id+" "+name+""+details+" :: ");

    console.log("submit metaform "+toTopic);
    console.log(thisMessage);

    MQTTcollection.insert({ topic: toTopic, message: thisMessage, broadcast: true });
  },
  'change form[class="toggleform"]'(event) {
    event.preventDefault();
    console.log("toggleform");
    const target = event.currentTarget;
    var rmessage = "false";
    if(target.message.value=="on") rmessage="off";
    else if(target.message.value=="off") rmessage="on";
    else if(target.message.value=="true") rmessage="false";
    else if(target.message.value=="false") rmessage="true";
    else if(target.message.value==true) rmessage=false;
    else if(target.message.value==false) rmessage=true;
    var toTopic = target.topic.value+"/state/set";
    console.log("change toggleform "+toTopic);
    console.log(rmessage);
    MQTTcollection.insert({ topic: toTopic, message: rmessage, broadcast: true });
  }, 'change form[class="dimmerForm"]'(event) {
    event.preventDefault();
    const target = event.currentTarget;
    var rmessage = target.dimRange.value;
    var toTopic = target.topic.value+"/state/set";
    console.log("dimmerform "+toTopic);
    console.log(rmessage);
    MQTTcollection.insert({ topic: toTopic, message: rmessage, broadcast: true });
  },
  'click form[class="enableform"]'(event) {
    event.preventDefault();
    console.log("enabletest");
    const target = event.currentTarget;
    var rmessage = "false";
    if(target.message.value=="on") rmessage="off";
    else if(target.message.value=="off") rmessage="on";
    else if(target.message.value=="true") rmessage="false";
    else if(target.message.value=="false") rmessage="true";
    else if(target.message.value==true) rmessage=false;
    else if(target.message.value==false) rmessage=true;
    var toTopic = target.topic.value+"/state/set";
    console.log("click enableform "+toTopic);
    console.log(rmessage);
    MQTTcollection.insert({ topic: toTopic, message: rmessage, broadcast: true });
  }, 'change form[class="dimmerForm"]'(event) {
    event.preventDefault();
    const target = event.currentTarget;
    console.log(target);
    var rmessage = target.dimRange.value;
    console.log(rmessage);
    var toTopic = target.topic.value+"/state/set";
    console.log("change dimmerform "+toTopic);
    console.log(rmessage);
    MQTTcollection.insert({ topic: toTopic, message: rmessage, broadcast: true });
  },
  'submit form[class="numberform"]'(event) {

    event.preventDefault();
    const target = event.currentTarget;
    console.log(target);
    console.log(target.typeval.value);
    var rmessage = 0;
    if(target.typeval.value=="multi"){
      var total = 0;
      var targets= target.setvalue;
      console.log(targets);
      targets.forEach(function(i) {
            var x = i.checked;
            if(x)total += parseInt(i.value);
          });
      rmessage = ""+total;
    } else {
      rmessage = target.setvalue.value;
      console.log(rmessage);
    }
    var toTopic = target.topic.value+"/state/set";
    console.log("submit numberform "+toTopic);
    console.log(rmessage);
    MQTTcollection.insert({ topic: toTopic, message: rmessage, broadcast: true });
  },
  'change form[class="numberform"]'(event) {
    event.preventDefault();
    const target = event.currentTarget;
    console.log(target);
    console.log(target.typeval.value);
    var rmessage = 0;
    if(target.typeval.value=="multi"){
      var total = 0;
      var targets= target.setvalue;
      console.log(targets);
      targets.forEach(function(i) {
            var x = i.checked;
            if(x)total += parseInt(i.value);
          });
      rmessage = ""+total;
      var toTopic = target.topic.value+"/state/set";
      console.log("change numberform "+toTopic);
      console.log(rmessage);
      MQTTcollection.insert({ topic: toTopic, message: rmessage, broadcast: true });
    }
  },
  'submit form[class="textform"]'(event) {
    event.preventDefault();
    const target = event.currentTarget;
    console.log(target);
    var rmessage = target.setvalue.value;
    console.log(rmessage);
    var toTopic = target.topic.value+"/state/set";
    console.log("submit textform "+toTopic);
    console.log(rmessage);
    MQTTcollection.insert({ topic: toTopic, message: rmessage, broadcast: true });
  },

};

//Template.nodecontrol.events(mqttEvents);
Template.statselement.events(mqttEvents);
Template.listControls.events(mqttEvents);
Template.systemelement.events(mqttEvents);
Template.displayMqttListTemplate.events(mqttEvents);
Template.minimalMqttObject.events(mqttEvents);

Template.mqttElement.onRendered(function() {
  var els = document.getElementsByClassName("anob");
  /*console.log("elements");
  console.log(els.length);
  console.log(els);*/
Array.prototype.forEach.call(els, function(el) {
    // Do stuff here
    //console.log(el.tagName);
    element=$(el);
    //console.log(element);
    const barvalue = (element.val());
    //console.log("barvalue");
    //console.log(barvalue);
    if(!isNaN(barvalue)){
      element.knob({
          'min':0,
          'max':100,
          'readOnly':true,
          'width': 80,
          'height': 80,
      });
      element.val(barvalue).trigger('change');
    } else {
      element.replaceWith( "<p class='elementDataBig'>"+barvalue+" </p>" );
    }
  });
});





Template.mqttElement.onCreated(function() {
  this.subscribe('mqttcollection');
});

Template.alarmmodule.onCreated(function() {
  this.subscribe('alarmhistory');
});
