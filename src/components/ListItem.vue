<script>
    export default {
        name: 'listItem',
        props: ['searchedItem', 'selectedItems', 'key'],
        emits: ['selected-item'],
        setup(props, { emit }) {

            const updateSelected = (item) => {
                emit('selected-item', item)
            }

            return {
                props,
                updateSelected
            }

        }
    }
</script>

<template>
    <v-list-item>
        <template v-slot:prepend="{ isActive }">
            <v-list-item-action>
            <v-checkbox-btn v-model="props.searchedItem.checked"  @change="updateSelected(props.searchedItem)"></v-checkbox-btn>
            </v-list-item-action>
        </template>

        <v-list-item-title>{{ props.searchedItem.name }}</v-list-item-title>
        <v-list-item-subtitle>
            Latitude: {{ props.searchedItem.geometry.lat.toFixed(3) }}, Longitude: {{ props.searchedItem.geometry.lng.toFixed(3) }} 
            <v-spacer></v-spacer>
            <small>Time Zone: {{ props.searchedItem.timeZone }}</small>
            <v-spacer></v-spacer>
            <small>Local Time: {{ props.searchedItem.localTime }}</small>
        </v-list-item-subtitle>
    </v-list-item>
</template>

<style>

</style>