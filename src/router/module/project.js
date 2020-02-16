import Layout from '@/layout/aside'

const List = () => import(/* webpackChunkName: "project-list" */ '@/views/project/list')

export default {
  path: '/project',
  redirect: 'noredirect',
  component: Layout,
  name: 'projectMgt',
  hidden: false,
  alwaysShow: true,
  meta: {
    title: '任务',
    icon: 's-cooperation'
  },
  children: [
    {
      path: 'list',
      component: List,
      name: 'projectList',
      meta: {
        title: '任务列表'
      }
    }
  ]
}
