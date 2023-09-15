<template>
  <div :class="classes">
    <div class="app-note-content">
      <span v-if="hasValue">{{ text }}</span>
      <div v-else>
        <textarea v-model="model" placeholder="Write" @submit="onSubmit"></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import './Note.scss';
import { computed, ref } from 'vue';
import { NoteType } from './types';

const model = ref('');

const emits = defineEmits<{
  (event: 'add', payload: string): void;
}>();

const onSubmit = () => {
  if (model.value.length > 0) {
    emits('add', model.value);
  }
};

const props = withDefaults(
  defineProps<{
    type: NoteType;
    text?: string;
    visible?: boolean;
  }>(),
  {
    type: NoteType.GOOD,
    text: '',
    visible: true,
  },
);

const hasValue = computed(() => !!props.text);

const classes = computed(() => ({
  'app-note': true,
  [`app-note-full`]: hasValue.value,
  [`app-note-type-${props.type}`]: true,
  [`app-note-hidden`]: props.visible,
}));
</script>
