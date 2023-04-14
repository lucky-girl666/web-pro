$(function () {
    var form = layui.form;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if (value === $('[name = oldPwd]').val()) {
                return ('新旧密码不能一致')
            }
        },
        repwd: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return ('两次密码不一致')
            }
        }
    })

    $('#password_from').on('submit', function (e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            method:'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            // headers: {
            //     Authorization:localStorage.getItem('token')
            // },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                // 重置表单
                $('#password_from')[0].reset()
            },
            // complete: function(res) {
            //     // console.log('执行了 complete 回调：')
            //     // console.log(res)
            //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //       // 1. 强制清空 token
            //       localStorage.removeItem('token')
            //       // 2. 强制跳转到登录页面
            //       location.href = '/login.html'
            //     }
            //   }
        })
    })
})