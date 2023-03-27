$(function () {
    var layer = layui.layer;
    var form = layui.form;
    // 富文
    initEditor()

    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取文章分类失败!')
            }
            layer.msg('获取文章分类成功!')
            var pubcate = template('pub_cate', res)
            $('[name=cate_id]').html(pubcate)
            form.render()
        }
    })

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    $('#coverFile').on('change', function (e) {
        var files = e.target.files
        if (files.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域


    })

    var state = '已发布';
    $('#btnsave2').on('click', function () {
        state = '草稿'
    })

    $('#form_pub').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', state)
        // fd.forEach(function (v,k) {
        //     console.log(k,v);
        // })
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                publishArticle(fd)
                
            })
        
            

    })

    function publishArticle(fd) {
        $.ajax({
          method: 'POST',
          url: '/my/article/add',
          data: fd,
          // 注意：如果向服务器提交的是 FormData 格式的数据，
          // 必须添加以下两个配置项
          contentType: false,
          processData: false,
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('发布文章失败！')
            }
            layer.msg('发布文章成功！')
            // 发布文章成功后，跳转到文章列表页面
            location.href = '/assets/article/art_list.html'
          }
        })
    }
})