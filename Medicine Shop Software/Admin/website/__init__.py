from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    # Setting up the website with app name and key
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hjshjhdjah kjshkjdhjs'

    # Setting up the Database
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)

    
    # Setting up the differebnt pages
    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/auth')    #for prefix you can set url like/auth/hello

    # Database creation
    from .models import User

    create_database(app)

    # Setting up login manager to manage all logins
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login' # Where to go if not logged in
    login_manager.init_app(app)             # Telling login manager which app to work in

    # Tells flask to load user. 
    # It searches for primary key by default and searches for the id we pass to the function
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
     
    return app

def create_database(app):
    if not path.exists('website/' + DB_NAME):
        with app.app_context():
            db.create_all()
        print('Created Database!')