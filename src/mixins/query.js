
import { mapGetters, mapActions } from 'vuex'

const queryMixin = {
  data () {
    return {
      querySchema: [],
      queryModel: {
        pageIndex: 1,
        pageSize: 10
      },
      tblData: [],
      tblCnt: 0,
      maxHeight: null,
      localQueryForm: {
        isShow: false
      }
    }
  },

  methods: {
    ...mapActions(['delCachedView']),

    onQuery () { },

    onQueryClick () {
      this.queryModel.pageIndex = 1
      this.onQuery(1)
    },

    onPageSizeChange (val) {
      this.queryModel.pageSize = val
      this.queryModel.pageIndex = 1
      this.onQuery()
    }
  },

  computed: {
    ...mapGetters(['language']),

    showQuery () {
      return this.localQueryForm.isShow
    }
  }
}

export default queryMixin
