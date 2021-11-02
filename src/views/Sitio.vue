<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
        <h1 class="text-center mb-4">{{this.place.place.name}}</h1>
        <div class="saludos">
        </div>
          <p>{{this.place.place.description}}</p>
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-card
                  :elevation="n - 1"
                  height="500"
                  width="500"
                  class="secondary"
              >
                <v-img
                    :lazy-src="this.place.place.url"
                    class="fill-height"
                    height="500"
                    width="500"
                    :src="this.place.place.url"
                ></v-img>
              </v-card>

            <div class="fotop"></div>
            </v-col>
            <v-col align="center" justify="center">
              <v-card
                  :elevation="n - 1"
                  height="500"
                  width="500"
                  class="secondary"
              >
                <v-img
                    :lazy-src="this.place.place.url2"
                    class="fill-height"
                    height="500"
                    width="500"
                    :src="this.place.place.url2"
                ></v-img>
              </v-card>
            </v-col>
          </v-row>
        <h2>¿Qué se necesita para visitar {{this.place.place.name}}?</h2>


        <p>{{this.place.place.why}}</p>
        </v-col>
      </v-row>

  <!--    Sección de comentarios inicio-->
      <v-row>
        <v-col>
          <v-list three-line>
            <template v-for="(comment, index) in place.comments">
              <v-subheader
                  Comentarios
              ></v-subheader>

              <v-list-item :key="index">
                <v-list-item-avatar :color="backgroundImg(index)" style="color: white; font-weight: bold">
                  {{comment.user.name.charAt(0).toUpperCase()}}
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="comment.user.name"></v-list-item-title>
                  <v-list-item-subtitle v-html="comment.comment"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
          <v-form>
            <v-textarea
                label="Deja tus comentarios"
                prepend-icon="mdi-comment-text-multiple-outline"
                v-model="comment"
                rows="3"
                required
                :rules="rules"
            />
            <v-btn color="secondary" @click="saveComment">Comentar</v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar">
        {{snackbarText}}

        <template v-slot:action="{ attrs }">
          <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
  <!--    Sección de comentario fin-->
    </v-container>
  </div>
</template>

<style>
.saludos {
  background-image: linear-gradient(to left, blue, yellow);
}

.fotop{
  border-radius: 5px 15px 15px 15px;
  padding: 5px 10px 5px 10px;
  margin:2px;
  float:left;
}

.fotos{
  border-radius: 15px 15px 15px 15px;
  padding: 5px 10px 5px 10px;
  margin:2px;
  float:left;
  width:620px;
}

.parrafop{
  color: #080808;
  font-weight: normal;
  font-family: Arial;
  margin: 0 auto;
  text-align:center;
}
</style>

<script>
import Client from "../utils/Client";
import {mapState} from "vuex";

export default {
  data () {
    return {
      place: {
        place: {
          name: '',
          description: '',
          why: '',
          url: '',
          url2: '',
        }
      },
      rules: [
        value => !!value || 'Required.',
      ],
      snackbar: false,
      snackbarText: '',
      comment: '',
      items: []
    }
  },
  mounted() {
    Client.retrieveOne('service', this.$route.params.id, true)
      .then(place => {
        this.place = place.data;
        console.log(this.place.place)
      })
  },
  methods: {
    saveComment() {
      if (this.comment !== '') {
        Client.saveComment(this.$route.params.id, this.comment, this.user, this.place).then(() => {
          this.snackbar = true;
          this.snackbarText = `Comentario guardado con éxito`;
          this.place.comments.push({
            comment: this.comment,
            user: this.user
          })
          this.comment = '';
        }).catch(e => {
          this.snackbar = true;
          this.snackbarText = 'Ha ocurrido un error verifica si la información es correcta';
        });
      }
    },
    backgroundImg(index) {
      if ((index+1) % 3 === 0) {
        return 'blue';
      } else if ((index + 1) % 2 === 0) {
        return 'green';
      } else {
        return 'brown';
      }
    }
  },
  computed: mapState({
    'user': state => state.user.user
  })
}
</script>
