<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <router-link to="/" class="q-ml-md">
          <q-avatar>
            <img
              src="~assets/logo.png"
              style="width: auto; height: 38px;"
              :alt="`Logo ${$t('toolbar.title')}`"
            />
          </q-avatar>
        </router-link>
        <q-toolbar-title>
          {{ $t('toolbar.title') }}
        </q-toolbar-title>
        <q-space />
        <SelectLanguage />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <DrawerLink
          exact
          :title="$t('drawer.home')"
          link="/"
        />

        <DrawerLink
          exact
          :title="$t('drawer.viewAll')"
          link="/view-all"
        />

        <DrawerLink
          exact
          :title="$t('drawer.generate')"
          link="/generate"
        />

        <DrawerLink
          exact
          :title="$t('drawer.settings')"
          link="/settings"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DrawerLink from 'components/DrawerLink.vue';
import SelectLanguage from 'components/SelectLanguage.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    SelectLanguage,
    DrawerLink,
  },

  setup () {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
