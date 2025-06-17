<script setup>
  import Main from '@/layouts/Main.vue';
  import BreadCrumbComponent from '@/components/BreadCrumbComponent.vue';
  import {DepartmentStore} from '@/stores/department';
  import { onMounted } from 'vue';
  import EditIcon from '@/components/icons/EditIcon.vue';
  import DeleteIcon from '@/components/icons/DeleteIcon.vue';
  import CreateModalComponent from '@/components/InstituteManagement/Department/CreateModalComponent.vue';
  import EditModalComponent from '@/components/InstituteManagement/Department/EditModalComponent.vue';


  const breadcrumb = {
        title : 'Department List',
        items : [
            {
                name: 'Department List',
                link: '/admin/department-list',
                active: true
            }
        ]
    }

    const departmentStore = DepartmentStore();

    onMounted(()=>{
        departmentStore.getDepartments();
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

                                    <div class="relative max-w-xs">
                                        <label class="sr-only">Search</label>
                                        <input type="text" name="hs-table-with-pagination-search" v-model="departmentStore.searchInput.search"
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
                                        <button @click="departmentStore.reset()" class="py-2 px-3 rounded-sm bg-[#32a370] hover:bg-[#247752] duration-150 text-white text-[15px]" aria-haspopup="dialog" aria-expanded="false" aria-controls="create-department" data-hs-overlay="#create-department">Create New</button>
                                    </div>

                                </div>

                                <div class="overflow-x-auto">
                                    <table class="w-full divide-y divide-gray-400 border border-gray-400">
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
                                            <tr v-for="(department, index) in departmentStore.departments" :key="index">

                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-400">{{ index+1 }}</td>
                                                <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 capitalize">{{ department.name }}</td>

                                                <td class="px-6 py-2 flex gap-4">
                                                    <button @click ="departmentStore.deleteDepartment(department.id)" type="button" class="py-1.5 px-1.5 bg-red-500 hover:bg-red-600 rounded-md">
                                                        <DeleteIcon class="text-white text-[18px]"/>
                                                    </button>
                                                    <button @click="departmentStore.DepartmentEdit(department.id)" type="button" class="py-1.5 px-1.5 bg-blue-600 hover:bg-[#2b4988] rounded-md">
                                                        <EditIcon class="text-white text-[18px]"/>
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr v-if="!departmentStore.departments?.length > 0 && !departmentStore.isLoading">
                                                <td class="text-gray-600 dark:text-gray-100 text-center text-sm py-3" colspan="8">No data found</td>
                                            </tr>

                                            <tr v-if="departmentStore.isLoading">
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