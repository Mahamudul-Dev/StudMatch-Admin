import { ref, reactive, watch } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';
import { useToast } from '@/servicess/toastService';

export const SubscriptionStore = defineStore('subscription', () => {
    const auth = AuthStore();
    const allSubscription = ref([]);
    const subscriptions = ref([]);
    const subscription = ref({});
    const subscriptionInputs = ref({
        name : '',
        likeLimit : '',
        superLikeLimit : '',
        likeLimitRefrashDuration : '',
        superLikeLimitRefrashDuration : '',
        discoverProfileLimit : '',
        discoverLimitRefrashDuration : '',
        mostwantedProfileLimit : '',
        verificationBadgeMood : '',
        customChatBackground : true,
        rankExploreLimit : '',
        price : '',
        paymentCycle : ''
    });

    const isLoading = ref(false);
    const isSkeleton = ref(false);

    const searchInput = reactive({
        search : '',
        limit : 10,
    });

    const { showToast } = useToast();

    watch(()=> searchInput.search, () => {
        searchSubscription();
    });

    const getSubscription = async () => {
        subscriptions.value = [];
        isLoading.value = true;
        let res = await axios.get(`https://datemeapi.codejet.dev/subscription/packages`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            subscriptions.value = res.data.data;
            allSubscription.value = res.data.data;
        }

        isLoading.value = false;
    }


    const createSubscription = async () => {
        subscriptions.value = [];
        isLoading.value = true;

        try {
            let res = await axios.post(`https://datemeapi.codejet.dev/subscription/package/create`, subscriptionInputs.value, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                getSubscription();
                showToast('Subscription Created Successfully', 'success');
                HSOverlay.close('#create-subscription');
                reset();
            }
        } catch (error) {
            showToast(error.response.data.message, 'error');
            getSubscription();
        }

        isLoading.value = false;
    }


    const viewSubscription = async (id) => {
        isSkeleton.value = true;
        HSOverlay.open('#show-institute');

        let res = await axios.get(`https://datemeapi.codejet.dev/institute/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            subscription.value = res.data.data;
            console.log(res.data.data);
        }

        isSkeleton.value = false;
    }


    const SubscriptionEdit = async (id) => {
        isSkeleton.value = true;

        HSOverlay.open('#edit-subscription');

        let res = await axios.get(`https://datemeapi.codejet.dev/subscription/package/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            subscriptionInputs.value.id = res.data.data.id;
            subscriptionInputs.value.name = res.data.data.name;
            subscriptionInputs.value.likeLimit = res.data.data.likeLimit;
            subscriptionInputs.value.superLikeLimit = res.data.data.superLikeLimit;
            subscriptionInputs.value.likeLimitRefrashDuration = res.data.data.likeLimitRefrashDuration;
            subscriptionInputs.value.superLikeLimitRefrashDuration = res.data.data.superLikeLimitRefrashDuration;
            subscriptionInputs.value.discoverProfileLimit = res.data.data.discoverProfileLimit;
            subscriptionInputs.value.discoverLimitRefrashDuration = res.data.data.discoverLimitRefrashDuration;
            subscriptionInputs.value.mostwantedProfileLimit = res.data.data.mostwantedProfileLimit;
            subscriptionInputs.value.verificationBadgeMood = res.data.data.verificationBadgeMood;
            subscriptionInputs.value.customChatBackground = res.data.data.customChatBackground;
            subscriptionInputs.value.rankExploreLimit = res.data.data.rankExploreLimit;
            subscriptionInputs.value.paymentCycle = res.data.data.paymentCycle;
            subscriptionInputs.value.price = res.data.data.price;
        }

        isSkeleton.value = false;
    }


    const SubscriptionUpdate = async () => {
        subscriptions.value = [];
        isLoading.value = true;

        try {
            let res = await axios.put(`https://datemeapi.codejet.dev/subscription/package/${subscriptionInputs.value.id}`, subscriptionInputs.value, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                getSubscription();
                showToast('Subscription Updated Successfully', 'success');
                HSOverlay.close('#edit-subscription');
                reset();
            }

        } catch (error) {
            showToast(error.response.data.message, 'error');
            getSubscription();
        }

        isLoading.value = false;
    }


    const searchSubscription = () => {
        subscriptions.value = allSubscription.value.filter((institute) => {
            return institute.name.toLowerCase().includes(searchInput.search.toLowerCase()) || institute.city.toLowerCase().includes(searchInput.search.toLowerCase()) || institute.country.toLowerCase().includes(searchInput.search.toLowerCase());
        })
    }


    function reset (){
            subscriptionInputs.value.name = '';
            subscriptionInputs.value.likeLimit = '';
            subscriptionInputs.value.superLikeLimit = '';
            subscriptionInputs.value.likeLimitRefrashDuration = '';
            subscriptionInputs.value.superLikeLimitRefrashDuration = '';
            subscriptionInputs.value.discoverProfileLimit = '';
            subscriptionInputs.value.discoverLimitRefrashDuration = '';
            subscriptionInputs.value.mostwantedProfileLimit = '';
            subscriptionInputs.value.verificationBadgeMood = '';
            subscriptionInputs.value.customChatBackground = true;
            subscriptionInputs.value.rankExploreLimit = '';
    }
    
    return {
        getSubscription,
        searchInput,
        isLoading,
        isSkeleton,
        subscriptions,
        subscription,
        subscriptionInputs,
        createSubscription,
        SubscriptionEdit,
        SubscriptionUpdate,
        viewSubscription,
        reset
    }

});