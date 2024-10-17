from flask import Flask, request, jsonify
import easyocr
import cv2
import requests
import pandas as pd

app = Flask(__name__)

reader = easyocr.Reader(['en'], gpu=False)

df = pd.read_csv(r"\ocr\medicines.csv")
medicine_list = df['Medicine Name'].tolist()

@app.route('/ocr', methods=['POST'])
def ocr():
    data = request.json
    image_path = data.get('imagePath')

    img_presc = cv2.imread(image_path)

    if img_presc is None:
        return jsonify({"error": "Image could not be loaded"}), 400

    result = reader.readtext(img_presc)

    detected_text = [i[1] for i in result]

    caught_medicines = []

    for text in detected_text:
        for m in medicine_list:
            if m.lower() in text.lower(): 
                caught_medicines.append(m) 

    if caught_medicines:
        try:
            response = requests.post('http://localhost:3000/cart/add-from-ocr', json={
                'medicines': caught_medicines
                # 'userId': data.get('userId')
            })
            return jsonify(response.json())
        except requests.exceptions.RequestException as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No medicines recognized from the prescription."}), 400


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
