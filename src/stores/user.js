import { ref, reactive, watch, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';
import { useToast } from '@/servicess/toastService';


export const UserStore = defineStore('user', () => {
    const auth = AuthStore();
    const allUsers = ref([]);
    const users = ref([]);
    const user = ref({});
    const editUser = ref({
        dateOfBirth : '',
        interests : [],
        hobbies : [],
        bio : '',
        verificationStatus : '',
        accountStatus  : '',
        reassone : '',

        instituteId : '',
        fullName : '',
        genderVisibility : '',
        interestedGender : [],
        coverPhoto : '',
        profilePhoto : '',
        instituteDepartment : '',
        grade : '',

    });
    
    const totalPages = ref(0);
    const currentPage = ref(1);

    const hobbies = ref([]);
    const interests = ref([]);

    const userAllConversation = ref([]);
    const userConversations = ref([]);
    const allMessages = ref([]);

    const isLoading = ref(false);
    const isSkeleton = ref(false);

    const searchInput = reactive({
        search : '',
        limit : 10,
    });


    const filters = reactive({
        gender : null,
        instituteId : null,
        instituteType : null,
        accountStatus : null,
        verificationStatus : null,
        likes : null,
        matches : null,
        likeFilter : null,
        matchFilter : null,
    });

    const { showToast } = useToast();

    watch(()=> searchInput.limit, () => {
        getUsers();
    });

    watch(()=> searchInput.search, () => {
        searchByName();
    });

    watch(filters, () => {
        getFilteredUsers();
    });


    const getUsers = async (page = 1) => {
        users.value = [];
        isLoading.value = true;
        let res = await axios.get(`https://api.studmatch.app/user/?page=${page}&limit=${searchInput.limit}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){;
            const userPromises  = res.data.data.users.map( async (user) => {
                const imageUrl = user.profile.profilePicture ? await auth.authorizeImage(user.profile.profilePicture) : '';
                return {
                    ...user,
                    profile : {
                        ...user.profile,
                        imageUrl : imageUrl
                    }
                }
            });

            users.value = await Promise.all(userPromises);
            allUsers.value = await Promise.all(userPromises);
            totalPages.value = res.data.data.totalPages;
            currentPage.value = res.data.data.currentPage;

        }

        isLoading.value = false;

    }


    const editProfile = async (id) => {
        reset()
        isSkeleton.value = true;
        user.value = {};
        HSOverlay.open('#edit-profile');

        let res = await axios.get(`https://api.studmatch.app/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            editUser.value.id = res.data.data.id;
            editUser.value.dateOfBirth = res.data.data.profile.dateOfBirth;
            editUser.value.interests = res.data.data.profile.interests;
            editUser.value.hobbies = res.data.data.profile.hobbies;
            editUser.value.bio = res.data.data.profile.bio;

            editUser.value.fullName = res.data.data.profile.fullName;
            editUser.value.genderVisibility = res.data.data.profile.genderVisibility;
            editUser.value.interestedGender = res.data.data.profile.interestedGender;
            editUser.value.instituteDepartment = res.data.data.profile.instituteDepertment;
            editUser.value.grade = res.data.data.profile.grade;
            editUser.value.instituteId = res.data.data.profile.institute?.id;

            editUser.value.profilePhotoSrc = res.data.data.profile.profilePicture;
            editUser.value.coverSrc = res.data.data.profile.coverPhoto;
            
            await getHobbies();
            await getInterests();
        }

        isSkeleton.value = false;
    }



    const updateProfile = async () => {
        try {
            isLoading.value = true;
        let res = await axios.put(`https://api.studmatch.app/user`, editUser.value, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });


        if(res.data.error == false){
            getUsers();
            HSOverlay.close('#edit-profile');
            showToast('Profile Updated', 'success', 'Profile');
        }

        } catch (error) {
            showToast(error.response.data.message, 'error', 'Profile');
        }

        isLoading.value = false;
    }


    const getConversation = async (id) => {
        
        userConversations.value = [];
        allMessages.value = [''];

        HSOverlay.open('#show-conversation');

        let res = await axios.get(`https://api.studmatch.app/conversations/?userId=${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            userConversations.value = res.data.data;
            userAllConversation.value = res.data.data;
        }
    }

    // getALlConversationThisUser

    const getAllMessagesToAUser = async (id) => {
        allMessages.value = [''];
        isSkeleton.value = true;

        let res = await axios.get(`https://api.studmatch.app/conversations/${id}?page=1&limit=5&id=${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            allMessages.value = res.data.data;
        }

        isSkeleton.value = false;
    }


    const getHobbies = async () => {
        let res = await axios.get(`https://api.studmatch.app/interests_hobby/hobby`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            hobbies.value = res.data.data;
        }
    }


    const getInterests = async () => {
        let res = await axios.get(`https://api.studmatch.app/interests_hobby/interests`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            interests.value = res.data.data;
        }
    }


    // filter
    const getFilteredUsers = async (page = 1) => {
        users.value = [];
        isLoading.value = true;
        let res = await axios.post(`https://api.studmatch.app/user/filter?page=${page}&limit=${searchInput.limit}`, filters, {
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json'
            }
        });

        if(res.data.error == false){
            const userPromises  = res.data.data.users.map( async (user) => {
                const imageUrl = user.profile.profilePicture ? await auth.authorizeImage(user.profile.profilePicture) : '';
                return {
                    ...user,
                    profile : {
                        ...user.profile,
                        imageUrl : imageUrl
                    }
                }
            });

            users.value = await Promise.all(userPromises);
            allUsers.value = await Promise.all(userPromises);
            totalPages.value = res.data.data.totalPages;
            currentPage.value = res.data.data.currentPage;
        }

        isLoading.value = false;
    }


    const searchByName = () => {
        users.value = allUsers.value.filter((user) => {
            return user.profile.fullName.toLowerCase().includes(searchInput.search.toLowerCase()) || user.email.toLowerCase().includes(searchInput.search.toLowerCase()) || user.phone.toLowerCase().includes(searchInput.search.toLowerCase()) || user.profile.city.toLowerCase().includes(searchInput.search.toLowerCase());
        })
    }


    const resetSearch = () => {
        if(searchInput.search != '' || searchInput.limit != 10 || searchInput.accountStatus  != '' || searchInput.verificationStatus   != '' || filters.gender != '' || filters.instituteId != '' || filters.instituteType != '' || filters.likes != '' || filters.matches != '' || filters.likeFilter != 'desc' || filters.matchFilter != 'desc'){
            allUsers.value = [];
            users.value = [];
            getUsers();
            searchInput.search = null;
            searchInput.limit = 10;
            searchInput.accountStatus = null;
            searchInput.verificationStatus = null;
            filters.gender = null;
            filters.instituteId = null;
            filters.instituteType = null;
            filters.likes = null;
            filters.matches = null;
            filters.likeFilter = '';
            filters.matchFilter = '';
        }
    }


    const viewProfile = async (id) => {

        isSkeleton.value = true;
        user.value = {};
        HSOverlay.open('#show-profile');

        let res = await axios.get(`https://api.studmatch.app/user/${id}?gallery=true`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });


        if(res.data.error == false){
            user.value = res.data.data;
        }

        isSkeleton.value = false;
    }



    const verifyDocument = async (id) => {
        isSkeleton.value = true;
        editUser.value = {};
        HSOverlay.open('#document-verify');

        let res = await axios.get(`https://api.studmatch.app/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });


        if(res.data.error == false){
            editUser.value.id = res.data.data.id;
            editUser.value.userVerifications = res.data.data.userVerifications ?? [];
            editUser.value.verificationStatus = res.data.data.verificationStatus;
        }

        isSkeleton.value = false;
    }


    const editVerificationStatus = async (id) => {
        isSkeleton.value = true;
        editUser.value = {};
        HSOverlay.open('#verification-status-update');


        let res = await axios.get(`https://api.studmatch.app/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            editUser.value.id = res.data.data.id;
            editUser.value.verificationStatus = res.data.data.verificationStatus;
            
        }

        isSkeleton.value = false;
    }

    const updateVerificationStatus = async () => {
        users.value = [];
        isLoading.value = true;
        let res = await axios.put(`https://api.studmatch.app/user/verificationStatus/${editUser.value.id}`, {value: editUser.value.verificationStatus}, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            showToast('Verification Status Updated', 'success', 'Status');
            HSOverlay.close('#verification-status-update');
            HSOverlay.close('#document-verify');
        }

        isLoading.value = false;

        await getUsers();
    }


    const editAccountStatus = async (id) => {
        isSkeleton.value = true;
        editUser.value = {};
        HSOverlay.open('#account-status-update');


        let res = await axios.get(`https://api.studmatch.app/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            editUser.value.id = res.data.data.id;
            editUser.value.accountStatus = res.data.data.accountStatus;
        }

        isSkeleton.value = false;
    }


    const updateAccountStatus = async () => {
        users.value = [];
        isLoading.value = true;
        let res = await axios.put(`https://api.studmatch.app/user/accountStatus/${editUser.value.id}`, 
            {
                value: editUser.value.accountStatus, 
                ressone : editUser.value.reassone
            }, 
            {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            showToast('Account Status Updated', 'success', 'Status');
            HSOverlay.close('#account-status-update');
        }

        isLoading.value = false;

        await getUsers();
    }


    function reset(){
        editUser.value = {};
    }

    
    return {
        users,
        getUsers,
        searchInput,
        totalPages,
        currentPage,
        viewProfile,
        user,
        isLoading,
        isSkeleton,
        resetSearch,
        editProfile,
        editUser,
        updateProfile,
        hobbies,
        interests,
        editVerificationStatus,
        updateVerificationStatus,
        editAccountStatus,
        updateAccountStatus,
        getConversation,
        userConversations,
        getAllMessagesToAUser,
        allMessages,
        filters,
        reset,
        verifyDocument
    }

});