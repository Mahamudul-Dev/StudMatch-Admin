import { ref, computed, reactive, watch } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';

export const DashboardStore = defineStore('dashboard', () => {
    const auth = AuthStore();
    const dashboardInfos = ref({
        totalUsersCount : 0,
        totalInstituteCount : 0,
        onlineUsersCount : 0,
        pendingUsersCount : 0,
        verificationPendingUsersCount : 0,
        dailyLoginsCount : 0,
        avarageUsageCount : 0
    });

    const latestUsers = ref([]);
    const latestInstitutes = ref([]);

    const usersIsLoading = ref(false);
    const institutesIsLoading = ref(false);


    const getDashboardInfos = async () => {
        let res = await axios.get('https://api.studmatch.app/dashboard/count',{
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });
        
        if(res.data.error == false){
            dashboardInfos.value.totalUsersCount = res.data.data.totalUsersCount;
            dashboardInfos.value.totalInstituteCount = res.data.data.totalInstituteCount;
            dashboardInfos.value.onlineUsersCount = res.data.data.onlineUsersCount;
            dashboardInfos.value.pendingUsersCount = res.data.data.pendingUsersCount;
            dashboardInfos.value.verificationPendingUsersCount = res.data.data.verificationPendingUsersCount;
            dashboardInfos.value.dailyLoginsCount = res.data.data.dailyLogins;
        }
    }


    setInterval(getDashboardInfos, 600000);


    const getLatestUsers = async () => {
        usersIsLoading.value = true;
        latestUsers.value = [];
        try {
            let res = await axios.post('https://api.studmatch.app/user/filter?page=1&limit=5&key=status&value=APPROVED',{
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if(res.data.error == false){
                latestUsers.value = res.data.data.users;
            }
        } catch (error) {
            console.error(error);
        }

        usersIsLoading.value = false;
    }


    const getLatestInstitutes = async () => {
        institutesIsLoading.value = true;
        latestInstitutes.value = [];
        try {
            let res = await axios.get('https://api.studmatch.app/institute?page=1&limit=5',{
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            
            if(res.data.error == false){
                latestInstitutes.value = res.data.data.institutes;
            }
        } catch (error) {
            console.error(error);
        }

        institutesIsLoading.value = false;
    }

    
    return {
        dashboardInfos,
        getDashboardInfos,
        getLatestUsers,
        usersIsLoading,
        institutesIsLoading,
        latestUsers,
        getLatestInstitutes,
        latestInstitutes,
    }
});