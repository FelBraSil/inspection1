import { MQTTcollection } from '/lib/collections/collections.js';
import { RTPHistory } from '/lib/collections/drs/RTPHistory.js';
import { ModbusLog } from '/lib/collections/dolf/ModbusLog.js';
import Highcharts from 'highcharts/highstock';
import Exporting from 'highcharts/modules/exporting';
import CSVExport from 'highcharts-export-csv/export-csv';
import { Config } from '/lib/config/config.js';
import moment from 'moment';
import 'moment/locale/es';

var statsObject={
  name:"Loading",
  unit:"Loading"
};

var thisTopic;

var drsGraphicsHelper = {
  getAllVarArray() {
    if(Config.currentsystem == "DOLF"){
      var varArray = ModbusLog.find().map(
        function (doc) {
          const datum = Date.parse(doc.fecha);
          return [datum,doc.value];
        }
      );
      console.log(varArray) ;
    } else if(Config.currentsystem == "DRS"){
      var varArray = RTPHistory.find().map(
        function (doc) {
          return [doc.createdAt,doc.value];
        }
      );
      console.log(varArray) ;
    }

  },
  gettopicStats(){

    var topicObject = {
      system:null,
      subsystem:null,
      devId:null,
      resourceId:null,
      subDevId:null,
      groupId:null,
      varId:null,
      backURL:""
    };
    //symbiot/____DRS/__dev/8mm8dk6b5iDaD5SkA/__resourcegroup/optic1/__dev/11/__group/Frequency/__var/ch01frequency
    try {
      var datax= MQTTcollection.findOne({_id:thisTopic});
      var sData = datax.topic.split("/");
      topicObject.system=sData[0];
      topicObject.subsystem=sData[1];
      if(sData[2]=="__dev"){
        topicObject.devId=sData[3];
        if(sData[4]=="__resourcegroup"){
          topicObject.resourceId=sData[5];
          if(sData[6]=="__dev"){
            topicObject.subDevId=sData[7];
            if(sData[8]=="__group"){
              topicObject.groupId=sData[9];
              if(sData[10]=="__var"){
                topicObject.varId=sData[11];
              }
            }
          }
        } else if(sData[4]=="__group"){
          topicObject.groupId=sData[5];
          if(sData[6]=="__var"){
            topicObject.varId=sData[7];
          }
        }
      }
    } catch (e) {
        console.log("error topic stats");
    }
    console.log(topicObject);
    if(topicObject.devId!=null){
      if(topicObject.subDevId!=null){
         topicObject.backURL="/element/"+topicObject.devId+"/"+topicObject.resourceId+"/"+topicObject.subDevId;
      } else {
        topicObject.backURL="/element/"+topicObject.devId;
      }
    }
    return topicObject;
  },
  getAllVar() {
    if(Config.currentsystem == "DRS"){
      return RTPHistory.find({},{sort:{ createdAt: 1 },limit:10});
    } else if(Config.currentsystem == "DOLF"){
      return ModbusLog.find({},{sort:{ fecha: 1 },limit:10});
    }

  },
  toDate(timestamp) {
    var thisDate=  new Date(timestamp);
    var thisMoment = moment(thisDate);
    thisMoment.locale('es');
    return thisMoment.format('D MMMM YYYY HH:mm:ss');
  },
  getUnit() {
    return statsObject.unit;
  },
  getTopicId(){
    return this.topicId;
  },
  getDeviceId(){
    return this.current_id;
  },
  getStats(){
    thisTopic=this.topicId;
    console.log("topicid"+thisTopic);
    var currentTopicObjectOne = MQTTcollection.findOne({_id:this.topicId});
    var currentTopic= currentTopicObjectOne.topic;
    var unitTopic = currentTopic.replace("__current", "__unit");
    var unit = MQTTcollection.findOne({topic:unitTopic});
    var nameTopic = currentTopic.replace("__current", "__name");
    var name = MQTTcollection.findOne({topic:nameTopic});
    var max=null;
    var min=null;
    let isRemote = currentTopic.includes('__resourcegroup');
    if(name.message.toLowerCase()==="vswr downlink"){
      max=5;
      min=1;
    }
    statsObject = {
        name:name.message,
        unit:unit.message,
        max:max,
        min:min
    };
    return isRemote;
  },
  echoThis(variableToEcho){
    console.log("echothis");
    console.log(variableToEcho);
  },
  echoThisThing(){
    console.log(this);
  },
};

