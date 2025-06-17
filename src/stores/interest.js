import { ref, reactive, watch } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';
import { useToast } from '@/servicess/toastService';

export const InterestStore = defineStore('interest', () => {
    const auth = AuthStore();
    const allInterest = ref([]);
    const interests = ref([]);
    const interest = ref({});
    const interestInputs = ref({
        name : '',
    });


    const isLoading = ref(false);
    const isSkeleton = ref(false);

    const searchInput = reactive({
        search : '',
        limit : 10,
    });

    const { showToast } = useToast();

    watch(()=> searchInput.search, () => {
        searchHobby();
    });


    const getInterset = async () => {
        interests.value = [];
        isLoading.value = true;
        let res = await axios.get(`https://datemeapi.codejet.dev/interests_hobby/interests`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            interests.value = res.data.data;
            allInterest.value = res.data.data;
        }

        isLoading.value = false;
    }


    const createInterest = async () => {
        interests.value = [];
        isLoading.value = true;
        try {
            let res = await axios.post(`https://datemeapi.codejet.dev/interests_hobby/interests`, interestInputs.value, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                showToast('Interest Created Successfully', 'success');
                HSOverlay.close('#create-interest');
                reset();
            }
        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        await getInterset();
        isLoading.value = false;
    }


    // const HobbyEdit = async (id) => {
    //     isSkeleton.value = true;

    //     HSOverlay.open('#edit-hobby');

    //     let res = await axios.get(`https://datemeapi.codejet.dev/hobby/package/${id}`, {
    //         headers: {
    //             'Authorization': `Bearer ${auth.token}`
    //         }
    //     });

    //     if(res.data.error == false){
    //         interestInputs.value.id = res.data.data.id;
    //         interestInputs.value.name = res.data.data.name;
    //     }

    //     isSkeleton.value = false;
    // }


    // const HobbyUpdate = async () => {
    //     interests.value = [];
    //     isLoading.value = true;

    //     try {
    //         let res = await axios.put(`https://datemeapi.codejet.dev/hobby/package/${interestInputs.value.id}`, interestInputs.value, {
    //             headers: {
    //                 'Authorization': `Bearer ${auth.token}`
    //             }
    //         });

    //         if(res.data.error == false){
    //             getInterset();
    //             showToast('hobby Updated Successfully', 'success');
    //             HSOverlay.close('#edit-hobby');
    //             reset();
    //         }

    //     } catch (error) {
    //         showToast(error.response.data.message, 'error');
    //         getInterset();
    //     }

    //     isLoading.value = false;
    // }


    const deleteInterset = async (id) => {
        interests.value = [];
        isLoading.value = true;
        try {
            let res = await axios.delete(`https://datemeapi.codejet.dev/interests_hobby/hobby/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
    
            if(res.data.error == false){
                showToast('Interest Deleted Successfully', 'success');
            }
        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        await getInterset();
        isLoading.value = false;
    }


    const searchHobby = () => {
        interests.value = allInterest.value.filter((institute) => {
            return institute.name.toLowerCase().includes(searchInput.search.toLowerCase()) || institute.city.toLowerCase().includes(searchInput.search.toLowerCase()) || institute.country.toLowerCase().includes(searchInput.search.toLowerCase());
        })
    }


    function reset (){
            interestInputs.value.name = '';
    }
    
    return {
        getInterset,
        searchInput,
        isLoading,
        isSkeleton,
        interests,
        interest,
        interestInputs,
        createInterest,
        // HobbyEdit,
        // HobbyUpdate,
        reset,
        deleteInterset
    }

});