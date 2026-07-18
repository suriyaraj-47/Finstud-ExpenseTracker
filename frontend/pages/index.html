<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>FinStud — Know your true wealth at a glance</title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --cream:#F0EDE6;
  --cream-dark:#E5E1D8;
  --cream-section:#E8E4DC;
  --green:#2D6A4F;
  --green-dark:#1B4332;
  --green-light:#52B788;
  --green-pale:#D8F3DC;
  --green-icon-bg:#E8F5EE;
  --red:#C1121F;
  --text:#1a1a1a;
  --text-muted:#6b7280;
  --white:#ffffff;
  --border:#dedad2;
}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--text);overflow-x:hidden;}

/* ─── NAV ─── */
nav{
  position:sticky;top:0;z-index:200;
  background:rgba(240,237,230,0.92);
  backdrop-filter:blur(10px);
  border-bottom:1px solid var(--border);
  height:60px;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 clamp(1.25rem,5vw,4rem);
}
.logo{font-weight:700;font-size:1.2rem;letter-spacing:-0.02em;color:var(--text);cursor:pointer;}
.logo span{color:var(--green);}
.nav-links{display:flex;align-items:center;gap:1.75rem;list-style:none;}
.nav-links a{text-decoration:none;color:var(--text);font-size:0.875rem;transition:color .2s;}
.nav-links a:hover{color:var(--green);}
.nav-star{color:#f5a623;font-size:0.7rem;margin-right:2px;}
.nav-right{display:flex;align-items:center;gap:1rem;}
.btn-ghost{background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:0.875rem;color:var(--text);transition:color .2s;}
.btn-ghost:hover{color:var(--green);}
.btn-primary{
  background:var(--green);color:var(--white);
  border:none;border-radius:7px;
  padding:.55rem 1.15rem;
  font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:500;
  cursor:pointer;transition:background .2s,transform .15s;white-space:nowrap;
}
.btn-primary:hover{background:var(--green-dark);transform:translateY(-1px);}
.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px;}
.hamburger span{display:block;width:22px;height:2px;background:var(--text);border-radius:2px;transition:all .3s;}
.mobile-menu{display:none;flex-direction:column;gap:.9rem;padding:1.1rem 1.5rem;background:var(--cream);border-bottom:1px solid var(--border);}
.mobile-menu.open{display:flex;}
.mobile-menu a{text-decoration:none;color:var(--text);font-size:.95rem;}
.mobile-menu .btn-primary{text-align:center;padding:.7rem;}

/* ─── HERO ─── */
.hero{
  display:grid;grid-template-columns:1fr 1fr;
  align-items:center;gap:clamp(2rem,4vw,5rem);
  padding:clamp(3rem,7vh,5.5rem) clamp(1.25rem,5vw,4rem);
  max-width:1400px;margin:0 auto;
  min-height:calc(100vh - 60px);
}
.hero-left{max-width:560px;}
.eyebrow{
  font-family:'DM Mono',monospace;font-size:.68rem;font-weight:500;
  letter-spacing:.18em;color:var(--green);text-transform:uppercase;
  margin-bottom:1.1rem;
  opacity:0;animation:fadeUp .6s ease forwards .1s;
}
.hero-title{
  font-family:'Playfair Display',serif;font-weight:800;
  font-size:clamp(2.4rem,4.5vw,3.8rem);
  line-height:1.1;letter-spacing:-.02em;
  margin-bottom:1.4rem;
  opacity:0;animation:fadeUp .6s ease forwards .2s;
}
.hero-body{
  font-size:clamp(.9rem,1.4vw,1rem);color:var(--text-muted);line-height:1.8;
  max-width:440px;margin-bottom:2rem;
  opacity:0;animation:fadeUp .6s ease forwards .32s;
}
.hero-ctas{
  display:flex;align-items:center;gap:1.25rem;margin-bottom:2.25rem;flex-wrap:wrap;
  opacity:0;animation:fadeUp .6s ease forwards .44s;
}
.btn-hero{
  background:var(--green);color:var(--white);border:none;border-radius:8px;
  padding:.8rem 1.65rem;font-family:'DM Sans',sans-serif;font-size:.92rem;font-weight:500;
  cursor:pointer;transition:background .2s,transform .15s,box-shadow .2s;
}
.btn-hero:hover{background:var(--green-dark);transform:translateY(-2px);box-shadow:0 8px 22px rgba(45,106,79,.28);}
.link-sec{
  font-size:.9rem;color:var(--text);text-decoration:none;
  display:inline-flex;align-items:center;gap:.35rem;transition:color .2s;
}
.link-sec:hover{color:var(--green);}
.link-sec::after{content:'→';transition:transform .2s;}
.link-sec:hover::after{transform:translateX(4px);}
.stats-row{
  display:flex;align-items:center;margin-bottom:1rem;
  opacity:0;animation:fadeUp .6s ease forwards .54s;
}
.stat-item{font-family:'DM Mono',monospace;font-size:.75rem;color:var(--text-muted);}
.stat-div{width:1px;height:13px;background:var(--text-muted);opacity:.35;margin:0 1rem;}
.trust{
  font-size:.82rem;color:var(--text-muted);
  opacity:0;animation:fadeUp .6s ease forwards .64s;
}
.trust strong{color:var(--text);font-weight:600;}

