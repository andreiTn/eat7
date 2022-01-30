<template>
  <q-select
    v-model="locale"
    :options="localeOptions"
    :label="$t('toolbar.selectLanguage')"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <span style="font-size: 1.5rem;">{{ scope.opt.flag }}</span>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
      localeOptions: [
        { value: 'en-GB', label: 'English', flag: '🇬🇧' },
        { value: 'ro', label: 'Română', flag: '🇷🇴' }
      ]
    }
  }
}
</script>
