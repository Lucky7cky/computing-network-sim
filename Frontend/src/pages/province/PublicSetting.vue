<template>
  <div :key="$route.params.scene">
    <SearchTable v-if="$route.params.scene == 'visualInspection'" v-bind="nodeListData1" />
    <SearchTable v-if="$route.params.scene == 'visualInspection'" v-bind="topoListData1" />
    <SearchTable v-if="$route.params.scene == 'visualInspection'" v-bind="bussinessListData1" />
    <!-- <SearchTable v-if="$route.params.scene == 'visualInspection'" v-bind="taskListData1" /> -->
    <SearchTable v-if="$route.params.scene == 'visualInspection'" v-bind="taskFlowListData1" />
    <SearchTable v-if="$route.params.scene == 'edgeIotAgent'" v-bind="nodeListData2" />
    <SearchTable v-if="$route.params.scene == 'edgeIotAgent'" v-bind="topoListData2" />
    <SearchTable v-if="$route.params.scene == 'edgeIotAgent'" v-bind="bussinessListData2" />
    <!-- <SearchTable v-if="$route.params.scene == 'edgeIotAgent'" v-bind="taskListData2" /> -->
    <SearchTable v-if="$route.params.scene == 'edgeIotAgent'" v-bind="taskFlowListData2" />
    <SearchTable v-if="$route.params.scene == 'newEnergyConsume'" v-bind="nodeListData3" />
    <SearchTable v-if="$route.params.scene == 'newEnergyConsume'" v-bind="topoListData3" />
    <SearchTable v-if="$route.params.scene == 'newEnergyConsume'" v-bind="bussinessListData3" />
    <!-- <SearchTable v-if="$route.params.scene == 'newEnergyConsume'" v-bind="taskListData3" /> -->
    <SearchTable v-if="$route.params.scene == 'newEnergyConsume'" v-bind="taskFlowListData3" />
  </div>
</template>

<script setup>
import {
  NodeData1,
  TopoData1,
  ServiceData1,
  TaskData1,
  TaskFlowData1,
  NodeData2,
  TopoData2,
  ServiceData2,
  TaskData2,
  TaskFlowData2,
  NodeData3,
  TopoData3,
  ServiceData3,
  TaskData3,
  TaskFlowData3
} from '../../common/data/province/newEnergyConsume'
import SearchTable from '../../components/SearchTable.vue'
import { getAINode, getEdgeNode, getAIBusiness, getAITask, getAgentBusiness, getAgentTask } from '@/api/index'
import { onBeforeMount, computed, ref, reactive } from 'vue'

const getAINodeData = async () => {
  const res = await getAINode()
  return res
}
const getEdgeNodeData = async () => {
  const res = await getEdgeNode()
  return res
}
const getAIBusinessData = async () => {
  const res = await getAIBusiness()
  return res
}
const getAITaskData = async () => {
  const res = await getAITask()
  return res
}
const getAgentBusinessData = async () => {
  const res = await getAgentBusiness()
  return res
}
const getAgentTaskData = async () => {
  const res = await getAgentTask()
  return res
}

let nodeListData1 = ref({});
let nodeListData2 = ref({});
let bussinessListData1 = ref({});
let bussinessListData2 = ref({});

