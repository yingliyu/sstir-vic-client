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
          :key="tag.dataName"
          closable
          class="tag"
          size="medium"
          @close="onTagDel(index)"
        >
          {{ tag.dataName }}
        </el-tag>
        <el-button type="primary" size="medium" @click="onShowSelectClick">选择数据</el-button>
        <div class="desc">
          <p>注意事项:</p>
          <ul>
            <li>
              1.
              检测流程只支持双端测序的样本，两个文件的前缀请保持相同；勾选时如果遗漏，将无法进行分析！
            </li>
            <li>2. 测序文件后缀请保证为fastq.gz或fq.gz，其它格式系统可能无法识别</li>
            <li>
              3.
              每个样本的检测时间，大约为3小时；全部完成后，系统将通过邮件通知您；每个样本的PDF报告会自动生成在对应测序数据的下面
            </li>
            <li>4. 有任何疑问，可以联系tyzuo@sstir.cn，我们将派出专员为您解答</li>
          </ul>
        </div>
        <div class="btn-wrapper">
          <el-button size="medium" type="primary" @click="onStartClick">开始运行</el-button>
        </div>
      </div>
    </div>

    <!-- 弹出层 -->
    <el-dialog
      title="选择数据"
      :visible.sync="showSelect"
      width="800px"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <el-tag
        v-for="tag in Object.keys(currentSelect)"
        :key="tag"
        closable
        class="tag"
        size="medium"
        @close="onCurrentTagDel(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-table
        ref="tbl"
        :data="tblData"
        @select="onSelect"
        @select-all="onSelectAll"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="数据名" prop="dataName" />
        <el-table-column label="大小" prop="dataSize" />
        <el-table-column label="上传日期" prop="uploadTime" />
      </el-table>
      <el-pagination
        @current-change="onPageChange"
        :current-page.sync="queryModel.pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryModel.pageSize"
        layout="total,  prev, pager, next"
        :total="tblCnt"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="onShowSelectCancelClick">取 消</el-button>
        <el-button type="primary" @click="onSelectConfirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProcessPic from './img/process.png'
import { datasheetsApi } from '@/service'

export default {
  name: 'TaskDetail',

  data() {
    return {
      ProcessPic,
      showSelect: false,
      selectedData: [],
      currentSelect: {},
      queryModel: {
        pageIndex: 1,
        pageSize: 1
      },
      tblCnt: 0,
      tblData: []
    }
  },

  methods: {
    onTagDel(index) {
      this.selectedData.splice(index, 1)
    },

    onCurrentTagDel(tag) {
      delete this.currentSelect[tag]
      this.$forceUpdate()
      const rows = this.tblData.filter(row => {
        return row.dataName === tag
      })
      rows.forEach(row => {
        this.$refs.tbl.toggleRowSelection(row, false)
      })
    },

    async onShowSelectClick() {
      this.queryModel.pageIndex = 1
      this.tblCnt = 0
      this.tblData = []
      await this.onQuery()
      this.showSelect = true
      this.selectedData.forEach((item) => {
        this.currentSelect[item.dataName] = {
          dataName: item.dataName
        }
      })
      this.handleSelectTable()
    },

    handleSelectTable() {
      const keys = Object.keys(this.currentSelect)
      const rows = this.tblData.filter(row => {
        return keys.includes(row.dataName)
      })
      rows.forEach(row => {
        this.$refs.tbl.toggleRowSelection(row)
      })
    },

    onShowSelectCancelClick() {
      this.currentSelect = {}
      this.showSelect = false
    },

    onSelectConfirmClick() {
      this.selectedData = []
      Object.keys(this.currentSelect).forEach(key => {
        this.selectedData.push({
          dataName: this.currentSelect[key].dataName
        })
      })
      this.showSelect = false
    },

    // 手动勾选时
    onSelect(selection, row) {
      if (this.currentSelect[row.dataName]) {
        delete this.currentSelect[row.dataName]
      } else {
        this.currentSelect[row.dataName] = {
          dataName: row.dataName
        }
      }
      this.$forceUpdate()
    },

    onSelectAll(selection) {
      // 全选
      if (selection.length) {
        selection.forEach((row) => {
          this.currentSelect[row.dataName] = {
            dataName: row.dataName
          }
        })
      } else {
        // 取消全选
        this.tblData.forEach((row) => {
          delete this.currentSelect[row.dataName]
        })
      }
      this.$forceUpdate()
    },

    async onQuery() {
      const { total, data: list } = await datasheetsApi.getDataList(this.queryModel)
      this.tblCnt = total
      // const list = await datasheetsApi.getDataList(this.queryModel)
      this.tblData = list
    },

    async onPageChange() {
      await this.onQuery()
      this.handleSelectTable()
    },

    onStartClick() {
      if (this.selectedData.length === 0) {
        this.$message.error('请先选择数据')
      } else {
        // 调用接口
        // 跳转
      }
    }
  }
}
</script>

<style lang="less" scoped>
.task-detail-wrapper {
  display: flex;
  flex-flow: column nowrap;

  .tag {
    margin-right: 20px;
    margin-bottom: 20px;
  }

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

      .desc {
        color: rgba(0, 0, 0, 0.5);
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
