<script setup>
import ShowProfileSkeleton from './ShowProfileSkeleton.vue';
import { UserStore } from '@/stores/user';

const userStore = UserStore();
</script>


<template>
    <div id="show-conversation" class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden pointer-events-none" role="dialog" tabindex="-1" aria-labelledby="show-conversation-label">
    <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-3xl lg:w-full m-3 lg:mx-auto">
        <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                <h3 id="show-conversation-label" class="font-semibold text-gray-800 dark:text-white">
                    Conversation List
                </h3>
                <button type="button" class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#show-conversation">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="p-4 w-full">
                <div class="w-full md:flex gap-4">

                    <!-- {{ userStore.userConversations }} -->

                    <!-- Left fixed section for conversation list -->
                    <div class="w-full md:w-4/12 bg-white rounded-lg shadow-lg border pb-3">

                        <div v-if="userStore.userConversations.length > 0" @click="userStore.getAllMessagesToAUser(conversationAllUserList.data.id)" v-for="(conversationAllUserList, index) in userStore.userConversations" class="w-full flex justify-between hover:bg-gray-100 duration-150 cursor-pointer p-3 border-b border-gray-300" :class="index == 5 ? 'border-b-0' : ''">
                            <div class="flex gap-4 items-center">
                                <div class="w-10 h-10">
                                    <img v-if="conversationAllUserList.receiverProfilePicture" class="w-full h-full rounded-full" :src="conversationAllUserList.receiverProfilePicture" alt="">
                                    <div v-else class="w-full h-full rounded-full bg-gray-300"></div>
                                </div>
                                <div class="profileName">
                                    <h1 class="font-semibold">{{ conversationAllUserList.name }}</h1>
                                </div>
                            </div>
                        </div>


                        <div v-else class="w-full flex flex-col space-y-3">
                            <!-- Skeleton Loader for Conversations -->
                            <div
                                v-for="index in 5"
                                :key="index"
                                class="w-full flex justify-between cursor-pointer p-3 border-b border-gray-300 animate-pulse"
                                :class="index === 6 ? 'border-b-0' : ''"
                                >
                                <!-- Profile Image Skeleton -->
                                <div class="flex gap-4 items-center">
                                    <div class="w-10 h-10">
                                    <div class="w-full h-full rounded-full bg-gray-300"></div>
                                    </div>

                                    <!-- Profile Name Skeleton -->
                                    <div class="profileName">
                                    <div class="w-24 h-4 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Right scrollable section for chat messages -->
                    <div class="w-full h-full md:w-8/12 bg-white rounded-lg shadow-lg p-8 border overflow-y-auto" style="max-height: 500px;">
                        
                        <div v-if="userStore.allMessages?.data?.messages.length > 0" class="w-full space-y-10" v-for="(message, index) in userStore.allMessages.data.messages" :key="index">

                            <!-- left side message -->
                            <div class="leftMessage mt-[20px] flex flex-col text-start items-start" v-if="message.sender.id !== userStore.allMessages.receiverUid">
                                <div v-if="message.content != null" class="p-3 inline-block bg-[#0048BA] text-white rounded-lg">
                                    {{ message.content }}
                                </div>

                                {{ message.sender.id }}

                                <div v-if="message.media.length > 0" class="flex flex-col gap-4">
                                    <div class="w-[200px] h-[300px] rounded-lg" v-for="(media, index) in message.media" :key="index">
                                        <video
                                        controls
                                        :src="media.url"
                                        class="w-full h-full object-cover rounded"
                                        >
                                        </video>
                                    </div>
                                </div>
                            </div>

                            <!-- right side message -->
                            <div v-else class="rightMessage flex flex-col items-end mt-[20px] text-right">
                                <div v-if="message.content != null" class="p-3 inline-block bg-[#0048BA] text-white rounded-lg">
                                    {{ message.content }}
                                </div>

                                {{ message.sender.id }}

                                <div v-if="message.media.length > 0" class="flex flex-col gap-4">

                                    <div class="w-[200px] h-[200px] rounded-lg" v-for="media in message.media">
                                        <video
                                        controls
                                        :src="media.url"
                                        class="w-full h-full object-cover rounded"
                                        v-if="media.type == 'VIDEO'"
                                        >
                                        </video>

                                        <img v-else class="w-full h-full object-cover rounded" :src="media.url" alt="">
                                    </div>

                                </div>
                            </div>

                        </div>

                        <!-- skeleton -->
                        <div v-else-if="userStore.isSkeleton" class="w-full space-y-3">
                            <div class="w-full">
                                <div class="inline-block w-[150px] h-[35px] rounded-lg  bg-gray-400 animate-pulse"></div>
                            </div>
                            <div class="w-full flex justify-end">
                                <div class="inline-block w-[150px] h-[35px] rounded-lg bg-gray-400 animate-pulse"></div>
                            </div>
                            <div>
                                <div class=" w-[150px] h-[35px] rounded-lg bg-gray-400 animate-pulse"></div>
                            </div>
                            <div class="w-full flex justify-end">
                                <div class="inline-block w-[150px] h-[35px] rounded-lg bg-gray-400 animate-pulse"></div>
                            </div>
                            <div>
                                <div class=" w-[150px] h-[35px] rounded-lg bg-gray-400 animate-pulse"></div>
                                <div class=" w-[150px] h-[35px] rounded-lg bg-gray-400 animate-pulse float-right"></div>
                            </div>
                        </div>

                        <div v-else class="w-full h-[400px]">
                            <div class="w-full h-full flex justify-center items-center">
                                <h1 class="text-[20px] text-gray-500 font-semibold">No Messages Found</h1>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

</template>