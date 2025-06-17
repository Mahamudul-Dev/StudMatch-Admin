<script setup>
    import { ref, watch } from 'vue';
    import { AdminStore } from '@/stores/admin';
    import { countries } from '@/jsonFiles/countryList';
    import FormSkeleton from '@/components/UserManagement/FormSkeleton.vue';

    const adminStore = AdminStore()

    const allCountries = ref(countries);
    const cities = ref([]);

    watch(() => adminStore.adminForm.country, (newValue, oldValue) => {
        cities.value = allCountries.value[newValue];
    });
</script>

<template>
    <div id="edit-admin" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="edit-admin-label">
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <h3 id="edit-admin-label" class="font-semibold text-[#3eaf7c]">
                    Edit Admin
                    </h3>
                    <button @click="adminStore.reset" type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#edit-admin">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto w-full">
                    <form v-if="!adminStore.isSkeleton" @submit.prevent="adminStore.update" class="space-y-2">
                        <div class="w-full md:flex gap-4 space-y-2 md:space-y-0">

                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Name</label>
                                <input v-model="adminStore.adminForm.name" type="text" placeholder="Enter Name" class="input input-bordered w-full" />
                            </div>

                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Email</label>
                                <input v-model="adminStore.adminForm.email" type="text" placeholder="Enter Email" class="input input-bordered w-full" />
                            </div>

                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Phone</label>
                                <input v-model="adminStore.adminForm.phone" type="text" placeholder="Enter Email" class="input input-bordered w-full" />
                            </div>

                        </div>

                        <div class="w-full md:flex gap-4 space-y-2 md:space-y-0">
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Country</label>
                                <select class="input input-bordered w-full" @change="adminStore.adminForm.city = ''" v-model="adminStore.adminForm.country">
                                    <option hidden disables value="">Select Country</option>
                                    <option v-for="(country, index) in allCountries" :key="index" :value="index">{{ index }}</option>
                                </select>
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">City</label>
                                <select class="input input-bordered w-full" v-model="adminStore.adminForm.city">
                                    <option hidden disabled value="">Select City</option>
                                    <option v-for="(city, index) in cities" :key="index" :value="city">{{ city }}</option>
                                </select>
                            </div>

                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Password</label>
                                <input v-model="adminStore.adminForm.password" type="text" placeholder="********" class="input input-bordered w-full" />
                            </div>
                        </div>

                        <div class="w-full md:flex gap-4 space-y-2 md:space-y-0">
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Role</label>
                                <select class="input input-bordered w-full" v-model="adminStore.adminForm.role">
                                    <option hidden disables value="">Select Country</option>
                                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                                    <option value="REGULAR_ADMIN">REGULAR ADMIN</option>
                                </select>
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                
                            </div>
                        </div>

                        <div class="w-full pt-5">
                            <button type="submit" :disabled="adminStore.isLoading" class="px-3 py-2 bg-[#3eaf7c] hover:bg-[#247752] text-white rounded-md disabled:cursor-wait disabled:opacity-[0.7]">Update</button>
                        </div>

                    </form>

                    <FormSkeleton v-else />
                </div>
            </div>
        </div>
    </div>
</template>