/* ─── BROWSER MOCK ─── */
.hero-right{
  display:flex;justify-content:center;align-items:center;
  opacity:0;animation:fadeIn .9s ease forwards .35s;
}
.carousel-wrap{position:relative;width:100%;max-width:520px;}
.arr-btn{
  position:absolute;top:50%;transform:translateY(-50%);
  width:32px;height:32px;border-radius:50%;
  background:var(--white);border:1px solid var(--border);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:.95rem;color:var(--text-muted);
  box-shadow:0 2px 8px rgba(0,0,0,.08);
  transition:box-shadow .2s,color .2s;z-index:10;
}
.arr-btn:hover{box-shadow:0 4px 14px rgba(0,0,0,.12);color:var(--green);}
.arr-btn.left{left:-16px;}
.arr-btn.right{right:-16px;}
.browser{
  background:var(--white);border-radius:14px;
  box-shadow:0 24px 60px rgba(0,0,0,.11),0 6px 18px rgba(0,0,0,.06);
  border:1px solid var(--border);overflow:hidden;width:100%;
}
.browser-bar{
  background:#f4f2ee;padding:.7rem 1rem;
  display:flex;align-items:center;gap:.7rem;
  border-bottom:1px solid var(--border);
}
.dots{display:flex;gap:6px;}
.dot{width:11px;height:11px;border-radius:50%;}
.dot-r{background:#FF5F57;}.dot-y{background:#FFBD2E;}.dot-g{background:#28C840;}
.url-bar{
  flex:1;background:var(--white);border:1px solid var(--border);
  border-radius:6px;padding:.28rem .7rem;
  font-family:'DM Mono',monospace;font-size:.7rem;color:var(--text-muted);text-align:center;
}
.dash-body{padding:1.1rem;}
.metric-cards{display:grid;grid-template-columns:1.15fr 1fr 1fr;gap:.65rem;margin-bottom:1.1rem;}
.mc{
  border:1.5px solid var(--border);border-radius:10px;padding:.8rem .9rem;
  transition:border-color .2s,box-shadow .2s;cursor:default;
}
.mc:hover{border-color:var(--green-light);box-shadow:0 4px 12px rgba(45,106,79,.07);}
.mc.active{background:#f2f8f5;border-color:var(--green);}
.mc-lbl{font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:.35rem;}
.mc-val{font-family:'Playfair Display',serif;font-size:1.28rem;font-weight:700;line-height:1.1;margin-bottom:.3rem;}
.mc-val.red{color:var(--red);}
.mc-sub{font-size:.7rem;color:var(--text-muted);}
.badge{display:inline-flex;align-items:center;gap:3px;background:var(--green-pale);color:var(--green-dark);border-radius:4px;padding:2px 6px;font-size:.68rem;font-weight:600;}
.chart-box{border:1.5px solid var(--border);border-radius:10px;padding:.9rem;margin-bottom:.9rem;}
.chart-lbl{font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:.65rem;}
.chart-wrap{position:relative;height:105px;}
.x-labels{display:flex;justify-content:space-between;margin-top:.35rem;padding:0 2px;}
.x-labels span{font-family:'DM Mono',monospace;font-size:.6rem;color:var(--text-muted);}
.carousel-footer{display:flex;align-items:center;justify-content:center;gap:.5rem;padding-top:.1rem;}
.cdot{width:8px;height:8px;border-radius:50%;background:#ccc;border:none;cursor:pointer;transition:background .2s,width .25s,border-radius .25s;}
.cdot.active{background:var(--green);width:22px;border-radius:4px;}
.c-label{font-size:.78rem;color:var(--text-muted);margin-left:.4rem;}

/* ─── HOW IT WORKS ─── */
.hiw{
  padding:clamp(3.5rem,7vh,5.5rem) clamp(1.25rem,5vw,4rem);
  max-width:1200px;margin:0 auto;text-align:center;
}
.section-eyebrow{
  font-family:'DM Mono',monospace;font-size:.68rem;font-weight:500;
  letter-spacing:.18em;color:var(--green);text-transform:uppercase;margin-bottom:1rem;
}
.section-title{
  font-family:'Playfair Display',serif;font-weight:800;
  font-size:clamp(1.85rem,4vw,2.8rem);
  line-height:1.15;margin-bottom:3rem;
}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;}
.step{display:flex;flex-direction:column;align-items:center;text-align:center;}
.step-icon{
  width:72px;height:72px;border-radius:50%;
  background:var(--green-icon-bg);
  display:flex;align-items:center;justify-content:center;
  margin-bottom:1.1rem;
}
.step-icon svg{width:28px;height:28px;stroke:var(--green);stroke-width:1.6;fill:none;stroke-linecap:round;stroke-linejoin:round;}
.step-num{font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.15em;text-transform:uppercase;color:var(--green);margin-bottom:.5rem;}
.step-name{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;margin-bottom:.6rem;}
.step-desc{font-size:.875rem;color:var(--text-muted);line-height:1.7;max-width:240px;}

/* ─── FEATURES ─── */
.features-section{background:var(--cream-section);padding:clamp(3.5rem,7vh,5.5rem) clamp(1.25rem,5vw,4rem);}
.features-inner{max-width:1200px;margin:0 auto;text-align:center;}
.features-sub{font-size:clamp(.875rem,1.3vw,.975rem);color:var(--text-muted);line-height:1.75;max-width:560px;margin:0 auto 3rem;}
.feature-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
.feat-card{
  background:var(--white);border-radius:12px;
  padding:1.5rem 1.35rem;text-align:left;
  border:1px solid transparent;
  transition:border-color .2s,box-shadow .2s,transform .2s;
}
.feat-card:hover{border-color:var(--green-light);box-shadow:0 6px 20px rgba(45,106,79,.09);transform:translateY(-3px);}
.feat-icon{
  width:44px;height:44px;border-radius:8px;
  background:var(--green-icon-bg);
  display:flex;align-items:center;justify-content:center;
  margin-bottom:1.1rem;
}
.feat-icon svg{width:22px;height:22px;stroke:var(--green);stroke-width:1.6;fill:none;stroke-linecap:round;stroke-linejoin:round;}
.feat-title{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;margin-bottom:.6rem;}
.feat-desc{font-size:.82rem;color:var(--text-muted);line-height:1.7;}

/* ─── ANIMATIONS ─── */
@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;transform:scale(.97);}to{opacity:1;transform:scale(1);}}

