<template>
  <v-app>
    <v-navigation-drawer app v-model="ui.drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Three.js project
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <!-- example-->
      <v-list dense nav>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/example01">
          <v-list-item-icon>
            <v-icon>hdr_weak</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>example01</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <!-- project -->
      <v-list dense nav>
        <v-list-item link to="/project01">
          <v-list-item-icon>
            <v-icon>hdr_strong</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>project01</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="teal darken-2" dark>
      <v-app-bar-nav-icon @click.stop="ui.drawer = !ui.drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Three.js project</v-toolbar-title>
    </v-app-bar>
  
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts" src="./app.ts">
</script>
