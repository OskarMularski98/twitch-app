<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" xl="5">
        <v-card dark class="pa-5">
          <v-card-title class="justify-center">
            Sign In <v-icon class="ml-2"> {{ "mdi-account-edit" }} </v-icon>
          </v-card-title>
          <v-form>
            <v-text-field label="Username"></v-text-field>
            <v-text-field label="Password"></v-text-field>
            <a @click="registerUser" class="register"
              ><u>Don't have account yet? Click here and register now!</u></a
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="purple darken-2">Confirm</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    registerUser() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style scoped>
.register {
  color: blueviolet;
}
</style>
