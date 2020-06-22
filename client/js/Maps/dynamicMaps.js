/**
      Interactive Map
      Felipe Bravo Silva
      Custom images with floating elements that stay on their map position, but won't change their size
      A-la google maps.

      REQUERIMENTS

      jquery 1.0+
      jquery-ui 1.0+

      Structure to be used before applying the plugin:

      <div class=mapbox id=<mymapbox> >		 																												//main map box container, it holds all the elements, id <mymapbox> can be anything, but the id of the content has to be the same indicated here
                                                                                                  //<mymapbox> id will be used to apply the plugin
            <div id="draggablediv" class="map"> 																									//the map will be dragged inside this div
                  <div id="zooming" name="zooming" >  																						//this div will enable the map to be zoomed in-out
                      <img class="resize" src="/maps/1.png?1" id="map">														//bitmap to be used as map, after this, map elements can be added. Elements can have any action attached to interact with elements outside the map or perform actions(onclick, onmousenter, etc)
                      <p id="<prefix>+'_circle'+<sufix>" style="top:<Y>px; left:<X>px;"></p>			//floating element (circle), "id" will be a prefix+'_circle'+sufix, where sufix is usually an index from a database, X and Y coordinates will mark its position on the bitmap, (0,0) origin is on the upper left corner of the bitmap.
                      <img class="m_elementx" id="<prefix+'_togletableb'+sufix>" src="<img_url>"
                         style="top:<Y>px; left:<X>px;" > 																				//floating element (image), "id" will be a prefix+'_circle'+sufix, where sufix is usually an index from a database. Usually represent icons used to toggle actions. More images can be added one on top of another using z-index starting at 53
                      <custom element>																														//adding a custom element, beware, it needs to be position:fixed and at a z-index between 40-48 (below map elements), or above 100 (to overlay all map elements)

                  </div>
            </div>
      </div>

      Recomended index structure (z-index):
        div to obscure the map to focus on the element(s): 48 (setting the element with hiddendiv class and using the css file will set this up automatically)
        map elements: 50 (if using the css file, this will be set up automatically)
        map bitmap: below 40 (or dont set up, it will have a default z-index=1)

      APPLY THE plugin

      let mymap = new interactiveMap('<mymapbox>','<prefix>');


*/

zoomFactor=0;

export class interactiveMap {
      constructor(mapBox,prefix){
          this.mapBox=mapBox;
          this.prefix=prefix;
          var tempname = '#'+mapBox+' > #draggablediv';
          this.draggableDiv = $(tempname);
          console.log(this.draggableDiv);
          tempname = tempname + ' > #zooming';
          this.zoomingDiv = $(tempname);
          var svgs=  tempname;
          tempname = tempname +' > #map';
          this.mapDiv = $(tempname);
          this.zoomingDiv.draggable();
          this.imgWidth=this.mapDiv.width();
          this.imgHeight=this.mapDiv.height();
          this.draggabledivw=this.draggableDiv.width();
          this.draggabledivh=this.draggableDiv.height();
          this.zoomfactor = 1;
          zoomFactor = this.zoomfactor;
          this.supportOffset = window.pageYOffset !== undefined;
          this.lastKnownPos = 0;
          this.ticking = false;
          this.currentWidth=this.mapDiv.width();
          this.currentHeight=this.mapDiv.height();
          this.scrollDir='';
          svgs = svgs +' > svg ';
          this.svgBox= $(svgs);
          svgs = svgs +' > line ';
          this.lines=$(svgs);
          var that = this;
          console.log("starting map");
          return that.start();
      }

      resetImageSize(){
        var that = this;

        var tempname = '#map';
        let imgDiv = $(tempname);
        console.log("img div");
        console.log(imgDiv);
        var tempObjt;

        var imgSrc = $(imgDiv).attr("src");
        console.log("img src");
        console.log(imgSrc);
        var newImg = new Image();
        var height;
        var width;
        console.log("get img size");
        newImg.onload = function() {
          //that.positionMap("down");
          that.resetZoom(1);
          height = newImg.height;
          width = newImg.width;
          that.imgWidth = width;
          that.imgHeight = height;
          that.zoomfactor = 1;
          console.log('The image size is '+that.imgWidth+'*'+that.imgHeight);
          var mapBox='#'+that.mapBox;
          var prefix=that.prefix;
          var draggableDiv=that.draggableDiv;
          var zoomingDiv=that.zoomingDiv ;
          var mapDiv=that.mapDiv ;
          mapDiv.width(that.imgWidth);
          mapDiv.height(that.imgHeight);
          that.start();
          let scrolloffset = mapDiv.offset();
          let containeroffset = $('#zooming').offset();
          // console.log(scrolloffset);
          let scrollpos_top_offset = mapDiv.height() / 2;
          let scrollpos_left_offset = mapDiv.width() / 2;
          let scrollpos_top = (scrolloffset.top - containeroffset.top)+scrollpos_top_offset;
          let scrollpos_left = (scrolloffset.left - containeroffset.left)+scrollpos_left_offset;
          //alert((scrollpos_top+400)+','+(scrollpos_left+400));
          let top_offset = $('#draggablediv').height() / 2;
          let left_offset = $('#draggablediv').width() / 2;
          $('#zooming').animate({
            top: top_offset - scrollpos_top,
            left: left_offset - scrollpos_left
          }, 50);
        }
        newImg.src = imgSrc; // this must be done AFTER setting onload
      }

