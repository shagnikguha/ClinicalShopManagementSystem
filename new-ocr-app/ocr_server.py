from flask import Flask, request, jsonify
import easyocr
import cv2
import requests

app = Flask(__name__)  # Corrected __name__

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'], gpu=False)

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

    # Example: Let's say these are the medicine names extracted
    medicines_extracted = detected_text
    
    print(medicines_extracted)
    # Send the extracted medicines to the Express backend (Node.js)
    response = requests.post('http://localhost:3000/cart/add-from-ocr', json={
        'medicines': medicines_extracted,  # Send the list of medicines
        'userId': data.get('userId')  # Assuming the user ID is provided
    })

    # Return the result from the Express backend
    return jsonify(response.json())

if __name__ == '__main__':  # Corrected __name__ and __main__
    app.run(host='localhost', port=5000, debug=True)
