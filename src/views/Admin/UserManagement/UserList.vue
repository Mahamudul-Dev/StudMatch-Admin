<script setup>
  import Main from '@/layouts/Main.vue';
  import BreadCrumbComponent from '@/components/BreadCrumbComponent.vue';
  import { UserStore } from '@/stores/user';
  import { onMounted } from 'vue';
  import EditIcon from '@/components/icons/EditIcon.vue';
  import ViewIcon from '@/components/icons/ViewIcon.vue';
  import ShowProfileComponent from '@/components/UserManagement/ShowProfileComponent.vue';
  import ProfileEditComponent from '@/components/UserManagement/ProfileEditComponent.vue';
  import VerificationStatusModalComponent from '@/components/UserManagement/VerificationStatusModalComponent.vue';
  import AccountStatusModalComponent from '@/components/UserManagement/AccountStatusModalComponent.vue';
  import ConversationIcon from '@/components/icons/ConversationIcon.vue';
  import ConversationModalComponent from '@/components/UserManagement/ConversationModalComponent.vue';
  import UserManagementIcon from '@/components/icons/UserManagementIcon.vue';
  import { DashboardStore } from '@/stores/dashboard';
  import {InstituteStore} from '@/stores/institute';
  import DocumentStatusIcon from '@/components/icons/DocumentStatusIcon.vue';
  import DocumentVerifyModalComponent from '@/components/UserManagement/DocumentVerifyModalComponent.vue';



  const breadcrumb = {
        title : 'User List',
        items : [
            {
                name: 'User List',
                link: '/admin/user-list',
                active: true
            }
        ]
    }

    const userStore = UserStore();
    const dashboardStore = DashboardStore();
    const instituteStore = InstituteStore();

    onMounted(()=>{
        userStore.getUsers();
        dashboardStore.getDashboardInfos();
        instituteStore.getInstitute();
    })
    // institutes
</script>

