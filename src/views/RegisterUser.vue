<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-card-text class="mt-12">
          <v-row align="center" justify="center">
            <img
              style="height: 300px; margin-bottom: 20px"
              src="../assets/logo.png"
              alt=""
            />
          </v-row>
          <h4 class="text-center"></h4>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8">
              <v-text-field
                label="Email"
                outlined
                dense
                color="blue"
                autocomplete="false"
                class="mt-16"
                v-model="email"
              />
              <v-text-field
                label="Password"
                outlined
                dense
                color="blue"
                autocomplete="false"
                type="password"
                v-model="password"
              />
              <v-row>
                <v-col cols="12" sm="7">
                  <!-- <v-checkbox label="Remember Me" class="mt-n1" color="blue"> </v-checkbox> -->
                </v-col>
                <v-col cols="12" sm="5">
                  <!-- <span class="caption blue--text">Forgot password</span> -->
                </v-col>
              </v-row>
              <v-btn color="blue" dark @click="register()" block tile
                >registrar</v-btn
              >
              <v-alert
                style="margin-top: 10px"
                dismissible
                v-model="dialogErr"
                type="error"
                outlined
              >
                El usuario o la contraseña no son correctas.
              </v-alert>
              <!-- <h5 class="text-center  grey--text mt-4 mb-3">Or Log in using</h5> -->
              <div></div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth, createUserWithEmailAndPassword } from "../firebase";

export default {
  data: () => ({
    dialogErr: false,
    email: "",
    password: "",
  }),
  methods: {
    register() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          console.log(error);
          // ..
        });
    },
  },
};
</script>
