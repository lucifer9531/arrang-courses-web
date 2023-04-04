<template>
  <div class="divBox">
    <el-row :gutter="24" class="dashboard-console-grid">
      <el-col v-bind="grid" class="ivu-mb">
        <el-card :bordered="false">
          <router-link :to="{ path: '/enter/teachBuild' }">
            <i class="el-icon-office-building" style="color: #69c0ff" />
            <p>教学区管理</p>
          </router-link>
        </el-card>
      </el-col>
      <el-col v-bind="grid" class="ivu-mb">
        <el-card :bordered="false">
          <router-link :to="{ path: '/enter/college' }">
            <i class="el-icon-school" style="color: #95de64" />
            <p>学院管理</p>
          </router-link>
        </el-card>
      </el-col>
      <el-col v-bind="grid" class="ivu-mb">
        <el-card :bordered="false">
          <router-link :to="{ path: '/enter/classroom' }">
            <i class="el-icon-house" style="color: #ff9c6e" />
            <p>教室管理</p>
          </router-link>
        </el-card>
      </el-col>
      <el-col v-bind="grid" class="ivu-mb">
        <el-card :bordered="false">
          <router-link :to="{ path: '/enter/teacher' }">
            <i class="el-icon-user" style="color: #b37feb" />
            <p>教师管理</p>
          </router-link>
        </el-card>
      </el-col>
      <el-col v-bind="grid" class="ivu-mb">
        <el-card :bordered="false">
          <router-link :to="{ path: '/enter/classes' }">
            <i class="el-icon-coordinate" style="color: #ffd666" />
            <p>班级管理</p>
          </router-link>
        </el-card>
      </el-col>
      <el-col v-bind="grid" class="ivu-mb">
        <el-card :bordered="false">
          <router-link :to="{ path: '/enter/course' }">
            <i class="el-icon-reading" style="color: #5cdbd3" />
            <p>课程管理</p>
          </router-link>
        </el-card>
      </el-col>
      <el-col v-bind="grid" class="ivu-mb">
        <el-card :bordered="false">
          <router-link :to="{ path: '/schedule/task' }">
            <i class="el-icon-time" style="color: #ff85c0" />
            <p>排课管理</p>
          </router-link>
        </el-card>
      </el-col>
      <el-col v-bind="grid" class="ivu-mb">
        <el-card :bordered="false">
          <router-link :to="{ path: '/search/classSchedule' }">
            <i class="el-icon-document" style="color: #ffc069" />
            <p>课表管理</p>
          </router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      grid: {
        xl: 3,
        lg: 3,
        md: 6,
        sm: 8,
        xs: 8
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
.ivu-mb {
  margin-bottom: 10px;
}
.divBox {
  // padding: 0 20px !important;
}
.dashboard-console-grid {
  text-align: center;
  .ivu-card-body {
    padding: 0;
  }
  i {
    font-size: 32px;
  }
  a {
    display: block;
    color: inherit;
  }
  p {
    margin-top: 8px;
  }
}
</style>
