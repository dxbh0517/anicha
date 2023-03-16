<template>
  <div class=" mx-auto">
    <section class="bg-base-100 flex items-center my-48">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <div class="indicator">
          <span class="indicator-item badge badge-primary">
            Currently in Alpha
          </span>
          <h1 class="my-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-primary">
            Anicha
          </h1>
        </div>
        <p class="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
          your AWC challenge tracker
        </p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <router-link to="/register" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg btn-primary">
            Signup today
            <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </router-link>
        </div>
      </div>
    </section>

    <section class="bg-base-100">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="w-full mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-primary">
            An easy way to stay up to date on your challenges
          </h2>
        </div>
        <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full lg:h-12 lg:w-12 bg-primary">
              <i class="fa-solid fa-check-double"></i>
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">Tracking</h3>
            <p class="text-gray-400">
              Stay up to date on all your current, future and past challenges.
            </p>
          </div>
          <div>
            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary lg:h-12 lg:w-12">
              <i class="fa-solid fa-arrows-rotate"></i>
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">Realtime progress update</h3>
            <p class="text-gray-400">
              your challenge progress is updated based on your anilist watch history.
            </p>
          </div>
          <div>
            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full lg:h-12 lg:w-12 bg-primary">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">integrated search <div class="badge badge-primary">Coming soon</div></h3>
            <p class="text-gray-400">
              Easily find anime and manga for your challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>

</style>