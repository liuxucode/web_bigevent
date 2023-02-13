$(function() {
    //调用getUserInfo获取用户基本信息
    getUserInfo()
    $('#btnLogout').on('click', function() {
        // console.log('ok')
        //提示用户是否确认退出
        var layer = layui.layer
        layer.confirm("确定退出登录？", { icon: 3, title: '提示' }, function(index) {

            //    console.log('ok')
            //1.清空本地存储中的token
            localStorage.removeItem('token')

            //2.重新跳转到登录页面
            location.href = '/login.html'
                //关闭confirm询问框
            layer.close(index)

        })
    })
})



function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function(res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                console.log(res.data)
                renderAvatar(res.data)
            }
            // ,
            // complete: function(res) {
            //     // console.log('执行了complete回调：')
            //     // console.log(res)
            //     //在complete回调函数中，可以使用res.responseJSON拿到服务器相应回来的数据
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         //1.强制清空token
            //         localStorage.removeItem('token')
            //             //2. 强制跳转到登录页面
            //         location.href = '/day1test//login.html'
            //     }
            // }
    })



}

function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
        //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.layui-avatar').hide()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}