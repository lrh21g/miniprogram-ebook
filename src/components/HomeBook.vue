<template>
  <div class="home-book" :style="{background: linearBg ? 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 100%)' : '#fff'}">
    <div class="home-book-header" v-if="showTitle">{{title}}</div>
    <div :class="!showTitle ? 'home-book-content home-book-no-header' : 'home-book-content'">
      <div v-for="(item, index) in bookData" :key="index" class="home-book-row">
        <div v-for="(book, bookIndex) in item" :key="bookIndex"
          class="home-book-col"
          :style="{ flex: '0 0 ' + (100 / col) + '%' }" @click="() => onBookClick(book)">
          <!-- 排列方式(mode)为 列模式(col) 或者 行模式(row)  -->
          <div v-if="mode === modeCol || mode === modeRow" class="book-wrapper"
            :style="{ flexDirection: mode === modeCol ? 'column' : 'row' }">
            <ImageView :src="book.cover"></ImageView>
            <div class="book-title-wrapper book-title-col" v-if="mode === modeCol">
              <!-- 排列方式为 列模式(col) -->
              <div class="book-title">{{book.title}}</div>
            </div>
            <div class="book-title-wrapper book-title-row" v-else>
              <!-- 排列方式为 行模式(row) -->
              <div class="book-title">{{book.title}}</div>
              <div class="book-title book-author">{{book.author}}</div>
              <div class="book-title book-author">{{book.categoryText}}</div>
            </div>
          </div>
          <!-- 排列方式(mode)为 书籍分类(category) -->
          <div v-else class="category-wrapper">
            <div class="category-text">{{book.text}}</div>
            <div class="category-num">{{book.num}}本书</div>
            <div class="category-img-wrapper">
              <div class="category-img1">
                <ImageView :src="book.cover"></ImageView>
              </div>
              <div class="category-img2">
                <ImageView :src="book.cover2"></ImageView>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-book-footer" v-if="showBtn">
      <BaseButton round custom-class="home-book-btn" @click="onMoreClick" :text="btnText" />
    </div>
  </div>
</template>

<script>
  import {
    HOMEBOOK_MODE
  } from '@/utils/const'
  import ImageView from './base/ImageView'
  import BaseButton from './base/BaseButton'

  export default {
    props: {
      title: { // 头部 title 文本
        type: String,
        default: ''
      },
      data: Array,
      btnText: { // 底部 btn 文本
        type: String,
        default: ''
      },
      col: { // x行
        type: Number,
        default: 1
      },
      row: { // X列
        type: Number,
        default: 0
      },
      mode: { // 排列模式：row(行模式)、col(列模式)、category(书籍分类模式)
        type: String,
        default: HOMEBOOK_MODE.COL
      },
      showTitle: { // 是否显示头部 title
        type: Boolean,
        default: true
      },
      showBtn: { // 是否显示尾部 btn
        type: Boolean,
        default: true
      },
      linearBg: { // 背景是否渐变处理
        type: Boolean,
        default: false
      }
    },
    components: {
      BaseButton,
      ImageView
    },
    computed: {
      bookData () {
        if (this.data && this.data.length > 0) {
          const number = this.row * this.col // 总数量：row(列) * col(行)
          const _bookData = this.data.slice(0, number)
          const _bookDataByRow = []
          let _row = 0
          // 对数据进行分割，以列(row)为单位，分割为二维数组
          while (_row < this.row) {
            _bookDataByRow.push(_bookData.slice(_row * this.col, _row * this.col + this.col))
            _row++
          }
          console.log('bookData(_bookDataByRow)：', _bookDataByRow)
          return _bookDataByRow
        } else {
          return []
        }
      },
      // 排列模式：行模式
      modeRow () {
        return HOMEBOOK_MODE.ROW
      },
      // 排列模式：列模式
      modeCol () {
        return HOMEBOOK_MODE.COL
      },
      modeCategory () {
        return HOMEBOOK_MODE.CATEGORY
      }
    },
    methods: {
      onMoreClick () {
        this.$emit('onMoreClick')
      },
      onBookClick (book) {
        console.log('onBookClick')
        this.$emit('onBookClick', book)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-book {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    margin-top: 15px;

    .home-book-header {
      font-size: 21px;
      font-weight: 500;
      color: #212933;
      padding: 0 15px;
    }

    .home-book-content {
      padding: 20px 7.5px;

      &.home-book-no-header {
        padding: 0 7.5px 20px;
      }

      .home-book-row {
        display: flex;
        flex-flow: row nowrap;
        margin-top: 10px;

        &:first-child {
          margin-top: 0;
        }

        .home-book-col {
          padding: 0 7.5px;
          box-sizing: border-box;

          .book-wrapper {
            display: flex;
            flex-wrap: nowrap;
            width: 100%;

            .book-title-wrapper {
              &.book-title-col {
                margin-top: 10px;
              }

              &.book-title-row {
                flex: 0 0 50%;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }

              .book-title {
                font-size: 12px;
                color: #212731;
                line-height: 14px;
                max-height: 28px;
                overflow: hidden;
                word-break: break-word;
                font-weight: 500;

                &.book-author {
                  color: #999;
                  margin-top: 3px;
                  max-height: 14px;
                }
              }
            }
          }

          .category-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #f5f5f5;
            border-radius: 10px;
            height: 120px;
            padding: 15px;
            box-sizing: border-box;

            .category-text {
              flex: 1;
              font-size: 16px;
              font-weight: 500;
              color: #333;
            }

            .category-num {
              font-size: 12px;
              color: #999;
            }

            .category-img-wrapper {
              position: absolute;
              right: 0;
              bottom: 0;
              border-radius: 0 0 10px 0;

              .category-img1 {
                position: absolute;
                right: 0;
                bottom: 0;
                z-index: 100;
                width: 60px;
                border-radius: 0 0 10px 0;
              }

              .category-img2 {
                position: absolute;
                right: 30px;
                bottom: 0;
                z-index: 90;
                width: 50px;
              }
            }
          }
        }
      }
    }

    .home-book-footer {
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
    }
  }

</style>

<style lang="scss">
  .category-img1 {
    .image {
      border-radius: 0 0 10px 0;
    }
  }
  .home-book-footer {
    .home-book-btn {
      width: 100%;
      font-size: 14px;
      color: #3696EF;
      background-color: #fff;
      border: 1px solid #EDEEEE;
    }
  }
</style>
