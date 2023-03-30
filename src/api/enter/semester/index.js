import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/semester',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/semester',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/semester',
    method: 'put',
    data
  })
}

export function getAllSemester() {
  return request({
    url: 'api/semester/all',
    method: 'get'
  })
}

export default { add, edit, del }
