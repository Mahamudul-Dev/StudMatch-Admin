<script setup>

</script>

<template>
    <!-- Flex container for the first row of placeholders -->
    <div class="flex gap-4">
        <!-- First column: Placeholder for Email (Date of Birth) -->
        <div class="form-control w-4/12">
            <label class="label bg-gray-200 h-4 w-1/2 rounded-md animate-pulse"></label>
            <div class="input bg-gray-200 h-10 rounded-md animate-pulse w-full border-none"></div>
        </div>

        <!-- Second column: Placeholder for Interests -->
        <div class="form-control w-4/12">
            <label class="label bg-gray-200 h-4 w-1/2 rounded-md animate-pulse"></label>
            <div class="input bg-gray-200 h-10 rounded-md animate-pulse w-full border-none"></div>
        </div>

        <!-- Third column: Placeholder for Hobies -->
        <div class="form-control w-4/12">
            <label class="label bg-gray-200 h-4 w-1/2 rounded-md animate-pulse"></label>
            <div class="input bg-gray-200 h-10 rounded-md animate-pulse w-full border-none"></div>
        </div>
    </div>

    <!-- Full-width Bio placeholder -->
    <div class="w-full mt-4">
        <label class="label bg-gray-200 h-4 w-1/4 rounded-md animate-pulse"></label>
        <div class="textarea bg-gray-200 h-32 rounded-md animate-pulse w-full border-none"></div>
    </div>

    <!-- Placeholder for the button -->
    <div class="w-full mt-5">
        <div class="bg-gray-300 h-10 w-24 rounded-md animate-pulse"></div>
    </div>
</template>