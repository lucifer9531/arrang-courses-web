<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <date-range-picker v-model="query.createTime" class="date-item" />
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <!--表单组件-->
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="650px">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="100px">
        <el-form-item label="编号" prop="teacherNo">
          <el-input v-model="form.teacherNo" placeholder="请输入教师编码" style="width: 180px" />
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" placeholder="请输入教师名字" style="width: 180px" />
        </el-form-item>
        <el-form-item label="所处学院" prop="college">
          <el-select v-model="form.college" value-key="id" style="width: 180px;" placeholder="请选择学院">
            <el-option
              v-for="item in collegeOptions"
              :key="item.id"
              :value="item"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="form.age" controls-position="right" style="width: 180px;" />
        </el-form-item>
        <el-form-item label="头衔">
          <el-input v-model="form.title" placeholder="请输入教室属性" style="width: 180px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%" @selection-change="crud.selectionChangeHandler">
      <el-table-column show-overflow-tooltip align="center" type="selection" width="55" />
      <el-table-column show-overflow-tooltip align="center" prop="teacherNo" label="编码" />
      <el-table-column show-overflow-tooltip align="center" prop="name" label="名字" />
      <el-table-column show-overflow-tooltip align="center" prop="college" label="所属学院">
        <template slot-scope="scope">
          <span>{{ scope.row.college.name }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="age" label="年龄" />
      <el-table-column show-overflow-tooltip align="center" prop="title" label="职称" />
      <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建日期" />
      <el-table-column v-if="checkPer(['admin','teacher:edit','teacher:del'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
import crudTeacher from '@/api/enter/teacher'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
import {getAllCollege, getCollegeById} from '@/api/enter/college'
const defaultForm = { id: null, teacherNo: null, name: null, college: null, age: null, title: null }
export default {
  name: 'Teacher',
  components: { pagination, crudOperation, rrOperation, udOperation, DateRangePicker },
  cruds() {
    return CRUD({ title: '教师', url: 'api/teacher', crudMethod: { ...crudTeacher }})
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      collegeOptions: [],
      permission: {
        add: ['admin', 'teacher:add'],
        edit: ['admin', 'teacher:edit'],
        del: ['admin', 'teacher:del']
      },
      rules: {
        teacherNo: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        college: [
          { required: true, message: '请选择所属学院', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getAllCollege()
  },
  methods: {
    async getAllCollege() {
      this.collegeOptions = await getAllCollege()
    },
    async getCollegeById(collegeId) {
      const { teachBuild: { id, name, teachBuildNo }} = await getCollegeById(collegeId)
      this.form.college.teachBuild = { id, name, teachBuildNo }
    },
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.getCollegeById(form.college.id)
    },
    [CRUD.HOOK.beforeSubmit]() {
      const { collegeNo, name, id, teachBuild } = this.form.college
      this.form.college = Object.assign({}, { id, name, collegeNo, teachBuild: { id: teachBuild.id, name: teachBuild.name, teachBuildNo: teachBuild.teachBuildNo }})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
