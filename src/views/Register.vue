<template>
  <div class="w-full my-10">
    <div class="hero">
      <div class="hero-content flex flex-col w-full lg:flex-row">
        <div class="flex-1 text-center lg:text-right">
          <h1 class="text-5xl font-bold">Anicha</h1>
          <p class="py-6">Your AWC Challenge tracker</p>
        </div>
        <div class="line-in-middle mx-8"></div>
        <div class="flex-1">
          <div class="card w-full max-w-sm shadow-2xl bg-base-100 ">
            <div class="card-body">
              <div class="alert alert-error shadow-lg my-4" v-if="error">
                <div>
                  <i class="fa-solid fa-circle-exclamation"></i>
                  {{ error }}
                </div>
              </div>

              <form action="#"  @submit.prevent="register">
                <div id="page1">
                  <div class="form-control my-4">
                    <div class="relative">
                      <input type="text" id="name" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                             placeholder=" " name="name" value required v-model="name" />
                      <label for="name" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Username
                      </label>
                    </div>
                  </div>

                  <div class="form-control my-4">
                    <div class="relative">
                      <input type="email" id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                             placeholder=" " name="email" value required v-model="email" />
                      <label for="email" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Email
                      </label>
                    </div>
                  </div>

                  <div class="form-control my-4">

                    <div class="relative">
                      <input type="password" id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                             placeholder=" " name="password" required v-model="password" />
                      <label for="password" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Password
                      </label>
                    </div>
                  </div>

                  <div class="form-control mt-6">
                    <button class="btn btn-primary" type="button" @click="next">Next</button>
                    <label class="label">
                      <p>Already have an account?
                        <router-link to="/login" class="link link-hover link-primary link-register">
                          Login
                        </router-link></p>
                    </label>
                  </div>
                </div>

                <div id="page2" class="hidden">
                  <div class="form-control my-4">
                    <div class="relative">
                      <input type="text" id="anilistUsername" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                             placeholder=" " name="anilistUsername" value required v-model="anilistUsername" />
                      <label for="anilistUsername" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Anilist username
                      </label>
                    </div>
                  </div>

                  <div class="form-control my-4">
                    <a class="btn btn-primary" href="https://anilist.co/api/v2/oauth/authorize?client_id=6555&response_type=token" target="_blank">
                      Get Authorization code
                    </a>
                  </div>

                  <div class="form-control my-4">
                    <div class="relative">
                      <input type="text" id="anilistAuth" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content bg-transparent rounded-lg border-2 border-primary appearance-none focus:input-accent focus:ring-0 peer"
                             placeholder=" " name="anilistAuth" value required v-model="anilistAuth" />
                      <label for="anilistAuth" class="absolute text-sm text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Authentication code
                      </label>
                    </div>
                  </div>

                  <div class="form-control mt-6">
                    <button class="btn btn-primary" type="submit">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  name: "RegisterComponent",
  setup() {
    const email = ref('')
    const password = ref('')
    const name = ref('')
    const anilistUsername = ref('')
    const anilistAuth = ref('')
    const error = ref(null)


    const store = useStore()
    const router = useRouter()


    const register = async () => {
      try {
        await store.dispatch('register', {
          email: email.value,
          password: password.value,
          name: name.value,
          anilistUsername: anilistUsername.value,
          anilistAuth: anilistAuth.value
        })

        await router.push('/dashboard')
      }
      catch (err) {
        error.value = err.code
        error.value = error.value.split("/").pop();
        error.value = error.value.replace("-", " ");
        error.value = error.value.replace("-", " ");
        error.value = error.value.replace("-", " ");
        error.value = error.value.charAt(0).toUpperCase() + error.value.slice(1);
      }
    }

    const next = () => {
      document.getElementById('page1').classList.add('hidden')
      document.getElementById('page2').classList.remove('hidden')
    }

    return {
      register,
      next,
      email,
      password,
      name,
      anilistUsername,
      anilistAuth,
      error
    }
  }
}
</script>

<style scoped>

</style>