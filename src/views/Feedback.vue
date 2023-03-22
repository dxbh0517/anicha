<template>
  <div class="container mx-auto h-[90vh] grid content-center">
    <section class="w-full">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-center text-primary">
          FeedBack
        </h2>

        <div class="p-4 mb-4 text-sm rounded-lg bg-gray-800 text-blue-400" role="alert">
          Join our <a href="https://discord.gg/Tj5BpPDrzp" target="_blank" class="underline">discord</a>!
        </div>

        <form action="#" class="space-y-8">
          <div class="sm:col-span-2">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-400">
              Your feedback
            </label>
            <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-primary-content bg-base-200 rounded-lg
            shadow-sm border border-primary focus:ring-accent" v-model="message" placeholder="Leave a message..."></textarea>
          </div>
          <button type="submit" class="btn btn-outline btn-primary font-bold" @click.prevent="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import {addDoc, collection} from "firebase/firestore";
import {db} from "@/firebase";

export default {
  name: "FeedbackComponent",
  data() {
    return {
      message: "",
    }
  },
  methods: {
    async submit() {
      await addDoc(collection(db, "feedback"), {
        message: this.message,
        read: false
      });

      this.message= "";
    }
  }
}
</script>

<style scoped>

</style>