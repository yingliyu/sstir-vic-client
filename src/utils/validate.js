/** 用户名 */
export let userName = {
  required: {
    required: true,
    message: '请输入真实姓名',
    trigger: 'blur'
  },
  length: {
    min: 6,
    message: '用户名长度大于6个字符小于25个字符',
    trigger: ['blur']
  }
}
// 登录名
export let loginName = {
  required: {
    required: true,
    message: '请输入邮箱',
    trigger: 'blur'
  },
  length: {
    min: 6,
    max: 25,
    message: '用户名长度大于6个字符小于25个字符',
    trigger: ['blur']
  },
  pattern: {
    pattern: /(^1[3456789]\d{9}$)|(^\w+@[a-z0-9]+\.[a-z]+$)/,
    message: '您输入的内容既不是邮箱，也不是手机号，请重新输入'
  }
}

/** 密码 */
export let password = [
  {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  },
  {
    min: 8,
    max: 16,
    message: '密码长度8-16位，包括字母和数字（区分大小写）',
    trigger: ['blur']
  },
  {
    pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
    message: '密码长度8-16位，包括字母和数字（区分大小写）'
  }
]

/** 密码 */
export let passwordEn = [
  {
    required: true,
    message: 'Please input password',
    trigger: 'blur'
  },
  {
    min: 8,
    max: 16,
    message: 'Password length is 8-16 characters, including letters and numbers (case sensitive)',
    trigger: ['blur']
  },
  {
    pattern: /^(?![^a-zA-Z]+$)(?!\D+$)/,
    message: 'Password length is 8-16 characters, including letters and numbers (case sensitive)'
  }
]
/** 手机号 */
export let phone = {
  required: {
    required: true,
    message: '请输入手机号',
    trigger: 'blur'
  },
  pattern: {
    pattern: /^1[3456789]\d{9}$/,
    message: '请输入正确的手机号'
  }
}

/** 邮箱 */
export let email = [
  {
    required: true,
    message: '请输入邮箱地址',
    trigger: 'blur'
  },
  {
    // type: 'email',
    pattern: /[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/i,
    message: '请输入正确的邮箱地址',
    trigger: ['blur']
  }
]
/** 邮箱 */
export let emailEn = [
  {
    required: true,
    message: 'Please input email',
    trigger: 'blur'
  },
  {
    // type: 'email',
    pattern: /[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/i,
    message: 'Please input the correct email address',
    trigger: ['blur']
  }
]

/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}
