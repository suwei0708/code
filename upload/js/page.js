(function($) {
$(function() {
    // 用户中心删除草稿
    $('.upload-wrap.draft').on('click', '.del-btn', function() {
        $(this).parents('li').remove();
    });

    // 预览图片
    $('#upload-wrap').on('click', '.j-preview-btn', function() {
        if(typeof($(this).parents('.upload-item').find('.img').attr('src')) != 'undefined') {
            console.log($(this).parents('.upload-item').find('.img').attr('src'))
            $('#preview-model').show();
        }
        else {
            $(this).parents('.upload-item').find('.btn-preview input').click();
        }
    });
    // 收起展开
    $('#upload-wrap').on('click', '.item-handle', function() {
        var $item = $(this).parents('.upload-item');
        if($item.data('step') == 1) {
            if($(this).html() == '收起') {
                $(this).html('展开');
                $item.find('.upload-btn-right').hide();
                $item.find('.item-step').hide();
            }
            else {
                $(this).html('收起');
                $item.find('.upload-btn-right').show();
                $item.find('.item-step').show();
            }
        }
        else if($item.data('step') == 2) {
            if($(this).html() == '收起') {
                $(this).html('展开');
                $item.find('.upload-btn-right').hide();
                $item.find('.item-step').hide();
                $item.find('.file-info').hide();
                $item.find('.item-upload').show();
            }
            else {
                $(this).html('收起');
                $item.find('.upload-btn-right').show();
                $item.find('.item-step').show();
                $item.find('.file-info').show();
                $item.find('.item-upload').hide();
            }
        }
    });

    // 删除上传弹窗
    $('#upload-wrap').on('click', '.item-close', function() {
        $('#mk-alert').show();
    });

    // 上传预览图
    $('#upload-wrap').on('click', '.btn-preview', function() {
        btnPreview = $(this).parents('.upload-item');
    });

    // 下一步
    $('#upload-wrap').on('click', '.j-step-next', function() {
        if(!$(this).hasClass('disable')) {
            var $str = `<div class="input-classify-warp">
                            <div class="classify-select">
                                <input type="text" placeholder="请选择" class="classify-input">
                                <div class="select-drop">
                                    <ul class="drop-main clearfix">
                                        <li class="main-list fll on">一级分类
                                            <dl class="list-wrap clearfix" style="display: block;">
                                                <dd class="wrap-item fll" data-value="2">平面广告</dd>
                                                <dd class="wrap-item fll" data-value="3">电商淘宝</dd>
                                                <dd class="wrap-item fll" data-value="4">装饰装修</dd>
                                                <dd class="wrap-item fll" data-value="5">网页UI</dd>
                                                <dd class="wrap-item fll" data-value="6">视频音效</dd>
                                                <dd class="wrap-item fll" data-value="7">产品工业</dd>
                                                <dd class="wrap-item fll" data-value="8">PPT模板</dd>
                                                <dd class="wrap-item fll" data-value="9">高清图库</dd>
                                                <dd class="wrap-item fll" data-value="10">背景</dd>
                                                <dd class="wrap-item fll" data-value="11">设计元素</dd>
                                                <dd class="wrap-item fll" data-value="12">Excel模板</dd>
                                                <dd class="wrap-item fll" data-value="13">文库模版</dd>
                                                <dd class="wrap-item fll" data-value="14">简历模板</dd>
                                                <dd class="wrap-item fll" data-value="15">Word范文</dd>
                                                <dd class="wrap-item fll" data-value="16">手机用图</dd>
                                            </dl>
                                        </li>
                                        <li class="main-list fll">二级分类
                                            <dl class="list-wrap clearfix" style="display: none;"> </dl>
                                        </li>
                                        <li class="main-list fll">三级分类
                                            <dl class="list-wrap clearfix" style="display: none;"> </dl>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p class="mk-btn btn-green"><a class="cate-reset" href="javascript:;">重置</a></p>
                            <!-- <p class="mk-btn btn-green-linear"><a class="cate-submit" href="javascript:;">确定</a></p> -->
                            <div class="commonly-use"> 最近常用：
                                <p data-value="{&quot;did&quot;:&quot;6&quot;,&quot;dname&quot;:&quot;视频音效&quot;,&quot;kid&quot;:&quot;243&quot;,&quot;kname&quot;:&quot;AE模板&quot;,&quot;bigclassid&quot;:&quot;1068&quot;,&quot;bigclassname&quot;:&quot;影视包装&quot;}" class="used-classify">视频音效&gt;AE模板&gt;影视包装</p>
                            </div>
                        </div>
                        <div class="input-inline">
                            <div class="image-preview"> <img src="http://pic.qiantucdn.com/58pic/28/40/33/94I58PICc58PIC20903V6uj2f_PIC2018.png!/fw/270/compress/true/clip/270x360a0a0" alt=""> </div>
                            <p class="label">素材类型：</p>
                            <div class="label-main">
                                <input type="radio" name="pic_type" id="r1-2-28403394" value="0" checked="">
                                <label for="r1-2-28403394"> 共享 </label>
                                <input type="radio" name="pic_type" id="r1-1-28403394" value="1">
                                <label for="r1-1-28403394"> 原创 </label>
                            </div>
                        </div>
                        <div class="input-inline">
                            <p class="label">标题：</p>
                            <p class="form-warning">请输入标题</p>
                            <div class="label-main">
                                <input name="title" type="text" value="qj-ico" placeholder="请输入作品标题"> <em class="text-num" style="top: 8px;">6/20</em> </div>
                        </div>
                        <div class="input-inline">
                            <p class="label">关键字：</p>
                            <p class="form-warning">请输入关键词</p>
                            <div class="label-main">
                                <textarea name="keyword" style="display: none"></textarea>
                                <div class="textarea-wrap">
                                    <input type="text" placeholder="输入标签内容回车即可添加关键字"> </div> <em class="text-num" style="bottom: 7px;">0/70</em>
                                <div class="keyword-recommend" style="display: none;"> </div>
                            </div>
                        </div>
                        <div class="input-inline">
                            <p class="label">已选中格式：</p>
                            <p class="form-warning" style="bottom: 0">请输入关键词</p>
                            <div class="label-main cate-format-default">
                                <p>
                                    <input type="checkbox" value="1" name="format_id" checked="">
                                    <label>psd</label>
                                    <select style="width:257px;margin-right:20px;" class="format-software">
                                        <option data-software="[{&quot;id&quot;:&quot;7&quot;,&quot;title&quot;:&quot;Adobe Photoshop CS6&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CS6&quot;},{&quot;id&quot;:&quot;6&quot;,&quot;title&quot;:&quot;Adobe Photoshop CS5&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CS5&quot;},{&quot;id&quot;:&quot;57&quot;,&quot;title&quot;:&quot;Adobe Photoshop CS4&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CS4&quot;},{&quot;id&quot;:&quot;56&quot;,&quot;title&quot;:&quot;Adobe Photoshop CS3&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CS3&quot;},{&quot;id&quot;:&quot;55&quot;,&quot;title&quot;:&quot;Adobe Photoshop CS2&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CS2&quot;},{&quot;id&quot;:&quot;54&quot;,&quot;title&quot;:&quot;Adobe Photoshop CS&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CS&quot;},{&quot;id&quot;:&quot;63&quot;,&quot;title&quot;:&quot;Adobe Photoshop CC 2018&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CC 2018&quot;},{&quot;id&quot;:&quot;62&quot;,&quot;title&quot;:&quot;Adobe Photoshop CC 2017&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CC 2017&quot;},{&quot;id&quot;:&quot;61&quot;,&quot;title&quot;:&quot;Adobe Photoshop CC 2016&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CC 2016&quot;},{&quot;id&quot;:&quot;60&quot;,&quot;title&quot;:&quot;Adobe Photoshop CC 2015&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CC 2015&quot;},{&quot;id&quot;:&quot;59&quot;,&quot;title&quot;:&quot;Adobe Photoshop CC 2014&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CC 2014&quot;},{&quot;id&quot;:&quot;58&quot;,&quot;title&quot;:&quot;Adobe Photoshop CC 2013&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;CC 2013&quot;},{&quot;id&quot;:&quot;3&quot;,&quot;title&quot;:&quot;Adobe Photoshop 7.0&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;7.0&quot;},{&quot;id&quot;:&quot;2&quot;,&quot;title&quot;:&quot;Adobe Photoshop 6.0&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;6.0&quot;},{&quot;id&quot;:&quot;51&quot;,&quot;title&quot;:&quot;Adobe Photoshop 5.0&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;5.0&quot;},{&quot;id&quot;:&quot;50&quot;,&quot;title&quot;:&quot;Adobe Photoshop 4.0&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;4.0&quot;},{&quot;id&quot;:&quot;49&quot;,&quot;title&quot;:&quot;Adobe Photoshop 3.0&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;3.0&quot;},{&quot;id&quot;:&quot;48&quot;,&quot;title&quot;:&quot;Adobe Photoshop 2.0&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;2.0&quot;},{&quot;id&quot;:&quot;47&quot;,&quot;title&quot;:&quot;Adobe Photoshop 1.0&quot;,&quot;name&quot;:&quot;Adobe Photoshop&quot;,&quot;version&quot;:&quot;1.0&quot;}]">Adobe Photoshop</option>
                                    </select>
                                    <select class="soft_id_1" style="width:257px;">
                                        <option value="">请选择最低支持版本</option>
                                        <option value="7"> Adobe Photoshop CS6 </option>
                                        <option value="7"> Adobe Photoshop CS5 </option>
                                        <option value="7"> Adobe Photoshop CS4 </option>
                                        <option value="7"> Adobe Photoshop CS3 </option>
                                        <option value="7"> Adobe Photoshop CS2 </option>
                                        <option value="7"> Adobe Photoshop CS </option>
                                        <option value="7"> Adobe Photoshop CC 2018 </option>
                                        <option value="7"> Adobe Photoshop CC 2017 </option>
                                        <option value="7"> Adobe Photoshop CC 2016 </option>
                                        <option value="7"> Adobe Photoshop CC 2015 </option>
                                        <option value="7"> Adobe Photoshop CC 2014 </option>
                                        <option value="7"> Adobe Photoshop CC 2013 </option>
                                        <option value="7"> Adobe Photoshop 7.0 </option>
                                        <option value="7"> Adobe Photoshop 6.0 </option>
                                        <option value="7"> Adobe Photoshop 5.0 </option>
                                        <option value="7"> Adobe Photoshop 4.0 </option>
                                        <option value="7"> Adobe Photoshop 3.0 </option>
                                        <option value="7"> Adobe Photoshop 2.0 </option>
                                        <option value="7"> Adobe Photoshop 1.0 </option>
                                    </select>
                                </p>
                            </div>
                            <div class="label-main cate-format-selected" style="display:none;"> </div>
                            <div class="checkbox-wrap  cate-format" style="display:none;"> </div>
                            <input type="text" placeholder="使用说明" name="guide" style="margin-bottom: 20px"> </div>
                        <div class="input-inline j_did2-visible" style="display: none">
                            <p class="label">色彩模式：</p>
                            <div class="label-main">
                                <input type="radio" name="color_mode" id="r2-0-28403394" value="1">
                                <label for="r2-0-28403394"> RGB </label>
                                <input type="radio" name="color_mode" id="r2-1-28403394" value="2">
                                <label for="r2-1-28403394"> CMYK </label>
                            </div>
                        </div>
                        <div class="input-inline j_did6-visible">
                            <p class="label">分辨率：</p>
                            <div class="label-main">
                                <input type="radio" name="pdpi" id="r3-0-28403394" value="72">
                                <label for="r3-0-28403394"> 72dpi </label>
                                <input type="radio" name="pdpi" id="r3-1-28403394" value="300">
                                <label for="r3-1-28403394"> 300dpi </label>
                                <input type="radio" name="pdpi" id="r3-3-28403394" value="0" checked="">
                                <label for="r3-3-28403394">
                                    <input type="text" placeholder="请自己填写" class="j-pdpi-input" style="width:109px;margin-top:             -6px;"> dpi </label>
                            </div>
                        </div>
                        <div class="input-inline j_did6-visible">
                            <p class="label">作品尺寸：</p>
                            <div class="label-main">
                                <input type="text" name="pwidth" placeholder="宽" value="96" style="width:88px;"> px
                                <input type="text" name="pheight" placeholder="高" value="898" style="width:88px;"> px </div>
                        </div>
                        <div class="input-inline j_did6-visible-1" style="display: none">
                            <p class="label">视频分辨率：</p>
                            <div class="label-main">
                                <input type="radio" name="vdpi" id="r4-0-28403394" value="1">
                                <label for="r4-0-28403394"> 720p </label>
                                <input type="radio" name="vdpi" id="r4-1-28403394" value="2">
                                <label for="r4-1-28403394"> 1080p </label>
                                <input type="radio" name="vdpi" id="r4-2-28403394" value="3">
                                <label for="r4-2-28403394"> 2k </label>
                                <input type="radio" name="vdpi" id="r4-3-28403394" value="4">
                                <label for="r4-3-28403394"> 4k </label>
                                <input type="radio" name="vdpi" id="r4-5-28403394" value="0" checked="">
                                <label for="r4-5-28403394">
                                    <input type="text" style="width: 109px;margin-top: -6px;" placeholder="空" disabled=""> </label>
                            </div>
                        </div>
                        <div class="input-inline j_did6-visible-1" style="display: none">
                            <p class="label">视频/音频时长：</p>
                            <p class="form-warning">请选择</p>
                            <div class="label-main">
                                <input type="text" name="vsec" placeholder="分钟" style="width:80px;">
                                <input type="text" placeholder="秒" class="j-sec" style="width:80px;"> </div>
                        </div>
                        <div class="input-inline j-ogcVisible" style="display:none">
                            <p class="label">来源类型：</p>
                            <p class="form-warning">请输入关键词</p>
                            <div class="label-main">
                                <input type="radio" name="source" id="r5-0-28403394" value="1" checked="">
                                <label for="r5-0-28403394"> 特邀设计师 </label>
                                <input type="radio" name="source" id="r5-1-28403394" value="2">
                                <label for="r5-1-28403394"> 普通原创 </label>
                            </div>
                        </div>
                        <div class="input-inline j-ogcVisible j-ogcVisible-s" style="display:none">
                            <p class="label">主题：</p>
                            <p class="form-warning">请填写主题</p>
                            <div class="label-main">
                                <input name="theme_id" type="hidden">
                                <input class="theme_name" type="text" placeholder="请填写主题">
                                <div class="wrap-handle j-getTheme"> 全部分类 </div>
                                <div class="wrap-dropbox">
                                    <div class="no-result" style="display:none;"> 未找到符合条件的主题，查看可选主题 <em class="j-getTheme text-green">查看</em> </div>
                                    <div class="result-list" style="display:none;"> </div>
                                    <div class="classify-list" style="display:none;"> </div>
                                </div>
                            </div>
                        </div>
                        <div class="input-inline j-ogcVisible j-ogcVisible-s" style="display:none">
                            <p class="label">风格：</p>
                            <p class="form-warning">请填写风格</p>
                            <div class="label-main">
                                <input name="style_id" type="hidden">
                                <input class="style_name" type="text" placeholder="请填写风格">
                                <div class="wrap-handle j-getStyle"> 全部分类 </div>
                                <div class="wrap-dropbox">
                                    <div class="no-result" style="display:none;"> 未找到符合条件的风格，查看可选风格 <em class="j-getStyle text-green">查看</em> </div>
                                    <div class="result-list" style="display:none;"> </div>
                                    <div class="classify-list" style="display:none;"> </div>
                                </div>
                            </div>
                        </div>
                        <div class="input-inline j-ogcVisible j-ogcVisible-s" style="display:none">
                            <p class="label">版权信息：</p>
                            <p class="form-warning">请输入网址链接</p>
                            <div class="label-main">
                                <select name="copyright" style="width:400px;">
                                    <option value="1" selected="">无人像VRF</option>
                                    <option value="2">带人像VRF</option>
                                    <option value="3">CCO</option>
                                </select>
                                <input type="text" class="hidden" name="portrait_url" placeholder="请输入摄图网网址" style="display:none;width:400px;"> </div>
                        </div>`
            var $dom = $(this).parents('.upload-item');
            $dom.data('step', '2').find('.tag-i').html('2');
            $dom.find('.item-step .step-intro:eq(1)').addClass('action');
            $dom.find('.item-upload').hide();
            $dom.find('.j-step-next').attr('class', 'mk-btn btn-green-linear submit-btn').html('<a href="javascript:;">提交</a>');
            $dom.find('.file-info').show().html($str);
        }
    });

    // 分类弹出框
    $('#upload-wrap').on('click', '.classify-select', function() {
        $('.select-drop').find('.drop-main li').find('.list-wrap').hide();
        $('.select-drop').show().find('.drop-main li').removeClass('on').eq(0).addClass('on').find('.list-wrap').show();
    });
    // 分类input不聚焦
    $('#upload-wrap').on('focus', '.classify-input', function() {
        $(this).blur();
    });
    // 分类切换
    $('#upload-wrap').on('click', '.drop-main li', function() {
        $(this).addClass('on').siblings().removeClass('on').find('.list-wrap').hide();
        $(this).find('.list-wrap').show();
    });

    // 实例化
    uploader = WebUploader.create({
        pick: '#uploadFile-button',
        dnd: '#dndArea',
        swf: 'Uploader.swf',
        chunked: false,
        chunkSize: 512 * 1024,
        server: '/test/upload.html',
        compress: false,
        auto: true,

        // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
        disableGlobalDnd: true,
        fileNumLimit: 300,
        fileSizeLimit: 200 * 1024 * 1024,    // 200 M
        fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
    });

    // 加入上传队列之前
    uploader.on('beforeFileQueued', function(file) {
        // 判断上传文件是否大于20G
        if(file.size > 1024 * 1024 * 1024 * 20) {
            alert('文件过大')
            return false;
        }
    });
    // 加入上传队列
    uploader.on('fileQueued', function(file) {
        var str = `<div class="upload-item" data-step="1" id="` + file.id + `">
                        <div class="item-close">×</div>
                        <div class="item-tag">` + (+file.id.replace('WU_FILE_', '') + 1) + `</div>
                        <div class="item-title">设置预览图/视频 <em class="tag-em">(<i class="tag-i">1</i>/3)</em></div>
                        <!-- 步骤 start -->
                        <div class="item-step">
                            <div class="step-intro action">
                                <p class="step-num">1</p>
                                <p class="step-text">设置预览图/视频</p>
                            </div>
                            <div class="step-intro">
                                <p class="step-num">2 </p>
                                <p class="step-text">完善信息</p>
                            </div>
                            <div class="step-intro">
                                <p class="step-num">3</p>
                                <p class="step-text">完成上传</p>
                            </div>
                        </div>
                        <!-- 步骤 end -->
                        <!-- 第一步 start -->
                        <div class="item-upload" style="display: block;">
                            <div class="upload-preview">
                                <img src="" width="72" height="96" alt="" class="img">
                                <a href="javascript:;" class="upload-btn btn-edit"><i class="icon icon-bianji"></i>编辑</a>
                                <a href="javascript:;" class="upload-btn btn-preview"><span>上传预览图</span></a>
                            </div>
                            <div class="upload-info">
                                <p class="info-name"> ` + file.name + ` </p>
                                <p class="info-des">大小: ` + WebUploader.formatSize( file.size ) + `</p>
                            </div>
                            <div class="upload-progress">
                                <img src="images/success.png" class="icon-success" width="70" height="70">
                                <img src="images/waiting.png" class="icon-waiting" width="70" height="70">
                                <img src="images/warning.png" class="icon-warning" width="70" height="70">
                                <div class="progress-text"></div>
                            </div>
                        </div>
                        <!-- 第一步 end -->
                        <!-- 第二步 start -->
                        <form class="file-info"></form>
                        <!-- 第二步 end -->
                        <!-- 第三步 start -->
                        <div class="file-success"></div>
                        <!-- 第三步 end -->
                        <div class="upload-btn-right">
                            <p class="mk-btn btn-green j-preview-btn">
                                <a href="javascript:;">预览图</a>
                            </p>
                            <p class="mk-btn btn-green-linear j-step-next disable">
                                <a href="javascript:;">下一步</a>
                            </p>
                        </div>
                        <div class="item-handle">展开</div>
                    </div>`;
        $('#upload-wrap').append(str);
        if($('.upload-item').length == 1 ) {
            $('#upload-wrap').find('.upload-item').eq(0).find('.item-handle').html('收起');
        }
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        $li = $( '#'+file.id );
        $percent = $li.find('.upload-progress');
        $percent.find('img').hide();
        $percent.find('.icon-waiting').show();
        $percent.find('.progress-text').html( parseInt(percentage * 100) + '%' );
        if(percentage == 1) {
            $percent.find('.icon-waiting').hide();
            $percent.find('.icon-success').show();
        }
    });

    // 上传成功
    uploader.on('uploadSuccess', function(file, response) {
        $li = $( '#'+file.id );
        $percent = $li.find('.upload-progress');
        $img = $li.find('.img');
        // uploader.reset();// 如果出现问题，一定要加上这一句
        $percent.find('.progress-text').html('上传成功');
        if(typeof($li.find('.img').attr('src')) != 'undefined') {
            $li.find('.j-step-next').removeClass('disable');
        }
        // 创建预览图
        uploader.makeThumb(file, function(error, src) {
            if (error) {
                // $img.replaceWith('<span>此文件无法预览</span>');
                $li.find('.btn-preview').css({'display': 'block'});

                // 实例化
                var upload  = WebUploader.create({
                    pick: $li.find('.btn-preview'),
                    swf: 'Uploader.swf',
                    chunked: false,
                    chunkSize: 512 * 1024,
                    server: '/test/upload.html',
                    compress: false,
                    auto: true,
                    accept: {
                        title: 'Images',
                        extensions: 'jpg, jpeg',
                        mimeTypes: 'image/*'
                    }
                });
                upload.on('uploadSuccess', function(file, response) {
                    // uploader.reset();// 如果出现问题，一定要加上这一句
                    uploader.makeThumb(file, function(error, src) {
                        if (error) {
                            alert('请上传正确图片');
                            return;
                        }
                        btnPreview.find('.img').prop('src', src);
                        btnPreview.find('.btn-preview').hide();
                        btnPreview.find('.btn-edit').show();
                        if(btnPreview.find('.img').attr('src') != 'undefind') {
                            $li.find('.j-step-next').removeClass('disable');
                        }
                    }, 72, 96);
                });

                return;
            }
            $( '#'+file.id ).find('.img').prop('src', src);
            $( '#'+file.id ).find('.btn-edit').show();
        }, 72, 96);
    });
    // 上传失败
    uploader.on('uploadError', function(file, response) {
        $li = $( '#'+file.id );
        $percent = $li.find('.upload-progress');
        $percent.find('img').hide();
        $percent.find('.icon-warning').show();
        // uploader.reset();// 如果出现问题，一定要加上这一句
        $percent.find('.progress-text').html('上传失败');
    });

});
})(jQuery);