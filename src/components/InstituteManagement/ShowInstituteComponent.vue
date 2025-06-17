<script setup>
    import {InstituteStore} from '@/stores/institute';
    import { ref } from 'vue';
    import ProfileSkeletonComponent from '@/components/InstituteManagement/ProfileSkeletonComponent.vue';

    const instituteStore = InstituteStore();

</script>

<template>
    <div id="show-institute" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="show-institute-label">
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <h3 id="show-institute-label" class="font-semibold text-[#3eaf7c]">
                    Institute Profile
                    </h3>
                    <button type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#show-institute">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto w-full">
                    <!-- University Page Container -->
                    <div v-if="!instituteStore.isSkeleton" class="max-w-5xl mx-auto p-6">
                        <!-- University Header -->
                        <div class="bg-white rounded-lg shadow-lg">
                            <!-- Cover Photo Section -->
                            <div class="w-full h-48 bg-gray-300 flex items-center justify-center">
                                <img v-if="instituteStore.instituteView?.coverPhoto" :src="instituteStore.instituteView?.coverPhoto" class="w-full h-full object-cover rounded-t-lg" :alt="instituteStore.instituteView?.coverPhoto">

                                <p v-else class="text-gray-700">No Cover Photo Available</p>
                            </div>

                            <!-- University Information Section -->
                            <div class="p-6">
                                <div class="flex items-center space-x-6">
                                    <!-- University Logo -->
                                    <div class="w-32 h-32 bg-gray-300 flex items-center justify-center rounded-full">
                                        <img v-if="instituteStore.instituteView?.logo" :src="instituteStore.instituteView?.logo" class="w-full h-full object-cover rounded-full" :alt="instituteStore.instituteView?.logo">
                                        <p v-else class="text-gray-700">No Logo</p>
                                    </div>

                                    <!-- University Details -->
                                    <div>
                                        <h1 class="text-3xl font-bold">{{ instituteStore.instituteView?.name }}</h1>
                                        <p class="text-gray-600 mt-2">City: {{ instituteStore.instituteView?.city }}, {{ instituteStore.instituteView?.country }}</p>
                                        <p class="text-gray-600">Type: {{ instituteStore.instituteView?.type }}</p>
                                    </div>
                                </div>

                                <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 ">
                                    <!-- Students Section -->
                                    <div class="flex gap-4 items-center p-3  bg-gray-100 rounded-lg shadow-sm">
                                        <h2 class="text-xl font-semibold ">Total Students :</h2>
                                        <p class="text-gray-600 text-[30px] font-semibold">{{ instituteStore.instituteView?.students?.length }}</p>
                                    </div>

                                    <!-- Rank Section -->
                                    <div class="flex gap-4 items-center p-3  bg-gray-100 rounded-lg shadow-sm">
                                        <h2 class="text-xl font-semibold ">University Ranking :</h2>
                                        <p class="text-gray-600 text-[30px] font-semibold">{{ instituteStore.instituteView?.rank }}</p>
                                    </div>
                                </div>

                                <!-- Departments Section -->
                                <div class="mt-8">
                                    <h2 class="text-xl font-semibold mb-4">Departments</h2>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <!-- Loop through departments -->
                                        <div v-for="(depertment, index) in instituteStore.instituteView?.depertments" :key="index" class="bg-gray-100 p-4 rounded-lg shadow-sm">
                                            <h3 class="text-lg font-bold">{{ depertment.name }}</h3>
                                        </div>

                                    </div>
                                </div>

                                <!-- Gallery Section -->
                                <div class="mt-8">
                                    <h2 class="text-xl font-semibold mb-4">Gallery</h2>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <!-- Loop through departments -->
                                        <div v-for="(gallery, index) in instituteStore.instituteView?.gallery" :key="index" class="bg-gray-100 rounded-lg shadow-sm">
                                            <img :src="gallery.url" class="w-full h-[150px] object-cover" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProfileSkeletonComponent v-else />
                </div>
            </div>
        </div>
    </div>
</template>