<script setup>
    import {InstituteStore} from '@/stores/institute';
    import { ref } from 'vue';
    const instituteStore = InstituteStore();

    const galleryUrls = ref([]);

    function fileInput(event){
        const files = event.target.files;
        instituteStore.galleryInputs.gallery = files;

        Array.from(files).forEach((file) => {
            if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                galleryUrls.value.push(e.target.result);
            };
            reader.readAsDataURL(file);
            }
        });
    }


    function reset(){
        instituteStore.galleryInputs.gallery = [];
        instituteStore.galleryInputs.description = '';
        galleryUrls.value = [];
    }
</script>

<template>
    <div id="upload-institute-gallery" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="upload-institute-gallery-label">
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-2xl sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <h3 id="upload-institute-gallery-label" class="font-semibold text-[#3eaf7c]">
                    Upload Institute Gallery
                    </h3>
                    <button type="button" @click="reset" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#upload-institute-gallery">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto w-full">
                    <!-- {{ instituteStore.galleryInputs }} -->
                    <form @submit.prevent="instituteStore.uploadGallery" class="space-y-2">
                        <div class="w-full">
                            <div class="form-control w-full">
                                <label class="label">Gallery</label>
                                <label for="cover-input" class="sr-only">Choose file</label>
                                <input @change="fileInput" multiple type="file" id="cover-input" class="block w-full border border-gray-300 shadow-sm rounded-lg text-sm focus:z-10 focus:outline-none 
                                file:bg-blue-600 file:border-0
                                file:text-gray-50
                                file:me-4
                                file:py-3 file:px-4
                                dark:file:bg-neutral-700 dark:file:text-neutral-400">
                            </div>
                        </div>

                        <div class="w-full">
                            <div class="from-group w-full flex flex-wrap gap-2" v-if="galleryUrls.length > 0">
                                <div v-for="(imageUrl, index) in galleryUrls" :key="index" class="w-[70px] h-[70px] border relative border-[#6FD943] rounded-lg">
                                    <img class="w-full h-full object-cover rounded-lg"  :src="imageUrl" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="w-full">
                            <div class="form-control w-full">
                                <label class="label">Description</label>
                                <textarea type="text" v-model="instituteStore.galleryInputs.description" class="input input-bordered w-full" rows="6" placeholder="Enter Description"></textarea>
                            </div>
                        </div>

                        <div class="w-full pt-3">
                            <button type="submit" :disabled="instituteStore.isLoading" class="px-3 py-2 bg-[#3eaf7c] hover:bg-[#247752] text-white rounded-md disabled:cursor-wait disabled:opacity-[0.7]">Create New</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>