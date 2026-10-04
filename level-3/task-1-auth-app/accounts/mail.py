from django.conf import settings
from django.core.mail.backends.console import EmailBackend


class DemoEmailBackend(EmailBackend):
    """Print mail and keep the latest body so the reset link can be opened locally."""

    def send_messages(self, email_messages):
        sent = super().send_messages(email_messages)
        if not email_messages:
            return sent
        folder = settings.BASE_DIR / "sent_mail"
        folder.mkdir(exist_ok=True)
        (folder / "latest.txt").write_text(email_messages[-1].body, encoding="utf-8")
        return sent
