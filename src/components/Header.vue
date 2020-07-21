<template>
  <div :class="[{ fix_position: fixed }, 'header']">
    <div class="wrapper-content m-2">
      <router-link :to="url.logo">
        <img
          class="img-width-logo"
          src="../assets/img/Header-logo.png"
          alt="Logo"
        />
      </router-link>

      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div v-if="support">
          <h4 class="support">Support</h4>
        </div>
        <b-dropdown
          v-if="menu"
          id="dropdown-header"
          toggle-class="text-decoration-none bg-transparent border-0 m-0 p-0"
          menu-class="border-0"
          button-class="p-0"
          size="lg"
          offset="0,10"
          right
          block
        >
          <template v-slot:button-content>
            <img
              class="img-width-logo-user"
              src="../assets/img/Logo-user.png"
              alt="Logo"
            />
          </template>

          <div class="block-user-data">
            <span class="user-name">{{ name }}</span>
            <span class="user-email">{{ email }}</span>
          </div>

          <b-dropdown-divider></b-dropdown-divider>

          <b-dropdown-item :to="url.dashboard">Dashboard</b-dropdown-item>
          <b-dropdown-item :to="url.account">Account</b-dropdown-item>
          <b-dropdown-item @click="showHideHelpPopup">Support</b-dropdown-item>
          <b-dropdown-item @click="planPopupShow">Plans</b-dropdown-item>
          <b-dropdown-item @click="logOut">Log Out</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    
    <!-- <PopupHelp v-if="flag_help_popup" :close="showHideHelpPopup"></PopupHelp>
    
    <PopupTarif v-if="isplanPopup" :close="planPopupShow"></PopupTarif>

    <Background v-if="background"></Background>

    <Loader v-show="loader"></Loader> -->
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
// import axios from "../Scripts/service/axios.js";

// import PopupHelp from './Popup/Help.vue'
// import PopupTarif from './Popup/Popup-tariff.vue'

// import Background from './Background.vue'
// import Loader from './Loader.vue'

import 'bootstrap-vue'

export default {
  name: "header-page",
  props: [
    "fixed", 
    "loader", 
    "menu", 
    "url", 
    "support", 
    "background",
    "parent_component"
  ],
  components: {
    // PopupHelp,
    // PopupTarif,
    // Background,
    // Loader
  },
  data() {
    let data = {
      name: "John Marston",
      email: "john@mail.com",
      flag_help_popup: false,
      isplanPopup: false,
    };
    return data;
  },
  mounted() {
    if (!VueCookies.get("AuthToken")) {
      this.$router.push("/");
    }
    // axios
    //   .get("user/details")
    //   .then((res) => {
    //     this.email = res.data.success.email;
    //     this.name = res.data.success.name;
    //     this.parent_component.user_name = res.data.success.name;
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     this.$router.push("/");
    //   });
  },
  methods: {
    planPopupShow() {
      this.isplanPopup = !this.isplanPopup;
    },
    showHideHelpPopup() {
      this.flag_help_popup = !this.flag_help_popup;
      document.getElementsByTagName("body")[0].style.overflow = this
        .flag_help_popup
        ? "hidden"
        : "";
    },
    logOut() {
      VueCookies.remove("AuthToken");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
@import './header.css';
</style>