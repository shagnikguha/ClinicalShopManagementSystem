from flask import Flask, request, jsonify
import easyocr
import cv2
import requests
from flask_cors import CORS
import pandas as pd
import numpy as np
import io

app = Flask(__name__)
CORS(app)

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'], gpu=False)

# Load the CSV file and get the medicine names
df = pd.read_csv(r"D:\Medicine Shop Software\backend\ocr\medicines.csv")
medicine_list = df['Medicine Name'].tolist()

@app.route('/ocr', methods=['POST'])
def ocr():
    if 'image' not in request.files:
        print("No image file provided", flush=True)
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files['image']
    
    # Read the image file
    image_bytes = file.read()
    nparr = np.frombuffer(image_bytes, np.uint8)
    img_presc = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Check if the image was loaded successfully
    if img_presc is None:
        print("Image could not be loaded", flush=True)
        return jsonify({"error": "Image could not be loaded"}), 400

    print("Image loaded successfully", flush=True)

    # Perform OCR
    result = reader.readtext(img_presc)
    print(f"OCR Result: {result}", flush=True)

    # Extract and process text as a list
    detected_text = [i[1] for i in result]

    # List to store matched medicines
    caught_medicines = []

    for text in detected_text:
        for m in medicine_list:
            if m.lower() in text.lower():  # Use case-insensitive matching
                caught_medicines.append(m)  # Add the caught medicine to the list

    print(f"Caught Medicines: {caught_medicines}", flush=True)

    # Send the medicines list back to the frontend
    return jsonify({"medicines": caught_medicines})


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)