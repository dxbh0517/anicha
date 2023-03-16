<template>
  <div class="modal-box" >
    <div class="grid grid-cols-2 gap-4">
      <button class="btn w-full btn-primary my-2" @click="openTab('New')" id="newBtn">New challenge</button>
      <button class="btn w-full my-2" @click="openTab('Import')" id="importBtn">Import challenge</button>
    </div>

    <div id="New" class="">
      <form action="#"  @submit.prevent="addChallenge">
        <div class="form-control my-4">
          <div class="relative">
            <input type="text" id="title" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                   placeholder=" " name="title" value v-model="title" required />
            <label for="title" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Challenge title
            </label>
          </div>
        </div>

        <div class="form-control my-2">
          <div class="relative">
            <input type="text" id="post_link" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                   placeholder=" " name="post_link" value v-model="post_link" required />
            <label for="post_link" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Post Link
            </label>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control my-2">
            <div class="relative">
              <input type="text" id="img_link" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="img_link" value v-model="img_link" />
              <label for="img_link" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Image Link
              </label>
            </div>
          </div>

          <div class="form-control my-2">
            <div class="relative">
              <input type="text" id="thread_link" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="thread_link" value v-model="thread_link" required />
              <label for="thread_link" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Thread Link
              </label>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control my-2">
            <select class="select select-primary w-full max-w-xs text-primary-content border-2 border-primary"
                    v-model="type" required >
              <option disabled value="">Type</option>
              <option>Anime</option>
              <option>Manga</option>
              <option>Both</option>
            </select>
          </div>

          <div class="form-control my-2">
            <select class="select select-primary w-full max-w-xs text-primary-content border-2 border-primary"
                    v-model="ch_status" required >
              <option disabled value="">Status</option>
              <option>In Progress</option>
              <option>Planning</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control my-2">
            <div class="relative">
              <input type="date" id="start_date" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="start_date" value v-model="start_date" required />
              <label for="start_date" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Start Date
              </label>
            </div>
          </div>

          <div class="form-control my-2">
            <div class="relative">
              <input type="date" id="end_date" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="end_date" value v-model="end_date" />
              <label for="end_date" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                End Date
              </label>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control my-2">
            <label class="label cursor-pointer">
              <span class="label-text">Deadline</span>
              <input type="checkbox" checked="checked" class="checkbox checkbox-primary bg-base-100" v-model="deadline" @change="changeDisabled"/>
            </label>
          </div>

          <div class="form-control my-2">
            <div class="relative">
              <input type="date" id="deadline_date" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="deadline_date" value v-model="deadline_date" v-bind:disabled="disabled"/>

              <label for="deadline_date" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Deadline Date
              </label>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <a href="#" class="btn float-left btn-error my-2" @click="cancel">Cancel</a>
          <button type="submit" class="btn float-right btn-primary my-2">Save</button>
        </div>
      </form>
    </div>

    <div id="Import" class="hidden">
      <form action="#" @submit.prevent="importChallenge">
        <template v-if="otherOptions">
          <div class="form-control my-2">
            <div class="relative">
              <input type="text" id="title" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="title" value v-model="title" required />
              <label for="title" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Challenge title
              </label>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control my-2">
              <div class="relative">
                <input type="text" id="post_link" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                       placeholder=" " name="post_link" value v-model="post_link" required />
                <label for="post_link" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Post Link
                </label>
              </div>
            </div>

            <div class="form-control my-2">
              <select class="select select-primary w-full max-w-xs text-primary-content border-2 border-primary"
                      v-model="type" required >
                <option disabled value="">Type</option>
                <option>Anime</option>
                <option>Manga</option>
                <option>Both</option>
              </select>
            </div>
          </div>
        </template>

        <template v-if="!otherOptions">
          <div class="form-control my-2">
            <div class="relative">
              <input type="text" id="post_link" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="post_link" value v-model="post_link" required />
              <label for="post_link" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Post Link
              </label>
            </div>
          </div>
        </template>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control my-2">
            <select class="select select-primary w-full max-w-xs text-primary-content border-2 border-primary"
                    v-model="challengeId" required @change="displayOther">
              <option disabled value="">Challenge list</option>
              <template v-for="items in challengeList" v-bind:key="items">
                <option :value="items.id">{{ items.data.name }}</option>
              </template>
              <option value="other">other</option>
            </select>
          </div>

          <div class="form-control my-2">
            <select class="select select-primary w-full max-w-xs text-primary-content border-2 border-primary"
                    v-model="ch_status" required >
              <option disabled value="">Status</option>
              <option>In Progress</option>
              <option>Planning</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <template v-if="otherOptions">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control my-2">
              <div class="relative">
                <input type="text" id="img_link" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                       placeholder=" " name="img_link" value v-model="img_link" />
                <label for="img_link" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Image Link
                </label>
              </div>
            </div>

            <div class="form-control my-2">
              <div class="relative">
                <input type="text" id="thread_link" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                       placeholder=" " name="thread_link" value v-model="thread_link" required />
                <label for="thread_link" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Thread Link
                </label>
              </div>
            </div>
          </div>
        </template>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control my-2">
            <div class="relative">
              <input type="date" id="start_date" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="start_date" value v-model="start_date" required />
              <label for="start_date" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Start Date
              </label>
            </div>
          </div>

          <div class="form-control my-2">
            <div class="relative">
              <input type="date" id="end_date" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="end_date" value v-model="end_date" />
              <label for="end_date" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                End Date
              </label>
            </div>
          </div>
        </div>

        <template v-if="otherOptions">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control my-2">
              <label class="label cursor-pointer">
                <span class="label-text">Deadline</span>
                <input type="checkbox" checked="checked" class="checkbox checkbox-primary bg-base-100" v-model="deadline" @change="changeDisabled"/>
              </label>
            </div>

            <div class="form-control my-2">
              <div class="relative">
                <input type="date" id="deadline_date" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                       placeholder=" " name="deadline_date" value v-model="deadline_date" v-bind:disabled="disabled"/>

                <label for="deadline_date" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Deadline Date
                </label>
              </div>
            </div>
          </div>
        </template>

        <div class="grid grid-cols-2 gap-4">
          <a href="#" class="btn float-left btn-error my-2" @click="cancel">Cancel</a>
          <button type="submit" class="btn float-right btn-primary my-2">Save</button>
        </div>
      </form>
    </div>


  </div>
