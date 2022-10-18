<template>
  <PageComponent title="Dashboard">
    Content Goes Here
  </PageComponent>
</template>



<script setup>
import { onMounted } from "vue";
import PageComponent from "../components/PageComponent.vue"
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
  console.log(store.state.user);
})

</script>



<style>

</style>