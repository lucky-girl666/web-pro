$(function () {
    getUserInfor()
    var layer = layui.layer
    $('#btnLogout').on('click',function () {
        layer.confirm('确认退出登录？', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href = '/login.html'
            
            layer.close(index);
          });
    })
   
})


function getUserInfor() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success:function (res) {
           if (res.status !== 0) {
            return layui.layer.msg('用户信息认证失败！')
            } 
            renderAvatar(res.data)
        }


    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name )
    if (user.user_pic !== null) {
        $('.text-avatar').hide() 
        $('.layui-nav-img') .attr('src', user.user_pic).show()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}