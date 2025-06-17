<script setup>
  import Main from '@/layouts/Main.vue';
  import BreadCrumbComponent from '@/components/BreadCrumbComponent.vue';
  import {MediaStore} from '@/stores/media';
  import { onMounted } from 'vue';
  import DeleteIcon from '@/components/icons/DeleteIcon.vue';
  import EditIcon from '@/components/icons/EditIcon.vue';
  import EditPhotoMediaModalComponent from '@/components/MediaManagement.vue/EditPhotoMediaModalComponent.vue';

  const breadcrumb = {
        title : 'Media List',
        items : [
            {
                name: 'Media List',
                link: '/admin/media-list',
                active: true
            }
        ]
    }

    const mediaStore = MediaStore();

    onMounted(async ()=>{
       await mediaStore.getPhotoMediaFiles();
       await mediaStore.getVideoMediaFiles();
    })



</script>

<template>
    <Main>
        <BreadCrumbComponent :breadcrumb="breadcrumb" />

        <div class="card min-h-[800px]">
            <div class="card-body">
                <!-- {{ mediaStore.photoMediaFiles }} -->
                <nav class="flex gap-x-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                    <button type="button" class="hs-tab-active:bg-blue-600 hs-tab-active:text-white hs-tab-active:hover:text-white hs-tab-active:dark:text-white py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300 active" id="pills-with-brand-color-item-1" aria-selected="true" data-hs-tab="#pills-with-brand-color-1" aria-controls="pills-with-brand-color-1" role="tab">
                        Photo Media
                    </button>
                    <button type="button" class="hs-tab-active:bg-blue-600 hs-tab-active:text-white hs-tab-active:hover:text-white hs-tab-active:dark:text-white py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300" id="pills-with-brand-color-item-2" aria-selected="false" data-hs-tab="#pills-with-brand-color-2" aria-controls="pills-with-brand-color-2" role="tab">
                        Video Media
                    </button>
                </nav>

                <div class="mt-3">
                    <div id="pills-with-brand-color-1" role="tabpanel" aria-labelledby="pills-with-brand-color-item-1">
                        <div class="w-full space-y-10 pb-10" v-if="!mediaStore.isSkeleton">
                            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                                <div class="w-full h-[200px] border shadow rounded group relative overflow-hidden" v-for="(media, index) in mediaStore.photoMediaFiles" :key="index">
                                    <img class="w-full h-full object-cover rounded" loading="lazy" :src="media.url" alt="">

                                    <div class="w-full bg-slate-500/50 flex gap-5 items-center justify-center absolute duration-700 bottom-[-80px] group-hover:bottom-[0px]">
                                        <button @click="mediaStore.photoMediaEdit(media.id)" class="p-3 duration-150">
                                            <EditIcon class="text-[25px] text-white" />
                                        </button>
                                        <button @click="mediaStore.deletePhotoMediaFile(media.id, media.type)" class="p-3 duration-150">
                                            <DeleteIcon class="text-[25px] text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="w-full flex justify-center">
                                <button v-if="mediaStore.photoMediaCurrentPage < mediaStore.photoMediaTotalPage" :disabled="mediaStore.isLoading" @click="mediaStore.loadMorePhotoMedia()" class="w-[120px] py-2 bg-green-600 text-white rounded-md disabled:cursor-wait disabled:opacity-[0.6]">Load More</button>
                            </div>
                        </div>


                        <!-- skeleton -->
                        <div v-else class="w-full space-y-10 pb-10">
                            <!-- Media Files Grid -->
                            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                                <div
                                    class="w-full h-[200px] border shadow rounded group relative overflow-hidden animate-pulse"
                                    v-for="index in 15"
                                    :key="index"
                                >
                                    <div class="w-full h-full bg-gray-300 rounded"></div>
                                </div>
                            </div>

                            <!-- Load More Button -->
                            <div class="w-full flex justify-center">
                                <div class="w-[120px] h-10 bg-gray-600 rounded-md animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    <div id="pills-with-brand-color-2" class="hidden" role="tabpanel" aria-labelledby="pills-with-brand-color-item-2">
                        <div class="w-full space-y-10 pb-10" v-if="!mediaStore.isSkeleton">
                            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                                <div class="w-full h-[200px] border shadow rounded group relative overflow-hidden" v-for="(video, index) in mediaStore.videoMediaFiles" :key="index">
                                    <video
                                        controls
                                        :src="video.url"
                                        class="w-full h-full object-cover rounded"
                                    >
                                    </video>
                                </div>
                            </div>

                            <div class="w-full flex justify-center">
                                <button v-if="mediaStore.videoMediaCurrentPage < mediaStore.videoMediaTotalPage" @click="mediaStore.loadMoreVideoMedia()" class="w-[120px] py-2 bg-green-600 text-white rounded-md disabled:cursor-wait disabled:opacity-[0.6]">Load More</button>
                            </div>
                        </div>


                        <!-- skeleton -->
                        <div v-else class="w-full space-y-10 pb-10">
                            <!-- Media Files Grid -->
                            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                                <div
                                    class="w-full h-[200px] border shadow rounded group relative overflow-hidden animate-pulse"
                                    v-for="index in 15"
                                    :key="index"
                                >
                                    <div class="w-full h-full bg-gray-300 rounded"></div>
                                </div>
                            </div>

                            <!-- Load More Button -->
                            <div class="w-full flex justify-center">
                                <div class="w-[120px] h-10 bg-gray-600 rounded-md animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <EditPhotoMediaModalComponent/>
    </Main>
</template>
