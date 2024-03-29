<template>
  <q-page class="q-pa-md">
    <h1>{{ $t('generate.title') }}</h1>

    <p class="text-negative q-my-md" v-if="error">{{ error }}</p>

    <h4 class="text-grey-7 text-italic">{{ validFrom }} - {{ validTo }}</h4>
    <q-stepper
      v-if="canShowStepper"
      flat
      vertical
      v-model="step"
      ref="stepper"
      done-color="positive"
      animated
    >
      <q-step
        :name="1"
        :title="$t('generate.step1.stepTitle')"
        icon="list"
        :done="step > 1"
      >
        <h3>{{ $t('generate.step1.title') }}</h3>

        <q-btn
          icon="event"
          :label="$t('generate.step1.changeDate')"
          outline
          color="secondary"
          class="q-ml-md"
        >
          <q-popup-proxy
            @before-show="updateProxy"
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="proxyDate"
              color="secondary"
              mask="DD/MM/YYYY"
            >
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn
                  flat
                  v-close-popup
                  :label="$t('cancelLabel')"
                />
                <q-btn
                  :label="$t('generate.step1.confirmDate')"
                  color="secondary"
                  flat
                  v-close-popup
                  @click="saveDate"
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>

        <q-list class="q-my-md">
          <item-row
            dense
            hide-dates
            v-for="item in formData.items"
            :key="item.id"
            :item="item"
          >
            <template #after>
              <q-checkbox
                dense
                :label="$t('generate.step1.lock')"
                color="secondary"
                v-model="item.locked"
              />
            </template>
          </item-row>
        </q-list>

        <q-btn
          flat
          no-caps
          unelevated
          color="secondary"
          :label="$t('generate.step1.generate')"
          @click="generate"
        />
      </q-step>

      <q-step
        :name="2"
        :title="$t('generate.step2.stepTitle')"
        :caption="$t('generate.step2.caption')"
        icon="sort"
        :done="step > 2"
      >
        <h3>{{ $t('generate.step2.title') }}</h3>
        <draggable
          :list="formData.items"
          item-key="name"
          tag="div"
          ghost-class="ghost"
          @end="addItemDate"
        >
          <template #item="{ element }">
            <item-row :item="element">
              <template #before>
                <q-icon name="menu" size="sm" />
              </template>
            </item-row>
          </template>
        </draggable>
      </q-step>

      <q-step
        :name="3"
        :title="$t('generate.step3.stepTitle')"
        :caption="$t('generate.step2.caption')"
        icon="description"
      >
        <h3>{{ $t('generate.step3.stepTitle') }}</h3>
        <q-input
          dense
          autogrow
          outlined
          autofocus
          v-model="formData.description"
        />
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="flex justify-between">
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            :label="$t('generate.prevStep')"
          />
          <q-btn
            @click="nextStep"
            color="primary"
            :label="step === 3 ? $t('submitLabel') : $t('generate.nextStep')"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
    <div v-else>
      <p>{{ notEnoughItems }}</p>
      <p>
        {{ $t('generate.emptyListMessage') }}
        <q-btn to="/view-all" :label="$t('hereLabel')" color="secondary" />
      </p>
    </div>
  </q-page>
</template>

<script lang="ts">
import draggable from 'vuedraggable';
import { defineComponent, onMounted, computed, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { date, QStepper, useQuasar } from 'quasar';
import { Item, GeneratedList } from 'components/models';
import { useStoredItems, LIST_LS_KEY, LIST_LENGTH } from 'src/composables/stored';
import { useDateToFrom } from 'src/composables/useDateToFrom';
import {
  addDaysToDate,
  stringToTimestamp, formatDate
} from 'src/util/date';
import ItemRow from 'components/ItemRow.vue';
import { useI18n } from 'vue-i18n';

function useGenerateModel(): Ref<GeneratedList> {
  const now = Date.now();
  const exp = date.addToDate(now, { days: LIST_LENGTH });

  return ref<GeneratedList>({
    items: [],
    description: '',
    createdAt: now,
    expiresAt: exp.getTime()
  });
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex = 0;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default defineComponent({
  name: 'Generate',
  components: {
    ItemRow,
    draggable
  },
  setup() {
    const $q = useQuasar();
    const { t } = useI18n();
    const router = useRouter();
    const step = ref(1);
    const stepper = ref(null);
    const form = ref(null);
    const error = ref('');
    const formData = useGenerateModel();
    const canShowStepper = computed(() => {
      const items = useStoredItems();
      return items.value.length >= LIST_LENGTH;
    });
    const dateModel = ref(formatDate(new Date()));
    const proxyDate = ref(dateModel.value);

    function setDefaultModel() {
      formData.value = useGenerateModel().value;
    }

    async function nextStep() {
      error.value = '';

      if (step.value === 1) {
        const { items } = formData.value;
        if (!items.length || items.length < LIST_LENGTH) {
          error.value = t('generate.emptyListMessage');
          return;
        }

        // Make sure all items are locked when advancing to the next step
        formData.value.items = formData.value.items.map((i) => {
          i.locked = true;
          return i;
        });
        addItemDate();
      }

      if (step.value === 3) {
        localStorage.setItem(LIST_LS_KEY, JSON.stringify(formData.value));
        await router.push('/');

        $q.notify({
          timeout: 2500,
          position: 'bottom-right',
          type: 'info',
          message: t('generate.listGenerated'),
        });
      }

      if (stepper.value) {
        (stepper.value as QStepper).next();
      }
    }

    function addItemDate() {
      formData.value.items = formData.value.items.map((item, index) => {
        const itemDate = addDaysToDate(formData.value.createdAt, index);
        const d = new Date(itemDate);
        item.dayString = t(`days.${d.getDay()}`);
        item.dateString = formatDate(d);

        return item;
      });
    }

    function generate() {
      const items = useStoredItems();

      if (!formData.value.items.length) {
        // Initially just populate the list with random items
        const shuffled = shuffle<Item>(items.value);
        formData.value.items.push(...shuffled.slice(0, LIST_LENGTH));
      } else {
        const lockedItems: Item[] = [];

        // get the locked items
        formData.value.items.forEach((item) => {
          if (item.locked) {
            lockedItems.push(item);
          }
        });

        // get unlocked items from the items collection
        const tmp = items.value.filter((i) => {
          const incl = lockedItems.some((it) => it.id === i.id);
          return !incl;
        });

        const shuffled = shuffle<Item>(tmp);
        lockedItems.push(...shuffled.slice(0, LIST_LENGTH - lockedItems.length));

        formData.value.items = [...lockedItems];
      }
    }

    onMounted(() => {
      if (canShowStepper.value) {
        setDefaultModel();
        generate();
      }
    });

    return {
      notEnoughItems: t('generate.notEnoughItems', { min: LIST_LENGTH }),
      ...useDateToFrom(formData),
      canShowStepper,
      step,
      form,
      error,
      formData,
      stepper,
      dateModel,
      proxyDate,
      updateProxy () {
        proxyDate.value = dateModel.value
      },
      saveDate() {
        dateModel.value = proxyDate.value

        formData.value.createdAt = stringToTimestamp(dateModel.value);
        formData.value.expiresAt = addDaysToDate(formData.value.createdAt, LIST_LENGTH);
        console.log(formData.value);
      },
      nextStep,
      generate,
      addItemDate,
      setDefaultModel
    };
  }
});
</script>

<style>
.ghost {
  opacity: 0.5;
  background: #fbd7c8;
}
</style>
