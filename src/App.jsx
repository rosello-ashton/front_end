
import './App.css'
import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Nunito:wght@300;400;500;600&display=swap');

  :root {
    --sky-deep:   #1a6fa8;
    --sky-mid:    #2196c4;
    --sky-light:  #5bc4e8;
    --sky-pale:   #a8dff0;
    --night:      #0d3a5c;
    --star:       #e8f6ff;
    --form-bg:    #f5faff;
    --border:     #c8e0f0;
    --text-dark:  #0d3a5c;
    --text-mid:   #4a7a99;
    --text-muted: #8ab0c8;
    --accent:     #2196c4;
    --white:      #ffffff;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Nunito', sans-serif;
    min-height: 100vh;
    background: var(--sky-deep);
  }

  .root {
    min-height: 100vh;
    display: flex;
    font-family: 'Nunito', sans-serif;
  }

  /* LEFT: Welcome Panel */
  .welcome {
    flex: 1.1;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 52px;
  }

  .sky-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
      #0d2f50 0%,
      #0e4a7a 25%,
      #1a6fa8 55%,
      #2196c4 75%,
      #3ab8d8 90%,
      #5bc4e8 100%
    );
  }

  .stars {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  .star {
    position: absolute;
    border-radius: 50%;
    background: #fff;
    animation: twinkle var(--d, 3s) ease-in-out infinite var(--delay, 0s);
  }

  @keyframes twinkle {
    0%, 100% { opacity: var(--min-op, 0.3); transform: scale(1); }
    50%       { opacity: 1;                 transform: scale(1.3); }
  }

  .shoot {
    position: absolute;
    width: 2px;
    height: 80px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.9), transparent);
    border-radius: 1px;
    animation: shoot var(--sd, 4s) ease-in infinite var(--sdelay, 0s);
    transform-origin: top center;
  }

  @keyframes shoot {
    0%   { opacity: 0; transform: translateY(-20px) rotate(35deg); }
    10%  { opacity: 1; }
    40%  { opacity: 0; transform: translateY(180px) rotate(35deg); }
    100% { opacity: 0; transform: translateY(180px) rotate(35deg); }
  }

  .mountains {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }

  .mist {
    position: absolute;
    bottom: 30%;
    left: 0;
    width: 200%;
    height: 60px;
    background: linear-gradient(90deg,
      rgba(255,255,255,0) 0%,
      rgba(163,217,240,0.18) 30%,
      rgba(255,255,255,0.22) 50%,
      rgba(163,217,240,0.18) 70%,
      rgba(255,255,255,0) 100%
    );
    z-index: 3;
    animation: driftMist 18s linear infinite;
    border-radius: 50%;
  }

  @keyframes driftMist {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .welcome-content {
    position: relative;
    z-index: 5;
    text-align: center;
  }

  .welcome-title {
    font-family: 'Cinzel', serif;
    font-size: 2.4rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.06em;
    text-shadow: 0 2px 20px rgba(0,0,0,0.4);
    margin-bottom: 10px;
    animation: fadeUp 1s ease 0.2s both;
  }

  .welcome-sub {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.6);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    animation: fadeUp 1s ease 0.4s both;
  }

  .site-url {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    z-index: 5;
  }

  /* RIGHT: Form Panel */
  .form-panel {
    width: 420px;
    background: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 56px 48px;
    box-shadow: -16px 0 60px rgba(0,0,0,0.18);
    animation: slideLeft 0.8s cubic-bezier(0.22,1,0.36,1) both;
  }

  .greeting-tag {
    font-size: 0.7rem;
    color: var(--text-muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .greeting-main {
    font-family: 'Cinzel', serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--sky-deep);
    margin-bottom: 6px;
  }

  .form-heading {
    font-family: 'Cinzel', serif;
    font-size: 1.55rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 28px;
    line-height: 1.2;
  }

  .field-group { margin-bottom: 18px; }

  .field-label {
    display: block;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--text-mid);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 7px;
  }

  .field-wrap { position: relative; }

  .field-input {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid var(--border);
    border-radius: 6px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.88rem;
    color: var(--text-dark);
    background: var(--form-bg);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }

  .field-input::placeholder { color: #b0ccd8; }

  .field-input:focus {
    border-color: var(--sky-mid);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(33,150,196,0.12);
  }

  .toggle-eye {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    padding: 0;
    transition: color 0.2s;
  }

  .toggle-eye:hover { color: var(--sky-mid); }

  .pass-input { padding-right: 40px; }

  .row-opts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .remember {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.78rem;
    color: var(--text-mid);
    cursor: pointer;
    user-select: none;
  }

  .remember input {
    width: 14px; height: 14px;
    accent-color: var(--sky-mid);
    cursor: pointer;
  }

  .forgot-btn {
    font-size: 0.78rem;
    color: var(--sky-mid);
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    padding: 0;
    transition: color 0.2s;
  }

  .forgot-btn:hover { color: var(--night); text-decoration: underline; }

  .error-msg {
    background: #fff0f0;
    border: 1px solid #fecaca;
    color: #b91c1c;
    font-size: 0.78rem;
    padding: 9px 13px;
    border-radius: 5px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .submit-btn {
    width: 100%;
    padding: 13px;
    background: linear-gradient(135deg, var(--sky-mid) 0%, var(--sky-deep) 100%);
    color: #fff;
    font-family: 'Nunito', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 22px;
    box-shadow: 0 4px 18px rgba(33,150,196,0.4);
    transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(33,150,196,0.5);
    opacity: 0.94;
  }

  .submit-btn:active { transform: translateY(0); }

  .create-acc {
    text-align: center;
    margin-top: 22px;
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .create-acc a {
    color: var(--sky-mid);
    font-weight: 600;
    text-decoration: none;
  }

  .create-acc a:hover { text-decoration: underline; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideLeft {
    from { transform: translateX(50px); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
  }

  @media (max-width: 780px) {
    .root { flex-direction: column; }
    .welcome { min-height: 260px; flex: none; }
    .welcome-title { font-size: 1.8rem; }
    .form-panel { width: 100%; padding: 44px 32px; box-shadow: none; }
  }
`;

const STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  top:  `${Math.random() * 65}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 0.8,
  d:    `${Math.random() * 3 + 2}s`,
  delay:`${Math.random() * 4}s`,
  minOp: (Math.random() * 0.3 + 0.1).toFixed(2),
}));

const SHOOTS = [
  { top: "8%",  left: "20%", sd: "5s",  sdelay: "1s"   },
  { top: "15%", left: "55%", sd: "7s",  sdelay: "3.5s" },
  { top: "5%",  left: "75%", sd: "6s",  sdelay: "0.5s" },
  { top: "20%", left: "38%", sd: "8s",  sdelay: "6s"   },
];

const EyeIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4M12 16h.01"/>
  </svg>
);

const Mountains = () => (
  <svg viewBox="0 0 900 320" preserveAspectRatio="none" style={{ display:"block", width:"100%", height:"auto" }}>
    <polygon points="0,320 0,200 120,80 240,180 370,60 500,160 640,40 770,140 900,70 900,320" fill="#0b3d60" opacity="0.7"/>
    <polygon points="0,320 0,240 80,140 200,220 330,100 460,200 580,110 720,200 860,90 900,130 900,320" fill="#0f4f78" opacity="0.85"/>
    <polygon points="330,100 310,135 350,135" fill="rgba(255,255,255,0.55)"/>
    <polygon points="120,80 100,115 140,115"  fill="rgba(255,255,255,0.45)"/>
    <polygon points="640,40 620,78 660,78"   fill="rgba(255,255,255,0.5)"/>
    <ellipse cx="150" cy="310" rx="220" ry="80" fill="#1a6fa8" opacity="0.6"/>
    <ellipse cx="600" cy="315" rx="280" ry="75" fill="#1a6fa8" opacity="0.55"/>
    <ellipse cx="900" cy="320" rx="180" ry="70" fill="#1a6fa8" opacity="0.5"/>
    <rect x="0" y="280" width="900" height="40" fill="rgba(91,196,232,0.18)" rx="0"/>
  </svg>
);

export default function SkyeAcadimec() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) { setError("Please enter your email and password."); return; }
    if (!email)    { setError("Please enter your email address."); return; }
    if (!password) { setError("Please enter your password."); return; }
    setError("");
    alert(`Welcome to Skye Acadimec, ${email}!`);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="root">

        {/* LEFT PANEL */}
        <div className="welcome">
          <div className="sky-bg" />
          <div className="stars">
            {STARS.map(s => (
              <div key={s.id} className="star" style={{
                top: s.top, left: s.left,
                width: s.size, height: s.size,
                "--d": s.d, "--delay": s.delay, "--min-op": s.minOp
              }}/>
            ))}
            {SHOOTS.map((s, i) => (
              <div key={i} className="shoot" style={{
                top: s.top, left: s.left,
                "--sd": s.sd, "--sdelay": s.sdelay
              }}/>
            ))}
          </div>
          <div className="mist" />
          <div className="mountains">
            <Mountains />
          </div>
          <div className="welcome-content">
            <div className="welcome-title">Welcome Page</div>
            <div className="welcome-sub">Skye Acadimec Portal</div>
          </div>
          <div className="site-url">www.skyeacadimec.edu</div>
        </div>

        {/* RIGHT PANEL */}
        <main className="form-panel">
          <div className="greeting-tag">Welcome</div>
          <div className="greeting-main">{greeting}</div>
          <h1 className="form-heading">Login Your Account</h1>

          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="error-msg">
                <AlertIcon /><span>{error}</span>
              </div>
            )}

            <div className="field-group">
              <label className="field-label" htmlFor="email">Email Address</label>
              <div className="field-wrap">
                <input
                  className="field-input"
                  id="email"
                  type="email"
                  placeholder="you@skyeacadimec.edu"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="password">Password</label>
              <div className="field-wrap">
                <input
                  className="field-input pass-input"
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-eye"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password"
                >
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <div className="row-opts">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <button type="button" className="forgot-btn">Forgot Password?</button>
              </div>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>

          <div className="create-acc">
            Don't have an account? <a href="#">Create Account</a>
          </div>
        </main>

      </div>
    </>
  );
}