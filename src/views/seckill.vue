<script setup lang="ts">
import { reactive, ref} from 'vue'
import {GetSeckillList} from "../api/seckill";

const formLabelWidth = '140px'
const dialogFormVisible = ref(false)
const form = ref({}as SeckillActivityForm)

const dataTimeVale = ref( '' )

interface SeckillActivityForm {
  title: string
  product_id: number
  status: string
  count: number
  unit_price: number
  begin_time: string
  end_time:string
  allow_user_grade: string
}

interface SeckillActivity {
  id: number
  title: string
  product_id: number
  status: string
  count: number
  unit_price: number
  begin_time: string
  end_time: string
  allow_user_grade: string
}

const tableData = ref([
  {
    id: 1,
    title: '手机秒杀',
    product_id: 1221,
    status: '未开始',
    count: 10,
    unit_price: 999.99,
    begin_time: '2016-05-03',
    end_time: '2016-05-03',
    allow_user_grade: '3',
  },
] as SeckillActivity[])


function getSeckillActivityList(data:SeckillActivityForm) {
  // 生成任务号
  GetSeckillList(data).then(res => {
    if (res.data.code == 2000) {
      tableData.value = res.data.data
      return
    } else {
      console.log(res.data.msg)
      return
    }
  })
}

const handleDelete = (index: number, row: SeckillActivity) => {
  console.log(index, row)
}


const commitForm = (data: SeckillActivityForm) => {
  data.begin_time = dataTimeVale.value[0].toString()
  data.end_time = dataTimeVale.value[1].toString()

  getSeckillActivityList(data)
}
</script>

<template>
  <el-button plain  @click="dialogFormVisible = true">
    创建
  </el-button>

  <el-table :data="tableData" style="width: 100%; margin-top: 40px">
    <el-table-column prop="title" label="活动标题" width="300" />
    <el-table-column prop="product_id" label="商品id" width="180" />
    <el-table-column prop="status" label="状态" width="180" />
    <el-table-column prop="count" label="数量" width="180" />
    <el-table-column prop="unit_price" label="单价" width="180" />
    <el-table-column prop="begin_time" label="开始时间" width="180" />
    <el-table-column prop="end_time" label="结束时间" width="180" />
    <el-table-column prop="allow_user_grade" label="允许参与用户等级" width="200" />

    <el-table-column fixed="right" width="120">
      <template #default="scope">
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>



  <el-dialog v-model="dialogFormVisible"  width="80%">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth" >
        <el-input v-model="form.title" style="width: 400px" />
      </el-form-item>
      <el-form-item label="商品id" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.product_id" style="width: 240px" />
      </el-form-item>
      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.count" style="width: 240px"  />
      </el-form-item>
      <el-form-item label="单价" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.unit_price" style="width: 240px" />
      </el-form-item>
      <el-form-item label="开始时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
                v-model="dataTimeVale"
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
        <el-input v-model="form.allow_user_grade" style="width: 240px" />
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
</template>

<style scoped>

</style>