      getImgSize(imgSrc) {
          var newImg = new Image();
          var height;
          var width;
          console.log("get img size");
          newImg.onload = function() {
            height = newImg.height;
            width = newImg.width;
            console.log('The image size is '+width+'*'+height);
          }
          newImg.src = imgSrc; // this must be done AFTER setting onload
          var localObjt = { height: height , width:width };
          return localObjt;
      }

      attachDragger( element ){
          var attachment = false, lastPosition, position, difference;
          element.on("mousedown mouseup mousemove",function(e){
              if( e.type == "mousedown" ) attachment = true, lastPosition = [e.clientX, e.clientY];
              if( e.type == "mouseup" ) attachment = false;
              if( e.type == "mousemove" && attachment == true ){
                  position = [e.clientX, e.clientY];
                  difference = [ (position[0]-lastPosition[0]), (position[1]-lastPosition[1]) ];
                  element.scrollLeft( element.scrollLeft() - difference[0] );
                  element.scrollTop( element.scrollTop() - difference[1] );
                  this.lastPosition = [e.clientX, e.clientY];
              }
          });
          $(window).on("mouseup", function(){
              attachment = false;
          });
      }

      positionMap(scrollDir){
            var mapBox='#'+this.mapBox;
            var prefix=this.prefix;
            var draggableDiv=this.draggableDiv;
            var zoomingDiv=this.zoomingDiv ;
            var mapDiv=this.mapDiv ;
              this.currentWidth=mapDiv.width();
              this.currentHeight=mapDiv.height();

              var zoomcenter= zoomingDiv.offset();
              var draggabledivcenter= draggableDiv.offset();
              var zoomcY= (zoomcenter.top-draggabledivcenter.top)/this.currentHeight;
              var zoomcX =(zoomcenter.left-draggabledivcenter.left)/this.currentWidth;
              if(scrollDir=="up" && this.currentWidth<10000  && this.currentHeight<10000 ){

                mapDiv.css({ width: function( index, value ) {
                              return parseFloat( value ) * 1.1;  },
                              height: function( index, value ) {
                              return parseFloat( value ) * 1.1;
                            }
                          });
                          this.svgBox.css({ width: function( index, value ) {
                                        return parseFloat( value ) * 1.1;  },
                                        height: function( index, value ) {
                                        return parseFloat( value ) * 1.1;
                                      }
                                      });
                $('[id^='+prefix+'_circle]').css({ left: function( index, value ) {
                              return parseFloat( value ) * 1.1;  },
                              top: function( index, value ) {
                              return parseFloat( value ) * 1.1;
                            }
                            });
                $('[id^='+prefix+'_togletableb]').css({ left: function( index, value ) {
                              return parseFloat( value ) * 1.1;  },
                              top: function( index, value ) {
                              return parseFloat( value ) * 1.1;
                            }
                          });
              this.lines.each(function( index ) {
                var moveline= $( this );
                var x1 = moveline.attr( "x1" ),
                    y1 = moveline.attr( "y1" ),
                    x2 = moveline.attr( "x2" ),
                    y2 = moveline.attr( "y2" );
                moveline
                    .attr('x1', x1*1.1)
                    .attr('y1', y1*1.1)
                    .attr('x2', x2*1.1)
                    .attr('y2', y2*1.1);
              });


                var newWidth=mapDiv.width();
                var newHeight=mapDiv.height();
                this.zoomfactor = newWidth/this.imgWidth;
                zoomFactor = this.zoomfactor;
                var newLeftOffset= (newWidth * zoomcX)-0.05*this.draggabledivw;
                var newTopOffset= (newHeight * zoomcY)-0.05*this.draggabledivh;
                zoomingDiv.css({ left: newLeftOffset,
                              top: newTopOffset
                            });
              }
              else if(scrollDir=="down" && this.currentWidth>300 && this.currentHeight>300){
                var offset= $("#zooming").offset();
                var offsetTop= offset.top+(newHeight/2);
                var offsetLeft=offset.left+(newWidth/2);

                mapDiv.css({ width: function( index, value ) {
                              return parseFloat( value ) * 0.9;  },
                              height: function( index, value ) {
                              return parseFloat( value ) * 0.9;
                            }
                          });
             this.svgBox.css({ width: function( index, value ) {
                                        return parseFloat( value ) * 0.9;  },
                                        height: function( index, value ) {
                                        return parseFloat( value ) * 0.9;
                                      }
                                      });
                $('[id^='+prefix+'_circle]').css({ left: function( index, value ) {
                              return parseFloat( value ) * 0.9;  },
                              top: function( index, value ) {
                              return parseFloat( value ) * 0.9;
                            }
                            });
                $('[id^='+prefix+'_togletableb]').css({ left: function( index, value ) {
                              return parseFloat( value ) * 0.9;  },
                              top: function( index, value ) {
                              return parseFloat( value ) * 0.9;
                            }
                          });
              this.lines.each(function( index ) {
                            var moveline= $( this );
                            var x1 = moveline.attr( "x1" ),
                                y1 = moveline.attr( "y1" ),
                                x2 = moveline.attr( "x2" ),
                                y2 = moveline.attr( "y2" );
                            moveline
                                .attr('x1', x1*0.9)
                                .attr('y1', y1*0.9)
                                .attr('x2', x2*0.9)
                                .attr('y2', y2*0.9);
              });

                var newWidth=mapDiv.width();
                var newHeight=mapDiv.height();
                this.zoomfactor = newWidth/this.imgWidth;
                zoomFactor = this.zoomfactor;
                var newLeftOffset= (newWidth * zoomcX)+0.05*this.draggabledivw;
                var newTopOffset= (newHeight * zoomcY)+0.05*this.draggabledivh;
                zoomingDiv.css({ left: newLeftOffset,
                              top: newTopOffset
                            });
              }
          }


