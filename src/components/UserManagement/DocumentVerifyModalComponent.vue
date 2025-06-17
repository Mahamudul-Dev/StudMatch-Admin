<script setup>
    import { UserStore } from '@/stores/user';
    import {onMounted } from 'vue'; 
    const userStore = UserStore();
    import DocumentVerificationSkeleton from '@/components/UserManagement/DocumentVerificationSkeleton.vue';
    import DocumentStatusIcon from '@/components/icons/DocumentStatusIcon.vue';



    function checkMimesType(documentName){
        const mimeType = documentName;
        // extract mimes type from single name name 
        const mimeTypeArray = mimeType.split('.');
        const mimeTypeValue = mimeTypeArray[1];

        const isImage = mimeTypeValue.includes('jpg', 'jpeg', 'png', 'gif', 'svg', 'webp');

        if(isImage){
            return 'IMAGE';
        }

        return 'FILE';
    }

</script>

<template>
    <div id="document-verify" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="document-verify-label">
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-2xl sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
            <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <h3 id="document-verify-label" class="font-semibold text-[#3eaf7c]">
                    Verify Document
                    </h3>
                    <button type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#document-verify">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto w-full">
                    <form v-if="!userStore.isSkeleton" class="w-full" @submit.prevent="userStore.updateVerificationStatus">
                        <div class="w-full">
                            <div class="w-full grid grid-cols-4 md:grid-cols-6 gap-4  p-3" v-for="(userVerification, index) in userStore.editUser.userVerifications" :key="index">
                                <a target="_blank" :href="userVerification.documentUrl" class="w-full h-[80px] rounded-lg cursor-pointer">
                                    <div class="w-full h-full border">
                                        <img v-if="checkMimesType(userVerification.documentName) === 'IMAGE'" :src="userVerification.documentUrl" alt="Document Image" class="w-full h-full object-cover rounded-lg">
                                        <div v-else class="w-full h-full flex items-center justify-center bg-gray-300 rounded-lg">
                                            <DocumentStatusIcon class="text-[60px] text-gray-500" />
                                        </div>

                                        <h1 class="text-center text-gray-600">{{ userVerification.documentType }}</h1>
                                    </div>
                                </a>
                            </div>

                            <div class="form-control px-3 mt-10">
                                <select class="input rounded-md input-bordered w-full" v-model="userStore.editUser.verificationStatus">
                                    <option value="" hidden disabled>Select Once</option>
                                    <option value="VERIFIED">VERIFIED</option>
                                    <option value="VERIFICATION_PENDING">VERIFICATION_PENDING</option>
                                    <option value="UNVERIFIED">UNVERIFIED</option>
                                    <option value="VERIFICATION_REJECTED">VERIFICATION_REJECTED</option>
                                </select>
                            </div>
                        </div>

                        
                        <div class="w-full mt-5 px-3" v-if="userStore.editUser.userVerifications?.length !== 0">
                            <button type="submit" :disabled="userStore.isLoading" class="px-3 py-2 bg-[#3eaf7c] hover:bg-[#247752] text-white rounded-md disabled:cursor-wait disabled:opacity-[0.7]">Update</button>
                        </div>
                    </form>

                    <div v-else>
                        <DocumentVerificationSkeleton/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>