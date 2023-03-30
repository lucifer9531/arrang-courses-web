import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/classes',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/classes',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/classes',
    method: 'put',
    data
  })
}

export function getAllClass() {
  return request({
    url: 'api/classes/all',
    method: 'get'
  })
}

export default { add, edit, del }
