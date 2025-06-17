import { ref, reactive, watch } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';
import { useToast } from '@/servicess/toastService';

export const GradeStore = defineStore('grade', () => {
    const auth = AuthStore();
    const grades = ref([]);
    const allGrades = ref([]);

    const gradeForm = ref({
        gradeName : '',
    });

    const isLoading = ref(false);
    const isSkeleton = ref(false);

    const searchInput = reactive({
        search : '',
    });

    const { showToast } = useToast();

    watch(()=> searchInput.search, () => {
        searchGrade();
    });


    const getGrades = async () => {
        grades.value = [];
        isLoading.value = true;
        let res = await axios.get(`https://api.studmatch.app/institute/grade`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            grades.value = res.data.data;
            allGrades.value = res.data.data;
        }

        isLoading.value = false;
    }


    const createGrade = async () => {
        grades.value = [];
        isLoading.value = true;
        try {
            let res = await axios.post(`https://api.studmatch.app/institute/grade/`, gradeForm.value, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                showToast('Grade Created Successfully', 'success');
                HSOverlay.close('#create-grade');
                reset();
            }
        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        await getGrades();
        isLoading.value = false;
    }


    const GradeEdit = async (id) => {
        const editGrade = grades.value.find(grade => grade.id == id);
        gradeForm.value.gradeName = editGrade.name
        gradeForm.value.id = editGrade.id

        HSOverlay.open('#edit-grade');
    }


    const gradeUpdate = async () => {
        grades.value = [];
        isLoading.value = true;


        try {
            let res = await axios.put(`https://api.studmatch.app/institute/grade/${gradeForm.value.id}`, gradeForm.value, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                getGrades();
                showToast('Grade Updated Successfully', 'success');
                HSOverlay.close('#edit-grade');
                reset();
            }

        } catch (error) {
            showToast(error.response.data.message, 'error');
            getGrades();
        }

        isLoading.value = false;
    }


    const deletegrade = async (id) => {
        grades.value = [];
        isLoading.value = true;
        try {
            let res = await axios.delete(`https://api.studmatch.app/institute/grade/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
    
            if(res.data.error == false){
                showToast('Grade Deleted Successfully', 'success');
            }
        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        await getGrades();
        isLoading.value = false;
    }


    const searchGrade = () => {
        grades.value = allGrades.value.filter((grade) => {
            return grade.name.toLowerCase().includes(searchInput.search.toLowerCase());
        })
    }


    function reset (){
        gradeForm.value.gradeName = '';
    }
    
    return {
        getGrades,
        grades,
        searchInput,
        isLoading,
        isSkeleton,
        createGrade,
        gradeForm,
        reset,
        GradeEdit,
        gradeUpdate,
        deletegrade
    }

});