import { ref, reactive, watch, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';
import { useToast } from '@/servicess/toastService';

export const InstituteStore = defineStore('institute', () => {
    const auth = AuthStore();
    const allInstitutes = ref([]);
    const institutes = ref([]);
    const instituteInputs = ref({
        logo : '',
        cover : '',
        name : '',
        city : '',
        country : '',
        type : 'UNIVERSITY',
        description : '',
        depertmentIds : [''],
        gradeIds : ['']
    });


    const departments = ref(['']);
    const grades = ref(['']);

    const galleryInputs = ref({
        gallery : [],
        description : '',
        authorId : '',
    });

    const instituteView = ref({});

    const isLoading = ref(false);
    const isSkeleton = ref(false);

    const searchInput = reactive({
        search : '',
        limit : 10,
    });

    const { showToast } = useToast();


    watch(()=> searchInput.search, () => {
        searchInstitute();
    });

    // watch(()=> instituteInputs.value.country, () => {
    //     instituteInputs.value.city = '';
    // });

    const getInstitute = async () => {
        institutes.value = [];
        isLoading.value = true;

        let res = await axios.get(`https://api.studmatch.app/institute`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            const institutePromises  = res.data.data.map( async (institute) => {
                const logoSrc = institute.logo ? await auth.authorizeImage(institute.logo) : '';
                const coverSrc = institute.coverPhoto ? await auth.authorizeImage(institute.coverPhoto) : '';
                return {
                    ...institute,
                    logoSrc : logoSrc,
                    coverSrc : coverSrc
                }
            });

            institutes.value = res.data.data;
            allInstitutes.value = res.data.data;
        }

        isLoading.value = false;

    }


    const getDepartments = async () => {
        let res = await axios.get(`https://api.studmatch.app/institute/depertment`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });


        if(res.data.error == false){
            departments.value = res.data.data
        }
        
    }


    const getGrades = async () => {
        let res = await axios.get(`https://api.studmatch.app/institute/grade`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            grades.value = res.data.data
        }
    }


    const createInstitute = async () => {
        isLoading.value = true;
        try {
            const formData = new FormData();

            for (const key in instituteInputs.value) {
                formData.append(key, instituteInputs.value[key]);
            }

            let res = await axios.post(`https://api.studmatch.app/institute`, formData, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Host' : ''
                }
            });

            if(res.data.error == false){
                await getInstitute();
                showToast('Institute Created Successfully', 'success');
                HSOverlay.close('#create-institute');
            }

        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        isLoading.value = false;
    }


    const viewInstitute = async (id) => {
        isSkeleton.value = true;
        HSOverlay.open('#show-institute');

        let res = await axios.get(`https://api.studmatch.app/institute/${id}?gallery=true`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            instituteView.value = res.data.data;
        }

        isSkeleton.value = false;
    }


    const instituteEdit = async (id) => {
        reset();
        isSkeleton.value = true;
        HSOverlay.open('#edit-institute');

        let res = await axios.get(`https://api.studmatch.app/institute/${id}`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            instituteInputs.value.id = res.data.data.id;
            instituteInputs.value.name = res.data.data.name;
            instituteInputs.value.city = res.data.data.city;
            instituteInputs.value.country = res.data.data.country;
            instituteInputs.value.type = res.data.data.type;
            instituteInputs.value.coverSrc = res.data.data.coverPhoto;
            instituteInputs.value.logoSrc = res.data.data.logo;
            instituteInputs.value.description = res.data.data.description;
            instituteInputs.value.depertmentIds = res.data.data.depertmens;
            instituteInputs.value.grades = res.data.data.grades;
            instituteInputs.value.rank = res.data.data.rank;
        }

        isSkeleton.value = false;
    }


    const instituteUpdate = async () => {
        isLoading.value = true;

        try {
            const formData = new FormData();

            for (const key in instituteInputs.value) {
                formData.append(key, instituteInputs.value[key]);
            }

            let res = await axios.put(`https://api.studmatch.app/institute/${instituteInputs.value.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                getInstitute();
                showToast('Institute Updated Successfully', 'success');
                HSOverlay.close('#edit-institute');
            }

        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        isLoading.value = false;

    }


    const openGalleryModal = (id) => {
        galleryInputs.value.authorId = id;
        HSOverlay.open('#upload-institute-gallery');
    }

    const uploadGallery = async () => {
        isLoading.value = true;

        const formData = new FormData();

        for (let index = 0; index < galleryInputs.value.gallery.length; index++) {
            formData.append('gallery', galleryInputs.value.gallery[index]);
        }

        formData.append('description', galleryInputs.value.description);
        formData.append('authorId', galleryInputs.value.authorId);

        try {
            let res = await axios.post(`https://api.studmatch.app/gallery/institute`, formData, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });


            if(res.data.error == false){
                showToast('Gallery Uploaded Successfully', 'success');
                HSOverlay.close('#upload-institute-gallery');
                reset()
            }

        } catch (error) {
            showToast(error.response.data.message, 'error');
        }

        isLoading.value = false;
    }


    const searchInstitute = () => {
        institutes.value = allInstitutes.value.filter((institute) => {
            return institute.name.toLowerCase().includes(searchInput.search.toLowerCase()) || institute.city.toLowerCase().includes(searchInput.search.toLowerCase()) || institute.country.toLowerCase().includes(searchInput.search.toLowerCase());
        })
    }


    const reset = () => {
        instituteInputs.value.logo = '',
        instituteInputs.value.cover = '',
        instituteInputs.value.name = '',
        instituteInputs.value.city = '',
        instituteInputs.value.country = '',
        instituteInputs.value.description = '',
        instituteInputs.value.type = 'UNIVERSITY'

        galleryInputs.value.gallery = [],
        galleryInputs.value.description = ''
        galleryInputs.value.authorId = ''
    }

    
    return {
        getInstitute,
        searchInput,
        isLoading,
        isSkeleton,
        institutes,
        instituteInputs,
        createInstitute,
        instituteEdit,
        instituteUpdate,
        viewInstitute,
        instituteView,
        galleryInputs,
        uploadGallery,
        openGalleryModal,
        reset,
        grades,
        getGrades,
        getDepartments,
        departments,
    }

});