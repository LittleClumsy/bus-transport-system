from django.contrib.auth.decorators import user_passes_test

def admin_required(login_url=None):
    return user_passes_test(lambda u: u.is_authenticated and u.is_admin, login_url=login_url)

def user_required(login_url=None):
    return user_passes_test(lambda u: u.is_authenticated and not u.is_admin, login_url=login_url)
