from django.db import models
from login_signup.models import MyUser
# Create your models here.
PAYMENT_METHOD=(
    ('CASH ON DELIVERY','CASH ON DELIVERY'),
    ('CREDIT CARD','CREDIT CARD'),
    ('NETBANKING','NETBANKING'),
    ('UPI','UPI')
)
class ItemType(models.Model):
    item_category_id=models.AutoField(primary_key=True)
    item_category=models.CharField(max_length=200)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.item_category

class Item(models.Model):
    item_id=models.AutoField(primary_key=True)
    item_type=models.ForeignKey(ItemType,on_delete=models.CASCADE)
    item_name=models.CharField(max_length=200)
    item_brand=models.CharField(max_length=100)
    item_price=models.IntegerField()
    item_image=models.ImageField(upload_to='images/',default='images/default-product-image.jpg')
    available_quantity=models.IntegerField(null=False,blank=False)
    owned_by=models.ForeignKey(MyUser,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.item_name

class Order(models.Model):
    order_id=models.AutoField(primary_key=True)
    user=models.ForeignKey(MyUser,on_delete=models.CASCADE)
    product=models.ForeignKey(Item,on_delete=models.CASCADE)
    total_bill=models.IntegerField()
    payment_method=models.CharField(max_length=100,choices=PAYMENT_METHOD)
    address=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.user)


