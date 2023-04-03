import request from '@/utils/request'

export function getCoursePlan(params) {
  return request({
    url: 'api/coursePlan',
    method: 'get',
    params
  })
}
