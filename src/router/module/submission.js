import Layout from '@/layout/aside'

const List = () => import(/* webpackChunkName: "submission-list" */ '@/views/submission/list')
const Operate = () => import(/* webpackChunkName: "submission-operate" */ '@/views/submission/operate')
const Detail = () => import(/* webpackChunkName: "submission-detail" */ '@/views/submission/detail')
const Choose = () => import(/* webpackChunkName: "submission-choose" */ '@/views/submission/choose')

export default {
  path: '/submission',
  redirect: 'noredirect',
  component: Layout,
  name: 'submissionMgt',
  hidden: false,
  alwaysShow: true,
  meta: {
    title: '数据列表',
    icon: 'receiving'
  },
  children: [
    {
      path: 'list',
      component: List,
      name: 'submissionList',
      meta: {
        title: '数据部分'
      }
    },
    {
      path: 'operate/:id',
      component: Operate,
      props: true,
      name: 'submissionOperate',
      hidden: true,
      meta: {
        title: '添加数据'
      }
    },
    {
      path: 'detail/:id/:version',
      component: Detail,
      props: true,
      name: 'submissionDetail',
      hidden: true,
      meta: {
        title: '任务运行'
      }
    },
    {
      path: 'choose',
      component: Choose,
      props: true,
      name: 'submissionChoose',
      hidden: true,
      meta: {
        title: 'xxx'
      }
    }
  ]
}
