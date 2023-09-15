<template>
  <div class="max-w-xl mx-auto my-10 flex flex-col gap-y-4">
    <h1>Digiboard</h1>

    <hr class="my-4 border-primary-400" />

    <div class="border-2 flex flex-col rounded-sm py-4 px-8 gap-y-2">
      <h3>Create board</h3>
      <div class="flex gap-x-4">
        <input v-model="boardName" type="text" class="grow rounded-sm pl-2" placeholder="Board name" />
        <Button type="button" @click="onAddBoard">Add</Button>
      </div>
    </div>

    <div class="flex flex-col gap-y-2">
      <div v-for="(board, i) in boards" :key="i" class="rounded-sm border-primary-800 py-4 px-8 border-2">
        <router-link :to="`/${board.id}`">
          <div class="flex justify-between items-center">
            <h4 class="font-body-bold">{{ board.name }}</h4>
            <Button>Join</Button>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { supabase } from '../client';
import { createBoard, getBoard } from '@/services/digiboard.service.ts';
import Button from '@/components/button/Button.vue';

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
