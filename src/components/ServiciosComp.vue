<template>
  <v-container>
    <h1 class="light-green--text text-h5">Nuestros Servicios</h1>
    <v-card class="mt-2" v-for="item in servicios" :key="item.title">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="text-subtitle1">{{ item.titulo }}</v-card-title>
          <v-card-subtitle class="text-caption">{{
            item.descripcion
          }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              class="ml-2 mt-0"
              outlined
              rounded
              small
              color="light-green darken-1"
            >
              Solicitar
            </v-btn>
          </v-card-actions>
        </div>
        <v-icon class="pa-3 mr-3" color="light-green">{{ item.icon }} </v-icon>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    servicios: [
      {
        titulo: "Hospitalización Domiciliaria",
        descripcion: `
        Nuestro servicio consiste en ser una alternativa asistencial al prestar un conjunto 
        de atenciones y cuidados de rango hospitalario en la comodidad de su casa, es decir,
        llevamos la Clinica a su hogar
        `,
        src: "@/assets/bann1.png",
        icon: "mdi-home-city",
      },
      {
        titulo: "Procedimientos Ambulatorios",
        descripcion: `
       Nuestro servicio consiste en efectuar, en la comodidad del hogar,
       los tratamientos indicados por el médico tratante
        `,
        icon: "mdi-ambulance",
      },
      {
        titulo: "Cuidados Básicos",
        descripcion: `
      Nuestro servicio consiste en brindar cuidados y compañia en el domicilio o clínica, tanto de día como de noche,
       según lo que la familia considere necesario para el apoyo de actividades de la vida diaria del paciente
        `,
        icon: "mdi-medical-bag",
      },
    ],
  }),
};
</script>

<style>
</style>