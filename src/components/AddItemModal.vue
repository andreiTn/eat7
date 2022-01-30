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
          <h3>Adaugă o idee</h3>
          <q-space />
          <q-btn flat round size="sm" icon="close" v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent.stop ref="form" style="width: 320px">
            <p class="text-negative" v-if="labelExists">
               {{ createModel.name }} există deja. Te rugăm să adaugi alt nume.
            </p>

            <div
              v-for="(item, i) in createModel"
              :key="item.id"
              class="q-mb-md"
            >
              <q-input
                dense
                outlined
                :autofocus="i === 0"
                v-model="item.name"
                label="Nume"
                lazy-rules
                :rules="[ uniqueLabel, val => val && val.length > 0 || 'Te rugăm să adaugi un nume']"
              />

              <!--              <q-input-->
              <!--                v-model="item.description"-->
              <!--                dense-->
              <!--                outlined-->
              <!--                label="Descriere"-->
              <!--              />-->
            </div>
            <q-btn
              label="Adaugă incă o idee"
              class="q-mb-md"
              outline
              stretch
              icon="add"
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
            label="Salvează"
            @click="addItem"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, PropType } from 'vue';
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
        return `${val} există deja. Te rugăm să adaugi alt nume.`;
      }
    }

    function addFormItem() {
      createModel.value.push(getDefaultModel())
    }

    return {
      labelExists,
      form,
      createModel,
      modal,
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
