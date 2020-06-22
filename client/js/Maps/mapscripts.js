import { MQTTcollection } from '/lib/collections/collections.js';
import {interactiveMap} from "/client/js/Maps/dynamicMaps.js";
import {resolveMQTTMessages} from '/lib/functions/mqttFunctions.js';
import {resolveMQTTMessagesSubElement} from '/lib/functions/mqttFunctions.js';
import "/client/js/Maps/touchpunch.js";
import { Config } from '/lib/config/config.js';
import { PollingDevices } from '/lib/collections/PollingDevices.js';
import { ModbusDevices } from '/lib/collections/dolf/ModbusDevices.js';
import { AmpDevices } from '/lib/collections/amp/ampcollection.js';

import { MapCollection } from '/lib/collections/maps/mapcollection.js';
import { Images } from '/lib/collections/images.js';

var divPos = {};
var elementEditID="";
var mymap;

var mapsHelpers = {

      getThisMap(thisMapId){
        console.log("mapid start "+thisMapId);
        try {
          if (thisMapId == null) {

            console.log("mapid id is null ");
            let fileRefx = MapCollection.findOne();
            if (fileRefx !== null) {
              this.thisMapId = fileRefx._id;
              console.log("default by id map "+fileRefx.picture);
              let fileRef = Images.collection.findOne(fileRefx.picture);
              return Images.link(fileRef, 'original','/');
            } else {
              console.log("default map");
              return "/img/defaultmap.svg";
            }
          }
          else {

            console.log("mapid id is NOT null ");
            let fileRefx = MapCollection.findOne(thisMapId);
            if (fileRefx !== null) {
              console.log("default by id map "+fileRefx.picture);
              let fileRef = Images.collection.findOne(fileRefx.picture);
              return Images.link(fileRef, 'original','/');
            } else {
              console.log("default map");
              return "/img/defaultmap.svg";
            }
          }
        } catch (e) {
          return "/img/defaultmap.svg";
        }
      },
      getThisMiniMap(thisMapId){
        console.log("mapid start "+thisMapId);
        try {
          if (thisMapId == null) {

            console.log("mapid id is null ");
            let fileRefx = MapCollection.findOne();
            if (fileRefx !== null) {
              this.thisMapId = fileRefx._id;
              console.log("default by id map "+fileRefx.picture);
              let fileRef = Images.collection.findOne(fileRefx.picture);
              return Images.link(fileRef, 'thumbnail','/');
            } else {
              console.log("default map");
              return "/img/defaultmap.svg";
            }
          }
          else {

            console.log("mapid id is NOT null ");
            let fileRefx = MapCollection.findOne(thisMapId);
            if (fileRefx !== null) {
              console.log("default by id map "+fileRefx.picture);
              let fileRef = Images.collection.findOne(fileRefx.picture);
              return Images.link(fileRef, 'original','/');
            } else {
              console.log("default map");
              return "/img/defaultmap.svg";
            }
          }
        } catch (e) {
          return "/img/defaultmap.svg";
        }
      },
      resetMap(){
        try {
          mymap.resetZoom(1);
          mymap.resetImageSize();
        } catch (e) {
          console.log("no map");
        }
      },
      getThisMapElement(){
        return MapCollection.findOne(this.thisMapId);
      },
      getMapCollection(){
          return MapCollection;
      },
      getMapList(){
          return MapCollection.find();
      },
      getMapElements(_thisMapId){
        try {
          let _mapId = _thisMapId;
          if (_mapId == null) {
            let fileRefx = MapCollection.findOne();
            if (fileRefx !== null) {
              _mapId = fileRefx._id;
            }
          }
          var localcollection = MQTTcollection.find({}, { sort: { topic: 1 } });
          var currentsystem= Config.currentsystem;
          var resource= Config.resource;
          let mqttObjects = resolveMQTTMessages(localcollection,currentsystem,resource,null);
          mqttObjects.forEach( function(part, index) {
            try {
                let thisCollection;
                if(Config.currentsystem == "DRS" ) thisCollection = PollingDevices;
                if(Config.currentsystem == "DOLF" ) thisCollection = ModbusDevices;
                if(Config.currentsystem == "AMP" ) thisCollection = AmpDevices;
                const maped = thisCollection.findOne({_id:part.meta.content.elements.__id, mapnum: _mapId});
                mqttObjects[index]["map"]={
                      mapx: maped.mapx,
                      mapy: maped.mapy,
                      mapid: maped.mapid,
                };
            } catch (e) {
              mqttObjects[index]["enable"]["value"]=false;
            } finally {

            }

          });
          console.log("mapped object");
          console.log(mqttObjects);
          //return PollingDevices.find({mapnum:"1"});
          return mqttObjects;
        } catch (e) {
          return null;
        }
      },
      getElementById(thisId){
        let thisCollection;
        if(Config.currentsystem == "DRS" ) thisCollection = PollingDevices;
        if(Config.currentsystem == "DOLF" ) thisCollection = ModbusDevices;
        if(Config.currentsystem == "AMP" ) thisCollection = AmpDevices;
        const thisDevice = thisCollection.findOne({_id: thisId});
        console.log("element by id");
        console.log(thisId);
        console.log(thisDevice);
        return thisDevice;
      },
      getAllElements(){
        let thisCollection;
        if(Config.currentsystem == "DRS" ) thisCollection = PollingDevices;
        if(Config.currentsystem == "DOLF" ) thisCollection = ModbusDevices;
        if(Config.currentsystem == "AMP" ) thisCollection = AmpDevices;
        return thisCollection.find({});
      },
      getCoord(coord){
        if(zoomFactor!=0){
          const zoomCoord = coord * zoomFactor;
          return zoomCoord;
        } else return coord;
      }
};

