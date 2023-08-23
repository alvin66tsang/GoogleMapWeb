<script>
    export default { 
        props: ['responseMsg'],
        setup(props) {
            return {
                props
            }
        }
    }
</script>

<template>
    <v-alert closable variant="tonal" type="error" :text="props.responseMsg"></v-alert>
</template>

<style></style>