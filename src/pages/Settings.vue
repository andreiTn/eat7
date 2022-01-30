<template>
  <q-page class="q-pa-md">
    <h1>{{ $t('settings.title') }}</h1>

    <q-list bordered separator class="rounded-borders">
      <q-item>
        <q-item-section>
          <q-item-label v-if="hasData">
            {{ $t('settings.deleteAllData') }}
          </q-item-label>
          <q-item-label caption>
            <span>{{ itemsMessage }}</span>
          </q-item-label>
          <q-item-label caption>
            <span>{{ listMessage }}</span>
          </q-item-label>
        </q-item-section>
        <q-item-section side v-if="hasData">
          <q-btn
            flat
            round
            icon="delete"
            color="negative"
            @click="modal = true"
          />
        </q-item-section>
      </q-item>

      <q-item v-if="!defaultDataSet">
        <q-item-section>
          <q-item-label>
            {{ $t('settings.populateList') }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            flat
            round
            icon="text_snippet"
            color="secondary"
            @click="addDefaultData"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>

  <q-dialog v-model="modal" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="warning" text-color="white" />
        <span class="q-ml-sm">
          {{ $t('settings.deleteWarning') }}
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('cancelLabel')" color="primary" v-close-popup />
        <q-btn
          :label="$t('settings.confirmDelete')"
          color="primary"
          v-close-popup
          @click="clearData"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import {
  useStoredItems,
  useStoredList,
  ITEMS_LS_KEY,
  LIST_LS_KEY,
  DEFAULT_DATA_KEY,
} from 'src/composables/stored';
import { useDefaultData, hasDefaultData } from 'src/data/defaultItems';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Settings',
  setup() {
    const $q = useQuasar();
    const { t } = useI18n();
    const $router = useRouter();
    const modal = ref(false);
    const items = useStoredItems();
    const list = useStoredList();
    const hasData = computed(() => {
      return items.value.length || list.value.items.length;
    });
    const defaultDataSet = ref(hasDefaultData());

    const itemsMessage = computed(() => {
      const count = items.value.length;
      if (!count) return t('settings.itemsMessage.noItems');

      if (count === 1) return t('settings.itemsMessage.oneItem');

      return t('settings.itemsMessage.manyItems', { count });
    });

    const listMessage = computed(() => {
      const count = list.value.items.length;
      if (!count) return t('settings.listMessage.noList');

      return t('settings.listMessage.oneList');
    });

    function clearData() {
      localStorage.removeItem(ITEMS_LS_KEY);
      localStorage.removeItem(LIST_LS_KEY);
      localStorage.removeItem(DEFAULT_DATA_KEY);
      defaultDataSet.value = false;

      items.value = useStoredItems().value;
      list.value = useStoredList().value;

      $q.notify({
        timeout: 2500,
        position: 'bottom-right',
        type: 'info',
        message: t('settings.deleteNotification'),
      });
    }

    return {
      hasData,
      itemsMessage,
      listMessage,
      modal,
      items,
      list,
      defaultDataSet,
      clearData,
      addDefaultData() {
        useDefaultData();
        defaultDataSet.value = true;

        items.value = useStoredItems().value;
        list.value = useStoredList().value;

        $q.notify({
          timeout: 2500,
          position: 'bottom-right',
          type: 'info',
          message: t('settings.defaultDataAdded'),
          actions: [
            {
              label: t('settings.viewAllData'),
              color: 'white',
              handler: async () => {
                await $router.push('/view-all')
              }
            }
          ]
        });
      }
    };
  }
});
</script>
