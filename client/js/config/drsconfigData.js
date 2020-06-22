import { DRSConfs } from '/lib/collections/drs/DRSConfs.js';
import download from 'downloadjs';

Template.deviceconfig.onCreated(function () {
    this.subscribe('drsconfs');
});

Template.deviceconfig.helpers({
    configData() {
        return DRSConfs;
    },
    configDataElements() {
        return DRSConfs.find();
    },
});


Template.deviceconfig.events({
    'click .uploadFromFile'(event, template){
      //this._id
      event.preventDefault;
      const _validFileExtension = ".sdc";
      try {
        let file = template.find('#configfile');

        console.log(file.files);
        console.log(file.files.length);

        Array.from(file.files).forEach(file => {
          const filename = file.name.toLowerCase();
          if(filename.endsWith(_validFileExtension)){

                let reader = new FileReader();

                reader.onload = function(e)
                {
                    try {
                      const jsoned = e.target.result;
                      const djsoned = JSON.parse(jsoned);
                      delete djsoned._id;
                      console.log(djsoned);
                      const thisExist =  DRSConfs.find({confname:djsoned.confname}).count();
                      if(thisExist>0){
                        alert(`Configuration "${djsoned.confname}" already exists`);//"Configuration "+djsoned.confname+" already exists.");
                      } else {
                        console.log("saving "+djsoned.confname);
                        Meteor.call("insertConfig",djsoned);
                      }
                    } catch (e) {
                      alert("Parsing Error. "+filename+" is probably a damaged or manipulated file.");
                    }
                };
                reader.readAsBinaryString(file);

          } else {
            alert("File must be a "+_validFileExtension+" format");
          }
        });

      } catch (e) {
        console.log(e.message);
      } finally {
        console.log("finished upload function");
      }
    },
    'click .downloadAsFile'(){
      //this._id
      const jsonObject = JSON.stringify(this);
      download(jsonObject, `${this.confname}.sdc`, "text/plain");
    },
    'click .dissableConfigSetting'(){
      var r = confirm("Delete?");
      if (r == true) {
        DRSConfs.remove({_id:this._id});
        console.log(this._id);
        alert("Deleted");
      }
    },
    'click .enableConfigSetting'(){
      var r = confirm("Habiltar?");
      if (r == true) {
        DRSConfs.update({_id:this._id},{$set:{dontShowThis:false}});
        console.log(this._id);
        alert("Habilitado");
      }
    }

});
