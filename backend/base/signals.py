from django.db.models.signals import pre_save
from django.contrib.auth.models import User
from django.dispatch import receiver

# instance: Là một đối tượng user được tạo ra
# sender: thể hiện cho model User
# kwargs: là một dictionary chứa các tham số truyền vào
@receiver(pre_save, sender=User)
def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email
        
        
# pre_save.connect(updateUser, sender=User)