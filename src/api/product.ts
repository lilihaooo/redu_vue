import request from '../utils/request';

export const GetProductList = (data: any) => {
    return request({
        url: '/api/v2/product/list',
        method: 'post',
        data: data
    });
};

export const GetCategoryTree = () => {
    return request({
        url: '/api/v1/product/category/tree',
        method: 'get'
    });
};