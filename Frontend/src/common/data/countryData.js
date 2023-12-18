const countryNodeData = [
  {
    nName: '北京',
    nCpu: 100,
    nMem: 100,
    nGPU: 100,
    nLevel: '国网级数据中心'
  },
  {
    nName: '上海',
    nCpu: 100,
    nMem: 100,
    nGPU: 100,
    nLevel: '国网级数据中心'
  },
  {
    nName: '西安',
    nCpu: 100,
    nMem: 100,
    nGPU: 100,
    nLevel: '国网级数据中心'
  },
  {
    nName: '上海',
    nCpu: 100,
    nMem: 100,
    nGPU: 100,
    nLevel: '省级数据中心'
  },
  {
    nName: '福建',
    nCpu: 100,
    nMem: 100,
    nGPU: 100,
    nLevel: '省级数据中心'
  },
  {
    nName: '湖北',
    nCpu: 100,
    nMem: 100,
    nGPU: 100,
    nLevel: '省级数据中心'
  },
  {
    nName: '湖南',
    nCpu: 100,
    nMem: 100,
    nGPU: 100,
    nLevel: '省级数据中心'
  },
  {
    nName: '浙江',
    nCpu: 100,
    nMem: 100,
    nGPU: 100,
    nLevel: '省级数据中心'
  },
  {
    nName: '江苏',
    nCpu: 100,
    nMem: 100,
    nGPU: 100,
    nLevel: '省级数据中心'
  }
]

const countryTopoData = [
  {
    sName: '北京',
    eName: '上海',
    ICapacity: '1000',
    ILoad: '100'
  },
  {
    sName: '北京',
    eName: '上海',
    ICapacity: '1000',
    ILoad: '100'
  },
  {
    sName: '北京',
    eName: '上海',
    ICapacity: '1000',
    ILoad: '100'
  }
]
const countryServiceData = [
  {
    appSourceName: '北京',
    appCpuNeed: 50,
    appBandwNeed: 10,
    appEndTime: 10,
    appGpuNeed: 10,
    appMemNeed: 10
  },
  {
    appSourceName: '北京',
    appCpuNeed: 50,
    appBandwNeed: 10,
    appEndTime: 10,
    appGpuNeed: 10,
    appMemNeed: 10
  },
  {
    appSourceName: '北京',
    appCpuNeed: 50,
    appBandwNeed: 10,
    appEndTime: 10,
    appGpuNeed: 10,
    appMemNeed: 10
  }
]

export { countryNodeData, countryTopoData, countryServiceData }
