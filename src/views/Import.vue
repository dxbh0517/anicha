<template>
  <div class="container mx-auto my-8">
    <h1 class="text-lg font-bold">Import Challenge</h1>
  </div>

  <div class="container mx-auto">
    <form action="#"  @submit.prevent="importChallenge">
      <div class="form-control my-2">
        <div class="relative">
          <input type="text" id="title" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content
          bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                 placeholder=" " name="title" value v-model="title" required />
          <label for="title" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4
           scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent
           peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
           peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Challenge title
          </label>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="form-control my-2">
          <div class="relative">
            <input type="text" id="img_link" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content
            bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                   placeholder=" " name="img_link" value v-model="img_link" />
            <label for="img_link" class="absolute text-sm text-primary font-bold duration-300 transform
            -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent
            peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
            peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Image Link
            </label>
          </div>
        </div>

        <div class="form-control my-2">
          <div class="relative">
            <input type="text" id="thread_link" class="block px-2.5 pb-2.5 pt-4 w-full text-sm
            text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none
            focus:input-accent focus:ring-0 peer"
                   placeholder=" " name="thread_link" value v-model="thread_link" required />
            <label for="thread_link" class="absolute text-sm text-primary font-bold duration-300 transform
            -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent
            peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
            peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Thread Link
            </label>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="form-control my-2">
          <select class="select select-primary w-full text-primary-content border-2 border-primary"
                  v-model="type" required >
            <option disabled value="">Type</option>
            <option>Anime</option>
            <option>Manga</option>
            <option>Both</option>
          </select>
        </div>

        <div class="form-control my-2">
          <select class="select select-primary w-full text-primary-content border-2 border-primary"
                  v-model="category" required >
            <option disabled value="">Category</option>
            <option>Classic Badges</option>
            <option>Collection Badges</option>
            <option>Event Badges</option>
            <option>Genre Badges</option>
            <option>Puzzle Badges</option>
            <option>Special Badges</option>
            <option>Tier Badges</option>
            <option>Manga City Badges</option>
            <option>Tier Badges</option>
            <option>Event Badges</option>
          </select>
        </div>
      </div>


      <div class="grid grid-cols-2 gap-4">
        <div class="form-control my-2">
          <label class="label cursor-pointer">
            <span class="label-text">Deadline</span>
            <input type="checkbox" checked="checked" class="checkbox checkbox-primary bg-base-100"
                   v-model="deadline" />
          </label>
        </div>

        <div class="form-control my-2">
          <div class="relative">
            <input type="date" id="deadline_date" class="block px-2.5 pb-2.5 pt-4 w-full text-sm
            text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2
            border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                   placeholder=" " name="deadline_date" value v-model="deadline_date" />

            <label for="deadline_date" class="absolute text-sm text-primary disabled:text-grey-500 font-bold
            duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2
            peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
            peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
              Deadline Date
            </label>
          </div>
        </div>
      </div>

      <div class="form-control my-2">
        <div class="relative">
          <textarea id="requirements" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content
          bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0
          peer h-96"
                 placeholder=" " name="requirements" v-model="requirements" required />
          <label for="requirements" class="absolute text-sm text-primary font-bold duration-300 transform
          -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent
          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
          peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Requirements
          </label>
        </div>
      </div>

      <div class="form-control my-4">
        <div class="relative">
          <textarea id="extra" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent
          rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                    placeholder=" " name="extra" v-model="extra" />
          <label for="extra" class="absolute text-sm text-primary font-bold duration-300 transform
          -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent
          peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
          peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Extra
          </label>
        </div>
      </div>

      <div class="w-full">
        <button type="submit" class="btn float-right btn-primary my-2 w-full">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "ImportComponent",
  data() {
    return {
      title: "",
      img_link: "",
      thread_link: "",
      type: "",
      deadline: true,
      deadline_date: "",
      requirements: "",
      extra: "",
      category: "",
    }
  },
  methods: {
    pad(num, size) {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    },
    async importChallenge() {
      let line = this.requirements.split("\n");
      let regex = /^\s*([a-zA-Z]{2}|[0-9][0-9]?|100)\)/;
      let count = 0;
      let position = [];
      let number = [];
      let requirement = [];
      let fulfilType = [];
      let note = [];

      if (this.img_link === "") {
        this.img_link = "https://awc.moe/static/images/badge-placeholder.png"
      }

      let deadlineDate;

      if (!this.deadline) {
        deadlineDate = 'YYYY-MM-DD'
      } else {
        deadlineDate = new Date(this.deadline_date);
        deadlineDate = deadlineDate.getFullYear() + "-" + this.pad(deadlineDate.getUTCMonth() + 1, 2) + "-" + this.pad(deadlineDate.getUTCDate(), 2)
      }

      for (let i = 0; i < line.length; i++) {
        if (line[i].match(regex)) {
          let temp = line[i].split(")");
          let temp2 = line[i].split("__");

          number.push(temp[0]);
          requirement.push(temp2[1]);
          position.push(count);

          count++;

          let temp3 = line[i+1].split('/');
          fulfilType.push(temp3[3])

          let temp4 = line[i+2].substring(line[i+2].indexOf('//') + 3)

          if (temp4.startsWith("art")) {
            temp4 = ""
          }

          note.push(temp4)
        }
        else if (line[i].startsWith("###__") || line[i].startsWith("### __")) {
          let temp = line[i].split("__");

          number.push("")
          requirement.push(temp[1]);
          position.push(count);
          fulfilType.push("divider")
          note.push("");

          count++;
        }
        else if (line[i].startsWith("__")) {
          let temp = line[i].split("__");

          number.push("")
          requirement.push(temp[1]);
          position.push(count);
          fulfilType.push("divider")
          note.push("");

          count++;
        }
      }

      if (this.extra === "") {
        this.extra = null
      }

      await addDoc(collection(db, "challengeList"), {
        deadline: this.deadline,
        deadlineDate: deadlineDate,
        extra: this.extra,
        fulfilments: null,
        fulfilType: fulfilType,
        imageLink: this.img_link,
        name: this.title,
        notes: note,
        numbers: number,
        requirements: requirement,
        threadLink: this.thread_link,
        type: this.type,
        position: position,
        category: this.category,
      })

      this.title = "";
      this.img_link = "";
      this.thread_link = "";
      this.type = "";
      this.deadline = true;
      this.deadline_date = "";
      this.requirements = "";
      this.extra = "";
      this.category = ""
    }
  }
}
</script>

<style scoped>

</style>