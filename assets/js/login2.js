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

    // 监听注册表单事件
    $('#form-td').on('submit',function (e) {
        e.preventDefault()
        $.post('/api/reguser',
        {
            username: $('#form-td [name = username]').val(),
            password: $('#form-td [name = password]').val()
        },
        function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link_login').click();
        })
    })

    // 监听登录表单事件
    $('#form-fb').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
                alert(res.token)
            }
        })
    })

})
