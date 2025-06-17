<script setup>
import ShowProfileSkeleton from './ShowProfileSkeleton.vue';
import { UserStore } from '@/stores/user';

const userStore = UserStore();
</script>


<template>
    <div id="show-profile" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="show-profile-label">
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <h3 id="show-profile-label" class="font-bold text-gray-800 dark:text-white">
                    User Profile
                    </h3>
                    <button type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#show-profile">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div v-if="!userStore.isSkeleton" class="p-4 overflow-y-auto">
                    <!-- Profile Section -->
                    <div class="max-w-5xl mx-auto p-6">
                        <!-- Profile Card -->
                        <div class="bg-white rounded-lg shadow-lg p-8">
                            <div class="w-full md:flex md:items-center md:space-x-6 space-y-10 md:space-y-0">

                                <!-- Profile Picture -->
                                <img v-if="userStore.user?.profile?.profilePicture" :src="userStore.user?.profile?.profilePicture" alt="Profile Picture" class="w-32 h-32 rounded-full object-cover">

                                <div v-else class="w-32 h-32 bg-gray-300 rounded-full flex justify-center items-center text-gray-600 font-semibold">No Image</div>
                                
                                <!-- Profile Information -->
                                <div>
                                    <h1 class="text-2xl font-bold">{{ userStore.user?.profile?.fullName }}</h1>
                                    <p class="text-gray-600">Email: {{ userStore.user?.email }}</p>
                                    <p class="text-gray-600">Phone: {{ userStore.user?.phone }}</p>
                                    <p class="text-gray-600">Location: {{ userStore.user?.profile?.city }}, {{ userStore.user?.profile?.country }}</p>
                                    <p class="text-gray-600">Gender: {{ userStore.user?.profile?.gender }}</p>
                                    <p class="text-gray-600">Interested In: {{ userStore.user?.profile?.interestedGender }}</p>
                                    <p class="text-gray-600">Education: {{ userStore.user?.profile?.instituteDepertment }} at {{ userStore.user?.profile?.institute?.name }}</p>
                                </div>
                            </div>

                            <!-- Interests and Hobbies -->
                            <div class="mt-6">
                                <h2 class="text-lg font-semibold">Bio</h2>
                                <p class="text-gray-600">{{ userStore.user?.profile?.bio ? userStore.user?.profile?.bio : 'No bio available' }}</p>

                                <h2 class="mt-4 text-lg font-semibold">Interests</h2>
                                <p class="text-gray-600">
                                    <span v-for="(interest , i) in userStore.user?.profile?.interests" :key="i" class="inline-block mr-2">
                                        {{ interest }},
                                    </span>
                                </p>

                                <h2 class="mt-4 text-lg font-semibold">Hobbies</h2>
                                <p class="text-gray-600">
                                    <span v-for="(hobby , i) in userStore.user?.profile?.hobbies" :key="i" class="inline-block mr-2">
                                        {{ hobby }},
                                    </span>
                                </p>
                            </div>
                        </div>

                        <!-- Gallery Section -->
                        <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
                            <h2 class="text-lg font-semibold mb-4">Gallery</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <img v-if="userStore.user?.profile?.gallery" v-for="(image , i) in userStore.user?.profile?.gallery" :key="i" :src="image.url" alt="Gallery Image" class="w-full h-48 object-cover rounded-lg">

                                <div v-else class="w-full text-gray-600 font-semibold">
                                    No images available
                                </div>
                            </div>
                        </div>

                        <!-- Followers Section -->
                        <!-- <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
                            <h2 class="text-lg font-semibold mb-4">Followers</h2>
                            <div class="grid grid-cols-3 gap-4">
                               
                                <div class="flex items-center space-x-4">
                                    <img src="https://api.studmatch.app/file/profilePicture/1727704407853.jpg" alt="Nilima Akhi" class="w-16 h-16 rounded-full object-cover">
                                    <div>
                                        <p class="font-bold">Nilima Akhi</p>
                                        <p class="text-gray-600">Khulna, Bangladesh</p>
                                    </div>
                                </div>

                                
                                <div class="flex items-center space-x-4">
                                    <img src="https://api.studmatch.app/file/profilePicture/1727705998032.jpg" alt="Olivia Brown" class="w-16 h-16 rounded-full object-cover">
                                    <div>
                                        <p class="font-bold">Olivia Brown</p>
                                        <p class="text-gray-600">Los Angeles, USA</p>
                                    </div>
                                </div>

                                
                                <div class="flex items-center space-x-4">
                                    <img src="https://api.studmatch.app/file/profilePicture/1727708153786.jpg" alt="Isabella Martinez" class="w-16 h-16 rounded-full object-cover">
                                    <div>
                                        <p class="font-bold">Isabella Martinez</p>
                                        <p class="text-gray-600">Phoenix, USA</p>
                                    </div>
                                </div>
                            </div>
                        </div> -->

                        <!-- Following Section -->
                        <!-- <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
                            <h2 class="text-lg font-semibold mb-4">Following</h2>
                            <div class="grid grid-cols-3 gap-4">
                                
                                <div class="flex items-center space-x-4">
                                    <img src="https://via.placeholder.com/150" alt="Nilima Akhi" class="w-16 h-16 rounded-full object-cover">
                                    <div>
                                        <p class="font-bold">Nilima Akhi</p>
                                        <p class="text-gray-600">Khulna, Bangladesh</p>
                                    </div>
                                </div>

                                
                                <div class="flex items-center space-x-4">
                                    <img src="https://via.placeholder.com/150" alt="Olivia Brown" class="w-16 h-16 rounded-full object-cover">
                                    <div>
                                        <p class="font-bold">Olivia Brown</p>
                                        <p class="text-gray-600">Los Angeles, USA</p>
                                    </div>
                                </div>

                                
                                <div class="flex items-center space-x-4">
                                    <img src="https://via.placeholder.com/150" alt="Isabella Martinez" class="w-16 h-16 rounded-full object-cover">
                                    <div>
                                        <p class="font-bold">Isabella Martinez</p>
                                        <p class="text-gray-600">Phoenix, USA</p>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>

                <div class="p-4 overflow-y-auto">
                    
                </div>
            </div>
        </div>
    </div>
</template>