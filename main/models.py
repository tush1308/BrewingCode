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
    created_by=models.ForeignKey(MyUser,on_delete=models.CASCADE)
    def __str__(self):
        return str(self.item_category)

class Item(models.Model):
    item_id=models.AutoField(primary_key=True)
    item_type=models.ForeignKey(ItemType,on_delete=models.CASCADE)
    item_name=models.CharField(max_length=200)
    item_brand=models.CharField(max_length=100)
    item_price=models.IntegerField()
    item_image=models.ImageField(upload_to='images/',default='images/default-product-image.jpg')
    owned_by=models.ForeignKey(MyUser,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.item_name)
    
class OrderItem(models.Model):
    cart_item=models.ForeignKey(Item,on_delete=models.CASCADE,null=True,blank=True)
    price=models.IntegerField(null=True,blank=True)
    quantity=models.IntegerField(default=1)
    discount=models.DecimalField(max_digits=9, decimal_places=2,null=True,blank=True)
    total_price=models.DecimalField(max_digits=9, decimal_places=2,null=True,blank=True)
    created_by=models.ForeignKey(MyUser,on_delete=models.CASCADE)
    def __str__(self):
        return '%s %s' % (self.cart_item,self.quantity)
 #Calculating Discount
    def calc_disc(self):
        if self.quantity<10:
            self.discount=0
        elif self.quantity>=10 and self.quantity<20:
            self.discount=self.price*self.quantity*0.05
        elif self.quantity>=20 and self.quantity<40:
            self.discount=self.price*self.quantity*0.1
        elif self.quantity>=40 and self.quantity<60:
            self.discount=self.price*self.quantity*0.2
        elif self.quantity>=60:
            self.discount=self.price*self.quantity*0.3
        return self.discount

    def save(self,*args,**kwargs):
        self.price=self.cart_item.item_price
        self.discount=self.calc_disc()
        self.total_price=self.price*self.quantity-self.discount
        super(OrderItem,self).save(*args,**kwargs)




class Order(models.Model):
    order_id=models.AutoField(primary_key=True)
    user=models.ForeignKey(MyUser,on_delete=models.CASCADE)
    items_added_in_cart=models.ManyToManyField(OrderItem)
    total_bill=models.DecimalField(max_digits=9, decimal_places=2,null=True,blank=True)
    payment_method=models.CharField(max_length=100,choices=PAYMENT_METHOD)
    address=models.TextField()
    city=models.CharField(max_length=50,null=False,blank=False)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.payment_method)


    



