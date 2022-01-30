<template>
  <div class="inline-block">
    <q-btn
      round
      no-caps
      unelevated
      color="primary"
      icon="add"
      @click="open"
    />

    <q-dialog v-model="modal" @hide="setDefaultModel">
      <q-card>
        <q-card-section class="flex items-center">
          <h3>{{ $t('items.title') }}</h3>
          <q-space />
          <q-btn flat round size="sm" icon="close" v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent.stop ref="form" style="width: 320px">

            <div
              v-for="(item, i) in createModel"
              :key="item.id"
              class="q-mb-md"
            >
              <p class="text-negative" v-if="labelExists[i]">
                {{ $t('items.labelExists', { name: item.name }) }}
              </p>
              <q-input
                dense
                outlined
                autofocus
                v-model="item.name"
                :label="$t('items.name')"
                lazy-rules
                :rules="[ uniqueLabel, val => val && val.length > 0 || $t('items.requiredName') ]"
              >
                <template #after>
                  <q-btn
                    flat
                    size="sm"
                    icon="delete"
                    @click="removeFormItem(i)"
                  />
                </template>
              </q-input>
            </div>
            <q-btn
              :label="$t('items.addMore')"
              no-caps
              flat
              icon="add"
              color="secondary"
              class="q-mb-md full-width"
              @click="addFormItem"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            no-caps
            unelevated
            color="primary"
            :label="$t('submitLabel')"
            @click="addItem"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { QForm } from 'quasar';
import { Item } from 'components/models';

function getDefaultModel(): Item {
  return {
    id: `${Date.now()}-${Math.random().toFixed(5)}`,
    name: '',
    description: '',
    externalLink: '',
    isFavourite: false,
    locked: false,
  };
}

function useCreateModel(): Ref<Item[]> {
  return ref<Item[]>([getDefaultModel()]);
}

export default defineComponent({
  name: 'AddItemModal',
  emits: ['submit'],
  props: {
    items: {
      type: Array as PropType<Item[]>,
      default: () => [],
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const form = ref(null);
    const modal = ref<boolean>(false);
    const labelExists = ref<boolean>(false);
    let createModel = useCreateModel();

    function setDefaultModel() {
      labelExists.value = false;
      createModel.value = useCreateModel().value;
    }

    function uniqueLabel(val: string) {
      if (props.items?.some((i) => i.name === val)) {
        return t('items.labelExists', { name: val });
      }
    }

    function removeFormItem(index: number) {
      createModel.value.splice(index, 1);
    }

    function addFormItem() {
      createModel.value.push(getDefaultModel())
    }

    return {
      labelExists,
      form,
      createModel,
      modal,
      removeFormItem,
      uniqueLabel,
      setDefaultModel,
      addFormItem,
      open() {
        setDefaultModel();
        modal.value = true;
      },
      async addItem() {
        labelExists.value = false;
        if (!form.value) return;

        const valid = await (form.value as QForm).validate();
        if (!valid) return;

        emit('submit', createModel.value);
        modal.value = false;
      },
    };
  }
});
</script>
