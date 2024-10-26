import connectToMongoDB from './backend/db/mongodbconn.js';
import Medicine from './backend/models/medicineModel.js';
connectToMongoDB();

const insertnames = async () => {
  await Medicine.insertMany([
    {
      name: "aspirin",
      stockQuantity: 100,
      manufactureDate: "07-08-2022",
      expiryDate: "07-08-2027",
      category: "Vitamin",
      price: 419,
      frequency: 0,
      description: "Pain relief, fever reduction, blood thinning"
    },
    {
      name: "ibuprofen",
      stockQuantity: 150,
      manufactureDate: "12-10-2022",
      expiryDate: "12-10-2027",
      category: "Vitamin",
      price: 525,
      frequency: 0,
      description: "Pain relief, anti-inflammatory"
    },
    {
      name: "acetaminophen",
      stockQuantity: 200,
      manufactureDate: "28-04-2022",
      expiryDate: "28-04-2027",
      category: "Painkiller",
      price: 438,
      frequency: 0,
      description: "Pain relief, fever reduction"
    },
    {
      name: "amoxicillin",
      stockQuantity: 80,
      manufactureDate: "02-11-2022",
      expiryDate: "02-11-2027",
      category: "Vitamin",
      price: 1103,
      frequency: 0,
      description: "Antibiotic for bacterial infections"
    },
    {
      name: "lisinopril",
      stockQuantity: 120,
      manufactureDate: "09-10-2022",
      expiryDate: "09-10-2027",
      category: "Vitamin",
      price: 909,
      frequency: 0,
      description: "Blood pressure control"
    },
    {
      name: "metformin",
      stockQuantity: 150,
      manufactureDate: "27-11-2022",
      expiryDate: "27-11-2027",
      category: "Antidepressant",
      price: 595,
      frequency: 0,
      description: "Type 2 diabetes management"
    },
    {
      name: "levothyroxine",
      stockQuantity: 180,
      manufactureDate: "30-09-2022",
      expiryDate: "30-09-2027",
      category: "Vitamin",
      price: 998,
      frequency: 0,
      description: "Thyroid hormone replacement"
    },
    {
      name: "amlodipine",
      stockQuantity: 130,
      manufactureDate: "20-10-2022",
      expiryDate: "20-10-2027",
      category: "Vitamin",
      price: 823,
      frequency: 0,
      description: "Blood pressure control"
    },
    {
      name: "albuterol",
      stockQuantity: 90,
      manufactureDate: "15-01-2022",
      expiryDate: "15-01-2027",
      category: "Antibiotic",
      price: 1575,
      frequency: 0,
      description: "Bronchodilator for asthma and COPD"
    },
    {
      name: "omeprazole",
      stockQuantity: 200,
      manufactureDate: "30-11-2022",
      expiryDate: "30-11-2027",
      category: "Antidepressant",
      price: 1329,
      frequency: 0,
      description: "Reduces stomach acid, treats GERD"
    },
    {
      name: "metoprolol",
      stockQuantity: 110,
      manufactureDate: "20-10-2023",
      expiryDate: "20-10-2028",
      category: "Painkiller",
      price: 683,
      frequency: 0,
      description: "Beta-blocker for heart conditions"
    },
    {
      name: "sertraline",
      stockQuantity: 140,
      manufactureDate: "28-09-2022",
      expiryDate: "28-09-2027",
      category: "Painkiller",
      price: 1155,
      frequency: 0,
      description: "Antidepressant, treats anxiety"
    },
    {
      name: "gabapentin",
      stockQuantity: 160,
      manufactureDate: "10-12-2022",
      expiryDate: "10-12-2027",
      category: "Painkiller",
      price: 928,
      frequency: 0,
      description: "Anticonvulsant, nerve pain treatment"
    },
    {
      name: "losartan",
      stockQuantity: 125,
      manufactureDate: "19-06-2023",
      expiryDate: "19-06-2028",
      category: "Antihistamine",
      price: 769,
      frequency: 0,
      description: "Angiotensin receptor blocker for hypertension"
    },
    {
      name: "atorvastatin",
      stockQuantity: 150,
      manufactureDate: "26-11-2022",
      expiryDate: "26-11-2027",
      category: "Antihistamine",
      price: 1383,
      frequency: 0,
      description: "Cholesterol-lowering medication"
    },
    {
      name: "escitalopram",
      stockQuantity: 130,
      manufactureDate: "07-11-2022",
      expiryDate: "07-11-2027",
      category: "Antibiotic",
      price: 1225,
      frequency: 0,
      description: "Antidepressant, treats anxiety and depression"
    },
    {
      name: "fluoxetine",
      stockQuantity: 140,
      manufactureDate: "04-11-2022",
      expiryDate: "04-11-2027",
      category: "Painkiller",
      price: 1049,
      frequency: 0,
      description: "Antidepressant, treats OCD and bulimia"
    },
    {
      name: "pantoprazole",
      stockQuantity: 170,
      manufactureDate: "03-08-2022",
      expiryDate: "03-08-2027",
      category: "Antihistamine",
      price: 1418,
      frequency: 0,
      description: "Proton pump inhibitor, reduces stomach acid"
    },
    {
      name: "hydrocodone",
      stockQuantity: 50,
      manufactureDate: "20-06-2022",
      expiryDate: "20-06-2027",
      category: "Antibiotic",
      price: 1995,
      frequency: 0,
      description: "Opioid pain medication"
    },
    {
      name: "clopidogrel",
      stockQuantity: 100,
      manufactureDate: "13-02-2022",
      expiryDate: "13-02-2027",
      category: "Antihistamine",
      price: 1663,
      frequency: 0,
      description: "Antiplatelet medication, reduces risk of stroke and heart attack"
    },
    {
      name: "doxycycline",
      stockQuantity: 90,
      manufactureDate: "28-05-2022",
      expiryDate: "28-05-2027",
      category: "Vitamin",
      price: 1138,
      frequency: 0,
      description: "Antibiotic for bacterial infections, including acne and Lyme disease"
    },
    {
      name: "furosemide",
      stockQuantity: 80,
      manufactureDate: "26-05-2022",
      expiryDate: "26-05-2027",
      category: "Antidepressant",
      price: 629,
      frequency: 0,
      description: "Diuretic, helps reduce fluid retention and swelling"
    },
    {
      name: "hydrochlorothiazide",
      stockQuantity: 110,
      manufactureDate: "25-05-2022",
      expiryDate: "25-05-2027",
      category: "Vitamin",
      price: 508,
      frequency: 0,
      description: "Diuretic, treats high blood pressure and fluid retention"
    },
    {
      name: "azithromycin",
      stockQuantity: 85,
      manufactureDate: "18-05-2022",
      expiryDate: "18-05-2027",
      category: "Painkiller",
      price: 1505,
      frequency: 0,
      description: "Antibiotic for respiratory and skin infections"
    },
    {
      name: "prednisone",
      stockQuantity: 95,
      manufactureDate: "01-11-2023",
      expiryDate: "01-11-2028",
      category: "Vitamin",
      price: 788,
      frequency: 0,
      description: "Corticosteroid, reduces inflammation in conditions like arthritis and allergies"
    },
    {
      name: "citalopram",
      stockQuantity: 130,
      manufactureDate: "28-01-2022",
      expiryDate: "28-01-2027",
      category: "Vitamin",
      price: 963,
      frequency: 0,
      description: "Antidepressant, treats depression and anxiety disorders"
    },
    {
      name: "clonazepam",
      stockQuantity: 100,
      manufactureDate: "16-02-2022",
      expiryDate: "16-02-2027",
      category: "Antihistamine",
      price: 1278,
      frequency: 0,
      description: "Benzodiazepine, treats seizures and panic disorders"
    },
    {
      name: "tramadol",
      stockQuantity: 60,
      manufactureDate: "26-03-2022",
      expiryDate: "26-03-2027",
      category: "Antihistamine",
      price: 1085,
      frequency: 0,
      description: "Opioid pain medication, used for moderate to severe pain relief"
    },
    {
      name: "allopurinol",
      stockQuantity: 90,
      manufactureDate: "05-04-2023",
      expiryDate: "05-04-2028",
      category: "Antidepressant",
      price: 648,
      frequency: 0,
      description: "Reduces uric acid levels, treats gout and kidney stones"
    },
    {
      name: "alprazolam",
      stockQuantity: 70,
      manufactureDate: "06-08-2022",
      expiryDate: "06-08-2027",
      category: "Painkiller",
      price: 1259,
      frequency: 0,
      description: "Benzodiazepine, used to treat anxiety and panic disorders"
    },
    {
      name: "warfarin",
      stockQuantity: 85,
      manufactureDate: "01-04-2022",
      expiryDate: "01-04-2027",
      category: "Painkiller",
      price: 875,
      frequency: 0,
      description: "Anticoagulant, prevents blood clots in conditions like atrial fibrillation"
    },
    {
      name: "rosuvastatin",
      stockQuantity: 140,
      manufactureDate: "15-07-2022",
      expiryDate: "15-07-2027",
      category: "Painkiller",
      price: 1733,
      frequency: 0,
      description: "Cholesterol-lowering medication, reduces risk of heart disease"
    },
    {
      name: "duloxetine",
      stockQuantity: 120,
      manufactureDate: "18-07-2022",
      expiryDate: "18-07-2027",
      category: "Antidepressant",
      price: 1558,
      frequency: 0,
      description: "Antidepressant, treats depression, anxiety, and chronic pain conditions"
    },
    {
      name: "topiramate",
      stockQuantity: 110,
      manufactureDate: "30-01-2022",
      expiryDate: "30-01-2027",
      category: "Antidepressant",
      price: 1365,
      frequency: 0,
      description: "Anticonvulsant, used to treat epilepsy and prevent migraines"
    },
    {
      name: "spironolactone",
      stockQuantity: 75,
      manufactureDate: "06-03-2022",
      expiryDate: "06-03-2027",
      category: "Antihistamine",
      price: 1033,
      frequency: 0,
      description: "Diuretic, treats fluid retention and high blood pressure"
    },
    {
      name: "venlafaxine",
      stockQuantity: 115,
      manufactureDate: "24-01-2022",
      expiryDate: "24-01-2027",
      category: "Painkiller",
      price: 1189,
      frequency: 0,
      description: "Antidepressant, treats depression, anxiety, and panic disorders"
    },
    {
      name: "celecoxib",
      stockQuantity: 80,
      manufactureDate: "08-05-2022",
      expiryDate: "08-05-2027",
      category: "Antibiotic",
      price: 1768,
      frequency: 0,
      description: "NSAID, treats pain and inflammation in arthritis and other conditions"
    },
    {
      name: "tamsulosin",
      stockQuantity: 100,
      manufactureDate: "24-08-2022",
      expiryDate: "24-08-2027",
      category: "Painkiller",
      price: 1435,
      frequency: 0,
      description: "Alpha-blocker, treats benign prostatic hyperplasia (enlarged prostate)"
    },
    {
      name: "zofran",
      stockQuantity: 70,
      manufactureDate: "27-10-2022",
      expiryDate: "27-10-2027",
      category: "Antidepressant",
      price: 1943,
      frequency: 0,
      description: "Anti-nausea medication, often used to prevent nausea and vomiting"
    },
    {
      name: "bupropion",
      stockQuantity: 95,
      manufactureDate: "31-03-2022",
      expiryDate: "31-03-2027",
      category: "Vitamin",
      price: 1295,
      frequency: 0,
      description: "Antidepressant, also used for smoking cessation"
    },
    {
      name: "pravastatin",
      stockQuantity: 90,
      manufactureDate: "03-02-2022",
      expiryDate: "03-02-2027",
      category: "Painkiller",
      price: 1068,
      frequency: 0,
      description: "Cholesterol-lowering medication, reduces risk of heart disease"
    },
    {
      name: "clonidine",
      stockQuantity: 60,
      manufactureDate: "07-05-2022",
      expiryDate: "07-05-2027",
      category: "Antibiotic",
      price: 753,
      frequency: 0,
      description: "Lowers blood pressure, also used for ADHD and withdrawal symptoms"
    },
    {
      name: "insulin glargine",
      stockQuantity: 50,
      manufactureDate: "14-02-2022",
      expiryDate: "14-02-2027",
      category: "Antihistamine",
      price: 3219,
      frequency: 0,
      description: "Long-acting insulin, used to control blood sugar in diabetes"
    },
    {
      name: "morphine",
      stockQuantity: 40,
      manufactureDate: "12-03-2022",
      expiryDate: "12-03-2027",
      category: "Painkiller",
      price: 2275,
      frequency: 0,
      description: "Opioid pain medication, used for severe pain relief"
    },
    {
      name: "lamotrigine",
      stockQuantity: 75,
      manufactureDate: "24-10-2022",
      expiryDate: "24-10-2027",
      category: "Antidepressant",
      price: 1488,
      frequency: 0,
      description: "Anticonvulsant, treats epilepsy and bipolar disorder"
    },
    {
      name: "zolpidem",
      stockQuantity: 85,
      manufactureDate: "30-05-2022",
      expiryDate: "30-05-2027",
      category: "Antihistamine",
      price: 945,
      frequency: 0,
      description: "Sedative, treats insomnia and helps with sleep initiation"
    },
    {
      name: "quetiapine",
      stockQuantity: 95,
      manufactureDate: "28-06-2022",
      expiryDate: "28-06-2027",
      category: "Antihistamine",
      price: 1873,
      frequency: 0,
      description: "Antipsychotic, treats schizophrenia and bipolar disorder"
    },
    {
      name: "valsartan",
      stockQuantity: 105,
      manufactureDate: "26-08-2022",
      expiryDate: "26-08-2027",
      category: "Antibiotic",
      price: 1208,
      frequency: 0,
      description: "Angiotensin II receptor blocker, treats high blood pressure and heart failure"
    },
    {
      name: "ketorolac",
      stockQuantity: 70,
      manufactureDate: "09-09-2022",
      expiryDate: "09-09-2027",
      category: "Antibiotic",
      price: 1399,
      frequency: 0,
      description: "NSAID, treats moderate to severe pain, usually after surgery"
    },
    {
      name: "bisoprolol",
      stockQuantity: 80,
      manufactureDate: "03-06-2022",
      expiryDate: "03-06-2027",
      category: "Painkiller",
      price: 805,
      frequency: 0,
      description: "Beta-blocker, treats high blood pressure and heart conditions"
    },
    {
      name: "esomeprazole",
      stockQuantity: 90,
      manufactureDate: "20-01-2022",
      expiryDate: "20-01-2027",
      category: "Painkiller",
      price: 1628,
      frequency: 0,
      description: "Proton pump inhibitor, reduces stomach acid and treats GERD"
    },
    {
      name: "loratadine",
      stockQuantity: 120,
      manufactureDate: "01-03-2022",
      expiryDate: "01-03-2027",
      category: "Painkiller",
      price: 612,
      frequency: 0,
      description: "Antihistamine, treats allergy symptoms like runny nose and sneezing"
    },
    {
      name: "montelukast",
      stockQuantity: 110,
      manufactureDate: "2015-10-19",
      expiryDate: "01-03-2027",
      category: "Painkiller",
      price: 1785,
      frequency: 0,
      description: "Leukotriene receptor antagonist, treats allergies and asthma"
    },
    {
      name: "oxycodone",
      stockQuantity: 45,
      manufactureDate: "2016-10-14",
      expiryDate: "01-03-2027",
      category: "Painkiller",
      price: 2503,
      frequency: 0,
      description: "Opioid pain medication, used for moderate to severe pain relief"
    },
    {
      name: "pioglitazone",
      stockQuantity: 100,
      manufactureDate: "2017-03-20",
      expiryDate: "01-03-2027",
      category: "Vitamin",
      price: 1978,
      frequency: 0,
      description: "Thiazolidinedione, helps control blood sugar in type 2 diabetes"
    },
    {
      name: "ranitidine",
      stockQuantity: 85,
      manufactureDate: "2023-09-02",
      expiryDate: "01-03-2027",
      category: "Antihistamine",
      price: 873,
      frequency: 0,
      description: "Histamine-2 blocker, reduces stomach acid and treats ulcers"
    },
    {
      name: "sitagliptin",
      stockQuantity: 75,
      manufactureDate: "2018-12-27",
      expiryDate: "01-03-2027",
      category: "Antibiotic",
      price: 2099,
      frequency: 0,
      description: "DPP-4 inhibitor, helps control blood sugar in type 2 diabetes"
    },
    {
      name: "atenolol",
      stockQuantity: 110,
      manufactureDate: "2023-06-22",
      expiryDate: "01-03-2027",
      category: "Antibiotic",
      price: 665,
      frequency: 0,
      description: "Beta-blocker, treats high blood pressure and angina"
    },
    {
      name: "fentanyl",
      stockQuantity: 30,
      manufactureDate: "2022-11-12",
      expiryDate: "01-03-2027",
      category: "Painkiller",
      price: 2958,
      frequency: 0,
      description: "Opioid pain medication, used for severe pain relief, often in patch form"
    },
    {
      name: "methotrexate",
      stockQuantity: 50,
      manufactureDate: "2015-12-20",
      expiryDate: "01-03-2027",
      category: "Antidepressant",
      price: 2205,
      frequency: 0,
      description: "Immunosuppressant, treats rheumatoid arthritis and some cancers"
    },
    {
      name: "aripiprazole",
      stockQuantity: 70,
      manufactureDate: "2017-09-08",
      expiryDate: "01-03-2027",
      category: "Painkiller",
      price: 2713,
      frequency: 0,
      description: "Antipsychotic, treats schizophrenia and bipolar disorder"
    },
    {
      name: "rifampin",
      stockQuantity: 65,
      manufactureDate: "2015-08-18",
      expiryDate: "01-03-2027",
      category: "Vitamin",
      price: 1838,
      frequency: 0,
      description: "Antibiotic, treats tuberculosis and other bacterial infections"
    },
    {
      name: "lithium",
      stockQuantity: 60,
      manufactureDate: "2018-03-16",
      expiryDate: "01-03-2027",
      category: "Antihistamine",
      price: 1015,
      frequency: 0,
      description: "Mood stabilizer, treats bipolar disorder"
    },
    {
      name: "rivastigmine",
      stockQuantity: 55,
      manufactureDate: "2017-09-03",
      expiryDate: "01-03-2027",
      category: "Antibiotic",
      price: 2379,
      frequency: 0,
      description: "Cholinesterase inhibitor, treats dementia associated with Alzheimer's or Parkinson's"
    }
  ]
)
}

insertnames()
console.log('medicines inserted successfully!')