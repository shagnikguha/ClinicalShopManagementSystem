import json
from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_required, current_user

views = Blueprint('views', __name__)

medicine_path = "D:\github\ClinicalShopManagementSystem\Medicine Shop Software\Admin\instance\medicines.json" 

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

# Route to serve the "Add Medicine" form
@views.route('/add-medicine', methods=['GET'])
@login_required
def add_medicine():
    return render_template("add_medicine.html", user=current_user)

# Route to save the new medicine
@views.route('/save-medicine', methods=['POST'])
@login_required
def save_medicine():
    # Get form data
    name = request.form.get('name')
    category = request.form.get('category')
    stockQuantity = request.form.get('stockQuantity')
    manufactureDate = request.form.get('manufactureDate')
    expiryDate = request.form.get('expiryDate')

    if not name or not category or not stockQuantity or not manufactureDate or not expiryDate:
        flash("All fields are required.", category='error')
        return redirect(url_for('views.add_medicine'))

    # Create a new medicine entry
    new_medicine = {
        "name": name,
        "category": category,
        "stockQuantity": int(stockQuantity),
        "manufactureDate": manufactureDate,
        "expiryDate": expiryDate
    }

    # Load existing medicines and append the new one
    try:
        with open(medicine_path, 'r+', encoding='utf-8') as f:
            data = json.load(f)
            data['medicines'].append(new_medicine)

            # Move the file pointer to the beginning before writing
            f.seek(0)
            json.dump(data, f, indent=4)
            f.truncate()

        flash("Medicine added successfully!", category='success')
    except (UnicodeDecodeError, FileNotFoundError):
        flash("Error adding medicine to the file.", category='error')

    # Redirect back to home page after adding medicine
    return redirect(url_for('views.home'))