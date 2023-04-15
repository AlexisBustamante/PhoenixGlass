<template>
  <v-container>
    <v-card class="mt-11">
      <v-data-table
        :headers="headers"
        :items="ordenes"
        :search="search"
        sort-by="calories"
        class="elevation-1 mt-11"
        :loading="loadingTable"
        loading-text="Loading... Please wait"
        :calculate-widths="true"
        :single-expand="true"
        :expanded.sync="expanded"
        item-key="id"
        show-expand
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            More info about
            <pre>{{ item }}</pre>
          </td>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <!-- <v-spacer></v-spacer> -->
            <v-col cols="1">
              <v-icon @click="initialize()" color="primary">mdi-reload</v-icon>
            </v-col>
            <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              hide-details
              outlined
              dense
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Ingresar OT
                </v-btn>
              </template>
              <v-card>
                <v-toolbar color="primary">
                  <v-toolbar-title>
                    <span class="text-h5 white--text"
                      >Ingreso de OT</span
                    ></v-toolbar-title
                  >
                </v-toolbar>

                <v-card-text>
                  <v-form v-if="loading ? false : true" ref="formNewDocument">
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="defaultItem.OT_numero"
                            label="Número OT"
                            dense
                            outlined
                            :rules="rules"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="defaultItem.OT_titulo"
                            label="Titulo"
                            dense
                            outlined
                            :rules="rulesT"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-select
                          label="Estado OT"
                          :items="estados"
                          dense
                          outlined
                          v-model="defaultItem.OT_estado"
                        >
                        </v-select>
                      </v-row>
                      <v-row>
                        <v-textarea
                          v-model="defaultItem.OT_detalle"
                          label="Detalle"
                          dense
                          outlined
                        ></v-textarea>
                      </v-row>
                    </v-container>
                  </v-form>
                  <v-container v-if="loading ? true : false">
                    <v-row
                      class="fill-height"
                      align-content="center"
                      justify="center"
                    >
                      <v-col class="text-subtitle-1 text-center" cols="12">
                        Creando Registro ...
                      </v-col>
                      <v-col class="text-subtitle-1 text-center" cols="12">
                        <v-icon x-large>mdi-cloud-arrow-up-outline</v-icon>
                      </v-col>

                      <v-col cols="6">
                        <v-progress-linear
                          color="primary"
                          indeterminate
                          rounded
                          height="6"
                        ></v-progress-linear>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Desea eliminar la OT Número
                  {{ editedItem.OT_numero }}?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="error darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="primary" small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="error" small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar
      :timeout="timeout"
      v-model="snackbar"
      :vertical="vertical"
      :color="snacktype.color"
    >
      <p>
        <v-icon>{{ snacktype.icon }}</v-icon
        >{{ snacktype.msg }}.
      </p>
    </v-snackbar>
  </v-container>
</template>

<script>
import { db, collection, getDocs } from "../firebase.js";
import { auth } from "../firebase";
import {
  doc,
  deleteDoc,
  //updateDoc,
  addDoc,
  Timestamp,
} from "../firebase.js";
export default {
  data: () => ({
    estados: [
      "Abierto",
      "Corte de Vidrio",
      "Corte de Separadores",
      "Armado y llenado separadores",
      "Armado de Termopaneles",
      "Sellado de Termopaneles",
      "Cerrado",
    ],
    expanded: [],
    ordenes: [],
    loadingTable: false,
    search: "",
    user: null,
    drawer: false,
    group: null,
    photo: "",
    tab: null,
    items: ["OT Abiertas ", "OT Cerradas"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    dialog: false,
    dialogDelete: false,
    rules: [(v) => !!v || "Campo obligatorio."],
    rulesT: [(v) => !!v || "Campo obligatorio."],
    loading: false,
    timeout: 5000,
    vertical: true,
    headers: [
      {
        text: "Número OT",
        align: "start",
        value: "OT_numero",
      },
      { text: "Titulo", value: "OT_titulo" },
      { text: "Estado", value: "OT_estado" },
      { text: "Detalle", value: "OT_detalle" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    snackbar: false,
    snacktype: {
      color: "success",
      icon: "mdi-check-circle-outline",
      msg: "Documento almacenado correctamente",
    },
    desserts: [],
    editedIndex: -1,
    defaultItem: {
      OT_detalle: "",
      OT_estado: "Abierto",
      OT_numero: "",
      OT_titulo: "",
      OT_url: "",
    },
    editedItem: {
      OT_detalle: "",
      OT_estado: "",
      OT_numero: "",
      OT_titulo: "",
      OT_url: "",
    },
  }),
  methods: {
    async initialize() {
      this.ordenes = [];
      this.loadingTable = true;

      const querySnapshot = await getDocs(collection(db, "OTS"));
      querySnapshot.forEach((doc) => {
        let newdoc = doc.data();
        newdoc.id = doc.id;

        //TODO: buscar el historial

        this.ordenes.push(newdoc);
      });
      console.log(this.ordenes);
      this.loadingTable = false;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.ordenes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      //this.desserts.splice(this.editedIndex, 1);
      try {
        await deleteDoc(doc(db, "OTS", this.editedItem.id));
        //console.log("documento eliminado ", this.itemSelected);
        this.closeDelete();
        await this.initialize(); //recargo lista.
        this.snackbar = true;
        this.snacktype = {
          color: "success",
          icon: "mdi-check-circle-outline",
          msg: "Registro Eliminado",
        };
      } catch (error) {
        console.log(error);
        this.closeDelete();
        this.snacktype = {
          color: "red accent-2",
          icon: "mdi-alert-circle-outline",
          msg: "No fue posible eliminar Registro.",
        };
      }
    },

    close() {
      //this.$refs.formNewDocument.reset();
      this.dialog = false;
      this.defaultItem = {
        OT_detalle: "",
        OT_estado: "Abierto",
        OT_numero: "",
        OT_titulo: "",
        OT_url: "",
      };
    },

    closeDelete() {
      this.dialogDelete = false;
      this.editedItem = {
        OT_detalle: "",
        OT_estado: "",
        OT_numero: "",
        OT_titulo: "",
        OT_url: "",
      };
    },

    async save() {
      if (this.$refs.formNewDocument.validate()) {
        try {
          this.loading = true;
          this.defaultItem.OT_createdAd = Timestamp.fromDate(new Date());
          this.defaultItem.OT_dateString =
            this.defaultItem.OT_createdAd.toDate().toLocaleDateString();

          const docRef = await addDoc(collection(db, "OTS"), this.defaultItem);
          console.log("Document written with ID: ", docRef.id);
          await this.initialize();
          this.close();
          this.snackbar = true;
          this.snacktype = {
            color: "success",
            icon: "mdi-check-circle-outline",
            msg: "Registro almacenado correctamente",
          };
          this.loading = false;
        } catch (error) {
          console.log(error);
          this.loading = false;
          this.snacktype = {
            color: "red accent-2",
            icon: "mdi-alert-circle-outline",
            msg: "No fue posible Almacenar Registro.",
          };
        }
      }

      //this.close();
    },
  },
  created() {
    this.user = auth.currentUser;
    this.photo = this.user && this.user.photoURL ? this.user.photoURL : "";
    this.initialize();
  },
  components: {
    // ServiciosComp,
  },
};
</script>

<style>
</style>