<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" xl="5">
        <v-card dark class="pa-5">
          <v-card-title class="justify-center">
            Registration
            <v-icon class="ml-2"> {{ "mdi-account-edit" }} </v-icon>
          </v-card-title>
          <v-form lazy-validation @submit.prevent="registerUser">
            <v-text-field label="Name" v-model="user.name"></v-text-field>
            <v-text-field
              label="Last Name"
              v-model="user.lastName"
            ></v-text-field>
            <v-text-field label="Age" v-model="user.age"></v-text-field>
            <v-text-field
              label="Username"
              v-model="user.userName"
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="user.password"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              :type="value ? 'password' : 'text'"
              @click:append="value = !value"
            ></v-text-field>
            <v-text-field
              label="Confirm"
              v-model="user.confirmedPassword"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              :type="value ? 'password' : 'text'"
              @click:append="value = !value"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="purple darken-2">Confirm</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "@/config/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
export default {
  data() {
    return {
      value: String,
      user: {
        name: "",
        lastName: "",
        age: null,
        userName: "",
        password: "",
        confirmedPassword: "",
      },
    };
  },
  methods: {
    registerUser() {
      console.log(this.user);
    },
  },
  mounted() {
    const q = query(collection(db, "auth"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc);
      });
    });
  },
};
</script>

<style></style>
