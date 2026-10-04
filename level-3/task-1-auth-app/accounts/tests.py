from django.contrib.auth.models import User
from django.core import mail
from django.test import TestCase, override_settings
from django.urls import reverse


@override_settings(EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend")
class AuthFlowTests(TestCase):
    def test_register_logs_in_and_can_publish(self):
        response = self.client.post(
            reverse("register"),
            {
                "username": "ada",
                "email": "ada@example.com",
                "password1": "Northroom-pass-19",
                "password2": "Northroom-pass-19",
            },
        )
        self.assertRedirects(response, reverse("post_list"))
        self.assertTrue(User.objects.filter(username="ada", email="ada@example.com").exists())

        denied = self.client.get(reverse("post_create"))
        self.assertEqual(denied.status_code, 200)

        created = self.client.post(
            reverse("post_create"),
            {"title": "Evening list", "body": "A short note."},
        )
        self.assertRedirects(created, reverse("post_list"))
        self.assertContains(self.client.get(reverse("post_list")), "Evening list")

    def test_login_and_password_reset(self):
        User.objects.create_user("ada", "ada@example.com", "Old-password-19")
        logged_out = self.client.post(
            reverse("login"),
            {"username": "ada", "password": "wrong-password"},
        )
        self.assertEqual(logged_out.status_code, 200)

        logged_in = self.client.post(
            reverse("login"),
            {"username": "ada", "password": "Old-password-19"},
        )
        self.assertRedirects(logged_in, reverse("post_list"))
        self.client.post(reverse("logout"))

        self.client.post(reverse("password_reset"), {"email": "ada@example.com"})
        self.assertEqual(len(mail.outbox), 1)
        link = next(part for part in mail.outbox[0].body.split() if part.startswith("http"))
        path = link.split("http://testserver")[-1]
        confirm = self.client.get(path)
        self.assertEqual(confirm.status_code, 302)
        reset = self.client.post(
            confirm.url,
            {"new_password1": "Newer-password-19", "new_password2": "Newer-password-19"},
        )
        self.assertRedirects(reset, reverse("password_reset_complete"))
        self.assertTrue(self.client.login(username="ada", password="Newer-password-19"))

    def test_anonymous_create_redirects_to_login(self):
        response = self.client.get(reverse("post_create"))
        self.assertRedirects(response, f"{reverse('login')}?next={reverse('post_create')}")
