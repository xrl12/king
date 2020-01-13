from django.shortcuts import render
from .models import Dbz_nav,NewsClassfly,News,Second_menu

from pure_pagination import PageNotAnInteger,Paginator
# Create your views here.
def news_detail(request,id):

    navs = Dbz_nav.objects.filter(is_show=True).all()
    news = News.objects.filter(is_show=True).filter(id=id).all()
    second_menus = Second_menu.objects.filter(is_show=True).all()
    # 增加阅读量
    now_new = News.objects.filter(id=id).first()
    if not news or not now_new :
        return render(request,'404.html')
    now_new.browse +=1
    now_new.save()

    #实现上一页下一页
    up_new = News.objects.filter(id=id-1).first()
    down_new = News.objects.filter(id=id+1).first()

    return render(request,'news_detail.html',locals())

def news_list(request):
    navs = Dbz_nav.objects.filter(is_show=True).all()
    news = News.objects.filter(is_show=True).all()
    classfly = NewsClassfly.objects.filter(is_show=True).all()
    second_menus = Second_menu.objects.filter(is_show=True).all()

    try:
        page = request.GET.get('page', 1)
    except PageNotAnInteger:
        page = 1
    # arts = Article.objects.all()
    p = Paginator(news, per_page=1, request=request)
    articles = p.page(page)


    return render(request,'news_list.html',locals())