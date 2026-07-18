
if(!Store.requireAuth()) throw new Error();
const user = Store.getCachedUser();
document.getElementById('userAvatar').textContent = Store.initials(user.name);
document.getElementById('userName').textContent   = user.name||'User';
document.getElementById('ddName').textContent     = user.name||'User';
document.getElementById('ddEmail').textContent    = user.email||'';

let currentTab='expenses', profileData={};
const today = new Date().toISOString().split('T')[0];
document.getElementById('e-date').value = today;

const CATS_EXP = ['🛒 Groceries','🏠 Rent','🚗 Transport','💊 Health','🎮 Entertainment','💡 Utilities','🎁 Other'];
const CATS_INC = ['💰 Salary','💼 Freelance','📈 Investment Return','🎁 Other'];

function fmtINR(el){ let r=el.value.replace(/[^0-9]/g,''); if(r) el.value=parseInt(r,10).toLocaleString('en-IN'); }

function switchTab(tab, el){ currentTab=tab; document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active')); el.classList.add('active'); render(); }
function setFilter(f,el){ document.querySelectorAll('.filter-row .pill').forEach(p=>{p.classList.remove('active');p.classList.add('inactive');}); el.classList.add('active');el.classList.remove('inactive'); render(); }

let isAddingMode = false;
let addRows = [];

async function render(){
  const header=document.getElementById('pageHeader');
  const area=document.getElementById('listArea');

  // Handle header
  if (currentTab === 'insights') {
    header.innerHTML=`<div><h1 class="page-title">Insights</h1></div>`;
  } else {
    const title = currentTab === 'expenses' ? 'Expenses' : 'Income';
    const toggleBtn = isAddingMode 
      ? `<button class="btn-text-cancel" onclick="toggleAddMode(false)"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Cancel</button>`
      : `<button class="btn-green" onclick="toggleAddMode(true)"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add ${title}</button>`;
      
    header.innerHTML=`
      <div><h1 class="page-title">${title}</h1><p class="page-count" id="entryCount">0 entries</p></div>
      <div class="header-actions">${toggleBtn}</div>
    `;
  }

  // Handle inline form mounting
  const oldForm = document.getElementById('inlineFormArea');
  if (oldForm) oldForm.remove();
  
  if (isAddingMode && currentTab !== 'insights') {
    const title = currentTab === 'expenses' ? 'Add Expenses' : 'Add Income';
    const wrapper = document.createElement('div');
    wrapper.id = 'inlineFormArea';
    wrapper.innerHTML = `
      <div class="inline-form-card">
        <div class="ifc-header">${title} <button class="ifc-close" onclick="toggleAddMode(false)">×</button></div>
        <div class="ifc-body">
          <div class="ifc-grid-header">
            <div>DATE</div><div>CATEGORY</div><div>DESCRIPTION</div><div>AMOUNT</div><div>CCY</div><div></div>
          </div>
          <div id="inlineRowsContainer">${renderInlineRows()}</div>
        </div>
        <div class="ifc-footer">
          <button class="ifc-add-row-btn" onclick="addNewRow()"><span>+</span> add row</button>
          <div class="ifc-submit-grp">
            <button class="btn-neutral" onclick="toggleAddMode(false)">Cancel</button>
            <button class="btn-save-modal" onclick="saveBulk()">Save</button>
          </div>
        </div>
      </div>
    `;
    // Insert just before filter row
    const filterRow = document.querySelector('.filter-row');
    filterRow.parentNode.insertBefore(wrapper, filterRow);
  }

  // Hide list if adding to focus on the form (optional according to mockup, but let's keep list below filters visible)

  // Insights
  if (currentTab === 'insights') {
    area.innerHTML='<div style="text-align:center;padding:2rem;color:var(--text-muted);">Loading…</div>';
    try {
      const [inc_data, exp_data] = await Promise.all([Store.getIncome(), Store.getExpenses()]);
      const inc=inc_data.reduce((s,i)=>s+parseFloat(i.amount),0);
      const exp=exp_data.reduce((s,e)=>s+parseFloat(e.amount),0);
      const rate=inc>0?Math.round(((inc-exp)/inc)*100):0;
      area.innerHTML=`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;"><div class="dash-card" style="text-align:center;"><div style="font-size:.7rem;color:var(--text-muted);margin-bottom:.4rem;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.08em;">Total Income</div><div style="font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:800;color:var(--green);">${Store.formatINR(inc)}</div></div><div class="dash-card" style="text-align:center;"><div style="font-size:.7rem;color:var(--text-muted);margin-bottom:.4rem;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.08em;">Total Expenses</div><div style="font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:800;color:var(--red);">${Store.formatINR(exp)}</div></div><div class="dash-card" style="text-align:center;"><div style="font-size:.7rem;color:var(--text-muted);margin-bottom:.4rem;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.08em;">Savings Rate</div><div style="font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:800;color:${rate>20?'var(--green)':'var(--red)'};">${rate}%</div></div></div>`;
    } catch(e){}
    return;
  }

  // Normal List Load
  area.innerHTML='<div style="text-align:center;padding:2rem;color:var(--text-muted);">Loading…</div>';
  try {
    const data = currentTab === 'expenses' ? await Store.getExpenses() : await Store.getIncome();
    const countEl = document.getElementById('entryCount');
    if(countEl) countEl.textContent = data.length+' entr'+(data.length===1?'y':'ies');
    
    if(!data.length){ 
      const emoji = currentTab === 'expenses' ? '💸' : '💰';
      const fallback = currentTab === 'expenses' ? 'No expenses recorded yet. Add your first entry above.' : 'No income recorded yet. Add your first entry above.';
      area.innerHTML=`<div class="empty-box"><div class="e-emoji">${emoji}</div><p style="color:#555;font-weight:500;">${fallback}</p></div>`; 
      return; 
    }
    
    // Check if adding mode, the mockup empty state had just white box
    if(isAddingMode && !data.length) {
      area.innerHTML = `<div style="background:#fff;border:1px solid var(--border);border-radius:8px;text-align:center;padding:3rem 1rem;color:#444;font-weight:500;box-shadow:0 1px 2px rgba(0,0,0,0.02)">No ${currentTab} recorded yet. Add your first entry above.</div>`;
      return;
    }

    area.innerHTML=`<div style="border:1px solid var(--border);border-radius:12px;overflow:hidden;background:var(--white);">`+data.map(e=>`<div class="expense-row"><div class="expense-cat">${e.category?e.category.split(' ')[0]:'💳'}</div><div class="expense-info"><div class="expense-name">${e.name}</div><div class="expense-date">${e.entry_date}</div></div><div><div class="expense-amt ${currentTab==='expenses'?'neg':'pos'}">${currentTab==='expenses'?'−':'+'}${Store.formatINR(e.amount)}</div><button onclick="removeEntry('${currentTab}',${e.id})" style="font-size:.68rem;color:var(--red);background:none;border:none;cursor:pointer;display:block;text-align:right;">Remove</button></div></div>`).join('')+`</div>`;
  } catch(e) { 
    area.innerHTML=`<p style="color:red;padding:1rem;">${e.message}</p>`; 
  }
}

function toggleAddMode(state) {
  isAddingMode = state;
  if(state) {
    const defaultCat = currentTab === 'expenses' ? CATS_EXP[1] : CATS_INC[0]; // Rent or Salary
    addRows = [{ date: new Date().toISOString().split('T')[0], category: defaultCat, name: '', amount: '' }];
  }
  render();
}

function addNewRow() {
  const defaultCat = currentTab === 'expenses' ? CATS_EXP[1] : CATS_INC[0];
  addRows.push({ date: new Date().toISOString().split('T')[0], category: defaultCat, name: '', amount: '' });
  document.getElementById('inlineRowsContainer').innerHTML = renderInlineRows();
}

function removeAddRow(idx) {
  addRows.splice(idx, 1);
  if(addRows.length === 0) return toggleAddMode(false);
  document.getElementById('inlineRowsContainer').innerHTML = renderInlineRows();
}

function updateRow(idx, field, val) {
  addRows[idx][field] = val;
}

function renderInlineRows() {
  const cats = currentTab === 'expenses' ? CATS_EXP : CATS_INC;
  return addRows.map((row, i) => `
    <div class="ifc-grid-row">
      <input type="date" class="ifc-input" value="${row.date}" onchange="updateRow(${i}, 'date', this.value)">
      <select class="ifc-select" onchange="updateRow(${i}, 'category', this.value)">
        ${cats.map(c => `<option ${row.category===c?'selected':''}>${c}</option>`).join('')}
      </select>
      <input type="text" class="ifc-input" placeholder="e.g. ${currentTab==='expenses'?'Rent':'Salary'}" value="${row.name}" oninput="updateRow(${i}, 'name', this.value)">
      <input type="text" class="ifc-input" style="text-align:right;" placeholder="0" value="${row.amount}" oninput="updateRow(${i}, 'amount', this.value); fmtINR(this)">
      <select class="ifc-select"><option>INR</option></select>
      <div class="ifc-actions">
        <button class="ifc-act-btn"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/></svg></button>
        <button class="ifc-act-btn" onclick="updateRow(${i}, 'amount', ''); updateRow(${i}, 'name', ''); document.getElementById('inlineRowsContainer').innerHTML = renderInlineRows();"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></button>
        <button class="ifc-act-btn del" onclick="removeAddRow(${i})"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
      </div>
    </div>
  `).join('');
}

async function saveBulk() {
  const invalid = addRows.some(r => !r.name.trim() || !Store.parseINR(r.amount));
  if (invalid) return alert('Please fill a description and amount for all rows.');
  
  const entries = addRows.map(r => ({
    name: r.name.trim(),
    amount: Store.parseINR(r.amount),
    category: r.category,
    entry_date: r.date
  }));

  try {
    if(currentTab === 'expenses') await Store.addExpensesBulk(entries);
    else await Store.addIncomeBulk(entries);
    toggleAddMode(false);
  } catch(e) {
    alert(e.message);
  }
}

async function removeEntry(type, id) {
  try {
    if(type==='income') await Store.deleteIncome(id);
    else await Store.deleteExpense(id);
    render();
  } catch(e){ alert(e.message); }
}

function toggleDropdown(e){ e.stopPropagation(); document.getElementById('userDropdown').classList.toggle('open'); }
document.addEventListener('click',()=>document.getElementById('userDropdown').classList.remove('open'));
function signOut(){ document.getElementById('signoutModal').classList.add('show'); }

render();
