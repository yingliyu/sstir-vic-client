export default {
  lists: {
    toDatas: '数据列表',
    taskName: '任务名称',
    startTime: '发起时间',
    duration: '运行时间(分钟)',
    taskStatus: '状态',
    reportUrl: '分析报告',
    adding: '进行中',
    complete: '完成',
    select: '请选择'
  },
  add: {
    title: '分析流程',
    selData: '选择数据',
    selected: '已选择数据',
    cautions: '注意事项',
    desc1: '1. 检测流程只支持双端测序的样本，两个文件的前缀请保持相同；勾选时如果遗漏，将无法进行分析！',
    desc2: '2. 测序文件后缀请保证为fq.gz”麻烦改为“测序文件后缀请保证为以下四种格式（以R1为例）：_R1.fastq.gz，_R1.fq.gz，_1.fastq.gz或_1.fq.gz，其它格式系统可能无法识别。',
    desc3: '3. 每个样本的检测时间，大约2-3小时；任务完成后，可以在任务列表下载分析报告。',
    desc4: '4. 有任何疑问，可以联系tyzuo@sstir.cn，我们将派出专员为您解答。',
    startRun: '开始运行',
    tips1: '请选择两条基因测序数据(确保前缀名相同)',
    tips2: '任务运行失败，请重试!',
    tips3: '请勿选择未传输完成的数据！！！'
  }
}
