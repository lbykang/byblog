<template>
  <div class="about">
    <h1>This is an questionnaire page</h1>
    <div :style="{ width: '50%', margin: '0 0 0 25%', height: '100px' }">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row v-for="(item, index) in ruleForm.qList" :key="index">
          <div style="margin-top: 15px;">
            <h3 style="margin: 15px 0 0 50px;">问题{{ index + 1 }}：</h3>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              v-if="ruleForm.qList.length > 1"
              size="medium"
              style="float: right;"
              @click="removeRow(index)"
            >
            </el-button>
            <div style="width: 70%; margin-left: 10%;">
              <el-form-item label="问题" prop="question">
                <el-input v-model="item.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="选项A" prop="answerA">
                <el-input
                  v-model="item.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="选项B" prop="answerB">
                <el-input v-model.number="item.age"></el-input>
              </el-form-item>
              <el-form-item label="选项C" prop="answerC">
                <el-input v-model.number="item.age"></el-input>
              </el-form-item>
              <el-form-item label="选项D" prop="answerD">
                <el-input v-model.number="item.age"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-row>
        <el-row>
          <el-button type="primary" size="medium" @click="addRow"
            >新增属性</el-button
          >
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        qList: [
          {
            question: "",
            answerA: "",
            answerB: "",
            answerC: "",
            answerD: "",
          },
        ],
      },
    };
  },
  methods: {
    // 添加属性列
    addRow() {
      this.ruleForm.qList.push({
        question: "",
        answerA: "",
        answerB: "",
        answerC: "",
        answerD: "",
      });
    },
    // 删除属性列
    removeRow(index) {
      this.ruleForm.qList.splice(index, 1);
    },
    submitForm(formName) {
      console.log("error submit!!" + formName);
      return false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
.table_container {
  padding: 20px;
}
.fillcontain {
  height: 100%;
  width: 100%;
  background: aliceblue;
}
</style>
