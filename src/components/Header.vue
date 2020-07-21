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

<style>
@media (orientation: landscape) {
  .img-width-logo {
    width: 60vh !important;
    max-width: 318px;
  }
}

.width-men {
  left: -64% !important;
}
.header {
  display: flex;
  align-items: center;
  width: 100vw;
  min-height: 64px;
  background: linear-gradient(to right, #3d72ff, #14beff);
  z-index: 99999999;
}

.fix_position {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}

.img-width-logo {
  display: flex;
  width: 36vh;
  max-width: 318px;
}

.img-width-logo-user {
  width: 40%;
}

.wrapper-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.logo-user {
  color: #fff;
  font-size: 18px;
  margin-left: 4px;
}

.user-block {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.block-user-data {
  display: flex;
  align-items: flex-start;
  justify-content: left;
  flex-direction: column;
  padding-left: 24px;
}

.user-name {
  color: #0078d7;
  font-weight: 900;
  font-size: 16px;
  overflow: hidden;
  width: 90%;
  text-overflow: ellipsis;
}

.user-email {
  overflow: hidden;
  color: #767676;
  width: 90%;
  text-overflow: ellipsis;
}

.background-black {
  position: absolute;
  z-index: 9;
  top: 8vh;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.29);
  overflow: hidden;
}

.support {
  color: #fff;
}
</style>

