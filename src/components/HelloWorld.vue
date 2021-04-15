<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" flex>
        <v-avatar>
          <v-img :src="logo" content class="my-3" max-height="200" />
        </v-avatar>
      </v-col>

      <v-col v-if="isUnderEmbargo" class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          <div>Hola! {{ personName }}.</div>
        </h1>

        <p class="subheading font-weight-regular">
          Aun no es tiempo, intentalo más tarde.
        </p>
      </v-col>

      <v-col v-else class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          <div>Hola! {{ personName }}.</div>
        </h1>

        <p class="subheading font-weight-regular">
          Llegaste en el momento justo
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import logo from "../assets/heart.png";

export default {
  name: "HelloWorld",

  data: () => ({
    personName: '',
    embargoDate: new Date('2021-04-16T23:00:00.000Z'),
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    importantLinks: [
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com",
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
      },
    ],
    logo,
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Roadmap",
        href: "https://vuetifyjs.com/introduction/roadmap/",
      },
      {
        text: "Frequently Asked Questions",
        href:
          "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
  }),
  computed: {
    isUnderEmbargo() {
      const currentDate = new Date();

      return (currentDate <= this.embargoDate)
    }
  }
};
</script>
