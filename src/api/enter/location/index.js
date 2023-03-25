import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/location',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/location',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/location',
    method: 'put',
    data
  })
}

export function getAllLocation() {
  return request({
    url: 'api/location/all',
    method: 'get'
  })
}

export default { add, edit, del }
