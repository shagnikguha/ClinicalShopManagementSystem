import streamlit as st
import json
import nltk

# Download necessary NLTK resources
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Initialize lemmatizer and stopwords
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Load your medical data from JSON file
with open('medical_data.json', 'r') as f:
    medical_data = json.load(f)

# Function to preprocess text (tokenize, lemmatize, remove stopwords)
def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token.isalnum()]
    tokens = [token for token in tokens if token not in stop_words]
    return tokens

# Function to retrieve medicine information
def get_medicine_info(query):
    tokens = preprocess_text(query)
    medications = medical_data['content']['Subsystems'][0]['Medications']['General']
    for medicine in medications:
        if any(token in medicine['name'].lower() for token in tokens):
            return f"**Medicine**: {medicine['name']}\n**Uses**: {medicine['uses']}"
    return "Sorry, I couldn't find information about that medicine."

# Function to retrieve symptom information
def get_symptom_info(query):
    tokens = preprocess_text(query)
    symptoms = medical_data['content']['Subsystems'][1]['Categories']['General']
    for symptom in symptoms:
        if any(token in symptom['symptom'].lower() for token in tokens):
            return f"**Symptom**: {symptom['symptom']}\n**Remedies**: {', '.join(symptom['remedies'])}"
    return "Sorry, I couldn't find information about that symptom."

# Function to handle user input and route to appropriate function
def get_response(user_input):
    tokens = preprocess_text(user_input)
    
    # Check if user input matches medicine-related tokens
    medicine_keywords = {'medicine', 'medication', 'drug', 'treatment', 'prescription'}
    symptom_keywords = {'symptom', 'pain', 'condition', 'remedy', 'illness'}

    if any(token in tokens for token in medicine_keywords):
        return get_medicine_info(user_input)
    elif any(token in tokens for token in symptom_keywords):
        return get_symptom_info(user_input)
    else:
        return "I'm not sure if you're asking about a medicine or a symptom. Please clarify."

# Streamlit App Interface
st.title("💊 Medical Information Chatbot")
st.write("Welcome! You can ask about medicines or symptoms, and I'll provide general information.\
         Please note: This is **not** a substitute for professional medical advice.")

# User input section
user_input = st.text_input("Ask a question (e.g., 'Tell me about aspirin' or 'What are remedies for a headache?'):")

# Response output
if user_input:
    response = get_response(user_input)
    st.write("### 🤖 Chatbot Response:")
    st.write(response)

# Disclaimer
st.markdown("""
---
**Disclaimer**: This chatbot provides **general information** only. Always consult a healthcare professional for specific medical advice.
""")
