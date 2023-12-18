import request from '@/utils/request'

/**
 * 获取AI场景算力节点接口
 */
export const getAINode = async (data) => {
  const res = await request({
    method: 'get',
    url: '/province/CNode/ailist',
    data
  })
  return res
}

export const getEdgeNode = async (data) => {
  const res = await request({
    method: 'get',
    url: '/province/CNode/agentlist',
    data
  })
  return res
}

export const getAIBusiness = async (data) => {
  const res = await request({
    method: 'get',
    url: '/province/AIBusiness/list',
    data
  })
  return res
}

export const getAITask = async (data) => {
  const res = await request({
    method: 'get',
    url: '/province/AITask/list',
    data
  })
  return res
}

export const getAgentBusiness = async (data) => {
  const res = await request({
    method: 'get',
    url: '/province/AgentBusiness/list',
    data
  })
  return res
}

export const getAgentTask = async (data) => {
  const res = await request({
    method: 'get',
    url: '/province/AgentTask/list',
    data
  })
  return res
}
