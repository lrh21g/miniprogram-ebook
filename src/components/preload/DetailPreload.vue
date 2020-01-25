<template>
  <div class="detail-preload">
    <div class="detail-info">
      <div class="detail-info-l">
        <div class="book-img"></div>
      </div>
      <div class="detail-info-r">
        <div class="book-title"></div>
        <div class="book-title2"></div>
        <div class="book-author"></div>
        <div class="book-author2"></div>
        <div class="book-category"></div>
      </div>
    </div>
    <div class="detail-stat">
      <div class="detail-stat-l">
        <div class="detail-stat-rate-wrapper"></div>
        <div class="detail-stat-rate-hint"></div>
      </div>
      <div class="detail-stat-r">
        <div class="detail-stat-num-wrapper"></div>
        <div class="detail-stat-readers"></div>
      </div>
    </div>
    <div class="detail-rate">
      <div class="detail-rate-text"></div>
    </div>
    <div class="detail-contents-wrapper">
      <div class="detail-contents-title"></div>
      <div class="detail-contents">
        <div class="detail-contents-label"></div>
      </div>
      <div class="detail-contents">
        <div class="detail-contents-label"></div>
      </div>
      <div class="detail-contents">
        <div class="detail-contents-label"></div>
      </div>
      <div class="detail-contents">
        <div class="detail-contents-label"></div>
      </div>
      <div class="detail-contents">
        <div class="detail-contents-label"></div>
      </div>
      <div class="detail-contents">
        <div class="detail-contents-label"></div>
      </div>
      <div class="detail-contents">
        <div class="detail-contents-label"></div>
      </div>
      <div class="detail-contents">
        <div class="detail-contents-label"></div>
      </div>
      <div class="detail-contents">
        <div class="detail-contents-label"></div>
      </div>
      <div class="detail-contents">
        <div class="detail-contents-label"></div>
      </div>
    </div>
    <div class="detail-bottom">
      <div class="detail-btn"></div>
      <div class="detail-btn"></div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .detail-preload {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;

    .detail-info {
      display: flex;
      padding: 10px 15px;

      .detail-info-l {
        padding-right: 15px;

        .book-img {
          width: 100px;
          height: 130px;
          background: #d5d5d5;
        }
      }

      .detail-info-r {
        flex: 1;
        overflow: hidden;

        .book-title, .book-title2 {
          height: 18px;
          background: #ccc;
        }

        .book-title2 {
          margin-top: 10px;
        }

        .book-author {
          height: 16px;
          background: #ddd;
          margin-top: 15px;
        }

        .book-author2 {
          height: 16px;
          background: #ddd;
          margin-top: 10px;
        }

        .book-category {
          height: 14px;
          background: #eee;
          margin-top: 10px;
        }
      }
    }

    .detail-stat {
      display: flex;
      padding: 10px 15px;

      .detail-stat-l {
        flex: 1;
        padding-right: 7.5px;

        .detail-stat-rate-wrapper {
          height: 20px;
          background: #ddd;
        }

        .detail-stat-rate-hint {
          height: 20px;
          background: #ddd;
          margin-top: 5px;
        }
      }

      .detail-stat-r {
        flex: 1;
        padding-left: 7.5px;

        .detail-stat-num-wrapper {
          height: 20px;
          background: #ddd;
        }

        .detail-stat-readers {
          height: 20px;
          background: #ddd;
          margin-top: 5px;
        }
      }
    }

    .detail-rate {
      padding: 10px 15px;

      .detail-rate-text {
        height: 20px;
        background: #d9d9d9;
      }
    }

    .detail-contents-wrapper {
      padding: 0 15px 60px 15px;
      margin-top: 15px;

      .detail-contents-title {
        width: 100px;
        height: 20px;
        background: #d9d9d9;
      }

      .detail-contents {
        padding: 20px 15px 0 15px;

        .detail-contents-label {
          height: 16px;
          background: #f2f2f2;
        }
      }
    }

    .detail-bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 60px;
      background: #fff;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0 15px;
      border-top: 1px solid #eee;
      box-shadow: 0 -2px 0 rgba(250, 250, 250, .9);
      .detail-btn {
        flex: 1;
        width: 100%;
        height: 40px;
        border-radius: 50px;
        background: #d9d9d9;
        &:first-child {
          margin-right: 7.5px;
        }
        &:last-child {
          margin-left: 7.5px;
        }
      }
    }
  }
</style>
