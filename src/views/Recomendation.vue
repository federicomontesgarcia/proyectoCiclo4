<template>
  <v-container style="">
    <v-text-field
        type="number"
        label="Mostrar info de a (tener en cuenta la resolution)"
        v-model="divider"
        @input="divide"
      ></v-text-field>
    <v-row v-for="(servicePair, keyGroup) in services" :key="keyGroup">
      <v-col v-for="(service, key) in servicePair" :key="key">
        <place-card :service="service" :placeIndex="key" :placeGroup="keyGroup" @delete="deletePlace"></place-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Client from './../utils/Client';
import PlaceCard from "../components/PlaceCard";
export default {
  components: {
    PlaceCard
  },
  data: () => ({
    show1: false,
    show2: false,
    services: [],
    servicesWithoutChunk: [],
    divider: 2,
  }),
  async mounted() {
    const services = await Client.retrieveAll('service');
    this.servicesWithoutChunk = services.data;
    this.services = this.chunkData(this.servicesWithoutChunk, Number(this.divider));
  },
  methods: {
    deletePlace(data) {
      const id = this.services[data.group][data.index]._id;
      this.services[data.group].splice([data.index], 1);
      this.servicesWithoutChunk.splice(this.servicesWithoutChunk.findIndex((data) => data._id === id), 1);
    },
    chunkData(arr, chunkSize) {
      const res = [];
      if (chunkSize) {
        for (let i = 0; i < arr.length; i += chunkSize) {
          const chunk = arr.slice(i, i + chunkSize);
          res.push(chunk);
        }
      }
      return res;
    },
    divide() {
      if (this.divider) {
        this.services = [];
        this.services = this.chunkData(this.servicesWithoutChunk, Number(this.divider));
      } else {
        this.services = this.chunkData(this.servicesWithoutChunk, 2);
      }
    }
  }
}
</script>