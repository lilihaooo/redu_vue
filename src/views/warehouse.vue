<script setup lang="ts">
import {GetCategoryTree} from "../api/product";
import {onMounted, reactive, ref, watch} from "vue";
import vFooter from '../components/footer.vue';
import {GetProductList} from "../api/product";
import {Picture as IconPicture} from '@element-plus/icons-vue'
import {useRoute} from "vue-router";
import {kw} from "../global/global";





interface Shop {
  id: string
  sell_num: string
  name: string
  logo: string
  creadit_logistics: string
  creadit_product: string
  creadit_service: string
}

interface ProductImage {
  url: string
  product_id: string
}

interface Product {
  ShopID: string
  shop: Shop
  product_images: ProductImage[]
  begin_time: string
  end_time: string
  id: string
  status: string
  xingxuan_credit: string
  self_support: string
  product_category_id: string
  is_newcomers: string
  sales_all: string
  sales_24: string
  is_guarantee: string
  platform: string
  title: string
  commission: string
  bottom_price: string
  url: string
  platform_product_id: string
  specimen_count: string
  reward_begin_time: string
  reward_end_time: string
  true_sales: string
  is_displayreward: string
  commission_value: string
  remaining: string
}

const productList = ref<Product[]>({} as Product[])


const platformOptions = [
  {
    value: 'douyin',
    label: '抖音',
  },
  {
    value: 'kuaishou',
    label: '快手',
  },
  {
    value: 'weixin',
    label: '视频号',
  }
]

const options = [
  {
    value: 'begin_time',
    label: '最新上架',
  },
  {
    value: 'updated_time',
    label: '最近更新',
  }
]
const options2 = [
  {
    value: 'commission_value',
    label: '佣金金额',
  },
  {
    value: 'commission',
    label: '佣金比例',
  }
]
const options3 = [
  {
    value: 'sales_all',
    label: '总销量',
  },
  // {
  //   value: 'thirty_day_sales',
  //   label: '近30日',
  // },
  // {
  //   value: 'seven_day_sales',
  //   label: '近7日',
  // },
  {
    value: 'twenty_four_hour_sales',
    label: '近24小时',
  }
]
const options4 = [
  {
    value: 'bottom_price_asc',
    label: '到手价升序',
  },
  {
    value: 'bottom_price_desc',
    label: '到手价降序',
  }
]


interface Category {
  id: string
  level: string
  parent_id: string
  name: string
  status: string
  image: string
  num: string
  childer: Category[]
}

const categoryData = ref<Category[]>({} as Category[])


function getTree() {
  // 生成任务号
  GetCategoryTree().then(res => {
    if (res.data.code == 2000) {
      categoryData.value = res.data.data
      return
    } else {
      console.log(res.data.msg)
      return
    }
  })
}


// 创建一个符合接口定义的初始对象

const condition = reactive({
  kw: '',
  cm: '',
  pp0: '',
  pp1: '',
  f0: '',
  f1: '',
  pf: '',
  by: '',
  // xxbp: false,   2 星选爆品
  // xxgy: false,   3 星选高佣
  // jrsx: false,   4 今日上新
  // xsjl: false,   5 限时奖励
  sort: '',
  platform: 'douyin',
  type: '',
  page: 1,
  member_id: '',
  product_category_id: '',
  // is_guarantee: false,        6 三保
  product_tag_ids: [],
  // is_displayreward: false,    1 投流奖励
  is_newyeartd: '',
  not_fake:  false  // 不是假数据
})
const shaiXuan = reactive({
  cm: '',
  pp0: '',
  pp1: '',
  f0: '',
  f1: '',
  pf: '',
})
const by1 = ref('')
watch(by1, (newValue, oldValue) => {
  condition.by = newValue
});
const by2 = ref('')
watch(by2, (newValue, oldValue) => {
  condition.by = newValue
});
const by3 = ref('')
watch(by3, (newValue, oldValue) => {
  condition.by = newValue
});
const by4 = ref('')
watch(by4, (newValue, oldValue) => {
  if (newValue == 'bottom_price_desc') {
    condition.by = 'bottom_price'
    condition.sort = 'DESC'
  } else {
    condition.by = 'bottom_price'
    condition.sort = 'ASC'
  }
});