onBeforeMount(() => {
  getAINodeData().then(res => {
    nodeListData1.value = {
      title: '算力节点',
      tableData: res.data,
      label: [
        ['nName', '名称'],
        ['nId', 'ID'],
        ['networkId', '所属子网ID'],
        ['rId', '挂靠路由节点ID'],
        ['nCpu', '算力节点CPU资源总量'],
        ['nGPU', '算力节点GPU资源总量'],
        ['nMem', '算力节点存储资源总量'],
        ['nMemOccupy', '已用存储大小'],
        ['nCpuOccupy', '已用CPU大小'],
        ['nGpuOccupy', '已用GPU大小']
      ]
    }
  })

  getEdgeNodeData().then(res => {
    nodeListData2.value = {
      title: '算力节点',
      tableData: res.data,
      label: [
        ['nName', '名称'],
        ['nId', 'ID'],
        ['networkId', '所属子网ID'],
        ['rId', '挂靠路由节点ID'],
        ['nCpu', '算力节点CPU资源总量'],
        ['nGPU', '算力节点GPU资源总量'],
        ['nMem', '算力节点存储资源总量'],
        ['nMemOccupy', '已用存储大小']
      ]
    }
  })

  getAIBusinessData().then(res1 => {
    getAITaskData().then(res2 => {
      let res = res1.data.map(item1 => {
        let tasks = res2.data;
        let filterTasks = [];
        for (let i = 0; i < tasks.length; i++) {
          let valuex = {};
          for (const key in tasks[i]) {
            if (key != 'key') {
              valuex[key] = tasks[i][key];
            }
          }
          filterTasks.push(valuex);
        }

        return {
          ...item1,
          children: filterTasks
        }
      });

      bussinessListData1.value = {
        title: 'AI视觉检测业务',
        tableData: res,
        label: [
          ['aiId', '业务ID'],
          ['aiNetwork', '子网ID'],
          ['isscheduled', '是否调度完成'],
        ],
        edit: true,
        taskListData: {
          title: 'AI视觉检测子任务',
          tableData: TaskData1,
          label: [
            ['taskId', '子任务ID'],
            ['taskAiId', '子任务所属业务ID'],
            ['taskType', '子任务类型'],
            ['taskCpuNeed', 'CPU需求'],
            ['taskGpuNeed', 'GPU需求'],
            ['taskMemNeed', '存储需求'],
            ['taskNId', '子任务部署算力节点ID'],
          ],
          edit: true,
        }
      }
    })
  })

  getAgentBusinessData().then(res1 => {
    getAgentTaskData().then(res2 => {
      let res = res1.data.map(item1 => {
        let tasks = res2.data;
        let filterTasks = [];
        for (let i = 0; i < tasks.length; i++) {
          let valuex = {};
          for (const key in tasks[i]) {
            if (key != 'key') {
              valuex[key] = tasks[i][key];
            }
          }
          filterTasks.push(valuex);
        }

        return {
          ...item1,
          children: filterTasks
        }
      });

      bussinessListData2.value = {
        title: '边缘物联代理业务',
        tableData: res,
        label: [
          ['agentId', '业务ID'],
          ['agentNetwork', '子网ID'],
          ['isscheduled', '是否调度完成'],
        ],
        edit: true,
        taskListData: {
          title: '边缘物联代理子任务',
          tableData: TaskData2,
          label: [
            ['taskId', '子任务ID'],
            ['taskAgentId', '子任务所属业务ID'],
            ['taskCpuNeed', 'CPU需求'],
            ['taskGpuNeed', 'GPU需求'],
            ['taskMemNeed', '存储需求'],
            ['taskBandwNeed', '带宽需求'],
            ['taskNId', '子任务部署算力节点ID'],
          ],
          edit: true
        }
      }
    })
  })
})

const topoListData1 = {
  title: '算网拓扑',
  tableData: TopoData1,
  label: [
    ['nodeName', '节点名称'],
    ['networkId', '所属子网ID'],
    ['neighbors', '邻居信息']
  ]
}
const serviceListData1 = {
  title: 'AI视觉检测业务',
  tableData: ServiceData1,
  label: [
    ['aiId', '业务ID'],
    ['aiStartTime', '开始时间'],
    ['aiEndTime', '终止时间'],
    ['aiNetwork', '子网ID']
  ],
  edit: true
}

const taskFlowListData1 = {
  title: 'AI视觉检测任务流',
  tableData: TaskFlowData1,
  label: [
    ['fId', '业务流ID'],
    ['fSource', '业务流网络源节点'],
    ['fTarget', '业务流网络宿节点'],
    ['fBandwidth', '业务流流量带宽大小'],
    ['fDelayTolerate', '业务流时延容忍度'],
    ['fWeight', '业务流权重大小'],
    ['fRuntime', '业务流运行时长'],
    ['fSuccess', '业务流是否调度成功'],
    ['fState', '业务流状态'],
    ['fDelay', '业务流实际延迟'],
    ['fBearerService', '业务流承载的AI视觉检测任务']
  ],
  edit: true
}

