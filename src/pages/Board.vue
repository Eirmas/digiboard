<template>
  <div class="max-w-[1000px] mx-auto my-10 flex flex-col gap-y-4">
    <h1>Board</h1>

    <hr class="my-4 border-primary-400" />
    <div class="grid">
      <div v-for="(group, i) in [good, bad, action]" :key="i" class="grid-item">
        <div v-for="note in group" :key="note.id">
          <Note :text="note.text" :type="note.type" :visible="note.visible"></Note>
        </div>
        <Note :type="getNoteType(i)" @add="onAddNote($event, getNoteType(i))"></Note>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { createNote, getNotesByBoardId } from '@/services/digiboard.service.ts';
import { onMounted, ref } from 'vue';
import { NoteType } from '@/components/note/types.ts';
import { Note as INote } from '@/types/domain-models';
import Note from '@/components/note/Note.vue';
import { supabase } from '@/client';

const route = useRoute();
const good = ref<Array<INote>>([]);
const bad = ref<Array<INote>>([]);
const action = ref<Array<INote>>([]);
const id = parseInt(route.params.id as string);

const getNoteType = (i: number) => {
  return Object.values(NoteType)[i];
};

onMounted(async () => {
  const notes = await getNotesByBoardId(id);

  setNotes(notes);

  supabase
    .channel(id.toString())
    .on<INote>('postgres_changes', { event: '*', schema: 'public', table: 'note' }, payload => {
      if ('id' in payload.new && payload.new.board_id === id) {
        const note = payload.new as INote;
        setNotes([...good.value, ...bad.value, ...action.value, note]);
      }
    })
    .subscribe();
});

const setNotes = (notes: INote[]) => {
  good.value = notes.filter(note => note.type === NoteType.GOOD);
  bad.value = notes.filter(note => note.type === NoteType.BAD);
  action.value = notes.filter(note => note.type === NoteType.ACTION);
};

const onAddNote = (text: string, type: NoteType) => {
  createNote({
    board_id: id,
    text,
    type,
  });
};
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
  text-align: left;

  > div {
    margin-bottom: 8px;
  }
}
</style>
