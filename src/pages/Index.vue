<template>
  <div v-for="(board, i) in boards" :key="i">{{ board.id }} - {{ board.name }}</div>
  <div class="card">
    <input v-model="boardName" type="text" placeholder="Board name" />
    <button type="button" @click="onAddBoard">Add board</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { supabase } from '../client';
import { Board } from '../types/domain-models.ts';

const boards = ref<Array<Board>>([]);

onMounted(async () => {
  const { data } = await supabase.from('board').select();
  boards.value = data ?? [];

  supabase
    .channel('any')
    .on<Board>('postgres_changes', { event: '*', schema: 'public', table: 'board' }, payload => {
      if ('id' in payload.new) {
        boards.value = [...(boards.value ?? []), payload.new];
      }
    })
    .subscribe();
});

const boardName = ref('');
const onAddBoard = async () => {
  supabase.from('board').insert({ name: boardName.value });
};
</script>
