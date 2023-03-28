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
        <el-form-item label="编号" prop="collegeNo">
          <el-input v-model="form.collegeNo" placeholder="请输入教室编码" style="width: 180px" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" style="width: 180px" />
        </el-form-item>
        <el-form-item label="所处教学区" prop="teachBuild">
          <el-select v-model="form.teachBuild" value-key="id" style="width: 180px;" placeholder="请选择教学区">
            <el-option
              v-for="item in teachBuildOptions"
              :key="item.id"
              :value="item"
              :label="item.name"
            />
          </el-select>
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
      <el-table-column show-overflow-tooltip align="center" prop="collegeNo" label="编码" />
      <el-table-column show-overflow-tooltip align="center" prop="name" label="名称" />
      <el-table-column show-overflow-tooltip align="center" prop="teachBuild" label="所属教学区">
        <template slot-scope="scope">
          <span>{{ scope.row.teachBuild.name }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="teachers" label="教师">
        <template slot-scope="scope">
          <span>{{ scope.row | teachersFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="remarks" label="备注" />
      <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建日期" />
      <el-table-column v-if="checkPer(['admin','collage:edit','collage:del'])" label="操作" width="150px" align="center">
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
import crudCollege from '@/api/enter/college'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
import { getAllTeachBuild } from '@/api/enter/teachBuild'
const defaultForm = { id: null, collegeNo: null, teachBuild: null, name: '', remarks: null }
export default {
  name: 'College',
  components: { pagination, crudOperation, rrOperation, udOperation, DateRangePicker },
  cruds() {
    return CRUD({ title: '学院', url: 'api/college', crudMethod: { ...crudCollege }})
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  // eslint-disable-next-line vue/order-in-components
  filters: {
    teachersFilter(data) {
      const temp = []
      if (!data.teachers.length) return ''
      data.teachers.forEach(item => temp.push(item.name))
      return temp.join(',')
    }
  },
  data() {
    return {
      teachBuildOptions: [],
      permission: {
        add: ['admin', 'collage:add'],
        edit: ['admin', 'collage:edit'],
        del: ['admin', 'collage:del']
      },
      rules: {
        collegeNo: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入学院名称', trigger: 'blur' }
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
      const { id, name, teachBuildNo } = this.form.teachBuild
      this.form.teachBuild = Object.assign({}, { id, name, teachBuildNo })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
