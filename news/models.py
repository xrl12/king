from django.db import models
from DjangoUeditor.models import UEditorField
# Create your models here.


class BaseModel(models.Model):
    position = models.IntegerField(verbose_name='位置',default=0)
    is_show = models.BooleanField(verbose_name='是否显示',default=True)
    is_top = models.BooleanField(verbose_name='是否置顶',default=False)
    create_time = models.DateTimeField(verbose_name='创建时间',auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='跟新时间',auto_now = True)
    class Meta():
        abstract = True
#       导航
class Dbz_nav(BaseModel):
    name = models.CharField(verbose_name='导航名字',max_length=8)
    def __str__(self):
        return self.name
    class Meta():
        verbose_name = '导航'
        verbose_name_plural = verbose_name


# 轮廓图
class Banner(BaseModel):
    image = models.ImageField(verbose_name='图片', upload_to='banner/%Y/%m/%d')
    url = models.URLField(verbose_name='跳转链接')
    name = models.CharField(verbose_name='图片描述',max_length=50)
    def __str__(self):
        return self.name
    class Meta():
        verbose_name = '轮廓图'
        verbose_name_plural = verbose_name

# 公司介绍
class Company(BaseModel):
    name = models.CharField(verbose_name='公司名称',max_length=10)
    conpany_info = models.CharField(verbose_name='公司介绍',max_length=255)
    video = models.FileField(verbose_name='视屏',upload_to='video/%Y/%m/%d')
    def __str__(self):
        return self.name
    class Meta():
        verbose_name = '公司简介'
        verbose_name_plural = verbose_name

#  产品
class Product(BaseModel):
    cover = models.ImageField(verbose_name='产品样式',upload_to='product/%Y/%m/%d')
    name = models.CharField(verbose_name='产品名字',max_length=20)
    sub_title = models.CharField(verbose_name='副标题',max_length=30)
    def __str__(self):
        return  self.name
    class Meta():
        verbose_name = '产品'
        verbose_name_plural = verbose_name




# 产品分类
class Category(BaseModel):
    name = models.CharField(verbose_name='类名',max_length=10)
    product = models.ForeignKey(to=Product,on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    class Meta():
        verbose_name = '分类'
        verbose_name_plural = verbose_name




# 合作伙伴
class Join_hands(BaseModel):
    company_info = models.CharField(verbose_name='公司简介',max_length=255)
    company_logo = models.ImageField(verbose_name='公司图片',upload_to='logo/%Y/%m/%d')
    def __str__(self):
        return self.company_info
    class Meta():
        verbose_name = '合作伙伴'
        verbose_name_plural = verbose_name

# 新闻
class News(BaseModel):
    cover = models.ImageField(verbose_name='封面',upload_to='news/%Y/%m/%d')
    news_info = models.CharField(verbose_name='文章简介',max_length=50)
    content = UEditorField(width=600, height=300, toolbars="full",
                           imagePath="news/%(basename)s_%(datetime)s.%(extname)s", filePath="files/")
    name = models.CharField(verbose_name='文章名字',max_length=25)
    browse = models.IntegerField(verbose_name='浏览量',default=0)

    def __str__(self):
        return self.name
    class Meta():
        verbose_name = '新闻'
        verbose_name_plural = verbose_name

# 员工表
class Staff(BaseModel):
    phont = models.ImageField(verbose_name="员工头像",upload_to="phont/%Y/%m/%d")
    job = models.CharField(verbose_name='职位',max_length=10)
    phone = models.CharField(verbose_name='手机号',max_length=11)
    email = models.CharField(verbose_name='邮箱',max_length=20)
    name = models.CharField(verbose_name='名字',max_length=20)
    address = models.CharField(verbose_name='地址',max_length=50)
    def __str__(self):
        return self.name
    class Meta():
        verbose_name = '客户表'
        verbose_name_plural = verbose_name