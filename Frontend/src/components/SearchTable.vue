<template>
  <div :key="$route.params.scene">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 24px">{{ myProps.title }}</span>
          <el-input v-model="search" style="display: inline-block; width: 500px; margin-left: 50px" placeholder="请输入搜索内容">
          </el-input>
          <el-button v-if="myProps.edit" class="header-button" type="primary" @click="dialogShow = true">新增</el-button>
        </div>
      </template>
      <div>
        <el-table :data="searchData" stripe style="width: 100%" border>
          <el-table-column type="expand" v-if="myProps.title.includes('业务')">
            <template #default="props">
              <div style="margin-left:50px">
                <p>业务ID: {{ calculateServiceId(props.row) }}</p>
                <p>业务所属子网ID: {{ calculateSubnetId(props.row) }}</p>
                <h3>子任务</h3>
                <el-table :data="props.row.children" border>
                  <el-table-column v-for="(val, key) in props.row.children[0]" :key="key" :label="selectLabel(key)"
                    :prop="key" ></el-table-column>
                  <!-- <el-table-column label="子任务ID" prop="taskId" />
                  <el-table-column label="子任务类型" prop="taskType" />
                  <el-table-column label="CPU需求" prop="taskCpuNeed" />
                  <el-table-column label="GPU需求" prop="taskGpuNeed" />
                  <el-table-column label="存储需求" prop="taskMemNeed" />
                  <el-table-column label="带宽需求" prop="taskBandwNeed" />
                  <el-table-column label="子任务部署算力节点ID" prop="taskNId" />
                  <el-table-column label="子任务结束时间" prop="taskEndTime" /> -->
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-for="[prop, label] in myProps.label" :prop="prop" :label="label" :key="prop" sortable />
          <el-table-column v-if="myProps.edit" label="操作">
            <template v-slot="{ row }">
              <el-button type="primary" :icon="Edit" @click="handleEdit(row)" circle></el-button>
              <el-button type="danger" :icon="Delete" @click="handleDel(row)" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog v-if="myProps.edit" v-model="dialogShow" title="新建/编辑算力业务" width="50%" :append-to-body="true"
      v-model:visible="dialogShow" modal modal-append-to-body>
      <el-form :model="form" label-width="180px" label-position="left">
        <el-form-item label="算网业务发起节点">
          <el-input v-model="form.appSourceName" />
        </el-form-item>
        <el-form-item label="所需CPU资源（核数）">
          <el-input v-model="form.appCpuNeed" />
        </el-form-item>
        <el-form-item label="所需GPU资源">
          <el-input v-model="form.appGpuNeed" />
        </el-form-item>
        <el-form-item label="所需Mem资源">
          <el-input v-model="form.appMemNeed" />
        </el-form-item>
        <el-form-item label="容器所需带宽资源">
          <el-input v-model="form.appBandwNeed" />
        </el-form-item>
        <el-form-item label="业务要求的截止时间">
          <el-input v-model="form.appEndTime" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="dialogShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { Check, Delete, Edit, Message, Search, Star } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

const myProps = defineProps({
  taskListData: Object,
  title: String,
  tableData: Array,
  label: Array,
  edit: Boolean
})

let dialogShow = ref(false)
let deleteConfirm = ref(false)
let isEdit = ref(false)

const serviceLables = myProps.label;

let selectLabel = (key) => {
  // console.log(key);
  // console.log(allLabels)
  const allLabels = myProps.taskListData.label;
  for (let i = 0; i < allLabels.length; i++) {
    if (allLabels[i][0] === key) {
      // console.log(allLabels[i][1])
      return allLabels[i][1]
    }
  }
}

let calculateServiceId = (ctx) => {
  for (let i = 0; i < serviceLables.length; i++) {
    if (serviceLables[i][1] === "业务ID") {
      // console.log(serviceLables[i][1])
      return ctx[serviceLables[i][0]];
    }
  }
}
let calculateSubnetId = (ctx) => {
  for (let i = 0; i < serviceLables.length; i++) {
    if (serviceLables[i][1] === "子网ID") {
      // console.log(serviceLables[i][1])
      return ctx[serviceLables[i][0]]
    }
  }
}

const handleClose = (done) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

// do not use same name with ref
let form = reactive({
  appSourceName: '',
  appCpuNeed: '',
  appGpuNeed: '',
  appMemNeed: '',
  appBandwNeed: '',
  appEndTime: ''
})
const tableData = myProps.tableData;

const taskListData1 = myProps.taskListData1;
// console.log(props)
let search = ref('')

let searchLabel = {
  算力节点: 'nName',
  算网拓扑: 'nodeName',
  AI视觉检测业务: 'aiId',
  AI视觉检测子任务: 'taskId',
  AI视觉检测任务流: 'fId',
  边缘物联代理业务: 'aiId',
  边缘物联代理子任务: 'taskId',
  边缘物联代理任务流: 'fId',
  新能源消纳业务: 'aiId',
  新能源消纳子任务: 'taskId',
  新能源消纳任务流: 'fId'
}

let searchData = computed(() => {
  if (search.value) {
    console.log(search)
    return tableData.filter((data) => {
      return data[searchLabel[myProps.title]].indexOf(search.value) > -1
    })
  }
  return tableData
})

const onSubmit = () => {
  if (isEdit.value) {
    //修改模式
    //调用接口传修改后的表单以及id过去
  } else {
    //调用接口传表单数据
  }

  tableData.push(form)
  dialogShow.value = false
  console.log('submit!')
}
const handleDel = (row) => {
  console.log('delete!')
  //传rowId 调用删除接口
}
const handleEdit = (row) => {
  dialogShow.value = true
  isEdit.value = true
  //   console.log(dialogShow)
  console.log(row)
  form = row
}
</script>

<style scoped>
.card-header {
  /* display: block; */
  /* justify-content: space-between; */
  align-items: center;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
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

.header-button {
  /* display: block; */
  position: relative;
  right: 10px;
}
</style>