/* ─── FAQ ─── */
.faq-section{background:var(--cream);padding:clamp(3.5rem,7vh,5.5rem) clamp(1.25rem,5vw,4rem);border-top:1px solid var(--border);}
.faq-inner{max-width:780px;margin:0 auto;text-align:center;}
.faq-list{text-align:left;margin-top:0;}
.faq-item{background:var(--white);border:1px solid var(--border);border-radius:10px;margin-bottom:.6rem;overflow:hidden;transition:box-shadow .2s;}
.faq-item:hover{box-shadow:0 3px 12px rgba(0,0,0,.06);}
.faq-item.open{border-color:var(--green);}
.faq-q{
  width:100%;background:none;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:space-between;
  padding:1.1rem 1.3rem;
  font-family:'DM Sans',sans-serif;font-size:.95rem;font-weight:500;
  color:var(--text);text-align:left;gap:1rem;
}
.faq-icon{width:18px;height:18px;flex-shrink:0;color:var(--text-muted);transition:transform .3s,color .2s;}
.faq-item.open .faq-icon{transform:rotate(180deg);color:var(--green);}
.faq-a{
  max-height:0;overflow:hidden;
  transition:max-height .35s ease,padding .3s ease;
  padding:0 1.3rem;
}
.faq-a p{font-size:.875rem;color:var(--text-muted);line-height:1.75;padding-bottom:1.1rem;}
.faq-item.open .faq-a{max-height:200px;padding-top:0;}

