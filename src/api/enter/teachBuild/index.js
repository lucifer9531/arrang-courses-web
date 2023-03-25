import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/teachBuild',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/teachBuild',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/teachBuild',
    method: 'put',
    data
  })
}

export function getAllTeachBuild() {
  return request({
    url: 'api/teachBuild/all',
    method: 'get'
  })
}

export default { add, edit, del }