<template>
    <Main>
        <BreadCrumbComponent :breadcrumb="breadcrumb">
            <template v-slot:subtitle>
                <h1 class="flex items-center gap-2 text-xl">: <span class="text-2xl text-indigo-700">{{ dashboardStore.dashboardInfos.totalUsersCount }}</span></h1>
            </template>
        </BreadCrumbComponent>

        <div class="card min-h-[800px]">
            <div class="card-body">
                <div class="grid grid-cols-2 md:grid-cols-5 gap-4 py-1.5">
                    <div class="inputDropdown">
                        <select id="select" v-model="userStore.searchInput.limit" class="input p-2 rounded-sm text-[15px]">
                            <option value="10">10 Item</option>
                            <option value="20">20 Item</option>
                            <option value="50">50 Item</option>
                        </select>
                    </div>

                    <div class="inputDropdown">
                        <select id="select" v-model="userStore.filters.accountStatus" class="input p-2 rounded-sm text-[15px]">
                            <option hidden disabled value=null>Select account status</option>
                            <option value="PENDING">PENDING</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="REJECTED">REJECTED</option>
                            <option value="WARNED">WARNED</option>
                            <option value="SUSPEND">SUSPEND</option>
                            <option value="BLOCK">BLOCK</option>
                            <option value="BANNED">BANNED</option>
                            <option value="DELETED">DELETED</option>
                        </select>
                    </div>

                    <div class="inputDropdown">
                        <select id="select" v-model="userStore.filters.verificationStatus" class="input p-2 rounded-sm text-[15px]">
                            <option hidden disabled value=null>Select verification status</option>
                            <option value="VERIFIED">VERIFIED</option>
                            <option value="VERIFICATION_PENDING">VERIFICATION PENDING</option>
                            <option value="UNVERIFIED">UNVERIFIED</option>
                                <option value="VERIFICATION_REJECTED">VERIFICATION REJECTED</option>
                        </select>
                    </div>

                    <div class="inputDropdown">
                        <select id="select" v-model="userStore.filters.instituteId" class="input p-2 rounded-sm text-[15px]">
                            <option hidden disabled value=null>Select Institute</option>
                            <option v-for="institute in instituteStore.institutes" :key="institute.id" :value="institute.id">{{ institute.name }}</option>
                        </select>
                    </div>

                    <div class="inputDropdown">
                        <select id="select" v-model="userStore.filters.instituteType" class="input p-2 rounded-sm text-[15px]">
                            <option hidden disabled value=null>Select Institute Type</option>
                            <option value="UNIVERSITY">UNIVERSITY</option>
                            <option value="HIGH_SCHOOL">HIGH SCHOOL</option>
                        </select>
                    </div>

                    <div class="inputDropdown">
                        <select id="select" v-model="userStore.filters.gender" class="input p-2 rounded-sm text-[15px]">
                            <option hidden disabled value=null>Select Gender</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                            <option value="WOMEN">WOMEN</option>
                            <option value="MEN">MEN</option>
                            <option value="TRANS">TRANS</option>
                            <option value="BISEXUAL">BISEXUAL</option>
                            <option value="OTHER">OTHER</option>
                            <option value="PREFER_NOT_TO_SAY">PREFER NOT TO SAY</option>
                        </select>
                    </div>


                    <div class="">
                        <label class="sr-only">Likes</label>
                        <input type="text" name="hs-table-with-pagination-search" v-model.number="userStore.filters.likes"
                            id="hs-table-with-pagination-search"
                            class="py-2 px-3 block w-full border border-gray-400 shadow-sm rounded-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                            placeholder="Search By Like">
                    </div>

                    <div class="">
                        <label class="sr-only">Matches</label>
                        <input type="text" name="hs-table-with-pagination-search" v-model.number="userStore.filters.matches"
                            id="hs-table-with-pagination-search"
                            class="py-2 px-3 block w-full border border-gray-400 shadow-sm rounded-sm text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                            placeholder="Search By Matches">
                    </div>

                    <div class="inputDropdown">
                        <select id="select" v-model="userStore.filters.likeFilter" class="input p-2 rounded-sm text-[15px]">
                            <option hidden disabled value=null>Select Like Filter</option>
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>

                    <div class="inputDropdown">
                        <select id="select" v-model="userStore.filters.matchFilter" class="input p-2 rounded-sm text-[15px]">
                            <option hidden disabled value=null>Select Match Filter</option>
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
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
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>
                    </div>

                    <div class="inputDropdown">
                        <button @click.prevent="userStore.resetSearch()" class="py-2 px-3 bg-[#247752]/90 hover:bg-[#247752] duration-150 text-white rounded-sm text-[15px]">Reset</button>
                    </div>

                </div>
                <div class="flex flex-col">
                    <div class="-m-1.5 overflow-x-auto">
                        <div class="p-1.5 min-w-full inline-block align-middle">
                            <div class="border p-4 rounded-lg space-y-3 divide-gray-200">
                                <div class="overflow-hidden">
                                    <table class="min-w-full divide-y divide-gray-300 border border-gray-400">
                                        <thead class="">
                                            <tr>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Sl</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Image</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Name</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Email</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Institute</th>
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
                                                    Matches</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Likes</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Verification Status</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Account Status</th>
                                                <th scope="col" width="10%"
                                                    class="px-6 py-2 text-center text-sm font-medium text-gray-900 uppercase ">
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody class="divide-y divide-gray-400 dark:divide-gray-700">
                                            <tr v-for="(user, index) in userStore.users" :key="index">
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-400">{{ index+1 }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                                    <img v-if="user?.profile?.imageUrl" class="h-10 w-10 rounded-full" loading="lazy" :src="user?.profile?.imageUrl" alt="profile">

                                                    <div v-else class="w-10 h-10 bg-gray-400 rounded-full border flex items-center justify-center border-gray-200">
                                                        <UserManagementIcon class="text-[20px] text-gray-600" />
                                                    </div>
                                                </td>
                                                
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.profile.fullName }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.email }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.profile?.institute?.name }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.phone }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.profile.city }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.profile.gender }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.matchCount }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ user?.reactions.filter(reaction => reaction.type.toLowerCase() == 'like').length }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">
                                                    <button @click="userStore.editVerificationStatus(user.id)" class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-xs font-medium border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">{{ user?.verificationStatus }}</button>
                                                </td>
                                                <td class="px-6 py-2 text-sm text-gray-800 dark:text-gray-200 capitalize">
                                                    <button @click="userStore.editAccountStatus(user.id)" class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-xs font-medium border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">{{ user?.accountStatus }}</button>
                                                </td>

                                                <td class="px-6 py-2 flex gap-4">
                                                    <button type="button" @click="userStore.viewProfile(user.id)" class="py-1.5 px-1.5 bg-[#3eaf7c] hover:bg-[#247752] rounded-md">
                                                        <ViewIcon class="text-white text-[18px]"/>
                                                    </button>

                                                    <button @click="userStore.verifyDocument(user.id)" type="button" class="py-1.5 px-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-md">
                                                        <DocumentStatusIcon class="text-white text-[18px]"/>
                                                    </button>

                                                    <button @click="userStore.editProfile(user.id)" type="button" class="py-1.5 px-1.5 bg-blue-600 hover:bg-[#2b4988] rounded-md">
                                                        <EditIcon class="text-white text-[18px]"/>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-if="userStore.users.length == 0 && !userStore.isLoading">
                                                <td class="text-gray-600 dark:text-gray-100 text-center text-sm py-3" colspan="12">No data found</td>
                                            </tr>

                                            <tr v-if="userStore.isLoading">
                                                <td colspan="12" class="text-center p-3">
                                                    <div class="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            
                                <div class="flex justify-end" v-if="userStore.totalPages !== 0">
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

        <ProfileEditComponent/>
        <ShowProfileComponent/>
        <VerificationStatusModalComponent/>
        <AccountStatusModalComponent/>
        <ConversationModalComponent/>
        <DocumentVerifyModalComponent/>
    </Main>
</template>