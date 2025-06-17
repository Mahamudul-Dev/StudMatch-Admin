import { ref} from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { AuthStore } from './auth';
import { HSOverlay } from 'preline/preline';
import { useToast } from '@/servicess/toastService';

export const NotificationStore = defineStore('notification', () => {
    const auth = AuthStore();
    const isLoading = ref(false);
    const notificationDetails = ref({
        receiverId : '',
        title : '',
        content : '',
        actionRoute : "/notification"
    });

    const {showToast} = useToast();

    const sendNotification = async () => {
        isLoading.value = true;
        let res = await axios.post(`https://api.studmatch.app/notification/send`, notificationDetails.value, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            HSOverlay.close('#send-notification');
            showToast('Notification Sent Successfully', 'success', 'Notification');

        }

        isLoading.value = false;
    }


    const sendNotificationToAll = async () => {
        isLoading.value = true;
        let res = await axios.post(`https://api.studmatch.app/notification/send/all`, notificationDetails.value, {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        });

        if(res.data.error == false){
            HSOverlay.close('#send-notification-to-all');
            showToast('Notification Sent Successfully', 'success', 'Notification');

            notificationDetails.value = {
                receiverId : '',
                title : '',
                content : '',
                actionRoute : "/notification"
            }
        }

        isLoading.value = false;
    }


    return {
        sendNotification,
        notificationDetails,
        isLoading,
        sendNotificationToAll
    }
});