<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {DeleteSeckillActivity, GetSeckillActivityList, SeckillActivityAdd, UpdateSeckillActivity} from "../api/seckill";
import {ElMessage} from "element-plus";
import {formatDateTime} from "../utils/func";

const formLabelWidth = '140px'
const dialogFormVisible = ref(false)
const dialogUpdateFormVisible = ref(false)
const form = ref({} as SeckillActivityForm)
const updateForm = ref({} as UpdateSeckillActivityForm)
const dataTimeValue = ref('')
const updateDataTimeValue = ref('')
const begin_time_text = ref('')
const end_time_text = ref('')


function getSeckillActivityList(data: any) {
  GetSeckillActivityList(null).then(res => {
    if (res.data.code == 2000) {
      tableData.value = res.data.data
      return
    } else {
      console.log(res.data.msg)
      return
    }
  })
}

onMounted(() => {
  getSeckillActivityList(null)
});


// 添加弹出框
interface SeckillActivityForm {
  title: string
  product_id: number
  status: string
  count: number
  unit_price: number
  begin_time: string
  end_time: string
  allow_user_grade: number
}


// 修改弹出框
interface UpdateSeckillActivityForm {
  id : number
  count: number
  unit_price: number
  begin_time: string
  end_time: string
  allow_user_grade: number
}


// 列表
interface SeckillActivity {
  id: number
  title: string
  product_id: number
  product_name: string
  shop_name: string
  status: string
  count: number
  unit_price: number
  begin_time: string
  end_time: string
  allow_user_grade: string
}

const tableData = ref<SeckillActivity[]>([] as SeckillActivity[])


function seckillActivityAdd(data: SeckillActivityForm) {
  data.product_id = Number(data.product_id);
  data.count = Number(data.count);
  data.unit_price = Number(data.unit_price);
  data.allow_user_grade = Number(data.allow_user_grade);
  // 生成任务号
  SeckillActivityAdd(data).then(res => {
    if (res.data.code == 2000) {
      getSeckillActivityList(null)
      successMsg(res.data.msg)
      dialogFormVisible.value=false
    } else {
      errorMsg(res.data.msg)
      return
    }
  })
}

const errorMsg = (msg: string) => {
  ElMessage.error(msg)
}

const successMsg = (msg: string) => {
  ElMessage.success(msg)
}


const handleDelete = (id: number) => {
  DeleteSeckillActivity(id).then(res => {
    if (res.data.code == 2000) {
      getSeckillActivityList(null)
      successMsg(res.data.msg)
    } else {
      errorMsg(res.data.msg)
      return
    }
  })
}


const handleUpdate = (row: any) => {
  dialogUpdateFormVisible.value = true
  begin_time_text.value = row.begin_time
  end_time_text.value = row.end_time
  updateForm.value.allow_user_grade = row.allow_user_grade
  updateForm.value.count = row.count
  updateForm.value.unit_price = row.unit_price
  updateForm.value.id = row.id
}


const updateCommit = (data: UpdateSeckillActivityForm) => {

  if (dataTimeValue.value.length < 2) {
    errorMsg("日期不能为空")
    return
  }


  data.begin_time = formatDateTime(dataTimeValue.value[0].toString())
  data.end_time = formatDateTime(dataTimeValue.value[1].toString())


  seckillActivityUpdate(data)


}


function seckillActivityUpdate(data: UpdateSeckillActivityForm) {
  data.count = Number(data.count);
  data.unit_price = Number(data.unit_price);
  data.allow_user_grade = Number(data.allow_user_grade);
  // 生成任务号
  UpdateSeckillActivity(data).then(res => {
    if (res.data.code == 2000) {
      getSeckillActivityList(null)
      successMsg(res.data.msg)
      dialogUpdateFormVisible.value=false
    } else {
      errorMsg(res.data.msg)
      return
    }
  })
}

const commitForm = (data: SeckillActivityForm) => {
  if (dataTimeValue.value.length < 2) {
    errorMsg("活动时间有误")
    return
  }


  data.begin_time = formatDateTime(dataTimeValue.value[0].toString())
  data.end_time = formatDateTime(dataTimeValue.value[1].toString())

  seckillActivityAdd(data)
}


</script>

<template>
  <el-button plain @click="dialogFormVisible = true">
    创建
  </el-button>

  <el-table :data="tableData" style="width: 100%; margin-top: 40px">
    <el-table-column prop="title" label="活动标题" width="180"/>
    <el-table-column prop="product_id" label="商品id" width="120"/>
    <el-table-column prop="product_name" label="商品名" width="180"/>
    <el-table-column prop="shop_name" label="店铺名" width="180"/>
    <el-table-column prop="status" label="状态" width="120"/>
    <el-table-column prop="count" label="数量" width="100"/>
    <el-table-column prop="unit_price" label="单价" width="120"/>
    <el-table-column prop="begin_time" label="开始时间" width="180"/>
    <el-table-column prop="end_time" label="结束时间" width="180"/>
    <el-table-column prop="allow_user_grade" label="用户等级" width="200"/>

    <el-table-column fixed="right" label="操作" width="140">
      <template #default="scope">
        <el-button
            size="small"
            type="primary"
            @click="handleUpdate( scope.row)"
        >
          编辑
        </el-button>


        <el-button
            size="small"
            type="danger"
            @click="handleDelete( scope.row.id)"
        >
          删除
        </el-button>


      </template>
    </el-table-column>
  </el-table>

<!--  添加弹出层-->
  <el-dialog v-model="dialogFormVisible" width="80%">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" style="width: 400px"/>
      </el-form-item>
      <el-form-item label="商品id" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.product_id" style="width: 240px"/>
      </el-form-item>
      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.count" style="width: 240px"/>
      </el-form-item>
      <el-form-item label="单价" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.unit_price" style="width: 240px"/>
      </el-form-item>
      <el-form-item label="活动时间" :label-width="formLabelWidth">
        <div class="block">
          <el-date-picker
              v-model="dataTimeValue"
              type="datetimerange"
              start-placeholder="Start date"
              end-placeholder="End date"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY/MM/DD ddd"
              time-format="A hh:mm:ss"
          />
        </div>
      </el-form-item>
      <el-form-item label="允许参与用户等级" :label-width="formLabelWidth">
        <el-input type="number"  v-model="form.allow_user_grade" style="width: 240px"/>
      </el-form-item>


    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="commitForm(form)">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>


<!--  编辑弹出层-->
  <el-dialog v-model="dialogUpdateFormVisible"  width="80%">
    <el-form :model="updateForm">





      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input type="number" v-model="updateForm.count" style="width: 240px"/>
      </el-form-item>
      <el-form-item label="单价" :label-width="formLabelWidth">
        <el-input type="number" v-model="updateForm.unit_price" style="width: 240px"/>
      </el-form-item>
      <el-form-item label="  " :label-width="formLabelWidth">
        <span>     {{begin_time_text }} ----- {{end_time_text}}</span>
      </el-form-item>
      <el-form-item label="活动时间" :label-width="formLabelWidth">

        <div class="block">
          <el-date-picker
              v-model="dataTimeValue"
              type="datetimerange"
              start-placeholder="Start date"
              end-placeholder="End date"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY/MM/DD ddd"
              time-format="A hh:mm:ss"
          />
        </div>
      </el-form-item>
      <el-form-item label="允许参与用户等级" :label-width="formLabelWidth">
        <el-input v-model="updateForm.allow_user_grade" style="width: 240px"/>
      </el-form-item>


    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="updateCommit(updateForm)">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>