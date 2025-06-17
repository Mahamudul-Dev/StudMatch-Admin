import { ref, reactive, watch } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';
import { useToast } from '@/servicess/toastService';

export const HobbyStore = defineStore('hobby', () => {
    const auth = AuthStore();
    const allHobby = ref([]);
    const hobbies = ref([]);
    const hobby = ref({});
    const hobbyInputs = ref({
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


    const getHobbies = async () => {
        hobbies.value = [];
        isLoading.value = true;
        let res = await axios.get(`https://datemeapi.codejet.dev/interests_hobby/hobby`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            hobbies.value = res.data.data;
            allHobby.value = res.data.data;
        }

        isLoading.value = false;
    }


    const createHobby = async () => {
        hobbies.value = [];
        isLoading.value = true;
        try {
            let res = await axios.post(`https://datemeapi.codejet.dev/interests_hobby/hobby`, hobbyInputs.value, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                showToast('hobby Created Successfully', 'success');
                HSOverlay.close('#create-hobby');
                reset();
            }
        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        await getHobbies();
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
    //         hobbyInputs.value.id = res.data.data.id;
    //         hobbyInputs.value.name = res.data.data.name;
    //     }

    //     isSkeleton.value = false;
    // }


    // const HobbyUpdate = async () => {
    //     hobbies.value = [];
    //     isLoading.value = true;

    //     try {
    //         let res = await axios.put(`https://datemeapi.codejet.dev/hobby/package/${hobbyInputs.value.id}`, hobbyInputs.value, {
    //             headers: {
    //                 'Authorization': `Bearer ${auth.token}`
    //             }
    //         });

    //         if(res.data.error == false){
    //             getHobbies();
    //             showToast('hobby Updated Successfully', 'success');
    //             HSOverlay.close('#edit-hobby');
    //             reset();
    //         }

    //     } catch (error) {
    //         showToast(error.response.data.message, 'error');
    //         getHobbies();
    //     }

    //     isLoading.value = false;
    // }


    const deleteHobby = async (id) => {
        hobbies.value = [];
        isLoading.value = true;
        try {
            let res = await axios.delete(`https://datemeapi.codejet.dev/interests_hobby/hobby/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
    
            if(res.data.error == false){
                showToast('hobby Deleted Successfully', 'success');
            }
        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        await getHobbies();
        isLoading.value = false;
    }


    const searchHobby = () => {
        hobbies.value = allHobby.value.filter((hobby) => {
            return hobby.name.toLowerCase().includes(searchInput.search.toLowerCase());
        })
    }


    function reset (){
            hobbyInputs.value.name = '';
    }
    
    return {
        getHobbies,
        searchInput,
        isLoading,
        isSkeleton,
        hobbies,
        hobby,
        hobbyInputs,
        createHobby,
        // HobbyEdit,
        // HobbyUpdate,
        reset,
        deleteHobby
    }

});