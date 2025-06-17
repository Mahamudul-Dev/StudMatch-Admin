<script setup>
    import ProfileEditSkeleton from '@/components/UserManagement/ProfileEditSkeleton.vue';
    import { UserStore } from '@/stores/user';
    import {InstituteStore} from '@/stores/institute';
    import { computed, onMounted, reactive, ref, watch } from 'vue'; 
    const userStore = UserStore();
    const instituteStore = InstituteStore();

    import Multiselect from 'vue-multiselect'
    import 'vue-multiselect/dist/vue-multiselect.min.css'

    const allInterest = computed({
        get(){
            return userStore.editUser.interests ? userStore.editUser.interests.join(',') : ''
        },

        set(value){
            userStore.editUser.interests = value.split(',').map(v => v.trim());
        }
    })


    const allHobbies = computed({
        get(){
            return userStore.editUser.hobbies ? userStore.editUser.hobbies.join(',') : ''
        },

        set(value){
            userStore.editUser.hobbies = value.split(',').map(v => v.trim());
        }
    })


    const formattedDob = computed({
        get() {
            // Convert ISO string to YYYY-MM-DD format for <input type="date">
            return userStore.editUser.dateOfBirth ? new Date(userStore.editUser.dateOfBirth).toISOString().split('T')[0] : '';
        },
        set(value) {
            // Set the date in ISO format (1990-05-01T00:00:00.000Z)
            userStore.editUser.dateOfBirth = new Date(value).toISOString();
        }
    });



    const allGenders = reactive([
    {
            name : 'Male',
            value : 'Male'
        },
        {
            name : 'FEMALE',
            value : 'FEMALE'
        },
        {
            name : 'WOMEN',
            value : 'WOMEN'
        },
        {
            name : 'MEN',
            value : 'MEN'
        },
        {
            name : 'TRANS',
            value : 'TRANS'
        },
        {
            name : 'BISEXUAL',
            value : 'BISEXUAL'
        },
        {
            name : 'OTHER',
            value : 'OTHER'
        },
        {
            name : 'PREFER NOT TO SAY',
            value : 'PREFER_NOT_TO_SAY'
        }
    ])


    const profilePhotoUrl = ref('');
    const coverUrl = ref('');

    watch(()=> userStore.editUser.profilePhotoSrc, () => {
        profilePhotoUrl.value = userStore.editUser.profilePhotoSrc
        coverUrl.value = userStore.editUser.coverSrc
    })

    function profilePhotoInput(event){
        const file = event.target.files[0];
        userStore.editUser.profilePhoto = file;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePhotoUrl.value = (e.target.result);
            };
            reader.readAsDataURL(file);
        } 
    }
    
    function coverInput(event){
        const file = event.target.files[0];
        userStore.editUser.coverPhoto = file;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                coverUrl.value = (e.target.result);
            };
            reader.readAsDataURL(file);
        } 
    }



    onMounted(() => {
        instituteStore.getInstitute()
        instituteStore.getDepartments()
        instituteStore.getGrades()
    })

</script>

