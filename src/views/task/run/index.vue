<template>
  <div class="task-detail-wrapper">
    <div class="process-wrapper">
      <h1>{{$t('taskMgt.add.title')}}</h1>
      <img :src="ProcessPic" alt />
    </div>
    <div class="op-wrap">
      <h1>{{$t('taskMgt.add.selData')}}</h1>
      <div class="content-wrapper">
        {{$t('taskMgt.add.selected')}}:
        <el-tag
          v-for="(tag, index) in selectedData"
          :key="tag.dataName"
          closable
          class="tag"
          size="medium"
          @close="onTagDel(index)"
        >{{ tag.dataName }}</el-tag>
        <el-button
          type="primary"
          size="medium"
          @click="onShowSelectClick"
        >{{$t('taskMgt.add.selData')}}</el-button>
        <div class="desc">
          <p>{{$t('taskMgt.add.cautions')}}:</p>
          <ul>
            <li>{{$t('taskMgt.add.desc1')}}</li>
            <li>{{$t('taskMgt.add.desc2')}}</li>
            <li>{{$t('taskMgt.add.desc3')}}</li>
            <li>{{$t('taskMgt.add.desc4')}}</li>
          </ul>
        </div>
        <div class="btn-wrapper">
          <el-button
            size="medium"
            type="primary"
            @click="onStartClick"
          >{{$t('taskMgt.add.startRun')}}</el-button>
        </div>
      </div>
    </div>

    <!-- 弹出层 -->
    <el-dialog
      :title="$t('taskMgt.add.selData')"
      :append-to-body="true"
      :modal-append-to-body="false"
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
      >{{ tag }}</el-tag>
      <el-table
        style="width: 100%"
        ref="tbl"
        :data="tblData"
        @select="onSelect"
        @select-all="onSelectAll"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column :label="$t('dataMgt.lists.name')" prop="dataName" />
        <el-table-column :label="$t('dataMgt.lists.size')" prop="dataSize">
          <template slot-scope="scope">
            <span>{{ ((scope.row.dataSize)/Math.pow(1024,3)).toFixed(2) }}G</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dataMgt.lists.upDate')" prop="uploadTime" />
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
        <el-button @click="onShowSelectCancelClick">{{$t('base.cancel')}}</el-button>
        <el-button type="primary" @click="onSelectConfirmClick">{{$t('base.sure')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProcessPic from './img/process.png'
import { datasheetsApi, taskApi } from '@/service'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'TaskDetail',

  data () {
    return {
      ProcessPic,
      showSelect: false,
      selectedData: [],
      currentSelect: {},
      queryModel: {
        pageIndex: 1,
        pageSize: 10
      },
      tblCnt: 0,
      tblData: []
    }
  },
  mounted () {
    this.selectedData = (this.$route.query && this.$route.query.list) ? JSON.parse(this.$route.query.list) : []
  },
  computed: {
    ...mapGetters(['language'])
  },
  methods: {
    ...mapMutations({
      delTag: 'del_visited_views'
    }),

    onTagDel (index) {
      this.selectedData.splice(index, 1)
    },

    onCurrentTagDel (tag) {
      delete this.currentSelect[tag]
      this.$forceUpdate()
      const rows = this.tblData.filter(row => {
        return row.dataName === tag
      })
      rows.forEach(row => {
        this.$refs.tbl.toggleRowSelection(row, false)
      })
    },

    async onShowSelectClick () {
      this.queryModel.pageIndex = 1
      this.tblCnt = 0
      this.tblData = []
      this.currentSelect = {}
      await this.onQuery()
      this.showSelect = true
      this.selectedData.forEach((item) => {
        this.currentSelect[item.dataName] = {
          dataName: item.dataName,
          userId: item.userId
        }
      })
      this.handleSelectTable()
    },

    handleSelectTable () {
      if (this.tblData) {
        const keys = Object.keys(this.currentSelect)
        const rows = this.tblData.filter(row => {
          return keys.includes(row.dataName)
        })
        this.$nextTick(() => {
          rows.forEach(row => {
            this.$refs.tbl.toggleRowSelection(row)
          })
        })
      }
    },

    onShowSelectCancelClick () {
      this.currentSelect = {}
      this.showSelect = false
    },

    onSelectConfirmClick () {
      this.selectedData = []
      Object.keys(this.currentSelect).forEach(key => {
        this.selectedData.push({
          dataName: this.currentSelect[key].dataName,
          userId: this.currentSelect[key].userId
        })
      })
      this.showSelect = false
    },

    // 手动勾选时
    onSelect (selection, row) {
      if (this.currentSelect[row.dataName]) {
        delete this.currentSelect[row.dataName]
      } else {
        this.currentSelect[row.dataName] = {
          dataName: row.dataName,
          userId: row.userId
        }
      }
      this.$forceUpdate()
    },

    onSelectAll (selection) {
      // 全选
      if (selection.length) {
        selection.forEach((row) => {
          this.currentSelect[row.dataName] = {
            dataName: row.dataName,
            userId: row.userId
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

    async onQuery () {
      try {
        const { total, data: list } = await datasheetsApi.getDataList(this.queryModel)
        this.tblCnt = total
        this.tblData = list
      } catch (error) {
        this.$message.error(error)
      }
    },

    async onPageChange () {
      await this.onQuery()
      this.handleSelectTable()
    },

    onStartClick () {
      if (this.selectedData.length !== 2) {
        this.$message.error(this.$t('taskMgt.add.tips1'))
      } else {
        this.$confirm(this.$t('taskMgt.add.tips3'), this.$t('base.tips'), {
          confirmButtonText: this.$t('base.sure'),
          cancelButtonText: this.$t('base.cancel'),
          type: 'warning'
        }).then(async () => {
        // 运行任务
          try {
          // 调用接口
            const list = this.selectedData.map(item => {
              return {
                dataName: item.dataName,
                userId: item.userId,
                filePath: item.filePath
              }
            })
            const postData = { list }
            const result = await taskApi.runTask(postData)
            // 跳转
            if (result) {
              this.delTag(this.$route)
              this.$router.push('/task/list')
            } else {
              this.$message.error(this.$t('taskMgt.add.tips2'))
            }
          } catch (error) {
            this.$message.error(error)
          }
        }).catch(() => { })
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
      padding-left: 20px;
      padding-right: 20px;
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
<style>
.el-table__header {
  width: 100% !important;
}
.el-table__body {
  width: 100% !important;
}
</style>
