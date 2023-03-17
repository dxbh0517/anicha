<template>
  <div class="container mx-auto">
    <div class="rounded-lg bg-base-200 p-4 m-4">
      <div class="border-b-solid border-b-primary border-b-4 px-4 py-2 m-4 lg:text-left">
        <h1 class="text-primary font-bold text-2xl">
          Challenges
        </h1>
      </div>

      <div class="grid justify-between gap-5 m-4 " style="grid-template-columns: repeat(auto-fill, minmax(142px, 1fr))">
        <template v-for="(challenge, index) in challengeList" v-bind:key="index">
          <div class="relative h-max place-self-center">
            <router-link :to="'/challenge/' + challengeIdList[index]" class="min-h-max">
              <img :src="challenge.imageLink" :alt="challenge.name" class="
                  w-auto mx-auto hover:scale-110">
            </router-link>
          </div>
        </template>
      </div>
    </div>

    <div class="rounded-lg bg-base-200 p-4 m-4">
      <div class="border-b-solid border-b-primary border-b-4 px-4 py-2 m-4 lg:text-left">
        <h1 class="text-primary font-bold text-2xl">
          Near Completion
        </h1>
      </div>

      <div class="m-4">
        <template v-for="(challenge, index) in nearCompletion" v-bind:key="index">
          <div class="relative h-max place-self-center border border-2 border-primary rounded-lg p-3 my-3">
            <router-link :to="'/challenge/' + challenge[2]" class="font-bold text-lg">
              {{ challenge[0] }}
            </router-link>
            <progress class="progress progress-primary w-full" :value="challenge[1]" max="100"></progress>
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
            <input type="checkbox" class="checkbox checkbox-primary" v-model="showCHAnimeManga"/>
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
    },
    getCurrent() {
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

      fetch(url, options).then(handleResponse)
          .then((result) => {
            this.list = result.data.Page.mediaList
          })
          .catch(handleError);

      function handleResponse(response) {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      }

      function handleError(error) {
        console.error(error)
      }
    },
    async getChallengeList() {
      this.challengeList = [];
      this.challengeIdList = [];
      this.fulfilList = [];
      const uid = this.uid;

      const q = query(collection(db, 'challenges'), where('uid', '==', uid), where('status', '==', 'In Progress'), orderBy("name"))
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
            this.fulfilList.push(querySnapshot.docs[i].data().fulfilments[j])
          }
        }
      }

      this.getProgress()
    },
    getProgress() {
      const username = this.anilistUsername;
      const token = this.anilistAuth;
      const fulfilList = this.fulfilList

      const query = `
          query ($username: String, $idList: [Int]) {
            Page {
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
        idList: fulfilList
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

      fetch(url, options).then(handleResponse)
          .then((result) => {
            this.progressList = result.data.Page.mediaList
            this.updateProgress()
          })
          .catch(handleError);

      function handleResponse(response) {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      }

      function handleError(error) {
        console.error(error)
      }
    },
    updateProgress() {
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

            updateDoc(ref, {
              progress: result,
              status: "Completed",
              endDate: date
            });
          }

          else if (result >= 80) {
            this.nearCompletion.push([this.challengeList[i].name, this.challengeList[i].progress, this.challengeIdList[i]])
          }

          else {
            updateDoc(ref, {
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
      setTimeout(this.getUser(), 200)
      setTimeout(this.getCurrent, 400);
      setTimeout(this.getChallengeList, 400);
    }
  },
  mounted() {
    this.getUser();
    setTimeout(this.getCurrent, 400);
    setTimeout(this.getChallengeList, 400);
  }
}
</script>

<style scoped>

</style>
