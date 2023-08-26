<script>
    export default {
        name: 'listItem',
        props: ['record'],
        setup(props) {

            return {
                props,
            }

        }
    }
</script>

<template>
    <v-list-item>
        <template v-slot:prepend="{ isActive }">
            <v-list-item-action>
            <v-checkbox-btn v-model="props.record.checked" ></v-checkbox-btn>
            </v-list-item-action>
        </template>

        <v-list-item-title class="text-wrap">{{ props.record.name }}</v-list-item-title>
        <v-list-item-subtitle>
            Latitude: {{ props.record.geometry.lat.toFixed(3) }}, Longitude: {{ props.record.geometry.lng.toFixed(3) }} 
            <v-spacer></v-spacer>
            <small>Time Zone: {{ props.record.timeZone }}</small>
            <v-spacer></v-spacer>
            <small>Local Time: {{ props.record.localTime }}</small>
        </v-list-item-subtitle>
    </v-list-item>
</template>

<style>

</style>