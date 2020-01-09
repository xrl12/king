$(function () {
	var videoHtml = $('.videoWrapper').html().trim();
	if ((/^<embed.*><\/embed>$|^<embed.*>$/.test(videoHtml))) {
		$('.videogiant-container').addClass('iframeBox');
	}

    if ($('.videoPlayBtn').length > 0) {
        $('.videoPlayBtn').click(function () {
            var s = $('.videoWrapper').html()
            var regex = /<div class="videoPlayBtn">.*/;
            var s2 = s.replace(regex, "");
            regex = /<div class="videoCoverPic".*/;
            s2 = s2.replace(regex, "");
            // console.log(s2);
            openVideoDialog(s2);
            // // 以下标签在有封面图的情况下，点击播放按钮触发标签的视频自动播放
            // if ($('.videogiant-container video').length > 0) {
            //     $('.videogiant-container video').trigger('play');
            // } else if ($('.videogiant-container embed').length > 0) {
            //     $('.videogiant-container embed').attr('flashvars',"isAutoPlay=true");
            //     var videoHtml =  $('.videoWrapper').html().trim();
            //     $('.videoWrapper').html(videoHtml);
            // }
            // $(this).find('.videoPlayBtn').hide();
            // $(this).find('.videoCoverPic').hide();
        })
    }

    // 视频弹出播放窗口
    function openVideoDialog(obj) {
        if (obj) {
            var html = '';
            html += '<div id="bgVideoMask">';
            html += '<div class="popupBgForWin"></div>';
            html += '<div class="videoDialog">';
            html += '<div class="dialogVideoBox">';
            html += '<div class="cancelDialogVideo"></div>';
            html += '<div class="clearmb">';
            html += '<div class="playVideo">';
            html += obj;
            html += '</div></div></div></div></div>';

            $('body').append(html);

            if ($('#bgVideoMask video').length > 0) {
                $('#bgVideoMask video').trigger('play');
            } else if ($('#bgVideoMask embed').length > 0) {
                $('#bgVideoMask embed').attr('flashvars',"isAutoPlay=true");
                var videoHtml =  $('#bgVideoMask .playVideo').html().trim();
                $('#bgVideoMask .playVideo').html(videoHtml);
            }

            $('#bgVideoMask').find('.popupBgForWin').css({'position': 'fixed', 'background-color': '#000', 'opacity': '.7', '-webkit-transition': 'all 3s', 'transition': 'all 3s', 'z-index': '9499','margin': '0', 'padding': '0','left': '0', 'top': '0', 'right': '0', 'bottom': '0','margin': 'auto', 'overflow': 'hidden', 'height': '100%'});
            $('#bgVideoMask').find('.videoDialog').css({'position': 'fixed', 'z-index': '10000','left': '0', 'top': '0', 'right': '0', 'bottom': '0','margin': 'auto', 'width': '960px', 'height': '540px'});
            $('#bgVideoMask').find('.dialogVideoBox').css({'position': 'relative', 'height': '100%'});
            $('#bgVideoMask').find('.cancelDialogVideo').css({'position': 'absolute', 'z-index': '10001', 'cursor': 'pointer', 'right': '20px', 'background': 'url(image/vbg.png) -127px -142px no-repeat','margin-top': '14px', 'width': '34px', 'height': '34px'});
            $('#bgVideoMask').find('.clearmb').css({'overflow': 'hidden', 'background-color': '#000', 'width': '960px', 'height': '540px'});
            $('#bgVideoMask').find('.playVideo').css({'position': 'absolute', 'z-index': '9999', 'width': '100%', 'height': '0', 'top': '0','bottom': '0', 'margin': 'auto', 'padding-bottom': '55.95%'});
            $('#bgVideoMask').find('iframe').css({'width': '100%', 'height': '100%', 'position': 'absolute'});
            $('#bgVideoMask').find('embed').css({'width': '100%', 'height': '100%', 'position': 'absolute'});
            $('#bgVideoMask').find('object').css({'width': '100%', 'height': '100%', 'position': 'absolute'});
            $('#bgVideoMask').find('video').css({'width': '100%', 'height': '100%', 'position': 'absolute'});

            if (window.innerWidth < 769) {
                $('#bgVideoMask').find('.popupBgForWin').css({'opacity': '1'})
                $('#bgVideoMask').find('.videoDialog').css({'width': '100%', 'height': '100%'});
                $('#bgVideoMask').find('.clearmb').css({'width': '100%', 'height': '100%'});
            }

            $(window).on('resize', function () {
                if (window.innerWidth > 768) {
                    $('#bgVideoMask').find('.popupBgForWin').css({'opacity': '.7'})
                    $('#bgVideoMask').find('.videoDialog').css({'width': '960px', 'height': '540px'});
                    $('#bgVideoMask').find('.clearmb').css({'width': '960px', 'height': '540px'});
                } else {
                    $('#bgVideoMask').find('.popupBgForWin').css({'opacity': '1'})
                    $('#bgVideoMask').find('.videoDialog').css({'width': '100%', 'height': '100%'});
                    $('#bgVideoMask').find('.clearmb').css({'width': '100%', 'height': '100%'});
                }
            });

            $('#bgVideoMask .cancelDialogVideo').off().on('click', function () {
                $(this).parents('#bgVideoMask').remove();
            })
        }
    }
})