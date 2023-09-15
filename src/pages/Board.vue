<template>
  <h1>Board</h1>
  <div class="grid">
    <div v-for="note in notes" :key="note.id" class="grid-item">
      {{ note?.text }}
    </div>
  </div>
</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {getNotesByBoardId} from "@/services/digiboard.service.ts";

const route = useRoute();
const id = parseInt(route.params.id as string);
console.log(id);
const notes = await getNotesByBoardId(id);
console.log(notes);

</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Create 3 columns */
  grid-gap: 10px; /* Adjust the gap between grid items */
}

.grid-item {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
</style>
