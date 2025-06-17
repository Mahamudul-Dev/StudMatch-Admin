<script setup>
  import Main from '@/layouts/Main.vue';
  import BreadCrumbComponent from '@/components/BreadCrumbComponent.vue';
  import { UserStore } from '@/stores/user';
  import { onMounted } from 'vue';
  import SendNotificationIcon from '@/components/icons/SendNotificationIcon.vue';
  import SendNotificationComponent from '@/components/UserManagement/SendNotificationComponent.vue';
  import { HSOverlay } from 'preline/preline';
  import { NotificationStore } from '@/stores/notification';
import SendNotificationAll from '@/components/UserManagement/SendNotificationAll.vue';


  const notificationStore = NotificationStore();


  const breadcrumb = {
        title : 'Notification',
        items : [
            {
                name: 'Notification',
                link: '/admin/notification',
                active: true
            }
        ]
    }


    const userStore = UserStore();

    onMounted(()=>{
        userStore.getUsers();
    })

    function openNotificationModal(id){
        notificationStore.notificationDetails.receiverId = id;
        HSOverlay.open('#send-notification');
    }

    function openNotificationAllModal(id){
        HSOverlay.open('#send-notification-to-all');
    }

</script>

<template>
    <Main>
        <BreadCrumbComponent :breadcrumb="breadcrumb" />

        <div class="card min-h-[800px]">
            <div class="card-body">
                <div class="flex flex-col">
                    <div class="-m-1.5 overflow-x-auto">
                        <div class="p-1.5 min-w-full inline-block align-middle">
                            <div class="border p-4 rounded-lg space-y-3 divide-gray-200">
                                <div class="flex justify-between">
                                    <div class="flex gap-4">
                                        <div class="inputDropdown">
                                            <select id="select" v-model="userStore.searchInput.limit" class="input w-[90px] p-2 rounded-sm text-[15px]">
                                                <option value="10">10 Item</option>
                                                <option value="20">20 Item</option>
                                                <option value="50">50 Item</option>
                                            </select>
                                        </div>
    
                                        <div class="inputDropdown">
                                            <select id="select" v-model="userStore.searchInput.status" class="input w-[140px] p-2 rounded-sm text-[15px]">
                                                <option hidden disabled value="">Select status</option>
                                                <option value="APPROVED">APPROVED</option>
                                                <option value="REJECTED">REJECTED</option>
                                            </select>
                                        </div>
    
                                        <div class="relative max-w-xs">
                                            <label class="sr-only">Search</label>
                                            <input type="text" name="hs-table-with-pagination-search" v-model="userStore.searchInput.search"
                                                id="hs-table-with-pagination-search"
                                                class="py-2 px-3 ps-9  block w-full border border-gray-400 shadow-sm rounded-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                                placeholder="Search for items">
                                            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                                                <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24"
                                                    height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <circle cx="11" cy="11" r="8" />
                                                    <path d="m21 21-4.3-4.3" /></svg>
                                            </div>
                                        </div>
    
                                        <div class="inputDropdown">
                                            <button @click.prevent="userStore.resetSearch()" class="py-2 px-3 bg-[#247752]/90 hover:bg-[#247752] duration-150 text-white rounded-sm text-[15px]">Reset</button>
                                        </div>
    
                                    </div>

                                    <button @click.prevent="openNotificationAllModal" class="py-2 px-3 flex items-center gap-1.5 bg-[#247752]/90 hover:bg-[#247752] duration-150 text-white rounded-sm text-[15px]">
                                        <SendNotificationIcon class="text-[20px]" />
                                        Notification For All
                                    </button>
                                </div>

                                <div class="overflow-hidden">
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
                                                    Phone</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    City</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Gender</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Status</th>
                                                <th scope="col" width="10%"
                                                    class="px-6 py-2 text-center text-sm font-medium text-gray-900 uppercase ">
                                                    
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody class="divide-y divide-gray-400 dark:divide-gray-700">
                                            <tr v-for="(user, index) in userStore.users" :key="index">
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-400">{{ index+1 }}</td>
                                                
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.profile.fullName }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.email }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.phone }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.profile.city }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.profile.gender }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.accountStatus }}</td>

                                                <td class="px-6 py-2 flex gap-4">
                                                    <button @click="openNotificationModal(user.id)" type="button" class="py-1.5 px-1.5 bg-[#7E50FE] hover:bg-[#247752] rounded-md">
                                                        <SendNotificationIcon class="text-white text-[18px]"/>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-if="!userStore.users.length > 0 && !userStore.isLoading">
                                                <td class="text-gray-600 dark:text-gray-100 text-center text-sm py-3" colspan="8">No data found</td>
                                            </tr>

                                            <tr v-if="userStore.isLoading">
                                                <td colspan="8" class="text-center p-3">
                                                    <div class="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            
                                <div class="flex justify-end" v-if="userStore.totalPages > 0">
                                    <nav class="flex items-center space-x-2">
                                        <button :disabled="userStore.currentPage == page" type="button" v-for="(page, i) in userStore.totalPages" :key="i" @click="userStore.getUsers(page)"
                                            class="py-1 px-2 text-sm rounded-md bg-[#3EAF7C] text-gray-100 font-semibold hover:bg-[#267350]" :class="{ 'bg-[#1e6344]': userStore.currentPage == page }">
                                            <span aria-hidden="true">{{ page }}</span>
                                        </button>
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <SendNotificationComponent/>
        <SendNotificationAll/>
    </Main>
</template>