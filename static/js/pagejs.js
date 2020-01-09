$(function () {
    // $('.main-nav-item-group').hover(function () {
    //     $(this).firstChild().addClass('main-nav-item-hover')
    // }, function () {
    //     if($(this).index() != 0){
    //         $(this).firstChild().removeClass('main-nav-item-hover')
    //     }
    // })

    $('.lcbody').click(function () {
      // var iCurNum = $('.mobileNav').attr('navnum') || 1;
      // if (iCurNum == 1 || iCurNum == 5) {
      //   $("#pagebody").css({
      //     "-ms-transition": "0.5s",
      //     "-webkit-transition": "0.5s",
      //     "-khtml-transition": "0.5",
      //     "-o-transition": "0.5s",
      //     "-moz-transition": "0.5s",
      //     "transition": "0.5s"
      //   });
      //   var iTranslateX = 0;
      //   $('#pagebody').css('left', iTranslateX);
      // } else {
      //   $("#pagebody").css({
      //     "-ms-transition": "",
      //     "-webkit-transition": "",
      //     "-khtml-transition": "",
      //     "-o-transition": "",
      //     "-moz-transition": "",
      //     "transition": ""
      //   });
      // }
      $('article .containers').toggleClass('view-change');
      $('.mobileNav').toggleClass('showFloatNav');
      // $('#MobileNavRenderElem').toggleClass('showFloatNav');
      $('.mobileNavFloatLayer').toggleClass('showFloatNav');
      // $('#pagebody').toggleClass('showFloatNav');
      // $('#MobileFootNav').toggleClass('showFloatNav');
      // $('#MobileNavMask').toggleClass('showFloatNav');
    })

    // $('#accordion li').click(function () {
    //     $(this).find('.main-class-colorlump').show()
    // })

    $('#accordion span.more').click(function () {
        $(this).closest('li').toggleClass('open').find('.subnav').slideToggle();
    })

    $('.main-class-item p').click(function () {
        $(this).find('.main-class-icon').addClass('active').end().next().slideDown().parent().addClass('active').siblings().removeClass('active').children('.sub-class-item-box').slideUp().prev().find('.main-class-icon').removeClass('active');
    })

    $('.mbpro-class-item').click(function () {
        $(this).find('.mbpro-class-icon').addClass('active').end().next().slideDown().parent().addClass('active').siblings().removeClass('active').children('.mbsub-class-item-box').slideUp().prev().find('.mbpro-class-icon').removeClass('active');
    })

    $('.productClsGiant .class-title-icon').click(function () {
        $('.productCommonClsGiant.dialog-show').removeClass('dialog-hide').css({display: "block"})
    })

    $('.dialog-left').click(function () {
        $('.productCommonClsGiant.dialog-show').addClass('dialog-hide')
    })

    $('.newsGridGiant .class-title-icon').click(function () {
        $(this).toggleClass('icon-jia').toggleClass('icon-jian').parent().next().slideToggle()
    })

	moveMiniImg();
    hoverMiniImg();
    bigImg();

	function bigImg(){
		let $mediumImg = $('#mediumImg');//中图
		let $mask = $('#mask');//小白块
		let $maskTop = $('#maskTop');//hover事件发生的容器范围
		let $largeImgContainer = $('#largeImgContainer');//大图容器
		let $largeImg = $('#largeImg');//大图
		let maskWidth = $mask.width();//黄块的宽
		let maskHeight = $mask.height();//黄块的高
		let maskTopWidth = $maskTop.width();//图片宽
		let maskTopHeight = $maskTop.height();//图片高

		$maskTop.hover(function() {//移入
			//显示小黄块
			$mask.show();

			//动态加载对应的大图
			var src = $mediumImg.attr('src').replace('_m', '_b');
			$largeImg.attr('src', src);

			//显示大图容器
			$largeImgContainer.show();
			//大图加载完成的监听
			$largeImg.on('load', function(){
				//得到大图的尺寸
				var largeWidth = $largeImg.width();
				var largeHeight	= $largeImg.height();

				//显示大图
				$largeImg.show();

				//鼠标移动的监听
				$maskTop.mousemove(function(event) {
					/*1.移动小黄块*/
					var left = 0;
					var top = 0;
					//事件的坐标
					var eventLeft = event.offsetX;
					var eventTop = event.offsetY;
					left = eventLeft - maskWidth/2;
					top = eventTop - maskHeight/2;

					//left在[0, maskTopWidth-maskWidth]
					if(left < 0){
						left = 0;
					}else if(left > maskTopWidth-maskWidth){
						left = maskTopWidth-maskWidth;
					}
					//top在[0, maskTopHeight-maskHeight]
					if(top < 0){
						top = 0;
					}else if(top > maskTopHeight-maskHeight){
						top = maskTopHeight-maskHeight;
					}

					$mask.css({left:left,top:top});

					/*2.移动大图*/
					left = -left * largeWidth / maskTopWidth;
					top = -top * largeHeight / maskTopHeight;
					$largeImg.css({left:left, top:top});
				});
			})
		}, function() {
			$mask.hide();
			$largeImgContainer.hide();
		});
	}

	function hoverMiniImg(){
		$('.gallery-thumbs li').hover(function() {
			$(this).addClass('active');
			var $img = $(this).children().children();
			//显示对应的中图
			var src = $img.attr('src').replace('_s.jpg', '_m.jpg');
			$('#mediumImg').attr('src', src);
		}, function() {
			$(this).removeClass('active');
		});
	}

	/*点击左右移动小图片*/
	function moveMiniImg(){
		var $btns = $('.gallery-thumbswb>span');
		var $pre = $btns.first();
		var $next = $btns.last();
		var $ul = $('.gallery-thumbs ul');
		var SHOW_COUNT = 5;//一次能看见5张小图
		var imgCount = $ul.children('li').length;//总图片数
		var moveCount = 0;//移动的次数（点右箭头为正、左负）
		var liWidth = $ul.children(':first').width() + 10;//每次移动的宽度

		$next.click(function() {
			if(moveCount===imgCount-SHOW_COUNT){
				return;
			}
			moveCount++;
			//移动ul
			$ul.css({left:-moveCount * liWidth})
		});

		$pre.click(function() {
			if(moveCount===0){
				return;
			}
			moveCount--;
			//移动ul
			$ul.css({left:-moveCount * liWidth})
		});
	}
})