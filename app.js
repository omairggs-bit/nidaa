/* =========================================================
   نداء — Application Logic (Vanilla ES6, no dependencies)
   All data persists locally via localStorage. Nothing leaves the browser.
   ========================================================= */

(() => {
  'use strict';

  /* ---------------- Storage helpers ---------------- */
  const STORE = {
    theme: 'nidaa_theme',
    favorites: 'nidaa_favorites',
    history: 'nidaa_history',
  };

  const load = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  };
  const save = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage full/blocked */ }
  };

  /* ---------------- Models ---------------- */
  const MODELS = [
    { id: 'chatgpt',    label: 'ChatGPT',    mono: 'GPT' },
    { id: 'claude',     label: 'Claude',     mono: 'CL' },
    { id: 'gemini',     label: 'Gemini',     mono: 'GM' },
    { id: 'grok',       label: 'Grok',       mono: 'GK' },
    { id: 'copilot',    label: 'Copilot',    mono: 'CP' },
    { id: 'deepseek',   label: 'DeepSeek',   mono: 'DS' },
    { id: 'midjourney', label: 'Midjourney', mono: 'MJ' },
    { id: 'flux',       label: 'Flux',       mono: 'FX' },
    { id: 'veo',        label: 'Veo',        mono: 'VO' },
  ];

  const LEVEL_DESC = {
    basic:  'أمر مختصر ومباشر بدون تنسيقات إضافية.',
    pro:    'يضيف هيكلاً كاملاً: الدور، السياق، القيود، وصيغة الإخراج.',
    expert: 'هيكل خبير كامل مع أمثلة وتعليمات دقيقة خطوة بخطوة.',
  };

  /* ---------------- Template Library ---------------- */
  const TEMPLATES = [
    { id:'t1', icon:'✍️', title:'مقال مدونة SEO', tag:'كتابة', model:'chatgpt', uses:482, rating:4.8,
      desc:'مقال مدونة محسّن لمحركات البحث بعنوان جذاب وفقرات منظمة.',
      idea:'اكتب مقال مدونة عن فوائد شرب الماء بكمية كافية يوميًا، مع عنوان جذاب وفقرات فرعية.' },
    { id:'t2', icon:'💻', title:'مراجعة كود برمجي', tag:'برمجة', model:'claude', uses:611, rating:4.9,
      desc:'مراجعة شاملة للكود مع اقتراحات لتحسين الأداء وسلامة الأخطاء.',
      idea:'راجع الكود التالي وابحث عن الأخطاء المحتملة واقترح تحسينات على الأداء وقابلية القراءة.' },
    { id:'t3', icon:'🎨', title:'صورة منتج احترافية', tag:'تصميم', model:'midjourney', uses:355, rating:4.7,
      desc:'وصف بصري دقيق لإنتاج صورة منتج بإضاءة استوديو احترافية.',
      idea:'صورة منتج لعطر فاخر على منصة رخامية سوداء مع إضاءة استوديو ناعمة وخلفية داكنة، تصوير احترافي.' },
    { id:'t4', icon:'📊', title:'خطة تسويقية أسبوعية', tag:'تسويق', model:'gemini', uses:274, rating:4.6,
      desc:'خطة محتوى أسبوعية لمنصات التواصل الاجتماعي بجدول زمني واضح.',
      idea:'ضع خطة محتوى أسبوعية لحساب إنستغرام يبيع القهوة المختصة تتضمن أفكار منشورات ومواعيد نشر.' },
    { id:'t5', icon:'🔍', title:'بحث ومقارنة معمّقة', tag:'بحث', model:'chatgpt', uses:198, rating:4.5,
      desc:'تحليل مقارن منظم بين خيارات متعددة مع جدول ملخص.',
      idea:'قارن بين ثلاثة أنواع من البطاريات القابلة لإعادة الشحن من حيث العمر والتكلفة والأداء.' },
    { id:'t6', icon:'🌐', title:'ترجمة مع الحفاظ على النبرة', tag:'ترجمة', model:'claude', uses:410, rating:4.9,
      desc:'ترجمة دقيقة تحافظ على أسلوب النص الأصلي ونبرته.',
      idea:'ترجم النص التالي من الإنجليزية إلى العربية مع الحفاظ على النبرة الرسمية والمصطلحات التقنية.' },
    { id:'t7', icon:'📝', title:'تلخيص تقرير طويل', tag:'تلخيص', model:'deepseek', uses:322, rating:4.6,
      desc:'تلخيص نقاط تقرير طويل في نقاط رئيسية قابلة للمسح السريع.',
      idea:'لخّص التقرير التالي في خمس نقاط رئيسية مع الحفاظ على الأرقام والحقائق المهمة.' },
    { id:'t8', icon:'🎬', title:'مشهد فيديو قصير', tag:'فيديو', model:'veo', uses:150, rating:4.4,
      desc:'وصف مشهد سينمائي قصير لإنتاج فيديو بالذكاء الاصطناعي.',
      idea:'مشهد سينمائي: مدينة مستقبلية عند الغروب، طائرات صغيرة تحلق بين ناطحات السحاب، حركة كاميرا بطيئة.' },
    { id:'t9', icon:'🧩', title:'حل مشكلة برمجية', tag:'برمجة', model:'copilot', uses:267, rating:4.7,
      desc:'تشخيص خطأ برمجي واقتراح حل خطوة بخطوة.',
      idea:'لدي خطأ في تطبيق React عند تحديث الحالة، ساعدني في تشخيص السبب واقتراح حل.' },
  ];

  /* ---------------- State ---------------- */
  const state = {
    step: 1,
    model: 'chatgpt',
    lang: 'ar',
    level: 'pro',
    activeTag: null,
    historyView: 'history',
  };

  /* ---------------- DOM refs ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const ideaInput = $('#ideaInput');
  const audienceInput = $('#audienceInput');
  const goalInput = $('#goalInput');
  const ideaCount = $('#ideaCount');
  const modelGrid = $('#modelGrid');
  const langChoice = $('#langChoice');
  const levelChoice = $('#levelChoice');
  const levelDesc = $('#levelDesc');
  const outputBox = $('#outputBox');
  const outCount = $('#outCount');
  const livePreview = $('#livePreview');
  const previewModel = $('#previewModel');
  const previewWords = $('#previewWords');
  const previewChars = $('#previewChars');
  const stepper = $('#stepper');
  const toast = $('#toast');

  /* ---------------- Toast ---------------- */
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }

  /* ---------------- Theme ---------------- */
  function initTheme() {
    const saved = load(STORE.theme, 'dark');
    document.documentElement.setAttribute('data-theme', saved);
    syncThemeIcon(saved);
  }
  function syncThemeIcon(theme) {
    $('#iconMoon').style.display = theme === 'dark' ? 'block' : 'none';
    $('#iconSun').style.display = theme === 'light' ? 'block' : 'none';
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    syncThemeIcon(next);
    save(STORE.theme, next);
  }
  $('#themeToggle').addEventListener('click', toggleTheme);

  /* ---------------- Word/char counting ---------------- */
  const countWords = (str) => (str.trim().match(/\S+/g) || []).length;

  /* ---------------- Prompt generation ---------------- */
  function buildPrompt({ idea, audience, goal, model, lang, level, enhanced }) {
    const modelLabel = MODELS.find(m => m.id === model)?.label || model;
    const isVisual = ['midjourney', 'flux', 'veo'].includes(model);
    const L = lang === 'en';

    if (isVisual) {
      // Visual/generative models: compact parameter-style prompt
      const bits = [idea.trim()];
      if (audience) bits.push(audience.trim());
      let out = bits.filter(Boolean).join(', ');
      if (level !== 'basic') out += L ? ', highly detailed, professional lighting, sharp focus' : '، تفاصيل دقيقة، إضاءة احترافية، تركيز حاد';
      if (model === 'midjourney') out += ' --ar 16:9 --v 6';
      if (model === 'flux') out += ' | style: photorealistic | quality: high';
      if (model === 'veo') out += L ? ' | camera: slow dolly-in | duration: 8s' : ' | حركة الكاميرا: تقدم بطيء | المدة: ٨ ثوانٍ';
      return out;
    }

    if (level === 'basic') {
      return L
        ? `${idea.trim()}${audience ? `\nAudience: ${audience}` : ''}${goal ? `\nGoal: ${goal}` : ''}`
        : `${idea.trim()}${audience ? `\nالجمهور المستهدف: ${audience}` : ''}${goal ? `\nالهدف: ${goal}` : ''}`;
    }

    const persona = L
      ? `You are an expert assistant working with ${modelLabel}. Respond with precision and a professional tone.`
      : `أنت مساعد خبير تتعامل مع نموذج ${modelLabel}. أجب بدقة وبأسلوب احترافي.`;

    const sections = [];
    sections.push(`# ${L ? 'Role' : 'الدور'}\n${persona}`);
    sections.push(`# ${L ? 'Task' : 'المهمة'}\n${idea.trim()}`);
    if (audience) sections.push(`# ${L ? 'Audience' : 'الجمهور المستهدف'}\n${audience.trim()}`);
    if (goal) sections.push(`# ${L ? 'Goal' : 'الهدف النهائي'}\n${goal.trim()}`);

    if (level === 'expert') {
      sections.push(`# ${L ? 'Context' : 'السياق'}\n${L ? 'Consider best practices and current standards in this domain before answering.' : 'خذ بعين الاعتبار أفضل الممارسات والمعايير الحديثة في هذا المجال قبل الإجابة.'}`);
      sections.push(`# ${L ? 'Constraints' : 'القيود'}\n${L ? '- Be concise but complete\n- Avoid unnecessary repetition\n- State assumptions explicitly' : '- كن مختصرًا وشاملاً في آن واحد\n- تجنّب التكرار غير الضروري\n- اذكر أي افتراضات بوضوح'}`);
      sections.push(`# ${L ? 'Output format' : 'صيغة الإخراج'}\n${L ? 'Structured sections with clear headings. Use lists where helpful.' : 'أقسام منظمة بعناوين واضحة، مع استخدام القوائم عند الحاجة.'}`);
      sections.push(`# ${L ? 'Example' : 'مثال توضيحي'}\n${L ? '(Provide one short example of the expected style before the full answer.)' : '(قدّم مثالاً قصيرًا واحدًا يوضح الأسلوب المطلوب قبل الإجابة الكاملة.)'}`);
    } else {
      sections.push(`# ${L ? 'Constraints' : 'القيود'}\n${L ? 'Be clear, structured, and avoid filler.' : 'كن واضحًا ومنظمًا وتجنّب الحشو.'}`);
      sections.push(`# ${L ? 'Output format' : 'صيغة الإخراج'}\n${L ? 'Well-structured response with headings if relevant.' : 'إجابة منظمة بعناوين إن لزم الأمر.'}`);
    }

    let prompt = sections.join('\n\n');
    if (enhanced) {
      prompt += `\n\n# ${L ? 'Note' : 'ملاحظة'}\n${L ? 'This prompt was auto-enhanced by Nidaa with a full PCTF structure (Persona, Context, Task, Format).' : 'تم تحسين هذا الأمر تلقائيًا عبر نداء وفق هيكل كامل (الدور، السياق، المهمة، صيغة الإخراج).'}`;
    }
    return prompt;
  }

  function currentInputs(enhanced = false) {
    return {
      idea: ideaInput.value || '',
      audience: audienceInput.value || '',
      goal: goalInput.value || '',
      model: state.model,
      lang: state.lang,
      level: state.level,
      enhanced,
    };
  }

  function updateLivePreview() {
    const inputs = currentInputs();
    if (!inputs.idea.trim()) {
      livePreview.textContent = 'ابدأ بكتابة فكرتك لترى المعاينة هنا...';
      previewModel.textContent = `النموذج: ${MODELS.find(m => m.id === state.model)?.label || '—'}`;
      previewWords.textContent = '0 كلمة';
      previewChars.textContent = '0 رمز';
      return;
    }
    const text = buildPrompt(inputs);
    livePreview.textContent = text;
    previewModel.textContent = `النموذج: ${MODELS.find(m => m.id === state.model)?.label || '—'}`;
    previewWords.textContent = `${countWords(text)} كلمة`;
    previewChars.textContent = `${text.length} رمز`;
  }

  /* ---------------- Model grid ---------------- */
  function renderModelGrid() {
    modelGrid.innerHTML = MODELS.map(m => `
      <button class="model-card ${m.id === state.model ? 'is-active' : ''}" data-model="${m.id}" type="button">
        <span class="model-card__mono">${m.mono}</span>${m.label}
      </button>
    `).join('');
    $$('.model-card', modelGrid).forEach(btn => {
      btn.addEventListener('click', () => {
        state.model = btn.dataset.model;
        renderModelGrid();
        updateLivePreview();
      });
    });
  }

  /* ---------------- Wizard navigation ---------------- */
  function goToStep(n) {
    state.step = Math.min(6, Math.max(1, n));
    $$('.step').forEach(el => el.classList.toggle('is-active', Number(el.dataset.step) === state.step));
    $$('.stepper__item').forEach(el => {
      const s = Number(el.dataset.step);
      el.classList.toggle('is-active', s === state.step);
      el.classList.toggle('is-done', s < state.step);
    });
    $('#prevStep').disabled = state.step === 1;
    $('#nextStep').textContent = state.step === 6 ? 'تم' : 'التالي';
    if (state.step === 6) generateOutput();
  }

  $('#nextStep').addEventListener('click', () => {
    if (state.step === 1 && !ideaInput.value.trim()) {
      showToast('اكتب فكرتك أولاً');
      ideaInput.focus();
      return;
    }
    if (state.step === 6) { goToStep(1); return; }
    goToStep(state.step + 1);
  });
  $('#prevStep').addEventListener('click', () => goToStep(state.step - 1));
  $$('.stepper__item').forEach(el => el.addEventListener('click', () => goToStep(Number(el.dataset.step))));

  /* ---------------- Step 4 & 5 choices ---------------- */
  langChoice.addEventListener('click', (e) => {
    const btn = e.target.closest('.choice');
    if (!btn) return;
    state.lang = btn.dataset.lang;
    $$('.choice', langChoice).forEach(b => b.classList.toggle('is-active', b === btn));
    updateLivePreview();
  });
  levelChoice.addEventListener('click', (e) => {
    const btn = e.target.closest('.choice');
    if (!btn) return;
    state.level = btn.dataset.level;
    $$('.choice', levelChoice).forEach(b => b.classList.toggle('is-active', b === btn));
    levelDesc.textContent = LEVEL_DESC[state.level];
    updateLivePreview();
  });

  /* ---------------- Output (step 6) ---------------- */
  let lastGenerated = '';
  function generateOutput(enhanced = false) {
    const inputs = currentInputs(enhanced);
    if (!inputs.idea.trim()) {
      outputBox.textContent = 'أدخل فكرتك في الخطوة الأولى أولاً.';
      outCount.textContent = '0 كلمة';
      return;
    }
    lastGenerated = buildPrompt(inputs);
    outputBox.textContent = lastGenerated;
    outCount.textContent = `${countWords(lastGenerated)} كلمة`;
    pushHistory(inputs, lastGenerated);
  }
  $('#enhanceBtn').addEventListener('click', () => {
    generateOutput(true);
    showToast('تم تحسين الأمر ✨');
  });

  $('#copyBtn').addEventListener('click', async () => {
    if (!lastGenerated) return;
    try {
      await navigator.clipboard.writeText(lastGenerated);
      showToast('تم النسخ إلى الحافظة');
    } catch {
      showToast('تعذّر النسخ، حاول يدويًا');
    }
  });

  $('#exportJsonBtn').addEventListener('click', () => {
    if (!lastGenerated) return;
    downloadFile('nidaa-prompt.json', JSON.stringify({
      idea: ideaInput.value, model: state.model, lang: state.lang, level: state.level,
      prompt: lastGenerated, createdAt: new Date().toISOString(),
    }, null, 2), 'application/json');
  });
  $('#exportTxtBtn').addEventListener('click', () => {
    if (!lastGenerated) return;
    downloadFile('nidaa-prompt.txt', lastGenerated, 'text/plain');
  });
  function downloadFile(name, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    showToast('تم التصدير');
  }

  $('#favBtn').addEventListener('click', () => {
    if (!lastGenerated) return;
    const favs = load(STORE.favorites, []);
    favs.unshift({ id: 'f' + Date.now(), prompt: lastGenerated, model: state.model, date: new Date().toISOString() });
    save(STORE.favorites, favs.slice(0, 100));
    showToast('أُضيف إلى المفضلة ♥');
    renderHistoryList();
  });

  /* ---------------- Idea word counter ---------------- */
  ideaInput.addEventListener('input', () => {
    ideaCount.textContent = countWords(ideaInput.value);
    updateLivePreview();
  });
  audienceInput.addEventListener('input', updateLivePreview);
  goalInput.addEventListener('input', updateLivePreview);

  /* ---------------- History & Favorites ---------------- */
  function pushHistory(inputs, prompt) {
    const hist = load(STORE.history, []);
    hist.unshift({ id: 'h' + Date.now(), prompt, model: inputs.model, date: new Date().toISOString() });
    save(STORE.history, hist.slice(0, 200));
    renderHistoryList();
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString('ar-SA', { dateStyle: 'medium', timeStyle: 'short' });
    } catch { return ''; }
  }

  function renderHistoryList() {
    const key = state.historyView === 'history' ? STORE.history : STORE.favorites;
    const items = load(key, []);
    const list = $('#historyList');
    const empty = $('#emptyState');
    if (!items.length) {
      list.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    list.innerHTML = items.map(item => `
      <div class="history-item" data-id="${item.id}">
        <span class="history-item__model">${MODELS.find(m => m.id === item.model)?.label || item.model}</span>
        <span class="history-item__snippet">${escapeHtml(item.prompt.slice(0, 120))}</span>
        <span class="history-item__date">${formatDate(item.date)}</span>
        <span class="history-item__actions">
          <button class="icon-sm-btn" data-act="copy" title="نسخ">⧉</button>
          <button class="icon-sm-btn" data-act="load" title="تحميل في المُنشئ">↺</button>
          <button class="icon-sm-btn" data-act="delete" title="حذف">✕</button>
        </span>
      </div>
    `).join('');
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  }

  $('#historyList').addEventListener('click', async (e) => {
    const btn = e.target.closest('.icon-sm-btn');
    if (!btn) return;
    const row = e.target.closest('.history-item');
    const id = row.dataset.id;
    const key = state.historyView === 'history' ? STORE.history : STORE.favorites;
    const items = load(key, []);
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (btn.dataset.act === 'copy') {
      try { await navigator.clipboard.writeText(item.prompt); showToast('تم النسخ'); } catch { showToast('تعذّر النسخ'); }
    }
    if (btn.dataset.act === 'delete') {
      save(key, items.filter(i => i.id !== id));
      renderHistoryList();
      showToast('تم الحذف');
    }
    if (btn.dataset.act === 'load') {
      const lines = item.prompt.split('\n');
      ideaInput.value = lines.find(l => l && !l.startsWith('#')) || item.prompt;
      ideaCount.textContent = countWords(ideaInput.value);
      state.model = item.model;
      renderModelGrid();
      updateLivePreview();
      goToStep(1);
      $('#builder').scrollIntoView({ behavior: 'smooth' });
      showToast('تم التحميل في المُنشئ');
    }
  });

  $$('.history__tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.historyView = tab.dataset.tab;
      $$('.history__tabs .tab').forEach(t => t.classList.toggle('is-active', t === tab));
      renderHistoryList();
    });
  });

  $('#clearHistoryBtn').addEventListener('click', () => {
    const key = state.historyView === 'history' ? STORE.history : STORE.favorites;
    save(key, []);
    renderHistoryList();
    showToast('تم مسح القائمة');
  });

  /* ---------------- Library ---------------- */
  const TAGS = Array.from(new Set(TEMPLATES.map(t => t.tag)));

  function renderTagRow() {
    const row = $('#tagRow');
    row.innerHTML = `<button class="tag-chip ${!state.activeTag ? 'is-active' : ''}" data-tag="">الكل</button>` +
      TAGS.map(tag => `<button class="tag-chip ${state.activeTag === tag ? 'is-active' : ''}" data-tag="${tag}">${tag}</button>`).join('');
    $$('.tag-chip', row).forEach(chip => {
      chip.addEventListener('click', () => {
        state.activeTag = chip.dataset.tag || null;
        renderTagRow();
        renderTemplateGrid();
      });
    });
  }

  function renderTemplateGrid() {
    const q = ($('#searchInput').value || '').trim().toLowerCase();
    const grid = $('#templateGrid');
    const filtered = TEMPLATES.filter(t => {
      const matchesTag = !state.activeTag || t.tag === state.activeTag;
      const matchesQuery = !q || (t.title + t.desc + t.tag).toLowerCase().includes(q);
      return matchesTag && matchesQuery;
    });

    if (!filtered.length) {
      grid.innerHTML = `<p class="empty-state">لا توجد نتائج مطابقة لبحثك.</p>`;
      return;
    }

    grid.innerHTML = filtered.map(t => `
      <article class="template-card">
        <div class="template-card__top">
          <span class="template-card__icon">${t.icon}</span>
          <span class="template-card__title">${t.title}</span>
        </div>
        <p class="template-card__desc">${t.desc}</p>
        <div class="template-card__meta">
          <span class="template-card__tag">${t.tag}</span>
          <span>★ ${t.rating} · ${t.uses} استخدام</span>
        </div>
        <div class="template-card__footer">
          <button class="btn btn--brass btn--sm" data-use="${t.id}" style="flex:1">استخدام</button>
        </div>
      </article>
    `).join('');

    $$('[data-use]', grid).forEach(btn => {
      btn.addEventListener('click', () => {
        const tpl = TEMPLATES.find(x => x.id === btn.dataset.use);
        ideaInput.value = tpl.idea;
        ideaCount.textContent = countWords(tpl.idea);
        state.model = tpl.model;
        renderModelGrid();
        updateLivePreview();
        goToStep(1);
        $('#builder').scrollIntoView({ behavior: 'smooth' });
        showToast(`تم تحميل «${tpl.title}» في المُنشئ`);
      });
    });
  }

  $('#searchInput').addEventListener('input', renderTemplateGrid);

  /* ---------------- Keyboard shortcuts ---------------- */
  document.addEventListener('keydown', (e) => {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      $('#library').scrollIntoView({ behavior: 'smooth' });
      $('#searchInput').focus();
    }
    if (mod && e.key === 'Enter') {
      e.preventDefault();
      if (state.step !== 6) goToStep(6);
      else generateOutput();
      $('#builder').scrollIntoView({ behavior: 'smooth' });
    }
    if (mod && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      toggleTheme();
    }
  });

  /* ---------------- Init ---------------- */
  function init() {
    initTheme();
    renderModelGrid();
    renderTagRow();
    renderTemplateGrid();
    renderHistoryList();
    goToStep(1);
    updateLivePreview();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
