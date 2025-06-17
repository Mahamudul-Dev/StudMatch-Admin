import { createRouter, createWebHistory } from 'vue-router'
import { AuthStore } from '@/stores/auth';

const router = createRouter({
  linkActiveClass: 'text-[#b61414] font-semibold',
  linkExactActiveClass: 'text-[#b61414] font-semibold',
  
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'adminLogin',
      component: () => import('@/views/Admin/Auth/Login.vue')
    },
    {
      path: '/admin',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/Admin/Dashboard.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'admin-list',
          name: 'AdminList',
          component: () => import('@/views/Admin/UserManagement/AdminList.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'user-list',
          name: 'UserList',
          component: () => import('@/views/Admin/UserManagement/UserList.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'notification',
          name: 'Notification',
          component: () => import('@/views/Admin/UserManagement/SendNotification.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'institute-list',
          name: 'Institute',
          component: () => import('@/views/Admin/InstituteManagement/InstituteList.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'department-list',
          name: 'Department',
          component: () => import('@/views/Admin/InstituteManagement/DepartmentList.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'grade-list',
          name: 'Grade',
          component: () => import('@/views/Admin/InstituteManagement/GradeList.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'subscription-list',
          name: 'Subscription',
          component: () => import('@/views/Admin/SubscriptionManagement/SubscriptionList.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'promo-list',
          name: 'Promo',
          component: () => import('@/views/Admin/SubscriptionManagement/PromoList.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'hobby-list',
          name: 'Hobby',
          component: () => import('@/views/Admin/Others/HobbyList.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'interest-list',
          name: 'Interest',
          component: () => import('@/views/Admin/Others/InterestList.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'conversation-list',
          name: 'Conversation',
          component: () => import('@/views/Admin/ConversationManagement/ConversationList.vue'),
          meta:{requireAuth: true},
        },
        {
          path: 'media-list',
          name: 'Media',
          component: () => import('@/views/Admin/MediaManagement/MediaList.vue'),
          meta:{requireAuth: true},
        },

      ]
    },
    
  ]
})


router.beforeEach((to, from, next) => {
  const auth = AuthStore();

  if(!auth.token && to.meta.requireAuth && to.name !== 'adminLogin') {
    return next({name: 'adminLogin'});
  }

  if(auth.token && to.name === 'adminLogin') {
    return next({name: 'Dashboard'});
  }

  next();
})

// after each use for preline ui
router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100)
  }
});

export default router
