import Layout from '@/layout/aside'
import store from '@/store'

const DataList = () => import(/* webpackChunkName: "datasheets-data-list" */ '@/views/datasheets/list')
const AddData = () => import(/* webpackChunkName: "datasheets-add-data" */ '@/views/datasheets/add-data')
const lang = store.getters.language

export default {
  path: '/datasheets',
  redirect: 'noredirect',
  component: Layout,
  name: 'datasheetsMgt',
  hidden: false,
  alwaysShow: true,
  meta: {
    title: lang === 'en' ? 'Files' : '数据管理',
    icon: 's-data'
  },
  children: [
    {
      path: 'list',
      component: DataList,
      name: 'dataList',
      meta: {
        title: lang === 'en' ? 'My Files' : '数据列表'
      }
    },
    {
      path: 'add',
      component: AddData,
      name: 'addData',
      meta: {
        title: lang === 'en' ? 'Add Files' : '添加数据'
      }
    }
  ]
}