          start(){
            var mapBox=this.mapBox;
            var prefix=this.prefix;
            var draggableDiv=this.draggableDiv;
            var zoomingDiv=this.zoomingDiv ;
            var mapDiv=this.mapDiv ;
            this.attachDragger(mapDiv);

            var currentWidth=mapDiv.width();
            var currentHeight=mapDiv.height();

            var zoomcenter= zoomingDiv.offset();
            var draggabledivcenter= draggableDiv.offset();
            var zoomcY= (zoomcenter.top-draggabledivcenter.top)/this.currentHeight;
            var zoomcX =(zoomcenter.left-draggabledivcenter.left)/this.currentWidth;
            if(this.imgHeight==0 || this.imgWidth==0){
              console.log("Dynamic Maps: invalid parameters>");
              console.log("zoomx="+zoomcX+" . zoomy="+zoomcY+" > H:"+this.imgHeight+" . W:"+this.imgWidth+" > Zx:"+zoomcenter.left+" . Zy:"+zoomcenter.top+" . currentWidth="+this.currentWidth+" . currentHeight="+this.currentHeight);
              console.log("reloading");
              return -1;
            }
            console.log("zoomx="+zoomcX+" . zoomy="+zoomcY+" > H:"+this.imgHeight+" . W:"+this.imgWidth+" > Zx:"+zoomcenter.left+" . Zy:"+zoomcenter.top+" . currentWidth="+this.currentWidth+" . currentHeight="+this.currentHeight);


              mapDiv.css({ width: function( index, value ) {
                            return parseFloat( value ) * 1;  },
                            height: function( index, value ) {
                            return parseFloat( value ) * 1;
                          }
                        });
                        this.svgBox.css({ width: function( index, value ) {
                                      return parseFloat( value ) * 1;  },
                                      height: function( index, value ) {
                                      return parseFloat( value ) * 1;
                                    }
                                    });
              $('[id^='+prefix+'_circle]').css({ left: function( index, value ) {
                            return parseFloat( value ) * 1;  },
                            top: function( index, value ) {
                            return parseFloat( value ) * 1;
                          }
                          });
              $('[id^='+prefix+'_togletableb]').css({ left: function( index, value ) {
                            return parseFloat( value ) * 1;  },
                            top: function( index, value ) {
                            return parseFloat( value ) * 1;
                          }
                        });
                        this.lines.each(function( index ) {
                          var moveline= $( this );
                          var x1 = moveline.attr( "x1" ),
                              y1 = moveline.attr( "y1" ),
                              x2 = moveline.attr( "x2" ),
                              y2 = moveline.attr( "y2" );
                          moveline
                              .attr('x1', x1*1)
                              .attr('y1', y1*1)
                              .attr('x2', x2*1)
                              .attr('y2', y2*1);
                        });


              var newWidth=mapDiv.width();
              var newHeight=mapDiv.height();
              var newLeftOffset= (newWidth * zoomcX)-0*this.draggabledivw;
              var newTopOffset= (newHeight * zoomcY)-0*this.draggabledivh;

              zoomingDiv.css({ left: newLeftOffset,
                            top: newTopOffset
                          });

              mapDiv.css({ width: function( index, value ) {
                            return parseFloat( value ) * 1;  },
                            height: function( index, value ) {
                            return parseFloat( value ) * 1;
                          }
                        });
                        this.svgBox.css({ width: function( index, value ) {
                                      return parseFloat( value ) * 1;  },
                                      height: function( index, value ) {
                                      return parseFloat( value ) * 1;
                                    }
                                    });
              $('[id^='+prefix+'_circle]').css({ left: function( index, value ) {
                            return parseFloat( value ) * 1;  },
                            top: function( index, value ) {
                            return parseFloat( value ) * 1;
                          }
                          });
              $('[id^='+prefix+'_togletableb]').css({ left: function( index, value ) {
                            return parseFloat( value ) * 1;  },
                            top: function( index, value ) {
                            return parseFloat( value ) * 1;
                          }
                        });
                        this.lines.each(function( index ) {
                          var moveline= $( this );
                          var x1 = moveline.attr( "x1" ),
                              y1 = moveline.attr( "y1" ),
                              x2 = moveline.attr( "x2" ),
                              y2 = moveline.attr( "y2" );
                          moveline
                              .attr('x1', x1*1)
                              .attr('y1', y1*1)
                              .attr('x2', x2*1)
                              .attr('y2', y2*1);
                        });


              var newWidth=mapDiv.width();
              var newHeight=mapDiv.height();
              var newLeftOffset= (newWidth * zoomcX)-0*this.draggabledivw;
              var newTopOffset= (newHeight * zoomcY)-0*this.draggabledivh;

              var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
              var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
              console.log("portsize: w:"+w+" ::: h: "+h);
              var scaleFactorContainer = w/h;
              var scaleFactorImg = this.imgWidth / this.imgHeight;

              if(scaleFactorContainer < scaleFactorImg){
                  this.zoomfactor = h/this.imgHeight;
                  zoomFactor = this.zoomfactor;
                  console.log("h>w ::: zoom="+this.zoomfactor);
              }
              else {
                  this.zoomfactor = w/this.imgWidth;
                  zoomFactor = this.zoomfactor;
                  console.log("h<=w ::: zoom="+this.zoomfactor);
              }
              zoomingDiv.css({
                            left: newLeftOffset,
                            top: newTopOffset
                          });


              this.currentWidth=mapDiv.width();
              this.currentHeight=mapDiv.height();
              var window_witdh = $( window ).width();
              var factor =this.zoomfactor;
              zoomFactor = this.zoomfactor;

              zoomcenter= zoomingDiv.offset();
              draggabledivcenter= draggableDiv.offset();
              zoomcY= (zoomcenter.top-draggabledivcenter.top)/this.currentHeight;
              zoomcX =(zoomcenter.left-draggabledivcenter.left)/this.currentWidth;
              console.log("zoomx="+zoomcX+" . zoomy="+zoomcY+" > H:"+this.currentHeight+" . W:"+this.currentWidth+" > Zx:"+zoomcenter.left+" . Zy:"+zoomcenter.top+" . currentWidth="+this.currentWidth+" . currentHeight="+this.currentHeight);


              mapDiv.css({ width: function( index, value ) {
                            return parseFloat( value ) * factor;  },
                            height: function( index, value ) {
                            return parseFloat( value ) * factor;
                          }
                        });
                        this.svgBox.css({ width: function( index, value ) {
                                      return parseFloat( value ) * factor;  },
                                      height: function( index, value ) {
                                      return parseFloat( value ) * factor;
                                    }
                                    });

              $('[id^='+prefix+'_circle]').css({ left: function( index, value ) {
                            return parseFloat( value ) * factor;  },
                            top: function( index, value ) {
                            return parseFloat( value ) * factor;
                          }
                          });
              $('[id^='+prefix+'_togletableb]').css({ left: function( index, value ) {
                            return parseFloat( value ) * factor;  },
                            top: function( index, value ) {
                            return parseFloat( value ) * factor;
                          }
                        });
                        this.lines.each(function( index ) {
                          var moveline= $( this );
                          var x1 = moveline.attr( "x1" ),
                              y1 = moveline.attr( "y1" ),
                              x2 = moveline.attr( "x2" ),
                              y2 = moveline.attr( "y2" );
                          moveline
                              .attr('x1', x1*factor)
                              .attr('y1', y1*factor)
                              .attr('x2', x2*factor)
                              .attr('y2', y2*factor);
                        });


              newWidth=mapDiv.width();
              newHeight=mapDiv.height();
              newLeftOffset= (newWidth * zoomcX)-0*this.draggabledivw;
              newTopOffset= (newHeight * zoomcY)-0*this.draggabledivh;
              var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
              var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
              console.log("portsize: w:"+w+" ::: h: "+h);
              if(scaleFactorContainer < scaleFactorImg){
                  this.zoomfactor = h/this.imgHeight;
                  zoomFactor = this.zoomfactor;
                  console.log("h>w ::: zoom="+this.zoomfactor);
              }
              else {
                  this.zoomfactor = w/this.imgWidth;
                  zoomFactor = this.zoomfactor;
                  console.log("h<=w ::: zoom="+this.zoomfactor);
              }
              zoomingDiv.css({ left: newLeftOffset,
                            top: newTopOffset
                          });
              var onthis = this;
              document.getElementById(this.mapBox).addEventListener('wheel', function(e) {
                          onthis.currYPos = onthis.supportOffset ? window.pageYOffset : document.body.scrollTop;
                          onthis.lastKnownPos = onthis.currYPos;
                          if (e.deltaY < 0) {
                            onthis.scrollDir='up';
                          }
                          else {
                            onthis.scrollDir='down';
                          }
                          if (!onthis.ticking) {
                            window.requestAnimationFrame(function() {
                            onthis.positionMap(onthis.scrollDir);
                            onthis.ticking = false;
                            });
                          }
                          onthis.ticking = true;
              });
              return 1;
          }

