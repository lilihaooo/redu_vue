



// dateTimeStr: "Fri Jun 21 2024 00:00:00 GMT+0800 (中国标准时间)"
export function formatDateTime(dateTimeStr:string) {
    // 使用Date对象解析字符串
    var date = new Date(dateTimeStr);

    // 检查日期是否有效
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    // 提取年、月、日、时、分、秒
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2); // 获取月份（注意：月份是从0开始的，所以需要+1），并补零
    var day = ('0' + date.getDate()).slice(-2); // 获取日期，并补零
    var hours = ('0' + date.getHours()).slice(-2); // 获取小时，并补零
    var minutes = ('0' + date.getMinutes()).slice(-2); // 获取分钟，并补零
    var seconds = ('0' + date.getSeconds()).slice(-2); // 获取秒数，并补零

    // 格式化日期和时间
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}