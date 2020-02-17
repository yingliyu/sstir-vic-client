import Layout from '@/layout/aside'

const List = () => import(/* webpackChunkName: "project-list" */ '@/views/task/list')
const TaskRun = () => import(/* webpackChunkName: "datasheets-task-run" */ '@/views/task/run')

export default {
  path: '/task',
  redirect: 'noredirect',
  component: Layout,
  name: 'taskMgt',
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
      name: 'taskList',
      meta: {
        title: '任务列表'
      }
    },
    {
      path: 'run',
      component: TaskRun,
      name: 'runtask',
      meta: {
        title: '任务运行'
      }
    }
  ]
}
