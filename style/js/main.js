// 获取百度接口中的联想关键字
// 作者：D.Young
// 主页：https://yyv.me/
// github：https://github.com/5iux/sou
// ========================================
// 键盘上下按键选择联想关键字
// 作者：yeetime
// github：https://github.com/yeetime/sou2
// ========================================
// 暗黑模式与明亮模式的切换
// 作者：疯狂的大叔
// 主页：https://cux.huitheme.cn/
// 链接：https://www.huitheme.com/wordpress-theme-switch-dark.html
// ========================================
// 最后修改整理
// 作者：九凌少子
// 主页：https://www.yumus.cn/
// github：https://github.com/asir3q/soso
//获取URL中的指定搜索引擎，提供默认搜索定制
function GetQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substring(1).match(reg);
    let context = "";
    if (r != null) context = decodeURIComponent(r[2]);
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined"
    ? ""
    : context;
}
//执行搜索引擎切换
function elemEngine(engImg,engForm,engName){
    $(".search-type").css("background-image", "url("+engImg+")");
    $(".form").attr("action", engForm);
    $("#search-text").attr("name", engName);
}
//搜索引擎相关信息
function switEngine(nameEngine) {
    switch (nameEngine) {
    case "bing":
        elemEngine("./style/img/bing.svg","https://cn.bing.com/search","q");
        break;
    case "google":
        elemEngine("./style/img/google.svg","https://www.google.com/search","q");
        break;
    case "sogou":
        elemEngine("./style/img/sogou.svg","https://www.sogou.com/web","query");
        break;
    case "wechat":
        elemEngine("./style/img/wechat.svg","https://weixin.sogou.com/weixin","query");
        break;
    case "bilibili":
        elemEngine("./style/img/bilibili.svg","https://search.bilibili.com/all","keyword");
        break;
    case "zhihu":
        elemEngine("./style/img/zhihu.svg","https://www.zhihu.com/search","q");
        break;
    case "github":
        elemEngine("./style/img/github.svg","https://github.com/search","q");
        break;
    case "360":
        elemEngine("./style/img/360.svg","https://www.so.com/s","q");
        break;
    case "quan":
        elemEngine("./style/img/quan.svg","https://so.yumus.cn/q.html","q");
        break;
    case "chabeihu":
        elemEngine("./style/img/chabeihu.svg","https://so.yumus.cn/cbh.html","q");
        break;
    case "douban":
        elemEngine("./style/img/douban.svg","https://www.douban.com/search","q");
        break;
    case "pexels":
        elemEngine("./style/img/pexels.svg","https://so.yumus.cn/pexels.html","q");
        break;
    case "baidu":
    default:
        elemEngine("./style/img/baidu.svg","https://www.baidu.com/s","wd");
        break;
    }
}