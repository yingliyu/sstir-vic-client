import Layout from '@/layout/aside'

const EditUser = () => import(/* webpackChunkName: "edituser" */ '@/views/user-info/edit-user')
const BindEmail = () => import(/* webpackChunkName: "emailform" */ '@/views/user-info/edit-user/email-form/index')
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
