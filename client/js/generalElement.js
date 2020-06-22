import { MQTTcollection } from '../../lib/collections/collections.js';
import {resolveMQTTMessages} from '../../lib/functions/mqttFunctions.js';
import {resolveMQTTMessagesSubElement} from '../../lib/functions/mqttFunctions.js';
import "jquery-knob";
import Highcharts from 'highcharts/highstock';
import Exporting from 'highcharts/modules/exporting';
import CSVExport from 'highcharts-export-csv/export-csv';
import { Config } from '/lib/config/config.js';

var mqttGeneralFormHelpers = {

  check_if_stat(value){
   if(value=="true") return true;
   else return false;
},
echoThis(variableToEcho){
  console.log("echothis");
  console.log(variableToEcho);
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
displayMqttList() {  //mensajes con formato definitivo
  var localcollection = MQTTcollection.find({}, { sort: { topic: 1 } });
  var currentsystem= Config.currentsystem;
  var resource= Config.resource;
  return resolveMQTTMessages(localcollection,currentsystem,resource,null);
},
};

Template.maptemplate.helpers(mqttGeneralFormHelpers);
Template.displayMqttListTemplate.helpers(mqttGeneralFormHelpers);
Template.minimalMqttObject.helpers(mqttGeneralFormHelpers);
Template.mqttList.helpers(mqttGeneralFormHelpers);

Template.appbody.events({
  'click .logoutaction': ()=> {
    Meteor.logout();
  },
});


Template.displayMqttListTemplate.onRendered(function() {
  var els = document.getElementsByClassName("anob");
Array.prototype.forEach.call(els, function(el) {
    element=$(el);
    const barvalue = (element.val());
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

Template.displayMqttListTemplate.onCreated(function() {
  this.subscribe('mqttcollection');
});
