<template>
  <div class="about">
    <head-top></head-top>
    <h1>This is an home page</h1>
  </div>
</template>
<script>
import headTop from "../components/headTop";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
    };
  },
  components: {
    headTop,
  },
  created() {},
  methods: {},
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
</style>