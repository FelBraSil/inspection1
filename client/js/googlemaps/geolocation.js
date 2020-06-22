

  Template.map2.onCreated(function() {

      var x = document.getElementById("map-container");
      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPositionx);
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }

      function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
      }


      function showError(error) {
        switch(error.code) {
        case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation."
          break;
        case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable."
          break;
        case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred."
          break;
        }
      }

      function showPositionx(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x400&sensor=true&markers=color:black|label:L|"+latlon+"&key=AIzaSyD3H0Wpd9pksPbSh6LlYVgR_r_DrJ3bzMg";
        document.getElementById("map-container").innerHTML = "<img style='width:100%' src='"+img_url+"'>";
      }
      getLocation();
  });

  Template.map2.helpers({
  });
