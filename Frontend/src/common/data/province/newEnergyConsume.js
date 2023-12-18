const NodeData1 = [
  {
    nName: '南京',
    nId: '1',
    networkId: 'net1',
    rId: 'r1',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '连云港',
    nId: '2',
    networkId: 'net1',
    rId: 'r2',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '苏州',
    nId: '3',
    networkId: 'net1',
    rId: 'r3',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '昆山',
    nId: '4',
    networkId: 'net1',
    rId: 'r4',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '常州',
    nId: '5',
    networkId: 'net1',
    rId: 'r5',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '无锡',
    nId: '6',
    networkId: 'net1',
    rId: 'r6',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '南通',
    nId: '7',
    networkId: 'net1',
    rId: 'r7',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  }
]

const TopoData1 = [
  {
    nodeName: '南京',
    networkId: 'net1',
    neighbors: {
      neighborName: '连云港',
      linkResourceUsage: 35,
      slotUsage: [1, 2]
    }
  },
  {
    nodeName: '常州',
    networkId: 'net1',
    neighbors: {
      neighborName: '连云港',
      linkResourceUsage: 35,
      slotUsage: [1, 2]
    }
  },
  {
    nodeName: '连云港',
    networkId: 'net1',
    neighbors: {
      neighborName: '南京',
      linkResourceUsage: 35,
      slotUsage: [1, 2]
    }
  }
]

const ServiceData1 = [
  {
    aiId: 'service1',
    aiStartTime: 120932,
    aiEndTime: 123442,
    aiNetwork: 'net1',
    children: [
      {
        taskId: 'task1',
        taskAitId: 'service1',
        taskType: 2,
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      },
      {
        taskId: 'task1',
        taskAitId: 'service1',
        taskType: 2,
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      },
      {
        taskId: 'task1',
        taskAitId: 'service1',
        taskType: 2,
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      }
    ]
  },
  {
    aiId: 'service2',
    aiStartTime: 150934,
    aiEndTime: 223442,
    aiNetwork: 'net1',
    children: [
      {
        taskId: 'task1',
        taskAitId: 'service1',
        taskType: 2,
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      },
      {
        taskId: 'task1',
        taskAitId: 'service1',
        taskType: 2,
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      }
    ]
  },
  {
    aiId: 'service3',
    aiStartTime: 120932,
    aiEndTime: 123442,
    aiNetwork: 'net1',
    children: [
      {
        taskId: 'task1',
        taskAitId: 'service1',
        taskType: 2,
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      }
    ]
  }
]

const TaskData1 = [
  {
    taskId: 'task1',
    taskAitId: 'service1',
    taskType: 2,
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskAitId: 'service1',
    taskType: 2,
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskAitId: 'service1',
    taskType: 2,
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskAitId: 'service1',
    taskType: 2,
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskAitId: 'service1',
    taskType: 2,
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskAitId: 'service1',
    taskType: 2,
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskAitId: 'service1',
    taskType: 2,
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  }
]

const TaskFlowData1 = [
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  }
]

const NodeData2 = [
  {
    nName: '南京',
    nId: '1',
    networkId: 'net1',
    rId: 'r1',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '连云港',
    nId: '2',
    networkId: 'net1',
    rId: 'r2',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '苏州',
    nId: '3',
    networkId: 'net1',
    rId: 'r3',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '昆山',
    nId: '4',
    networkId: 'net1',
    rId: 'r4',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '常州',
    nId: '5',
    networkId: 'net1',
    rId: 'r5',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '无锡',
    nId: '6',
    networkId: 'net1',
    rId: 'r6',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '南通',
    nId: '7',
    networkId: 'net1',
    rId: 'r7',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  }
]

const TopoData2 = [
  {
    nodeName: '南京',
    networkId: 'net1',
    neighbors: {
      neighborName: '连云港',
      linkResourceUsage: 35,
      slotUsage: [1, 2]
    }
  },
  {
    nodeName: '常州',
    networkId: 'net1',
    neighbors: {
      neighborName: '连云港',
      linkResourceUsage: 35,
      slotUsage: [1, 2]
    }
  },
  {
    nodeName: '连云港',
    networkId: 'net1',
    neighbors: {
      neighborName: '南京',
      linkResourceUsage: 35,
      slotUsage: [1, 2]
    }
  }
]

const ServiceData2 = [
  {
    agentId: 'service1',
    agentStartTime: 120932,
    agentEndTime: 123442,
    agentNetwork: 'net1',
    children: [
      {
        taskId: 'task1',
        taskAgentId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2'
      },
      {
        taskId: 'task1',
        taskAgentId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2'
      },
      {
        taskId: 'task1',
        taskAgentId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2'
      }
    ]
  },
  {
    agentId: 'service2',
    agentStartTime: 150934,
    agentEndTime: 223442,
    agentNetwork: 'net1',
    children: [
      {
        taskId: 'task1',
        taskAgentId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2'
      },
      {
        taskId: 'task1',
        taskAgentId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2'
      }
    ]
  },
  {
    agentId: 'service3',
    agentStartTime: 120932,
    agentEndTime: 123442,
    agentNetwork: 'net1',
    children: [
      {
        taskId: 'task1',
        taskAgentId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2'
      }
    ]
  }
]

