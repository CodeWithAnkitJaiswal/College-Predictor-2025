# College Predictor – JEE / UPTAC / Rank-Based Predictor

A simple and accurate rank-based college prediction tool designed for students preparing for engineering entrance exams.  
This project helps students estimate which colleges they can get based on their **rank**, **category**, and **preferred branch**, using real historical cutoff datasets.

---

## ✨ Features

- 🔍 Predict colleges based on rank, category, quota, and branch  
- 📊 Uses real historical cutoff data (UPTAC / JEE-based datasets)  
- ⚡ Fast search with optimized filtering  
- 📱 Mobile-friendly UI

---

## 🏗️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** JavaScript
- **Data:** sqlite cutoff files  
- **Deployment:** Netlify (recommended)

---

## 📁 Project Structure

```
/root
│── index.html
│── style.css
│── script.js
│── /data
│     └── cutoff.json or cutoff.csv
│── /utils
│     └── parser.js
│── README.md
```

---

## 🚀 How It Works

### 1. User Inputs  
- Rank  
- Category (GEN/OBC/SC/ST/EWS)  
- Branch Preference  
- Exam Type  

### 2. Algorithm Filters the Dataset  
Filtering steps:

1. Load dataset  
2. Match category  
3. Match branch  
4. Check rank <= closing rank  
5. Sort results by:
   - cutoff difficulty  
   - distance  
   - placement tier (optional)

### 3. Output  
Predicted colleges with:
- Institute name  
- Branch name  
- Closing rank  
- Year of cutoff  
- Probability (High / Medium / Low)

---

## ⚙️ Setup & Run Locally

### Clone the repo
```bash
git clone https://github.com/yourusername/college-predictor.git
cd college-predictor
```

### Open the project
Simply open:
```
index.html
```

No build tools required.

---

## 🌐 Deployment (Netlify Recommended)

1. Visit https://netlify.com  
2. Click **New Site from Git**  
3. Select your GitHub repo  
4. Configure:
   - **Build command:** none  
   - **Publish directory:** `/`  
5. Deploy

Your hosted URL will be generated instantly.

---

## 📊 Dataset Source

This project uses **public cutoff datasets** from:  
- UPTAC official cutoff PDFs  
- JEE Main JoSAA mock data  
- Community-compiled datasets  

*(Replace these with actual sources if needed)*

---

## 🧩 Future Improvements

- AI-based rank → college confidence scoring  
- State-wise filters  
- Placement data integration  
- Opening + Closing rank visual charts  
- Multi-year cutoff comparison  
- Dark mode option

---

## 🤝 Contributing

Contributions are welcome!

You can:  
- Open an **Issue**  
- Submit a **Pull Request**  
- Suggest **New Features**

---

## 📄 License

MIT License – free to use and modify.

---

## 🙋 Contact

**Ankit Jaiswal**  
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cwankitjaiswal7)

