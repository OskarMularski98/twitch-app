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
                Sign In <v-icon class="ml-2"> {{ "mdi-account-edit" }} </v-icon>
              </v-card-title>
              <v-form @submit.prevent="signIn">
                <v-text-field
                  label="E-mail"
                  v-model="user.email"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  v-model="user.password"
                  :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="value ? 'password' : 'text'"
                  @click:append="value = !value"
                ></v-text-field>
                <a @click="registerUser" class="register"
                  ><u
                    >Don't have account yet? Click here and register now!</u
                  ></a
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    block
                    :loading="submitLoading"
                    :disabled="submitLoading"
                    type="submit"
                    color="purple darken-2"
                    >Confirm</v-btn
                  >
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-fade-transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      submitLoading: false,
      value: String,
      user: {
        email: "",
        password: "",
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
    registerUser() {
      this.$router.push({ name: "register" });
    },
    async signIn() {
      this.submitLoading = true;
      const data = {
        email: this.user.email,
        password: this.user.password,
        returnSecureToken: true,
      };
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAedKx0W6s204JYarZXh69W1vO5M2T0xoU`,
          data
        );
        this.$store.commit("moduleUser/setUserId", response.data.localId);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.get(
          `https://twitch-app-e5d55-default-rtdb.firebaseio.com/users/${this.$store.getters["moduleUser/getUserId"]}.json`
        );
        this.$store.commit("moduleUser/setUser", {
          email: response.data.email,
          userName: response.data.userName,
          isLoggedIn: true,
        });
        console.log(response.data);
        this.$router.push({ name: "home" });
        this.submitLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.register {
  color: blueviolet;
}
</style>
