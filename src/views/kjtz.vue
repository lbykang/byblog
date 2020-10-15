<template>
  <fm-making-form ref="makingform" style="height: 500px;" preview generate-code generate-json>
    <template slot="action">
    </template>
  </fm-making-form>
</template>

<script>
export default {
  methods: {
    /**获取设计器json数据**/
    getjson () {
      return this.$refs.makingform.getJSON()
    }
  }
}
</script>