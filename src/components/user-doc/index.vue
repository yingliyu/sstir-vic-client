<!--文本图片组件-->
<template>
  <div class="document-wrapper">
    <div v-for="(item, index) in list" :key="index" class="item-wrapper">
      <h1 class="title" :style="{'text-align':titleAlign}">
          {{item.title}}
      </h1>
      <ul v-if="item.sub">
        <li v-for="(data, index) in item.sub" :key="index">
          <h4 v-if="data.subtitle" class="sub-title">
            {{data.subtitle}}
          </h4>
          <div v-if="data.content" class="content">
            <div
              v-for="(node, index) in data.content"
              :key="index"
              >
                <component
                :is="node.type"
                v-if="node.type==='p'"
                v-html="node.desc"
                />
                <div v-if="node.type==='img'" class="img-wrapper" >
                  <component
                  :is="node.type"
                  :width='imgW'
                  :src="node.url"
                  />
                </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDocument',

  props: {
    list: {
      type: Array
    },
    titleAlign: {
      type: String
    },
    imgW: {
      type: [Number, String]
    }
  }
}
</script>

<style lang="less" scoped>
.document-wrapper{
  .item-wrapper{
    padding:20px 0;
    .title{
      margin-top:15px;
      margin-bottom:50px;
      font-size: 28px;
      font-weight: 700;
    }
    .sub-title{
      margin: 25px 0;
      font-size: 24px;
    }
    .content{
      font-size: 16px;
      line-height: 27px;
      color: #333;
      table-layout: fixed;
      word-wrap: break-word;
      word-break: normal;
      text-align:justify;
      text-justify:inter-ideograph;
      p{
        margin:20px 0;
      }
    }
    .img-wrapper{
      display: flex;
      justify-content: center;
      padding: 30px 0;
      img{
        box-shadow: 0px 9px 26.88px 5.12px rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>
