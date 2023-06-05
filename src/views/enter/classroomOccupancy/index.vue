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
        <el-form-item label="教室名称" prop="classroomId">
          <el-select v-model="form.classroomId" style="width: 180px;" placeholder="请选择教室">
            <el-option
              v-for="item in classroomOptions"
              :key="item.id"
              :value="item.id"
              :label="item.classroomNo"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="开始时间"
            value-format="yyyy-MM-dd HH:mm"
            style="width: 180px;"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm"
            style="width: 180px;"
          />
        </el-form-item>
        <el-form-item label="教室活动">
          <el-input v-model="form.courseName" placeholder="请输入教室活动" style="width: 180px;" />
        </el-form-item>
        <el-form-item label="组织者">
          <el-input v-model="form.instructorName" placeholder="请输入组织者" style="width: 180px" />
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
      <el-table-column show-overflow-tooltip align="center" type="selection" width="55" />
      <el-table-column show-overflow-tooltip align="center" prop="classroomName" label="教室名称" />
      <el-table-column show-overflow-tooltip align="center" prop="startTime" label="开始时间" />
      <el-table-column show-overflow-tooltip align="center" prop="endTime" label="结束时间" />
      <el-table-column show-overflow-tooltip align="center" prop="courseName" label="教室活动" />
      <el-table-column show-overflow-tooltip align="center" prop="instructorName" label="组织者" />
      <el-table-column show-overflow-tooltip align="center" prop="remarks" label="备注" />
      <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建日期" />
      <el-table-column v-if="checkPer(['admin','classroomOccupancy:edit','classroomOccupancy:del'])" label="操作" width="150px" align="center">
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
import crudClassroomOccupancy from '@/api/enter/classroomOccupancy'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
import { getAllClassRoom } from '@/api/enter/classroom'
const defaultForm = { id: null, classroomId: null, classroomName: null, startTime: null, endTime: null, courseName: null, instructorName: null, remarks: null }
export default {
  name: 'Classroom',
  components: { pagination, crudOperation, rrOperation, udOperation, DateRangePicker },
  cruds() {
    return CRUD({ title: '教室', url: 'api/classroomOccupancy', crudMethod: { ...crudClassroomOccupancy }})
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      classroomOptions: [],
      permission: {
        add: ['admin', 'classroomOccupancy:add'],
        edit: ['admin', 'classroomOccupancy:edit'],
        del: ['admin', 'classroomOccupancy:del']
      },
      rules: {
        classroomId: [
          { required: true, message: '请选择教室', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getAllClassroom()
  },
  methods: {
    async getAllClassroom() {
      this.classroomOptions = await getAllClassRoom()
    },
    [CRUD.HOOK.beforeSubmit]() {
      this.form.classroomName = this.classroomOptions.filter(item => item.id === this.form.classroomId)[0].classroomNo
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
