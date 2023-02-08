<template>
  <div class="container mx-auto h-[90vh] grid content-center">
    <section class="w-full">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-center text-primary">
          Contact Us
        </h2>
        <form action="#" class="space-y-8">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-400">
              Your email
            </label>
            <input type="email" id="email"
                   class="block p-2.5 w-full text-sm text-primary-content bg-base-200 rounded-lg
            shadow-sm border border-primary focus:ring-accent"
                   placeholder="example@email.com" required v-model="email">
          </div>
          <div>
            <label for="subject" class="block mb-2 text-sm font-medium text-gray-400">
              Subject
            </label>
            <input type="text" id="subject"
                   class="block p-2.5 w-full text-sm text-primary-content bg-base-200 rounded-lg
            shadow-sm border border-primary focus:ring-accent"
                   placeholder="Let us know how we can help you" required v-model="subject">
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-400">
              Your message
            </label>
            <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-primary-content bg-base-200 rounded-lg
            shadow-sm border border-primary focus:ring-accent" v-model="message" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit"
                  class="btn btn-outline btn-primary font-bold" @click.prevent="submit">
            Send message
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "ContactComponent",
  data() {
    return {
      email: "",
      subject: "",
      message: "",
    }
  },
  methods: {
    async submit() {
      await addDoc(collection(db, "contact"), {
        email: this.email,
        subject: this.subject,
        message: this.message,
        read: false
      });

      this.email= "";
      this.subject= "";
      this.message= "";
    }
  }
}
</script>

<style scoped>

</style>