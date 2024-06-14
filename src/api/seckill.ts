import request from "../utils/request";

export const SeckillActivityAdd = (data: any) => {
    return request({
        url: '/api/v1/seckill_activity',
        method: 'post',
        data: data
    });
};


export const GetSeckillActivityList = (data: any) => {
    return request({
        url: '/api/v1/seckill_activity/list',
        method: 'get',
        params: data
    });
};


// 获取今天的秒杀活动
export const GetTodaySeckillActivityList = (data: any) => {
    return request({
        url: '/api/v1/seckill_activity/t_list',
        method: 'get',
        params: data
    });
};



export const DeleteSeckillActivity = (data: any) => {
    return request({
        url: '/api/v1/seckill_activity',
        method: 'delete',
        params: {"id":data}
    });
};

export const UpdateSeckillActivity = (data: any) => {
    return request({
        url: '/api/v1/seckill_activity',
        method: 'put',
        data: data
    });
};


export const DoSeckill = (data: any) => {
    return request({
        url: '/api/v1/seckill_activity/do',
        method: 'get',
        params: {"id":data}
    });
};