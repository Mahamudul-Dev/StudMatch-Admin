import { ref, reactive, watch, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';
import { useToast } from '@/servicess/toastService';

export const AdminStore = defineStore('admin', () => {
    const auth = AuthStore();
    const allAdmin = ref([]);
    const admins = ref([]);
    const admin = ref({});

    const adminForm = ref({
        name : '',
        email : '',
        phone : '',
        city : '',
        country : '',
        password : '',
        role : 'REGULAR_ADMIN'
    });
    
    const totalPages = ref(0);
    const currentPage = ref(1);

    const isLoading = ref(false);
    const isSkeleton = ref(false);

    const searchInput = reactive({
        search : '',
    });

    const { showToast } = useToast();

    watch(()=> searchInput.search, () => {
        searchByName();
    });

    const searchByName = () => {
        admins.value = allAdmin.value.filter((admin) => {
            return admin.name.toLowerCase().includes(searchInput.search.toLowerCase()) || admin.email.toLowerCase().includes(searchInput.search.toLowerCase()) || admin.phone.toLowerCase().includes(searchInput.search.toLowerCase()) || admin.city.toLowerCase().includes(searchInput.search.toLowerCase());
        })
    }


    const getAdmins = async () => {
        admins.value = [];
        isLoading.value = true;

        let res = await axios.get(`https://api.studmatch.app/admin/`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            admins.value = res.data.data;
            allAdmin.value = res.data.data;
            console.log(res.data.data)
        }

        isLoading.value = false;
    }


    const store = async () => {
        admins.value = [];
        isLoading.value = true;

        try {
            let res = await axios.post(`https://api.studmatch.app/admin/`, adminForm.value, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                showToast('Admin Created Successfully', 'success');
                HSOverlay.close('#create-admin');
                // reset();
            }
        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        await getAdmins();
        isLoading.value = false;
    }


    const edit = async (id) => {
        isSkeleton.value = true;

        HSOverlay.open('#edit-admin');

        let res = await axios.get(`https://api.studmatch.app/admin/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            adminForm.value.id = res.data.data.id;
            adminForm.value.name = res.data.data.name;
            adminForm.value.email = res.data.data.email;
            adminForm.value.phone = res.data.data.phone;
            adminForm.value.country = res.data.data.country;
            adminForm.value.city = res.data.data.city;
            adminForm.value.role = res.data.data.role;
        }

        isSkeleton.value = false;
    }


    const update = async () => {
        admins.value = [];
        isLoading.value = true;
        
        let res = await axios.put(`https://api.studmatch.app/admin/${adminForm.value.id}`, adminForm.value, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            HSOverlay.close('#edit-admin');
            showToast('Admin Updated', 'success', 'Assistant');
            await getAdmins();
        }

        isLoading.value = false;
    }

    const deleteAdmin = async (id) => {
        isLoading.value = true;
        admins.value = [];

        let res = await axios.delete(`https://api.studmatch.app/admin/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            showToast('Admin Deleted', 'success', 'Assistant');
            await getAdmins();
        }
        isLoading.value = false;
    }


    function reset(){
        adminForm.value.id = '';
        adminForm.value.name = '';
        adminForm.value.email = '';
        adminForm.value.phone = '';
        adminForm.value.country = '';
        adminForm.value.city = '';
    }

    
    return {
        admins,
        getAdmins,
        searchInput,
        totalPages,
        currentPage,
        isLoading,
        isSkeleton,
        store,
        edit,
        update,
        reset,
        adminForm,
        deleteAdmin,
    }

});