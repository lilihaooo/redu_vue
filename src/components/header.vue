<template>
  <div class="header" style="background-color: #409EFF">
    <div class="title">Redu星选</div>
    <div class="search">
      <el-input
          v-model="searchInput"
          placeholder="搜索商品"
          @keyup.enter = "searchCommit"
      >
        <template #suffix>
          <div class="circular-icon-container">
            <search  @click="searchCommit" class="icon-search" style="width: 1em; height: 1em"/>
          </div>
        </template>
      </el-input>
    </div>

    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell" @click="router.push('/tabs')">
          <el-tooltip
              effect="dark"
              :content="message ? `有${message}条未读消息` : `消息中心`"
              placement="bottom"
          >
            <i class="el-icon-lx-notice"></i>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <el-avatar class="user-avator" :size="30" :src="imgurl"/>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{ username }}
						<el-icon class="el-icon--right">
							<arrow-down/>
						</el-icon>
					</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {useRoute, useRouter} from 'vue-router';
import imgurl from '../assets/img/img.jpg';
import {kw} from '../utils/global/global'
import {ref} from "vue";

const searchInput = ref('')
const route = useRoute();
const router = useRouter();
const username: string | null = localStorage.getItem('ms_username');
const message: number = 2;


function searchCommit() {
  kw.value = searchInput.value
  if (route.path != '/warehouse') {
    router.push('/warehouse');
  }
}

const handleCommand = (command: string) => {
  if (command == 'loginout') {
    localStorage.removeItem('ms_username');
    router.push('/login');
  } else if (command == 'user') {
    router.push('/user');
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 75px;
  font-size: 22px;
  color: #fff;
  background-color: var(--bg-color);
}

.collapse-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  float: left;
  padding: 0 21px;
  cursor: pointer;
  color: var(--color);
}

.collapse-btn:hover {
  background-color: #cbc2c2;
}



.header .title {
  margin-left: 20px;
  float: left;
  width: 250px;
  line-height: 70px;
  color: var(--color);
}


.header-right {
  float: right;
  padding-right: 50px;
}


.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;

}

.theme {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--color);
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;

}

.btn-bell-badge {
  position: absolute;
  right: 4px;
  top: 0px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}

.btn-bell .el-icon-lx-notice {
  color: var(--color)
}


.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.el-dropdown-link {
  color: var(--color);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.el-input {
  width: 600px;
  height: 44px;
  align-self: center;
  float: left;
  margin-top: 15px;
}

:deep(.el-input__wrapper) {
  margin-left: 5px;
  font-size: 15px;
  //background-color: rgba(255, 255, 255, 0); /*覆盖原背景颜色，设置成透明 */
  border-radius: 120px;

}

:deep(.el-input__inner) {
  margin-left: 10px;
}

.circular-icon-container {
  display: inline-block;
  width: 24px; /* 调整此值以适应你的图标大小 */
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.3);
  }

  .icon-search {
    margin-top: 4px;
    color: #20a0ff;
  }
}


</style>
