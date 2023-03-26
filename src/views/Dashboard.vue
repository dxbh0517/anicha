<template>
  <div class="center z-50" v-if="loading">
    <div class="flex items-center justify-center w-56 h-56 border rounded-lg bg-base-100 border-primary">
      <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 mr-2 animate-spin text-primary fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>

  <div class="container mx-auto">
    <div class="p-4 m-4 text-sm rounded-lg bg-gray-800 text-blue-400" role="alert">
      Got any issues or recommendations? <router-link to="/contact" class="underline">contact us</router-link> or join our discord <a href="https://discord.gg/Tj5BpPDrzp" target="_blank" class="underline">discord</a>
    </div>

    <div class="rounded-lg bg-base-200 p-4 m-4">
      <div class="border-b-solid border-b-primary border-b-4 px-4 py-2 m-4 lg:text-left">
        <h1 class="text-primary font-bold text-2xl">
          Challenges
        </h1>
      </div>

      <div class="grid justify-between gap-5 m-4 " style="grid-template-columns: repeat(auto-fill, minmax(142px, 1fr))">
        <template v-for="(challenge, index) in challengeList" v-bind:key="index">
          <template v-if="challenge.status === 'In Progress'">
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

    <div class="rounded-lg bg-base-200 p-4 m-4" v-if="nearCompletion.length !== 0">
      <div class="border-b-solid border-b-primary border-b-4 px-4 py-2 m-4 lg:text-left">
        <h1 class="text-primary font-bold text-2xl">
          Near Completion
        </h1>
      </div>

      <div class="m-4">
        <template v-for="(challenge, index) in nearCompletion" v-bind:key="index">
          <div class="relative h-max place-self-center border border-2 border-primary rounded-lg p-3 my-3">
            <div class="flex gap-4 items-center">
              <div class="w-32 hidden sm:block">
                <img :src="challenge[3]" :alt="challenge.name" class="
                  w-auto mx-auto hover:scale-110">
              </div>

              <div class="grow">
                <router-link :to="'/challenge/' + challenge[2]" class="font-bold text-xl">
                  {{ challenge[0] }}
                </router-link>
                <span class="text-primary text-sm font-bold mx-3">Progress: {{challenge[1]}}%</span>
                <progress class="progress progress-primary w-full" :value="challenge[1]" max="100"></progress>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="flex border-solid border-b-primary border-transparent border-b-4 p-4 m-4 justify-between">
      <button class="btn btn-outline btn-primary p-2 mr-2 font-bold" @click="refresh">
        <i class="fa-solid fa-arrows-rotate"></i>
        &nbsp;&nbsp;Refresh
      </button>

      <div class="flex gap-4">
        <div class="form-control">
          <label class="label cursor-pointer">
            <input type="checkbox" class="checkbox checkbox-primary bg-transparent" v-model="showCHAnimeManga"/>
            <span class="label-text mx-2">only show challenge anime/manga</span>
          </label>
        </div>

        <div class="form-control">
          <a class="btn btn-outline btn-primary p-2 mr-2 font-bold" href="#my-modal-2">
            <i class="fa-solid fa-plus"></i>
            &nbsp;&nbsp;Add Challenge
          </a>
        </div>
      </div>


    </div>

    <div class="modal" id="my-modal-2">
      <add-challenge />
    </div>

    <div class="grid md:grid-cols-1 lg:grid-cols-2">
      <div>
        <div class="rounded-lg bg-base-200 p-4 m-4 max-h-fit">
          <div class="border-solid border-b-primary border-transparent border-b-4 px-4 py-2 m-4 lg:text-left">
            <h1 class="text-primary font-bold text-2xl">
              Anime
            </h1>
          </div>
          <div class="grid justify-between gap-5 m-4" style="grid-template-columns: repeat(auto-fill, minmax(100px, 1fr))">
            <template v-for="item in list" v-bind:key="item">
              <template v-if="item.media.type === 'ANIME'">
                <template v-if="showCHAnimeManga === true">
                  <template v-for="(challenge) in challengeList" v-bind:key="challenge">
                    <template v-for="entry in challenge.fulfilments" v-bind:key="entry">
                      <template v-if="entry == item.mediaId">
                        <div class="relative w-full">
                          <a class="w-fit h-full" :href=" 'https://anilist.co/anime/' +  item.mediaId" target="_blank">
                            <img :src="item.media.coverImage.extraLarge" :alt="item.media.title.english"
                                 class="h-full w-auto mx-auto rounded-lg hover:scale-110">
                          </a>
                        </div>
                      </template>
                    </template>
                  </template>
                </template>

                <template v-if="showCHAnimeManga === false">
                  <div class="relative w-full">
                    <a class="w-fit h-full" :href=" 'https://anilist.co/anime/' +  item.mediaId" target="_blank">
                      <img :src="item.media.coverImage.extraLarge" :alt="item.media.title.english"
                           class="h-full w-auto mx-auto rounded-lg hover:scale-110">
                    </a>
                  </div>
                </template>
              </template>
            </template>
          </div>
        </div>
      </div>

      <div>
        <div class="rounded-lg bg-base-200 p-4 m-4 max-h-fit">
          <div class="border-solid border-b-primary border-transparent border-b-4 px-4 py-2 m-4 lg:text-left">
            <h1 class="text-primary font-bold text-2xl">
              Manga
            </h1>
          </div>

          <div class="grid justify-between gap-5 m-4" style="grid-template-columns: repeat(auto-fill, minmax(100px, 1fr))">
            <template v-for="item in list" v-bind:key="item">
              <template v-if="item.media.type === 'MANGA'">
                <template v-if="showCHAnimeManga === true">
                  <template v-for="(challenge) in challengeList" v-bind:key="challenge">
                    <template v-for="entry in challenge.fulfilments" v-bind:key="entry">
                      <template v-if="entry == item.mediaId">
                        <div class="relative w-full">
                          <a class="w-fit h-full" :href=" 'https://anilist.co/anime/' +  item.mediaId" target="_blank">
                            <img :src="item.media.coverImage.extraLarge" :alt="item.media.title.english"
                                 class="h-full w-auto mx-auto rounded-lg hover:scale-110">
                          </a>
                        </div>
                      </template>
                    </template>
                  </template>
                </template>

                <template v-if="showCHAnimeManga === false">
                  <div class="relative w-full">
                    <a class="w-fit h-full" :href=" 'https://anilist.co/manga/' +  item.mediaId" target="_blank">
                      <img :src="item.media.coverImage.extraLarge" :alt="item.media.title.english"
                           class="h-full w-auto mx-auto rounded-lg hover:scale-110">
                    </a>
                  </div>
                </template>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/firebase";
