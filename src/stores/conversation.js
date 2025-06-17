import { ref, reactive, watch } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';

export const ConversationStore = defineStore('conversation', () => {
    const auth = AuthStore();
    const userAllConversation = ref([]);
    const userConversations = ref({});
    const isLoading = ref(false);
    const isSkeleton = ref(false);

    const searchInput = reactive({
        search : '',
        limit : 10,
    });

    watch(()=> searchInput.search, () => {
        searchInstitute();
    });


    const getConversation = async (id) => {
        userConversations.value = [];
        isSkeleton.value = true;

        let res = await axios.get(`https://datemeapi.codejet.dev/conversations/?userId=${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            console.log(res.data);
            userConversations.value = res.data.data;
            userAllConversation.value = res.data.data;
        }

        isLoading.value = false;
    }


    const viewConversation = async (id) => {
        isSkeleton.value = true;
        // HSOverlay.open('#show-institute');

        let res = await axios.get(`https://datemeapi.codejet.dev/conversations/1`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            conversation.value = res.data.data;
            console.log(res.data.data);
        }

        isSkeleton.value = false;
    }


    const searchInstitute = () => {
        // userConversations.value = userAllConversation.value.filter((institute) => {
        //     return institute.name.toLowerCase().includes(searchInput.search.toLowerCase()) || institute.city.toLowerCase().includes(searchInput.search.toLowerCase()) || institute.country.toLowerCase().includes(searchInput.search.toLowerCase());
        // })
    }

    
    return {
        getConversation,
        userConversations,
        userAllConversation,
        searchInput,
        isSkeleton,
        viewConversation,
        isLoading
    }

});