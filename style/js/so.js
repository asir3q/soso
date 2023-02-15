/*
获取百度接口中的联想关键字
作者：D.Young
主页：https://yyv.me/
github：https://github.com/5iux/sou
========================================
键盘上下按键选择联想关键字
作者：yeetime
github：https://github.com/yeetime/sou2
========================================
暗黑模式与明亮模式的切换
作者：疯狂的大叔
主页：https://cux.huitheme.cn/
链接：https://www.huitheme.com/wordpress-theme-switch-dark.html
========================================
最后修改
作者：九凌少子
主页：https://www.yumus.cn/
github：https://github.com/asir3q/soso
*/
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
  //切换目标搜索引擎
  function switEngine(nameEngine) {
    switch (nameEngine) {
      case "baidu":
        elemEngine("./style/img/baidu.svg","https://www.baidu.com/s","wd");
        break;
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
      default:
        elemEngine("./style/img/baidu.svg","https://www.baidu.com/s","wd");
        break;
    }
  }
  //在本地存储设置的搜索引擎对应Cookie并进行切换
  function operEngine(nameEngine){
    localStorage.setItem("isEnginetype", nameEngine);
    switEngine(localStorage.getItem("isEnginetype"));
  }
  //关闭搜索引擎切换
  function isoff() {
    $("#engine").hide();
    $(".m-mask").hide();
    $(".form").removeClass("mask");
  }
  //获取百度接口中的联想关键字
  function keywordReminder() {
    let keywords = $("#search-text").val();
    if (keywords == "" || keywords == null || keywords == undefined) {
      $("#Sugword").hide();
      $(".delete").hide();
      $("#submit").attr("disabled", true);
      return;
    }
    $("#submit").attr("disabled", false);
    $(".delete").show();
    if (keywords != "0") {
      $.ajax({
        url: "https://suggestion.baidu.com/su?wd=" + keywords,
        dataType: "jsonp",
        jsonp: "cb",
        success: function (data) {
          $("#Sugword").empty().show();
          if (data.s == "") {
            $("#Sugword").empty();
            $("#Sugword").hide();
          }
          $.each(data.s, function (i, val) {
            $('#Sugword').append(`<li class="sug" data-id="${i + 1}">${val}</li>`);
        });
          $("#Sugword").attr("data-length", data.s["length"]);
        },
        error: function () {
          $("#Sugword").empty().show();
          $("#Sugword").hide();
        }
      });
    }else{
      $("#Sugword").empty();
      $("#Sugword").hide();
    }
  }
  $(function () {
    //点击输入框搜索引擎图标，显示搜索引擎切换面板
    $(document).on("click", ".search-type", function () {
      $("#engine").show();
      $(".m-mask").show();
      $(".form").addClass("mask");
    });
    //点击非搜索引擎切换区域执行关闭搜索引擎切换面板操作
    $(document).on("click", ".mask", function () {
      isoff();
    });
    //切换为百度搜索
    $(document).on("click", ".baidu", function () {
      operEngine("baidu");
    });
    //切换为必应搜索
    $(document).on("click", ".bing", function () {
      operEngine("bing");
    });
    //切换为谷歌搜索
    $(document).on("click", ".google", function () {
      operEngine("google");
    });
    //切换为搜狗搜索
    $(document).on("click", ".sogou", function () {
      operEngine("sogou");
    });
    //切换为微信搜索
    $(document).on("click", ".wechat", function () {
      operEngine("wechat");
    });
    //切换为B站搜索
    $(document).on("click", ".bilibili", function () {
      operEngine("bilibili");
    });
    //切换为知乎搜索
    $(document).on("click", ".zhihu", function () {
      operEngine("zhihu");
    });
    //切换为GitHub搜索
    $(document).on("click", ".github", function () {
      operEngine("github");
    });
    //切换为微博搜索
    $(document).on("click", ".360", function () {
      operEngine("360");
    });
    //切换为语幕好券搜索
    $(document).on("click", ".quan", function () {
      operEngine("quan");
    });
    //切换为茶杯狐搜索
    $(document).on("click", ".chabeihu", function () {
      operEngine("chabeihu");
    });
    //切换为豆瓣搜索
    $(document).on("click", ".douban", function () {
      operEngine("douban");
    });
    //读取本地搜索引擎的设置Cookie，若当前无搜索引擎切换记录则调用URL定制或初始默认
    let isEngine = localStorage.getItem("isEnginetype");
    if (isEngine == null || isEngine == "undefined" || isEngine == "") {
      switEngine(GetQueryString("engine"));
    } else {
      switEngine(isEngine);
    }
    //输入框文本变更事件
    $("#search-text").bind('input porpertychange',function () {
      keywordReminder();
    });
    //输入框获得焦点事件
    $("#search-text").focus(function () {
      keywordReminder();
    });
    //点击百度接口提供的联想关键字
    $(document).on("click", "#Sugword li", function () {
      let word = $(this).text();
      $("#search-text").val(word);
      $("#Sugword").empty();
      $("#Sugword").hide();
      $(".submit").trigger("click");
    });
    //点击输入框中的清空文本按钮
    $(document).on("click", ".delete", function () {
      $("#search-text").val("");
      $("#Sugword").hide();
      $(".delete").hide();
      $("#submit").attr("disabled", true);
    });
    //点击非输入框以外区域隐藏联系关键字
    $(document).mouseup(function (e) {
      var con = $("#search-text");
      if (!con.is(e.target) && con.has(e.target).length === 0) {
        $("#Sugword").hide();
      }
    });
    //键盘上下按键选择百度接口联想的关键字并将联想的关键字文本展示在输入框中
    $("#search-text").keydown(function (e) {
      if ($.trim($(this).val()).length === 0) return;
      let id = $(".choose").attr("data-id");
      if (id === undefined) id = 0;
      switch (e.key) {
        case "ArrowUp":
          id--;
          break;
        case "ArrowDown":
          id++;
          break;
        default:
          return
          break;
      }
      let length = $("#Sugword").attr("data-length");
      if (id > length) id = 1;
      if (id < 1) id = length;
      $("[data-id=" + id + "]").addClass("choose").siblings().removeClass("choose");
      $("#search-text").val($("[data-id=" + id + "]").text());
    });
  });
  //以下为暗黑模式与明亮模式的切换
  function setDark() {
    localStorage.setItem("isDarkMode", "1");
    document.documentElement.classList.add("dark");
  }
  function removeDark() {
    localStorage.setItem("isDarkMode", "0");
    document.documentElement.classList.remove("dark");
  }
  function switchDarkMode() {
    let isDark = localStorage.getItem("isDarkMode");
    if (isDark == "1") {
      removeDark();
    } else {
      setDark();
    }
  }
