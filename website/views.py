import json
from flask import Blueprint, render_template, request, flash
from flask_login import login_required, current_user

views = Blueprint('views', __name__)

medicine_path = "/home/shagnik/Documents/SE Documentation/5treamLit/instance/medicines.json"

@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    # Load JSON data with error handling
    try:
        with open(medicine_path, encoding='utf-8') as f:
            data = json.load(f)
            medicines = data['medicines']
    except UnicodeDecodeError:
        with open(medicine_path, encoding='latin-1') as f:
            data = json.load(f)
            medicines = data['medicines']
    except FileNotFoundError:
        flash("Medicines file not found.", category='error')
        return render_template("home.html", user=current_user, medicines=[])

    return render_template("home.html", user=current_user, medicines=medicines)

@views.route('/medicines/<category>', methods=['GET'])
@login_required
def medicines_by_category(category):
    # Load JSON data with error handling
    try:
        with open(medicine_path, encoding='utf-8') as f:
            data = json.load(f)
            medicines = [med for med in data['medicines'] if med['category'] == category]
    except UnicodeDecodeError:
        with open(medicine_path, encoding='latin-1') as f:
            data = json.load(f)
            medicines = [med for med in data['medicines'] if med['category'] == category]
    except FileNotFoundError:
        flash("Medicines file not found.", category='error')
        return render_template("home.html", user=current_user, medicines=[])

    return render_template("medicines.html", user=current_user, medicines=medicines, category=category)
