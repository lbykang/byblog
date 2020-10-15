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

      <div class="questions" v-for="(qs, index) in questionList.question" :key="index">
        <div class="qs-left">
          <p class="qs-title">
            {{qs.num}}&nbsp;{{qs.title}}&nbsp;{{getMsg(qs)}}
          </p>
          <p v-for="option in qs.options" class="option" :key="option">
            <label>
              <input 
              type="radio" 
              :name="`${qs.num}-${qs.title}`"
              v-if="qs.type === 'radio'">
              <input 
              type="checkbox" 
              :name="`${qs.num}-${qs.title}`"
              v-if="qs.type === 'checkbox'">{{option}}
            </label>
          </p>
          <textarea 
          v-if="qs.type === 'textarea'"></textarea>
        </div>
        <div class="qs-right">
          <label><input type="checkbox" :value="qs.isNeed" v-model="qs.isNeed">
          此题是否必填</label>
          <p>
            <span v-if="index !== 0" @click="goUp(index)">上移</span>
            <span @click="goDown(index)">下移</span>
            <span @click="copy(index, qs)">复用</span>
            <span @click="del(index)">删除</span>
          </p>
        </div>
      </div>
      <div class="add">
        <transition name="slide">
          <div class="add-option" v-if="showBtn">
            <button @click="addRadio">单选</button>
            <button @click="addCheckbox">多选</button>
            <button @click="addTextarea">文本框</button>
          </div>
        </transition>
        <div class="add-item" @click="addItemClick">
          <span class="add-icon" >+</span><span>添加问题</span>
        </div>
      </div>
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
          <el-dialog title="查看" :visible.sync="dialogFormVisibleCk">
      
          <el-input >1515151</el-input>

    </el-dialog>
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
      showBtn:true,
      dialogFormVisibleCk: false,

  questionList:
{ 'num': 1, 
            'title': '第一份问卷', 
            'time': '2030-1-1', 
            'state': 'inissue', 
            'stateTitle': '发布中', 
            'checked': false, 
            'question': [
              {'num': 'Q1', 'title': '单选题', 'type': 'radio', 'isNeed': true, 'options': ['选项一', '选项二']},
              {'num': 'Q2', 'title': '多选题', 'type': 'checkbox', 'isNeed': true, 'options': ['选项一', '选项二', '选项三', '选项四']},
              {'num': 'Q3', 'title': '文本题', 'type': 'textarea', 'isNeed': true}
            ]
          },
    question:{
      type: "radio",
      label: "問題1",
      required: "true",
      options: [ //选项
        {
          label: "选项1内容",
          value: "选项1值"
        }
      ] 
    }
    }
  },
  methods: {
    swapItems(oldIndex, newIndex) {
      let [newVal] = this.qsItem.question.splice(newIndex, 1, this.qsItem.question[oldIndex])
      this.qsItem.question.splice(oldIndex, 1, newVal)
    },
    goUp(index) {
      this.swapItems(index, index - 1)
    },
    goDown(index) {
      this.swapItems(index, index + 1)
    },
        getMsg(item) {
      let msg = ''
      if (item.type === 'radio') {
        msg = '(单选题)'
      } else if (item.type === 'checkbox') {
        msg = '(多选题)'
      } else {
        msg = '(文本题)'
      }

      return item.isNeed ? `${msg} *` : msg
    },
    // 添加属性列
    addRow() {
      this.dialogFormVisibleCk = true;
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

<style lang="scss">
@import '../../style/QS-edit';
.table_container {
  padding: 20px;
}
.fillcontain {
  height: 100%;
  width: 100%;
  background: aliceblue;
}

</style>
