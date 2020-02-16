import Layout from '@/layout/aside'

const DataList = () => import(/* webpackChunkName: "datasheets-data-list" */ '@/views/datasheets/data/list')
const AddData = () => import(/* webpackChunkName: "datasheets-add-data" */ '@/views/datasheets/add-data/list')
const TaskRun = () => import(/* webpackChunkName: "datasheets-task-run" */ '@/views/datasheets/task-run/list')

export default {
  path: '/datasheets',
  redirect: 'noredirect',
  component: Layout,
  name: 'datasheetsMgt',
  hidden: false,
  alwaysShow: true,
  meta: {
    title: '数据列表',
    icon: 's-shop'
  },
  children: [
    {
      path: 'list',
      component: DataList,
      name: 'dataList',
      meta: {
        title: '数据部分'
      }
    },
    {
      path: 'add',
      component: AddData,
      name: 'addData',
      meta: {
        title: '添加数据'
      }
    },
    {
      path: 'runtask',
      component: TaskRun,
      name: 'runtask',
      meta: {
        title: '任务运行'
      }
    }
  ]
}
