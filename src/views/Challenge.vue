<template>
  <div class="center z-50" v-if="setToPlanning">
    <div class="hero h-fit w-fit bg-base-200 drop-shadow-lg rounded-lg">
      <div class="hero-content text-center">
        <div class="max-w-md flex">
          <img :src="planningArray[3]" class="h-56">

          <div class="m-4 grid grid-rows-3 gap-4 w-64">
            <div class="text-left ml-2">
              <h1 class="capitalize text-2xl font-semibold">
                <template v-if="planningArray[1] != null">
                  {{ planningArray[1] }}
                </template>
                <template v-if="planningArray[1] == null">
                  {{ planningArray[2] }}
                </template>
              </h1>
            </div>
            <p class="text-left ml-2">
              Set to: {{ planningArray[0] }}
            </p>
            <div class="flex justify-end">
              <button class="btn btn-outline btn-primary" @click="setToPlanning = !setToPlanning">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="center z-50" v-if="loading">
    <div class="hero h-fit w-fit bg-base-200 drop-shadow-lg rounded-lg">
      <div class="hero-content text-center">
        <div class="max-w-md flex">
          Loading
        </div>
      </div>
    </div>
  </div>

  <div class="container bg-base-200 mx-auto my-8 p-4 rounded-lg">
    <div class="flex ...">
      <div class="mr-5 ml-3 grid content-center">
        <img :src="imageLink" class="w-60 max-h-fit">
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
                {{ startDate }}
              </p>

              <label class="absolute text-base text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 left-1">
                Start Date
              </label>
            </div>
          </div>

          <div class="text-center justify-self-center p-4 min-w-40 flex-grow" v-if="ch_status === 'Completed'">
            <div class="relative">
              <p class="block px-2.5 pb-2.5 pt-4 w-full text-base text-center text-primary-content font-bold bg-transparent rounded-lg border-2 border-primary appearance-none peer">
                {{ endDate }}
              </p>

              <label class="absolute text-base text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 left-1">
                End Date
              </label>
            </div>
          </div>

          <div class="text-center justify-self-center p-4 min-w-40 flex-grow" v-if="deadline && ch_status !== 'Completed'">
            <div class="relative">
              <p class="block px-2.5 pb-2.5 pt-4 w-full text-base text-center text-primary-content font-bold bg-transparent rounded-lg border-2 border-primary appearance-none peer">
                {{ deadlineDate }}
              </p>

              <label class="absolute text-base text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 left-1">
                Deadline
              </label>
            </div>
          </div>

          <div class="text-center justify-self-center p-4 min-w-40 flex-grow">
            <div class="relative">
              <select class="select select-primary font-bold text-base w-full h-14 max-w-xs text-primary-content border-2 border-primary bg-base-200"
                      v-model="ch_status" required @change="changeStatus">
                <option disabled value="">Status</option>
                <option>In Progress</option>
                <option>Planning</option>
                <option>Completed</option>
              </select>

              <label class="absolute text-base text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 left-1">
                Status
              </label>
            </div>
          </div>

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
              <div class="block px-2.5 pb-2.5 pt-4 w-full text-base text-center text-primary-content font-bold bg-transparent rounded-lg border-2 border-primary appearance-none peer">
                <progress class="progress progress-primary w-full" :value="progress" max="100"></progress>
              </div>

              <label class="absolute text-base text-primary font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 left-1">
                Progress {{ progress }}%
              </label>
            </div>

          </div>


        </div>

        <div>
          <div class="w-full border-t-2 border-t-primary flex justify-between">
            <div>
              <a href="#code-modal" class="btn btn-outline btn-primary m-4" type="button" @click="getCode()">
                Code
              </a>

              <a class="btn btn-outline btn-primary m-4" target="_blank" :href="threadLink">
                Thread
              </a>

              <a class="btn btn-outline btn-primary m-4" target="_blank" :href="postLink">
                Post
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
  </div>

  <div class="container mx-auto my-8 p-4 rounded-lg border-primary border-2">
    <div class="flex justify-between" v-if="!options">
      <button class="btn btn-outline btn-primary mx-4" @click="getChallenge">
        <i class="fa-solid fa-arrows-rotate"></i> &nbsp;&nbsp; Refresh
      </button>

      <div>
        <button class="btn btn-outline btn-primary mx-4" @click="opendivider">
          <i class="fa-solid fa-plus"></i> &nbsp;&nbsp; Add divider
        </button>

        <template v-if="extra==null">
          <button class="btn btn-outline btn-primary mx-4" @click="openExtraInput">
            <i class="fa-solid fa-plus"></i> &nbsp;&nbsp; Add optional
          </button>
        </template>

        <template v-if="type != 'Both'">
          <button class="btn btn-outline btn-primary mx-4" @click="openAdd">
            <i class="fa-solid fa-plus"></i> &nbsp;&nbsp; Add {{ type }}
          </button>
        </template>

        <template v-if="type == 'Both'">
          <button class="btn btn-outline btn-primary mx-4" @click="openAdd">
            <i class="fa-solid fa-plus"></i> &nbsp;&nbsp; Add Requirement
          </button>
        </template>
      </div>
    </div>

    <div v-if="add" class="">
      <form action="#" @submit.prevent="addRequirement()" ref="addReq">
        <div class="flex w-full flex-wrap">
          <div class="form-control my-4 mx-2 w-40 flex-grow">
            <div class="relative">
              <input type="text" required id="position" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="position" value v-model="position"/>

              <label for="number" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Position
              </label>
            </div>
          </div>

          <div class="form-control my-4 mx-2 w-40 flex-grow">
            <div class="relative">
              <input type="text" required id="number" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="number" value v-model="number"/>

              <label for="number" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Number
              </label>
            </div>
          </div>

          <div class="form-control my-4 mx-2 w-96 flex-grow">
            <div class="relative">
              <input type="text" required id="requirement" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="requirement" value v-model="requirement"/>

              <label for="requirement"  class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Requirement
              </label>
            </div>
          </div>

          <div class="form-control my-4 mx-2 w-96 flex flex-grow flex-row">
            <div class="relative flex-grow">
              <input type="url" required id="url" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="url" value v-model="url"/>

              <label for="url" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                URL
              </label>
            </div>

            <a href="#search-modal" class="btn btn-outline btn-primary mx-2 border-2" type="button" @click="searchCheck('requirement')">
              <i class="fa-solid fa-magnifying-glass"></i>
            </a>
          </div>

          <div class="form-control my-4 mx-2 w-96 flex-grow">
            <div class="relative">
              <input type="text" id="note" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="note" v-model="note" />

              <label for="note" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Notes
              </label>
            </div>
          </div>

          <div class="form-control my-4 mx-2 w-60 flex-row">
            <div class="form-control my-4 mx-2 flex-auto">
              <div class="relative">
                <label class="label cursor-pointer font-bold">
                  <span class="label-text">Anime</span>
                  <input type="radio" name="radio-type" class="radio radio-primary bg-base-100" required value="ANIME" v-model="reqType"/>
                </label>
              </div>
            </div>

            <div class="form-control my-4 mx-2 flex-auto">
              <div class="relative">
                <label class="label cursor-pointer font-bold">
                  <span class="label-text">Manga</span>
                  <input type="radio" name="radio-type" class="radio radio-primary bg-base-100" required value="MANGA" v-model="reqType"/>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button class="btn btn-outline btn-error mx-4" @click="cancel()" type="button">
            Cancel
          </button>

          <template v-if="type != 'Both'">
            <button class="btn btn-outline btn-primary mx-4" type="submit">
              <i class="fa-solid fa-plus"></i> &nbsp;&nbsp; Add {{ type }}
            </button>
          </template>

          <template v-if="type == 'Both'">
            <button class="btn btn-outline btn-primary mx-4" type="submit">
              <i class="fa-solid fa-plus"></i> &nbsp;&nbsp; Add Requirement
            </button>
          </template>
        </div>
      </form>
    </div>

    <div v-if="openExtra">
      <form action="#" @submit.prevent="addExtra">
        <div class="flex w-full">
          <div class="form-control my-4 mx-2 flex-auto">
            <div class="relative">
              <textarea id="extra" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                        placeholder=" " name="extra" v-model="extraInput"/>

              <label for="requirement" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Requirement
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button class="btn btn-outline btn-error mx-4" @click="cancelExtra">
            Cancel
          </button>

          <button class="btn btn-outline btn-primary mx-4" type="submit">
            <i class="fa-solid fa-plus"></i> &nbsp;&nbsp; Add
          </button>
        </div>
      </form>
    </div>

    <div v-if="dividerSwitch">
      <form action="#" @submit.prevent="addDivider">
        <div class="flex w-full">
          <div class="form-control my-4 mx-2 flex-none">
            <div class="relative">
              <input type="number" id="dividerPosition" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder="" name="dividerPosition" v-model="dividerPosition"/>

              <label for="requirement" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Divider position
              </label>
            </div>
          </div>

          <div class="form-control my-4 mx-2 flex-auto">
            <div class="relative">
              <input type="text" id="dividerText" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                     placeholder=" " name="dividerText" v-model="dividerText"/>

              <label for="requirement" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                Divider label
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <button class="btn btn-outline btn-error mx-4" @click="cancelDivider">
            Cancel
          </button>

          <button class="btn btn-outline btn-primary mx-4" type="submit">
            <i class="fa-solid fa-plus"></i> &nbsp;&nbsp; Add
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="container mx-auto my-8 p-4 rounded-lg bg-base-200">
    <template v-for="(entry, index) in requirements" v-bind:key="entry">
      <template v-if="entry[3] !== 'divider'">
            <div class="border-2 border-primary rounded-lg my-4 group bg-gradient-to-r via-base-200" :class="{ 'from-primary ': entry[9] === 'COMPLETED', 'from-[#3db4f2] ': entry[9] === 'CURRENT', 'from-[#f79a63] ': entry[9] === 'PLANNING' }">
              <div :id="index" class="p-4 flex">
                <div class="flex border-r-2 border-r-primary-content px-2 items-center">
                  <p class="text-lg font-bold text-primary-content">
                    {{ entry[0] }}
                  </p>
                </div>

                <div class="flex-none px-4">
                  <div class="flex items-center min-h-full">
                    <a :href="'https://anilist.co/' + entry[3].toLowerCase() + '/' + entry[2]">
                      <img :src="entry[6]" class="h-32 rounded-lg">
                    </a>
                  </div>
                </div>

                <div class="grid grid-rows-2 p-4 grow items-center">
                  <div>
                    <a class="capitalize text-2xl font-semibold hover:text-primary-content" :href="'https://anilist.co/' + entry[3].toLowerCase() + '/' + entry[2]">
                      <template v-if="entry[7]">
                        {{ entry[7] }}
                      </template>
                      <template v-if="entry[7] == null">
                        {{ entry[8] }}
                      </template>
                    </a>
                  </div>
                  <p>
                    {{ entry[1] }}
                  </p>
                </div>

                <div class="flex items-center px-4 hidden group-hover:flex">
                  <button class="btn btn-outline btn-primary mx-2" @click="editRequirement(index)">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>

                  <button class="btn btn-outline btn-error mx-2" @click="deleteEntry(index)">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>

            <div :id="index + 'edit'" class="border-2 border-primary rounded-lg my-4 hidden p-4">
              <form action="#" @submit.prevent="submitEdit(index)">
                <div class="flex w-full flex-wrap">
                  <div class="form-control my-4 mx-2 w-40 flex-grow">
                    <div class="relative">
                      <input type="text" :id="'position(' + index + ')'" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                             placeholder=" " name="position" value />

                      <label for="position" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Position
                      </label>
                    </div>
                  </div>

                  <div class="form-control my-4 mx-2 w-40 flex-grow">
                    <div class="relative">
                      <input type="text" :id="'number(' + index + ')'" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                             placeholder=" " name="number" value />

                      <label for="number" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Number
                      </label>
                    </div>
                  </div>

                  <div class="form-control my-4 mx-2 w-60 flex-auto">
                    <div class="relative">
                      <input type="text" :id="'requirement(' + index + ')'" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                             placeholder=" " name="requirement" value />

                      <label for="requirement" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Requirement
                      </label>
                    </div>
                  </div>

                  <div class="form-control my-4 mx-2 w-80 flex flex-grow flex-row">
                    <div class="relative flex-grow">
                      <input type="url" :id="'url(' + index + ')'" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                             placeholder=" " name="url" value />

                      <label for="url" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        URL
                      </label>
                    </div>


                    <a href="#search-modal" class="btn btn-outline btn-primary mx-2 border-2" type="button" @click="searchCheck(index)">
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </a>
                  </div>

                  <div class="form-control my-4 mx-2 w-60 flex-auto">
                    <div class="relative">
                      <input type="text" :id="'note(' + index + ')'" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                             placeholder=" " name="note" value />

                      <label for="note" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-200 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        Notes
                      </label>
                    </div>
                  </div>

                  <div class="form-control my-4 mx-2 w-60 flex-row">
                    <div class="form-control my-4 mx-2 w-40">
                      <div class="relative">
                        <label class="label cursor-pointer font-bold">
                          <span class="label-text">Anime</span>
                          <input type="radio" name="radio-type" class="radio radio-primary bg-base-200" value="ANIME" :id="'anime(' + index + ')'"/>
                        </label>
                      </div>
                    </div>

                    <div class="form-control my-4 mx-2 w-40">
                      <div class="relative">
                        <label class="label cursor-pointer font-bold">
                          <span class="label-text">Manga</span>
                          <input type="radio" name="radio-type" class="radio radio-primary bg-base-200 checked:bg-primary" value="MANGA" :id="'manga(' + index + ')'"/>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex justify-between">
                  <button class="btn btn-outline btn-error mx-4" @click="cancelEdit(index)" type="button">
                    Cancel
                  </button>

                  <button class="btn btn-outline btn-primary mx-4" type="submit">
                    <i class="fa-solid fa-file-circle-check"></i> &nbsp;&nbsp; Update
                  </button>
                </div>
              </form>
            </div>
      </template>

      <template v-if="entry[3] === 'divider'">
        <div class="my-4 group">
          <div :id="index" class="p-4 flex">
            <div class="inline-flex items-center justify-center w-full">
              <hr class="w-3/5 h-1 my-8 bg-primary border-0 rounded">
              <div class="absolute px-4 -translate-x-1/2 bg-base-200 left-1/2">
                <p>{{ entry[1] }}</p>
              </div>
            </div>

            <div class="flex items-center px-4 hidden group-hover:flex">
              <button class="btn btn-outline btn-error mx-2" @click="deleteEntry(index)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </template>
    </template>

    <template v-if="extra!==null">
      <hr class="h-px my-8 border-0 bg-gray-700">
      <div class="border-2 p-4 border-primary rounded-lg my-4 flex justify-between group">
        <div>
          <p>
            {{ extra }}
          </p>
        </div>

        <div class="items-center px-4 hidden group-hover:flex">
          <button class="btn btn-outline btn-primary mx-2">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>

          <button class="btn btn-outline btn-error mx-2 ">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </template>
  </div>

  <div class="modal" id="code-modal">
    <div class="modal-box max-w-4xl md:h-auto">

      <div class="p-6 space-y-4" ref="challengeCode">
        <div class="text-base leading-relaxed text-gray-400 text-center max-h-96 overflow-y-auto whitespace-pre-line p-3">
          <p>{{ code }}</p>
        </div>
      </div>

      <div class="modal-action border-t-2 border-t-primary pt-4">
        <div class="flex justify-between w-full">
          <a href="#" class="btn btn-outline btn-error">Close</a>
          <button class="btn btn-outline btn-primary" @click="copy">
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="search-modal">
    <div class="modal-box max-w-4xl md:h-auto">
      <template v-if="reqError">
        <div class="bg-error w-full text-center text-error-content p-4 rounded-lg">
          <i class="fa-solid fa-circle-exclamation"></i> &nbsp;&nbsp; Please input requirement
        </div>
      </template>

      <template v-if="!reqError">
        <form action="#" @change.prevent="searchFields()">
          <div class="flex flex-wrap gap-1 flex-auto">
            <div class="form-control my-4 mx-2 w-48">
              <div class="relative">
                <input type="text" id="searchText" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                       placeholder=" " name="searchText" v-model="searchText" />

                <label for="searchText" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Search
                </label>
              </div>
            </div>

            <div class="form-control my-4 mx-2 w-48">
              <div class="relative">
                <select class="select select-primary w-full max-w-xs text-primary-content border-2 border-primary"
                        v-model="genres" required >
                  <template v-for="genres in Categories.genres" v-bind:key="genres">
                    <option>{{ genres }}</option>
                  </template>
                </select>

                <label for="genres" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Genres
                </label>
              </div>
            </div>

            <div class="form-control my-4 mx-2 w-48">
              <div class="relative">
                <select class="select select-primary w-full max-w-xs text-primary-content border-2 border-primary"
                        v-model="tags" required >
                  <template v-for="tags in Categories.tags" v-bind:key="tags">
                    <option>{{ tags }}</option>
                  </template>
                </select>

                <label for="tags" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Tags
                </label>
              </div>
            </div>

            <div class="form-control my-4 mx-2 w-48">
              <div class="relative">
                <input type="number" min="1900" max="2099" id="year" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-primary-content font-bold disabled:text-grey-500 bg-transparent rounded-lg border-2 border-primary disabled:border-gray-500 appearance-none focus:input-accent focus:ring-0 peer"
                       placeholder=" " name="year" v-model="year" />

                <label for="year" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Year
                </label>
              </div>
            </div>

            <div class="form-control my-4 mx-2 w-48">
              <div class="relative">
                <select class="select select-primary w-full max-w-xs text-primary-content border-2 border-primary"
                        v-model="season" required >
                  <option>Winter</option>
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Fall</option>
                </select>

                <label for="season" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Season
                </label>
              </div>
            </div>

            <div class="form-control my-4 mx-2 w-48">
              <div class="relative">
                <select class="select select-primary w-full max-w-xs text-primary-content border-2 border-primary"
                        v-model="format" required >
                  <template v-for="format in Categories.format" v-bind:key="format">
                    <option>{{ format }}</option>
                  </template>
                </select>

                <label for="searchText" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Format
                </label>
              </div>
            </div>

            <div class="form-control my-4 mx-2 w-48">
              <div class="relative">
                <select class="select select-primary w-full max-w-xs text-primary-content border-2 border-primary"
                        v-model="airing" required >
                  <option value="RELEASING">Airing</option>
                  <option value="FINISHED" selected>Finished</option>
                  <option value="NOT_YET_RELEASED">Not yet Aired</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="HIATUS">Hiatus</option>
                </select>

                <label for="airing" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Airing Status
                </label>
              </div>
            </div>

            <div class="form-control my-4 mx-2 w-48">
              <div class="relative">
                <select class="select select-primary w-full max-w-xs text-primary-content border-2 border-primary"
                        v-model="searchType" required >
                  <option value="ANIME">Anime</option>
                  <option value="MANGA">Manga</option>
                </select>

                <label for="airing" class="absolute text-sm text-primary disabled:text-grey-500 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-base-100 px-2 peer-focus:px-2 peer-focus:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                  Type
                </label>
              </div>
            </div>

            <div class="form-control my-4 mx-2 w-48 items-center">
              <div class="flex items-center justify-center w-full h-full">
                <input v-model="showList" id="showList" type="checkbox" class="w-5 h-5 text-primary
              bg-base-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                <label for="showList" class="ml-2 text-sm text-primary font-bold">
                  Only show my list
                </label>
              </div>
            </div>

            <div class="form-control my-4 mx-2 w-48 items-center">
              <div class="flex items-center justify-center w-full h-full">
                <input v-model="showPlanning" id="showPlanning" type="checkbox" class="w-5 h-5 text-primary
              bg-base-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" @click="changeShowPlanning()">
                <label for="showPlanning" class="ml-2 text-sm text-primary font-bold">
                  Only show planning
                </label>
              </div>
            </div>
          </div>
        </form>

        <div class="flex flex-wrap gap-1">
          <template v-for="items in search" v-bind:key="items">
            <template v-for="tags in items" v-bind:key="tags">
              <template v-if="tags !== ''">
                <div class="flex flex-nowrap gap-1 bg-primary text-primary-content text-xs
                font-medium mr-2 px-2.5 py-0.5 rounded-full group items-center hover:bg-error hover:cursor-pointer ">
                  {{ tags }}
                  <button @click="deleteSearch(tags)">
                    <i class="fa-sharp fa-solid fa-xmark hidden group-hover:flex"></i>
                  </button>
                </div>
              </template>
            </template>
          </template>
        </div>

        <hr class="h-0.5 my-8 border-0 bg-primary">

        <div class="flex flex-nowrap overflow-scroll w-full gap-4">
          <template v-for="results in searchResult" v-bind:key="results">
            <div class="flex gap-4 rounded-box border-2 border-base-200/50 my-4">
              <div class="min-w-[300px]">
                <div class="font-bold text-2xl relative h-56 overflow-hidden">
                  <img class="max-w-full bg-primary rounded-t-box object-none object-center" :src="results.coverImage.extraLarge">

                  <div class="bottom-0 left-0 absolute w-full h-1/2 imgGradiant"></div>

                  <div class="bottom-2 left-2 absolute text-primary">
                    {{ results.title.userPreferred }}
                  </div>
                </div>

                <div class="flex flex-wrap gap-4 max-w-lg my-2 px-4">
                  <div class="badge badge-primary">
                    {{ results.season }}
                  </div>

                  <div class="badge badge-primary">
                    {{ results.seasonYear }}
                  </div>

                  <div class="badge badge-primary">
                    {{ results.status }}
                  </div>
                </div>

                <div class="font-bold text-xl my-2 px-4">
                  Genres:
                </div>

                <div class="flex flex-wrap gap-4 px-4">
                  <div class="badge badge-primary" v-for="genre in results.genres" v-bind:key="genre">
                    {{ genre }}
                  </div>
                </div>

                <div tabindex="0" class="collapse collapse-plus">
                  <div class="collapse-title font-bold text-xl my-2">
                    Tags:
                  </div>
                  <div class="collapse-content">
                    <div class="flex flex-wrap gap-4">
                      <div class="badge badge-primary" v-for="tags in results.tags" v-bind:key="tags">
                        {{ tags.name }}
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="results.mediaListEntry !== null" class="font-bold text-xl my-2 px-4 grid grid-cols-2">
                  <div class="text-left">
                    {{ results.mediaListEntry.status }}
                  </div>

                  <div class="text-right ">
                    {{ results.mediaListEntry.progress }}/
                    <template v-if="results.type === 'ANIME'">
                      {{ results.episodes }}
                    </template>

                    <template v-if="results.type === 'MANGA'">
                      {{ results.chapters }}
                    </template>
                  </div>
                </div>

                <div class="grid grid-cols-2 p-2 gap-2">
                  <a :href="'https://anilist.co/' + results.type.toLowerCase() + '/' + results.id" target="_blank"
                     class="w-full btn btn-primary">
                    Open in Anilist
                  </a>

                  <a class="w-full btn btn-primary" href="#"
                     @click="addUrl('https://anilist.co/' + results.type.toLowerCase() + '/' + results.id)">
                    Add
                  </a>
                </div>

              </div>
            </div>
          </template>

          <template v-if="searchEnd === true">
            <div class="max-w-full min-w-max p-8 text-center alert alert-error shadow-lg my-4 font-bold">
              <p>No more results</p>
            </div>
          </template>

          <template v-if="searchEnd === false">
            <div class="max-w-full min-w-max p-8 text-center my-4 font-bold grid place-items-center">
              <button class="btn btn-outline btn-primary" @click="searchQuery(pageNum)">
                Load more
              </button>
            </div>
          </template>
        </div>
      </template>

      <div class="modal-action border-t-2 border-t-primary pt-4">
        <div class="flex justify-between w-full">
          <a href="#" class="btn btn-outline btn-error" @click="cancelSearch()">Close</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {auth, db} from "@/firebase";