Template.drsGraphics.helpers(drsGraphicsHelper);
Template.drsGraphics.onCreated(
  function(){
    if(Config.currentsystem == "DOLF"){
      const idDevice = this.data.current_id;
      const idVar = this.data.varid;
      console.log("oncreated ");
      console.log(this.data);
      Meteor.subscribe("modbuslogfiltered",idVar,idDevice);
    } else if(Config.currentsystem == "DRS" || Config.currentsystem == "AMP"){
      Meteor.subscribe("rtphistorybytopic",this.data.topicId);
    }
    Meteor.subscribe("mqttcollection");
  }
);

Template.drsGraphics.onRendered(chartFunction);
/*
function getStats(that){
  try {
    console.log("this.data.topicId");
    console.log(that.data.topicId);
    var currentTopicObject = MQTTcollection.findOne({_id:that.data.topicId});
    console.log("currentTopicObject");
    console.log(currentTopicObject);
    var currentTopic= currentTopicObject.topic;
    var unitTopic = currentTopic.replace("__current", "__unit");
    var unit = MQTTcollection.findOne({topic:unitTopic});
    var nameTopic = currentTopic.replace("__current", "__name");
    var name = MQTTcollection.findOne({topic:nameTopic});
    var statsObject = {
        name:"name",
        unit:"unit"
    };
    return statObject;
  } catch (e) {

  } finally {

  }

}
*/
  var chart={};

