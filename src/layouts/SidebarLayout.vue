<script setup>
import DashboardIcon from '@/components/icons/DashboardIcon.vue';
import DotIcon from '@/components/icons/DotIcon.vue';
import MenuArrowIcon from '@/components/icons/MenuArrowIcon.vue';
import UserManagementIcon from '@/components/icons/UserManagementIcon.vue';
import InstituteIcon from '@/components/icons/InstituteIcon.vue';
import SubscriptionIcon from '@/components/icons/SubscriptionIcon.vue';
import OtherIcon from '@/components/icons/OtherIcon.vue';
import {RouterLink} from 'vue-router';
import ConversationIcon from '@/components/icons/ConversationIcon.vue';
import MediaIcon from '@/components/icons/MediaIcon.vue';

import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <div id="sidebar" class="sidebar fixed top-[60px] left-0 z-20  w-[0px] sm:min-w-[250px] bg-[#FFFFFF] dark:bg-gray-800 h-full overflow-hidden overflow-y-auto">
        <nav class="hs-accordion-group py-6 px-[8px] w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul class="space-y-2">
                <li>
                    <RouterLink :to="{name : 'Dashboard'}" class="menu">
                        <DashboardIcon class="menu-icon" />
                        Dashboard
                    </RouterLink>
                </li>

                <li class="hs-accordion" id="account-accordion" :class="{'active' : route.name == 'UserList' || route.name == 'Notification' || route.name == 'AdminList'}">
                    <button type="button" class="menu hs-accordion-toggle">
                        <UserManagementIcon class="menu-icon" />
                        User Management
                        <MenuArrowIcon />
                    </button>

                    <div id="account-accordion-child" class="hs-accordion-content sub-menu-content hs-accordion-active:block">
                        <ul class="p-1 space-y-1">
                            <li>
                                <RouterLink :to="{name: 'AdminList'}" class="sub-menu">
                                    <DotIcon class="sub-menu-icon" />
                                    Admin List
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink :to="{name: 'UserList'}" class="sub-menu">
                                    <DotIcon class="sub-menu-icon" />
                                    User List
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink :to="{name: 'Notification'}" class="sub-menu">
                                    <DotIcon class="sub-menu-icon" />
                                    Notification
                                </RouterLink>
                            </li>
                            
                        </ul>
                    </div>
                </li>

                <li class="hs-accordion" id="account-accordion" :class="{'active' : route.name == 'Institute' || route.name == 'Department' || route.name == 'Grade'}">
                    <button type="button" class="menu hs-accordion-toggle">
                        <InstituteIcon class="menu-icon" />
                          Institute Management
                        <MenuArrowIcon />
                    </button>

                    <div id="account-accordion-child" class="hs-accordion-content sub-menu-content hs-accordion-active:block">
                        <ul class="p-1 space-y-1">
                            <li>
                                <RouterLink :to="{name: 'Institute'}" class="sub-menu">
                                    <DotIcon class="sub-menu-icon" />
                                    Institute List
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{name: 'Department'}" class="sub-menu">
                                    <DotIcon class="sub-menu-icon" />
                                    Department List
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{name: 'Grade'}" class="sub-menu">
                                    <DotIcon class="sub-menu-icon" />
                                    Grade List
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="hs-accordion" id="account-accordion" :class="{'active' : route.name == 'Subscription' || route.name == 'Promo'}">
                    <button type="button" class="menu hs-accordion-toggle text-[13px]">
                        <SubscriptionIcon class="menu-icon" />
                        Subscription Management
                        <MenuArrowIcon />
                    </button>

                    <div id="account-accordion-child" class="hs-accordion-content sub-menu-content hs-accordion-active:block">
                        <ul class="p-1 space-y-1">
                            <li>
                                <RouterLink :to="{name: 'Subscription'}" class="sub-menu">
                                    <DotIcon class="sub-menu-icon" />
                                    Subscription List
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{name: 'Promo'}" class="sub-menu">
                                    <DotIcon class="sub-menu-icon" />
                                    Promo List
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </li>

                <!-- <li class="hs-accordion" id="account-accordion" :class="{'active' : route.name == 'Conversation'}">
                    <button type="button" class="menu hs-accordion-toggle text-[13px]">
                        <ConversationIcon class="menu-icon" />
                        Conversation Management
                        <MenuArrowIcon />
                    </button>

                    <div id="account-accordion-child" class="hs-accordion-content sub-menu-content hs-accordion-active:block">
                        <ul class="p-1 space-y-1">
                            <li>
                                <RouterLink :to="{name: 'Conversation'}" class="sub-menu">
                                    <DotIcon class="sub-menu-icon" />
                                    Conversation List
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </li> -->

                <li>
                    <RouterLink :to="{name : 'Media'}" class="menu" :class="{'active' : route.name == 'Media'}">
                        <MediaIcon class="menu-icon" />
                        Media Management
                    </RouterLink>
                </li>

                <li class="hs-accordion" id="account-accordion" :class="{'active' : route.name == 'Hobby' || route.name == 'Interest'}">
                    <button type="button" class="menu hs-accordion-toggle text-[13px]">
                        <OtherIcon class="menu-icon" />
                        Others
                        <MenuArrowIcon />
                    </button>

                    <div id="account-accordion-child" class="hs-accordion-content sub-menu-content hs-accordion-active:block">
                        <ul class="p-1 space-y-1">
                            <li>
                                <RouterLink :to="{name: 'Hobby'}" class="sub-menu">
                                    <DotIcon class="sub-menu-icon" />
                                    Hobby List
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{name: 'Interest'}" class="sub-menu">
                                    <DotIcon class="sub-menu-icon" />
                                    Interest List
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </li>

            </ul>
        </nav>
    </div>
</template>

<style scoped>

</style>