<template>
    <div id="edit-profile" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="edit-profile-label">
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
            <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <h3 id="edit-profile-label" class="font-semibold text-[#3eaf7c]">
                    Update Profile
                    </h3>
                    <button type="button" @click = "userStore.reset()" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#edit-profile">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto w-full">
                    <form v-if="!userStore.isSkeleton" class="w-full" @submit.prevent="userStore.updateProfile">

                        <!-- {{ userStore.editUser.instituteId }} -->

                        <div class="w-full md:flex gap-4 space-y-2 md:space-y-0">
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Full Name</label>
                                <input type="text" v-model="userStore.editUser.fullName" placeholder="Enter Full Name" class="input py-2.5 input-bordered w-full" />
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Gender Visibility</label>
                                <select class="input py-2.5 input-bordered w-full" v-model="userStore.editUser.genderVisibility">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Interested Gender</label>
                                <Multiselect 
                                    class="border border-gray-300 rounded-lg" 
                                    v-model="userStore.editUser.interestedGender" 
                                    :close-on-select="false" 
                                    :clear-on-select="false"
                                    :taggable="true" 
                                    placeholder="Select Interests"
                                    :options="allGenders.map(v => v.name)" 
                                    :multiple="true"
                                >
                                    <template #selection="{ values, search, isOpen }">
                                    <span class="multiselect__single" v-if="values.length" v-show="!isOpen">
                                        {{ values.map(v => v).join(', ') }}
                                    </span>
                                    </template>
                                </Multiselect>
                            </div>
                        </div>

                        <div class="w-full md:flex gap-4 space-y-2 md:space-y-0">
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">DOB</label>
                                <input type="date" v-model="formattedDob" placeholder="Date of birth" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Interests</label>
                                <Multiselect 
                                    class="border border-gray-300 rounded-lg" 
                                    v-model="userStore.editUser.interests" 
                                    :close-on-select="false" 
                                    :clear-on-select="false"
                                    :taggable="true" 
                                    placeholder="Select Interests"
                                    :options="userStore.interests.map(v => v.name)" 
                                    :multiple="true"
                                >
                                    <template #selection="{ values, search, isOpen }">
                                    <span class="multiselect__single" v-if="values.length" v-show="!isOpen">
                                        {{ values.map(v => v).join(', ') }}
                                    </span>
                                    </template>
                                </Multiselect>
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Hobies</label>
                                <Multiselect 
                                    class="border border-gray-300 rounded-lg" 
                                    v-model="userStore.editUser.hobbies" 
                                    :close-on-select="false" 
                                    :clear-on-select="false"
                                    :taggable="true" 
                                    placeholder="Select Interests"
                                    :options="userStore.hobbies.map(v => v.name)" 
                                    :multiple="true"
                                >
                                    <template #selection="{ values, search, isOpen }">
                                    <span class="multiselect__single" v-if="values.length" v-show="!isOpen">
                                        {{ values.map(v => v).join(', ') }}
                                    </span>
                                    </template>
                                </Multiselect>
                            </div>
                        </div>

                        <div class="w-full md:flex gap-4 mt-3 space-y-2 md:space-y-0">
                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Institute</label>
                                <select class="input py-2.5 input-bordered w-full" v-model="userStore.editUser.instituteId">
                                    <option hidden disabled value="">SelectOnce</option>
                                    <option v-for="(institute, index) in instituteStore.institutes" :key="index" :value="institute.id" >{{ institute.name }}</option>
                                </select>
                            </div>

                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Department</label>
                                <select class="input py-2.5 input-bordered w-full" v-model="userStore.editUser.instituteDepartment">
                                    <option hidden disabled value="">SelectOnce</option>
                                    <option v-for="(department, index) in instituteStore.departments" :key="index" :value="department.name" >{{ department.name }}</option>
                                </select>
                            </div>

                            <div class="form-control w-full md:w-4/12">
                                <label class="label">Grade</label>
                                <select class="input py-2.5 input-bordered w-full" v-model="userStore.editUser.grade">
                                    <option hidden disabled value="">SelectOnce</option>
                                    <option v-for="(grade, index) in instituteStore.grades" :key="index" :value="grade.name" >{{ grade.name }}</option>
                                </select>
                            </div>

                        </div>

                        <div class="w-full md:flex my-3 gap-4 space-y-2 md:space-y-0">
                            <div class="form-control w-full md:w-4/12">
                                    <label class="label">Profile Photo</label>
                                    <label for="logo-input" class="sr-only">Choose file</label>
                                    <input @change="profilePhotoInput" type="file" id="logo-input" class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                    file:bg-blue-600 file:border-0
                                    file:text-gray-50
                                    file:me-4
                                    file:py-3 file:px-4
                                    dark:file:bg-neutral-700 dark:file:text-neutral-400">
                                </div>

                                <div class="form-control w-full md:w-4/12 md:hidden">
                                    <div class="w-[60px] h-[60px] p-1" v-if="profilePhotoUrl">
                                        <img class="w-full h-full rounded-full ring ring-[#3eaf7c]" :src="profilePhotoUrl" alt="">
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

                            <div class="w-full md:w-4/12"></div>
                        </div>

                        <div class="w-full hidden md:flex gap-4 pt-2 space-y-2 md:space-y-0">
                            
                            <div class="form-control w-full md:w-4/12">
                                <div class="w-[60px] h-[60px] p-1" v-if="profilePhotoUrl">
                                    <img class="w-full h-full rounded-full ring ring-[#3eaf7c]" :src="profilePhotoUrl" alt="">
                                </div>
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                <div class="w-[60px] h-[60px] p-1" v-if="coverUrl">
                                    <img class="w-full h-full rounded-full ring ring-[#3eaf7c]" :src="coverUrl" alt="">
                                </div>
                            </div>
                            <div class="form-control w-full md:w-4/12">
                                
                            </div>
                        </div>

                        <div class="w-full">
                            <div class="form-control w-full">
                                <label class="label">Bio</label>
                                <textarea v-model="userStore.editUser.bio" class="input input-bordered placeholder:text-gray-600 placeholder:text-[16px]" cols="30" rows="8" placeholder="Enter User Bio"></textarea>
                            </div>
                        </div>

                        <div class="w-full mt-5">
                            <button type="submit" :disabled="userStore.isLoading" class="px-3 py-2 bg-[#3eaf7c] hover:bg-[#247752] text-white rounded-md disabled:cursor-wait disabled:opacity-[0.7]">Update</button>
                        </div>
                    </form>

                    <ProfileEditSkeleton v-else />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>