function setShaiXuan() {
  condition.cm = shaiXuan.cm
  condition.pp0 = shaiXuan.pp0
  condition.pp1 = shaiXuan.pp1
  condition.f0 = shaiXuan.f0
  condition.f1 = shaiXuan.f1
  condition.pf = shaiXuan.pf
}

function setCategoryId(id: string) {
  condition.product_category_id = id
}


const dataTotal = ref(0)

function getProductList(condition: any) {
  console.log(condition.product_category_id)
  // 生成任务号
  GetProductList(condition).then(res => {
    if (res.data.code == 2000) {
      productList.value = res.data.data.list
      dataTotal.value = res.data.data.count
      return
    } else {
      console.log(res.data.msg)
      return
    }
  })
}

watch(kw, (newValue, oldValue) => {
  condition.kw = newValue
});

onMounted(() => {
  getTree()
  watch(condition, (newValue, oldValue) => {
    getProductList(condition)
    return
  });
  if (kw.value != '') {
    condition.kw = kw.value
    return
  }
  getProductList(condition); // 这里的{}是你的条件，你可以传递任何需要的条件
});

const handleCurrentChange = (page: number) => {
  condition.page = page
};


function imageError(p: Product) {
  // console.log(src)
  p.product_images[0].url = 'src/assets/img/image_err.png'
}

function getImageUrl(p: Product) {
  if (p.product_images.length == 0){
    return  'src/assets/img/image_err.png'
  }
  return   p.product_images[0].url

}



</script>

