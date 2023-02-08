<template>
  <div class="container mx-auto">
    <div class="rounded-lg bg-base-200 p-4 m-4">
      <div class="border-b-solid border-b-primary border-b-4 px-4 py-2 m-4 lg:text-left">
        <h1 class="text-primary font-bold text-2xl">
          Current Challenges
        </h1>
      </div>

      <div class="grid justify-between gap-5 m-4 " style="grid-template-columns: repeat(auto-fill, minmax(142px, 1fr))">
        <template v-for="(challenge, index) in challengeList" v-bind:key="index">
          <template v-if="challenge.status==='In Progress'">
            <div class="relative h-max place-self-center">
              <router-link :to="'/challenge/' + challengeIdList[index]" class="min-h-max">
                <img :src="challenge.imageLink" :alt="challenge.name" class="
                  w-auto mx-auto hover:scale-110">
              </router-link>
            </div>
          </template>
        </template>
      </div>
    </div>

    <div class="grid md:grid-cols-1 lg:grid-cols-2">
      <div>
        <div class="rounded-lg bg-base-200 p-4 m-4">
          <div class="border-b-solid border-b-primary border-b-4 px-4 py-2 m-4 lg:text-left">
            <h1 class="text-primary font-bold text-2xl">
              Completed Challenges
            </h1>
          </div>

          <div class="grid justify-between gap-5 m-4 " style="grid-template-columns: repeat(auto-fill, minmax(142px, 1fr))">
            <template v-for="(challenge, index) in challengeList" v-bind:key="index">
              <template v-if="challenge.status==='Completed'">
                <div class="relative h-max place-self-center">
                  <router-link :to="'/challenge/' + challengeIdList[index]" class="min-h-max">
                    <img :src="challenge.imageLink" :alt="challenge.name" class="
                  w-auto mx-auto hover:scale-110">
                  </router-link>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>

      <div>
        <div class="rounded-lg bg-base-200 p-4 m-4">
          <div class="border-b-solid border-b-primary border-b-4 px-4 py-2 m-4 lg:text-left">
            <h1 class="text-primary font-bold text-2xl">
              Planning Challenges
            </h1>
          </div>

          <div class="grid justify-between gap-5 m-4 " style="grid-template-columns: repeat(auto-fill, minmax(142px, 1fr))">
            <template v-for="(challenge, index) in challengeList" v-bind:key="index">
              <template v-if="challenge.status==='Planning'">
                <div class="relative h-max place-self-center">
                  <router-link :to="'/challenge/' + challengeIdList[index]" class="min-h-max">
                    <img :src="challenge.imageLink" :alt="challenge.name" class="
                  w-auto mx-auto hover:scale-110">
                  </router-link>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {auth, db} from "@/firebase";
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";

export default {
  name: "ChallengesComponent",
  data() {
    return {
      loggedIn: false,
      displayName: "",
      uid: "",
      challengeList: [],
      challengeIdList: [],
    }
  },
  methods: {
    getUser() {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          this.loggedIn = false;
          this.$router.push('/login');
        } else if (user) {
          this.loggedIn = true;
          this.displayName = user.displayName;
          this.uid = user.uid;

          this.getChallenges()
        }
      })
    },
    async getChallenges() {
      this.challengeList = [];
      this.challengeIdList = [];
      this.fulfilList = [];
      const uid = this.uid;

      const q = query(collection(db, 'challenges'), where('uid', '==', uid), orderBy("name"))
      const querySnapshot = await getDocs(q);


      for (let i = 0; i < querySnapshot.docs.length; i++) {
        this.challengeList.push(querySnapshot.docs[i].data())
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        this.challengeIdList.push(querySnapshot.docs[i].id)
      }
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<style scoped>
.container {
  margin: 10px auto;
}
</style>