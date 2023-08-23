<script>
    import { reactive, computed, ref } from 'vue'
    import ListItem from '../components/ListItem.vue'

    export default {
    name: 'list',
    components: { ListItem },
    props: ['markersPosition'],
    emits: ['remove-marker'],
    setup(props, { emit }) {
        const itemsPerPage = 10
        const currentPage = ref(1)

        const state = reactive({
            items: props.markersPosition,
            searchedRecords: [],
            selectedItems: []
        })

        const totalPage = computed(() => {
            return Math.ceil(state.items.length / itemsPerPage)
        })

        const onPageChanged = (page) => {
            currentPage.value = page
        }

        const updateSelectedItems = (item) => {
            if(!item.checked) {
                state.selectedItems.splice(state.selectedItems.indexOf(item), 1)
            }
            state.selectedItems.push(item)
        }

        const delSelectedItems = () => {
            const checkedItems = state.selectedItems.filter((item) => item.checked)
            emit('remove-marker', checkedItems)
            // state.selectedItems.forEach((item) => {
            //     if (item.checked) {
            //         emit('remove-marker', item)
            //     }
            // })
            state.selectedItems = []
        }
        
        state.searchedRecords = computed(() => {
            const startIdx = (currentPage.value - 1) * (itemsPerPage)
            const endIdx = startIdx + itemsPerPage
            return state.items.slice(startIdx, endIdx).reverse()
        })

        return { currentPage, itemsPerPage, state, totalPage, onPageChanged, updateSelectedItems, delSelectedItems }
    }
}
</script>

<template>
    <v-container class="pa-0 ma-0 h-100 d-flex flex-column">

        <v-list lines="three" rouned="xl" class="pa-0 overflow-y-auto w-100 flex-grow-1" style="max-height: 75vh;">
            <v-list-item v-for="record in state.searchedRecords">
                <ListItem @selected-item="updateSelectedItems" :record="record" :selectedItem="state.selectedItems"></ListItem>
            </v-list-item>
        </v-list>
        <v-pagination :total-visible="7" :length="totalPage" v-model="currentPage" @input="onPageChanged"></v-pagination>
        <v-divider></v-divider>
        <v-btn class="mt-4 w-100" color="error" prepend-icon="mdi-delete" @click="delSelectedItems">Remove selected records</v-btn>
    </v-container>
</template>

<style>
    
</style>