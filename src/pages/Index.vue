<template>
  <q-page class="q-pa-md">
    <h1>{{ $t('home.title') }}</h1>
    <div v-if="list.items.length">
      <p>
        {{ $t('home.subtitle')}}
        <span class="text-secondary">{{ validFrom }} - {{ validTo }}</span>
      </p>

      <span class="text-caption">{{ list.description }}</span>
      <q-list class="q-my-md">
        <ItemRow v-for="item in list.items" :key="item.id" :item="item"/>
      </q-list>
    </div>

    <p v-else>
      {{ $t('home.generateItemsMsg') }}
      <q-btn to="/view-all" :label="$t('hereLabel')" color="secondary" />
      {{ $t('home.generateListMsg') }}
      <q-btn to="/generate" :label="$t('hereLabel')" color="secondary"/>
    </p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDateToFrom } from 'src/composables/useDateToFrom';
import { useStoredList } from 'src/composables/stored';
import ItemRow from 'components/ItemRow.vue';

export default defineComponent({
  name: 'Home',
  components: { ItemRow },
  setup() {
    const list = useStoredList();

    return {
      ...useDateToFrom(list),
      list,
    };
  }
});
</script>
