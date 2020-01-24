<template>
  <div class="home-preload">
    <div class="search-bar">
      <div class="search-bar-input"></div>
    </div>
    <div class="home-card">
      <div class="inner">
        <div class="userinfo">
          <div class="avatar"></div>
          <div class="nickname"></div>
          <div class="hint"></div>
        </div>
        <div class="book-wrapper">
          <div class="img-wrapper">
            <div class="img"></div>
            <div class="img"></div>
            <div class="img"></div>
          </div>
          <div class="shelf-wrapper">
            <div class="shelf"></div>
            <div class="icon"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
      <div class="img"></div>
    </div>
    <div class="home-data">
      <div class="header"></div>
      <div class="content">
        <div class="row">
          <div class="book-wrapper">
            <div class="book"></div>
            <div class="title"></div>
          </div>
          <div class="book-wrapper">
            <div class="book"></div>
            <div class="title"></div>
          </div>
          <div class="book-wrapper">
            <div class="book"></div>
            <div class="title"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-data">
      <div class="header"></div>
      <div class="content">
        <div class="row">
          <div class="book-wrapper">
            <div class="book"></div>
            <div class="title"></div>
          </div>
          <div class="book-wrapper">
            <div class="book"></div>
            <div class="title"></div>
          </div>
          <div class="book-wrapper">
            <div class="book"></div>
            <div class="title"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .home-preload {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;

    .search-bar {
      padding: 10px 15px;
      height: 35px;
      .search-bar-input {
        width: 100%;
        height: 100%;
        background: #f2f2f2;
        border-radius: 20px;
        padding: 2px 15px;
        box-sizing: border-box;
      }
    }

    .home-card {
      position: relative;
      width: 100%;
      padding: 27px 15px 10px 15px;
      box-sizing: border-box;
      .inner {
        color: white;
        background: #505050;
        border-radius: 10px;
        padding: 20px 15px;
        .userinfo {
          display: flex;
          align-items: center;
          .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #f5f5f5;
          }
          .nickname {
            width: 20px;
            height: 12px;
            background: #f4f4f4;
            margin-left: 10px;
          }
          .hint {
            width: 120px;
            height: 12px;
            background: #aaa;
            margin-left: 10px;
          }
        }
        .book-wrapper {
          display: flex;
          padding-top: 10px;
          .img-wrapper {
            flex: 1;
            display: flex;
            justify-content: space-between;
            .img {
              width: 80px;
              height: 105px;
              background: #f4f4f4;
            }
          }
          .shelf-wrapper {
            display: flex;
            flex: 0 0 auto;
            align-items: center;
            padding-left: 15px;
            .shelf {
              display: flex;
              width: 12px;
              height: 14px;
              background: #f4f4f4;
            }
            .icon {
              width: 15px;
            }
          }
        }
      }
    }
    .banner {
      padding: 10px 15px;
      .img {
        width: 100%;
        height: 125px;
        border-radius: 10px;
        background: #f2f2f2;
      }
    }
    .home-data {
      width: 100%;
      padding: 10px 0;
      box-sizing: border-box;
      margin-top: 15px;
      .header {
        width: 80px;
        height: 22px;
        margin-left: 15px;
        background: #ddd;
      }
      .content {
        padding: 20px 7.5px;
        .row {
          display: flex;
          flex-flow: row nowrap;
          .book-wrapper {
            padding: 0 7.5px;
            box-sizing: border-box;
            width: 33.33%;
            height: 150px;
            .book {
              width: 100%;
              height: 100%;
              background: #f2f2f2;
            }
            .title {
              width: 100%;
              height: 20px;
              background: #d9d9d9;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
</style>
