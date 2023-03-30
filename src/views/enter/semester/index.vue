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
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="470px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="55px">
        <el-form-item label="学期" prop="semester">
          <el-input v-model="form.semester" placeholder="请输入学期" style="width: 370px" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks" type="textarea" placeholder="请输入备注" style="width: 370px" />
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
      <el-table-column show-overflow-tooltip align="center" prop="remarks" label="备注" />
      <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建日期" />
      <el-table-column show-overflow-tooltip align="center" prop="createBy" label="创建人" />
      <el-table-column show-overflow-tooltip align="center" prop="updateTime" label="更新日期" />
      <el-table-column show-overflow-tooltip align="center" prop="updateBy" label="更新人" />
      <el-table-column v-if="checkPer(['admin','semester:edit','semester:del'])" label="操作" width="150px" align="center">
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
import crudSemester from '@/api/enter/semester'
import CRUD, { crud, form, header, presenter } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'

const defaultForm = { id: null, semester: null, remarks: '' }
export default {
  name: 'Semester',
  components: { pagination, crudOperation, rrOperation, udOperation, DateRangePicker },
  cruds() {
    return CRUD({ title: '学期', url: 'api/semester', crudMethod: { ...crudSemester }})
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      locationId: '',
      locationOptions: [],
      permission: {
        add: ['admin', 'semester:add'],
        edit: ['admin', 'semester:edit'],
        del: ['admin', 'semester:del']
      },
      rules: {
        semester: [
          { required: true, message: '请输入学期', trigger: 'blur' }
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
