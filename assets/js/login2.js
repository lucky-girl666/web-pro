$(function () {
    $("#link_reg").click(function () {
        $(".reg-box").show();
        $(".login-box").hide();
    });
    
    $("#link_login").click(function () {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    
    // 使用layui规则
    var form = layui.form
    form.verify({
        pew: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repew:function (value) {
            var pew = $(".reg-box [name=password]").val();
            if (pew != value) {
                return '两次输入的密码不一致';
            }
        }
    })

})
