<script>
// import
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";
import * as config from "../../config.json";

export default {
  emits: ["update-event"],
  setup(props, { emit }) {
    const searchVal = ref("");
    const responseMsg = ref("");
    let autoCompleteInput = ref(null);

    const loader = new Loader({
      apiKey: config.GOOGLE_MAP_API_KEY,
    });

    const fetechFromGoogleTimeZoneApi = async (location) => {
      const currentTimestamp =
        Math.round(new Date() / 1000) + new Date().getTimezoneOffset() * 60;
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${location.geometry.lat}, ${location.geometry.lng}&timestamp=${currentTimestamp}&key=${config.GOOGLE_MAP_API_KEY}`
      );
      const timeZone = data.timeZoneName;
      const localTime = new Date(
        (currentTimestamp + data.rawOffset) * 1000
      ).toLocaleTimeString();

      return { timeZone, localTime };
    };

    const fetchFromGoogleMapApi = async ({ name }) => {
      try {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${config.GOOGLE_MAP_API_KEY}&language=en`
        );
        const result = data.results;
        if (result.length > 0) {
          const { location } = result[0].geometry;
          const locationData = {
            name: result[0].formatted_address,
            geometry: location,
          };
          const { timeZone, localTime } = await fetechFromGoogleTimeZoneApi(locationData);
          locationData.timeZone = timeZone;
          locationData.localTime = localTime;
          emit("update-event", locationData);
          // Reset
          responseMsg.value = "";
          searchVal.value = "";
        } else {
          responseMsg.value = "Location not found. Please search again.";
          searchVal.value = "";
        }
      } catch (error) {
        console.error(error);
      }
    };

    const checkInputType = () => {
      const place = autoCompleteInput.getPlace();
      if (place) {
        if (place.formatted_address)
          fetchFromGoogleMapApi({ name: place.formatted_address });
        else fetchFromGoogleMapApi(place);
      } else {
        fetchFromGoogleMapApi({ name: searchVal.value });
      }
      document.getElementById("mapAutoComplete").value = "";
    };

    onMounted(async () => {
      const { Autocomplete } = await loader.importLibrary("places");
      autoCompleteInput = new Autocomplete(document.getElementById("mapAutoComplete"));
      autoCompleteInput.addListener("place_changed", () => {
        checkInputType();
      });
    });

    return {
      responseMsg,
      searchVal,
      checkInputType,
    };
  },
};
</script>

<template>
  <v-text-field
    id="mapAutoComplete"
    class="searchTextField"
    type="text"
    placeholder="Search any location"
    append-inner-icon="mdi-magnify"
    v-model="searchVal"
    @click:append-inner="checkInputType"
  ></v-text-field>
  <v-expand-transition>
    <h4 v-if="responseMsg" class="msg ml-4 text-red-lighten-1 text-center">
      {{ responseMsg }}
    </h4>
  </v-expand-transition>
</template>

<style></style>
