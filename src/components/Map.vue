<script>
// import
import { onMounted, ref, watchEffect } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import * as config from "../../config.json";

export default {
  name: "mapView",
  props: ["userCoordinate", "markersPosition"],
  setup(props) {
    const map = ref(null);
    
    const loader = new Loader({
      apiKey: config.GOOGLE_MAP_API_KEY,
    });

    const mapOptions = {
      center: props.userCoordinate.geometry,
      zoom: 7,
      mapId: "my_map",
    };

    // scan through every point in the list to add a marker
    const addMarker = async () => {
      const { Marker } = await loader.importLibrary("marker");
      props.markersPosition.forEach((mark) => {
        if(!mark.marker) {          
          const marker = new Marker({
            map: map.value,
            position: mark.geometry,
            animation: google.maps.Animation.DROP,
          });
          mark.marker = marker
        }
      });
    };

    onMounted(async () => {
      const { Map } = await loader.importLibrary("maps");
      map.value = new Map(document.getElementById("map"), mapOptions);
    });

    watchEffect(() => {
      if (map.value) {
        map.value.panTo(props.userCoordinate.geometry);
        map.value.setZoom(7);
      }
      addMarker()
    });
  
  },
};
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
