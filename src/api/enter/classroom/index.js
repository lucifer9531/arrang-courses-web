import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/classroom',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/classroom',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/classroom',
    method: 'put',
    data
  })
}

export function getAllClassRoom() {
  return request({
    url: 'api/classroom/all',
    method: 'get'
  })
}

export default { add, edit, del }
