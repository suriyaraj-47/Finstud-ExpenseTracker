/* ─────────────────────────────────────────
   FinStud — Shared JavaScript
   ───────────────────────────────────────── */

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const ham  = document.getElementById('ham');
  const mob  = document.getElementById('mob');
  if (ham && mob) {
    ham.addEventListener('click', () => mob.classList.toggle('open'));
  }
});

// FAQ accordion
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