import { collection, getDocs, query, where, doc, updateDoc, orderBy } from "firebase/firestore";
import AddChallenge from "@/components/addChallenge.vue";

export default {
  name: "DashboardComponent",
  components: {AddChallenge},
  data() {
    return {
      loggedIn: false,
      displayName: "",
      uid: "",
      anilistUsername: "",
      anilistAuth: "",
      loading: false,
      list: [],
      fulfilList: [],
      challengeList: [],
      challengeIdList: [],
      progressList: [],
      nearCompletion: [],
      showCHAnimeManga: false
    }
  },
  methods: {
    getUser() {
      this.loading = true
      try {
        auth.onAuthStateChanged(async (user) => {
          if (!user) {
            this.loggedIn = false;
            this.$router.push('/login');
          } else if (user) {
            this.loggedIn = true;
            this.displayName = user.displayName;
            this.uid = user.uid;

            const q = query(collection(db, 'users'), where('uid', '==', user.uid))
            const querySnapshot = await getDocs(q);

            this.anilistUsername = querySnapshot.docs[0].data().username;
            this.anilistAuth = querySnapshot.docs[0].data().anilistAuth;
          }
        })
      }
      finally {
        this.loading = false
      }
    },
    async getCurrent() {
      this.loading = true
      try {
        const username = this.anilistUsername;
        const token = this.anilistAuth;

        const query = `
          query ($username: String) {
            Page {
                mediaList (userName: $username, sort: [UPDATED_TIME_DESC], status: CURRENT){
                    mediaId
                    media {
                        type
                        title {
                            english
                        }
                        coverImage {
                            extraLarge
                        }
                    }
                }
            }
        }
      `;

        const variables = {
          username: username,
        };


        const url = 'https://graphql.anilist.co',
            options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            };

        await fetch(url, options)
            .then((response) => {
              return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
              });
            })
            .then(async (result) => {
              this.list = await result.data.Page.mediaList
            })
            .catch((error) => {
              console.error(error)
              this.getCurrent()
            });
      }
      finally {
        this.loading = false
      }
    },
    async getChallengeList() {
      this.loading = true
      try {
        this.challengeList = [];
        this.challengeIdList = [];
        this.fulfilList = [];
        const uid = this.uid;

        const q = await query(collection(db, 'challenges'), where('uid', '==', uid), where('status', 'in', ['In Progress', 'Planning']), orderBy("name"))
        const querySnapshot = await getDocs(q);


        for (let i = 0; i < querySnapshot.docs.length; i++) {
          this.challengeList.push(querySnapshot.docs[i].data())
        }

        for (let i = 0; i < querySnapshot.docs.length; i++) {
          this.challengeIdList.push(querySnapshot.docs[i].id)
        }

        for (let i = 0; i < querySnapshot.docs.length; i++) {
          for (let j = 0; j < querySnapshot.docs[i].data().fulfilments.length; j++) {
            if (!this.fulfilList.includes(querySnapshot.docs[i].data().fulfilments[j])) {
              if (querySnapshot.docs[i].data().fulfilments[j] !== "") {
                this.fulfilList.push(querySnapshot.docs[i].data().fulfilments[j])
              }
            }
          }
        }

        await this.getProgress()
      }
      finally {
        this.loading = false
      }
    },
    async getProgress() {
      this.progressList = []
      const username = this.anilistUsername;
      const token = this.anilistAuth;
      const fulfilList = this.fulfilList;
      let nextPage = true
      let i = 1

      while (nextPage) {
        const query = `
        query ($username: String, $idList: [Int], $pageNum: Int) {
          Page (page: $pageNum, perPage: 50) {
              pageInfo {
                  total
                  currentPage
                  lastPage
                  hasNextPage
              }
              mediaList (userName: $username, sort: [UPDATED_TIME_DESC], mediaId_in: $idList){
                  mediaId
                  status
                  progress
                  media {
                      episodes
                      chapters
                  }
                  completedAt {
                    year
                    month
                    day
                  }
              }
          }
      }
    `;

        const variables = {
          username: username,
          idList: fulfilList,
          pageNum: i
        };


        const url = 'https://graphql.anilist.co',
            options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            };

        await fetch(url, options)
            .then((response) => {
              return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
              });
            })
            .then(async (result) => {
              if (result.data.Page.pageInfo.hasNextPage) {
                nextPage = true
                i++
              } else if (!result.data.Page.pageInfo.hasNextPage){
                nextPage = false
              }
              for (let k = 0; k < result.data.Page.mediaList.length; k++){
                this.progressList.push(await result.data.Page.mediaList[k])
              }
            })
            .catch((error) => {
              console.error(error)
            });
      }

      await this.updateProgress()
    },
    async updateProgress() {
      let challengeProgress;
      let challengeTotal;
      let list = [];

      for (let i = 0; i < this.challengeList.length; i ++) {
        challengeProgress = 0;
        challengeTotal = 0;

        for (let j = 0; j < this.challengeList[i].fulfilments.length; j++) {
          for (let k = 0; k < this.progressList.length; k++) {
            if (this.progressList[k].mediaId == this.challengeList[i].fulfilments[j]) {
              list.push(this.progressList[k])
              challengeTotal++;
              if (this.progressList[k].status === "COMPLETED") {
                challengeProgress++
              } else {
                if (this.progressList[k].media.episodes != null) {
                  challengeProgress = challengeProgress + Math.round(this.progressList[k].progress / this.progressList[k].media.episodes * 100) / 100
                } else if (this.progressList[k].media.chapters != null) {
                  challengeProgress = challengeProgress + Math.round(this.progressList[k].progress / this.progressList[k].media.chapters * 100) / 100
                } else {
                  challengeProgress = challengeProgress + Math.round(this.progressList[k].progress / (this.progressList[k].progress + 1) * 100 ) /100
                }
              }
            }
          }
        }

        if (challengeTotal !== 0) {
          const result = Math.round((challengeProgress / challengeTotal) * 100);

          const ref = doc(db, 'challenges', this.challengeIdList[i]);

          if (result === 100) {
            console.log("set to 100")
            let latestDate = list[0].completedAt;

            for (let i = 1; i < list.length; i++) {
              let currentDate = list[i].completedAt;

              if (currentDate.year > latestDate.year) {
                latestDate = currentDate;
              } else if (currentDate.year === latestDate.year) {
                if (currentDate.month > latestDate.month) {
                  latestDate = currentDate;
                } else if (currentDate.month === latestDate.month) {
                  if (currentDate.day > latestDate.day) {
                    latestDate = currentDate;
                  }
                }
              }
            }

            let date = latestDate.year + "-" + this.pad(latestDate.month, 2) + "-" + this.pad(latestDate.day, 2)

            await updateDoc(ref, {
              progress: result,
              status: "Completed",
              endDate: date
            });
          }

          else if (result >= 80) {
            this.nearCompletion.push([this.challengeList[i].name, this.challengeList[i].progress, this.challengeIdList[i], this.challengeList[i].imageLink])
          }

          else {
            await updateDoc(ref, {
              progress: result
            });
          }
        }
      }
    },
    pad(num, size) {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    },
    refresh() {
      this.nearCompletion = [];
      this.loading = true
      try {
        setTimeout(this.getUser(), 200)
        setTimeout(this.getCurrent, 400);
        setTimeout(this.getChallengeList, 400);
      }
      finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.loading = true
    try {
      this.getUser();
      setTimeout(this.getCurrent, 400);
      setTimeout(this.getChallengeList, 400);
    }
    finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
