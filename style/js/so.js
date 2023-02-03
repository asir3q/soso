function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substring(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null) context = decodeURIComponent(r[2]);
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined"
      ? ""
      : context;
  }
  function switEngine(nameEngine) {
    switch (nameEngine) {
      case "baidu":
        $(".search-type img").attr("src", "./style/img/baidu.svg");
        $(".form").attr("action", "https://www.baidu.com/s");
        $("#search-text").attr("name", "wd");
        break;
      case "bing":
        $(".search-type img").attr("src", "./style/img/bing.svg");
        $(".form").attr("action", "https://cn.bing.com/search");
        $("#search-text").attr("name", "q");
        break;
      case "google":
        $(".search-type img").attr("src", "./style/img/google.svg");
        $(".form").attr("action", "https://www.google.com/search");
        $("#search-text").attr("name", "q");
        break;
      case "sogou":
        $(".search-type img").attr("src", "./style/img/sogou.svg");
        $(".form").attr("action", "https://www.sogou.com/web");
        $("#search-text").attr("name", "query");
        break;
      case "wechat":
        $(".search-type img").attr("src", "./style/img/wechat.svg");
        $(".form").attr("action", "https://weixin.sogou.com/weixin");
        $("#search-text").attr("name", "query");
        break;
      case "bilibili":
        $(".search-type img").attr("src", "./style/img/bilibili.svg");
        $(".form").attr("action", "https://search.bilibili.com/all");
        $("#search-text").attr("name", "keyword");
        break;
      case "zhihu":
        $(".search-type img").attr("src", "./style/img/zhihu.svg");
        $(".form").attr("action", "https://www.zhihu.com/search");
        $("#search-text").attr("name", "q");
        break;
      default:
        $(".search-type img").attr("src", "./style/img/baidu.svg");
        $(".form").attr("action", "https://www.baidu.com/s");
        $("#search-text").attr("name", "wd");
        break;
    }
  }
  function isoff() {
    $("#engine").hide();
    $(".m-mask").hide();
  }
  $(function () {
    $(document).on("click", ".search-type", function () {
      $("#engine").show();
      $(".m-mask").show();
    });
    $(document).on("click", ".m-mask", function () {
      isoff();
    });
    $(document).on("click", ".baidu", function () {
      isoff();
      localStorage.setItem("isEnginetype", "baidu");
      switEngine(localStorage.getItem("isEnginetype"));
    });
    $(document).on("click", ".bing", function () {
      isoff();
      localStorage.setItem("isEnginetype", "bing");
      switEngine(localStorage.getItem("isEnginetype"));
    });
    $(document).on("click", ".google", function () {
      isoff();
      localStorage.setItem("isEnginetype", "google");
      switEngine(localStorage.getItem("isEnginetype"));
    });
    $(document).on("click", ".sogou", function () {
      isoff();
      localStorage.setItem("isEnginetype", "sogou");
      switEngine(localStorage.getItem("isEnginetype"));
    });
    $(document).on("click", ".wechat", function () {
      isoff();
      localStorage.setItem("isEnginetype", "wechat");
      switEngine(localStorage.getItem("isEnginetype"));
    });
    $(document).on("click", ".bilibili", function () {
      isoff();
      localStorage.setItem("isEnginetype", "bilibili");
      switEngine(localStorage.getItem("isEnginetype"));
    });
    $(document).on("click", ".zhihu", function () {
      isoff();
      localStorage.setItem("isEnginetype", "zhihu");
      switEngine(localStorage.getItem("isEnginetype"));
    });
    let isEngine = localStorage.getItem("isEnginetype");
    if (isEngine == null || isEngine == "undefined" || isEngine == "") {
      switEngine(GetQueryString("engine"));
    } else {
      switEngine(isEngine);
    }
    $(document).on("click", ".help", function () {
      $(".helpword").attr("style", "top:0;");
    });
    $(document).on("click", ".close", function () {
      $(".helpword").attr("style", "top:100%;");
    });
    $("#search-text").keyup(function () {
      var keywords = $(this).val();
      if (keywords == "" || keywords == null || keywords == undefined) {
        $("#Sugword").hide();
        $(".delete").hide();
        $("#submit").attr("disabled", true);
        return;
      }
      $("#submit").attr("disabled", false);
      $(".delete").show();
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
          $.each(data.s, function () {
            $("#Sugword").append("<li>" + this + "</li>");
          });
        },
        error: function () {
          $("#Sugword").empty().show();
          $("#Sugword").hide();
        }
      });
    });
    $(document).on("click", "#Sugword li", function () {
      var word = $(this).text();
      $("#search-text").val(word);
      $("#Sugword").empty();
      $("#Sugword").hide();
      $(".submit").trigger("click");
    });
    $(document).on("click", "body", function () {
      $("#Sugword").empty();
      $("#Sugword").hide();
    });
    $(document).on("click", ".delete", function () {
      $("#search-text").val("");
      $("#Sugword").hide();
      $(".delete").hide();
      $("#submit").attr("disabled", true);
    });
  });
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
