from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)


class UserManager(BaseUserManager):
    def create_user(self, **kwargs):
        print(kwargs)
        if not kwargs['username']:
            raise ValueError("Users must have an username")

        user = self.model(
            **kwargs,
        )

        user.set_password(kwargs['password'])
        user.save(using=self._db)
        return user

    def create_staffuser(self, **kwargs):
        user = self.create_user(**kwargs)
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, **kwargs):
        user = self.create_user(**kwargs)
        user.staff = True
        user.admin = True
        user.is_manage = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    username = models.TextField(max_length=100, unique=True)
    name = models.TextField(max_length=100, default=" ")
    public_key = models.TextField(max_length=500, blank=True, default=" ")
    private_key = models.TextField(max_length=500, blank=True, default=" ")
    age = models.IntegerField(default=18)
    description = models.TextField(max_length=500, blank=True, default=" ")
    is_manage = models.BooleanField(default=False)
    objects = UserManager()
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)  # a admin user; non super-user
    admin = models.BooleanField(default=False)  # a superuser

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_active(self):
        return self.active

