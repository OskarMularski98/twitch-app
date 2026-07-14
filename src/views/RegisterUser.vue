<template>
  <div>
    <v-container v-if="isLoading" class="text-center mt-10">
      <v-row>
        <v-col cols="12">
          <v-progress-circular
            color="purple lighten-1"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    <v-fade-transition hide-on-leave>
      <v-container v-if="!isLoading">
        <v-row class="justify-center">
          <v-col cols="12" xl="5">
            <v-card dark class="pa-5">
              <v-card-title class="justify-center">
                Registration
                <v-icon class="ml-2"> {{ "mdi-account-edit" }} </v-icon>
              </v-card-title>
              <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                <v-form
                  lazy-validation
                  @submit.prevent="handleSubmit(registerUser)"
                  v-model="isValid"
                >
                  <ValidationProvider
                    name="Username"
                    mode="lazy"
                    v-slot="{ errors }"
                    rules="required|min:3"
                  >
                    <v-text-field
                      label="Username"
                      v-model="user.userName"
                      hint="Minimun 3 characters"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    name="E-mail"
                    mode="lazy"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      :error-messages="errors"
                      label="E-mail"
                      v-model="user.email"
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    name="Password"
                    mode="lazy"
                    v-slot="{ errors }"
                    rules="required|confirmed:confirmPassword"
                  >
                    <v-text-field
                      label="Password"
                      :error-messages="errors"
                      hint="Minimum 6 characters"
                      v-model="user.password"
                      :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="value ? 'password' : 'text'"
                      @click:append="value = !value"
                    ></v-text-field>
                  </ValidationProvider>
                  <ValidationProvider
                    mode="lazy"
                    name="Confirm Password"
                    vid="confirmPassword"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      :error-messages="errors"
                      label="Confirm"
                      v-model="user.confirmedPassword"
                      :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="value ? 'password' : 'text'"
                      @click:append="value = !value"
                    ></v-text-field>
                  </ValidationProvider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      block
                      :loading="submitLoading"
                      :disabled="submitLoading || !isValid"
                      type="submit"
                      color="purple darken-2"
                      >Confirm</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </ValidationObserver>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-fade-transition>
  </div>
</template>

<script>
// import { db } from "@/config/firebase";
// import { query, collection, onSnapshot } from "firebase/firestore";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import axios from "axios";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      value: String,
      isValid: true,
      isLoading: false,
      submitLoading: false,
      user: {
        userName: "",
        email: "",
        password: "",
        confirmedPassword: "",
      },
    };
  },
  created() {
    const timeout = 1000;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, timeout);
  },
  methods: {
    async registerUser() {
      this.submitLoading = true;
      const data = {
        userName: this.user.userName,
        email: this.user.email,
        password: this.user.password,
        returnSecureToken: true,
      };
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAedKx0W6s204JYarZXh69W1vO5M2T0xoU
`,
          data
        );
        this.$store.commit("moduleUser/setUserId", response.data.localId);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.put(
          `https://twitch-app-e5d55-default-rtdb.firebaseio.com/users/${this.$store.getters["moduleUser/getUserId"]}.json`,
          data
        );
        console.log(response.data);
        this.submitLoading = false;
        this.$router.push({ name: "signIn" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  // mounted() {
  //   const q = query(collection(db, "auth"));
  //   onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc);
  //     });
  //   });
  // },
};
</script>

<style></style>
