from flask import current_app
from flask_mail import Message
from app.config import mail

def send_intake_email(form):
    subject = f"New Student Interest Form — {form['firstName']} {form['lastName']}"

    body = f"""
        New student interest form:

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
        recipients=[current_app.config["MAIL_USERNAME"]], 
        body=body
    )

    mail.send(msg)

def send_student_signup_email(email, name, student_id):
    """
    Sends a signup link to the student with their unique documentId
    so they can create an account tied to their interest form.
    """

    # The URL of your signup page on the frontend
    frontend_url = current_app.config["YOUR_DOMAIN"]

    # Example: https://vitaprep.org/signup?docId=abc123
    signup_link = f"{frontend_url}/signup?docId={student_id}"

    subject = f"Welcome to VitaPrep, {name}! Complete Your Account"

    body = f"""
Hi {name},

Thanks for submitting your interest form!  
To complete your setup and get paired with one of our advisors, 
please create your VitaPrep account using the link below:

👉 Create Your Account: {signup_link}

This link is unique to you and will automatically connect your new account 
to your intake form.

If you didn’t request this, you can ignore this email.

—
VitaPrep Team
"""

    msg = Message(
        subject=subject,
        recipients=[email],
        body=body
    )

    mail.send(msg)


def send_plan_change_email(name: str, email: str, plan: str):
    """
    Notify a student that their consulting plan has been updated.
    Includes special messaging when plan is reverted to the free/basic tier.
    """

    plan = plan.lower().strip()

    plan_links = {
        "starter": current_app.config.get("PLAN_URL_STARTER"),
        "growth": current_app.config.get("PLAN_URL_GROWTH"),
        "premium": current_app.config.get("PLAN_URL_PREMIUM"),
    }

    # --- 1) Special case: FREE / BASIC PLAN ---
    if plan in ["basic", "free", "none"]:
        subject = "Your VitaPrep Plan Has Been Updated"

        body = f"""
Hi {name},

Your consulting plan has been updated to the **Basic (Free) Tier**.

We understand that circumstances change, and we're always here to support you.
You’ll still have access to your dashboard and can upgrade again at any time
if you want more personalized guidance.

If you have any questions or need help deciding which package is best for you,
just reply to this email.

– The VitaPrep Team
"""

        msg = Message(subject=subject, recipients=[email], body=body)
        mail.send(msg)
        return  # Done


    # --- 2) Normal: Starter / Growth / Premium plans ---

    plan_link = plan_links.get(plan)
    if not plan_link:
        plan_link = "#"  # fallback protection

    subject = f"Your VitaPrep Plan Has Been Updated – {plan.title()}"

    body = f"""
Hi {name},

Good news! Your VitaPrep consulting plan has been updated to:

➡  **{plan.title()} Plan**

To proceed, you can complete your payment here:
{plan_link}

Once payment is complete, your onboarding and personalized roadmap will begin.

If you have any questions, need help choosing a plan, or want to upgrade at any time, 
just reply to this email.

– The VitaPrep Team
"""

    msg = Message(subject=subject, recipients=[email], body=body)
    mail.send(msg)