          resetZoom(applyFactor){
                var mapBox='#'+this.mapBox;
                var prefix=this.prefix;
                var draggableDiv=this.draggableDiv;
                var zoomingDiv=this.zoomingDiv ;
                var mapDiv=this.mapDiv ;
                  this.currentWidth=mapDiv.width();
                  this.currentHeight=mapDiv.height();

                  var zoomcenter= zoomingDiv.offset();
                  var draggabledivcenter= draggableDiv.offset();
                  var zoomcY= (zoomcenter.top-draggabledivcenter.top)/this.currentHeight;
                  var zoomcX =(zoomcenter.left-draggabledivcenter.left)/this.currentWidth;

                  var newFactor = applyFactor/this.zoomfactor;
                  console.log("reset factor "+applyFactor);
                    mapDiv.css({ width: function( index, value ) {
                                  return parseFloat( value ) * newFactor;  },
                                  height: function( index, value ) {
                                  return parseFloat( value ) * newFactor;
                                }
                              });
                              this.svgBox.css({ width: function( index, value ) {
                                            return parseFloat( value ) * newFactor;  },
                                            height: function( index, value ) {
                                            return parseFloat( value ) * newFactor;
                                          }
                                          });
                    $('[id^='+prefix+'_circle]').css({ left: function( index, value ) {
                                  return parseFloat( value ) * newFactor;  },
                                  top: function( index, value ) {
                                  return parseFloat( value ) * newFactor;
                                }
                                });
                    $('[id^='+prefix+'_togletableb]').css({ left: function( index, value ) {
                                  return parseFloat( value ) * newFactor;  },
                                  top: function( index, value ) {
                                  return parseFloat( value ) * newFactor;
                                }
                              });
                  this.lines.each(function( index ) {
                    var moveline= $( this );
                    var x1 = moveline.attr( "x1" ),
                        y1 = moveline.attr( "y1" ),
                        x2 = moveline.attr( "x2" ),
                        y2 = moveline.attr( "y2" );
                    moveline
                        .attr('x1', x1*newFactor)
                        .attr('y1', y1*newFactor)
                        .attr('x2', x2*newFactor)
                        .attr('y2', y2*newFactor);
                  });


                    var newWidth=mapDiv.width();
                    var newHeight=mapDiv.height();
                    this.zoomfactor = newWidth/this.imgWidth;
                    zoomFactor = this.zoomfactor;
                    var newLeftOffset= (newWidth * zoomcX)-0.05*this.draggabledivw;
                    var newTopOffset= (newHeight * zoomcY)-0.05*this.draggabledivh;
                    zoomingDiv.css({ left: newLeftOffset,
                                  top: newTopOffset
                                });


              }
}
