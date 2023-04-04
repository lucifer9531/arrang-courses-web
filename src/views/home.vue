<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <panel-group :data="groupData" />
      <panel-group-t />
      <div class="divBox">
        <el-card :bordered="false" dis-hover>
          <div slot="header">
            <div class="ace-row row-middle">
              <el-avatar
                icon="el-icon-s-operation"
                size="small"
                style="color: #1890ff; background: #e6f7ff; font-size: 13px"
              />
              <span class="ivu-pl-8">统计</span>
            </div>
          </div>
          <el-row :gutter="24">
            <el-col
              :xl="8"
              :lg="8"
              :md="24"
              :sm="24"
              :xs="24"
              class="ivu-mb mb10 dashboard-console-visit"
            >
              <span class="ivu-pl-8">学院分析</span>
              <bar-chart :chart-data="collegeData" />
            </el-col>
            <el-col
              :xl="8"
              :lg="8"
              :md="24"
              :sm="24"
              :xs="24"
              class="ivu-mb mb10 dashboard-console-visit"
            >
              <span class="ivu-pl-8">教室分析</span>
              <line-chart :chart-data="classroomData" />
            </el-col>
            <el-col
              :xl="8"
              :lg="8"
              :md="24"
              :sm="24"
              :xs="24"
              class="ivu-mb mb10 dashboard-console-visit"
            >
              <span class="ivu-pl-8">教师分析</span>
              <pie-chart :chart-data="teacherData" />
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import PanelGroupT from './dashboard/PanelGroupT'
import LineChart from './dashboard/LineChart.vue'
import PieChart from './dashboard/PieChart.vue'
import BarChart from './dashboard/BarChart'
import { getAllTeachBuild } from '@/api/enter/teachBuild'
import { getAllCollege } from '@/api/enter/college'
import { getAllClass } from '@/api/enter/classes'
import { getAllCourses } from '@/api/enter/course'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    PanelGroupT,
    LineChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      collegeData: {},
      classroomData: {},
      teacherData: {},
      groupData: {
        teachBuildCount: 0,
        collegeCount: 0,
        classesCount: 0,
        courseData: 0
      }
    }
  },
  mounted() {
    this.getAllTeachBuild()
    this.getAllCollege()
    this.getAllClass()
    this.getAllCourses()
  },
  methods: {
    async getAllTeachBuild() {
      const data = await getAllTeachBuild()
      this.groupData.teachBuildCount = data.length
      this.handleData(data)
    },
    async getAllCollege() {
      const data = await getAllCollege()
      this.groupData.collegeCount = data.length
      this.handleCollegeData(data)
    },
    async getAllClass() {
      const data = await getAllClass()
      this.groupData.classesCount = data.length
    },
    async getAllCourses() {
      const data = await getAllCourses()
      this.groupData.courseData = data.length
    },
    handleCollegeData(data) {
      const legendData = []
      const seriesData = []
      data.forEach(item => {
        legendData.push(item.name)
        seriesData.push({
          value: item.teachers.length,
          name: item.name
        })
      })
      this.teacherData = { legendData, seriesData }
    },
    handleData(data) {
      const xData = []
      const yData = []
      const classrooms = []
      data.forEach(item => {
        xData.push(item.name)
        yData.push(item.colleges.length)
        classrooms.push(item.classroom.length)
      })
      this.collegeData = { xData, yData }
      this.classroomData = { xData, yData: classrooms }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 18px 22px 22px 22px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.ace-row {
  ::v-deep .el-avatar--small {
    width: 22px;
    height: 22px;
    line-height: 22px;
  }
}
.checkTime {
  ::v-deep .el-radio__input {
    display: none;
  }
}
.ivu-pl-8 {
  margin-left: 8px;
  font-size: 14px;
}
.dashboard-console-visit {
  ::v-deep .el-card__header {
    padding: 14px 20px !important;
  }
  ul {
    li {
      list-style-type: none;
      margin-top: 12px;
    }
  }
}
.ivu-mb {
  margin-bottom: 10px;
}
</style>
