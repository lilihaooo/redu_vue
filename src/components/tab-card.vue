<template>
  <div>
  <el-tabs  v-model="tab_name"   @tab-click="handleClick" style="margin-left: 10px">
    <el-tab-pane label="首页" name="index"></el-tab-pane>
    <el-tab-pane label="达人选品" name="warehouse"> </el-tab-pane>
    <el-tab-pane label="秒杀活动管理" name="seckill_activity"> </el-tab-pane>
    <el-tab-pane label="今日秒杀" name="seckill"> </el-tab-pane>
    <el-tab-pane label="订单管理" name="order"> </el-tab-pane>
  </el-tabs>
  </div>
</template>


<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";
import {kw} from "../global/global";
const route = useRoute();
const router = useRouter();
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // 跳转到name路由
  router.push('/'+tab.props.name);
}
// 获取当前路由路径并去掉开头的斜杠
const tab_name = ref('')

tab_name.value = route.path.replace(/^\//, '');
watch(route, (newValue, oldValue) => {
  tab_name.value = newValue.path.replace(/^\//, '');
});
</script>