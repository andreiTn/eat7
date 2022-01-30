<template>
  <div class="fullscreen bg-secondary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 4rem;">
        404
      </div>

      <h2 style="opacity:0.4">{{ $t('notFound.error') }}</h2>

      <q-btn
        to="/"
        :label="$t('notFound.btnLabel')"
        no-caps
        unelevated
        color="white"
        class="q-mt-xl"
        text-color="primary"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404'
});
</script>
