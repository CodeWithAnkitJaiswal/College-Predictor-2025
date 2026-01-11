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
College-Predictor-2025/
│
├── index.html
├── styles.css
├── script-style.js
├── common.css
├── features.js
├── landing.css
├── landing.js
├── robots.txt
├── sitemap.xml
│
├── counselling/
│   ├── index.html
│   └── styles.css
│
├── csab/
│   ├── index.html
│   ├── csab.db
│   └── styles.css
│
├── josaa/
│   ├── index.html
│   ├── josaa.db
│   ├── josaa5.db
│   └── script.js
│
├── uptu/
│   ├── index.html
│   ├── styles.css
│   ├── counsellingAd.js
│   └── (other related JS/CSS files)
│
└── img/
    └── (images and assets)
```

---

## 🚀 How It Works

### 1. User Inputs  
- Rank  
- Category (GEN/OBC/SC/ST/EWS)  
- Branch Preference
- Home State
- Gender

### 2. Algorithm Filters the Dataset  
Filtering steps:

1. Load dataset  
2. Match category
3. Match gender
4. Check Home State Quota
5. Match branch  
6. Check rank <= closing rank  
7. Sort results by:
   - cutoff difficulty  
   - distance  
   - placement tier (optional)

### 3. Output  
Predicted colleges with:
- Institute name  
- Branch name  
- Closing rank
- Quota (home state)
- category
- Gender

---

## 🖨️ Print Your Choice Order

The predictor includes a built-in **Print button** that allows students to export their final college choice list in a clean and formatted layout.

### What the Print Feature Does
- Prints the **entire prediction table** with all filtered colleges  
- Auto-formats the table for A4 size  
- Removes unnecessary UI elements during printing  
- Generates a **clean, official-looking list** students can save as:
  - PDF  
  - Physical printout  

### How to Use It
1. Enter your rank, category, branch, and exam type  
2. View the predicted college list  
3. Click the **“Print”** button at the top  
4. Choose **Save as PDF** or **Print** directly  

This helps students keep their counselling preference order handy during form filling.

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
- UPTAC official cutoff 
- JOSAA official cutoff
- CSAB official cutoff
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

