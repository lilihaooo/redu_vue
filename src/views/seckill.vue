<script setup lang="ts">
import {DeleteSeckillActivity, DoSeckill, GetSeckillActivityList, GetTodaySeckillActivityList} from "../api/seckill";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";


interface SeckillActivity {
  id: number
  title: string
  product_id: number
  product_name: string
  status: string
  count: number
  unit_price: number
  begin_time: string
  end_time: string
  allow_user_grade: string
}

const NotStart = ref<SeckillActivity[]>([] as SeckillActivity[])
const InProgress = ref<SeckillActivity[]>([] as SeckillActivity[])
const End = ref<SeckillActivity[]>([] as SeckillActivity[])

function getTodaySeckillActivityList(data: any) {
  GetTodaySeckillActivityList(null).then(res => {
    if (res.data.code == 2000) {
      categorizeActivities(res.data.data)
      return
    } else {
      console.log(res.data.msg)
      return
    }
  })
}

function categorizeActivities(activities: SeckillActivity[]) {
  const currentTime = new Date().getTime()
  console.log(currentTime)

  activities.forEach(activity => {
    const beginTime = new Date(activity.begin_time).getTime()
    const endTime = new Date(activity.end_time).getTime()
    if (currentTime < beginTime) {
      NotStart.value.push(activity)
    } else if (currentTime >= beginTime && currentTime <= endTime) {
      InProgress.value.push(activity)
    } else {
      End.value.push(activity)
    }
  })
}

onMounted(() => {
  getTodaySeckillActivityList(null)
});

const handleDoSeckill = (id: number) => {
  DoSeckill(id).then(res => {
    if (res.data.code == 2000) {
      successMsg(res.data.msg)
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



</script>


<template>
  <table style="width: 100%">
    <tr>
      <td style="width: 20%">
        <el-card style=" height: 560px">
          <div style="color: #0745cb">即将开始!</div>
          <el-divider />
          <div style="margin-top: 12px" v-for="activity in NotStart" :key="activity.id">
            <el-button disabled>{{activity.title}}</el-button>
          </div>

        </el-card>
      </td>
      <td style="width: 60%;">
        <el-card style=" height: 560px">
          <div style="color: green">正在秒杀...</div>
          <el-divider />
          <div style="margin-top: 12px" v-for="activity in InProgress" :key="activity.id">
            <el-button @click="handleDoSeckill(activity.id)">{{activity.title}}</el-button>
          </div>
        </el-card>
      </td>
      <td style="width: 20%;">
        <el-card style=" height: 560px">
          <div style="color: red">秒杀结束!</div>
          <el-divider />
          <div style="margin-top: 12px" v-for="activity in End" :key="activity.id">
            <el-button disabled>{{activity.title}}</el-button>
          </div>
        </el-card>
      </td>
    </tr>
  </table>
</template>


<style scoped>

</style>