const topoListData2 = {
  title: '算网拓扑',
  tableData: TopoData2,
  label: [
    ['nodeName', '节点名称'],
    ['networkId', '所属子网ID'],
    ['neighbors', '邻居信息']
  ]
}


const taskFlowListData2 = {
  title: '边缘物联代理任务流',
  tableData: TaskFlowData2,
  label: [
    ['fId', '业务流ID'],
    ['fSource', '业务流网络源节点'],
    ['fTarget', '业务流网络宿节点'],
    ['fBandwidth', '业务流流量带宽大小'],
    ['fDelayTolerate', '业务流时延容忍度'],
    ['fWeight', '业务流权重大小'],
    ['fRuntime', '业务流运行时长'],
    ['fSuccess', '业务流是否调度成功'],
    ['fState', '业务流状态'],
    ['fDelay', '业务流实际延迟'],
    ['fBearerService', '业务流承载的边缘物联代理任务']
  ],
  edit: true
}

const nodeListData3 = {
  title: '算力节点',
  tableData: NodeData3,
  label: [
    ['nName', '名称'],
    ['nId', 'ID'],
    ['networkId', '所属子网ID'],
    ['rId', '挂靠路由节点ID'],
    ['nCpu', '算力节点CPU资源总量'],
    ['nGPU', '算力节点GPU资源总量'],
    ['nMem', '算力节点存储资源总量'],
    ['nMemOccupy', '已用存储大小']
  ]
}

const topoListData3 = {
  title: '算网拓扑',
  tableData: TopoData3,
  label: [
    ['nodeName', '节点名称'],
    ['networkId', '所属子网ID'],
    ['neighbors', '邻居信息']
  ]
}
const serviceListData3 = {
  title: '面向新能源消纳场景的业务',
  tableData: ServiceData3,
  label: [
    ['newEnergyId', '业务ID'],
    ['newEnergyStartTime', '开始时间'],
    ['newEnergyEndTime', '终止时间'],
    ['newEnergyNetwork', '子网ID']
  ],
  edit: true
}

const taskListData3 = {
  title: '新能源消纳子任务',
  tableData: TaskData3,
  label: [
    ['taskId', '子任务ID'],
    ['taskBearId', '子任务所属业务ID'],
    ['taskCpuNeed', 'CPU需求'],
    ['taskGpuNeed', 'GPU需求'],
    ['taskMemNeed', '存储需求'],
    ['taskBandwNeed', '带宽需求'],
    ['taskNId', '子任务部署算力节点ID'],
    ['taskEndTime', '子任务结束时间']
  ],
  edit: true
}

const bussinessListData3 = { ...serviceListData3, taskListData: taskListData3 };

const taskFlowListData3 = {
  title: '新能源消纳任务流',
  tableData: TaskFlowData3,
  label: [
    ['fId', '业务流ID'],
    ['subnetID', '子任务所属业务子网ID'],
    ['fSource', '业务流网络源节点'],
    ['fTarget', '业务流网络宿节点'],
    ['fBandwidth', '业务流流量带宽大小'],
    ['fDelayTolerate', '业务流时延容忍度'],
    ['fPriority', '业务流优先级大小'],
    ['fRuntime', '业务流运行时长'],
    ['taskEnergyConsume', '业务运行能耗'],
    ['taskFlowPath', '业务流通道路径'],
    ['slotOccupationIDX', '业务流时隙占用序号'],
    ['fSuccess', '业务流是否调度成功'],
    ['fState', '业务流状态'],
    ['fDelay', '业务流实际延迟'],
    ['fBearerService', '业务流承载的AI视觉检测任务']
  ],
  edit: true
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 1000px;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
