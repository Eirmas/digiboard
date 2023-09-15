<template>
  <Note></Note>
  <h1>Boards</h1>

  <div>
    <h2>Add new board</h2>
    <div>
      <input v-model="boardName" type="text" placeholder="Board name" />
    </div>
    <div>
      <button type="button" @click="onAddBoard">Add</button>
    </div>
  </div>

  <div class="container">
    <div v-for="(board, i) in boards" :key="i" class="board">
      <router-link :to="`/${board.id}`">{{ board.name }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { supabase } from '../client';
import {createBoard, getBoard} from "@/services/digiboard.service.ts";

defineProps<{ msg: string }>();

const boards = ref<any[] | null>([]);
const boardName = ref('');

onMounted(async () => {
  boards.value = await getBoard();

  supabase
    .channel('any')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'board' }, payload => {
      console.log('Change received!', payload.new);
      boards.value = [...(boards.value ?? []), payload.new];
    })
    .subscribe();
});

const onAddBoard = async () => {
  await createBoard({ name: boardName.value });
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.board {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2e2e2;
}
</style>
