<script setup>
  import Main from '@/layouts/Main.vue';
  import BreadCrumbComponent from '@/components/BreadCrumbComponent.vue';
  import {InstituteStore} from '@/stores/institute';
  import { onMounted } from 'vue';
  import EditIcon from '@/components/icons/EditIcon.vue';
  import ViewIcon from '@/components/icons/ViewIcon.vue';
  import InstituteIcon from '@/components/icons/InstituteIcon.vue';
  import CreateModalComponent from '@/components/InstituteManagement/CreateModalComponent.vue';
  import EditModalComponent from '@/components/InstituteManagement/EditModalComponent.vue';
  import ShowInstituteComponent from '@/components/InstituteManagement/ShowInstituteComponent.vue';
  import UploadGalleryComponent from '@/components/InstituteManagement/UploadGalleryComponent.vue';
  import GalleryIcon from '@/components/icons/GalleryIcon.vue';

  const breadcrumb = {
        title : 'Institute List',
        items : [
            {
                name: 'Institute List',
                link: '/admin/institute-list',
                active: true
            }
        ]
    }

    const instituteStore = InstituteStore();

    onMounted(()=>{
        instituteStore.getInstitute();
        instituteStore.getDepartments()
        instituteStore.getGrades()
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
                                <div class="flex justify-between">
                                    <!-- <div class="inputDropdown">
                                        <select id="select" v-model="instituteStore.searchInput.limit" class="input w-[90px] p-2 rounded-sm text-[15px]">
                                            <option value="10">10 Item</option>
                                            <option value="20">20 Item</option>
                                            <option value="50">50 Item</option>
                                        </select>
                                    </div> -->

                                    <div class="relative max-w-xs">
                                        <label class="sr-only">Search</label>
                                        <input type="text" name="hs-table-with-pagination-search" v-model="instituteStore.searchInput.search"
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
                                        <button @click="instituteStore.reset()" class="py-2 px-3 rounded-sm bg-[#32a370] hover:bg-[#247752] duration-150 text-white text-[15px]" aria-haspopup="dialog" aria-expanded="false" aria-controls="create-institute" data-hs-overlay="#create-institute">Create New</button>
                                    </div>

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
                                                    Logo</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Cover Photo</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Rank</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Name</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Address</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Total Departments</th>
                                                <th scope="col"
                                                    class="px-6 py-2 text-start text-sm font-medium text-gray-900 uppercase">
                                                    Total Students</th>
                                                <th scope="col" width="10%"
                                                    class="px-6 py-2 text-center text-sm font-medium text-gray-900 uppercase ">
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody class="divide-y divide-gray-400 dark:divide-gray-700">
                                            <tr v-for="(institute, index) in instituteStore.institutes" :key="index">
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-400">{{ index+1 }}</td>
                                                
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">
                                                    <img v-if="institute.logo" class="w-10 h-10 rounded-full border border-gray-200" loading="lazy" :src="institute.logo" :alt="institute.logo">
                                                    <div v-else class="w-10 h-10 bg-gray-400 rounded-full border flex items-center justify-center border-gray-200">
                                                        <InstituteIcon class="text-[20px] text-gray-600" />
                                                    </div>
                                                </td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">
                                                    <img v-if="institute.coverPhoto" class="w-10 h-10 rounded-full border border-gray-200" loading="lazy" :src="institute.coverPhoto" :alt="institute.coverPhoto">
                                                    <div v-else class="w-10 h-10 bg-gray-400 rounded-full border flex items-center justify-center border-gray-200">
                                                        <InstituteIcon class="text-[20px] text-gray-600" />
                                                    </div>
                                                </td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">
                                                    <div v-if="institute.rank <= 3 && institute.rank !== 0" class="w-[50px] h-[50px] bg-cover bg-center relative" style="background-image: url('/medel.png');">
                                                        <span class="absolute left-[16.5px] top-[6.5px] text-[17px] font-semibold font-sans" :class="{'left-[20.5px]' : institute.rank < 10}, {'text-[12px] left-[16.5px]' : institute.rank > 99}">{{ institute.rank }}</span>
                                                    </div>

                                                    <h2 v-else-if="institute.rank === 0" class="text-[16px] font-medium text-center pr-10">Unranked</h2>

                                                    <h2 class="text-[17px] font-semibold text-center pr-[50px]" v-else>{{ institute.rank }}</h2>
                                                </td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ institute.name }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">
                                                    {{ institute.city }}, {{ institute.country }}
                                                </td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">
                                                    <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-sm font-medium bg-gray-500 text-white">{{ institute.depertments.length }}</span>
                                                </td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">
                                                    <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-sm font-medium bg-teal-500 text-white">{{ institute.students.length }}</span>
                                                </td>

                                                <td class="px-6 py-2 flex gap-4">
                                                    <button type="button" @click="instituteStore.openGalleryModal(institute.id)" class="py-1.5 px-1.5 bg-indigo-500 hover:bg-indigo-600 rounded-md">
                                                        <GalleryIcon class="text-white text-[18px]"/>
                                                    </button>
                                                    <button type="button" @click="instituteStore.viewInstitute(institute.id)" class="py-1.5 px-1.5 bg-[#3eaf7c] hover:bg-[#247752] rounded-md">
                                                        <ViewIcon class="text-white text-[18px]"/>
                                                    </button>
                                                    <button @click="instituteStore.instituteEdit(institute.id)" class="py-1.5 px-1.5 bg-blue-600 hover:bg-[#2b4988] rounded-md">
                                                        <EditIcon class="text-white text-[18px]"/>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-if="!instituteStore.institutes?.length > 0 && !instituteStore.isLoading">
                                                <td class="text-gray-600 dark:text-gray-100 text-center text-sm py-3" colspan="8">No data found</td>
                                            </tr>

                                            <tr v-if="instituteStore.isLoading">
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
        <ShowInstituteComponent/>
        <UploadGalleryComponent/>
    </Main>
</template>