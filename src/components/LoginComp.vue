<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-card-text class="mt-12">
          <v-row align="center" justify="center">
            <img
              style="height: 150px; margin-bottom: 20px"
              src="../assets/logo.png"
              alt=""
            />
          </v-row>
          <h4 class="text-center text-h5">Bienvenido</h4>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8">
              <v-text-field
                label="Email"
                outlined
                dense
                autocomplete="false"
                class="mt-16"
                v-model="email"
              />
              <v-text-field
                label="Password"
                outlined
                dense
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
              <v-btn color="primary" dark @click="signIn()" block tile
                >Ingresar</v-btn
              >
              <!-- <v-btn
                class="mt-1 white--text"
                color="light-green darken-2"
                @click="signIn()"
                block
                tile
                >Registrar</v-btn
              > -->
              <!-- <v-btn
                class="mt-2"
                color="error"
                dark
                @click="signInWithGoogle()"
                block
                tile
                outlined
              >
                Ingresa con Google
              </v-btn> -->
              <v-alert
                style="margin-top: 10px"
                dismissible
                v-model="dialogErr"
                type="error"
                outlined
              >
                Credenciales inválidas
              </v-alert>
              <!-- <h5 class="text-center  grey--text mt-4 mb-3">Or Log in using</h5> -->
              <div></div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-col>

      <v-col color="primary" cols="12" sm="6" class="rounded-bl-xl">
        <div
          style="
            background-color: #1a7188;
            text-align: center;
            padding: 180px 0;
            min-height: 100vh;
          "
        >
          <v-card-text class="white--text">
            <v-row align="center" justify="center">
              <img
                style="height: 300px; margin-bottom: 10px"
                src="../assets/logo.png"
                alt=""
              />
            </v-row>
            <!-- <h1 class="text-center">PhoenixGlass.</h1> -->
            <!-- <h5 class="text-center">La solución en tus manos.</h5> -->
          </v-card-text>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  auth,
  signInWithPopup,
  provider,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "../firebase.js";

export default {
  name: "Login-Comp",
  data: () => ({
    dialogErr: false,
    email: "",
    password: "",
  }),
  methods: {
    signIn() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          //* Signed in
          console.log(userCredential.user);
          this.$router.push("perfil");
          // ...
        })
        .catch((error) => {
          console.log(error);
          this.dialogErr = true;
        });
    },
    signInWithGoogle() {
      signInWithPopup(auth, provider)
        .then((result) => {
          //console.log("google sign in");
          //console.log(result.user.auth.currentUser.uid);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          console.log(token);
          //*DIRIGIR A PERFIL DE USUARIO tenemos datos de autenticación.
          this.$router.push("perfil");
        })
        .catch((err) => {
          console.log(err);
          alert(err);
          this.dialogErr = true;
        });
    },
  },
};
</script>
