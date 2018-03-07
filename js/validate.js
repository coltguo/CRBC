jQuery(document).ready(function() {
    
    $('#submit-feedback-btn').on('click', function() {
        var $name = $('#feedbackform-name');
        var $email = $('#feedbackform-email');
        var $text = $('#feedbackform-text');
        var that = $(this);

        if ($.trim($name.val()) == '') {
            $name.next().html('您的名字不能为空').show();
            return;
        }
        var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
            regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if (regEn.test($.trim($name.val())) || regCn.test($.trim($name.val()))) {
            $name.next().html('您的名字不能包含特殊字符').show();
            return;
        }
        $name.next().html('').hide();

        if ($.trim($email.val()) == '') {
            $email.next().html('您的邮件地址不能为空').show();
            return;
        }
        var emailReg = new RegExp("^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$");
        if (!emailReg.test($.trim($email.val()))) {
            $email.next().html('您的邮件地址不符合规则').show();
            return;
        }
        $email.next().html('').hide();

        if ($.trim($text.val()) == '') {
            $text.next().html('留言内容不能为空').show();
            return;
        }
        var regTextEn = /[`~!@#$%^&*()_+<>?:"{}.\/;'[\]]/im;
        if (regTextEn.test($.trim($text.val()))) {
            $text.next().html('留言内容不能包含特殊字符').show();
            return;
        }
        $text.next().html('').hide();

        $.ajax({
            type: "POST",
            url: "/feedback/request",
            data: {
                name: $.trim($name.val()),
                email: $.trim($email.val()),
                text: $.trim($text.val())
            },
            dataType: "json",
            success: function(data) {
                if (data.code == '000000') {
                    $('#tnx').show();
                } else {
                    $text.next().html(data.msg).show();
                    data.msg == '您已经留过言了' ? that.off('click') : '';
                }
            }
        });

    });
    function aa(){
     
    }
    $('#video1').click(function(){
        $('.j-videoAD1').html(videoObj.videoAD1Url);
        $('#video1').attr('style','display:none')  
    })
    $('#video1-2').click(function(){
        $('.j-videoAD1').html(videoObj.videoAD1Url);
        $('#video1-2').attr('style','display:none')  
    })
    $('#video2').click(function(){
        $('.j-videoAD2').html(videoObj.videoAD2Url);
        $('#video2').attr('style','display:none')  
    })
    $('#video2-2').click(function(){
        $('.j-videoAD2').html(videoObj.videoAD2Url);
        $('#video2-2').attr('style','display:none')  
    })
    getConfigureData();
    var videoObj={};
    function getConfigureData() {

        $.ajax({
            type: "GET",
            url: "https://www.wearechain.com/configure",
            data: {},
            dataType: "json",
            success: function(data) {
                var u = navigator.userAgent, app = navigator.appVersion;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if (data.code == '000000') {
                    videoObj.videoAD1Url=data.obj.videoAD1Url;
                    videoObj.videoAD2Url=data.obj.videoAD2Url;
                        // $('.j-videoAD1').html(data.obj.videoAD1Url);
                        // $('.j-videoAD2').html(data.obj.videoAD2Url);
                    // $('.j-imgAD1').css('background-image', 'url(' + data.obj.imgAD1Url + ')');
                    if (data.obj.imgAD1Href != '') {
                        $('.j-imgAD1').click(function() {
                            window.location.href = data.obj.imgAD1Href;
                        });
                    }

                    $('.j-imgAD2').css('background-image', 'url(' + data.obj.imgAD2Url + ')');
                    if (data.obj.imgAD2Href != '') {
                        $('.j-imgAD2').click(function() {
                            window.location.href = data.obj.imgAD2Href;
                        });
                    }

                    $('.j-imgAD3').css('background-image', 'url(' + data.obj.imgAD3Url + ')');
                    if (data.obj.imgAD3Href != '') {
                        $('.j-imgAD3').click(function() {
                            window.location.href = data.obj.imgAD3Href;
                        });
                    }
                } else {
                    console.log('获取数据失败');
                }
            }
        });
    }

    // if (window.location.href.indexOf('ico.html')) {
    //     getProgressData();
    // }

    // jsonpCallback("obj":[{ "obj": [{ "cName": "比特币（BTC）", "enName": "Bitcoin (BTC)", "value": "0%" }] }]);

    // function getProgressData() {
    //     $.ajax({
    //         type: "GET",
    //         url: "https://wearechain.com/x01/console/info/progress",
    //         data: {},
    //         jsonpCallback: 'jsonpCallback',
    //         dataType: "jsonp",
    //         success: function(data) {
    //             var len = 0;
    //             var html = '';
    //             try {
    //                 len = data.obj.length;
    //             } catch (e) {}

    //             for (var i = 0; i < len; i++) {
    //                 if (window.location.href.indexOf('/en/') > 0) {
    //                     html += '<li><span class="bname">' + data.obj[i].enName + '</span><span class="bProgress"><i style="width:' + data.obj[i].value + '"></i></span><span class="bNumericale">' + data.obj[i].value + '</span></li>';
    //                 } else {
    //                     html += '<li><span class="bname">' + data.obj[i].cName + '</span><span class="bProgress"><i style="width:' + data.obj[i].value + '"></i></span><span class="bNumericale">' + data.obj[i].value + '</span></li>';
    //                 }
    //             }
    //             $('.cFProgress ul').html(html);

    //         }
    //     });
    // }

});