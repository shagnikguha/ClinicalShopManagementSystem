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
      price: 419
    },
    {
      name: "ibuprofen",
      stockQuantity: 150,
    manufactureDate: "12-10-2022",
    expiryDate: "12-10-2027",
      category: "Vitamin",
      price: 525
    },
    {
      name: "acetaminophen",
      stockQuantity: 200,
    manufactureDate: "28-04-2022",
    expiryDate: "28-04-2027",
      category: "Painkiller",
      price: 438
    },
    {
      name: "amoxicillin",
      stockQuantity: 80,
    manufactureDate: "02-11-2022",
    expiryDate: "02-11-2027",
      category: "Vitamin",
      price: 1103
    },
    {
      name: "lisinopril",
      stockQuantity: 120,
    manufactureDate: "09-10-2022",
    expiryDate: "09-10-2027",
      category: "Vitamin",
      price: 909
    },
    {
      name: "metformin",
      stockQuantity: 150,
    manufactureDate: "27-11-2022",
    expiryDate: "27-11-2027",
      category: "Antidepressant",
      price: 595
    },
    {
      name: "levothyroxine",
      stockQuantity: 180,
    manufactureDate: "30-09-2022",
    expiryDate: "30-09-2027",
      category: "Vitamin",
      price: 998
    },
    {
      name: "amlodipine",
      stockQuantity: 130,
    manufactureDate: "20-10-2022",
    expiryDate: "20-10-2027",
      category: "Vitamin",
      price: 823
    },
    {
      name: "albuterol",
      stockQuantity: 90,
    manufactureDate: "15-01-2022",
    expiryDate: "15-01-2027",
      category: "Antibiotic",
      price: 1575
    },
    {
      name: "omeprazole",
      stockQuantity: 200,
    manufactureDate: "30-11-2022",
    expiryDate: "30-11-2027",
      category: "Antidepressant",
      price: 1329
    },
    {
      name: "metoprolol",
      stockQuantity: 110,
    manufactureDate: "20-10-2023",
    expiryDate: "20-10-2028",
      category: "Painkiller",
      price: 683
    },
    {
      name: "sertraline",
      stockQuantity: 140,
    manufactureDate: "28-09-2022",
    expiryDate: "28-09-2027",
      category: "Painkiller",
      price: 1155
    },
    {
      name: "gabapentin",
      stockQuantity: 160,
    manufactureDate: "10-12-2022",
    expiryDate: "10-12-2027",
      category: "Painkiller",
      price: 928
    },
    {
      name: "losartan",
      stockQuantity: 125,
    manufactureDate: "19-06-2023",
    expiryDate: "19-06-2028",
      category: "Antihistamine",
      price: 769
    },
    {
      name: "atorvastatin",
      stockQuantity: 150,
    manufactureDate: "26-11-2022",
    expiryDate: "26-11-2027",
      category: "Antihistamine",
      price: 1383
    },
    {
      name: "escitalopram",
      stockQuantity: 130,
    manufactureDate: "07-11-2022",
    expiryDate: "07-11-2027",
      category: "Antibiotic",
      price: 1225
    },
    {
      name: "fluoxetine",
      stockQuantity: 140,
    manufactureDate: "04-11-2022",
    expiryDate: "04-11-2027",
      category: "Painkiller",
      price: 1049
    },
    {
      name: "pantoprazole",
      stockQuantity: 170,
    manufactureDate: "03-08-2022",
    expiryDate: "03-08-2027",
      category: "Antihistamine",
      price: 1418
    },
    {
      name: "hydrocodone",
      stockQuantity: 50,
    manufactureDate: "20-06-2022",
    expiryDate: "20-06-2027",
      category: "Antibiotic",
      price: 1995
    },
    {
      name: "clopidogrel",
      stockQuantity: 100,
    manufactureDate: "13-02-2022",
    expiryDate: "13-02-2027",
      category: "Antihistamine",
      price: 1663
    },
    {
      name: "doxycycline",
      stockQuantity: 90,
    manufactureDate: "28-05-2022",
    expiryDate: "28-05-2027",
      category: "Vitamin",
      price: 1138
    },
    {
      name: "furosemide",
      stockQuantity: 80,
    manufactureDate: "26-05-2022",
    expiryDate: "26-05-2027",
      category: "Antidepressant",
      price: 629
    },
    {
      name: "hydrochlorothiazide",
      stockQuantity: 110,
    manufactureDate: "25-05-2022",
    expiryDate: "25-05-2027",
      category: "Vitamin",
      price: 508
    },
    {
      name: "azithromycin",
      stockQuantity: 85,
    manufactureDate: "18-05-2022",
    expiryDate: "18-05-2027",
      category: "Painkiller",
      price: 1505
    },
    {
      name: "prednisone",
      stockQuantity: 95,
    manufactureDate: "01-11-2023",
    expiryDate: "01-11-2028",
      category: "Vitamin",
      price: 788
    },
    {
      name: "citalopram",
      stockQuantity: 130,
    manufactureDate: "28-01-2022",
    expiryDate: "28-01-2027",
      category: "Vitamin",
      price: 963
    },
    {
      name: "clonazepam",
      stockQuantity: 100,
    manufactureDate: "16-02-2022",
    expiryDate: "16-02-2027",
      category: "Antihistamine",
      price: 1278
    },
    {
      name: "tramadol",
      stockQuantity: 60,
    manufactureDate: "26-03-2022",
    expiryDate: "26-03-2027",
      category: "Antihistamine",
      price: 1085
    },
    {
      name: "allopurinol",
      stockQuantity: 90,
    manufactureDate: "05-04-2023",
    expiryDate: "05-04-2028",
      category: "Antidepressant",
      price: 648
    },
    {
      name: "alprazolam",
      stockQuantity: 70,
    manufactureDate: "06-08-2022",
    expiryDate: "06-08-2027",
      category: "Painkiller",
      price: 1259
    },
    {
      name: "warfarin",
      stockQuantity: 85,
    manufactureDate: "01-04-2022",
    expiryDate: "01-04-2027",
      category: "Painkiller",
      price: 875
    },
    {
      name: "rosuvastatin",
      stockQuantity: 140,
    manufactureDate: "15-07-2022",
    expiryDate: "15-07-2027",
      category: "Painkiller",
      price: 1733
    },
    {
      name: "duloxetine",
      stockQuantity: 120,
    manufactureDate: "18-07-2022",
    expiryDate: "18-07-2027",
      category: "Antidepressant",
      price: 1558
    },
    {
      name: "topiramate",
      stockQuantity: 110,
    manufactureDate: "30-01-2022",
    expiryDate: "30-01-2027",
      category: "Antidepressant",
      price: 1365
    },
    {
      name: "spironolactone",
      stockQuantity: 75,
    manufactureDate: "06-03-2022",
    expiryDate: "06-03-2027",
      category: "Antihistamine",
      price: 1033
    },
    {
      name: "venlafaxine",
      stockQuantity: 115,
    manufactureDate: "24-01-2022",
    expiryDate: "24-01-2027",
      category: "Painkiller",
      price: 1189
    },
    {
      name: "celecoxib",
      stockQuantity: 80,
    manufactureDate: "08-05-2022",
    expiryDate: "08-05-2027",
      category: "Antibiotic",
      price: 1768
    },
    {
      name: "tamsulosin",
      stockQuantity: 100,
    manufactureDate: "24-08-2022",
    expiryDate: "24-08-2027",
      category: "Painkiller",
      price: 1435
    },
    {
      name: "zofran",
      stockQuantity: 70,
    manufactureDate: "27-10-2022",
    expiryDate: "27-10-2027",
      category: "Antidepressant",
      price: 1943
    },
    {
      name: "bupropion",
      stockQuantity: 95,
    manufactureDate: "31-03-2022",
    expiryDate: "31-03-2027",
      category: "Vitamin",
      price: 1295
    },
    {
      name: "pravastatin",
      stockQuantity: 90,
    manufactureDate: "03-02-2022",
    expiryDate: "03-02-2027",
      category: "Painkiller",
      price: 1068
    },
    {
      name: "clonidine",
      stockQuantity: 60,
    manufactureDate: "07-05-2022",
    expiryDate: "07-05-2027",
      category: "Antibiotic",
      price: 753
    },
    {
      name: "insulin glargine",
      stockQuantity: 50,
    manufactureDate: "14-02-2022",
    expiryDate: "14-02-2027",
      category: "Antihistamine",
      price: 3219
    },
    {
      name: "morphine",
      stockQuantity: 40,
    manufactureDate: "12-03-2022",
    expiryDate: "12-03-2027",
      category: "Painkiller",
      price: 2275
    },
    {
      name: "lamotrigine",
      stockQuantity: 75,
    manufactureDate: "24-10-2022",
    expiryDate: "24-10-2027",
      category: "Antidepressant",
      price: 1488
    },
    {
      name: "zolpidem",
      stockQuantity: 85,
    manufactureDate: "30-05-2022",
    expiryDate: "30-05-2027",
      category: "Antihistamine",
      price: 945
    },
    {
      name: "quetiapine",
      stockQuantity: 95,
    manufactureDate: "28-06-2022",
    expiryDate: "28-06-2027",
      category: "Antihistamine",
      price: 1873
    },
    {
      name: "valsartan",
      stockQuantity: 105,
    manufactureDate: "26-08-2022",
    expiryDate: "26-08-2027",
      category: "Antibiotic",
      price: 1208
    },
    {
      name: "ketorolac",
      stockQuantity: 70,
    manufactureDate: "09-09-2022",
    expiryDate: "09-09-2027",
      category: "Antibiotic",
      price: 1399
    },
    {
      name: "bisoprolol",
      stockQuantity: 80,
    manufactureDate: "03-06-2022",
    expiryDate: "03-06-2027",
      category: "Painkiller",
      price: 805
    },
    {
      name: "esomeprazole",
      stockQuantity: 90,
    manufactureDate: "20-01-2022",
    expiryDate: "20-01-2027",
      category: "Painkiller",
      price: 1628
    },
    {
      name: "loratadine",
      stockQuantity: 120,
    manufactureDate: "01-03-2022",
    expiryDate: "01-03-2027",
      category: "Painkiller",
      price: 612
    },
    {
      name: "montelukast",
      stockQuantity: 110,
      manufactureDate: "2015-10-19",
    expiryDate: "01-03-2027",
      category: "Painkiller",
      price: 1785,
    },
    {
      name: "oxycodone",
      stockQuantity: 45,
      manufactureDate: "2016-10-14",
    expiryDate: "01-03-2027",
      category: "Painkiller",
      price: 2503,
    },
    {
      name: "pioglitazone",
      stockQuantity: 100,
      manufactureDate: "2017-03-20",
    expiryDate: "01-03-2027",
      category: "Vitamin",
      price: 1978,
    },
    {
      name: "ranitidine",
      stockQuantity: 85,
      manufactureDate: "2023-09-02",
    expiryDate: "01-03-2027",
      category: "Antihistamine",
      price: 873,
    },
    {
      name: "sitagliptin",
      stockQuantity: 75,
      manufactureDate: "2018-12-27",
    expiryDate: "01-03-2027",
      category: "Antibiotic",
      price: 2099,
    },
    {
      name: "atenolol",
      stockQuantity: 110,
      manufactureDate: "2023-06-22",
    expiryDate: "01-03-2027",
      category: "Antibiotic",
      price: 665,
    },
    {
      name: "fentanyl",
      stockQuantity: 30,
      manufactureDate: "2022-11-12",
    expiryDate: "01-03-2027",
      category: "Painkiller",
      price: 2958,
    },
    {
      name: "methotrexate",
      stockQuantity: 50,
      manufactureDate: "2015-12-20",
    expiryDate: "01-03-2027",
      category: "Antidepressant",
      price: 2205,
    },
    {
      name: "aripiprazole",
      stockQuantity: 70,
      manufactureDate: "2017-09-08",
    expiryDate: "01-03-2027",
      category: "Painkiller",
      price: 2713
    },
    {
      name: "rifampin",
      stockQuantity: 65,
      manufactureDate: "2015-08-18",
    expiryDate: "01-03-2027",
      category: "Vitamin",
      price: 1838,
    },
    {
      name: "lithium",
      stockQuantity: 60,
      manufactureDate: "2018-03-16",
    expiryDate: "01-03-2027",
      category: "Antihistamine",
      price: 1015
    },
    {
      name: "rivastigmine",
      stockQuantity: 55,
      manufactureDate: "2017-09-03",
    expiryDate: "01-03-2027",
      category: "Antibiotic",
      price: 2379
    }
  ]
)
}

insertnames()
console.log('medicines inserted successfully!')