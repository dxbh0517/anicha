<template>
  <div class="container bg-base-200 mx-auto my-8 p-4 rounded-lg">
    <div class="flex ...">
      <div class="mr-5 ml-3 grid content-center">
        <img :src="imgLink" class="w-60 max-h-fit">
      </div>

      <div class="grid grid-flow-row auto-rows-max gap w-full">
        <div class="max-h-fit">
          <h1 class="font-bold text-2xl">
            {{ name }}
          </h1>
        </div>

        <div class="flex flex-wrap content-center p-4">
          <div class="text-center justify-self-center p-4 min-w-40 flex-grow">
            <div class="relative">
              <p class="block px-2.5 pb-2.5 pt-4 w-full text-base text-center text-primary-content font-bold bg-transparent rounded-lg border-2 border-primary appearance-none peer">
                {{ type }}
              </p>

              <label class="absolute text-base text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 left-1">
                Type
              </label>
            </div>
          </div>

          <div class="text-center justify-self-center p-4 min-w-40 flex-grow">
            <div class="relative">
              <p class="block px-2.5 pb-2.5 pt-4 w-full text-base text-center text-primary-content font-bold bg-transparent rounded-lg border-2 border-primary appearance-none peer">
                {{ category }}
              </p>

              <label class="absolute text-base text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 left-1">
                Category
              </label>
            </div>
          </div>
        </div>

        <div class="w-full border-t-2 border-t-primary flex justify-between">
          <div>
            <a class="btn btn-outline btn-primary m-4" target="_blank" :href="threadLink">
              Thread
            </a>
          </div>

          <div>
            <button class="btn btn-outline btn-error m-4" @click="deleteChallenge">
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container bg-base-200 mx-auto my-8 p-4 rounded-lg">
    <table class="table-auto w-full text-center">
      <thead class="uppercase">
        <tr>
          <th class="py-3">position</th>
          <th class="py-3">number</th>
          <th class="py-3">requirement</th>
          <th class="py-3">type</th>
          <th class="py-3">fulfill</th>
          <th class="py-3">note</th>
        </tr>
      </thead>

      <tbody>
      <template v-for="(position, index) in position" v-bind:key="position">
        <tr class="border-b-primary border-b-2">
          <td class="p-4">
            {{ position }}
          </td>

          <td class="p-4">
            {{ numbers[index] }}
          </td>

          <td class="p-4">
            {{ requirements[index] }}
          </td>

          <td class="p-4">
            {{ fulfilType[index] }}
          </td>

          <td class="p-4">
            <template v-if="fulfilments !== null">
              {{ fulfilments[index] }}
            </template>
          </td>

          <td class="p-4">
            {{ notes[index] }}
          </td>
        </tr>
      </template>
      </tbody>
    </table>

    <template v-if="extra">
      <hr class="h-px my-8 border-0 bg-gray-700">
      <div class="border-2 p-4 border-primary rounded-lg my-4 flex justify-between group">
        <div>
          <p>
            {{ extra }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {deleteDoc, doc, getDoc} from "firebase/firestore";
import {db} from "@/firebase";
import router from "@/router";

export default {
    name: "challengeListView",
    props: ['id'],
    data() {
      return {
        name: "",
        type: "",
        imgLink: "",
        threadLink: "",
        extra: "",
        fulfilType: [],
        fulfilments: "",
        notes: [],
        numbers: [],
        position: [],
        requirements: [],
        category: "",
      }
    },
    methods: {
      async getChallenge() {
        const docRef = doc(db, "challengeList", this.id);
        const docSnap = await getDoc(docRef)

        this.name = docSnap.data().name;
        this.type = docSnap.data().type;
        this.imgLink = docSnap.data().imageLink;
        this.threadLink = docSnap.data().threadLink;
        this.extra = docSnap.data().extra;
        this.fulfilType = docSnap.data().fulfilType;
        this.fulfilments = docSnap.data().fulfilments;
        this.notes = docSnap.data().notes;
        this.numbers = docSnap.data().numbers;
        this.position = docSnap.data().position;
        this.requirements = docSnap.data().requirements;
        this.category = docSnap.data().category;
      },
      async deleteChallenge() {
        await deleteDoc(doc(db, "challengeList", this.id))
        await router.push('/challengeList')
      }
    },
    mounted() {
      this.getChallenge()
    }
  }
</script>