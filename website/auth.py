from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user

predefined_security_key = "dWa6"

auth = Blueprint('auth',__name__)

@auth.route("/login", methods=['GET', 'POST']) #method is set to GET automatically. need to define post to get http post function working 
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        # Searching for specific entry in the database 
        '''user is an object'''
        user = User.query.filter_by(email=email).first()    # Searches database for the User and stops checking when the first one is detected
        if user:
            # As we have stored password as a hash, we can only check it useng this function
            if check_password_hash(user.password, password): # user.password fetches the password stored in db for the email that was searched for in the database
                flash('Logged in successfully!', category='success')
                # Logs user in until webserver restarts or user logouts 
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password.', category='error')
        else:
            flash('Invalid email.', category='error')

    return render_template("login.html", user=current_user)

@auth.route("/logout")
@login_required      # makes it so that this page is inaccesible until a user is logged in
def logout_page():
    logout_user()
    flash("Logged out.", category='success')
    return redirect(url_for('auth.login'))

@auth.route("/sign-up", methods=['GET', 'POST'])
def sign_up_page():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')
        security_key = request.form.get('securityKey')

        user = User.query.filter_by(email=email).first() 
        if user:
            flash('Email already exists.', category='error')
        elif len(email)<4:
            flash("Email must be greater than 3 characters", category='error')
            pass
        elif len(first_name) < 2:
            flash('Name must be greater than 1 characters', category='error')
            pass
        elif password1!=password2:
            flash('Passwords don\'t match', category='error')
            pass
        elif len(password1) <7:
            flash('Password should be atlest 7 characters', category='error')
            pass
        elif security_key != predefined_security_key:
            flash('Invalid security key.', category='error')
        else:
            # Creating a new user object and passing it to the database
            new_user = User(email=email,first_name=first_name, password=generate_password_hash(password1, method='pbkdf2:sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            
            flash('Account created!', category='success')

            # Returning this function to the home function in views.py
            return redirect(url_for('views.home'))

    return render_template("sign_up.html", user=current_user)
