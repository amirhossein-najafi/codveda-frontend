from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, ListView

from .models import Post


class PostListView(ListView):
    model = Post
    template_name = "posts/list.html"
    context_object_name = "posts"


class PostDetailView(DetailView):
    model = Post
    template_name = "posts/detail.html"
    context_object_name = "post"


class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = ("title", "body")
    template_name = "posts/form.html"
    success_url = reverse_lazy("post_list")

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
