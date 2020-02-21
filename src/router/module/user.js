import Layout from '@/layout/aside'
const UserInfo = () => import(/* webpackChunkName: "userinfo" */ '@/views/user-info')

const RealName = () => import(/* webpackChunkName: "realname" */ '@/views/user-info/real-name')
const EditUser = () => import(/* webpackChunkName: "edituser" */ '@/views/user-info/edit-user')
const BindEmail = () => import(/* webpackChunkName: "emailform" */ '@/views/user-info/edit-user/email-form/index')
const BindMobile = () => import(/* webpackChunkName: "mobileform" */ '@/views/user-info/edit-user/mobile-form/index')
const ChangePwd = () => import(/* webpackChunkName: "changepwd" */ '@/views/change-pwd/index')
export default {
  path: '/user',
  name: 'user',
  component: Layout,
  hidden: true,
  meta: {
    title: '用户',
    noCache: true
  },
  children: [
    {
      path: 'info',
      name: 'info',
      component: UserInfo,
      meta: {
        title: '个人中心',
        noCache: true
      }
    },
    {
      path: 'realname',
      name: 'realname',
      component: RealName,
      meta: {
        title: '实名认证',
        noCache: false
      }
    },
    {
      path: 'edit',
      name: 'edit',
      component: EditUser,
      meta: {
        title: '编辑个人资料',
        noCache: true
      }
    },
    {
      path: 'bindemail',
      name: 'email',
      component: BindEmail,
      meta: {
        title: '绑定邮箱',
        noCache: true
      }
    },
    {
      path: 'bindmobile',
      name: 'mobile',
      component: BindMobile,
      meta: {
        title: '绑定手机',
        noCache: true
      }
    },
    {
      path: 'changepwd',
      name: 'changepwd',
      component: ChangePwd,
      meta: {
        title: '修改密码',
        noCache: true
      }
    }
  ]
}
