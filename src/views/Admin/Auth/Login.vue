<script setup>
import {AuthStore} from '@/stores/auth';
const auth = AuthStore();

function login(){
    auth.login();
}
</script>

<template>
    <div class="container mx-auto h-screen flex justify-center items-center p-5">
        <div class="w-full sm:w-6/12 xl:w-3/12 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
            <div class="p-4 sm:p-7">
                <div class="text-center flex justify-center">
                    <!-- <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1> -->
                     <img class="w-[200px]" src="/logo.png" alt="">
                </div>

                <div class="mt-5">
                    <!-- Form -->
                    <form @submit.prevent="login">
                        <div class="grid gap-y-4">
                            <!-- Form Group -->
                            <div>
                                <label for="email" class="block text-sm mb-2 dark:text-white">Email</label>
                                <div class="relative">
                                    <input type="email" id="email" v-model="auth.credentials.email" name="email" class="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                                </div>
                            </div>
                            <!-- End Form Group -->

                            <!-- Form Group -->
                            <div>
                                <div class="flex justify-between items-center">
                                    <label for="password" class="block text-sm mb-2 dark:text-white">Password</label>
                                </div>
                                <div class="relative">
                                    <input type="password" v-model="auth.credentials.password" id="password" name="password" class="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                                </div>
                            </div>
                            <!-- End Form Group -->

                            <button :disabled="auth.isLoading" type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                Sign in
                            </button>
                        </div>
                    </form>
                    <!-- End Form -->
                </div>
            </div>
        </div>
    </div>
</template>