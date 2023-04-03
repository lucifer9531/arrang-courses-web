import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/classTask',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/classTask',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/classTask',
    method: 'put',
    data
  })
}

export function autoSchedule(data) {
  return request({
    url: 'api/classTask/classScheduling',
    method: 'post',
    data
  })
}

export default { add, edit, del }
