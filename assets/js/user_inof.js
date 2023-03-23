$(function () {
    // 设置input
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    getUserInof()

    // 重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        getUserInof()
    })

    // 提交修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败!')
                }
                layui.layer.msg('更新用户信息成功!')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfor()
            }
        })
    })

})

// 获取用户初始信息
function getUserInof() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.form.val('formUserInof', res.data);
        }
    })
}

