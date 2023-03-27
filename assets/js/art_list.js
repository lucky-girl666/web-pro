$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }

    // 获取文章列表数据
    getArticleList()
    getCateName()
    function getArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('文章列表数据获取失败!')
                }
                layer.msg('文章列表数据获取成功!')
                var articlelist = template('tpl-table', res)
                $('tbody').html(articlelist)
                renderCate(res.total)
            }
        })
    }

    // 定义美化时间的过滤器  
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 获取筛选动态数据
    function getCateName() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败')
                }
                layer.msg('获取分类数据成功')
                var tpl_cate = template('tpl-cate', res)
                $('[name=cate_id]').html(tpl_cate)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }

    // 表单监听 
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        getArticleList()
    })

    // 分页
    function renderCate(total, first) {
         // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
        // 如果 first 的值为 true，证明是方式2触发的
        // 否则就是方式1触发的
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits:[2,3,5,10],
            jump: function(obj,first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if(!first){
                    getArticleList()         
                }
                   
            }
        })
        
       
    }
    

    $('tbody').on('click', '.btn-delete', function () {
        var len = $('.btn-delete').length
        var id = $(this).attr('data-id')
        layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success:function (res) {
                    if (res.status !== 0) {
                        return layer.msg('文章删除失败!')
                    }
                    layer.msg('文章删除成功!')
                    if (len === 1) {
                       q. pagenum = q. pagenum === 1 ? 1 : q. pagenum - 1
                    }
                    getArticleList()
                }
            })
            
            layer.close(index);
          });
       
    })
})