/* ─── CTA ─── */
.cta-section{
  background:var(--cream-section);
  padding:clamp(3.5rem,7vh,5.5rem) 1.25rem;
  text-align:center;
  border-top:1px solid var(--border);
}
.cta-title{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,4vw,2.8rem);font-weight:800;line-height:1.15;margin-bottom:.9rem;}
.cta-sub{font-size:.95rem;color:var(--text-muted);margin-bottom:1.75rem;}
.btn-cta{
  background:var(--green);color:var(--white);border:none;border-radius:8px;
  padding:.9rem 2.2rem;font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:500;
  cursor:pointer;transition:background .2s,transform .15s,box-shadow .2s;
  display:inline-block;
}
.btn-cta:hover{background:var(--green-dark);transform:translateY(-2px);box-shadow:0 8px 22px rgba(45,106,79,.28);}
.cta-fine{margin-top:.9rem;font-family:'DM Mono',monospace;font-size:.72rem;color:var(--text-muted);letter-spacing:.03em;}

/* ─── FOOTER ─── */
.site-footer{
  background:var(--cream);
  border-top:1px solid var(--border);
  padding:1.4rem clamp(1.25rem,5vw,4rem);
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:1rem;
}
.footer-left{display:flex;align-items:center;gap:.75rem;}
.footer-tagline{font-size:.8rem;color:var(--text-muted);}
.footer-right{display:flex;align-items:center;flex-wrap:wrap;gap:1.25rem;}
.footer-right a{text-decoration:none;font-size:.8rem;color:var(--text-muted);transition:color .2s;}
.footer-right a:hover{color:var(--green);}
.footer-copy{font-size:.78rem;color:var(--text-muted);}

