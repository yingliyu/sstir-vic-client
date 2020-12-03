export default {
  lists: {
    toDatas: 'My Files',
    taskName: 'Task name',
    startTime: 'Launch time',
    duration: 'Running Time (minutes)',
    taskStatus: 'Status',
    reportUrl: 'Analysis Report',
    adding: 'Processing',
    complete: 'Complete',
    select: 'Please choose'
  },
  add: {
    title: 'Pipeline',
    selData: 'Choose data',
    selected: 'Chosen data',
    cautions: 'Cautions',
    // desc1: '1. The pipeline only supports pair-end sequencing samples. Please keep the prefix of the two files the same; if you omit any of them, you will not be able to analyze them!',
    // desc2: '2. The suffix of the sequencing file must be in the following four formats (take R1 as an example): _R1.fastq.gz, _R1.fq.gz, _1.fastq.gz or _1.fq.gz. Other formats may not be recognized.',
    desc1: '',
    desc2:
      'The suffix of the sequencing file must be in the following formats : .fastq, .fq. Other formats may not be recognized.',
    desc3:
      'The whole process generally takes about 3 hours, varied by input file sizes. When task is completed, the system will notify you by email, and a PDF report of each sample will be automatically generated. ',
    desc4:
      'If you have any questions, please contact xtian@sstir.cn, we will send a specialist to answer your questions.',
    startRun: 'Start running',
    tips1: 'Please select two gene sequencing data (make sure the prefix name is the same)',
    tips2: 'The task failed to run, please try again!'
  }
}