const TaskData2 = [
  {
    taskId: 'task1',
    taskAgentId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2'
  },
  {
    taskId: 'task1',
    taskAgentId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2'
  },
  {
    taskId: 'task1',
    taskAgentId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2'
  },
  {
    taskId: 'task1',
    taskAgentId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2'
  },
  {
    taskId: 'task1',
    taskAgentId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2'
  },
  {
    taskId: 'task1',
    taskAgentId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2'
  },
  {
    taskId: 'task1',
    taskAgentId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2'
  }
]

const TaskFlowData2 = [
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fWeight: 10,
    fRuntime: 5400,
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  }
]

const NodeData3 = [
  {
    nName: '南京',
    nId: '1',
    networkId: 'net1',
    rId: 'r1',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '连云港',
    nId: '2',
    networkId: 'net1',
    rId: 'r2',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '苏州',
    nId: '3',
    networkId: 'net1',
    rId: 'r3',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '昆山',
    nId: '4',
    networkId: 'net1',
    rId: 'r4',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '常州',
    nId: '5',
    networkId: 'net1',
    rId: 'r5',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '无锡',
    nId: '6',
    networkId: 'net1',
    rId: 'r6',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  },
  {
    nName: '南通',
    nId: '7',
    networkId: 'net1',
    rId: 'r7',
    nCpu: 100,
    nGPU: 100,
    nMem: 100,
    nMemOccupy: 0
  }
]

const TopoData3 = [
  {
    nodeName: '南京',
    networkId: 'net1',
    neighbors: {
      neighborName: '连云港',
      linkResourceUsage: 35,
      slotUsage: [1, 2]
    }
  },
  {
    nodeName: '常州',
    networkId: 'net1',
    neighbors: {
      neighborName: '连云港',
      linkResourceUsage: 35,
      slotUsage: [1, 2]
    }
  },
  {
    nodeName: '连云港',
    networkId: 'net1',
    neighbors: {
      neighborName: '南京',
      linkResourceUsage: 35,
      slotUsage: [1, 2]
    }
  }
]

const ServiceData3 = [
  {
    newEnergyId: 'service1',
    newEnergyStartTime: 120932,
    newEnergyEndTime: 123442,
    newEnergyNetwork: 'net1',
    children: [
      {
        taskId: 'task1',
        taskBearId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      },
      {
        taskId: 'task1',
        taskBearId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      },
      {
        taskId: 'task1',
        taskBearId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      },
      {
        taskId: 'task1',
        taskBearId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      }
    ]
  },
  {
    newEnergyId: 'service2',
    newEnergyStartTime: 150934,
    newEnergyEndTime: 223442,
    newEnergyNetwork: 'net1',
    children: [
      {
        taskId: 'task1',
        taskBearId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      },
      {
        taskId: 'task1',
        taskBearId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      },
      {
        taskId: 'task1',
        taskBearId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      }
    ]
  },
  {
    newEnergyId: 'service3',
    newEnergyStartTime: 120932,
    newEnergyEndTime: 123442,
    newEnergyNetwork: 'net1',
    children: [
      {
        taskId: 'task1',
        taskBearId: 'service1',
        taskCpuNeed: 65,
        taskGpuNeed: 25,
        taskMemNeed: 45,
        taskBandwNeed: 30,
        taskNId: '2',
        taskEndTime: 123442
      }
    ]
  }
]

const TaskData3 = [
  {
    taskId: 'task1',
    taskBearId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskBearId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskBearId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskBearId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskBearId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskBearId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  },
  {
    taskId: 'task1',
    taskBearId: 'service1',
    taskCpuNeed: 65,
    taskGpuNeed: 25,
    taskMemNeed: 45,
    taskBandwNeed: 30,
    taskNId: '2',
    taskEndTime: 123442
  }
]

const TaskFlowData3 = [
  {
    fId: 'flow1',
    subnetID: '1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fPriority: 10,
    fRuntime: 5400,
    taskEnergyConsume: 20,
    taskFlowPath: '1-2-3-4-5',
    slotOccupationIDX: '2, 4, 5',
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    subnetID: '1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fPriority: 10,
    fRuntime: 5400,
    taskEnergyConsume: 20,
    taskFlowPath: '1-2-3-4-5',
    slotOccupationIDX: '2, 4, 5',
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    subnetID: '1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fPriority: 10,
    fRuntime: 5400,
    taskEnergyConsume: 20,
    taskFlowPath: '1-2-3-4-5',
    slotOccupationIDX: '2, 4, 5',
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    subnetID: '1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fPriority: 10,
    fRuntime: 5400,
    taskEnergyConsume: 20,
    taskFlowPath: '1-2-3-4-5',
    slotOccupationIDX: '2, 4, 5',
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    subnetID: '1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fPriority: 10,
    fRuntime: 5400,
    taskEnergyConsume: 20,
    taskFlowPath: '1-2-3-4-5',
    slotOccupationIDX: '2, 4, 5',
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    subnetID: '1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fPriority: 10,
    fRuntime: 5400,
    taskEnergyConsume: 20,
    taskFlowPath: '1-2-3-4-5',
    slotOccupationIDX: '2, 4, 5',
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  },
  {
    fId: 'flow1',
    subnetID: '1',
    fSource: '1',
    fTarget: '2',
    fBandwidth: 20,
    fDelayTolerate: 30,
    fPriority: 10,
    fRuntime: 5400,
    taskEnergyConsume: 20,
    taskFlowPath: '1-2-3-4-5',
    slotOccupationIDX: '2, 4, 5',
    fSuccess: true,
    fState: 2,
    fDelay: 25,
    fBearerService: 'service1'
  }
]

export {
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
}
