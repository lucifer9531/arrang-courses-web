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
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="750px">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="100px">
        <el-form-item label="学期" prop="semester">
          <el-select v-model="form.semester" style="width: 220px;" placeholder="请选择学期">
            <el-option
              v-for="item in semesterOptions"
              :key="item.id"
              :value="item.semester"
              :label="item.semester"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学院" prop="collegeNo">
          <el-select v-model="form.collegeNo" style="width: 220px;" placeholder="请选择学院" @change="changeCollege">
            <el-option
              v-for="item in collegeOptions"
              :key="item.id"
              :value="item.collegeNo"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classNo">
          <el-select v-model="form.classNo" style="width: 220px;" placeholder="请选择班级" @change="changeClass">
            <el-option
              v-for="item in classOptions"
              :key="item.id"
              :value="item.classNo"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程" prop="courseNo">
          <el-select v-model="form.courseNo" style="width: 220px;" placeholder="请选择课程" @change="changeCourse">
            <el-option
              v-for="item in courseOptions"
              :key="item.id"
              :value="item.courseNo"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="教师" prop="teacherNo">
          <el-select v-model="form.teacherNo" style="width: 220px;" placeholder="请选择教师">
            <el-option
              v-for="item in teacherOptions"
              :key="item.id"
              :value="item.teacherNo"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程属性">
          <el-input v-model="form.courseAttr" disabled placeholder="请选择课程" style="width: 220px" />
        </el-form-item>
        <el-form-item label="学生人数">
          <el-input v-model="form.studentNumber" disabled placeholder="请选择班级" style="width: 220px" />
        </el-form-item>
        <el-form-item label="周学时" prop="weeksSum">
          <el-input-number v-model="form.weeksSum" controls-position="right" placeholder="请输入周学时" style="width: 220px" />
        </el-form-item>
        <el-form-item label="周数" prop="weeksNumber">
          <el-input-number v-model="form.weeksNumber" controls-position="right" placeholder="请输入周数" style="width: 220px" />
        </el-form-item>
        <el-form-item label="是否固定">
          <el-radio-group v-model="form.isFix">
            <el-radio
              v-for="item in dict.task_status"
              :key="item.id"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.isFix === '2'" label="课程时间" prop="classTime">
          <treeselect v-model="form.classTime" :limit="1" :multiple="true" :options="treeData" style="width: 220px" />
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
      <el-table-column show-overflow-tooltip align="center" prop="semester" label="学期" />
      <el-table-column show-overflow-tooltip align="center" prop="collegeNo" label="学院" />
      <el-table-column show-overflow-tooltip align="center" prop="classNo" label="班级" />
      <el-table-column show-overflow-tooltip align="center" prop="courseNo" label="课程" />
      <el-table-column show-overflow-tooltip align="center" prop="teacherNo" label="教师" />
      <el-table-column show-overflow-tooltip align="center" prop="courseAttr" label="课程属性" />
      <el-table-column show-overflow-tooltip align="center" prop="studentNumber" label="学生人数" />
      <el-table-column show-overflow-tooltip align="center" prop="weeksSum" label="周学时" />
      <el-table-column show-overflow-tooltip align="center" prop="weeksNumber" label="周数" />
      <el-table-column show-overflow-tooltip align="center" prop="isFix" label="是否固定">
        <template slot-scope="scope">
          <span>{{ dict.label.task_status[scope.row.isFix] }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="classTime" label="上课时间" />
      <el-table-column v-if="checkPer(['admin','task:edit','task:del'])" label="操作" width="150px" align="center">
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
import crudClassTask from '@/api/schedule/task'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
import { getAllSemester } from '@/api/enter/semester'
import { getAllCollege, getCollegeById } from '@/api/enter/college'
import { getAllClass } from '@/api/enter/classes'
import { getAllCourses } from '@/api/enter/course'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { treeData } from '@/views/schedule/task/data'

const defaultForm = { id: null, semester: null, collegeNo: null, classNo: null, courseNo: null, teacherNo: null, courseAttr: null,
  studentNumber: null, weeksSum: 40, weeksNumber: 4, isFix: '0', classTime: null }
export default {
  name: 'Task',
  components: { Treeselect, pagination, crudOperation, rrOperation, udOperation, DateRangePicker },
  dicts: ['task_status'],
  cruds() {
    return CRUD({ title: '教学任务', url: 'api/classTask', crudMethod: { ...crudClassTask }})
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      treeData,
      semesterOptions: [],
      collegeOptions: [],
      classOptions: [],
      courseOptions: [],
      teacherOptions: [],
      permission: {
        add: ['admin', 'task:add'],
        edit: ['admin', 'task:edit'],
        del: ['admin', 'task:del']
      },
      rules: {
        semester: [
          { required: true, message: '请选择学期', trigger: 'change' }
        ],
        collegeNo: [
          { required: true, message: '请选择学院', trigger: 'change' }
        ],
        classNo: [
          { required: true, message: '请选择班级', trigger: 'change' }
        ],
        courseNo: [
          { required: true, message: '请选择课程', trigger: 'change' }
        ],
        teacherNo: [
          { required: true, message: '请选择教师', trigger: 'change' }
        ],
        weeksSum: [
          { required: true, message: '请输入周学时', trigger: 'blur', type: 'number' }
        ],
        weeksNumber: [
          { required: true, message: '请输入周数', trigger: 'blur', type: 'number' }
        ]
      }
    }
  },
  mounted() {
    this.getAllSemester()
    this.getAllCollege()
    this.getAllClass()
    this.getAllCourses()
  },
  methods: {
    async getAllSemester() {
      this.semesterOptions = await getAllSemester()
    },
    async getAllCollege() {
      this.collegeOptions = await getAllCollege()
    },
    async getAllClass() {
      this.classOptions = await getAllClass()
    },
    async getAllCourses() {
      this.courseOptions = await getAllCourses()
    },
    async getCollegeById(id) {
      const { teachers } = await getCollegeById(id)
      this.teacherOptions = teachers
    },
    changeCollege(val) {
      const temp = this.collegeOptions.filter(item => item.collegeNo === val)
      this.getCollegeById(temp[0].id)
    },
    changeCourse(val) {
      const temp = this.courseOptions.filter(item => item.courseNo === val)
      this.form.courseAttr = temp[0].courseAttr
    },
    changeClass(val) {
      const temp = this.classOptions.filter(item => item.classNo === val)
      this.form.studentNumber = temp[0].volume
    },
    handleStr(str) {
      const list = []
      for (let i = 0; i < str.length; i++) {
        list.push(str.substring(i, i + 2))
      }
      return list
    },
    [CRUD.HOOK.beforeSubmit]() {
      if (!this.form.classTime.length) return
      this.form.classTime = this.form.classTime.toString().replace(/,/g, '')
    },
    [CRUD.HOOK.beforeToEdit]() {
      if (!this.form.classTime) return
      this.form.classTime = this.handleStr(this.form.classTime)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
