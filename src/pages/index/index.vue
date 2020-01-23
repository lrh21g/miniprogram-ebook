<template>
  <Global>
    <div class="home" v-if="prepare && authorized && !loading">
      <SearchBar disabled
        :hotSearch="hotSearch && hotSearch.keyword"
        @onClick="onSearchBarClick" />
      <HomeCard :data="homeCardData"
        :num="shelfCount"
        :hasSign="hasSign"
        :signDay="continueSignDay"
        @onBookClick="gotoBookDetail"
        @onSignClick="onSignClick" />
      <AdImage :data="adImage" v-if="adImage"></AdImage>
    </div>
  </Global>
</template>

<script>
import Global from '../../components/Global'
import SearchBar from '../../components/SearchBar'
import HomeCard from '../../components/HomeCard'
import AdImage from '../../components/AdImage'

export default {
  name: 'index',
  components: {
    Global, SearchBar, HomeCard, AdImage
  }
}
</script>

<style scoped>
</style>
