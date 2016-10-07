app.controller('MapCtrl', function ($scope, geoLocationFactory, $http) {

  var map;

  function creatingMarker (pos, title) {
    var newMarker = new google.maps.Marker({
      position: pos,
      map: map,
      title: title,
      mapTypeControl: false
    });
    return newMarker;
  }


  function initMap() {
    geoLocationFactory.updateLocation
      .then(function (position) {
        return position.coords
      })
      .then(function (coords) {
        var currentPos = {
          lat: coords.latitude,
          lng: coords.longitude
        }

        var styles = {
          default: null,
          hide: [{
            featureType: 'poi.business',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{
              visibility: 'off'
            }]
          }]
        };

        map = new google.maps.Map(document.getElementById('map'), {
          center: currentPos,
          zoom: 17,
          styles: styles['hide']
        })

        var currentMarker = creatingMarker(currentPos, 'current Location');

        // var marker = new google.maps.Marker({
        //   position: currentPos,
        //   map: map,
        //   title: 'Current Location',
        //   mapTypeControl: false
        // })

        return $http.get(`/api/locations/ping/${coords.longitude}/${coords.latitude}`)
      })
        .then(function(drawings) {

          for (var i = 0; i < drawings.data.length; i++) {
            var pos = {lat: drawings.data[i].latitude, lng: drawings.data[i].longitude};
            var title = 'randomTitle'
            creatingMarker(pos, title);
          }


        })


  }

  initMap();

});