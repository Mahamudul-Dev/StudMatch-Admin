<script setup>
    import {InstituteStore} from '@/stores/institute';
    import { computed, ref, watch } from 'vue';
    import InstituteFormSkeleton from './InstituteFormSkeleton.vue';
    import { countries } from '@/jsonFiles/countryList';
    const instituteStore = InstituteStore();

    const logoUrl = ref('');
    const coverUrl = ref('');


    watch(()=> instituteStore.instituteInputs.logoSrc, () => {
        logoUrl.value = instituteStore.instituteInputs.logoSrc
        coverUrl.value = instituteStore.instituteInputs.coverSrc
    })

    function logoInput(event){
        const file = event.target.files[0];
        instituteStore.instituteInputs.logo = file;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                logoUrl.value = (e.target.result);
            };
            reader.readAsDataURL(file);
        } 
    }
    
    function coverInput(event){
        const file = event.target.files[0];
        instituteStore.instituteInputs.cover = file;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                coverUrl.value = (e.target.result);
            };
            reader.readAsDataURL(file);
        } 
    }


    const allCountries = ref(countries);
    const cities = ref([]);

    watch(() => instituteStore.instituteInputs.country, (newValue, oldValue) => {
        cities.value = allCountries.value[newValue];
    });


    import Multiselect from 'vue-multiselect'
    import 'vue-multiselect/dist/vue-multiselect.min.css'

    const SelectsDepartments = ref([]);
    const SelectsGrades = ref([]);

    watch(()=> SelectsDepartments.value, () => {
      const ids  = SelectsDepartments.value.map((v) => v.id);

      console.log(ids);
      instituteStore.instituteInputs.depertmentIds = ids ;
    })

    watch(()=> SelectsGrades.value, () => {
        instituteStore.instituteInputs.gradeIds = SelectsGrades.value.map((v) => v.id);
    })
</script>

