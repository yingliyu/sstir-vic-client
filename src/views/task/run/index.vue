<template>
  <div class="task-detail-wrapper">
    <div class="process-wrapper">
      <h1>分析流程</h1>
      <img :src="ProcessPic" alt="" />
    </div>
    <div class="op-wrap">
      <h1>选择数据</h1>
      <div class="content-wrapper">
        已选择数据：
        <el-tag
          v-for="(tag, index) in selectedData"
          :key="tag.id"
          closable
          class="tag"
          size="medium"
          @close="onTagDel(index)"
        >
          {{ tag.name }}
        </el-tag>
        <el-button type="primary" size="medium">选择数据</el-button>
        <div class="desc">
          <p>注意事项:</p>
          <ul>
            <li>1. 检测流程只支持双端测序的样本，两个文件的前缀请保持相同；勾选时如果遗漏，将无法进行分析！</li>
            <li>2. 测序文件后缀请保证为fastq.gz或fq.gz，其它格式系统可能无法识别</li>
            <li>3. 每个样本的检测时间，大约为3小时；全部完成后，系统将通过邮件通知您；每个样本的PDF报告会自动生成在对应测序数据的下面</li>
            <li>4. 有任何疑问，可以联系tyzuo@sstir.cn，我们将派出专员为您解答</li>
          </ul>
        </div>
        <div class="btn-wrapper">
          <el-button size="medium" type="primary">开始运行</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProcessPic from './img/process.png'

export default {
  name: 'TaskDetail',

  data() {
    return {
      ProcessPic,
      selectedData: [{
        id: 1,
        name: 'data-1'
      },
      {
        id: 2,
        name: 'data-2'
      }]
    }
  },

  methods: {
    onTagDel(index) {
      this.selectedData.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.task-detail-wrapper {
  display: flex;
  flex-flow: column nowrap;

  .process-wrapper {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: 10px 0;
    box-sizing: border-box;

    img {
      max-width: 100%;
      object-fit: contain;
    }
  }
  .op-wrap {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    align-items: center;
    background: #fff;
    padding: 10px 0;
    box-sizing: border-box;

    .content-wrapper {
      max-width: 1100px;
      width: 100%;

      .tag {
        margin-right: 10px;
      }

      .desc {
        color: rgba(0,0,0,0.5);
        font-size: 16px;
        li {
          line-height: 24px;
        }
      }

      .btn-wrapper {
        padding: 30px 0;
        text-align: center;
      }
    }
  }
}
</style>
