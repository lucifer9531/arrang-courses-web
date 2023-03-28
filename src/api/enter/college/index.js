import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/college',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/college',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/college',
    method: 'put',
    data
  })
}

export function getAllCollege() {
  return request({
    url: 'api/college/all',
    method: 'get'
  })
}

export function getCollegeById(id) {
  return request({
    url: `api/college/${id}`,
    method: 'get'
  })
}

export default { add, edit, del }