</template>

<script>
import { auth, db } from "@/firebase";
import {addDoc, collection, getDocs, query, orderBy} from "firebase/firestore";
import router from "@/router";

export default {
  name: "addChallenge",
  data() {
    return {
      uid: "",
      disabled: false,
      title: "",
      post_link: "",
      img_link: "",
      thread_link: "",
      type: "",
      ch_status: "",
      start_date: "",
      end_date: "",
      deadline: true,
      deadline_date: "",
      challengeList: [],
      challengeId: "",
      otherOptions: false,
    }
  },
  methods: {
    getUser() {
      auth.onAuthStateChanged(async (user) => {
        this.uid = user.uid;
      })
    },
    pad(num, size) {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    },
    async addChallenge() {
      let startDate = new Date(this.start_date);
      startDate = startDate.getFullYear() + "-" + this.pad(startDate.getUTCMonth()+1, 2) + "-" + this.pad(startDate.getUTCDate(), 2)
      let endDate;
      if (!this.end_date) {
        endDate = 'YYYY-MM-DD'
      } else {
        endDate = new Date(this.end_date);
        endDate = endDate.getFullYear() + "-" + this.pad(endDate.getUTCMonth()+1, 2) + "-" + this.pad(endDate.getUTCDate(), 2)
      }

      let deadlineDate;

      if (!this.deadline) {
        deadlineDate = 'YYYY-MM-DD'
      } else {
        deadlineDate = new Date(this.deadline_date);
        deadlineDate = deadlineDate.getFullYear() + "-" + this.pad(deadlineDate.getUTCMonth()+1, 2) + "-" + this.pad(deadlineDate.getUTCDate(), 2)
      }

      if (this.img_link === "") {
        this.img_link = "https://awc.moe/static/images/badge-placeholder.png"
      }

      const docRef = await addDoc(collection(db, "challenges"), {
        uid: this.uid,
        name: this.title,
        postLink: this.post_link,
        imageLink: this.img_link,
        threadLink: this.thread_link,
        type: this.type,
        status: this.ch_status,
        startDate: startDate,
        endDate: endDate,
        deadline: this.deadline,
        deadlineDate: deadlineDate,
        extra: null,
        fulfilments: null,
        fulfilType: null,
        notes: null,
        numbers: null,
        progress: 0,
        requirements: null,
        position: null,
      });

      await router.push('/challenge/' + docRef.id)
    },
    changeDisabled() {
      this.disabled = !this.disabled
    },
    openTab(type) {
      if (type === 'New') {
        document.getElementById('New').classList.remove('hidden');
        document.getElementById('newBtn').classList.add('btn-primary');
        document.getElementById('Import').classList.add('hidden');
        document.getElementById('importBtn').classList.remove('btn-primary');
      }
      else if (type === 'Import') {
        document.getElementById('New').classList.add('hidden');
        document.getElementById('newBtn').classList.remove('btn-primary');
        document.getElementById('Import').classList.remove('hidden');
        document.getElementById('importBtn').classList.add('btn-primary');
      }
    },
    async getChallenge() {
      const q = query(collection(db, 'challengeList'), orderBy("name"))
      const querySnapshot = await getDocs(q);

      for (let i = 0; i < querySnapshot.docs.length; i++) {
        this.challengeList.push({id: querySnapshot.docs[i].id, data: querySnapshot.docs[i].data()})
      }
    },
    async importChallenge() {
      let startDate = new Date(this.start_date);
      startDate = startDate.getFullYear() + "-" + this.pad(startDate.getUTCMonth() + 1, 2) + "-" + this.pad(startDate.getUTCDate(), 2)
      let endDate;
      if (!this.end_date) {
        endDate = 'YYYY-MM-DD'
      } else {
        endDate = new Date(this.start_date);
        endDate = endDate.getFullYear() + "-" + this.pad(endDate.getUTCMonth() + 1, 2) + "-" + this.pad(endDate.getUTCDate(), 2)
      }

      let deadline;
      let deadlineDate;
      let extra;
      let fulfilments;
      let fulfilType = null;
      let imageLink;
      let name;
      let note;
      let numbers;
      let position;
      let requirements
      let threadLink;
      let type;
      let docRef;

      if (this.challengeId !== 'other') {
        for (let i = 0; i < this.challengeList.length; i++) {
          if (this.challengeList[i].id === this.challengeId) {
            deadline = this.challengeList[i].data.deadline;
            deadlineDate = this.challengeList[i].data.deadlineDate;
            extra = this.challengeList[i].data.extra;
            fulfilments = this.challengeList[i].data.fulfilments;
            imageLink = this.challengeList[i].data.imageLink;
            name = this.challengeList[i].data.name;
            note = [];
            numbers = [];
            position = []
            requirements = [];
            threadLink = this.challengeList[i].data.threadLink;
            type = this.challengeList[i].data.type;
          }
        }
      }

      else if (this.challengeId === 'other') {
        deadline = this.deadline;
        deadlineDate = this.deadline_date;
        extra = null;
        fulfilments = null;
        imageLink = this.img_link;
        name = this.title;
        note = [];
        numbers = [];
        position = []
        requirements = [];
        threadLink = this.thread_link;
        type = this.type;
      }

      if (fulfilments === null) {
        const code = this.post_link.split("/")
        const threadCode = code[5]
        const commentCode = code[7]
        let comment = "";
        let childComments = "";
        fulfilments = []
        fulfilType = [];

        const query = `
              query ($threadId: Int, $id: Int) {
                  ThreadComment (id: $id, threadId: $threadId) {
                      comment
                      childComments
                  }
              }
            `;

        const variables = {
          threadId: threadCode,
          id: commentCode
        };


        const url = 'https://graphql.anilist.co',
            options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            };

        fetch(url, options).then(handleResponse)
            .then(async (result) => {
              comment = await result.data.ThreadComment[0].comment;
              childComments = await result.data.ThreadComment[0].childComments;

              let regex = /^\s*([a-zA-Z]\d|[a-zA-Z]{2}|[0-9][0-9]?|100)\)/;
              let count = 0;

              let line = comment.split('\n')

              for (let i = 0; i < line.length; i++) {
                if (line[i].match(regex)) {
                  let temp = line[i].split(")");
                  let temp2 = line[i].split("__");

                  numbers.push(temp[0]);
                  requirements.push(temp2[1]);
                  position.push(count);

                  count++;

                  let temp3 = line[i+1].split('/');
                  fulfilType.push(temp3[3])
                  fulfilments.push(temp3[4]);

                  let temp4 = line[i+2].substring(line[i+2].indexOf('//') + 3)

                  if (temp4.startsWith("art")) {
                    temp4 = ""
                  }

                  note.push(temp4)
                }
                else if (line[i].startsWith("###__") || line[i].startsWith("### __")) {
                  let temp = line[i].split("__");

                  numbers.push("")
                  requirements.push(temp[1]);
                  position.push(count);
                  fulfilType.push("divider")
                  fulfilments.push("");
                  note.push("");

                  count++;
                }
                else if (line[i].startsWith("__")) {
                  let temp = line[i].split("__");

                  numbers.push("")
                  requirements.push(temp[1]);
                  position.push(count);
                  fulfilType.push("divider")
                  fulfilments.push("");
                  note.push("");

                  count++;
                }
              }

              if (childComments !== null) {
                for (let i = 0; i < childComments.length; i++) {
                  let line2 = childComments[i].comment.split('\n')
                  for (let j = 0; j < line2.length; j++) {
                    if (line2[j].match(regex)) {
                      let temp = line2[j].split(")");
                      let temp2 = line2[j].split("__");

                      numbers.push(temp[0]);
                      requirements.push(temp2[1]);
                      position.push(count);

                      count++;

                      let temp3 = line2[j+1].split('/');
                      fulfilType.push(temp3[3])
                      fulfilments.push(temp3[4]);

                      let temp4 = line2[j+2].substring(line2[j+2].indexOf('//') + 3)

                      if (temp4.startsWith("art")) {
                        temp4 = ""
                      }

                      note.push(temp4)
                    }
                    else if (line2[j].startsWith("###__")) {
                      let temp = line2[j].split("__");
                      console.log(temp)

                      numbers.push("")
                      requirements.push(temp[1]);
                      position.push(count);
                      fulfilType.push("divider")
                      fulfilments.push("");
                      note.push("");

                      count++;
                    }
                    else if (line2[j].startsWith("__")) {
                      let temp = line2[j].split("__");

                      numbers.push("")
                      requirements.push(temp[1]);
                      position.push(count);
                      fulfilType.push("divider")
                      fulfilments.push("");
                      note.push("");

                      count++;
                    }
                  }
                }
              }

              docRef = await addDoc(collection(db, "challenges"), {
                uid: this.uid,
                name: name,
                postLink: this.post_link,
                imageLink: imageLink,
                threadLink: threadLink,
                type: type,
                status: this.ch_status,
                startDate: startDate,
                endDate: endDate,
                deadline: deadline,
                deadlineDate: deadlineDate,
                extra: extra,
                fulfilments: fulfilments,
                fulfilType: fulfilType,
                notes: note,
                numbers: numbers,
                requirements: requirements,
                position: position,
              });

              await router.push('/challenge/' + docRef.id)
            })
            .catch(handleError);

        // eslint-disable-next-line no-inner-declarations
        function handleResponse(response) {
          return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
          });
        }

        // eslint-disable-next-line no-inner-declarations
        function handleError(error) {
          console.error(error)
        }
      } else {
        docRef = await addDoc(collection(db, "challenges"), {
          uid: this.uid,
          name: name,
          postLink: this.post_link,
          imageLink: imageLink,
          threadLink: threadLink,
          type: type,
          status: this.ch_status,
          startDate: startDate,
          endDate: endDate,
          deadline: deadline,
          deadlineDate: deadlineDate,
          extra: extra,
          fulfilments: null,
          fulfilType: null,
          notes: note,
          numbers: numbers,
          requirements: requirements,
          position: position
        });

        await router.push('/challenge/' + docRef.id)
      }
    },
    cancel() {
      this.title =  "";
      this.post_link =  "";
      this.img_link =  "";
      this.thread_link =  "";
      this.type =  "";
      this.ch_status =  "";
      this.start_date =  "";
      this.end_date =  "";
      this.deadline = true;
      this.deadline_date =  "";
      this.challengeId = "";
      this.otherOptions = false
    },
    displayOther() {
      if (this.challengeId === 'other') {
        this.otherOptions = true
      } else {
        this.otherOptions = false
      }
    }
  },
  mounted() {
    this.getUser();
    this.getChallenge();
  }
}
</script>

<style scoped>

</style>