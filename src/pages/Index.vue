<template>
  <q-page class="q-pa-md">
    <h1>Vezi lista</h1>
    <div v-if="list.items.length">
      <p>Ce mâncăm în perioada <span class="text-secondary">{{ validFrom }} - {{ validTo }}</span></p>

      <span class="text-caption">{{ list.description }}</span>
      <q-list class="q-my-md">
        <ItemRow v-for="item in list.items" :key="item.id" :item="item"/>
      </q-list>
    </div>

    <p v-else>
      Nu ai generat o listă. Adaugă niște idei
      <q-btn to="/view-all" label="aici" color="secondary" />
      si după generează o listă
      <q-btn to="/generate" label="aici" color="secondary"/>
    </p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStoredList } from 'src/composables/stored';
import ItemRow from 'components/ItemRow.vue';

export default defineComponent({
  name: 'Home',
  components: { ItemRow },
  setup() {
    const list = useStoredList();

    return {
      validFrom: computed(() => new Date(list.value.createdAt).toLocaleDateString()),
      validTo: computed(() => new Date(list.value.expiresAt).toLocaleDateString()),
      list,
    };
  }
});
</script>
