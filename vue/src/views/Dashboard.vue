<template>
  <PageComponent title="Dashboard">
    <div v-if="loading" class="flex justify-center">
      Loading...
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
      <div class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2 animate-fade-in-down"
        style="animation-delay: 0.1s">
        <h3 class="text-2xl font-semibold">
          Total Surveys
        </h3>
        <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
          {{data.totalSurveys}}
        </div>
      </div>
      <div class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 animate-fade-in-down"
        style="animation-delay: 0.2s">
        <h3 class="text-2xl font-semibold">
          Total Answers
        </h3>
        <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
          {{data.totalAnswers}}
        </div>
      </div>
      <div class="row-span-2 bg-white shadow-md p-4 order-3 lg:order-1 animate-fade-in-down">
        <h3 class="text-2xl font-semibold">
          Latest Survey
        </h3>
        <img :src="data.latestSurvey.image_url" alt="latest survey" class="w-[240px] mx-auto">
        <h3 class="font-bold text-xl mb-3">
          {{data.latestSurvey.title}}
        </h3>
        <div class="flex justify-between text-sm mb-1">
          <div>
            Create Date:
          </div>
          <div>
            {{data.latestSurvey.created_at}}
          </div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>
            Expire Date:
          </div>
          <div>
            {{data.latestSurvey.expire_date}}
          </div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>
            Status:
          </div>
          <div>
            {{data.latestSurvey.status ? 'Active' : 'Draft'}}
          </div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>
            Questions:
          </div>
          <div>
            {{data.latestSurvey.questions}}
          </div>
        </div>
        <div class="flex justify-between text-sm mb-3">
          <div>
            Answers:
          </div>
          <div>
            {{data.latestSurvey.answers}}
          </div>
        </div>
        <div class="flex justify-between">
          <router-link :to="{name: 'SurveyView', params: {id: data.latestSurvey.id}}"
            class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            Edit Survey
          </router-link>
          <button
            class="flex py-2 px-4 border border-transparent text-sm rounded-me text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fill-rule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                clip-rule="evenodd" />
            </svg>
            View Answers
          </button>
        </div>
      </div>
      <div class="bg-white shadow-md p-3 row-span-2 order-4 lg:order-3 animate-fade-in-down"
        style="animation-delay: 0.3s">
        <div class="flex justify-between items-center mb-3 px-2">
          <h3 class="text-2xl font-semibold">
            Latest Answers
          </h3>
          <a href="javascript:void(0)" class="text-sm text-blue-500 hover:decoration-blue-500">
            View All
          </a>
        </div>
        <a href="#" v-for="answer of data.latestAnswers" :key="answer.id" class="block p-2 hover:bg-gray-100/90">
          <div class="font-semibold">
            {{answer.survey.title}}
          </div>
          <small>
            Answer Made at:
            <i class="font-semibold">{{answer.end_date}}</i>
          </small>
        </a>

      </div>
    </div>
  </PageComponent>
</template>



<script setup>
import { computed } from "vue";
import PageComponent from "../components/PageComponent.vue"
import { useStore } from 'vuex'

const store = useStore()
const loading = computed(() => store.state.dashboard.loading)
const data = computed(() => store.state.dashboard.data)

store.dispatch("getDashboardData")


</script>



<style>

</style>