from flask import current_app
from flask_mail import Message
from app.config import mail

def send_intake_email(form):
    subject = f"New Intake Form — {form['firstName']} {form['lastName']}"

    body = f"""
        New student intake form:

        Name: {form['firstName']} {form['lastName']}
        Email: {form['email']}
        Phone: {form.get('phone')}

        GPA: {form.get('gpa')}
        SAT: {form.get('sat')}
        ACT: {form.get('act')}

        Colleges:
        {form.get('colleges')}

        Extracurriculars:
        {form.get('extracurriculars')}

        Notes:
        {form.get('notes')}

        Has Spoken: {form.get('hasSpoken')}
        Has Preference: {form.get('hasPreference')}
        Prefers Krissh: {form.get('prefKrissh')}
        Prefers Arnav: {form.get('prefArnav')}

        ---
        VitaPrep Intake System
        """

    msg = Message(
        subject=subject,
        recipients=[current_app.config["MAIL_USERNAME"]],  # send to your own email
        body=body
    )

    mail.send(msg)