<template>
    <div id="edit-institute" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="edit-institute-label">
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <h3 id="edit-institute-label" class="font-semibold text-[#3eaf7c]">
                    Update Institute
                    </h3>
                    <button @click="instituteStore.reset" type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#edit-institute">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto w-full">
                    <form v-if="!instituteStore.isSkeleton" @submit.prevent="instituteStore.instituteUpdate" class="space-y-2">
                        <div class="w-full md:flex gap-4 space-y-2 md:space-y-0">
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Name</label>
                                <input v-model="instituteStore.instituteInputs.name" type="text" placeholder="Enter Name" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Country</label>
                                <!-- <input v-model="instituteStore.instituteInputs.country" type="text" placeholder="Enter Country" class="input input-bordered w-full" /> -->

                                <select class="input input-bordered w-full" @change="instituteStore.instituteInputs.city = ''" v-model="instituteStore.instituteInputs.country">
                                    <option hidden disables value="">Select Country</option>
                                    <option v-for="(country, index) in allCountries" :key="index" :value="index">{{ index }}</option>
                                </select>
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">City</label>
                                <!-- <input v-model="instituteStore.instituteInputs.city" type="text" placeholder="Enter City" class="input input-bordered w-full" /> -->
                                <select class="input input-bordered w-full" v-model="instituteStore.instituteInputs.city">
                                    <option hidden disabled value="">Select City</option>
                                    <option v-for="(city, index) in cities" :key="index" :value="city">{{ city }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="w-full md:flex gap-4 space-y-2 md:space-y-0">
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Type</label>
                                <select class="input input-bordered w-full" v-model="instituteStore.instituteInputs.type">
                                    <option value="" hidden disabled>Select Type</option>
                                    <option value="UNIVERSITY">UNIVERSITY</option>
                                    <option value="HIGH_SCHOOL">HIGH SCHOOL</option>
                                </select>
                                <!-- <input v-model="instituteStore.instituteInputs.type" type="text" placeholder="Enter Type" class="input input-bordered w-full" /> -->
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Logo</label>
                                <label for="logo-input" class="sr-only">Choose file</label>
                                <input @change="logoInput" type="file" id="logo-input" class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                file:bg-blue-600 file:border-0
                                file:text-gray-50
                                file:me-4
                                file:py-3 file:px-4
                                dark:file:bg-neutral-700 dark:file:text-neutral-400">
                            </div>

                            <div class="form-control w-full md:w-4/12 md:hidden">
                                <div class="w-[60px] h-[60px] p-1" v-if="logoUrl">
                                    <img class="w-full h-full rounded-full ring ring-[#3eaf7c]" :src="logoUrl" alt="">
                                </div>
                            </div>

                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Cover Photo</label>
                                <label for="cover-input" class="sr-only">Choose file</label>
                                <input @change="coverInput" type="file" id="cover-input" class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                file:bg-blue-600 file:border-0
                                file:text-gray-50
                                file:me-4
                                file:py-3 file:px-4
                                dark:file:bg-neutral-700 dark:file:text-neutral-400">
                            </div>

                            <div class="form-control w-full md:w-4/12 md:hidden">
                                <div class="w-[60px] h-[60px] p-1" v-if="coverUrl">
                                    <img class="w-full h-full rounded-full ring ring-[#3eaf7c]" :src="coverUrl" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="w-full hidden md:flex gap-4 pt-2 space-y-2 md:space-y-0">
                            <div class="form-control w-full md:w-4/12">
                                
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                <div class="w-[60px] h-[60px] p-1" v-if="logoUrl">
                                    <img class="w-full h-full rounded-full ring ring-[#3eaf7c]" :src="logoUrl" alt="">
                                </div>
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                <div class="w-[60px] h-[60px] p-1" v-if="coverUrl">
                                    <img class="w-full h-full rounded-full ring ring-[#3eaf7c]" :src="coverUrl" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="w-full md:flex gap-4 space-y-2 md:space-y-0">
                            <div v-if="instituteStore.instituteInputs.type == 'UNIVERSITY'" class="form-control w-full md:w-4/12">
                                <label class="label">Department</label>
                                <Multiselect 
                                    class="border border-gray-300 rounded-lg" 
                                    v-model="SelectsDepartments" 
                                    :close-on-select="true" 
                                    :clear-on-select="true"
                                    :taggable="true" 
                                    tag-placeholder="Add this as new tag" 
                                    placeholder="Search or add a tag"
                                    label="name"
                                    :options="instituteStore.departments" 
                                    :multiple="true"
                                >
                                    <template #selection="{ values, search, isOpen }">
                                    <span class="multiselect__single" v-if="values.length" v-show="!isOpen">
                                        {{ values.map(v => v.name).join(", ") }}
                                    </span>
                                    </template>
                                </Multiselect>
                            </div>

                            <div v-else class="form-control w-full md:w-4/12">
                                <label class="label">Grades</label>
                                <Multiselect 
                                    class="border border-gray-300 rounded-lg" 
                                    v-model="SelectsGrades" 
                                    :close-on-select="true" 
                                    :clear-on-select="true"
                                    :taggable="true" 
                                    tag-placeholder="Add this as new tag" 
                                    placeholder="Search or add a tag"
                                    label="name"
                                    track-by="id"
                                    :options="instituteStore.grades" 
                                    :multiple="true"
                                >
                                    <template #selection="{ values, search, isOpen }">
                                    <span class="multiselect__single" v-if="values.length" v-show="!isOpen">
                                        {{ values.map(v => v.name).join(", ") }}
                                    </span>
                                    </template>
                                </Multiselect>
                            </div>

                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Rank</label>
                                <input v-model="instituteStore.instituteInputs.rank" type="number" placeholder="Enter Rank" class="input input-bordered w-full" />
                            </div>
                        </div>

                        <div class="w-full">
                            <div class="form-control w-full">
                                <label class="label">Description</label>
                                <textarea class="input input-bordered w-full" v-model="instituteStore.instituteInputs.description" rows="6" placeholder="Enter Description"></textarea>
                            </div>
                        </div>

                        <div class="w-full pt-5">
                            <button type="submit" :disabled="instituteStore.isLoading" class="px-3 py-2 bg-[#3eaf7c] hover:bg-[#247752] text-white rounded-md disabled:cursor-wait disabled:opacity-[0.7]">Update</button>
                        </div>

                    </form>

                    <InstituteFormSkeleton v-else />
                </div>
            </div>
        </div>
    </div>
</template>