Template.mapDisplayer.helpers({
  getNoRendered(){

  },
  reMap(){
    /*
    console.log("remap");
    console.log(this.noRendered);
    this.noRendered=false;
    console.log(this.noRendered);*/
    return this.noRendered;
  },
});

Template.mapitem.helpers(mapsHelpers);
Template.mapmanager.helpers(mapsHelpers);
Template.maptemplate.helpers(mapsHelpers);

Template.maptemplate.events({
  'mousemove [id=zooming]': function(e){

    var offset = $("#zooming").offset();
    divPos = {
       mapx: (e.pageX - offset.left)/zoomFactor,
       mapy: (e.pageY - offset.top)/zoomFactor
     };
     //console.log(divPos);
  },
  'dblclick [id=zooming]': function(e) {
      console.log("double click at");
      console.log(divPos);
      if(Config.currentsystem=="DRS") Meteor.call("reMapElement",elementEditID,divPos,this.thisMapId);
      else if(Config.currentsystem=="AMP") Meteor.call("reMapElementAmp",elementEditID,divPos,this.thisMapId);
      elementEditID = "";
      $( "#cancelEdit" ).hide();
  },
  'click [name=editSelector]': function(e) {
      const selectedElement = e.target;
      console.log("click at");
      console.log(selectedElement.value);
      elementEditID = selectedElement.value;
      $( "#cancelEdit" ).show();
  },
  'click [name=deleteSelector]': function(e) {
      const selectedElement = e.target;
      console.log("click at");
      console.log(selectedElement.value);
      Meteor.call("removeMapElement",selectedElement.value);
  },
  'click [id=cancelEdit]': function(e) {
      elementEditID = "";
      $( "#cancelEdit" ).hide();
  },
  'click [name=elementButton]': function(e){ ///mapelement
    const elename = '#test_togletableb'+ e.target.id;
    console.log("elename: "+elename);
    let scrolloffset = $(elename).offset();
    let containeroffset = $('#zooming').offset();
    // console.log(scrolloffset);
    let scrollpos_top = scrolloffset.top - containeroffset.top;
    let scrollpos_left = scrolloffset.left - containeroffset.left;
    //alert((scrollpos_top+400)+','+(scrollpos_left+400));
    let top_offset = $('#draggablediv').height() / 2;
    let left_offset = $('#draggablediv').width() / 2;
    $('#zooming').animate({
      top: top_offset - scrollpos_top,
      left: left_offset - scrollpos_left
    }, 50);
  },
});


Template.mapmanager.events({
  'click .deletemap': function(e) {
    let r = confirm("Delete this map?");
    if (r == true) {
      console.log("delete map "+this._id);
      Meteor.call("removemap",this._id);
      alert("Map has been deleted");
    }
  },
});


Template.mapDisplayer.onCreated(function() {


});

Template.maptemplate.onRendered(function() {

       Meteor.setTimeout(function(){mymap = new interactiveMap('mymapbox','test');},1000);
});
