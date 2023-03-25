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
        <el-form-item label="编码" prop="teachBuildNo">
          <el-input v-model="form.teachBuildNo" placeholder="请输入教学区编码" style="width: 370px" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入教学区名称" style="width: 370px" />
        </el-form-item>
        <el-form-item label="位置" prop="location">
          <el-select v-model="form.location" style="width: 370px;" placeholder="请选择位置">
            <el-option
              v-for="item in locationOptions"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
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
      <el-table-column show-overflow-tooltip align="center" prop="teachBuildNo" label="编码" />
      <el-table-column show-overflow-tooltip align="center" prop="name" label="名称" />
      <el-table-column show-overflow-tooltip align="center" prop="location" label="所在位置">
        <template slot-scope="scope">
          <span>{{ scope.row.location.name }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="classroom" label="教室">
        <template slot-scope="scope">
          <span>{{ scope.row | classroomFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="remarks" label="备注" />
      <el-table-column show-overflow-tooltip align="center" prop="createTime" label="创建日期" />
      <el-table-column show-overflow-tooltip align="center" prop="createBy" label="创建人" />
      <el-table-column show-overflow-tooltip align="center" prop="updateTime" label="更新日期" />
      <el-table-column show-overflow-tooltip align="center" prop="updateBy" label="更新人" />
      <el-table-column v-if="checkPer(['admin','teachBuild:edit','teachBuild:del'])" label="操作" width="150px" align="center">
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
import crudTeachBuild from '@/api/enter/teachBuild'
import CRUD, { crud, form, header, presenter } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
import { getAllLocation } from '@/api/enter/location'

const defaultForm = { id: null, teachBuildNo: null, location: null, remarks: '', name: null }
export default {
  name: 'TeachBuild',
  components: { pagination, crudOperation, rrOperation, udOperation, DateRangePicker },
  cruds() {
    return CRUD({ title: '教学区', url: 'api/teachBuild', crudMethod: { ...crudTeachBuild }})
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      locationId: '',
      locationOptions: [],
      permission: {
        add: ['admin', 'teachBuild:add'],
        edit: ['admin', 'teachBuild:edit'],
        del: ['admin', 'teachBuild:del']
      },
      rules: {
        teachBuildNo: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入班级名称', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请选择位置', trigger: 'change' }
        ]
      }
    }
  },
  // eslint-disable-next-line vue/order-in-components
  filters: {
    classroomFilter(data) {
      const temp = []
      if (!data.classroom.length) return ''
      data.classroom.forEach(item => temp.push(item.name))
      return temp.join(',')
    }
  },
  mounted() {
    this.getAllLocation()
  },
  methods: {
    async getAllLocation() {
      this.locationOptions = await getAllLocation()
    },
    [CRUD.HOOK.beforeSubmit]() {
      this.form.location = { id: this.form.location }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
