<template>
  <q-page class="q-pa-md">
    <div class="flex items-center">
      <h1 v-if="items.length">Vezi toate ideile</h1>
      <h1 v-else>Începe să adaugi idei</h1>

      <q-space />
      <AddItemModal @submit="onCreate" :items="items" />
    </div>

    <q-list class="q-gutter-sm q-my-md" v-if="items.length">
      <item-row
        v-for="item in items"
        :key="item.id"
        :item="item"
      >
        <template #after>
          <q-btn
            flat
            round
            size="sm"
            icon="delete"
            color="negative"
            @click="removeItem(item)"
          />
        </template>
      </item-row>
    </q-list>
    <p v-else>Nu este nimic de afișat. Fă click pe butonul + pentru a adăuga niște idei.</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import AddItemModal from 'components/AddItemModal.vue';
import { Item } from 'components/models';
import { useStoredItems, ITEMS_LS_KEY } from 'src/composables/stored';
import ItemRow from 'components/ItemRow.vue';

export default defineComponent({
  name: 'ViewAll',
  components: { ItemRow, AddItemModal },
  setup() {
    const items = useStoredItems();
    const $q = useQuasar();

    return {
      onCreate(data: Item[]) {
        items.value.push(...data);
        localStorage.setItem(ITEMS_LS_KEY, JSON.stringify(items.value));
        $q.notify({
          timeout: 2500,
          position: 'bottom-right',
          type: 'positive',
          message: `Ai adăugat ${data.length} idei de mâncare.`,
        });

      },
      removeItem(item: Item) {
        const index = items.value.indexOf(item);
        items.value.splice(index, 1);
        localStorage.setItem(ITEMS_LS_KEY, JSON.stringify(items.value));
        $q.notify({
          timeout: 2500,
          position: 'bottom-right',
          type: 'info',
          message: `${item.name} a fost șters.`,
        });
      },
      items,
    };
  }
});
</script>
