import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/course',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/course',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/course',
    method: 'put',
    data
  })
}

export function getAllCourses() {
  return request({
    url: 'api/course/all',
    method: 'get'
  })
}

export default { add, edit, del }
