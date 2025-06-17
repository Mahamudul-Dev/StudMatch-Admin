import { ref, reactive, watch } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';
import { useToast } from '@/servicess/toastService';


export const MediaStore = defineStore('media', () => {
    const auth = AuthStore();

    const photoMediaFiles = ref([]);
    const photoMediaFile = ref({});
    const photoMediaTotalPage = ref(0);
    const photoMediaCurrentPage = ref(0);
    
    const videoMediaFiles = ref([]);
    const videoMediaFile = ref({});
    const videoMediaTotalPage = ref(0);
    const videoMediaCurrentPage = ref(0);

    const isSkeleton = ref(false);
    const isLoading = ref(false);
    
    const { showToast } = useToast();

    const getPhotoMediaFiles = async () => {
        photoMediaFiles.value = [];
        isSkeleton.value = true;

        let res = await axios.get(`https://datemeapi.codejet.dev/media/photos?page=1&limit=15`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            photoMediaFiles.value = res.data.data.media;
            photoMediaTotalPage.value = res.data.data.totalPages;
            photoMediaCurrentPage.value = res.data.data.currentPage;
        }

        isSkeleton.value = false;
    }


    const loadMorePhotoMedia = async () => {
        isLoading.value = true;
        photoMediaCurrentPage.value = photoMediaCurrentPage.value + 1;
        let res = await axios.get(`https://datemeapi.codejet.dev/media/photos?page=${photoMediaCurrentPage.value}&limit=10`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            photoMediaFiles.value = [...photoMediaFiles.value, ...res.data.data.media];
        }

        isLoading.value = false;
    }


    const photoMediaEdit = async (id) => {
        photoMediaFile.value = {
            id: photoMediaFiles.value.find(media => media.id == id).id,
            type: photoMediaFiles.value.find(media => media.id == id).type,
            description: photoMediaFiles.value.find(media => media.id == id).description ?? ''
        };

        HSOverlay.open('#update-photo-media');
    }


    const updatePhotoMediaFile = async (id) => {
        try {
            isLoading.value = true;
            const res = await axios.put(`https://datemeapi.codejet.dev/media/photos/${photoMediaFile.value.id}`, photoMediaFile.value, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                showToast('Photo Media Updated Successfully', 'success', 'Success');
                HSOverlay.close('#update-photo-media');
                await getPhotoMediaFiles();
            }
            isLoading.value = false;
        } catch (error) {
            showToast(error.response.data.message, 'error', 'Error');
        }
    }


    const deletePhotoMediaFile = async (id, type='default') => {
        try {
            const res = await axios.delete(`https://datemeapi.codejet.dev/media/${id}`, {
                data: {type: type},
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if(res.data.error == false){
                showToast('Photo Deleted Successfully', 'success', 'Success');
                await getPhotoMediaFiles();
            }

        } catch (error) {
            showToast(error.response.data.message, 'error', 'Error');
        }
    }


    const getVideoMediaFiles = async () => {
        videoMediaFiles.value = [];
        isSkeleton.value = true;

        let res = await axios.get(`https://datemeapi.codejet.dev/media/videos?page=1&limit=15`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            videoMediaFiles.value = res.data.data.media;
            videoMediaTotalPage.value = res.data.data.totalPages;
            videoMediaCurrentPage.value = res.data.data.currentPage;
        }

        isSkeleton.value = false;
    }


    const loadMoreVideoMedia = async () => {
        videoMediaCurrentPage.value = videoMediaCurrentPage.value + 1;
        let res = await axios.get(`https://datemeapi.codejet.dev/media/videos?page=${videoMediaCurrentPage.value}&limit=10`, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            videoMediaFiles.value = [...videoMediaFiles.value, ...res.data.data.media];
        }
    }


    return {
        getPhotoMediaFiles,
        photoMediaFiles,
        isSkeleton,
        deletePhotoMediaFile,
        loadMorePhotoMedia,
        photoMediaFile,
        photoMediaEdit,
        isLoading,
        updatePhotoMediaFile,
        photoMediaTotalPage,
        photoMediaCurrentPage,

        videoMediaFiles,
        videoMediaFile,
        getVideoMediaFiles,
        videoMediaTotalPage,
        videoMediaCurrentPage,
        loadMoreVideoMedia
    }

});