import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Meetup from '@/components/Meetup/Meetup'
import AuthGuard from './auth-guard'
import ClassManager from '@/components/Admin/ClassManager'
//ClassManager sub-class
import ClassAttendance from '@/components/Admin/Attendance/ClassAttendance'
import ExamScore from '@/components/Admin/Exam/ExamScore'
import CreateStudent from '@/components/Admin/Students/CreateStudent'
import ViewStudents from '@/components/Admin/Students/ViewStudents'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/admin',
      name: 'Class Manager',
      component: ClassManager,
      children: [
        {
          path: 'attendance',
          name: 'Attendance',
          component: ClassAttendance
        },
        {
          path: 'exam',
          name: 'Exam',
          component: ExamScore
        },
        {
          path: 'create-student',
          name: 'CreateStudent',
          component: CreateStudent
        },
        {
          path: 'view-students',
          name: 'ViewStudents',
          component: ViewStudents
        },
      ]
    }
  ],
  mode: 'history'
})
