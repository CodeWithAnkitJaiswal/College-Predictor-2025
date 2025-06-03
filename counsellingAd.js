// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Add Marquee Below Navbar ---
  const marqueeContainer = document.createElement("div");
  marqueeContainer.id = "counselling-marquee";
  marqueeContainer.innerHTML = `
    <marquee behavior="scroll" direction="left" scrollamount="5" style="
      background: #fff3cd;
      color: #856404;
      font-weight: 600;
      padding: 8px 0;
      font-family: sans-serif;
      border-bottom: 1px solid #ffeeba;
    ">
      🚀 <a href="https://collage-predictor.netlify.app/counselling#pricing" style="color: #b76c00; text-decoration: none;">
        Limited Time Offer: Get Counselling at a Price Less Than Your Mobile Recharge! Click to Know More →
      </a>
    </marquee>
  `;
  const navbar = document.querySelector("nav");
  if (navbar) {
    navbar.insertAdjacentElement("afterend", marqueeContainer);
  } else {
    document.body.insertAdjacentElement("afterbegin", marqueeContainer);
  }

  // --- 2. Modal Show Logic (After 1.5 min and again after 3.5 min) ---
  const showModal = () => {
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div id="counselling-modal" style="
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.6);
        display: flex; justify-content: center; align-items: center;
        z-index: 9999;
      ">
        <div style="
          background: white;
          max-width: 400px;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          text-align: center;
          font-family: sans-serif;
        ">
          <h2 style="margin-bottom: 20px">🎓 Need Counselling Help?</h2>
          <h4>College Network Presents</h4>
          <p>Expert guidance for JoSAA, CSAB & AKTU with real mentors from IITs, NITs, Preference list & much more.</p>
          <p style="font-weight: bold; margin-top: 10px;">At a price less than your mobile recharge!</p>
          <button onclick="window.location.href='https://collage-predictor.netlify.app/counselling#pricing'" style="
            margin-top: 15px;
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
          ">Know More</button>
          <br/><br/>
          <button onclick="document.getElementById('counselling-modal').remove()" style="
            background: none;
            color: #999;
            border: none;
            margin-top: 8px;
            cursor: pointer;
          ">No Thanks</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  setTimeout(showModal, 75000);     // 1.5 minutes = 90,000 ms
  setTimeout(showModal, 210000);    // 3.5 minutes = 210,000 ms
});
