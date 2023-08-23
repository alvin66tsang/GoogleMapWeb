import { onMounted, onUnmounted, ref } from "vue"

export function getGeolocation() {

    const coords = ref({ latitude: 0, longitude: 0 })
    // check if the geo api is support when we access
    const isSupported = 'navigator' in window && 'geolocation' in navigator

    navigator.geolocation.getCurrentPosition((position) => {
        coords.value = position.coords
    })


    // let watcher
    // onMounted(() => {
    //     // tracking the user position
    //     watcher = navigator.geolocation.watchPosition((position) => {
    //         coords.value = position.coords
    //     })
    // })

    // onUnmounted(() => {
    //     if(watcher) navigator.geolocation.clearWatch(watcher)
    // })

    return { coords, isSupported }
}