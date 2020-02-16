import Layout from '@/layout/aside'

const DataList = () => import(/* webpackChunkName: "discover-data-list" */ '@/views/discover/data/list')
const ToolList = () => import(/* webpackChunkName: "discover-tool-list" */ '@/views/discover/tool/list')
const ProjectList = () => import(/* webpackChunkName: "discover-project-list" */ '@/views/discover/project/list')

export default {
  path: '/discover',
  redirect: 'noredirect',
  component: Layout,
  name: 'discoverMgt',
  hidden: false,
  alwaysShow: true,
  meta: {
    title: '数据列表',
    icon: 's-shop'
  },
  children: [
    {
      path: 'datalist',
      component: DataList,
      name: 'dataList',
      meta: {
        title: '数据部分'
      }
    },
    {
      path: 'toolList',
      component: ToolList,
      name: 'toolList',
      meta: {
        title: '添加数据'
      }
    },
    {
      path: 'projectList',
      component: ProjectList,
      name: 'discoverProjectList',
      meta: {
        title: '任务运行'
      }
    }
  ]
}
