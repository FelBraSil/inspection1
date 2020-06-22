
export const resolveMQTTMessages = (localcollection,currentsystem,resource,search) => {
  var arr = {};
  //var strsplit = "/____"+currentsystem+"/__"+resource+"/";
  var strsplit = "/$elemento/";
  arr = returnMQTTMessages(localcollection,search,resource,strsplit);
  return prepareMQTTMessages(arr,search);
}

export const resolveMQTTMessagesSubElement = (localcollection,currentsystem,resource,resourceID,subresourceID,subresourceElementID) => {

  var arr = {};
  var strsplit = "/____"+currentsystem+"/__"+resource+"/"+resourceID+"/__resourcegroup/"+subresourceID+"/__"+resource+"/";
  //var strsplit = "/$elemento/";
  arr = returnMQTTMessages(localcollection,subresourceElementID,resource,strsplit);

  return prepareMQTTMessages(arr,subresourceElementID);
}

const returnMQTTMessages = (localcollection,search,resource,strsplit) => {
  alarmObj=[];
  setAlarmVarNum= 0;
  setOfflineNum= 0;
  setAlarmVar= false;
  setOffline= false;
  var arr = {};
  var arr2= [];
  var index = [];
  localcollection.forEach(function(item){
      var atopic = item.topic.split(strsplit);

      if (atopic.length >= 2) {                                          //revisa si se obtuvieron las 2 variables
        //console.log("valid topic");
        var ubicacion = atopic[0];                                       //parte deel topic que indica la ubicacion del elemento
        var elemento = atopic[1];                                        //parte del topic que posee variables sobre un elementos
        var aelemento= elemento.split("/");                              //divide al elemento en secciones de datos segun el arbol
        //console.log(aelemento);
        if(aelemento.length >= 2){
            var elementid = aelemento[0];
            var insertthis= true;
            if (search==null){
               insertthis= true;
            } else {
               if(elementid==search){
                  insertthis= true;
               } else {
                  insertthis= false;
               }
            }
            if(insertthis){
              arr[elementid]                                        = arr[elementid] || [];
              arr[elementid]["__id"]                                = arr[elementid]["__id"]  || [];
              arr[elementid]["__id"]                                = elementid;
              arr[elementid]["groups"]                              = arr[elementid]["groups"] || [];
              arr[elementid]["meta"]                                = arr[elementid]["meta"] || [];
              arr[elementid]["enable"]                              = arr[elementid]["enable"] || [];
              arr[elementid]["online"]                              = arr[elementid]["online"] || [];
              arr[elementid]["variables"]                           = arr[elementid]["variables"] || [];
              arr[elementid]["resourcegroups"]                      = arr[elementid]["resourcegroups"] || [];
              //console.log(aelemento[1]);
              if(aelemento[1]=="__enable"){
                  typeof item.message;
                  arr[elementid]["enable"]["value"]                 = arr[elementid]["enable"]["value"]  || item.message;
                  arr[elementid]["enable"]["topic"]                 = arr[elementid]["enable"]["topic"]    || item.topic;
              } else if(aelemento[1]=="__online"){
                  typeof item.message;
                  arr[elementid]["online"]["value"]                 = arr[elementid]["online"]["value"]  || item.message;
                  arr[elementid]["online"]["topic"]                 = arr[elementid]["online"]["topic"]    || item.topic;

              } else if(aelemento[1]=="__meta"){
                  typeof item.message;
                  /*console.log("meta");
                  //console.log(thisobj);/*
                  var jsonStr = obj.replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
                    return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
                  }); */
                  arr[elementid]["meta"]["content"]                            = arr[elementid]["meta"]["content"]  || item.message;
                  arr[elementid]["meta"]["topic"]                              = arr[elementid]["meta"]["topic"]  || item.topic;

              } else if(aelemento[1]=="$name"){
                  arr[elementid]["__name"]                            = arr[elementid]["__name"]   || item.message;
              } else if(aelemento[1]=="__name"){
                  arr[elementid]["__name"]                            = arr[elementid]["__name"]   || item.message;
              } else if(aelemento[1]=="__var"){
                  var varname= aelemento[2];
                  arr[elementid]["variables"][varname]                  = arr[elementid]["variables"][varname] || [];
                  arr[elementid]["variables"][varname][aelemento[3]]    = arr[elementid]["variables"][varname][aelemento[3]] || item.message;
                  arr[elementid]["variables"][varname]["__topic"]       = arr[elementid]["variables"][varname]["__topic"] || item.topic.replace("/"+[aelemento[3]],"");
                  arr[elementid]["variables"][varname]["__id"]          = arr[elementid]["variables"][varname]["__id"] || varname;
                  if(aelemento[3]=="__current") arr[elementid]["variables"][varname]["__dbidt"]        = arr[elementid]["variables"][varname]["__dbidt"] || item._id;
                  if(aelemento[3]=="__value") arr[elementid]["variables"][varname]["__valdbid"]        = arr[elementid]["variables"][varname]["__valdbid"] || item._id;
              } else if(aelemento[1]=="__group"){
                  var groupname= aelemento[2];
                  if(aelemento[3]=="__var"){
                    var varname= aelemento[4];
                    arr[elementid]["groups"][groupname]                                     = arr[elementid]["groups"][groupname] || [];
                    arr[elementid]["groups"][groupname]["variables"]                        = arr[elementid]["groups"][groupname]["variables"] || [];
                    arr[elementid]["groups"][groupname]["__id"]                             = arr[elementid]["groups"][groupname]["__id"] || groupname;
                    arr[elementid]["groups"][groupname]["variables"][varname]               = arr[elementid]["groups"][groupname]["variables"][varname] || [];
                    arr[elementid]["groups"][groupname]["variables"][varname]["__id"]       = arr[elementid]["groups"][groupname]["variables"][varname]["__id"]    || varname;
                    arr[elementid]["groups"][groupname]["variables"][varname][aelemento[5]] = arr[elementid]["groups"][groupname]["variables"][varname][aelemento[5]] || item.message;
                    arr[elementid]["groups"][groupname]["variables"][varname]["__topic"]    = arr[elementid]["groups"][groupname]["variables"][varname]["__topic"]    || item.topic.replace("/"+[aelemento[5]],"");
                    if(aelemento[5]=="__current") arr[elementid]["groups"][groupname]["variables"][varname]["__dbidt"]     = arr[elementid]["groups"][groupname]["variables"][varname]["__dbidt"] || item._id;
                    if(aelemento[5]=="__value") arr[elementid]["groups"][groupname]["variables"][varname]["__valdbid"]     = arr[elementid]["groups"][groupname]["variables"][varname]["__valdbid"] || item._id;
                  } else if (aelemento[3]=="__name"){
                    arr[elementid]["groups"][groupname]                                     = arr[elementid]["groups"][groupname] || [];
                    arr[elementid]["groups"][groupname]["__name"]                           = arr[elementid]["groups"][groupname]["__name"] || item.message;
                  }
              } else if(aelemento[1]=="__resourcegroup"){
                  var groupname= aelemento[2];
                  arr[elementid]
                    = arr[elementid] || [];
                  arr[elementid]["resourcegroups"]
                    = arr[elementid]["resourcegroups"] || [];
                  arr[elementid]["resourcegroups"][groupname]
                    = arr[elementid]["resourcegroups"][groupname] || [];
                  arr[elementid]["resourcegroups"][groupname]["__id"]
                    = arr[elementid]["resourcegroups"][groupname]["__id"] || groupname;
                  arr[elementid]["resourcegroups"][groupname]["element"]
                    = arr[elementid]["resourcegroups"][groupname]["element"] || [];
                    arr[elementid]["resourcegroups"][groupname]["alarm"]
                      = arr[elementid]["resourcegroups"][groupname]["alarm"] || false;


                  if(aelemento[3]=="__"+resource){
                    var subelementid = aelemento[4];
                    arr[elementid]["resourcegroups"][groupname]["element"][subelementid]
                      = arr[elementid]["resourcegroups"][groupname]["element"][subelementid] || [];
                      arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"]
                      = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"] || [];
                      arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"]
                      = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"] || [];
                      arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["__id"]
                        = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["__id"] || subelementid;
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["enable"]
                        = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["enable"] || [];
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["online"]
                        = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["online"] || [];

                    if(aelemento[5]=="__enable"){
                        typeof item.message;
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["enable"]["value"]                 = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["enable"]["value"]  || item.message;
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["enable"]["topic"]                 = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["enable"]["topic"]    || item.topic;
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["enable"]["__dbidt"]                 = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["enable"]["__dbidt"]    || item._id;

                    } else if(aelemento[5]=="__online"){
                        typeof item.message;
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["online"]["value"]                 = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["enable"]["value"]  || item.message;
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["online"]["topic"]                 = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["enable"]["topic"]    || item.topic;
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["online"]["__dbidt"]                 = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["enable"]["__dbidt"]    || item._id;

                    } else if(aelemento[5]=="__meta"){
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["meta"]                            = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["meta"] || [];
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["meta"]["content"]                 = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["meta"]["content"]  || item.message;
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["meta"]["topic"]                   = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["meta"]["topic"]  || item.topic;
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["meta"]["__dbidt"]                   = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["meta"]["__dbidt"]    || item._id;
                    } else if(aelemento[5]=="__name"){
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["__name"]                            = item.message;
                    }else if(aelemento[5]=="__var"){
                        var varname= aelemento[6];

                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"][varname]
                          = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"][varname] || [];
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"][varname][aelemento[7]]
                          = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"][varname][aelemento[7]] || item.message;
                          arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"][varname]["__topic"]
                            = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"][varname]["__topic"] || item.topic.replace("/"+[aelemento[7]],"");
                          if(aelemento[7]=="__current")  arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"][varname]["__dbidt"]
                              = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"][varname]["__dbidt"] || item._id;
                              if(aelemento[7]=="__value")  arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"][varname]["__valdbid"]
                                  = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["variables"][varname]["__valdbid"] || item._id;

                    } else if(aelemento[5]=="__group"){
                        var sgroupname= aelemento[6];
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]                                     = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname] || [];
                        arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["__id"]                             = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["__id"] || sgroupname;
                        if(aelemento[7]=="__var"){
                          var svarname= aelemento[8];

                          arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"]                         = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"] || [];
                          arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname]               = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname] || [];
                          arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname]["__id"]       = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname]["__id"]  || svarname;
                          arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname][aelemento[9]] = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname][aelemento[9]] || item.message;
                          arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname]["__topic"]    = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname]["__topic"] || item.topic.replace("/"+[aelemento[9]],"");
                          if(aelemento[9]=="__current") arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname]["__dbidt"]     = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname]["__dbidt"]  || item._id;
                          if(aelemento[9]=="__value") arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname]["__valdbid"]     = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["variables"][svarname]["__valdbid"]  || item._id;

                        } else if (aelemento[7]=="__name"){
                          arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]                                     = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname] || [];
                          arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["__name"]                        = arr[elementid]["resourcegroups"][groupname]["element"][subelementid]["groups"][sgroupname]["__name"] || item.message;
                        }
                    }
                  } else if(aelemento[3]=="__name"){
                    arr[elementid]["resourcegroups"][groupname]
                      = arr[elementid]["resourcegroups"][groupname] || [];
                    arr[elementid]["resourcegroups"][groupname]["__name"]
                      = arr[elementid]["resourcegroups"][groupname]["__name"] || item.message;
                  }

              } else if(aelemento[1].startsWith("$")) {
                var varname = aelemento[1];
                var varset = ( !aelemento.length > 2 ) ? aelemento[1] : aelemento[2];
                if (typeof varset == 'undefined'){
                  varset = "value";
                }
                arr[elementid]["variables"][varname]                  = arr[elementid]["variables"][varname] || [];
                arr[elementid]["variables"][varname][varset]          = arr[elementid]["variables"][varname][varset] || item.message;
                arr[elementid]["variables"][varname]["__topic"]       = arr[elementid]["variables"][varname]["__topic"] || item.topic;
                arr[elementid]["variables"][varname]["__id"]          = arr[elementid]["variables"][varname]["__id"] || varname;
                arr[elementid]["variables"][varname]["__system"]          = arr[elementid]["variables"][varname]["__system"] || true;
              } else if(aelemento.length > 2) {

                var varname = aelemento[1];
                var varset = ( aelemento.length > 3 ) ? aelemento[3] : aelemento[2];
                var splitTopic = item.topic.split(varname);
                var baseTopic = splitTopic[0]+varname;

                arr[elementid]["variables"][varname]                  = arr[elementid]["variables"][varname] || [];
                arr[elementid]["variables"][varname][varset]          = arr[elementid]["variables"][varname][varset] || item.message;

                arr[elementid]["variables"][varname]["__topic"]       = arr[elementid]["variables"][varname]["__topic"] || baseTopic;

                arr[elementid]["variables"][varname]["__id"]          = arr[elementid]["variables"][varname]["__id"] || varname;

              } else {
                //console.log("not a var, group or resource topic:");
              }
              if(aelemento[1]=="$state"){
                  let isonline = (item.message==="ready") ? true : false ;
                  arr[elementid]["online"]["value"]                 = arr[elementid]["online"]["value"]  || isonline;
                  arr[elementid]["online"]["topic"]                 = arr[elementid]["online"]["topic"]    || item.topic;

              }
            }

        }


      } else {
        /*
        console.log("not a valid topic:");

        console.log(atopic);//no hago nada, la publicacion no pertenece al formato del protocolo, por lo tanto la ignoro
        console.log(atopic.length);*/
      }
  });
  //console.log("getting topics into array");
  //console.log(arr);
  return arr;
};

