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
        <el-form-item label="编号" prop="classroomNo">
          <el-input v-model="form.classroomNo" placeholder="请输入教室编码" style="width: 180px" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入教室名称" style="width: 180px" />
        </el-form-item>
        <el-form-item label="所处教学区" prop="teachBuild">
          <el-select v-model="form.teachBuild" style="width: 180px;" placeholder="请选择教学区">
            <el-option
              v-for="item in teachBuildOptions"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="教室容量" prop="capacity">
          <el-input-number v-model="form.capacity" controls-position="right" style="width: 180px;" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.isUsed" style="width: 180px;">
            <el-radio
              v-for="item in dict.classroom_status"
              :key="item.id"
              :label="item.value"
            >{{ item.label }}</el-radio>
          </el-radio-group>
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
      <el-table-column show-overflow-tooltip align="center" prop="classroomNo" label="编码" />
      <el-table-column show-overflow-tooltip align="center" prop="name" label="名称" />
      <el-table-column show-overflow-tooltip align="center" prop="capacity" label="容量" />
      <el-table-column show-overflow-tooltip align="center" prop="teachBuild" label="所属教学区">
        <template slot-scope="scope">
          <span>{{ scope.row.teachBuild.name }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="isUsed" label="状态">
        <template slot-scope="scope">
          <span>{{ dict.label.classroom_status[scope.row.isUsed] }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="remarks" label="备注" />
      <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建日期" />
      <el-table-column v-if="checkPer(['admin','classroom:edit','classroom:del'])" label="操作" width="150px" align="center">
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
import crudClassroom from '@/api/enter/classroom'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
import { getAllTeachBuild } from '@/api/enter/teachBuild'
const defaultForm = { id: null, classroomNo: null, name: null, teachBuild: null, capacity: 999, isUsed: 'false', remarks: null }
export default {
  name: 'Classroom',
  components: { pagination, crudOperation, rrOperation, udOperation, DateRangePicker },
  dicts: ['classroom_status'],
  cruds() {
    return CRUD({ title: '教室', url: 'api/classroom', crudMethod: { ...crudClassroom }})
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      teachBuildOptions: [],
      permission: {
        add: ['admin', 'classroom:add'],
        edit: ['admin', 'classroom:edit'],
        del: ['admin', 'classroom:del']
      },
      rules: {
        classroomNo: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入教室名称', trigger: 'blur' }
        ],
        capacity: [
          { required: true, message: '请输入教室容量', trigger: 'blur', type: 'number' }
        ],
        teachBuild: [
          { required: true, message: '请选择所属教学区', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getAllTeachBuild()
  },
  methods: {
    async getAllTeachBuild() {
      this.teachBuildOptions = await getAllTeachBuild()
    },
    [CRUD.HOOK.beforeSubmit]() {
      this.form.teachBuild = { id: this.form.teachBuild }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