import {collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import router from "@/router";

export default {
  name: "ChallengeComponent",
  props: ['id'],
  data() {
    return {
      loggedIn: false,
      displayName: "",
      uid: "",
      anilistUsername: "",
      anilistAuth: "",
      header: "",
      footer: "",
      name: "",
      postLink: "",
      imageLink: "",
      threadLink: "",
      type: "",
      ch_status: "",
      startDate: "",
      endDate: "",
      deadline: "",
      deadlineDate: "",
      extra: "",
      progress: 0,
      position: 0,
      number: 0,
      requirement: "",
      url: "",
      note: "",
      reqType: "",
      add: false,
      openExtra: false,
      list: [],
      loading: false,
      error: "",
      requirements: [],
      setToPlanning: false,
      planningArray: [],
      options: false,
      extraInput: "",
      dividerSwitch: false,
      dividerText: "",
      dividerPosition: "",
      reqError: false,
      search: {},
      Categories: "",
      searchText: "",
      genres: "",
      tags: "",
      year: "",
      season: "",
      format: "",
      airing: "",
      searchType: "",
      showList: true,
      showPlanning: true,
      searchResult: [],
      pageNum: 1,
      tempVal: "",
      searchEnd: false,
      code: "",
      legendCompleted: "",
      legendNotCompleted: "",
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
          this.header = querySnapshot.docs[0].data().header.toString();
          this.footer = querySnapshot.docs[0].data().footer;
          this.legendCompleted = querySnapshot.docs[0].data().legendCompleted
          this.legendNotCompleted = querySnapshot.docs[0].data().legendNotCompleted

          await this.getChallenge();
        }
      })
    },
    async getChallenge() {
      this.loading = true;
      try {
        const docRef = doc(db, "challenges", this.id);
        const docSnap = await getDoc(docRef)

        this.name = docSnap.data().name;
        this.header = this.header.replace(/{{ name }}/g, this.name)
        this.postLink = docSnap.data().postLink;
        this.imageLink = docSnap.data().imageLink;
        this.threadLink = docSnap.data().threadLink;
        this.type = docSnap.data().type;
        this.ch_status = docSnap.data().status;
        this.startDate = docSnap.data().startDate
        this.header = this.header.replace(/{{ startDate }}/g, this.startDate)
        this.endDate = docSnap.data().endDate
        this.header = this.header.replace(/{{ endDate }}/g, this.endDate)
        this.deadline = docSnap.data().deadline;
        this.deadlineDate = docSnap.data().deadlineDate

        this.progress = docSnap.data().progress
        this.extra = docSnap.data().extra

        if (docSnap.data().uid !== this.uid) {
          await router.push('/dashboard')
        }

        for (let i = 0; i < docSnap.data().numbers.length; i++) {
          this.requirements[i] = []
          this.requirements[i][5] = docSnap.data().position[i]
          this.requirements[i][0] = docSnap.data().numbers[i];
          this.requirements[i][1] = docSnap.data().requirements[i];
          this.requirements[i][2] = docSnap.data().fulfilments[i];
          this.requirements[i][3] = docSnap.data().fulfilType[i];
          this.requirements[i][4] = docSnap.data().notes[i]
        }

        this.number = this.pad(parseInt(this.requirements[this.requirements.length - 1][0]) + 1)
        this.position = this.requirements[this.requirements.length - 1][5] + 1

        if (this.requirements[0][0] != null) {
          this.getList();
          setTimeout(this.setProgress, 400);
        }
      }
      finally {
        this.loading = false;
      }
    },
    async addRequirement() {
      let newurl;

      newurl = this.url
      newurl = newurl.split("/")
      newurl = newurl[4]

      this.requirements.push([this.number, this.requirement, newurl, this.reqType, this.note, this.position]);

      this.requirements.sort((a,b) => {
        return a[5]-b[5]
      })

      const position = []
      const numbers = []
      const req = []
      const fulfilment = []
      const type = []
      const notes = []

      for (let i = 0; i < this.requirements.length; i++) {
        position[i] = this.requirements[i][5]
        numbers[i] = this.requirements[i][0]
        req[i] = this.requirements[i][1]
        fulfilment[i] = this.requirements[i][2]
        type[i] = this.requirements[i][3]
        notes[i] = this.requirements[i][4]
      }

      const docRef = doc(db, "challenges", this.id);
      await updateDoc(docRef, {
        position: position,
        numbers: numbers,
        requirements: req,
        fulfilments: fulfilment,
        notes: notes,
        fulfilType: type,
      });

      this.checkPlanning(newurl)

      this.getList()

      setTimeout(this.setProgress, 200)

      this.requirement = ""
      this.number = this.pad(parseInt(this.requirements[this.requirements.length - 1][0]) + 1)
      this.url = ""
      this.note = ""
      this.position = this.requirements[this.requirements.length - 1][5] + 1

      this.add = !this.add;
      this.options = !this.options;
    },
    getList() {
      const username = this.anilistUsername;
      const token = this.anilistAuth;
      const chID = [];
      this.list = [];

      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i][3] !== "divider" && this.requirements[i][2] !== "" && this.requirements[i][2] !== "00000") {
          chID.push(this.requirements[i][2])
        }
      }

      let num = Math.ceil(chID.length/50);

      for (let i = 1; i <= num; i++) {
        const query = `
        query ($chID: [Int], $username: String, $pageNum: Int) {
          Page (page: $pageNum, perPage: 50) {
              mediaList (mediaId_in: $chID, userName: $username) {
                mediaId
                status
                progress
                startedAt {
                    day
                    month
                    year
                }
                completedAt {
                    day
                    month
                    year
                }
                media {
                    title {
                        english
                        romaji
                    }
                    coverImage {
                        extraLarge
                    }
                    episodes
                    chapters
                }
              }
          }
        }
      `;

        const variables = {
          username: username,
          chID: chID,
          pageNum: i,
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
              for (let j = 0; j < result.data.Page.mediaList.length; j++) {
                this.list.push(result.data.Page.mediaList[j]);

                if (this.list[j].completedAt.day !== null) {
                  this.list[j].completedAt.day = this.pad(this.list[j].completedAt.day, 2);
                }

                if (this.list[j].completedAt.month !== null) {
                  this.list[j].completedAt.month = this.pad(this.list[j].completedAt.month, 2);
                }

                if (this.list[j].startedAt.day !== null) {
                  this.list[j].startedAt.day = this.pad(this.list[j].startedAt.day, 2);
                }

                if (this.list[j].startedAt.month !== null) {
                  this.list[j].startedAt.month = this.pad(this.list[j].startedAt.month, 2);
                }
              }

              for (let j = 0; j < this.requirements.length; j++) {
                for (let k = 0; k < this.list.length; k++) {
                  if (parseInt(this.requirements[j][2]) === this.list[k].mediaId) {
                    this.requirements[j][6] = this.list[k].media.coverImage.extraLarge;
                    this.requirements[j][7] = this.list[k].media.title.english;
                    this.requirements[j][8] = this.list[k].media.title.romaji;
                    this.requirements[j][9] = this.list[k].status;
                    break;
                  }
                }
              }
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
      }

      console.log(this.list)
      console.log(this.requirements)

      for (let i = 0; i < this.requirements.length; i++) {
        // loop over list to find a match
        for (let j = 0; j < this.list.length; j++) {
          if (this.requirements[i][2] === this.list[j].mediaId) {
            console.log("match")
          }
        }
      }
    },
    cancel() {
      this.requirement = ""
      this.number = this.pad(parseInt(this.requirements[this.requirements.length - 1][0]) + 1)
      this.url = ""
      this.note = ""
      this.position = this.requirements[this.requirements.length - 1][5] + 1

      this.add = !this.add
      this.options = !this.options;
    },
    checkPlanning(entryId) {
      const query = `
          query ($entryId: Int) {
              Media (id: $entryId) {
                  title {
                    english
                  }
                  mediaListEntry{
                      status
                  }
              }
          }
      `;

      const variables = {
        entryId: entryId,
      };


      const url = 'https://graphql.anilist.co',
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + this.anilistAuth
            },
            body: JSON.stringify({
              query: query,
              variables: variables
            })
          };

      fetch(url, options).then(handleResponse)
          .then((result) => {
            if (result.data.Media.mediaListEntry == null) {
              this.setPlanning(entryId)
            }
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
    setPlanning(entryId) {
      const query = `
          mutation ($entryId: Int, $status: MediaListStatus) {
              SaveMediaListEntry (mediaId: $entryId, status: $status) {
                  id
                  status
                  media {
                      title {
                          english
                          romaji
                      }
                      coverImage {
                          extraLarge
                      }
                  }
              }
          }
      `;

      const variables = {
        entryId: entryId,
        status: 'PLANNING'
      };


      const url = 'https://graphql.anilist.co',
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + this.anilistAuth
            },
            body: JSON.stringify({
              query: query,
              variables: variables
            })
          };

      fetch(url, options).then(handleResponse)
          .then((result) => {
            this.setToPlanning = true
            this.planningArray =[result.data.SaveMediaListEntry.status, result.data.SaveMediaListEntry.media.title.english, result.data.SaveMediaListEntry.media.title.romaji, result.data.SaveMediaListEntry.media.coverImage.extraLarge]
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
    async setProgress() {
      if (this.list.length !== 0) {
        let challengeProgress = 0;
        let challengeTotal = this.list.length;

        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].status === "COMPLETED") {
            challengeProgress++
          } else {
            if (this.list[i].media.episodes != null) {
              challengeProgress = challengeProgress + Math.round(this.list[i].progress / this.list[i].media.episodes * 100) / 100
            } else if (this.list[i].media.chapters != null) {
              challengeProgress = challengeProgress + Math.round(this.list[i].progress / this.list[i].media.chapters * 100) / 100
            } else {
              challengeProgress = challengeProgress + Math.round(this.list[i].progress / (this.list[i].progress + 1) * 100) / 100
            }
          }
        }

        const result = Math.round((challengeProgress / challengeTotal) * 100);

        const ref = doc(db, 'challenges', this.id);

        let date;
        let latestDate;

        if (result === 100) {
          latestDate = this.list[0].completedAt;

          for (let i = 1; i < this.list.length; i++) {
            let currentDate = this.list[i].completedAt;

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

          date = latestDate.year + "-" + this.pad(latestDate.month, 2) + "-" + this.pad(latestDate.day, 2)

          await updateDoc(ref, {
            progress: result,
            status: "Completed",
            endDate: date
          });
        } else {
          await updateDoc(ref, {
            progress: result
          });
        }
      }
    },
    pad(num, size) {
      let s = num + "";
      while (s.length < size) s = "0" + s;
      return s;
    },
    async addExtra() {
      this.extra = this.extraInput

      const docRef = doc(db, "challenges", this.id);
      await updateDoc(docRef, {
        extra: this.extra,
      });

      this.extraInput = ""
      this.openExtra = !this.openExtra;
      this.options = !this.options;
    },
    openAdd() {
      this.add = !this.add;
      this.options = !this.options;
    },
    openExtraInput() {
      this.openExtra = !this.openExtra;
      this.options = !this.options
    },
    cancelExtra() {
      this.extraInput = "";
      this.openExtra = !this.openExtra;
      this.options = !this.options
    },
    async copy() {
      await navigator.clipboard.writeText(this.code);
    },
    editRequirement(index) {
      const url = 'https://anilist.co/' + this.requirements[index][3].toLowerCase() + '/' + this.requirements[index][2]

      document.getElementById(index).classList.add('hidden')
      document.getElementById(index + 'edit').classList.remove('hidden')

      document.getElementById('position(' + index + ')').value = this.requirements[index][5]
      document.getElementById('number(' + index + ')').value = this.requirements[index][0]
      document.getElementById('requirement(' + index + ')').value = this.requirements[index][1]
      document.getElementById('url(' + index + ')').value = url;
      document.getElementById('note(' + index + ')').value = this.requirements[index][4];
      if (this.requirements[index][3] === "ANIME") {
        document.getElementById('anime(' + index + ')').checked = true;
      }
      else if (this.requirements[index][3] === "MANGA") {
        document.getElementById('manga(' + index + ')').checked = true;
      }
    },
    async submitEdit(index) {
      let newurl;

      newurl = document.getElementById('url(' + index + ')').value;
      newurl = newurl.split("/");
      newurl = newurl[4];

      this.requirements[index][5] = document.getElementById('position(' + index + ')').value
      this.requirements[index][0] = document.getElementById('number(' + index + ')').value
      this.requirements[index][1] = document.getElementById('requirement(' + index + ')').value
      this.requirements[index][2] = newurl
      this.requirements[index][4] = document.getElementById('note(' + index + ')').value

      if (document.getElementById('anime(' + index + ')').checked === true) {
        this.requirements[index][3] = "ANIME"
      }
      else if (document.getElementById('manga(' + index + ')').checked === true) {
        this.requirements[index][3] = "MANGA"
      }

      this.requirements.sort((a,b) => {
        return a[5]-b[5]
      })

      this.checkPlanning(newurl)

      document.getElementById(index).classList.remove('hidden')
      document.getElementById(index + 'edit').classList.add('hidden')

      document.getElementById('position(' + index + ')').value = '';
      document.getElementById('number(' + index + ')').value = '';
      document.getElementById('requirement(' + index + ')').value = '';
      document.getElementById('url(' + index + ')').value = '';
      document.getElementById('note(' + index + ')').value = '';
      document.getElementById('anime(' + index + ')').checked = false;
      document.getElementById('manga(' + index + ')').checked = false;

      const position = []
      const numbers = []
      const req = []
      const fulfilment = []
      const type = []
      const notes = []

      for (let i = 0; i < this.requirements.length; i++) {
        position[i] = parseInt(this.requirements[i][5])
        numbers[i] = this.requirements[i][0]
        req[i] = this.requirements[i][1]
        fulfilment[i] = this.requirements[i][2]
        type[i] = this.requirements[i][3]
        notes[i] = this.requirements[i][4]
      }


      const docRef = doc(db, "challenges", this.id);
      await updateDoc(docRef, {
        position: position,
        numbers: numbers,
        requirements: req,
        fulfilments: fulfilment,
        notes: notes,
        fulfilType: type,
      });

      this.getUser();
    },
    cancelEdit(index) {
      document.getElementById(index).classList.remove('hidden')
      document.getElementById(index + 'edit').classList.add('hidden')

      document.getElementById('position(' + index + ')').value = '';
      document.getElementById('number(' + index + ')').value = '';
      document.getElementById('requirement(' + index + ')').value = '';
      document.getElementById('url(' + index + ')').value = '';
      document.getElementById('note(' + index + ')').value = '';
      document.getElementById('anime(' + index + ')').checked = false;
      document.getElementById('manga(' + index + ')').checked = false;
    },
    async deleteEntry(index) {
      this.requirements.splice(index, 1)

      this.requirements.sort((a, b) => {
        return a[5] - b[5]
      });

      const position = []
      const numbers = []
      const req = []
      const fulfilment = []
      const type = []
      const notes = []

      for (let i = 0; i < this.requirements.length; i++) {
        position[i] = this.requirements[i][5]
        numbers[i] = this.requirements[i][0]
        req[i] = this.requirements[i][1]
        fulfilment[i] = this.requirements[i][2]
        type[i] = this.requirements[i][3]
        notes[i] = this.requirements[i][4]
      }


      const docRef = doc(db, "challenges", this.id);
      await updateDoc(docRef, {
        position: position,
        numbers: numbers,
        requirements: req,
        fulfilments: fulfilment,
        notes: notes,
        fulfilType: type,
      });

      this.getUser();
    },
    changeStatus() {
      const docRef = doc(db, "challenges", this.id);
      let date = new Date();
      date = date.getFullYear() + "-" + date.getUTCMonth()+1 + "-" + date.getUTCDate()
      if (this.ch_status === "Completed") {
        updateDoc(docRef, {
          status: "Completed",
          endDate: date
        });
      } else {
        updateDoc(docRef, {
          status: this.ch_status,
        });
      }

      this.getChallenge()
    },
    opendivider() {
      this.dividerSwitch = !this.dividerSwitch
    },
    async addDivider() {
      this.requirements.splice(this.dividerPosition, 0, ["", this.dividerText, "", "divider", "", this.dividerPosition]);

      const position = []
      const numbers = []
      const req = []
      const fulfilment = []
      const type = []
      const notes = []

      for (let i = 0; i < this.requirements.length; i++) {
        position[i] = this.requirements[i][5]
        numbers[i] = this.requirements[i][0]
        req[i] = this.requirements[i][1]
        fulfilment[i] = this.requirements[i][2]
        type[i] = this.requirements[i][3]
        notes[i] = this.requirements[i][4]
      }


      const docRef = doc(db, "challenges", this.id);
      await updateDoc(docRef, {
        position: position,
        numbers: numbers,
        requirements: req,
        fulfilments: fulfilment,
        notes: notes,
        fulfilType: type,
      });

      this.dividerSwitch = !this.dividerSwitch

      this.getUser();
    },
    cancelDivider() {
      this.dividerSwitch = !this.dividerSwitch

      this.dividerPosition = "";
      this.dividerText = "";
    },
    async deleteChallenge() {
      await deleteDoc(doc(db, "challenges", this.id))
      await router.push('/dashboard')
    },
    searchCheck(req) {
      if (window[req].value === "" || window['requirement(' + req + ')'].value  === "") {
        this.reqError = true;
      } else {
        this.tempVal = req

        if (req !== 'requirement') {
          req = 'requirement(' + req + ')'
        }

        const data = require('../assets/anilistCategories.json');
        const input = window[req].value.replace(/“|”/g, '"')

        const yearPattern = /\b\d{4}\b/g;
        const scorePattern = /\b\d{1,2}%\b/g;

        let yearMatch = input.match(yearPattern);
        let scoreMatch = input.match(scorePattern);

        let output = input.match(/"(.*?)"/g);

        let tags = [];
        let genres = [];
        let format = [];
        let communityList = []
        this.search.text = []
        this.search.genres = [];
        this.search.tags = [];
        this.search.year = [];
        this.search.season = [];
        this.search.format = [];
        this.search.airing = [];

        this.search.showList = true;
        this.search.showPlanning = true;

        if (output !== null) {
          output = output.map(text => text.replace(/"/g, ''));
          for (let i = 0; i < output.length; i++) {
            if (data.tags.some(x => x.toLowerCase() === output[i].toLowerCase())) {
              tags.push(output[i]);
            } else if (data.genres.some(x => x.toLowerCase() === output[i].toLowerCase())) {
              genres.push(output[i]);
            } else if (data.format.some(x => x.toLowerCase() === output[i].toLowerCase())) {
              format.push(output[i]);
            } else if (data.communityList.some(x => x.toLowerCase() === output[i].toLowerCase())) {
              communityList.push(output[i]);
            }
          }
        }

        this.search.tags = tags;
        this.search.genres = genres;
        this.search.format = format;
        this.search.communityList = communityList;

        if (yearMatch !== null) {
          this.search.year.push(yearMatch);
        }

        if (scoreMatch !== null) {
          this.search.score.push(scoreMatch);
        }

        this.search.between = input.includes("between");

        if (input.toLowerCase().includes("anime")) {
          this.searchType = "ANIME"
        }

        if (input.toLowerCase().includes("manga")) {
          this.searchType = "MANGA"
        }

        if (input.toLowerCase().includes("winter")) {
          this.search.season.push("Winter")
        }

        if (input.toLowerCase().includes("spring")) {
          this.search.season.push("Spring")
        }

        if (input.toLowerCase().includes("summer")) {
          this.search.season.push("Summer")
        }

        if (input.toLowerCase().includes("fall")) {
          this.search.season.push("Fall")
        }
      }

      this.searchFields()
    },
    searchFields() {
      this.searchResult = []
      if (this.searchText !== "") {
        this.search.text = [this.searchText];
      } else {
        this.search.text = []
      }

      if (!this.search.genres.includes(this.genres) && this.genres !== "") {
        this.search.genres.push(this.genres);
      }

      if (!this.search.tags.includes(this.tags) && this.tags !== "") {
        this.search.tags.push(this.tags);
      }

      if (!this.search.year.includes(this.year) && this.year !== "") {
        this.search.year = [this.year];
      }

      if (!this.search.season.includes(this.season) && this.season !== "") {
        this.search.season = [this.season];
      }

      if (!this.search.format.includes(this.format) && this.format !== "") {
        this.search.format.push(this.format);
      }

      if (!this.search.airing.includes(this.airing) && this.airing !== "") {
        this.search.airing.push(this.airing);
      }

      this.search.showList = this.showList;
      this.search.showPlanning = this.showPlanning

      this.searchText = "";
      this.genres = "";
      this.tags = "";
      this.year = "";
      this.season = "";
      this.format = "";
      this.airing = "";

      this.pageNum = 1
      this.searchQuery(this.pageNum)
    },
    async searchQuery(num) {
      let media = "(";

      if (this.search.text.length === 1) {
        media = media + 'search: "' + this.search.text[0] + '"'
      } else {
        media = media + "search: null"
      }

      media = media + ", type: " + this.searchType.toUpperCase()

      if (this.search.genres.length > 0) {
        let genres = '"' + this.search.genres[0] + '"';
        for (let i = 1; i < this.search.genres.length; i++) {
          genres = genres + ', "' + this.search.genres[i] +'"'
        }

        media = media + ", genre_in: [" + genres + "]"
      }

      if (this.search.tags.length > 0) {
        let tags = '"' + this.search.tags[0] + '"';
        for (let i = 1; i < this.search.tags.length; i++) {
          tags = tags + ', "' + this.search.tags[i] +'"'
        }

        media = media + ", tag_in: [" + tags + "]"
      }

      if (this.search.season.length > 0) {
        media = media + ", season: " + this.search.season[0].toUpperCase()
      }

      if (this.search.format.length > 0) {
        let format = this.search.format[0];
        for (let i = 1; i < this.search.format.length; i++) {
          format = format + ', ' + this.search.format[i]
        }

        media = media + ", format_in: [" + format + "]"
      }

      if (this.search.airing.length > 0) {
        let airing = this.search.airing[0];
        for (let i = 1; i < this.search.airing.length; i++) {
          airing = airing + ', ' + this.search.airing[i]
        }

        media = media + ", status_in: [" + airing + "]"
      }

      if (this.search.year.length > 0) {
        let num = parseInt(this.search.year[0])
        num = num += 1
        media = media + ', startDate_greater: ' + this.search.year[0] + '0000 , startDate_lesser: ' + num + '0000'
      }

      media = media + ', onList: ' + this.search.showList + ', sort: POPULARITY_DESC)'


      const query = `
        query ($pageNum: Int) {
          Page (page: $pageNum, perPage: 50) {
              media ` + media +` {
                id
                title {
                  userPreferred
                }
                status
                season
                seasonYear
                episodes
                duration
                chapters
                type
                tags {
                  name
                }
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
                genres
                mediaListEntry {
                  status
                  score
                  progress
                }
              }
          }
        }
      `;

      const variables = {
        pageNum: num,
      };


      const url = 'https://graphql.anilist.co',
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + this.anilistAuth
            },
            body: JSON.stringify({
              query: query,
              variables: variables
            })
          };

      await fetch(url, options).then(handleResponse)
          .then((result) => {
            this.searchEnd = result.data.Page.media.length === 0;

            if (this.search.showPlanning) {
              for (let i = 0; i < result.data.Page.media.length; i++) {
                if (result.data.Page.media[i].mediaListEntry.status === "PLANNING") {
                  for (let j = 0; j < this.searchResult.length; j++) {
                    if (this.searchResult[j].id === result.data.Page.media[i].id) {
                      return;
                    }
                  }
                  this.searchResult.push(result.data.Page.media[i])
                }
              }
            } else if (!this.search.showPlanning) {
              for (let i = 0; i < result.data.Page.media.length; i++) {
                for (let j = 0; j < this.searchResult.length; j++) {
                  if (this.searchResult[j].id === result.data.Page.media[i].id) {
                    return;
                  }
                }
                this.searchResult.push(result.data.Page.media[i])
              }
            }
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

      this.pageNum++
    },
    addUrl(url) {
      if (this.tempVal !== 'requirement') {
        document.getElementById('url(' + this.tempVal + ')').value = url;
      } else {
        this.url = url
      }

      this.searchText = "";
      this.genres = "";
      this.tags = "";
      this.year = "";
      this.season = "";
      this.format = "";
      this.airing = "";

      this.showList = true;
      this.showPlanning = true
    },
    cancelSearch() {
      this.searchText = "";
      this.genres = "";
      this.tags = "";
      this.year = "";
      this.season = "";
      this.format = "";
      this.airing = "";

      this.showList = true;
      this.showPlanning = true
    },
    async deleteSearch(tag) {
      for (let x in this.search) {
        if (await Array.isArray(this.search[x]) ? this.search[x].includes(tag) : false) {
          this.search[x] = this.search[x].filter(item => item !== tag)
        }
      }

      this.searchFields()
    },
    getCode() {
      this.header = this.header.replace("{{ legendCompleted }}", this.legendCompleted)
      this.header = this.header.replace("{{ legendNotCompleted }}", this.legendNotCompleted)
      this.code = this.header + "\n"

      for (let i = 0; i < this.requirements.length; i++) {
        if (this.requirements[i][3] !== 'divider') {
          for (let j = 0; j < this.list.length; j++) {
            if (this.list[j].mediaId ===  parseInt(this.requirements[i][2])) {
              this.code = this.code + this.pad(this.requirements[i][0])
                  + ") ["
              if (this.list[j].status === 'COMPLETED') {
                this.code = this.code + this.legendCompleted
              } else {
                this.code = this.code + this.legendNotCompleted
              }

              this.code = this.code + "] __" + this.requirements[i][1]
                  + "__\nhttps://anilist.co/" + this.requirements[i][3].toLowerCase()
                  + "/" + this.requirements[i][2] + "\nStart: "

              if (this.list[j].startedAt.month !== null) {
                this.code = this.code + this.list[j].startedAt.year + "-" + this.pad(this.list[j].startedAt.month, 2) + "-" + this.pad(this.list[j].startedAt.day, 2)
              } else {
                this.code = this.code + "YYYY-MM-DD"
              }

              if (this.list[j].completedAt.month !== null) {
                this.code = this.code + " Finish: " + this.list[j].completedAt.year + "-" + this.pad(this.list[j].completedAt.month, 2) + "-" + this.pad(this.list[j].completedAt.day, 2)
              } else {
                this.code = this.code + " Finish: YYYY-MM-DD"
              }

              if (this.requirements[i][4] !== '') {
                this.code = this.code + "// " + this.requirements[i][4] + "\n"
              }

              this.code = this.code + "\n\n"
            }
          }
        } else {
          this.code = this.code + "### __" + this.requirements[i][1] + "__ \n"
        }
      }

      if (this.extra !== null) {
        this.code = this.code + "<hr>\n" + this.extra + "\n"
      }

      if (this.footer !== '') {
        this.code = this.code + this.footer + "\n"
      }
    },
    changeShowPlanning() {
      console.log(this.showPlanning)
    }
  },
  mounted() {
    this.getUser();
    this.Categories = require('../assets/anilistCategories.json')
  }
}
</script>

<style scoped>
.imgGradiant {
  background-image: linear-gradient(to top, rgb(42, 48, 60) 25%, transparent 100%);
}
</style>
