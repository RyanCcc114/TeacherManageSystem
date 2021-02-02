<template>
  <div>
    <!-- Form -->
    <!-- el-dialog 是弹窗样式，title 绑定弹窗的标题内容，visible 绑定弹窗是否展示 -->
    <el-card class="box-card" title="新增">
      <div slot="header" class="clearfix">
        <span>{{form.id ? '编辑' : '新建'}}</span>
      </div>
      
      <!-- model 绑定表单对象，rules 绑定表单规则，ref 用来校验规则 -->
      <el-form :model="form" :rules="formRules" ref="form">
        <el-upload
         class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple label="日期" :label-width="formLabelWidth">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
        <!-- el-form-item 绑定表单样式，label 表单的名称，formLabelWidth 设置 label 的宽度, 设置 prop 来进行规则校验 -->
        <el-form-item label="标题"  prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :label-width="formLabelWidth" type="primary" @click="submitForm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {checkPhoneValidator} from 'utils/validator';
import tableData from './data';

// 下面是 Vue 组件
export default {
  data() {
    return {
      formLabelWidth: '120px', // 表单 label 的宽度
      form: {}, // 用作表单绑定的内容
      formRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    '$route' () {
      // 对路由变化作出响应...
      this.updateFormItem();
    }
  },
  created: function () {
    this.updateFormItem();
  },
  methods: {
    // 获取路由信息，填充
    updateFormItem(){
      const id = this.$route.params.id;
      const formItem = tableData.find(x => x.id === id);
      if(formItem){
        this.form = {...formItem};
      }else{
        this.form = {};
      }
    },
    // 新增/修改一个数据
    updateTableItem(item = {}){
      // 检查是否有 id，有则更新，没有则新增
      if(item.id !== undefined){
        // 更新值
        let itemIndex = tableData.findIndex(x => x.id === item.id);
        if(itemIndex > -1){
          // Vue 中数组更新不能直接使用 array[index] = xxx; 的方式，可以参考https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9
          tableData.splice(itemIndex, 1, {...item});
        }
      }else{
        // 添加到列表中，同时自增 id 
        tableData.push({...item, id: tableData.length + 1});
      }
    },
    // 提交新增/修改表单
    submitForm(){
      // 校验表单
      // Element 表单校验规则配置，请查看https://element.eleme.cn/#/zh-CN/component/form
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 校验通过
          // 更新数据信息
          this.updateTableItem(this.form);
          // 跳转回列表页
          this.$router.push({name: 'contentList'});
        } else {
          // 校验失败
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
