import { ref, reactive, watch } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';
import { useToast } from '@/servicess/toastService';

export const SubscriptionPromoStore = defineStore('subscription-promo', () => {
    const auth = AuthStore();
    const allPromo = ref([]);
    const subscriptions = ref([]);
    const promos = ref([]);
    const promo = ref({});
    const promoInputs = reactive({
        discountPercent : '',
        discountDuration : '',
        description : '',
        banner : '',
        packageId : ''
    });

    const isLoading = ref(false);
    const isSkeleton = ref(false);

    const searchInput = reactive({
        search : '',
        limit : 10,
    });

    const { showToast } = useToast();

    watch(()=> searchInput.search, () => {
        searchPromo();
    });

    const getPromos = async () => {
        promos.value = [];
        isLoading.value = true;
        let res = await axios.get(`https://api.studmatch.app/subscription/promo`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            console.log(res.data.data)
            promos.value = res.data.data;
            allPromo.value = res.data.data;
        }

        isLoading.value = false;
    }

    const getSubscriptions = async () => {
        subscriptions.value = [];
        let res = await axios.get(`https://api.studmatch.app/subscription/packages`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            subscriptions.value = res.data.data;
        }
    }


    const createPromo = async (bannerUrl) => {
        promos.value = [];
        isLoading.value = true;

        const formData = new FormData();

        for (const key in promoInputs) {
            if(key !== 'packageId'){
                formData.append(key, promoInputs[key]);
            }
        }

        try {
            let res = await axios.post(`https://api.studmatch.app/subscription/promo/${promoInputs.packageId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                getPromos();
                showToast('Promo Created Successfully', 'success');
                HSOverlay.close('#create-promo');
                reset();
                bannerUrl = "";
            }
        } catch (error) {
            showToast(error?.response.data?.message, 'error');
            getPromos();
        }

        isLoading.value = false;
    }


    const promoUpdate = async (promoEdit) => {

        promos.value = [];
        isLoading.value = true;

        const formData = new FormData();

        for (const key in promoEdit) {
            if(key !== 'id' && key !== 'bannerSrc' && key !== 'package' && key !== 'expireDate'){
                formData.append(key, promoEdit[key]);
            }
        }

        let res = await axios.put(`https://api.studmatch.app/subscription/promo/${promoEdit.id}`, formData, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            showToast('Promo Updated Successfully', 'success');
            HSOverlay.close('#edit-promo');
            reset();
            getPromos();
            getSubscriptions();
        }else{
            showToast(res.data.message, 'error');
            getPromos();
        }

        isLoading.value = false;
    }


    const promoDelete = async (id) => {

        let res = await axios.delete(`https://api.studmatch.app/subscription/promo/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            getPromos();
            showToast('Promo Deleted Successfully', 'success');

            getSubscriptions();
        }
    }


    const searchPromo = () => {
        promos.value = allPromo.value.filter((promo) => {
            return promo.package.name.toLowerCase().includes(searchInput.search.toLowerCase());
        })
    }


    function reset (){
        promoInputs.discountPercent = 0;
        promoInputs.discountDuration = 0;
        promoInputs.description = "";
        promoInputs.banner = "";
        promoInputs.packageId = "";

        console.log('reset done')
    }


    getSubscriptions();
    
    return {
        getPromos,
        searchInput,
        isLoading,
        isSkeleton,
        subscriptions,
        promos,
        promo,
        promoInputs,
        createPromo,
        promoUpdate,
        reset,
        getSubscriptions,
        promoDelete,
    }

});