/* ─── RESPONSIVE ─── */
@media(max-width:1000px){
  .feature-grid{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:860px){
  .hero{grid-template-columns:1fr;min-height:auto;padding-top:2.5rem;}
  .hero-left{max-width:100%;}
  .hero-right{order:-1;}
  .carousel-wrap{max-width:100%;}
  .nav-links,.nav-right{display:none;}
  .hamburger{display:flex;}
  .steps{grid-template-columns:1fr;}
  .steps .step{flex-direction:row;text-align:left;gap:1.25rem;}
  .step-icon{flex-shrink:0;}
  .step-desc{max-width:100%;}
}
@media(max-width:540px){
  .metric-cards{grid-template-columns:1fr 1fr;}
  .metric-cards .mc:first-child{grid-column:1/-1;}
  .feature-grid{grid-template-columns:1fr;}
  .stats-row{flex-wrap:wrap;gap:.4rem;}
  .stat-div{display:none;}
  .stat-item{background:var(--cream-dark);padding:.28rem .65rem;border-radius:999px;}
}
</style>
<link rel="stylesheet" href="css/style.css"/>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="logo">FinStud<span>.</span></div>
  <ul class="nav-links">
    <li><a href="#hiw">How It Works</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#"><span class="nav-star">★</span> Reviews</a></li>
    <li><a href="#">Pricing</a></li>
    <li><a href="#">Privacy</a></li>
  </ul>
  <div class="nav-right">
    <button class="btn-ghost">Sign in</button>
    <a href="pages/signup.html" class="btn-primary" style="text-decoration:none;">Get Started Free</a>
  </div>
  <button class="hamburger" id="ham"><span></span><span></span><span></span></button>
</nav>
<div class="mobile-menu" id="mob">
  <a href="#hiw">How It Works</a>
  <a href="#features">Features</a>
  <a href="#">⭐ Reviews</a>
  <a href="#">Pricing</a>
  <a href="#">Privacy</a>
  <button class="btn-ghost" style="text-align:left">Sign in</button>
  <a href="pages/signup.html" class="btn-primary" style="text-decoration:none;">Get Started Free</a>
</div>

<!-- ═══ HERO ═══ -->
<section class="hero">
  <div class="hero-left">
    <p class="eyebrow">Built for Indian Investors</p>
    <h1 class="hero-title">Know your true<br>wealth at a glance.</h1>
    <p class="hero-body">Track net worth, income, expenses, and financial goals across 20+ asset classes. No broker credentials. No third-party tracking. Just you and your data.</p>
    <div class="hero-ctas">
      <a href="pages/signup.html" class="btn-hero" style="display:inline-block;text-decoration:none;">Get Started Free</a>
      <a href="#hiw" class="link-sec">See how it works</a>
    </div>
    <div class="stats-row">
      <span class="stat-item">170+ currencies</span>
      <div class="stat-div"></div>
      <span class="stat-item">20+ asset classes</span>
      <div class="stat-div"></div>
      <span class="stat-item">100% private</span>
    </div>

  </div>

  <div class="hero-right">
    <div class="carousel-wrap">
      <button class="arr-btn left" id="prevBtn">&#8249;</button>
      <div class="browser">
        <div class="browser-bar">
          <div class="dots"><div class="dot dot-r"></div><div class="dot dot-y"></div><div class="dot dot-g"></div></div>
          <div class="url-bar">finstud.app/dashboard</div>
        </div>
        <div class="dash-body">
          <div class="metric-cards">
            <div class="mc active">
              <div class="mc-lbl">Net Worth</div>
              <div class="mc-val">₹2.08 Cr</div>
              <div class="mc-sub"><span class="badge">▲ 18.2%</span></div>
            </div>
            <div class="mc">
              <div class="mc-lbl">Total Assets</div>
              <div class="mc-val">₹2.34 Cr</div>
              <div class="mc-sub">67 assets</div>
            </div>
            <div class="mc">
              <div class="mc-lbl">Liabilities</div>
              <div class="mc-val red">₹26.4L</div>
              <div class="mc-sub">3 active loans</div>
            </div>
          </div>
          <div class="chart-box">
            <div class="chart-lbl">Net Worth Over Time</div>
            <div class="chart-wrap"><canvas id="nwChart"></canvas></div>
            <div class="x-labels">
              <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
              <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span>
            </div>
          </div>
          <div class="carousel-footer">
            <button class="cdot active" onclick="setSlide(0)"></button>
            <button class="cdot" onclick="setSlide(1)"></button>
            <button class="cdot" onclick="setSlide(2)"></button>
            <button class="cdot" onclick="setSlide(3)"></button>
            <span class="c-label">Net Worth Dashboard</span>
          </div>
        </div>
      </div>
      <button class="arr-btn right" id="nextBtn">&#8250;</button>
    </div>
  </div>
</section>

<!-- ═══ HOW IT WORKS ═══ -->
<div style="background:var(--cream);border-top:1px solid var(--border);">
<section class="hiw" id="hiw">
  <p class="section-eyebrow">Simple as 1-2-3</p>
  <h2 class="section-title">Get your net worth in under 5 minutes</h2>
  <div class="steps">
    <div class="step">
      <div class="step-icon">
        <!-- person-add icon -->
        <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
      </div>
      <div>
        <p class="step-num">Step 1</p>
        <h3 class="step-name">Sign up in 10 seconds</h3>
        <p class="step-desc">One-click Google sign-in. Fill in a quick profile and you're in.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-icon">
        <!-- plus-circle icon -->
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
      </div>
      <div>
        <p class="step-num">Step 2</p>
        <h3 class="step-name">Add your assets</h3>
        <p class="step-desc">Enter manually, use CSV/Excel templates, or import directly from Zerodha or Groww.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-icon">
        <!-- eye icon -->
        <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      </div>
      <div>
        <p class="step-num">Step 3</p>
        <h3 class="step-name">See your complete picture</h3>
        <p class="step-desc">Dashboard shows net worth, income vs expenses, allocation breakdown, goal progress, and essentials health.</p>
      </div>
    </div>
  </div>
</section>
</div>

<!-- ═══ FEATURES ═══ -->
<section class="features-section" id="features">
  <div class="features-inner">
    <p class="section-eyebrow">Everything You Need</p>
    <h2 class="section-title">Built for how Indians actually invest</h2>
    <p class="features-sub">From EPF to equity, SIPs to SGBs, income to expenses. FinStud understands Indian finances so you see the full picture.</p>
    <div class="feature-grid">

      <div class="feat-card">
        <div class="feat-icon">
          <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="17" x2="8" y2="13"/><line x1="12" y1="17" x2="12" y2="9"/><line x1="16" y1="17" x2="16" y2="11"/></svg>
        </div>
        <h3 class="feat-title">20+ Indian Asset Classes</h3>
        <p class="feat-desc">Your ₹50L flat, ₹3L PPF, ₹80K crypto, and ELSS SIPs — all in one dashboard. Covers EPF, NPS, SSY, SGBs, ULIPs, and more.</p>
      </div>

      <div class="feat-card">
        <div class="feat-icon">
          <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
        </div>
        <h3 class="feat-title">Income & Expense Tracking</h3>
        <p class="feat-desc">Log your salary, freelance income, rent, groceries, and EMIs. See monthly trends, category breakdowns, and savings rate at a glance.</p>
      </div>

      <div class="feat-card">
        <div class="feat-icon">
          <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
        </div>
        <h3 class="feat-title">Import from Zerodha & Groww</h3>
        <p class="feat-desc">Upload your Zerodha Console or Groww portfolio export. Stocks and mutual funds are auto-categorized in seconds.</p>
      </div>

      <div class="feat-card">
        <div class="feat-icon">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
        <h3 class="feat-title">Financial Essentials Check</h3>
        <p class="feat-desc">Know if you have enough term insurance, health cover, and emergency fund. Personalized recommendations based on your profile.</p>
      </div>

      <div class="feat-card">
        <div class="feat-icon">
          <svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </div>
        <h3 class="feat-title">Net Worth Snapshots</h3>
        <p class="feat-desc">Freeze your financial state at any moment. Compare month-over-month with full line-item detail and growth charts.</p>
      </div>

      <div class="feat-card">
        <div class="feat-icon">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </div>
        <h3 class="feat-title">Multi-Currency Support</h3>
        <p class="feat-desc">Track US stocks in USD, Singapore savings in SGD, and Indian assets in INR. Live FX rates across 170+ currencies.</p>
      </div>

      <div class="feat-card">
        <div class="feat-icon">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/></svg>
        </div>
        <h3 class="feat-title">Goal-Based Tracking</h3>
        <p class="feat-desc">Set goals like retirement corpus or child's education. Link specific assets and track real progress with an inflation calculator.</p>
      </div>

      <div class="feat-card">
        <div class="feat-icon">
          <svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        </div>
        <h3 class="feat-title">Growth Over Time</h3>
        <p class="feat-desc">See how your net worth, asset allocation, and liabilities change over months and years with visual charts and trend data.</p>
      </div>

    </div>
  </div>
</section>

<!-- ═══ FAQ ═══ -->
<section class="faq-section" id="faq">
  <div class="faq-inner">
    <p class="section-eyebrow">Common Questions</p>
    <h2 class="section-title" style="margin-bottom:2.5rem;">Frequently asked questions</h2>
    <div class="faq-list">

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          <span>Is my financial data secure?</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-a">
          <p>Yes. All your data is encrypted at rest and in transit using AES-256 and TLS 1.3. We never share your data with third parties, brokers, or advertisers. You own your data completely.</p>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          <span>Do you connect to my bank or brokerage?</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-a">
          <p>No. FinStud does not connect to your bank or brokerage accounts and does not require any credentials. You enter data manually or import via CSV/Excel exports from Zerodha or Groww.</p>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          <span>Can I track international assets?</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-a">
          <p>Absolutely. FinStud supports 170+ currencies with live FX rates. Track US stocks in USD, Singapore savings in SGD, or any other international asset alongside your Indian portfolio.</p>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          <span>What happens when my Pro trial ends?</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-a">
          <p>You'll be moved to the free plan automatically — no charges, no surprises. All your data stays intact. The free plan supports up to 25 assets and is free forever.</p>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          <span>Can I export all my data?</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-a">
          <p>Yes, anytime. Go to Settings and export everything (assets, liabilities, snapshots, goals) as CSV or JSON. Your data is always yours.</p>
        </div>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          <span>Is there a mobile app?</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-a">
          <p>FinStud is a responsive web app that works great on mobile browsers. Add it to your home screen for an app-like experience. A native app is on the roadmap.</p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ═══ CTA ═══ -->
<section class="cta-section">
  <h2 class="cta-title">Start tracking your wealth today</h2>
  <p class="cta-sub">Free forever for up to 25 assets. No credit card required.</p>
  <a href="pages/signup.html" class="btn-cta" style="display:inline-block;text-decoration:none;">Get Started for Free</a>
  <p class="cta-fine">Takes less than 10 seconds to sign up.</p>
</section>

<!-- ═══ FOOTER ═══ -->
<footer class="site-footer">
  <div class="footer-left">
    <span class="logo" style="font-size:1rem;">FinStud<span>.</span></span>
    <span class="footer-tagline">Privacy-first net worth tracking</span>
  </div>
  <div class="footer-right">
    <a href="#">Support</a>
    <a href="#">Privacy Policy</a>
    <a href="#">Terms of Service</a>
    <a href="#">Refund Policy</a>
    <span class="footer-copy">© 2026 FinStud · Made in India</span>
  </div>
</footer>

<script>
// faq handled by main.js

// nav handled by main.js

// Chart
const ctx = document.getElementById('nwChart').getContext('2d');
const labels = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb'];
const data = [118,125,132,145,141,155,162,178,208];
const gradient = ctx.createLinearGradient(0,0,0,110);
gradient.addColorStop(0,'rgba(45,106,79,0.18)');
gradient.addColorStop(1,'rgba(45,106,79,0.0)');

new Chart(ctx,{
  type:'line',
  data:{
    labels,
    datasets:[{
      data,
      borderColor:'#2D6A4F',
      borderWidth:2.2,
      pointRadius:3.5,
      pointBackgroundColor:'#2D6A4F',
      pointBorderColor:'#fff',
      pointBorderWidth:1.5,
      fill:true,
      backgroundColor:gradient,
      tension:0.4
    }]
  },
  options:{
    responsive:true,
    maintainAspectRatio:false,
    plugins:{legend:{display:false},tooltip:{
      callbacks:{label:c=>'₹'+c.raw+'L'},
      backgroundColor:'#1B4332',
      titleFont:{family:"'DM Sans',sans-serif",size:11},
      bodyFont:{family:"'DM Mono',monospace",size:11},
      padding:8,cornerRadius:6
    }},
    scales:{
      x:{display:false},
      y:{display:false,min:100,max:220}
    }
  }
});

// Carousel dots
let slide=0;
const dots=document.querySelectorAll('.cdot');
const label=document.querySelector('.c-label');
const slideLabels=['Net Worth Dashboard','Asset Allocation','Income vs Expenses','Goal Tracker'];
function setSlide(n){
  slide=n;
  dots.forEach((d,i)=>d.classList.toggle('active',i===n));
  label.textContent=slideLabels[n];
}
document.getElementById('nextBtn').addEventListener('click',()=>setSlide((slide+1)%4));
document.getElementById('prevBtn').addEventListener('click',()=>setSlide((slide+3)%4));
</script>
<script src="js/main.js"></script>
</body>
</html>
