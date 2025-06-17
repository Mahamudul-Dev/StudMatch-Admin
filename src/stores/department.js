import { ref, reactive, watch } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';
import { useToast } from '@/servicess/toastService';

export const DepartmentStore = defineStore('department', () => {
    const auth = AuthStore();
    const departments = ref([]);

    const departmentForm = ref({
        depertmentName : '',
    });


    const isLoading = ref(false);
    const isSkeleton = ref(false);

    const searchInput = reactive({
        search : '',
    });

    const { showToast } = useToast();

    watch(()=> searchInput.search, () => {
        searchHobby();
    });


    const getDepartments = async () => {
        departments.value = [];
        isLoading.value = true;
        let res = await axios.get(`https://api.studmatch.app/institute/depertment`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            departments.value = res.data.data;
        }

        isLoading.value = false;
    }


    const createDepartment = async () => {
        departments.value = [];
        isLoading.value = true;
        try {
            let res = await axios.post(`https://api.studmatch.app/institute/depertment/`, departmentForm.value, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                showToast('Department Created Successfully', 'success');
                HSOverlay.close('#create-department');
                reset();
            }
        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        await getDepartments();
        isLoading.value = false;
    }


    const DepartmentEdit = async (id) => {
        const editDepartment = departments.value.find(department => department.id == id);

        departmentForm.value.depertmentName = editDepartment.name
        departmentForm.value.id = editDepartment.id

        HSOverlay.open('#edit-department');
    }


    const DepartmentUpdate = async () => {
        departments.value = [];
        isLoading.value = true;


        try {
            let res = await axios.put(`https://api.studmatch.app/institute/depertment/${departmentForm.value.id}`, departmentForm.value, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                getDepartments();
                showToast('Department Updated Successfully', 'success');
                HSOverlay.close('#edit-department');
                reset();
            }

        } catch (error) {
            showToast(error.response.data.message, 'error');
            getDepartments();
        }

        isLoading.value = false;
    }


    const deleteDepartment = async (id) => {
        departments.value = [];
        isLoading.value = true;
        try {
            let res = await axios.delete(`https://api.studmatch.app/institute/depertment/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
    
            if(res.data.error == false){
                showToast('Department Deleted Successfully', 'success');
            }
        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        await getDepartments();
        isLoading.value = false;
    }


    const searchHobby = () => {
        hobbies.value = allHobby.value.filter((hobby) => {
            return hobby.name.toLowerCase().includes(searchInput.search.toLowerCase());
        })
    }


    function reset (){
        departmentForm.value.depertmentName = '';
    }
    
    return {
        getDepartments,
        departments,
        searchInput,
        isLoading,
        isSkeleton,
        createDepartment,
        departmentForm,
        reset,
        DepartmentEdit,
        DepartmentUpdate,
        deleteDepartment
    }

});