<template>
  <div>
    <div>
      <table>

        <tr style="height: 50px; border-top: 1px solid var(--el-border-color);">
          <td>&nbsp&nbsp分类:</td>
          <td>
            <el-popover
                :show-after="200"
                :hide-after="50"
                v-for="(category, i) in categoryData" :key="i"
                placement="bottom-start"
                width="50%"
                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
            >
              <template #reference>  <!-- 标签-->
                <el-button style="margin-left: 30px" @click="setCategoryId(category.id)">{{ category.name }}</el-button>
              </template>
              <template #default> <!-- 内容-->
                <div v-for="(category_sub1, categoryId) in category.childer" :key="categoryId"
                     style="margin-bottom: 15px">
                  <el-button @click="setCategoryId(category_sub1.id)" link>
                    <b>{{ category_sub1.name }}</b>
                  </el-button>
                  <div style="width: 90%">
                <span v-for="(category_sub2, categoryId) in category_sub1.childer"
                      :key="categoryId">
                     <el-button @click="setCategoryId(category_sub2.id)" link>
                   | {{ category_sub2.name }}&nbsp;
                    </el-button>

                </span>
                  </div>
                </div>
              </template>
            </el-popover>
          </td>
        </tr>

        <tr style="height: 50px;border-top: 1px solid var(--el-border-color);">
          <td>&nbsp&nbsp筛选:</td>
          <td>
        <span style="margin-left: 30px">
          佣金比例  >=
          <el-input v-model="shaiXuan.cm" type="number" style="width: 160px"/>
        </span>

            <span style="margin-left: 40px">
          到手价
          <el-input v-model="shaiXuan.pp0" type="number" style="width: 120px"/>
          ----
          <el-input v-model="shaiXuan.pp1" type="number" style="width: 120px"/>
        </span>

            <span style="margin-left: 40px">
         橱窗销量范围
          <el-input v-model="shaiXuan.f0" type="number" style="width: 120px"/>
          ----
          <el-input v-model="shaiXuan.f1" type="number"  style="width: 120px"/>
        </span>

            <span style="margin-left: 40px">
          体验分  >=
          <el-input v-model="shaiXuan.pf" style="width: 120px" disabled/>
        </span>

            <span style="margin-left: 20px">
        <el-button type="danger" size="small" @click="setShaiXuan">筛选</el-button>
        </span>
          </td>
        </tr>
        <tr style="height: 30px">
          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>
            <el-tag  v-if="condition.pp0 != '' && condition.pp1 == ''"    type="danger" style="margin-left: 30px">
              到手价: ≥￥{{condition.pp0}}
            </el-tag>
            <el-tag  v-if="condition.pp1 != '' && condition.pp0 == ''"    type="danger" style="margin-left: 30px">
              到手价: ≤￥{{condition.pp1}}
            </el-tag>
            <el-tag  v-if="condition.pp0 != '' && condition.pp1 !== '' "    type="danger" style="margin-left: 30px">
              到手价: ￥{{condition.pp0}} ~ {{condition.pp1}}
            </el-tag>

            <el-tag  v-if="condition.cm != ''"    type="danger" style="margin-left: 30px">
              佣金比例: ≥{{condition.cm}}%
            </el-tag>

            <el-tag  v-if="condition.f0 != '' && condition.f1 == ''"    type="danger" style="margin-left: 30px">
              销量: ≥￥{{condition.f0}}
            </el-tag>
            <el-tag  v-if="condition.f1 != '' && condition.f0 == ''"    type="danger" style="margin-left: 30px">
              销量: ≤￥{{condition.f1}}
            </el-tag>
            <el-tag  v-if="condition.f0 != '' && condition.f1 !== '' "    type="danger" style="margin-left: 30px">
              销量: ￥{{condition.f0}} ~ {{condition.f1}}
            </el-tag>

          </td>
        </tr>
      </table>
      <table style="margin-top: 15px; border: 0; height: 40px">
        <tr>
          <td>
            <el-select
                v-model="condition.platform"
                placeholder="平台"
                size="large"
                style="width: 100%"
            >
              <el-option
                  v-for="item in platformOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </td>
          <td>
            <el-select
                v-model="by1"
                placeholder="上架时间"
                size="large"
                style="width: 100%"
                disabled
            >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </td>
          <td>
            <el-select
                v-model="by2"
                placeholder="佣金"
                size="large"
                style="width: 100%"
            >
              <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </td>
          <td>
            <el-select
                v-model="by3"
                placeholder="总销量"
                size="large"
                style="width: 100%"
            >
              <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </td>
          <td>
            <el-select
                v-model="by4"
                placeholder="排序"
                size="large"
                style="width: 100%"
            >
              <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </td>

        </tr>
      </table>
      <table style=" border: 0; height: 40px">
        <tr>
          <td>
            <el-checkbox  v-model="condition.not_fake" label="6" >
              原始数据
            </el-checkbox>
          </td>
          <td>
            <el-checkbox disabled v-model="condition.product_tag_ids" label="1" >
              投流奖励
            </el-checkbox>
          </td>
          <td>
            <el-checkbox disabled v-model="condition.product_tag_ids" label="33" v-if="condition.platform == 'douyin'">
              免费素材
            </el-checkbox>
          </td>
          <td>
            <el-checkbox disabled  v-model="condition.product_tag_ids" label="26" v-if="condition.platform == 'douyin'">
              品牌
            </el-checkbox>
          </td>
          <td>
            <el-checkbox disabled  v-model="condition.product_tag_ids" label="24" v-if="condition.platform == 'douyin'">
              抖in好物
            </el-checkbox>
          </td>
          <td>
            <el-checkbox disabled  v-model="condition.product_tag_ids" label="25" v-if="condition.platform == 'douyin'">
              安心购
            </el-checkbox>
          </td>
          <td>
            <el-checkbox disabled  v-model="condition.product_tag_ids" label="27" v-if="condition.platform == 'douyin'">
              随心推资质
            </el-checkbox>
          </td>
          <td>
            <el-checkbox  disabled v-model="condition.product_tag_ids" label="23" v-if="condition.platform == 'douyin'">
              云严选
            </el-checkbox>
          </td>
          <td>
            <el-checkbox   disabled v-model="condition.product_tag_ids" label="2" >
              独家爆品
            </el-checkbox>

          </td>
          <td>
            <el-checkbox disabled v-model="condition.product_tag_ids" label="3" >
              星选高佣
            </el-checkbox>

          </td>
          <td>
            <el-checkbox disabled v-model="condition.product_tag_ids" label="4" >
              今日上新
            </el-checkbox>
          </td>
          <td>
            <el-checkbox  disabled v-model="condition.product_tag_ids" label="5" >
              现时奖励
            </el-checkbox>
          </td>
          <td>
            <el-checkbox disabled v-model="condition.product_tag_ids" label="6" >
              三保
            </el-checkbox>
          </td>

        </tr>
      </table>
    </div>
    <div class="list" style="margin-top: 20px">
      <!-- 第一行 -->
      <div class="box" v-for="(product, i) in productList" :key="i">
        <div style="position: relative;">
          <el-image
              :src="getImageUrl(product)"
              style="width: 100%; height: 100%; border-radius: 5% 5%0% 0%"
              @error="imageError(product)"
          >
            <template #error>
              <div class="image-slot">
                <el-icon>
                  <icon-picture/>
                </el-icon>
              </div>
            </template>
          </el-image>




        </div>
        <div style="margin: 10px">
          <div>
            <span>
              <img
                  :src="'src/assets/img/' + product.platform+ '.png'"
                  style="width:20px; border-radius: 5%"
              />
            </span>
            <span
                style="font-size: 16px; width: 20%">{{ product.title }}</span>
          </div>
          <div style="margin-top: 10px;  display: flex; flex-wrap: wrap;">
            <div style="width: 25%">
              <div style="font-size: 13px; color: #8c8888">24h销量</div>
              <div>{{ product.sales_24 }}件</div>
            </div>
            <div style="width: 25%; text-align: center">
              <div style="font-size: 13px; color: #8c8888">直播价</div>
              <div>{{ product.bottom_price }}元</div>
            </div>
            <div style="width: 25%; text-align: center">
              <div style="font-size: 13px; color: #8c8888">预估赚钱</div>
              <div>{{ product.commission_value }}元</div>
            </div>
            <div style="width: 25%; text-align: right">
              <div style="font-size: 13px; color: #8c8888">佣金</div>
              <div>{{ product.commission }}%</div>
            </div>
          </div>
          <el-divider content-position="left">{{ product.shop.name }}</el-divider>
          <div style="margin-top: 10px;  display: flex; flex-wrap: wrap;">
            <div style="width: 33.33%">
              <div style="font-size: 13px; color: #8c8888">商品体验</div>
              <div>{{ product.shop.creadit_product }}</div>
            </div>
            <div style="width: 33.33%; text-align: center">
              <div style="font-size: 13px; color: #8c8888">商品服务</div>
              <div>{{ product.shop.creadit_service }}</div>
            </div>
            <div style="width: 33.33%; text-align: right">
              <div style="font-size: 13px; color: #8c8888">物流体验</div>
              <div>{{ product.shop.creadit_logistics }}</div>
            </div>
          </div>
        </div>
        <div style="margin: 10px 10px 0; font-size: 12px; color: #8c8888">
          连接有效期:{{ product.begin_time }}至{{ product.end_time }}
        </div>
      </div>
    </div>
    <div style="margin-top: 10px; margin-bottom: 10px">
      <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="dataTotal"
          :default-page-size="20"
      />
    </div>
    <v-footer/>

  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  border: 1px solid var(--el-border-color);
  width: 100%; /* 设置表格宽度 */
  height: 120px;
}

.list {
  display: flex;
  flex-wrap: wrap;
}

.box {
  width: 20%;
  height: 600px;
  padding: 8px;
  margin: 20px 0;
  box-sizing: border-box;
}
</style>