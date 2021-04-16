<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" flex>
        <v-avatar>
          <v-img :src="logo" content class="my-3" max-height="200" />
        </v-avatar>
      </v-col>
      <div v-if="personName">
        <v-col v-if="invalidName" class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            <div>Lo siento {{ personName }}.</div>
          </h1>

          <p class="subheading font-weight-regular">
            No eres quien esperaba
          </p>
        </v-col>
        <v-col v-else-if="isUnderEmbargo" class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            <div>Hola! {{ personName }}.</div>
          </h1>

          <p class="subheading font-weight-regular">
            Aun no es tiempo, intentalo más tarde.
          </p>
        </v-col>

        <v-col v-else class="mb-4">
          <div v-if="confirmed === null">
            <h1 class="display-2 font-weight-bold mb-3">
              <div>Hola! {{ personName }}.</div>
            </h1>

            <p class="subheading font-weight-regular">
              Llegaste en el momento justo, estas lista?
              <v-btn color="red" @click="() => setConfirm(false)">No</v-btn>
              <v-btn color="blue" @click="() => setConfirm(true)">Sí</v-btn>
            </p>
          </div>
          <div v-if="isReady">
            <h2 class="display-2 font-weight-bold mb-3">
              <div>Gracias por ser paciente</div>
            </h2>
            <p class="subheading font-weight-regular">
              {{ personName }} quieres ser la novia del nerd que te envio esto y
              te hizo esperar?
              <br />
              <v-btn color="red" @click="() => setAnswer(false)">Ni loca</v-btn>
              <v-btn color="blue" @click="() => setAnswer(true)"
                >Obvio que si!!!</v-btn
              >
            </p>
          </div>
          <div v-if="answer">
            <iframe
              width="480"
              height="320"
              src="https://www.youtube.com/embed/-F923I-CU-4?autoplay=1"
              title="YouTube video player"
              autoplay
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div v-else-if="answer === false">
            <iframe
              width="480"
              height="320"
              src="https://www.youtube.com/embed/t857LwdSkag?autoplay=1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </v-col>
      </div>
      <div v-else>
        <v-col cols="12">
          Cual es tu nombre?
          <input
            class="mx-3"
            :style="{ border: '1px solid red', 'border-radius': '3px' }"
            append-icon="mdi-close"
            prepend-icon="mdi-phone"
            v-model="textBox"
          />
          <v-btn color="red" @click="setName">Confirmar</v-btn>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import logo from "../assets/heart.png";
import {
  attemptsCollection,
  interactionsCollection,
} from "../services/firebase";

export default {
  name: "HelloWorld",

  data: () => ({
    currentStep: 0,
    steps: ["name", "confirm", "answer"],
    personName: "",
    textBox: "",
    answer: null,
    confirmed: null,
    embargoDate: new Date("2021-04-16T23:00:00.000Z"),
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
    logo,
  }),
  computed: {
    isUnderEmbargo() {
      const currentDate = new Date();

      return currentDate <= this.embargoDate;
    },
    isReady() {
      return this.confirmed === true;
    },
  },
  methods: {
    setConfirm(value) {
      this.confirmed = value;
      this.registerInteraction('confirmedWantToKnow', value)
    },
    registerInteraction(action, value) {
      const { userAgent, vendor, platform } = window.navigator;
      const timestamp = new Date();

      interactionsCollection.add({
        action: action,
        value,
        timestamp,
        name: this.personName,
        browserInfo: {
          userAgent,
          vendor,
          platform,
        },
      });
    },
    setName() {
      const expectedName = "cristal";

      if (this.textBox) {
        if (!this.textBox.toLowerCase().includes(expectedName)) {
          this.invalidName = true;
        }

        this.personName = this.textBox;
        const { userAgent, vendor, platform } = window.navigator;

        this.registerInteraction('addHerName', this.textBox)
        attemptsCollection.add({
          timestamp: new Date(),
          name: this.textBox,
          expected: !this.invalidName,
          onTime: !this.isUnderEmbargo,
          browserInfo: {
            userAgent,
            vendor,
            platform,
          },
        });
      }
    },
    setAnswer(value) {
      this.answer = value;
      this.registerInteraction('answerBigQuestion', value)
    },
  },
};
</script>
