<script setup>
    import { ref } from 'vue';
    import FormSkeleton from '@/components/SubscriptionManagement/FormSkeletonComponent.vue';
    import {SubscriptionStore} from '@/stores/subscription';

    const subscriptionStore = SubscriptionStore();

</script>

<template>
    <div id="edit-subscription" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="edit-subscription-label">
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <h3 id="edit-subscription-label" class="font-semibold text-[#3eaf7c]">
                    Edit Subscription
                    </h3>
                    <button type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#edit-subscription">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto w-full">
                    <form v-if="!subscriptionStore.isSkeleton" @submit.prevent="subscriptionStore.SubscriptionUpdate" class="space-y-2">
                        <div class="flex gap-4">
                            <div class="form-control w-4/12">
                                <label class="label">Name</label>
                                <input type="text" v-model="subscriptionStore.subscriptionInputs.name" placeholder="Enter Name" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-4/12">
                                <label class="label">Like Limit</label>
                                <input type="number" v-model="subscriptionStore.subscriptionInputs.likeLimit" placeholder="Enter like Limit" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-4/12">
                                <label class="label">Super Like Limit</label>
                                <input type="number" v-model="subscriptionStore.subscriptionInputs.superLikeLimit" placeholder="Enter Super Like Limit" class="input input-bordered w-full" />
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="form-control w-4/12">
                                <label class="label">Like Limit Refrash Duration</label>
                                <input type="number" v-model="subscriptionStore.subscriptionInputs.likeLimitRefrashDuration" placeholder="Enter Like Limit Refrash Duration" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-4/12">
                                <label class="label">Super Like Limit Refrash Duration</label>
                                <input type="number" v-model="subscriptionStore.subscriptionInputs.superLikeLimitRefrashDuration" placeholder="Enter Super Like Limit Refrash Duration" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-4/12">
                                <label class="label">Discover Profile Limit</label>
                                <input type="number" v-model="subscriptionStore.subscriptionInputs.discoverProfileLimit" placeholder="Enter Discover Profile Limit" class="input input-bordered w-full" />
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="form-control w-4/12">
                                <label class="label">Discover Limit Refrash Duration</label>
                                <input type="number" v-model="subscriptionStore.subscriptionInputs.discoverLimitRefrashDuration" placeholder="Enter Discover Limit Refrash Duration" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-4/12">
                                <label class="label">Most Wanted Profile Limit</label>
                                <input type="number" v-model="subscriptionStore.subscriptionInputs.mostwantedProfileLimit" placeholder="Enter Most Wanted Profile Limit" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-4/12">
                                <label class="label">Verification Badge Mood</label>
                                 <select class="input input-bordered w-full" v-model="subscriptionStore.subscriptionInputs.verificationBadgeMood">
                                     <option disabled hidden value="">Select Verification Badge Mood</option>
                                     <option value="NORMAL">NORMAL</option>
                                 </select>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="form-control w-4/12">
                                <label class="label">Custom Chat Background</label>
                                <select class="input input-bordered w-full" v-model="subscriptionStore.subscriptionInputs.customChatBackground">
                                     <option disabled hidden value="">Select Verification Badge Mood</option>
                                     <option value = true>True</option>
                                     <option value = false>False</option>
                                 </select>
                            </div>
                            <div class="form-control w-4/12">
                                <label class="label">Rank Explore Limit</label>
                                <input type="number" v-model="subscriptionStore.subscriptionInputs.rankExploreLimit" placeholder="Enter Rank Explore Limit" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-4/12"></div>
                        </div>

                        <div class="w-full pt-3">
                            <button type="submit" :disabled="subscriptionStore.isLoading" class="px-3 py-2 bg-[#3eaf7c] hover:bg-[#247752] text-white rounded-md disabled:cursor-wait disabled:opacity-[0.7]">Update</button>
                        </div>
                    </form>
                    
                    <FormSkeleton v-else />
                </div>
            </div>
        </div>
    </div>
</template>