function chartFunction() {

  //console.log(statsObject);
  /*var currentTopic= currentTopicObject.topic;
  var unitTopic = currentTopic.replace("__current", "__unit");
  var unit = MQTTcollection.findOne({topic:unitTopic});
  var nameTopic = currentTopic.replace("__current", "__name");
  var name = MQTTcollection.findOne({topic:nameTopic});
  var statsObject = {
      name:"name",
      unit:"unit"
  };*/

  function startChart(){
    // Create the chart
    Exporting(Highcharts);
    CSVExport(Highcharts);
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Unica+One',
    rel: 'stylesheet',
    type: 'text/css'
    }, null, document.getElementsByTagName('head')[0]);

    Highcharts.theme = {
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                ]
            },
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063'
        },
        title: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase'
            }
        },
        xAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: '#A0A0A3'

                }
            }
        },
        yAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: '#A0A0A3'
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    color: '#B0B0B3'
                },
                marker: {
                    lineColor: '#333'
                }
            },
            boxplot: {
                fillColor: '#505053'
            },
            candlestick: {
                lineColor: 'white'
            },
            errorbar: {
                color: 'white'
            }
        },
        legend: {
            itemStyle: {
                color: '#E0E0E3'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            }
        },
        credits: {
            style: {
                color: '#666'
            }
        },
        labels: {
            style: {
                color: '#707073'
            }
        },

        drilldown: {
            activeAxisLabelStyle: {
                color: '#F0F0F3'
            },
            activeDataLabelStyle: {
                color: '#F0F0F3'
            }
        },

        navigation: {
            buttonOptions: {
                symbolStroke: '#DDDDDD',
                theme: {
                    fill: '#505053'
                }
            }
        },

        // scroll charts
        rangeSelector: {
            buttonTheme: {
                fill: '#505053',
                stroke: '#000000',
                style: {
                    color: '#CCC'
                },
                states: {
                    hover: {
                        fill: '#707073',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    },
                    select: {
                        fill: '#000003',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    }
                }
            },
            inputBoxBorderColor: '#505053',
            inputStyle: {
                backgroundColor: '#333',
                color: 'silver'
            },
            labelStyle: {
                color: 'silver'
            }
        },

        navigator: {
            handles: {
                backgroundColor: '#666',
                borderColor: '#AAA'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
                color: '#7798BF',
                lineColor: '#A6C7ED',

            },
            xAxis: {
                gridLineColor: '#505053'
            }
        },

        scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043'
        },

        // special colors for some of the
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
    };

    // Apply the theme

    Highcharts.setOptions(Highcharts.theme);
    chart=  Highcharts.stockChart('myChart', {

          chart: {
            zoomType: 'x'
          },
          rangeSelector: {
                selected: 6,
                allButtonsEnabled: true,
                inputEnabled: true,

                buttons: [{
                    type: 'minute',
                    count: 60,
                    text: '1h'
                }, {
                    type: 'day',
                    count: 1,
                    text: '1d'
                }, {
                    type: 'week',
                    count: 1,
                    text: '7D'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '12m'
                }, {
                    type: 'all',
                    text: 'Todo'
                }]
            },
          xAxis: {
              type: 'datetime'
          },
          yAxis: {
              floor: 0,
              max: statsObject.max,
              min: statsObject.min
          },
          title: {
              text: statsObject.name
          },
          subtitle: {
               text: document.ontouchstart === undefined ?
                   'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
           },
           xAxis: {
               type: 'datetime',
               title: {
                   text: 'Tiempo'
               }
           },
           yAxis: {
               title: {
                   text: statsObject.name+" - "+statsObject.unit
               }
           },
           legend: {
               enabled: false
           },
           plotOptions: {
               area: {
                   fillColor: {
                       linearGradient: {
                           x1: 0,
                           y1: 0,
                           x2: 0,
                           y2: 1
                       },
                       stops: [
                           [0, Highcharts.getOptions().colors[0]],
                           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                       ]
                   },
                   marker: {
                       radius: 2
                   },
                   lineWidth: 1,
                   states: {
                       hover: {
                           lineWidth: 1
                       }
                   },
                   threshold: null
               }
           },
           navigator: {
                series: {
                    includeInCSVExport: false,
                    includeInXLSExport: false,
                }
            },
           series: [{
               type: 'area',
               name: statsObject.unit,
               data: null
           }]

      });
      //navigator.series.includeInCSVExport = false;
      //charts.navigator.series.id = "";
      console.log(chart);
  }

    function requestData() {

      // add the point
      var date = new Date();
      var timestamp = date.getTime();
      point=[timestamp,Math.random()*Math.random()*1000];

      data = [];
      if(Config.currentsystem == "DOLF"){
        var datax= ModbusLog.find();
        datax.forEach(function(doc){
          var createdAt_ = Date.parse(doc.fecha);
          data.push([
            parseInt(createdAt_),
            parseFloat(doc.valueVar)
          ]);
        });
      } else if(Config.currentsystem == "DRS" || Config.currentsystem == "AMP"){
        var datax= RTPHistory.find({topicId:thisTopic});
        datax.forEach(function(doc){
          data.push([
            parseInt(doc.createdAt),
            parseFloat(doc.value)
          ]);
        });
      }

      //chart.series[0].setData = mydata;
      function Comparator(a, b) {
         if (a[0] < b[0]) return -1;
         if (a[0] > b[0]) return 1;
         return 0;
       }
      data=data.sort(Comparator);
      console.log(data);
      //console.log(mydata);
      //chart.series[0].addPoint(point, true, shift);
      chart.series[0].setData(data);
      // call it again after one second
      //setTimeout(requestData, 20000);
    }

    function requestPoints() {
      var series = chart.series[0],
          shift = series.data.length > 100; // shift if the series is
                                           // longer than 20

      // add the point
      var date = new Date();
      var timestamp = date.getTime();
      var datax= MQTTcollection.findOne({_id:thisTopic});
      point={x:timestamp,y:parseFloat(datax.message)};
      chart.series[0].addPoint(point, true, false);
      // call it again after one second*/
      setTimeout(requestPoints, 10*60*1000);
    }

   setTimeout(startChart,6000);
   setTimeout(requestData,8000);
   setTimeout(requestPoints,10*60*1000);

}
