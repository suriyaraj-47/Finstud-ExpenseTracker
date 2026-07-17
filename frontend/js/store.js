/* ═══════════════════════════════════════════════
   FinStud — API Client Store
   All data is now persisted in MySQL via the backend.
   JWT token is kept in localStorage for session persistence.
   ═══════════════════════════════════════════════ */

const API = 'http://localhost:5000/api';

const Store = {

  // ── Token Management ──────────────────────────
  getToken()        { return localStorage.getItem('fs_token'); },
  setToken(t)       { localStorage.setItem('fs_token', t); },
  clearToken()      { localStorage.removeItem('fs_token'); localStorage.removeItem('fs_user'); },
  isLoggedIn()      { return !!this.getToken(); },

  // ── Cached user (avoid re-fetching on every page) ──
  getCachedUser()   {
    try { return JSON.parse(localStorage.getItem('fs_user')) || {}; } catch { return {}; }
  },
  setCachedUser(u)  { localStorage.setItem('fs_user', JSON.stringify(u)); },

  // ── Core fetch wrapper ─────────────────────────
  async _fetch(method, endpoint, body = null) {
    const headers = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;

    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(API + endpoint, opts);
    const data = await res.json();

    // Auto sign-out if token expired
    if (res.status === 401 && window.location.pathname !== '/pages/signup.html') {
      this.clearToken();
      window.location.href = '/pages/signup.html';
      return;
    }

    if (!res.ok) throw new Error(data.error || data.errors?.[0]?.msg || 'Request failed');
    return data;
  },

  // ── Auth ──────────────────────────────────────
  async register(name, email, password) {
    const data = await this._fetch('POST', '/auth/register', { name, email, password });
    return data;
  },

  async login(email, password) {
    const data = await this._fetch('POST', '/auth/login', { email, password });
    this.setToken(data.token);
    this.setCachedUser(data.user);
    return data;
  },

  async googleLogin(credential) {
    const data = await this._fetch('POST', '/auth/google', { credential });
    this.setToken(data.token);
    this.setCachedUser(data.user);
    return data;
  },

  async getMe() {
    const data = await this._fetch('GET', '/auth/me');
    this.setCachedUser(data.user);
    return data.user;
  },

  async resendVerification() {
    return this._fetch('POST', '/auth/resend-verification');
  },

  async forgotPassword(email) {
    return this._fetch('POST', '/auth/forgot-password', { email });
  },

  async resetPassword(token, password) {
    return this._fetch('POST', '/auth/reset-password', { token, password });
  },

  async updateProfile(name) {
    const data = await this._fetch('PATCH', '/auth/update-profile', { name });
    const user = this.getCachedUser();
    this.setCachedUser({ ...user, name });
    return data;
  },

  async changePassword(currentPassword, newPassword) {
    return this._fetch('POST', '/auth/change-password', { currentPassword, newPassword });
  },

  async deleteAccount(password) {
    const data = await this._fetch('DELETE', '/auth/delete-account', { password });
    this.clearToken();
    return data;
  },

  signOut() {
    this.clearToken();
    window.location.href = '/pages/signup.html';
  },

  // ── Financial Profile ─────────────────────────
  async getProfile() {
    const data = await this._fetch('GET', '/profile');
    return data.profile;
  },

  async saveProfile(profile) {
    return this._fetch('PUT', '/profile', profile);
  },

  // ── Assets ────────────────────────────────────
  async getAssets() {
    const data = await this._fetch('GET', '/assets');
    return data.assets;
  },

  async addAsset(asset) {
    return this._fetch('POST', '/assets', asset);
  },

  async updateAsset(id, fields) {
    return this._fetch('PATCH', `/assets/${id}`, fields);
  },

  async deleteAsset(id) {
    return this._fetch('DELETE', `/assets/${id}`);
  },

  // ── Liabilities ─────────────────────────────────
  async getLiabilities() {
    const data = await this._fetch('GET', '/liabilities');
    return data.liabilities;
  },

  async addLiability(liability) {
    return this._fetch('POST', '/liabilities', liability);
  },

  async updateLiability(id, fields) {
    return this._fetch('PATCH', `/liabilities/${id}`, fields);
  },

  async deleteLiability(id) {
    return this._fetch('DELETE', `/liabilities/${id}`);
  },

  // ── Income ────────────────────────────────────
  async getIncome(month, year) {
    const q = month && year ? `?month=${month}&year=${year}` : '';
    const data = await this._fetch('GET', '/money/income' + q);
    return data.income;
  },

  async addIncome(entry) {
    return this._fetch('POST', '/money/income', entry);
  },

  async addIncomeBulk(entries) {
    return this._fetch('POST', '/money/income/bulk', { entries });
  },

  async deleteIncome(id) {
    return this._fetch('DELETE', `/money/income/${id}`);
  },

  // ── Expenses ──────────────────────────────────
  async getExpenses(month, year) {
    const q = month && year ? `?month=${month}&year=${year}` : '';
    const data = await this._fetch('GET', '/money/expenses' + q);
    return data.expenses;
  },

  async addExpense(entry) {
    return this._fetch('POST', '/money/expenses', entry);
  },

  async addExpensesBulk(entries) {
    return this._fetch('POST', '/money/expenses/bulk', { entries });
  },

  async deleteExpense(id) {
    return this._fetch('DELETE', `/money/expenses/${id}`);
  },

  // ── Goals ─────────────────────────────────────
  async getGoals() {
    const data = await this._fetch('GET', '/goals');
    return data.goals;
  },

  async addGoal(goal) {
    return this._fetch('POST', '/goals', goal);
  },

  async updateGoal(id, fields) {
    return this._fetch('PATCH', `/goals/${id}`, fields);
  },

  async deleteGoal(id) {
    return this._fetch('DELETE', `/goals/${id}`);
  },

  // ── Snapshots ─────────────────────────────────
  async getSnapshots() {
    const data = await this._fetch('GET', '/snapshots');
    return data.snapshots;
  },

  async addSnapshot(snapshot) {
    return this._fetch('POST', '/snapshots', snapshot);
  },

  // ── Data ──────────────────────────────────────
  async exportData() {
    // Fetch as blob for file download
    const token = this.getToken();
    const res = await fetch(`${API}/data/export`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'finstud-export.json'; a.click();
    URL.revokeObjectURL(url);
  },

  async resetAllData(password) {
    return this._fetch('DELETE', '/data/reset', { password });
  },

  // ── UI Helpers ────────────────────────────────
  formatINR(num) {
    if (!num && num !== 0) return '—';
    num = parseFloat(num);
    if (num >= 10000000) return '₹' + (num/10000000).toFixed(2) + ' Cr';
    if (num >= 100000)   return '₹' + (num/100000).toFixed(2)   + 'L';
    if (num >= 1000)     return '₹' + num.toLocaleString('en-IN');
    return '₹' + num;
  },

  parseINR(str) {
    if (!str) return 0;
    return parseFloat(String(str).replace(/[^0-9.]/g, '')) || 0;
  },

  initials(name) {
    return name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'U';
  },

  // ── Feedbacks & Modal Logic ───────────────────
  async submitFeedback(data) {
    return this._fetch('POST', '/feedbacks', data);
  },
  
  async getFeedbacks() {
    return this._fetch('GET', '/feedbacks');
  },

  openFeedbackModal() {
    let modal = document.getElementById('feedbackModalBg');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'feedbackModalBg';
      modal.className = 'modal-bg';
      document.body.appendChild(modal);
    }
    
    // Default state
    window._fbState = { tab: 'submit', type: 'Feature Request', text: '' };
    
    this.renderFeedbackContent();
    modal.classList.add('show');
  },

  closeFeedbackModal() {
    const modal = document.getElementById('feedbackModalBg');
    if (modal) modal.classList.remove('show');
  },

  async renderFeedbackContent() {
    const modal = document.getElementById('feedbackModalBg');
    if (!modal) return;
    
    // Icons
    const ICONS = {
      bug: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"/></svg>`,
      bulb: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
      chat: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>`
    };

    let contentHtml = '';
    
    if (window._fbState.tab === 'submit') {
      contentHtml = `
        <div class="fb-types">
          <div class="fb-type-btn ${window._fbState.type==='Bug Report'?'active':''}" onclick="Store._updateFbType('Bug Report')">
            ${ICONS.bug}Bug Report
          </div>
          <div class="fb-type-btn ${window._fbState.type==='Feature Request'?'active':''}" onclick="Store._updateFbType('Feature Request')">
            ${ICONS.bulb}Feature Request
          </div>
          <div class="fb-type-btn ${window._fbState.type==='Other'?'active':''}" onclick="Store._updateFbType('Other')">
            ${ICONS.chat}Other
          </div>
        </div>
        <div class="fb-textarea-wrap">
          <textarea class="fb-textarea" id="fbText" placeholder="What would you like to see?" oninput="Store._updateFbText(this.value)">${window._fbState.text}</textarea>
          <div class="fb-char-count" id="fbCount">${window._fbState.text.length}/2000</div>
        </div>
        <div class="fb-footer">
          <button class="fb-attach-btn" onclick="alert('File attachment is currently mocked.')" title="Attach screenshot or file">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            Attach screenshot or file
          </button>
          <div class="fb-actions">
            <button class="fb-btn-cancel" onclick="Store.closeFeedbackModal()">Cancel</button>
            <button class="fb-btn-send" onclick="Store._submitFeedbackAction()">Send Feedback</button>
          </div>
        </div>
      `;
    } else {
      contentHtml = `<div class="fb-history-list" id="fbHistoryList"><div style="text-align:center;padding:2rem;color:#888;">Loading history...</div></div>`;
      // Load history
      this.getFeedbacks().then(data => {
        const el = document.getElementById('fbHistoryList');
        if (!el) return;
        if (!data.feedbacks || data.feedbacks.length === 0) {
          el.innerHTML = `<div style="text-align:center;padding:2rem;color:#888;">You haven't submitted any feedback yet.</div>`;
          return;
        }
        el.innerHTML = data.feedbacks.map(f => {
          const dt = new Date(f.created_at).toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'});
          return `
            <div class="fb-history-item">
              <div class="fb-history-header">
                <span class="fb-history-type">${f.type}</span>
                <span>${dt}</span>
              </div>
              <div class="fb-history-body">${f.message}</div>
            </div>
          `;
        }).join('');
      }).catch(e => {
        const el = document.getElementById('fbHistoryList');
        if(el) el.innerHTML = `<div style="text-align:center;padding:2rem;color:red;">Failed to load history.<br>${e.message}</div>`;
      });
    }

    modal.innerHTML = `
      <div class="modal" style="max-width:550px;">
        <div class="fb-modal-title">
          Share Feedback
          <button class="fb-close-btn" onclick="Store.closeFeedbackModal()">×</button>
        </div>
        <div class="fb-tabs">
          <div class="fb-tab ${window._fbState.tab==='submit'?'active':''}" onclick="Store._setFbTab('submit')">Submit</div>
          <div class="fb-tab ${window._fbState.tab==='history'?'active':''}" onclick="Store._setFbTab('history')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> History
          </div>
        </div>
        ${contentHtml}
      </div>
    `;
  },

  _setFbTab(tab) {
    if(window._fbState.text) { window._fbState.text = document.getElementById('fbText')?.value || ''; }
    window._fbState.tab = tab;
    this.renderFeedbackContent();
  },
  _updateFbType(type) {
    window._fbState.text = document.getElementById('fbText')?.value || '';
    window._fbState.type = type;
    this.renderFeedbackContent();
  },
  _updateFbText(val) {
    window._fbState.text = val;
    document.getElementById('fbCount').textContent = val.length + '/2000';
  },
  async _submitFeedbackAction() {
    const text = document.getElementById('fbText')?.value || '';
    if (!text.trim()) return alert('Please enter your feedback.');
    const btn = document.querySelector('.fb-btn-send');
    if(btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
    try {
      await this.submitFeedback({ type: window._fbState.type, message: text });
      alert('Feedback submitted successfully. Thank you!');
      this.closeFeedbackModal();
    } catch(e) {
      alert(e.message);
      if(btn) { btn.disabled = false; btn.textContent = 'Send Feedback'; }
    }
  },

  // ── Auth Guard (call on every protected page) ──
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = '/pages/signup.html';
      return false;
    }
    return true;
  },
};
