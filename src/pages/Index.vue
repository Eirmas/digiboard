<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '../client';
defineProps<{ msg: string }>();

const boards = ref<any[] | null>([]);
const boardName = ref('');

onMounted(async () => {
  const { data } = await supabase
    .from('board')
    .select();
  boards.value = data;

  supabase
    .channel('any')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'board' }, payload => {
      console.log('Change received!', payload.new)
      boards.value = [...boards.value ?? [], payload.new];
    })
    .subscribe()

});

const onAddBoard = async () => {
  supabase
    .from('board')
    .insert({ name: boardName.value });
};
</script>

<template>
  <h1>Boards</h1>

  <div>
    <h2>Add new board</h2>
    <div>
      <input
        type="text"
        v-model="boardName"
        placeholder="Board name"
      />
    </div>
    <div>
      <button
        type="button"
        @click="onAddBoard"
      >Add</button>
    </div>

  </div>

  <div class="container">

    <div
      v-for="(board, i) in boards"
      :key="i"
      class="board"
    >
      <router-link :to="`/${board.id}`">{{ board.name }}</router-link>
    </div>
  </div>
</template>

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
