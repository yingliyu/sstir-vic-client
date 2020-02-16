// driver steps
const steps = [
  {
    element: '#submissionMgt',
    // element: '.logo-wrapper',
    popover: {
      title: '<h4 style="display:none">汇交管理</h4>',
      description: '点击“汇交”按钮实名认证后即可同步所有汇交项目',
      position: 'right-center'
    }
  },
  {
    element: '#projectMgt',
    popover: {
      title: '<h4 style="display:none">项目管理</h4>',
      description: '点击进入“项目”界面，您可以创建任务并邀请合作者进行分析任务',
      position: 'right-center'
    }
    // padding: 0
  },
  {
    element: '#discoverMgt',
    popover: {
      title: '<h4 style="display:none">发现</h4>',
      description: '科学+是一个共享平台，您可再次发现别人分享的数据、工具甚至项目',
      position: 'right-center'
    }
  },
  {
    element: '#user-head',
    popover: {
      title: '<h4 style="display:none">个人中心</h4>',
      description: '进入个人中心，可以编辑个人信息，查看平台使用情况',
      position: 'bottom-right'
    }
  }
]

export default steps
