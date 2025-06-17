<script setup>
import {AuthStore} from '@/stores/auth';
import { computed } from 'vue';
import AvatarIcon from '@/components/icons/AvatarIcon.vue';

const auth = AuthStore();


const avatar = computed(() => 'https://media.istockphoto.com/id/1217962587/photo/portrait-of-a-young-confident-smiling-asian-chinese-businessman.webp?a=1&b=1&s=612x612&w=0&k=20&c=QX1JwDMtq-Wt4papiDrw9C1eLRY_civVN6pfqXaoghA=')
</script>

<template>
    <div class="hs-dropdown relative inline-flex [--trigger:click]   items-center">
        <button id="hs-dropdown-hover-event" type="button"
            class="hs-dropdown-toggle w-[35px] h-[35px] ring-1 ring-[#b61414] rounded-full inline-flex justify-center items-center gap-x-2 text-sm font-medium p-[1px] bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <AvatarIcon class="size-5 text-[#b61414]" />
        </button>

        <div class="hs-dropdown-menu transition-[opacity,margin] duration space-y-2 hs-dropdown-open:opacity-100 opacity-0 hidden w-[200px] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
            aria-labelledby="hs-dropdown-hover-event">
            <!-- <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                href="#">
                Profile
            </a> -->
            <button @click="auth.logout()" class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full text-gray-100 bg-red-500 hover:bg-red-600 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
                Log Out
            </button>
        </div>
    </div>
</template>