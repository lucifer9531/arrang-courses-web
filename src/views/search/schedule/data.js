const weekData = [
  { id: '01', week: 'monday', festival: '1.2节' },
  { id: '02', week: 'monday', festival: '3.4节' },
  { id: '03', week: 'monday', festival: '5.6节' },
  { id: '04', week: 'monday', festival: '7.8节' },
  { id: '05', week: 'monday', festival: '9.10节' },
  { id: '06', week: 'tuesday', festival: '1.2节' },
  { id: '07', week: 'tuesday', festival: '3.4节' },
  { id: '08', week: 'tuesday', festival: '5.6节' },
  { id: '09', week: 'tuesday', festival: '7.8节' },
  { id: '10', week: 'tuesday', festival: '9.10节' },
  { id: '11', week: 'wednesday', festival: '1.2节' },
  { id: '12', week: 'wednesday', festival: '3.4节' },
  { id: '13', week: 'wednesday', festival: '5.6节' },
  { id: '14', week: 'wednesday', festival: '7.8节' },
  { id: '15', week: 'wednesday', festival: '9.10节' },
  { id: '16', week: 'thursday', festival: '1.2节' },
  { id: '17', week: 'thursday', festival: '3.4节' },
  { id: '18', week: 'thursday', festival: '5.6节' },
  { id: '19', week: 'thursday', festival: '7.8节' },
  { id: '20', week: 'thursday', festival: '9.10节' },
  { id: '21', week: 'friday', festival: '1.2节' },
  { id: '22', week: 'friday', festival: '3.4节' },
  { id: '23', week: 'friday', festival: '5.6节' },
  { id: '24', week: 'friday', festival: '7.8节' },
  { id: '25', week: 'friday', festival: '9.10节' }
]

const handleCourseData = data => {
  const tableData = []
  const tableDataObj = {}
  const course = []
  data.forEach(a => {
    const week = weekData.find(b => b.id === a.classTime)
    if (!tableDataObj[a.classNo]) {
      tableDataObj[a.classNo] = [{
        key: a.id,
        id: a.id,
        [week.week]: `${a.courseNo}(${a.classroomNo}室--${a.teacherNo})`,
        class: a.classNo,
        week: week.festival
      }]
    } else {
      tableDataObj[a.classNo].push({
        key: a.id,
        id: a.id,
        [week.week]: `${a.courseNo}(${a.classroomNo}室--${a.teacherNo})`,
        class: a.classNo,
        week: week.festival
      })
    }
    if (course.indexOf(a.classNo) === -1) course.push(a.classNo)
  })
  const tableList = Object.keys(tableDataObj)

  tableList.forEach(a => {
    tableData.push(
      { week: '1.2节', class: a, key: '1.2节' + a },
      { week: '3.4节', class: a, key: '3.4节' + a },
      { week: '5.6节', class: a, key: '5.6节' + a },
      { week: '7.8节', class: a, key: '7.8节' + a },
      { week: '9.10节', class: a, key: '9.10节' + a }
    )
  })

  data.forEach(b => {
    const findWeek = weekData.find(w => w.id === b.classTime)
    tableData.forEach(a => {
      if (b.classNo === a.class && findWeek.festival === a.week) {
        a[findWeek.week] = `${b.courseNo}(${b.classroomNo}室--${b.teacherNo})`
        a.id = b.id
      }
    })
  })

  return { tableData, course }
}

export {
  handleCourseData
}
