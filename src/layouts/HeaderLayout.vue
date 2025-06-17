<script setup>
import UserActionButton from '@/components/Header/UserActionButton.vue';
import BarsIcon from '@/components/icons/BarsIcon.vue';
</script>

<template>
    <div class="header fixed top-0 flex z-20 space-x-2 w-full h-[60px] border-b-[1px] shadow-sm shadow-gray-300 border-gray-300 dark:border-gray-500 bg-[#FAFBFC] dark:bg-gray-800 text-slate-800 dark:text-slate-200">

        <div class="min-w-[251px] hidden md:block">
            <div class="sidebar-title px-2 border-r-[1px] border-gray-300 flex justify-center items-center overflow-hidden">
                <!-- <h3 class="text-xl  text-center">Dashboard</h3> -->
                 <div class="w-[180px]">
                    <img class="w-full h-full object-cover" src="/logo.png" alt="">
                 </div>
            </div>
        </div>

        <div class="flex justify-between items-center w-full pr-5">
            <!-- left side content here -->
            <div class="" id="toggleButton">
                <BarsIcon id="barsIcon" class="text-2xl sm:hidden duration-300 hover:scale-110" />
            </div>

            <!-- header right side content here -->
            <UserActionButton/>
        </div>
    </div>
</template>