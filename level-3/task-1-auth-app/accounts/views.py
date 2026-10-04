import re

from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.views import PasswordResetDoneView
from django.shortcuts import redirect, render

from .forms import RegisterForm


def register(request):
    if request.user.is_authenticated:
        return redirect("post_list")
    form = RegisterForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        user = form.save()
        login(request, user)
        return redirect("post_list")
    return render(request, "accounts/register.html", {"form": form})


class ResetLinkDoneView(PasswordResetDoneView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        path = settings.BASE_DIR / "sent_mail" / "latest.txt"
        if settings.DEBUG and path.exists():
            match = re.search(r"https?://\S+", path.read_text(encoding="utf-8"))
            context["reset_link"] = match.group(0) if match else ""
        return context
