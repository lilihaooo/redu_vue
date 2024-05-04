import request from "../utils/request";

export const GetSeckillList = (data: any) => {
    return request({
        url: '/api/v1/seckill/list',
        method: 'post',
        data: data
    });
};
