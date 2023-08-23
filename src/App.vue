<script>
// import
import { computed, ref, watchEffect, reactive, toRaw } from "vue";
import { getGeolocation } from "./js/getGeolocation";
import Map from "./components/Map.vue";
import List from "./components/List.vue";
import SearchLocation from "./components/SearchLocation.vue";

export default {
  name: "app",
  components: { Map, List, SearchLocation },
  setup() {

    const userPosition = ref({name: '', geometry: { lat: 0, lng: 0 }})
    const markersPosition = reactive([])
    const { coords } = getGeolocation();

    const currPosition = computed(() => ({
      name: '',
      geometry: {
        lat: coords.value.latitude,
        lng: coords.value.longitude
      }
    }));

    const updatePosition = (newVal) => {
      userPosition.value = newVal
      markersPosition.push(newVal)
    }

    const removePosition = (items) => {
      items.forEach((item) => {
        const markIdx = markersPosition.indexOf(item)
        toRaw(markersPosition[markIdx].marker).setMap(null)
        markersPosition.splice(markIdx, 1)
      })
    }

    watchEffect(() => {
      if(currPosition.value) {
        userPosition.value = currPosition.value
      }
    })

    return {
      userPosition,
      markersPosition,
      removePosition,
      updatePosition
    };
  },
};
</script>

<template>
  <v-app>
    <v-responsive style="min-width: 500px;">
      <v-container class="fill-height">
        <v-row class="fill-height">
          <v-col cols="3" >
            <v-sheet class="d-flex flex-column fill-height elevation-2 border-1 rounded">
              <SearchLocation @update-event="updatePosition"></SearchLocation>
              <List @remove-marker="removePosition" class="fill-height" :searchedItems="markersPosition"></List>
            </v-sheet>
          </v-col>
          <v-col>
            <Map :userCoordinate="userPosition" :markersPosition="markersPosition"></Map>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </v-app>
</template>

<style>
</style>
