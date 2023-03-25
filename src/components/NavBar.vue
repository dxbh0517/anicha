<template>
  <div class="container mx-auto">
    <div class="navbar bg-base-100">
      <div class="navbar-start" >
        <div class="dropdown" v-if="user.loggedIn">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <router-link to="/dashboard" class="colorIt">
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link class="colorIt" to="/challenges">
                Challenges
              </router-link>
            </li>

            <li>
              <router-link class="colorIt" to="/settings">
                Settings
              </router-link>
            </li>
          </ul>
        </div>
        <router-link to="/dashboard" class="btn btn-ghost normal-case text-xl">Anicha</router-link>
      </div>
      <div class="navbar-center hidden lg:flex" v-if="user.loggedIn">
        <ul class="menu menu-horizontal px-1">
          <li>
            <router-link class="colorIt" to="/dashboard">
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link class="colorIt" to="/challenges">
              Challenges
            </router-link>
          </li>
          <li>
            <router-link class="colorIt" to="/settings">
              Settings
            </router-link>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <div v-if="!user.loggedIn">
          <router-link class="btn btn-primary" to="/login">Login</router-link>
        </div>

        <div v-if="user.loggedIn">
          <button class="btn btn-primary" @click.prevent="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {auth} from "@/firebase";

export default {
  name: "NavBar",
  data() {
    return {
      user: {
        loggedIn: false,
      },
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    GetUser() {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          this.user.loggedIn = false
        } else if (user) {
          this.user.loggedIn = true
        }
      })
    },
  },
  mounted() {
    this.GetUser()
  }
}
</script>

<style scoped>

</style>