const prepareMQTTMessages = (arr,search) =>{
  var arr2= [];
  var index = [];
  var auxarr=[];
  var auxarr2=[];
  var arrex2=[];

  for(var indux in arr){
        let config={};
        arrex2.push(arr[indux]);
        var auxarrgroups = [];
        var vargroups = [];
        var auxResourceGroups = [];
        var varResourceGroups = [];
        var auxarr3 = [];
        var vars=[];                         //inyecto las variables en un arreglo secundario
        var group=[];

        auxarrgroups[indux]                = auxarrgroups[indux]      || [];
        auxarrgroups[indux]["groups"]      = auxarrgroups[indux]["groups"]              || [];

        var auxarr_4 = [];
        auxarr_4[indux] = auxarr_4[indux]      || [];
        auxarr_4[indux]["__quantity"]= auxarr_4[indux]["__quantity"]       || 0;
        var thisEnable = arr[indux]["enable"]["value"] ;
        //console.log("thisenable");
        //console.log(thisEnable);
        auxResourceGroups[indux]           = auxResourceGroups[indux]      || [];
        auxResourceGroups[indux]["groups"] = auxResourceGroups[indux]["groups"]              || [];

        for (var indux2 in arr[indux]["variables"]){
            auxarr3.push(arr[indux]["variables"][indux2]);
            arr[indux]["variables"][indux2]["__class"] = arr[indux]["variables"][indux2]["__class"] || [];
            var thisclass= arr[indux]["variables"][indux2]["__class"];
            if(thisclass=="Alarm" || thisclass=="alarm"){
                arr[indux]["variables"][indux2]["__value"]
                  = arr[indux]["variables"][indux2]["__value"] || [];
                var thisvalue= arr[indux]["variables"][indux2]["__value"];
                var thiscurrent= arr[indux]["variables"][indux2]["__current"];
                if ((thisvalue=="true" || thisvalue==true) && (thiscurrent=="true" || thiscurrent==true) &&  thisEnable){
                   arr[indux]["__alarm"] = true;
                   setAlarmVarNum=setAlarmVarNum+1;
                   alarmObj.push({
                      topic:arr[indux]["variables"][indux2]["__topic"],
                      __id:arr[indux]["variables"][indux2]["__id"],
                      resource:arr[indux]["meta"],
                      varname:arr[indux]["variables"][indux2]["__name"],
                    });
                }
            }
        }
        for (var indux2 in arr[indux]["groups"]){
            var auxarr_1 = [];
            var auxarr_2 = [];
            for (var indux3 in arr[indux]["groups"][indux2]["variables"]){
                auxarr_1.push(arr[indux]["groups"][indux2]["variables"][indux3]);
                config[indux2] = config[indux2] || {};
                config[indux2][indux3] = config[indux2][indux3] || arr[indux]["groups"][indux2]["variables"][indux3]["__current"];

                    arr[indux]["groups"][indux2]["variables"][indux3]["__class"] = arr[indux]["groups"][indux2]["variables"][indux3]["__class"] || [];
                    var thisclass= arr[indux]["groups"][indux2]["variables"][indux3]["__class"];
                    if(thisclass=="Alarm" || thisclass=="alarm"){
                        arr[indux]["groups"][indux2]["variables"][indux3]["__value"]
                          = arr[indux]["groups"][indux2]["variables"][indux3]["__value"] || [];
                        var thisvalue= arr[indux]["groups"][indux2]["variables"][indux3]["__value"];
                        var thiscurrent= arr[indux]["groups"][indux2]["variables"][indux3]["__current"];

                        if ((thisvalue=="true" || thisvalue==true) && (thiscurrent=="true" || thiscurrent==true) && thisEnable){
                           arr[indux]["__alarm"] = true;
                           setAlarmVarNum=setAlarmVarNum+1;
                           alarmObj.push({
                             topic:arr[indux]["groups"][indux2]["variables"][indux3]["__topic"],
                             __id:arr[indux]["groups"][indux2]["variables"][indux3]["__id"],
                             resource:arr[indux]["meta"],
                             group:arr[indux]["groups"][indux2]["__name"],
                             varname:arr[indux]["groups"][indux2]["variables"][indux3]["__name"],
                           });
                        }
                    }
            }
            auxarrgroups[indux]["groups"][indux2]              = auxarrgroups[indux]["groups"][indux2]      || [];
            auxarrgroups[indux]["groups"][indux2]["__id"]      = auxarrgroups[indux]["groups"][indux2]["__id"] || [] ;
            auxarrgroups[indux]["groups"][indux2]["__id"]      = arr[indux]["groups"][indux2]["__id"];
            auxarrgroups[indux]["groups"][indux2]["__name"]    = auxarrgroups[indux]["groups"][indux2]["__name"] || [] ;
            auxarrgroups[indux]["groups"][indux2]["__name"]    = arr[indux]["groups"][indux2]["__name"];
            auxarrgroups[indux]["groups"][indux2]["variables"] = auxarrgroups[indux]["groups"][indux2]["variables"] || [] ;
            auxarrgroups[indux]["groups"][indux2]["variables"] = auxarr_1;
        }
        for (var indux2 in auxarrgroups[indux]["groups"]){
            vargroups.push(auxarrgroups[indux]["groups"][indux2]);
        }
        for (var indux2 in arr[indux]["resourcegroups"]){
            var auxarr_ = [];
            var auxarr_1 = [];
            var auxarr_2 = [];
            var auxarr_3 = [];
            var auxarrgroups_ = [];
            var vargroups_=[];
            var localQuantity =0;

            auxarrgroups_[indux]
              = auxarrgroups_[indux] || [];
            auxarrgroups_[indux]["resourcegroups"]
              = auxarrgroups_[indux]["resourcegroups"]  || [];
            auxarrgroups_[indux]["resourcegroups"][indux2]
              = auxarrgroups_[indux]["resourcegroups"][indux2] || [];
            auxarrgroups_[indux]["resourcegroups"][indux2]["element"]
              = auxarrgroups_[indux]["resourcegroups"][indux2]["element"] || [];



            for (var indux3 in arr[indux]["resourcegroups"][indux2]["element"]){

                var thisSubEnable = arr[indux]["resourcegroups"][indux2]["element"][indux3]["enable"]["value"];
                if(thisSubEnable) localQuantity ++;

                  auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]
                    = auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3] || [];
                  auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["__id"]
                    = auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["__id"] || [];
                    auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["__id"]
                      =       arr[indux]["resourcegroups"][indux2]["element"][indux3]["__id"];
                      auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["__name"]
                        =      auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["__name"] ||  arr[indux]["resourcegroups"][indux2]["element"][indux3]["__name"]; ///

                  for (var indux4 in arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"]){
                      auxarr_3.push(arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"][indux4]);

                      arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"][indux4]["__class"] = arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"][indux4]["__class"] || [];
                      var thisclass= arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"][indux4]["__class"];
                      if(thisclass=="Alarm" || thisclass=="alarm"){
                          arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"][indux4]["__value"]
                            = arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"][indux4]["__value"] || [];
                          var thisvalue= arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"][indux4]["__value"];
                          var thiscurrent= arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"][indux4]["__current"];
                          if ((thisvalue=="true" || thisvalue==true) && (thiscurrent=="true" || thiscurrent==true) && thisEnable && thisSubEnable){
                             arr[indux]["__alarm"] = true;
                             setAlarmVarNum=setAlarmVarNum+1;
                             arr[indux]["resourcegroups"][indux2]["__alarm"] = true;
                              arr[indux]["resourcegroups"][indux2]["element"][indux3]["__alarm"] = true;
                              alarmObj.push({
                                topic:arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"][indux4]["__topic"],
                                __id:arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"][indux4]["__id"],
                                resource:arr[indux]["meta"],
                                subresource:arr[indux]["resourcegroups"][indux2]["element"][indux3]["__name"],
                                resourcegroup:arr[indux]["resourcegroups"][indux2]["__name"],
                                varname:arr[indux]["resourcegroups"][indux2]["element"][indux3]["variables"][indux4]["__name"],
                              });
                          }
                      }
                  }
                  for (var indux4 in arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"]){
                      var auxarr__1 = [];
                      var auxarr__2 = [];

                      auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"]
                        = auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"] || [];
                      auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]
                        = auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4] || [];


                      for (var indux5 in arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"]){
                          auxarr__1.push(arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"][indux5]);

                          arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"][indux5]["__class"]
                           = arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"][indux5]["__class"] || [];
                          var thisclass= arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"][indux5]["__class"];
                          if(thisclass=="Alarm" || thisclass=="alarm"){
                              arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"][indux5]["__value"]
                                = arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"][indux5]["__value"] || [];
                              var thisvalue= arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"][indux5]["__value"];
                              var thiscurrent= arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"][indux5]["__current"];
                              if ((thisvalue=="true" || thisvalue==true) && (thiscurrent=="true" || thiscurrent==true) && thisEnable && thisSubEnable){
                                 arr[indux]["__alarm"] = true;
                                 setAlarmVarNum=setAlarmVarNum+1;
                                 arr[indux]["resourcegroups"][indux2]["__alarm"] = true;
                                 arr[indux]["resourcegroups"][indux2]["element"][indux3]["__alarm"] = true;
                                 alarmObj.push(
                                      {
                                            topic:arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"][indux5]["__topic"],
                                            __id:arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"][indux5]["__id"],
                                            resource:arr[indux]["meta"],
                                            subresource:arr[indux]["resourcegroups"][indux2]["element"][indux3]["__name"],
                                            resourcegroup:arr[indux]["resourcegroups"][indux2]["__name"],
                                            group:arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["__name"],
                                            varname:arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"][indux5]["__name"],
                                      });
                              }
                          }
                      }
                      auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]              = auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]      || [];
                      auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["__id"]      = auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["__id"] ||   arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["__id"];
                      auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["__name"]    = auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["__name"] ||   arr[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["__name"];
                      auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"] = auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"] || [] ;
                      auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]["variables"] = auxarr__1;
                  }
                  for (var indux4 in auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"]){
                      vargroups_.push(auxarrgroups_[indux]["resourcegroups"][indux2]["element"][indux3]["groups"][indux4]);
                  }

                  auxarr_[indux3]                    = auxarr_[indux3]      || [];
                  auxarr_[indux3]["__id"]            = arr[indux]["resourcegroups"][indux2]["element"][indux3]["__id"];
                  auxarr_[indux3]["__name"]          = arr[indux]["resourcegroups"][indux2]["element"][indux3]["__name"];
                  auxarr_[indux3]["__alarm"]         = arr[indux]["resourcegroups"][indux2]["element"][indux3]["__alarm"];
                  auxarr_[indux3]["variables"]       = auxarr_[indux3]["variables"]      || auxarr_3;
                  auxarr_[indux3]["groups"]          = auxarr_[indux3]["groups"]      ||  vargroups_;
                  auxarr_[indux3]["meta"]            = arr[indux]["resourcegroups"][indux2]["element"][indux3]["meta"];
                  auxarr_[indux3]["enable"]          = arr[indux]["resourcegroups"][indux2]["element"][indux3]["enable"];
                  auxarr_[indux3]["online"]          = arr[indux]["resourcegroups"][indux2]["element"][indux3]["online"];


            } for (var indux4 in auxarr_){
                auxarr_1.push(auxarr_[indux4]);
            }
            auxResourceGroups[indux]                                        = auxResourceGroups[indux]   || [];
            auxResourceGroups[indux]["resourcegroups"]                      = auxResourceGroups[indux]["resourcegroups"]      || [];
            auxResourceGroups[indux]["resourcegroups"][indux2]              = auxResourceGroups[indux]["resourcegroups"][indux2]      || [];
            auxResourceGroups[indux]["resourcegroups"][indux2]["__id"]      = auxResourceGroups[indux]["resourcegroups"][indux2]["__id"] || arr[indux]["resourcegroups"][indux2]["__id"];
            auxResourceGroups[indux]["resourcegroups"][indux2]["__name"]    = auxResourceGroups[indux]["resourcegroups"][indux2]["__name"] || arr[indux]["resourcegroups"][indux2]["__name"];
            auxResourceGroups[indux]["resourcegroups"][indux2]["__alarm"]   = auxResourceGroups[indux]["resourcegroups"][indux2]["__alarm"] || arr[indux]["resourcegroups"][indux2]["__alarm"];
            auxResourceGroups[indux]["resourcegroups"][indux2]["element"]   = auxResourceGroups[indux]["resourcegroups"][indux2]["element"] || auxarr_1;
            auxResourceGroups[indux]["resourcegroups"][indux2]["meta"]   = auxResourceGroups[indux]["resourcegroups"][indux2]["element"] || arr[indux]["resourcegroups"][indux2]["meta"];
            auxResourceGroups[indux]["resourcegroups"][indux2]["enable"]   = auxResourceGroups[indux]["resourcegroups"][indux2]["enable"] || arr[indux]["resourcegroups"][indux2]["enable"];
            auxResourceGroups[indux]["resourcegroups"][indux2]["online"]   = auxResourceGroups[indux]["resourcegroups"][indux2]["online"] || arr[indux]["resourcegroups"][indux2]["online"];
            auxResourceGroups[indux]["resourcegroups"][indux2]["__quantity"]   = auxResourceGroups[indux]["resourcegroups"][indux2]["__quantity"] || localQuantity;


            auxarr_4[indux]["__quantity"]= auxarr_4[indux]["__quantity"] + localQuantity;
        }
        for (var indux2 in auxResourceGroups[indux]["resourcegroups"]){
            varResourceGroups.push(auxResourceGroups[indux]["resourcegroups"][indux2]);
        }
        auxarr[indux]                    = auxarr[indux]      || [];
        auxarr[indux]["__name"]          = auxarr[indux]["__name"]       || arr[indux]["__name"];
        auxarr[indux]["__quantity"]      = auxarr[indux]["__quantity"]       || auxarr_4[indux]["__quantity"];
        auxarr[indux]["__alarm"]         = arr[indux]["__alarm"] || [];
        auxarr[indux]["__id"]            = arr[indux]["__id"];
        auxarr[indux]["variables"]       = auxarr[indux]["variables"]      || [];
        auxarr[indux]["variables"]       = auxarr3;
        auxarr[indux]["groups"]          = auxarr[indux]["groups"]      ||  vargroups;
        auxarr[indux]["meta"]            = auxarr[indux]["meta"]      || arr[indux]["meta"] ;
        auxarr[indux]["enable"]          = auxarr[indux]["enable"]      || arr[indux]["enable"] ;
        auxarr[indux]["online"]          = auxarr[indux]["online"]      || arr[indux]["online"] ;
        auxarr[indux]["config"]          = auxarr[indux]["config"]      || config ;

        if(!auxarr[indux]["online"]["value"] && auxarr[indux]["enable"]["value"]) {
            setOfflineNum=setOfflineNum+1;
            setOffline=true;
        }
        auxarr[indux]["resourcegroups"]  = auxarr[indux]["resourcegroups"]      || varResourceGroups;

        //UI ATRIBUTES

        if(auxarr[indux]["__alarm"] == true){
            setAlarmVar=true;
            auxarr[indux]["ui"] = auxarr[indux]["ui"] || [];
            auxarr[indux]["ui"]["thumbnailclass"] =  "alarm";
        } else {
            setAlarmVar=false;
        }

        systemobject = {
          systemitem: "alarms",
          alarms: {
               value: setAlarmVar,
               quantity: setAlarmVarNum,
          },
          offlineDev: {
               value: setOffline,
               quantity: setOfflineNum,
          }
        };

        Meteor.call('updateSystemVars',systemobject, function(error, result){
          if(result){
           ////console.log(result)
          }
          if(error){
           ////console.log(result)
          }
        });

        ////console.log("vars");
        ////console.log(vars);
  }
  ////console.log("demo");
  ////console.log(arr2);
  for (var indexs in auxarr){
    arr2.push(auxarr[indexs]);      //e inserto la matriz en un arreglo, para ser iterado en un template
  }
  //console.log(arr2);
  //console.log(setOfflineNum);
  return arr2;
};
