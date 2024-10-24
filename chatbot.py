import streamlit as st
import json
import nltk

nltk.download('punkt_tab', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

with open('medical_data.json', 'r') as f:
    medical_data = json.load(f)

def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token.isalnum()]
    tokens = [token for token in tokens if token not in stop_words]
    return tokens

def get_medicine_info(query):
    tokens = preprocess_text(query)
    medications = medical_data['content']['Subsystems'][0]['Medications']['General']
    for medicine in medications:
        if any(token in medicine['name'].lower() for token in tokens):
            return f"**Medicine**: {medicine['name']}\n\n**Uses**: {medicine['uses']}"
    return "Sorry, I couldn't find information about that medicine."

def get_symptom_info(query):
    tokens = preprocess_text(query)
    symptoms = medical_data['content']['Subsystems'][1]['Categories']['General']
    for symptom in symptoms:
        if any(token in symptom['symptom'].lower() for token in tokens):
            return f"**Symptom**: {symptom['symptom']}\n\n**Remedies**: {', '.join(symptom['remedies'])}"
    return "Sorry, I couldn't find information about that symptom."

def get_response(user_input):
    tokens = preprocess_text(user_input)
    
    medicine_keywords = {'medicine', 'medication', 'drug', 'treatment', 'prescription'}
    symptom_keywords = {'symptom', 'pain', 'condition', 'remedy', 'illness'}

    if any(token in tokens for token in medicine_keywords):
        return get_medicine_info(user_input)
    elif any(token in tokens for token in symptom_keywords):
        return get_symptom_info(user_input)
    else:
        return "I'm not sure if you're asking about a medicine or a symptom. Please clarify."

st.set_page_config(page_title="💊 Medical Info Chatbot", page_icon="💊", layout="centered")

st.markdown(
    """
    <style>
    .main {background-color: #f0f2f6;}
    .stButton button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 24px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        font-size: 16px;
    }
    .stButton button:hover {
        background-color: #45a049;
    }
    .stMarkdown h3 {
        color: #4CAF50;
    }
    </style>
    """, unsafe_allow_html=True
)

st.title("💊 Medical Information Chatbot")
st.write(
    """
    Welcome! You can ask about medicines or symptoms, and I'll provide general information.  
    Please note: This is **not** a substitute for professional medical advice.
    """
)

user_input = st.text_input(
    "Ask a question (e.g., 'Tell me about aspirin' or 'What are remedies for a headache?')", 
    placeholder="Type your query here..."
)

if st.button("Submit") and user_input:
    response = get_response(user_input)

    st.markdown("### 🤖 Chatbot Response:")
    st.write(response)

st.sidebar.title("🛠 How to use")
st.sidebar.write(
    """
    This chatbot can help you with:
    - Information about medications
    - Remedies for symptoms  
    - Type your query in the text box, and the chatbot will respond with relevant information.
    - Please ensure to use the following keywords:
        - symptom, pain, condition, remedy, illness
        - medicine, medication, drug, treatment, prescription
    """
)

st.sidebar.write("---")
st.sidebar.title("⚠️ Disclaimer")
st.sidebar.info(
    """
    **Note**: This chatbot provides **general information** only. 
    Always consult a healthcare professional for specific medical advice.
    """
)
