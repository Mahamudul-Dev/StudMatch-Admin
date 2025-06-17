// plugins/toast_plugin.js
// import toast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    install: function(app){
        app.config.globalProperties.toast = toast;
        app.provide('toast', toast);
    }
}