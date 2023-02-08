<template>
  <div class="container mx-auto">
    <div class="rounded-lg bg-base-200 p-4 m-4">
      <div class="border-b-solid border-b-primary border-b-4 px-4 py-2 m-4 lg:text-left">
        <h1 class="text-primary font-bold text-2xl">
          Challenges
        </h1>
      </div>

      <div class="px-4 py-2 m-4 lg:text-right">
        <router-link to="/import" class="btn btn-outline btn-primary p-2 mr-2 font-bold">
          Import
        </router-link>
      </div>

      <div class="grid justify-between gap-5 m-4 " style="grid-template-columns: repeat(auto-fill, minmax(142px, 1fr))">
        <template v-for="(challenge, index) in challengeList" v-bind:key="index">
          <div class="relative h-max place-self-center">
            <router-link :to="'/challengeList/' + challengeIdList[index]" class="min-h-max">
              <img :src="challenge.imageLink" :alt="challenge.name" class="
                  w-auto mx-auto hover:scale-110">
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "ChallengeList",
  data() {
    return {
      challengeIdList: [],
      challengeList: []
    }
  },
  methods: {
    async getChallengeList() {
      this.challengeList = [];
      this.challengeIdList = [];

      const q = query(collection(db, 'challengeList'), orderBy("name"))
      const querySnapshot = await getDocs(q);


      for (let i = 0; i < querySnapshot.docs.length; i++) {
        this.challengeList.push(querySnapshot.docs[i].data())
      }

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        this.challengeIdList.push(querySnapshot.docs[i].id)
      }

    },
  },
  mounted() {
    this.getChallengeList()
  }
}
</script>

<style scoped>

</style>