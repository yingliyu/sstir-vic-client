import Layout from '@/layout/aside'
// import router from '../../lang/zh-cn/router'

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
    title: 'router.files.manage',
    icon: 's-data'
  },
  children: [
    {
      path: 'list',
      component: DataList,
      name: 'dataList',
      meta: {
        title: 'router.files.list'
      }
    },
    {
      path: 'add',
      component: AddData,
      name: 'addData',
      meta: {
        title: 'router.files.add'
      }
    }
  ]
}
