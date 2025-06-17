<script setup>
    import { computed, ref, watch } from 'vue';
    import {SubscriptionPromoStore} from '@/stores/subscriptionPromo';

    const promoStore = SubscriptionPromoStore();

    const availablePackages = computed(() => {
        return promoStore.subscriptions.filter(subscription => subscription.promo == null);
    });

    const durationDate = ref('');

    watch(() => durationDate.value, () => {
        const selectedDate = new Date(durationDate.value);
        const now = new Date();

        if (isNaN(selectedDate.getTime())) {
            // Handle invalid date input
            console.error("Invalid date selected");
            return 0;
        }

        promoStore.promoInputs.discountDuration = selectedDate.getTime() - now.getTime(); // Milliseconds difference
    });

    const bannerUrl = ref('');

    function fileInput(event){
        const file = event.target.files[0];
        promoStore.promoInputs.banner = file;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                bannerUrl.value = (e.target.result);
            }

            reader.readAsDataURL(file);
        }
    }

    async function submit(){
       await promoStore.createPromo();
       bannerUrl.value = '';
    }

</script>

<template>
    <div id="create-promo" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="create-promo-label">
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <h3 id="create-promo-label" class="font-semibold text-[#3eaf7c]">
                    Create Promo
                    </h3>
                    <button type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#create-promo">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto w-full">

                    <form @submit.prevent="submit" class="space-y-2">
                        <div class="flex gap-4">
                            <div class="form-control w-4/12">
                                <label class="label">Name</label>
                                <select v-model="promoStore.promoInputs.packageId" name="package" id="package" class="input input-bordered">
                                    <option value="" disabled hidden>Select Package</option>
                                    <option v-for="(subscription, index) in availablePackages" :key="index" :value="subscription.id">{{ subscription.name }}</option>
                                </select>
                            </div>

                            <div class="form-control w-4/12">
                                <label class="label">Discount <span>(In Percentage)</span></label>
                                <input type="number" v-model="promoStore.promoInputs.discountPercent" placeholder="Enter Discount" class="input input-bordered w-full" />
                            </div>

                            <div class="form-control w-4/12">
                                <label class="label">Duration</label>
                                <input type="date" v-model="durationDate" class="input input-bordered w-full" />
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="form-control w-full">
                                <label class="label">Description</label>
                                <textarea type="date" rows="6" v-model="promoStore.promoInputs.description" class="input input-bordered w-full"></textarea>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="w-full space-y-2">
                                <div class="form-control w-full">
                                    <label class="label">Banner</label>
                                    <label for="cover-input" class="sr-only">Choose file</label>
                                    <input @change="fileInput" type="file" id="cover-input" class="block w-full border border-gray-300 shadow-sm rounded-lg text-sm focus:z-10 focus:outline-none 
                                    file:bg-blue-600 file:border-0
                                    file:text-gray-50
                                    file:me-4
                                    file:py-3 file:px-4
                                    dark:file:bg-neutral-700 dark:file:text-neutral-400">
                                </div>

                                <div class="w-[70px] h-[70px] border relative border-[#6FD943] rounded-lg" v-if="bannerUrl">
                                    <img class="w-full h-full object-fill rounded-lg"  :src="bannerUrl" alt="Banner">
                                </div>
                            </div>
                        </div>

                        <div class="w-full pt-3">
                            <button type="submit" :disabled="promoStore.isLoading" class="px-3 py-2 bg-[#3eaf7c] hover:bg-[#247752] text-white rounded-md disabled:cursor-wait disabled:opacity-[0.7]">Create New</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</template>