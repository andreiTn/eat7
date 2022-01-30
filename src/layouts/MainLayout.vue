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
              alt="Logo Ce Mâncăm?"
            />
          </q-avatar>
        </router-link>
        <q-toolbar-title>
          Ce Mâncăm?
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <DrawerLink
          v-for="link in drawerLinks"
          exact
          :key="link.title"
          v-bind="link"
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

const drawerLinks = [
  {
    title: 'Acasa',
    link: '/'
  },
  {
    title: 'Toate datele',
    link: '/view-all'
  },
  {
    title: 'Genereaza Lista',
    link: '/generate'
  },
  {
    title: 'Setări',
    link: '/settings'
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    DrawerLink,
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      drawerLinks,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
