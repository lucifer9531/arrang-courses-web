<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.name" clearable placeholder="输入课程名字搜索" style="width: 200px" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker v-model="query.createTime" class="date-item" />
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <!--表单组件-->
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="650px">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="100px">
        <el-form-item label="编号" prop="courseNo">
          <el-input v-model="form.courseNo" placeholder="请输入编号" style="width: 180px" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择课程类型" style="width: 180px;">
            <el-option
              v-for="item in dict.course_type"
              :key="item.id"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" style="width: 180px;" />
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.publisher" placeholder="请输入出版社" style="width: 180px;" />
        </el-form-item>
        <el-form-item label="课程状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择课程状态" style="width: 180px;">
            <el-option
              v-for="item in dict.course_status"
              :key="item.id"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="优先级">
          <el-input-number v-model.number="form.level" controls-position="right" placeholder="请输入优先级" style="width: 180px" />
        </el-form-item>
        <el-form-item label="学时">
          <el-input-number v-model.number="form.hour" controls-position="right" placeholder="请输入学时" style="width: 180px" />
        </el-form-item>
        <el-form-item label="学分">
          <el-input-number v-model.number="form.credit" controls-position="right" placeholder="请输入学分" style="width: 180px" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入备注" style="width: 180px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%" @selection-change="crud.selectionChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column show-overflow-tooltip prop="courseNo" label="编号" />
      <el-table-column show-overflow-tooltip prop="type" label="类型">
        <template slot-scope="scope">
          <span>{{ dict.label.course_type[scope.row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="name" label="名称" />
      <el-table-column show-overflow-tooltip align="center" prop="publisher" label="出版社" />
      <el-table-column show-overflow-tooltip align="center" prop="status" label="课程状态">
        <template slot-scope="scope">
          <span>{{ dict.label.course_status[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="level" label="优先级" />
      <el-table-column show-overflow-tooltip align="center" prop="hour" label="学时" />
      <el-table-column show-overflow-tooltip align="center" prop="credit" label="学分" />
      <el-table-column show-overflow-tooltip align="center" prop="remarks" label="备注" />
      <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建日期" />
      <el-table-column v-if="checkPer(['admin','course:edit','course:del'])" label="操作" width="150px" align="center">
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
import crudCourse from '@/api/enter/course'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
const defaultForm = { id: null, courseNo: null, type: null, name: null, publisher: null, status: null, level: null, hour: 60, credit: 60, remarks: null }
export default {
  name: 'Course',
  components: { pagination, crudOperation, rrOperation, udOperation, DateRangePicker },
  dicts: ['course_type', 'course_status'],
  cruds() {
    return CRUD({ title: '课程', url: 'api/course', crudMethod: { ...crudCourse }})
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      permission: {
        add: ['admin', 'course:add'],
        edit: ['admin', 'course:edit'],
        del: ['admin', 'course:del']
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        courseNo: [
          { required: true, message: '请输入课程编号', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择课程类型', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择课程状态', trigger: 'change' }
        ]
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
