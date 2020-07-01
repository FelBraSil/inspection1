import { MQTTcollection } from '../lib/collections/collections.js';
import { Images } from '../lib/collections/images.js';
import { PollingDevices } from '../lib/collections/PollingDevices.js';
import { ModbusDevices } from '../lib/collections/dolf/ModbusDevices.js';
import { ModbusDeviceClass } from '../lib/collections/dolf/ModbusDeviceClass.js';
import { DataGroups } from '../lib/collections/dolf/DataGroups.js';
import { ModbusVar } from '../lib/collections/dolf/ModbusVar.js';
import { RTPHistory } from '../lib/collections/drs/RTPHistory.js';
import { DRSConfs } from '../lib/collections/drs/DRSConfs.js';
import { AlarmHistory } from '../lib/collections/alarmsCollection.js';
import { ModbusLog } from '../lib/collections/dolf/ModbusLog.js';
import { SystemVars } from '/lib/collections/systemvars.js';
import { MapCollection } from '/lib/collections/maps/mapcollection.js';
import { AmpDevices } from '/lib/collections/amp/ampcollection.js';
import { Branches } from '/lib/collections/amp/branchescollection.js';
import { Macros } from '/lib/collections/symbiot/macros.js';
import { Scheduler } from '/lib/collections/symbiot/scheduler.js';
import { Condition } from '/lib/collections/symbiot/conditioned.js';
import '../lib/methods.js';


if (Meteor.isServer) {

    Meteor.publish('branches', function(){
      return Branches.find({});
    });

    Meteor.publish('macros', function(){
      return Macros.find({});
    });

    Meteor.publish('condition', function(){
      return Condition.find({});
    });

    Meteor.publish('scheduler', function(){
      return Scheduler.find({});
    });

    Meteor.publish('ampdevices', function(){
        return AmpDevices.find({});
    });

    Meteor.publish('modbuslogfiltered', function(idVar,idDevice){
        return ModbusLog.find({idVar:idVar,idDevice:idDevice},{limit:50000},{sort:{"fecha":1}});
    });

    Meteor.publish('mapcollection', function() {
        return MapCollection.find({});
    });

    Meteor.publish('drsconfs', function() {
        return DRSConfs.find({});
    });

    Meteor.publish('systemvars', function() {
        return SystemVars.find({});
    });

    Meteor.publish('alarmhistory', function() {
        return AlarmHistory.find({},{sort:{"createdAt":-1}});
    });

    Meteor.publish('rtphistorybytopic', function(topicId){
        return RTPHistory.find({topicId:topicId},{limit:50000},{sort:{"createdAt":1}});
    });

    Meteor.publish('mqttcollection', function() {
        return MQTTcollection.find({});
    });

    Meteor.publish('files.images.all',function() {
        return Images.collection.find({});
    });

    Meteor.publish('pollingdevices',function() {
        return PollingDevices.find({});
    });

    Meteor.publish('mbpollingdevices',function() {
        return ModbusDevices.find({});
    });

    Meteor.publish('modbusdeviceclass_id',function(id) {
        return OpticPortDevices.find({_id:id});
    });

    Meteor.publish('modbusdeviceclass', function() {
      if (Roles.userIsInRole(this.userId, ["admin"],"admin-group")) {
        return ModbusDeviceClass.find();
      } else {
        return ModbusDeviceClass.find({dontShowThis:false});
      }
    });

    Meteor.publish('modbusdeviceclass_all',function() {
        return ModbusDeviceClass.find();
    });

    Meteor.publish('datagroups_id',function(id){
        return DataGroups.find({classd:id});
    });

    Meteor.publish('datagroups',function() {
        return DataGroups.find({});
    });

    Meteor.publish('modbusvar',function() {
        return ModbusVar.find({});
    });

    Meteor.publish('allusers',function() {
        return Meteor.users.find();
    });


}
