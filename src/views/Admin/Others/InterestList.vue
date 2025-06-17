<script setup>
  import Main from '@/layouts/Main.vue';
  import BreadCrumbComponent from '@/components/BreadCrumbComponent.vue';
  import {InterestStore} from '@/stores/interest';
  import { onMounted } from 'vue';
  import EditIcon from '@/components/icons/EditIcon.vue';
  import DeleteIcon from '@/components/icons/DeleteIcon.vue';
  import CreateModalComponent from '@/components/OthersManagement/Interest/CreateModalComponent.vue';
  import EditModalComponent from '@/components/OthersManagement/Interest/EditModalComponent.vue';


  const breadcrumb = {
        title : 'Interest List',
        items : [
            {
                name: 'Interest List',
                link: '/admin/interest-list',
                active: true
            }
        ]
    }

    const interestStore = InterestStore();

    onMounted(()=>{
        interestStore.getInterset();
    })

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
                                <div class="w-full md:flex justify-between space-y-3 md:space-y-0">
                                    <!-- <div class="inputDropdown">
                                        <select id="select" v-model="interestStore.searchInput.limit" class="input w-[90px] p-2 rounded-sm text-[15px]">
                                            <option value="10">10 Item</option>
                                            <option value="20">20 Item</option>
                                            <option value="50">50 Item</option>
                                        </select>
                                    </div> -->

                                    <div class="relative max-w-xs">
                                        <label class="sr-only">Search</label>
                                        <input type="text" name="hs-table-with-pagination-search" v-model="interestStore.searchInput.search"
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

                                    <div class="inputDropdown space-x-4">
                                        <button @click="interestStore.reset()" class="py-2 px-3 rounded-sm bg-[#32a370] hover:bg-[#247752] duration-150 text-white text-[15px]" aria-haspopup="dialog" aria-expanded="false" aria-controls="create-interest" data-hs-overlay="#create-interest">Create New</button>
                                    </div>

                                </div>

                                <div class="overflow-hidden">
                                    <table class="min-w-full divide-y divide-gray-400 border border-gray-400">
                                        <thead class="">
                                            <tr>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Sl</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Name</th>
                                                <th scope="col" width="10%"
                                                    class="px-6 py-2 text-center text-sm font-medium text-gray-900 uppercase ">
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody class="divide-y divide-gray-400 dark:divide-gray-700">
                                            <tr v-for="(interest, index) in interestStore.interests" :key="index">

                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-400">{{ index+1 }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ interest.name }}</td>

                                                <td class="px-6 py-2 flex gap-4">
                                                    <button type="button" @click="interestStore.deleteInterset(interest.id)" class="py-1.5 px-1.5 bg-red-500 hover:bg-red-600 rounded-md">
                                                        <DeleteIcon class="text-white text-[18px]"/>
                                                    </button>
                                                    <!-- <button @click="interestStore.HobbyEdit(subscription.id)" type="button" class="py-1.5 px-1.5 bg-blue-600 hover:bg-[#2b4988] rounded-md">
                                                        <EditIcon class="text-white text-[18px]"/>
                                                    </button> -->
                                                </td>
                                            </tr>

                                            <tr v-if="!interestStore.interests?.length > 0 && !interestStore.isLoading">
                                                <td class="text-gray-600 dark:text-gray-100 text-center text-sm py-3" colspan="8">No data found</td>
                                            </tr>

                                            <tr v-if="interestStore.isLoading">
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
                    </div>
                </div>
            </div>
        </div>

        <CreateModalComponent/>
        <EditModalComponent/>
    </Main>
</template>