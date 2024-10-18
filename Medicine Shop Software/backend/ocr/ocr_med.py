from flask import Flask, request, jsonify
import easyocr
import cv2
import requests
import pandas as pd

app = Flask(__name__)

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'], gpu=False)

# Load the CSV file and get the medicine names
df = pd.read_csv(r"D:\Medicine Shop Software\backend\ocr\medicines.csv")
medicine_list = df['Medicine Name'].tolist()

@app.route('/ocr', methods=['POST'])
def ocr():
    data = request.json
    image_path = data.get('imagePath')
    
    # Read the image
    img_presc = cv2.imread(image_path)

    # Check if the image was loaded successfully
    if img_presc is None:
        return jsonify({"error": "Image could not be loaded"}), 400

    # Perform OCR
    result = reader.readtext(img_presc)

    # Extract and process text as a list
    detected_text = [i[1] for i in result]

    # List to store matched medicines
    caught_medicines = []

    for text in detected_text:
        for m in medicine_list:
            if m.lower() in text.lower():  # Use case-insensitive matching
                caught_medicines.append(m)  # Add the caught medicine to the list

    # Send the extracted medicines to the Express backend (Node.js)
    response = requests.post('http://localhost:3000/cart/add-from-ocr', json={
        'medicines': caught_medicines,  # Send the list of medicines
        'userId': data.get('userId')  # Assuming the user ID is provided
    })

    # Return the result from the Express backend
    return jsonify(response.json())
 

if __name__ == '__main__':  # Corrected this line
    app.run(host='localhost', port=5000, debug=True)
