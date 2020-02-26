import Layout from '@/layout/aside'
import store from '@/store'

const List = () => import(/* webpackChunkName: "project-list" */ '@/views/task/list')
const TaskRun = () => import(/* webpackChunkName: "datasheets-task-run" */ '@/views/task/run')

const lang = store.getters.language
export default {
  path: '/task',
  redirect: 'noredirect',
  component: Layout,
  name: 'taskMgt',
  hidden: false,
  alwaysShow: true,
  meta: {
    title: lang === 'en' ? 'Tasks' : '任务管理',
    icon: 'document-copy'
  },
  children: [
    {
      path: 'list',
      component: List,
      name: 'taskList',
      meta: {
        title: lang === 'en' ? 'My Tasks' : '任务列表'
      }
    },
    {
      path: 'run',
      component: TaskRun,
      name: 'runtask',
      meta: {
        title: lang === 'en' ? 'Add Tasks' : '任务运行'
      }
    }
  ]
}
