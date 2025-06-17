<script setup>
  import Main from '@/layouts/Main.vue';
  import BreadCrumbComponent from '@/components/BreadCrumbComponent.vue';
  import UsersIcon from '@/components/icons/UsersIcon.vue';
  import { DashboardStore } from '@/stores/dashboard';
  import ActiveUserIcon from '@/components/icons/ActiveUserIcon.vue';
  import InstituteIcon from '@/components/icons/InstituteIcon.vue';
  import PendingUserIcon from '@/components/icons/PendingUserIcon.vue';
  import VertificationPending from '@/components/icons/VertificationPending.vue';
  import LoginIcon from '@/components/icons/LoginIcon.vue';
  import ClockIcon from '@/components/icons/ClockIcon.vue';
  import { NotificationStore } from '@/stores/notification';
  import { onMounted } from 'vue';

  const breadcrumb = {
    title: 'Dashboard',
  }

  const dashboardStore = DashboardStore();
  const notificationStore = NotificationStore();

  onMounted(()=>{
    dashboardStore.getLatestUsers();
    dashboardStore.getDashboardInfos();
    dashboardStore.getLatestInstitutes();
  })
</script>

<template>
  <Main>
    <BreadCrumbComponent :breadcrumb="breadcrumb" />
    <div class="card min-h-[800px]">
      <div class="card-body space-y-10">
        <div class="row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-4">

          <div class="card mb-0 border border-gray-200 shadow-md shadow-gray-500/30 bg-[#FFFFFF]">
            <div class="flex justify-between p-3 min-h-[100px]">
              <div class="title space-y-2">
                <h1 class="text-[20px] text-gray-900 font-semibold">Total Institute</h1>
                <h1 class="text-[40px] text-[#b61414] font-semibold">{{ dashboardStore.dashboardInfos.totalInstituteCount }}</h1>
              </div>

              <div class="icon flex items-center">
                <InstituteIcon class="text-[40px] text-[#b61414] opacity-[0.8]" />
              </div>
            </div>
          </div>

          <div class="card mb-0 border border-gray-200 shadow-md shadow-gray-500/30 bg-[#FFFFFF]">
            <div class="flex justify-between p-3 min-h-[100px]">
              <div class="title space-y-2">
                <h1 class="text-[20px] text-gray-900 font-semibold">Total User</h1>
                <h1 class="text-[40px] text-[#b61414] font-semibold">{{ dashboardStore.dashboardInfos.totalUsersCount }}</h1>
              </div>

              <div class="icon flex items-center">
                <UsersIcon class="text-[50px] text-[#b61414] opacity-[0.8]" />
              </div>
            </div>
          </div>

          <div class="card mb-0 border border-gray-200 shadow-md shadow-gray-500/30 bg-[#FFFFFF]">
            <div class="flex justify-between p-3 min-h-[100px]">
              <div class="title space-y-2">
                <h1 class="text-[20px] text-gray-900 font-semibold">Online User's</h1>
                <h1 class="text-[40px] text-[#b61414] font-semibold">{{ dashboardStore.dashboardInfos.onlineUsersCount }}</h1>
              </div>

              <div class="icon flex items-center">
                <ActiveUserIcon class="text-[50px] text-[#b61414] opacity-[0.8]" />
              </div>
            </div>
          </div>

          <div class="card mb-0 border border-gray-200 shadow-md shadow-gray-500/30 bg-[#FFFFFF]">
            <div class="flex justify-between p-3 min-h-[100px]">
              <div class="title space-y-2">
                <h1 class="text-[20px] text-gray-900 font-semibold">Pending User's</h1>
                <h1 class="text-[40px] text-[#b61414] font-semibold">{{ dashboardStore.dashboardInfos.pendingUsersCount }}</h1>
              </div>

              <div class="icon flex items-center">
                <PendingUserIcon class="text-[50px] text-[#b61414] opacity-[0.8]" />
              </div>
            </div>
          </div>

          <div class="card mb-0 border border-gray-200 shadow-md shadow-gray-500/30 bg-[#FFFFFF]">
            <div class="flex justify-between p-3 min-h-[100px]">
              <div class="title space-y-2">
                <h1 class="text-[20px] text-gray-900 font-semibold">Verification Pending</h1>
                <h1 class="text-[40px] text-[#b61414] font-semibold">{{ dashboardStore.dashboardInfos.verificationPendingUsersCount }}</h1>
              </div>

              <div class="icon flex items-center">
                <VertificationPending class="text-[50px] text-[#b61414] opacity-[0.8]" />
              </div>
            </div>
          </div>

          <div class="card mb-0 border border-gray-200 shadow-md shadow-gray-500/30 bg-[#FFFFFF]">
            <div class="flex justify-between p-3 min-h-[100px]">
              <div class="title space-y-2">
                <h1 class="text-[20px] text-gray-900 font-semibold">Daily Logins</h1>
                <h1 class="text-[40px] text-[#b61414] font-semibold">{{ dashboardStore.dashboardInfos.dailyLoginsCount }}</h1>
              </div>

              <div class="icon flex items-center">
                <LoginIcon class="text-[50px] text-[#b61414] opacity-[0.8]" />
              </div>
            </div>
          </div>
        </div>

        <div class="w-full lg:flex gap-6 space-y-5 lg:space-y-0">
          <div class="w-full lg:w-6/12 border p-3 shadow-lg space-y-3">
            <h2 class="text-lg font-semibold text-gray-500">Latest User's</h2>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-300 border border-gray-400">
                    <thead class="">
                        <tr>
                            <th scope="col"
                                class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                Sl</th>
                            <th scope="col"
                                class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                Name</th>
                            <th scope="col"
                                class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                Email</th>
                            <th scope="col"
                                class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                City</th>
                            <th scope="col"
                                class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                Gender</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-400 dark:divide-gray-700">
                        <tr v-for="(user, index) in dashboardStore.latestUsers" :key="index">
                            <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-400">{{ index+1 }}</td>             
                            <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.profile.fullName }}</td>
                            <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.email }}</td>
                            <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.profile.city }}</td>
                            <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.profile.gender }}</td>
                        </tr>

                        <tr v-if="dashboardStore.latestUsers.length === 0 && !dashboardStore.usersIsLoading">
                            <td class="text-gray-600 dark:text-gray-100 text-center text-sm py-3" colspan="8">No data found</td>
                        </tr>

                        <tr v-if="dashboardStore.usersIsLoading">
                            <td colspan="8" class="text-center p-3">
                                <div class="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>

          <div class="w-full lg:w-6/12 border p-3 shadow-lg space-y-3">
            <h2 class="text-lg font-semibold text-gray-500">Latest Institute's</h2>

            <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-300 border border-gray-400">
                      <thead class="">
                          <tr>
                              <th scope="col"
                                  class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                  Sl</th>
                               <th scope="col"
                                  class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                  Name</th>
                              <th scope="col"
                                  class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                  City</th>
                              <th scope="col"
                                  class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                  Total Departments</th>
                              <th scope="col"
                                  class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                  Total Students</th>
                          </tr>
                      </thead>

                      <tbody class="divide-y divide-gray-400 dark:divide-gray-700">
                          <tr v-for="(institute, index) in dashboardStore.latestInstitutes" :key="index">
                              <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-400">{{ index+1 }}</td>
                              <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ institute.name }}</td>
                              <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">
                                  {{ institute.city }}
                              </td>
                              <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">
                                  <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-sm font-medium bg-gray-500 text-white">{{ institute.depertments.length }}</span>
                              </td>
                              <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">
                                  <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-sm font-medium bg-teal-500 text-white">{{ institute.students.length }}</span>
                              </td>
                           </tr>

                          <tr v-if="dashboardStore.latestInstitutes?.length === 0 && !dashboardStore.institutesIsLoading">
                              <td class="text-gray-600 dark:text-gray-100 text-center text-sm py-3" colspan="8">No data found</td>
                          </tr>

                          <tr v-if="dashboardStore.institutesIsLoading">
                              <td colspan="8" class="text-center p-3">
                                  <div class="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                                      <span class="sr-only">Loading...</span>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>

        </div>

        <div class="w-full lg:flex gap-6 space-y-5 lg:space-y-0">
            <div class="w-full lg:w-6/12 border p-3 shadow-lg space-y-3">
                <h2 class="text-lg font-semibold text-gray-500">All Notification Send</h2>
                <div class="overflow-y-auto">
                    <form @submit.prevent="notificationStore.sendNotificationToAll">
                        <div class="w-full">
                            <div class="form-control">
                                <label for="title" class="label">Title</label>
                                <input type="text" v-model="notificationStore.notificationDetails.title" class="input input-bordered" placeholder="Enter Title">
                            </div>

                            <div class="form-control">
                                <label for="content" class="label">Content</label>
                                <textarea v-model="notificationStore.notificationDetails.content" class="input input-bordered" placeholder="Enter Content" rows="8"></textarea>
                            </div>

                            <div class="w-full mt-5">
                                <button type="submit" :disabled="notificationStore.isLoading" class="px-3 py-2 bg-[#3eaf7c] hover:bg-[#247752] text-white rounded-md disabled:cursor-wait disabled:opacity-[0.7]">Send Notification</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="w-full lg:w-6/12"></div>
        </div>
      </div>
    </div>

    
  </Main>
</template>