<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '../client';
defineProps<{ msg: string }>();

const boards = ref<any[] | null>([]);

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

const boardName = ref('');
const onAddBoard = async () => {
  supabase
    .from('board')
    .insert({ name: boardName.value });
};

</script>

<template>
  <h1>{{ msg }}</h1>

  <div
    v-for="(board, i) in boards"
    :key="i"
  >
    {{ board.id }} - {{ board.name }}
  </div>

  <div class="card">
    <input
      type="text"
      v-model="boardName"
      placeholder="Board name"
    />
    <button
      type="button"
      @click="onAddBoard"
    >Add board</button>
  </div>
</template>