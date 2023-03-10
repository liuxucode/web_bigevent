$(function() {
    initArtCateList()
    var indexAdd = null
    var layer = layui.layer
    var form = layui.form

    function initArtCateList() {
        $.ajax({
                method: 'GET',
                url: 'http://big-event-api-t.itheima.net/my/article/cates',
                headers: {
                    Authorization: localStorage.getItem('token') || ''
                },
                success: function(res) {
                    console.log(res)
                    var htmlStr = template('tpl-table', res)
                    $('tbody').html(htmlStr)

                }
            })
            // $.ajax({
            //     method: 'GET',
            //     url: '/my/cate/list',
            //     success: function(res) {
            //         // console.log(res)
            //         var htmlStr = template('tpl-table', res)
            //         $('tbody').html(htmlStr)
            //     }
            // })

    }
    //为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                title: '添加文章分类',
                content: $('#dialog-add').html(),
                type: 1,
                area: ['500px', '250px']
            })
        })
        //通过代理的形式，为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
            // console.log('ok')
        $.ajax({
            method: 'post',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            url: 'http://big-event-api-t.itheima.net/my/article/addcates',

            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                layer.close(indexAdd)
            }
        })

    })
    var indexEdit = null
        //通过代理的形式，为btn-edit按钮绑定点击时间
    $('tbody').on('click', '.btn-edit', function() {
            //弹出一个修改文章分类信息的层

            indexEdit = layer.open({
                title: '修改文章分类',
                content: $('#dialog-edit').html(),
                type: 1,
                area: ['500px', '250px']
            })
            var id = $(this).attr('data-id')
            $.ajax({
                method: 'get',
                headers: {
                    Authorization: localStorage.getItem('token') || ''
                },
                url: "http://big-event-api-t.itheima.net/my/article/cates/" + id,
                success: function(res) {
                    // console.log(res)
                    form.val('form-edit', res.data)
                }

            })
        })
        //通过代理的形式，为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'post',
                url: 'http://big-event-api-t.itheima.net/my/article/updatecate',
                data: $(this).serialize(),
                headers: {
                    Authorization: localStorage.getItem('token') || ''
                },
                success: function(res) {
                    // console.log(res)
                    if (res.status !== 0) {
                        return layer.msg('更新分类数据失败！')
                    }
                    layer.msg('更新分类数据成功！')
                    layer.close(indexEdit)
                    initArtCateList()
                }
            })
        })
        //通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function(e) {
        // console.log('ok')
        var id = $(this).attr('data-id')
            //提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'get',
                url: 'http://big-event-api-t.itheima.net/my/article/deletecate/' + id,
                headers: {
                    Authorization: localStorage.getItem('token') || ''
                },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })

        });
    })
})