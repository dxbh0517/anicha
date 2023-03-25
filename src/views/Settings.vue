<template>
  <div class="center z-50" v-if="loading">
    <div class="hero h-fit w-fit bg-base-200 drop-shadow-lg rounded-lg">
      <div class="hero-content text-center">
        <div class="max-w-md flex">
          Loading
        </div>
      </div>
    </div>
  </div>

  <div class="container mx-auto p-4">
    <div>
      <h1 class="font-bold text-xl my-4">
        Challenge code
      </h1>

      <h2 class="font-bold text-lg my-4">
        Header
      </h2>

      <div class="alert shadow-lg m-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Make sure to include &#123;&#123; name &#125;&#125;, &#123;&#123; startDate &#125;&#125;, &#123;&#123; endDate &#125;&#125;, &#123;&#123; legendCompleted &#125;&#125; and &#123;&#123; legendNotCompleted &#125;&#125;</span>
        </div>
      </div>

      <textarea v-model="header" class="textarea border border-2 border-primary w-full m-4 h-48">

      </textarea>

      <h2 class="font-bold text-lg">
        Legend
      </h2>
      <div class="m-4">
        Legend: [<input type="text" class="input w-14" v-model="legendCompleted">] = Completed [<input type="text" class="input w-14" v-model="legendNotCompleted">] = Not Completed
      </div>

      <h2 class="font-bold text-lg">
        Footer
      </h2>
      <textarea v-model="footer" class="textarea border border-2 border-primary w-full m-4 h-36">

      </textarea>
    </div>

    <div class="flex border-t-primary border-t-2 my-4 justify-end">
      <button class="btn btn-primary btn-outline m-2" @click="save()">
        Save
      </button>
    </div>
  </div>

<!--  <div class="form-control my-4">
    <a class="btn btn-primary" href="https://anilist.co/api/v2/oauth/authorize?client_id=6555&response_type=token" target="_blank">
      Get Authorization code
    </a>
  </div>-->
</template>

<script>
import {auth, db} from "@/firebase";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";


export default {
  name: "SettingsPage",
  data() {
    return {
      loggedIn: false,
      displayName: "",
      uid: "",
      anilistUsername: "",
      anilistAuth: "",
      loading: false,
      header: "",
      footer: "",
      id: "",
      legendCompleted: "",
      legendNotCompleted: "",
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
            this.id = querySnapshot.docs[0].id
            this.anilistUsername = querySnapshot.docs[0].data().username;
            this.anilistAuth = querySnapshot.docs[0].data().anilistAuth;
            this.header = querySnapshot.docs[0].data().header;
            this.footer = querySnapshot.docs[0].data().footer;
            this.legendCompleted = querySnapshot.docs[0].data().legendCompleted;
            this.legendNotCompleted = querySnapshot.docs[0].data().legendNotCompleted;
          }
        })
      }
      finally {
        this.loading = false
      }
    },
    async save() {
      this.loading = true
      try {
        const docRef = doc(db, "users", this.id);


        await updateDoc(docRef, {
          header: this.header,
          footer: this.footer,
          legendCompleted: this.legendCompleted,
          legendNotCompleted: this.legendNotCompleted
        });

        this.getUser()

      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.loading = true
    try {
      this.getUser();
    }
    finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>