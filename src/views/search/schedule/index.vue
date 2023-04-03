<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="9" :sm="6" :md="5" :lg="4" :xl="4">
        <div class="class-list">
          <span v-for="(item, index) in classData" :key="index" :class="item.isActive ? 'active-bg' : ''" @click.prevent="handleClick(item.label)">
            {{ item.label }}
          </span>
        </div>
      </el-col>
      <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
        <div class="head-container">
          <div v-if="crud.props.searchToggle">
            <el-input
              v-model="query.semester"
              clearable
              size="small"
              placeholder="输入学期搜索"
              style="width: 200px;"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            />
            <rrOperation />
          </div>
        </div>
        <!--表格渲染-->
        <el-table ref="table" border :data="data" style="width: 100%">
          <el-table-column align="center" prop="week" label="节次/星期" />
          <el-table-column align="center" prop="monday" label="星期一" />
          <el-table-column align="center" prop="tuesday" label="星期二" />
          <el-table-column align="center" prop="wednesday" label="星期三" />
          <el-table-column align="center" prop="thursday" label="星期四" />
          <el-table-column align="center" prop="friday" label="星期五" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CRUD, { presenter, header, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getCoursePlan } from '@/api/search/schedule'
import { handleCourseData } from '@/views/search/schedule/data'

export default {
  name: 'Index',
  components: { rrOperation },
  mixins: [presenter(), header(), crud()],
  cruds() {
    return CRUD({ queryOnPresenterCreated: false })
  },
  data() {
    return {
      classData: [],
      data: [],
      sourceData: []
    }
  },
  mounted() {
    this.getCoursePlan()
  },
  methods: {
    async getCoursePlan() {
      const data = await getCoursePlan()
      const { tableData, course } = handleCourseData(data)
      this.sourceData = tableData
      course.forEach((item, index) => {
        this.classData.push({
          label: item,
          isActive: index === 0
        })
      })
      this.data = this.sourceData.filter(item => item.class === course[0])
    },
    handleClick(data) {
      // eslint-disable-next-line no-return-assign
      this.classData.map(it => it.isActive = it.label === data)
      this.data = this.sourceData.filter(item => item.class === data)
    }
  }
}
</script>

<style lang="scss" scoped>
.class-list {
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-flow: column nowrap;

  span {
    display: inline-block;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    height: 28px;
    line-height: 28px;
    margin: 5px;
    padding-left: 8px;
    border-radius: 3px;
  }
}

.active-bg {
  background: #ccc;
}
</style>
