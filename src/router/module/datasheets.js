import Layout from '@/layout/aside'

const DataList = () => import(/* webpackChunkName: "datasheets-data-list" */ '@/views/datasheets/list')
const AddData = () => import(/* webpackChunkName: "datasheets-add-data" */ '@/views/datasheets/add-data')

export default {
  path: '/datasheets',
  redirect: 'noredirect',
  component: Layout,
  name: 'datasheetsMgt',
  hidden: false,
  alwaysShow: true,
  meta: {
    title: '数据管理',
    icon: 's-data'
  },
  children: [
    {
      path: 'list',
      component: DataList,
      name: 'dataList',
      meta: {
        title: '数据列表'
      }
    },
    {
      path: 'add',
      component: AddData,
      name: 'addData',
      meta: {
        title: '添加数据'
      }
    }
  ]
}
