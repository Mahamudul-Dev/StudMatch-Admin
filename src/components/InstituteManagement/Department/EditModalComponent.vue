<script setup>
    import { ref, watch } from 'vue';
    import {DepartmentStore} from '@/stores/department';

    const departmentStore = DepartmentStore();


</script>

<template>
    <div id="edit-department" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="edit-department-label">
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <h3 id="edit-department-label" class="font-semibold text-[#3eaf7c]">
                    Edit Department
                    </h3>
                    <button type="button" @click="departmentStore.reset" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#edit-department">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto w-full">
                    <form @submit.prevent="departmentStore.DepartmentUpdate" class="space-y-2">
                        <div class="flex gap-4">
                            <div class="form-control w-full">
                                <label class="label">Name</label>
                                <input type="text" v-model="departmentStore.departmentForm.depertmentName" placeholder="Enter Name" class="input input-bordered w-full" />
                            </div>
                        </div>

                        <div class="w-full pt-3">
                            <button type="submit" :disabled="departmentStore.isLoading" class="px-3 py-2 bg-[#3eaf7c] hover:bg-[#247752] text-white rounded-md disabled:cursor-wait disabled:opacity-[0.7]">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>