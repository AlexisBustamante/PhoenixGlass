<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="user" class="mr-2">{{
        user.email
      }}</v-toolbar-title>
      <v-avatar v-if="photo != ''">
        <img :src="photo" alt="" referrerpolicy="no-referrer" />
      </v-avatar>
    </v-app-bar>
    <!--// *! #1a7188-->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="primary white--text">
          <v-list-item link to="">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logOut()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    // TODO: OT ABIERTAS
    <v-main class="pa-0 mt-11">
      <v-tabs v-model="tab" background-color="transparent" color="primary" grow>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <span class="text-body mt-6">
            Todas las ordenes que se listan son aquellas que su estado sea
            diferente de cerrado, además, podrás buscar por cualquier campo o
            titulo de la tabla.
          </span>
          <table-abiertas></table-abiertas>
        </v-tab-item>
        <v-tab-item> </v-tab-item>
      </v-tabs-items>

      <!-- <servicios-comp></servicios-comp> -->
      <!-- <h1>PERFIL DEL USUARIO</h1>
      <pre>
      {{ user }}
    </pre
      > -->
    </v-main>
  </v-container>
</template>

<script>
import TableAbiertas from "@/components/TableAbiertas.vue";
// import ServiciosComp from "@/components/ServiciosComp.vue";
import { auth, signOut } from "../firebase";
// import { db, collection, getDocs } from "../firebase.js";

export default {
  data: () => ({
    user: null,
    drawer: false,
    group: null,
    photo: "",
    tab: null,
    items: ["OT Abiertas ", "OT Cerradas"],
  }),
  methods: {
    logOut() {
      signOut(auth)
        .then(() => {
          //* Sign-out successful.
          this.$router.push("/");
        })
        .catch((error) => {
          //* An error happened.
          console.log(error);
        });
    },
  },

  created() {
    this.user = auth.currentUser;
    this.photo = this.user && this.user.photoURL ? this.user.photoURL : "";
  },
  components: {
    TableAbiertas,
    // ServiciosComp,
  },
};
</script>

