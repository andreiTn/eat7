<template>
  <q-item class="rounded-borders q-mb-sm" style="border: 1px solid #eee;">
    <q-item-section side v-if="!!$slots.before">
      <slot name="before"></slot>
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-subtitle1">{{ item.name }}</q-item-label>
      <q-item-label caption class="text-grey-7" v-if="item.dayString && !hideDates">
        <strong class="text-secondary">{{ item.dayString }}</strong> -
        <span>{{ item.dateString }}</span>
      </q-item-label>
    </q-item-section>
    <q-item-section side v-if="!!$slots.after">
      <slot name="after"></slot>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Item } from 'components/models';

export default defineComponent({
  name: 'ItemRow',
  props: {
    item: {
      type: Object as PropType<Item>,
    },
    hideDates: Boolean,
  },
});
</script>
