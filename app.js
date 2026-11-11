(() => {
  "use strict";

  const STORAGE_KEY = "nidaa-draft-v1";

  const TONES = [
    { id: "formal", ar: "رسمية", en: "Formal" },
    { id: "friendly", ar: "ودّية", en: "Friendly" },
    { id: "direct", ar: "مباشرة", en: "Direct" },
    { id: "creative", ar: "إبداعية", en: "Creative" },
    { id: "brief", ar: "مختصرة", en: "Concise" },
  ];

  const GOALS = ["writing", "analysis", "coding", "marketing", "education", "support"];
  const FORMATS = ["paragraph", "bullets", "table", "json", "email"];

  const I18N = {
    ar: {
      skip: "تخطٍ إلى الاستوديو",
      "brand.tagline": "منصة عربية لبناء أوامر الذكاء الاصطناعي",
      "nav.studio": "الاستوديو",
      "nav.templates": "القوالب",
      "studio.eyebrow": "أداة صياغة — ليست نموذجاً لغوياً",
      "studio.title": "ابنِ أمراً جاهزاً للصق",
      "studio.lead":
        "عبّئ الحقول، وتابِع الأمر وهو يُبنى أمامك. انسخه ثم الصقه في أي نموذج تستخدمه. نداء لا يرسل طلبات إلى خدمات خارجية.",
      "builder.title": "منشِئ الأمر",
      "builder.sub": "حدّد العناصر التالية ليُركَّب الأمر تلقائياً",
      "field.goal": "الهدف",
      "field.goalPlaceholder": "اختر الغرض",
      "field.format": "شكل المخرجات",
      "field.formatPlaceholder": "اختر الشكل",
      "field.role": "الدور",
      "field.task": "المهمة",
      "field.context": "السياق",
      "field.constraints": "القيود",
      "field.audience": "الجمهور",
      "field.tones": "النبرة",
      "hint.role": "من يكون النموذج؟ صِف الخبرة والأسلوب في جملة أو جملتين.",
      "hint.task": "المطلوب إنجازه بدقّة، بلا غموض.",
      "hint.context": "خلفية الموقف: المنتج، المرحلة، الجمهور، أو أي تفصيل يغيّر الإجابة.",
      "hint.constraints": "ما يُمنع، وما يُلتزم به: الطول، اللغة، المحظورات، المصادر.",
      "hint.tones": "يمكن اختيار أكثر من نبرة.",
      "ph.role": "مثال: مستشار تسويق رقمي بخبرة عشر سنوات في السوق السعودي.",
      "ph.task": "صف ما تريد أن يُنجَز، والنتيجة المتوقعة.",
      "ph.context": "معلومات خلفية يحتاجها النموذج ليفهم الموقف.",
      "ph.constraints": "مثال: لا تختلق أرقاماً. أبقِ النص أقل من 200 كلمة. استخدم العربية الفصحى.",
      "ph.audience": "من سيقرأ الناتج؟",
      "action.copy": "نسخ الأمر",
      "action.clear": "مسح",
      "action.download": "تحميل .txt",
      "output.title": "الأمر الجاهز",
      "output.empty": "ابدأ بتعبئة الحقول ليُبنى الأمر أمامك مباشرة.",
      "output.words": (n) => (n ? `${n} كلمة` : "لا محتوى بعد"),
      "preview.title": "معاينة الأمر",
      "preview.note": "محاكاة لأسلوب الرد حسب الهدف المختار — ليست استجابة من نموذج متصل.",
      "preview.kicker": "عيّنة أسلوب — حسب الهدف",
      "templates.title": "مكتبة القوالب",
      "templates.lead": "قالب جاهز يملأ الحقول. عدّل بعده بما يناسب حالتك.",
      "templates.use": "تعبئة الحقول",
      "templates.active": "مُستخدم الآن",
      "footer.line1": "منصة عربية لبناء أوامر الذكاء الاصطناعي. الناتج أمر جاهز للصق، لا استدعاء لنماذج خارجية.",
      "footer.line2": "قطعة معرض · تصميم وتنفيذ مستقل",
      "toast.copied": "تم النسخ",
      "toast.cleared": "تم مسح المسودة",
      "toast.empty": "لا يوجد أمر لنسخه بعد",
      "toast.copyFailed": "تعذّر النسخ — يمكن تحديد النص من اللوحة",
      "toast.downloaded": "تم تنزيل الملف",
      "draft.saved": "حُفظت المسودة محلياً",
      "goals.writing": "كتابة",
      "goals.analysis": "تحليل",
      "goals.coding": "برمجة",
      "goals.marketing": "تسويق",
      "goals.education": "تعليم",
      "goals.support": "خدمة عملاء",
      "formats.paragraph": "فقرة",
      "formats.bullets": "نقاط",
      "formats.table": "جدول",
      "formats.json": "JSON",
      "formats.email": "بريد رسمي",
      prompt: {
        role: "الدور",
        task: "المهمة",
        context: "السياق",
        audience: "الجمهور",
        tones: "النبرة",
        constraints: "القيود",
        format: "شكل المخرجات",
        goal: "الهدف",
        close:
          "التزم بالمطلوب أعلاه. قدّم ناتجاً جاهزاً للاستخدام مباشرة، بلا تمهيد أو اعتذار أو شرح لآلية عملك.",
        end: "-- نهاية الأمر · نداء",
      },
    },
    en: {
      skip: "Skip to studio",
      "brand.tagline": "An Arabic studio for building AI prompts",
      "nav.studio": "Studio",
      "nav.templates": "Templates",
      "studio.eyebrow": "A prompt builder — not a language model",
      "studio.title": "Compose a prompt ready to paste",
      "studio.lead":
        "Fill the fields and watch the prompt assemble live. Copy it, then paste it into whichever model you use. Nidaa never calls an external API.",
      "builder.title": "Prompt builder",
      "builder.sub": "Set the pieces below and the command is assembled for you",
      "field.goal": "Goal",
      "field.goalPlaceholder": "Choose a goal",
      "field.format": "Output shape",
      "field.formatPlaceholder": "Choose a format",
      "field.role": "Role",
      "field.task": "Task",
      "field.context": "Context",
      "field.constraints": "Constraints",
      "field.audience": "Audience",
      "field.tones": "Tone",
      "hint.role": "Who should the model be? Describe expertise and stance in one or two sentences.",
      "hint.task": "State exactly what should be produced — no vagueness.",
      "hint.context": "Background that changes the answer: product, stage, market, or prior decisions.",
      "hint.constraints": "What to avoid or obey: length, language, taboos, sources.",
      "hint.tones": "You can select more than one tone.",
      "ph.role": "e.g. A digital marketing advisor with a decade in the Saudi market.",
      "ph.task": "Describe what should be delivered, and what done looks like.",
      "ph.context": "Background the model needs in order to understand the situation.",
      "ph.constraints": "e.g. Invent no figures. Keep it under 200 words. Use clear Arabic.",
      "ph.audience": "Who will read the output?",
      "action.copy": "Copy prompt",
      "action.clear": "Clear",
      "action.download": "Download .txt",
      "output.title": "Assembled prompt",
      "output.empty": "Start filling the fields and the prompt will build itself here.",
      "output.words": (n) => (n ? `${n} words` : "Nothing yet"),
      "preview.title": "Prompt preview",
      "preview.note": "A static stylistic sample for the selected goal — not a live model reply.",
      "preview.kicker": "Style sample — by goal",
      "templates.title": "Template library",
      "templates.lead": "A ready brief that fills the builder. Edit it to match your case.",
      "templates.use": "Fill the builder",
      "templates.active": "In use",
      "footer.line1": "An Arabic studio for building AI prompts. The output is a paste-ready command, not a model call.",
      "footer.line2": "Portfolio piece · independently designed and built",
      "toast.copied": "Copied",
      "toast.cleared": "Draft cleared",
      "toast.empty": "Nothing to copy yet",
      "toast.copyFailed": "Copy failed — select the text from the panel",
      "toast.downloaded": "File downloaded",
      "draft.saved": "Draft saved locally",
      "goals.writing": "Writing",
      "goals.analysis": "Analysis",
      "goals.coding": "Coding",
      "goals.marketing": "Marketing",
      "goals.education": "Education",
      "goals.support": "Customer support",
      "formats.paragraph": "Paragraph",
      "formats.bullets": "Bullets",
      "formats.table": "Table",
      "formats.json": "JSON",
      "formats.email": "Formal email",
      prompt: {
        role: "Role",
        task: "Task",
        context: "Context",
        audience: "Audience",
        tones: "Tone",
        constraints: "Constraints",
        format: "Output shape",
        goal: "Goal",
        close:
          "Follow the brief above. Deliver a ready-to-use result with no preamble, apology, or explanation of your process.",
        end: "-- End of prompt · Nidaa",
      },
    },
  };

  const TEMPLATES = [
    {
      id: "product-desc",
      goal: "marketing",
      format: "paragraph",
      tones: ["direct", "creative"],
      ar: {
        title: "وصف منتج لمتجر إلكتروني",
        blurb: "وصف بيع يوازن بين الفائدة والمواصفات دون مبالغة رخيصة.",
        role: "كاتب وصف منتجات عربي محترف، تعمل مع متاجر خليجية، وتجيد تحويل المواصفات إلى قيمة يفهمها المشتري في ثوانٍ.",
        task: "اكتب وصف منتج جاهز لصفحة عرض في متجر إلكتروني. ابدأ بفائدة ملموسة، ثم اذكر المواصفات الأساسية، ثم اختم بدعوة واضحة للشراء.",
        context:
          "المنتج: إبريق قهوة زجاجي حراري بسعة 800 مل، مناسب للقهوة العربية والمقطرة. الشريحة: مهتمو الضيافة المنزلية في السعودية والإمارات. الموقع السعري متوسط إلى فاخر.",
        constraints:
          "لا تستخدم عبارات مثل «الأفضل في العالم». لا تختلق شهادات أو أرقاماً غير مذكورة. الطول بين 120 و180 كلمة. العربية الفصحى الواضحة.",
        audience: "مشترٍ منزلي يبحث عن أداة ضيافة أنيقة وعملية",
      },
      en: {
        title: "E-commerce product description",
        blurb: "Selling copy that balances benefit and spec without cheap hype.",
        role: "A professional Arabic product copywriter for Gulf storefronts, skilled at turning specs into value a shopper grasps in seconds.",
        task: "Write a product description for a store listing. Open with a tangible benefit, cover the core specs, and close with a clear invitation to buy.",
        context:
          "Product: 800 ml thermal glass coffee carafe for Arabic and pour-over coffee. Audience: home hospitality buyers in Saudi Arabia and the UAE. Price band: mid to premium.",
        constraints:
          "No phrases like “best in the world”. Invent no certificates or numbers. 120–180 words. Clear Modern Standard Arabic if the user keeps the output in Arabic.",
        audience: "A household buyer looking for an elegant, practical hosting tool",
      },
    },
    {
      id: "complaint-reply",
      goal: "support",
      format: "email",
      tones: ["formal", "friendly"],
      ar: {
        title: "رد شكاوى عملاء",
        blurb: "اعتذار واضح، خطوة تالية، وزمن متوقع للحل — بلا لوم.",
        role: "أخصائي تجربة عملاء في شركة اشتراكات رقمية. صوتك هادئ ومسؤول، ولا تتهرّب من الخطأ إن وقع على طرفنا.",
        task: "صغ رسالة بريد للرد على شكوى عميل: اعتذر بوضوح، اشرح ما ستفعلونه، وحدّد زمناً متوقعاً للمتابعة.",
        context:
          "العميل اشترك في باقة شهرية ولم يصل رمز التفعيل بعد 18 ساعة. هذه أول شكوى له، وسجله معنا منتظم بلا نزاعات سابقة.",
        constraints:
          "لا تلقِ اللوم على العميل. لا تعد بتعويض مالي ما لم تنصّ السياسة عليه. لا تطلب إعادة شرح المشكلة بالكامل. أبقِ الرسالة قصيرة وواضحة.",
        audience: "عميل فردي غير راضٍ لكنه منفتح على الحل",
      },
      en: {
        title: "Customer complaint reply",
        blurb: "A clear apology, a next step, and a timeline — no blame.",
        role: "A customer-experience specialist at a digital subscription company. Calm, accountable, and unwilling to dodge a mistake on our side.",
        task: "Draft an email that answers a complaint: apologise plainly, explain what you will do, and give a follow-up time.",
        context:
          "The customer subscribed to a monthly plan and has not received the activation code after 18 hours. First complaint; otherwise a clean history.",
        constraints:
          "Do not blame the customer. Do not promise a refund unless policy allows it. Do not ask them to restate the whole issue. Keep the email short.",
        audience: "An individual customer who is unhappy but open to a fix",
      },
    },
    {
      id: "ig-plan",
      goal: "marketing",
      format: "table",
      tones: ["creative", "direct"],
      ar: {
        title: "خطة محتوى إنستغرام",
        blurb: "أسبوع نشر متوازن: تعليم، إثبات، وبيع بهدوء.",
        role: "مخطط محتوى عربي لمنشآت صغيرة، يفهم إيقاع إنستغرام دون الاعتماد على الترندات المفرغة.",
        task: "أعد خطة محتوى لأسبوع واحد (سبعة منشورات) لحساب إنستغرام تجاري: فكرة كل منشور، الهدف منه، واقتراح للتعليق الأول.",
        context:
          "الحساب لمخبز حي في جدة يقدّم خبزاً يومياً وحلويات مناسبات. المتابعون أسر محلية. المطلوب رفع الحجوزات للمناسبات لا مطاردة الانتشار العام.",
        constraints:
          "لا تقترح مسابقات وهمية أو شراء متابعين. نوّع الأشكال (صورة، قصص، ريلز قصير) دون أن يكون كل يوم ريلز. مخرجات على هيئة جدول.",
        audience: "مالكة المخبز التي ستنفّذ الخطة بنفسها",
      },
      en: {
        title: "Instagram content plan",
        blurb: "A balanced posting week: teach, prove, then sell quietly.",
        role: "An Arabic content planner for small businesses who understands Instagram cadence without empty trend-chasing.",
        task: "Build a one-week plan (seven posts) for a business Instagram account: the idea, the intent, and a first-comment prompt for each.",
        context:
          "A neighbourhood bakery in Jeddah selling daily bread and occasion sweets. Followers are local families. The aim is more event bookings, not vanity reach.",
        constraints:
          "No fake giveaways or bought followers. Mix formats (still, stories, short reel) without making every day a reel. Deliver as a table.",
        audience: "The bakery owner who will execute the plan herself",
      },
    },
    {
      id: "meeting-notes",
      goal: "analysis",
      format: "bullets",
      tones: ["direct", "brief"],
      ar: {
        title: "تلخيص اجتماع",
        blurb: "قرارات، مالك لكل بند، وما بقي معلّقاً — بلا محضر إنشائي.",
        role: "محرّر عمليات يحوّل نقاشاً متشعباً إلى محضر تنفيذي يقرأه مشغول في دقيقتين.",
        task: "لخّص الاجتماع في: قرارات اتُّخذت، مهام مع مالك وتاريخ، وأسئلة ما زالت مفتوحة. لا تروِ النقاش نقطة بنقطة.",
        context:
          "اجتماع أسبوعي لفريق منتج (45 دقيقة) حول إطلاق لوحة تحكم للعملاء. حضر المدير التنفيذي ومسؤول الدعم ومصمّم الواجهة. الخلاف الأبرز: هل نؤجّل تصدير التقارير إلى المرحلة التالية.",
        constraints:
          "لا تختلق حضوراً أو قرارات غير مذكورة في النص الذي سيُلصق لاحقاً. إن نقص معلومة فضعها تحت «غير محسوم». استخدم نقاطاً قصيرة.",
        audience: "فريق المنتج والإدارة الذين لم يحضروا كلّهم",
      },
      en: {
        title: "Meeting recap",
        blurb: "Decisions, an owner for each item, and what is still open.",
        role: "An operations editor who turns a branching discussion into a two-minute brief for busy readers.",
        task: "Summarise the meeting as: decisions taken, tasks with owner and date, and questions still open. Do not narrate the debate blow by blow.",
        context:
          "A 45-minute weekly product meeting on a customer dashboard launch. Present: CEO, support lead, interface designer. Main disagreement: whether to slip report export to the next phase.",
        constraints:
          "Invent no attendees or decisions. If something is missing, list it under “unresolved”. Use short bullets.",
        audience: "The product team and managers who were not all in the room",
      },
    },
    {
      id: "contract-review",
      goal: "analysis",
      format: "bullets",
      tones: ["formal", "direct"],
      ar: {
        title: "مراجعة عقد مبسّطة",
        blurb: "قراءة غير قانونية توضّح المخاطر بلغة يفهمها صاحب المنشأة.",
        role: "مستشار أعمال يشرح البنود التعاقدية لغير المختصين. لست محامياً ولا تقدّم فتوى قانونية.",
        task: "اقرأ ملخص العقد (سيُلصق في المحادثة) وأخرج: بنود مألوفة، بنود تستحق سؤالاً، وما يجب توضيحه قبل التوقيع. رتّب حسب الأثر لا حسب ترتيب الصفحات.",
        context:
          "عقد تصميم وتطوير موقع لمدة ثلاثة أشهر مع دفعة أولى 40%. العميل منشأة صغيرة في الرياض، والجهة المنفّذة مكتب مستقل. القلق: ملكية الملفات المصدرية وشرط التأخير.",
        constraints:
          "اذكر صراحة أن هذا ليس استشارة قانونية. لا تحكم ببطلان بند. لا تستخدم لاتينية قانونية. أبقِ كل نقطة في سطرين كحد أقصى.",
        audience: "صاحب المنشأة قبل التوقيع، من غير خلفية قانونية",
      },
      en: {
        title: "Plain-language contract review",
        blurb: "A non-legal reading of risk in language a founder understands.",
        role: "A business advisor who explains contract clauses to non-specialists. You are not a lawyer and you do not give legal opinions.",
        task: "Read the contract summary (to be pasted in the chat) and list: familiar clauses, clauses worth a question, and what to clarify before signing. Rank by impact, not page order.",
        context:
          "A three-month website design and build contract with a 40% deposit. Client: a small Riyadh firm. Vendor: an independent studio. Concerns: source-file ownership and the delay clause.",
        constraints:
          "State clearly this is not legal advice. Do not declare a clause void. Avoid legal Latin. Two lines per bullet at most.",
        audience: "A founder about to sign, with no legal background",
      },
    },
    {
      id: "lesson",
      goal: "education",
      format: "bullets",
      tones: ["friendly", "direct"],
      ar: {
        title: "درس تعليمي خطوة بخطوة",
        blurb: "شرح هادئ يفترض نية التعلّم لا المعرفة المسبقة.",
        role: "معلّم عربي يشرح مفاهيم رقمية للمبتدئين البالغين، بصبر ومن دون استعراض مصطلحات.",
        task: "صمّم درساً قصيراً من أربع إلى ست خطوات يعلّم المهارة المطلوبة، مع مثال واحد في كل خطوة، وسؤال تحقق في الختام.",
        context:
          "الموضوع: إنشاء جدول مصاريف شهري في ورقة حساب. المتعلم موظف جديد يريد ضبط مصروفه الشخصي بعد أول راتب. الوقت المتاح: عشرون دقيقة.",
        constraints:
          "لا تفترض معرفة بدوال متقدمة. تجنّب الإنجليزية إلا لأسماء الأزرار الشائعة. لا تطوّل المقدمة. اجعل كل خطوة فعلاً واحداً يقوم به المتعلم.",
        audience: "موظف في أوائل العشرينيات، غير متخصص في الجداول",
      },
      en: {
        title: "Step-by-step lesson",
        blurb: "A calm walkthrough that assumes willingness, not prior knowledge.",
        role: "An Arabic teacher of digital skills for adult beginners — patient, and not showing off jargon.",
        task: "Design a short lesson of four to six steps that teaches the skill, with one example per step and a check question at the end.",
        context:
          "Topic: building a monthly expense sheet. Learner: a new employee who wants to manage personal spend after a first salary. Time: twenty minutes.",
        constraints:
          "Assume no advanced formulas. Avoid English except for common button names. No long preamble. Each step is one action the learner performs.",
        audience: "An employee in their early twenties, not a spreadsheet specialist",
      },
    },
    {
      id: "paid-ad",
      goal: "marketing",
      format: "bullets",
      tones: ["direct", "creative", "brief"],
      ar: {
        title: "إعلان ممول",
        blurb: "نسخ قصيرة لمنصة إعلانات: عنوان، وصف، ودعوة — بلا صخب.",
        role: "كاتب إعلانات أداء بالعربية، يكتب لمنصات التمويل المدفوع ويحترم قيود عدد الأحرف.",
        task: "اكتب ثلاث صيغ لإعلان ممول: عنوان رئيسي، سطر وصف، ودعوة إجراء. لكل صيغة زاوية مختلفة (سبب، دليل، عرض).",
        context:
          "الخدمة: استشارة مالية أولى مجانية لمدة 20 دقيقة لمستقلين في السعودية. الميزانية التجريبية صغيرة. المنصة المقصودة: إعلانات إنستغرام.",
        constraints:
          "لا وعود ربح أو «اضمن دخلاً». لا رموز تعبيرية مفرطة. كل عنوان أقل من 40 حرفاً وكل وصف أقل من 90. العربية الفصحى القريبة من اليومي.",
        audience: "مستقلون بين 24 و40 سنة يقلقهم تذبذب الدخل",
      },
      en: {
        title: "Paid ad copy",
        blurb: "Short variants for an ads platform: headline, line, and ask — no noise.",
        role: "An Arabic performance copywriter who respects character limits on paid platforms.",
        task: "Write three paid-ad variants: headline, description line, and call to action. Give each a different angle (reason, proof, offer).",
        context:
          "Service: a free 20-minute first financial consult for freelancers in Saudi Arabia. Test budget is small. Channel: Instagram ads.",
        constraints:
          "No income guarantees. No emoji clutter. Headlines under 40 characters, descriptions under 90. MSA close to everyday speech.",
        audience: "Freelancers aged 24–40 worried about uneven income",
      },
    },
    {
      id: "cv",
      goal: "writing",
      format: "paragraph",
      tones: ["formal", "direct"],
      ar: {
        title: "سيرة ذاتية احترافية",
        blurb: "ملف تعريفي يُظهر أثر العمل لا قائمة مهام.",
        role: "محرّر سير مهنية عربي، يكتب لسوق العمل في الخليج ويبتعد عن العبارات الجاهزة.",
        task: "أعد صياغة ملخص مهني وفقرتين لخبرتين بحيث يبرز كل بند أثراً قابلاً للملاحظة لا مجرد مسؤولية.",
        context:
          "المتقدم: منسّق عمليات لوجستية بخبرة أربع سنوات، ينتقل إلى دور مشرف مستودع. نقاط القوة: تقليل أخطاء الجرد وتحسين زمن التجهيز. اللغة: عربية مع عناوين أقسام إنجليزية شائعة إن لزم.",
        constraints:
          "لا تختلق أرقاماً. إن وُجد رقم في المسودة الأصلية فحافظ عليه. لا تستخدم «محفز» أو «أسعى للتميز». أبقِ الملخص تحت 80 كلمة.",
        audience: "مسؤول توظيف يقرأ بالعربية ويراجع عشرات الملفات يومياً",
      },
      en: {
        title: "Professional CV rewrite",
        blurb: "A profile that shows impact, not a chore list.",
        role: "An Arabic CV editor for Gulf hiring, allergic to stock phrases.",
        task: "Rewrite a professional summary and two experience blurbs so each line shows an observable result, not just a duty.",
        context:
          "Candidate: a logistics coordinator with four years’ experience, moving toward a warehouse supervisor role. Strengths: fewer inventory errors and faster pick times. Language: Arabic, with common English section labels if needed.",
        constraints:
          "Invent no metrics. Keep any figure that already exists in the source draft. Avoid “motivated” and “strive for excellence”. Summary under 80 words.",
        audience: "A recruiter reading Arabic and scanning dozens of files a day",
      },
    },
    {
      id: "sales-followup",
      goal: "writing",
      format: "email",
      tones: ["formal", "brief"],
      ar: {
        title: "متابعة بعد اجتماع مبيعات",
        blurb: "رسالة قصيرة تثبّت ما اتُّفق عليه وتطلب قراراً بموعد.",
        role: "مدير حسابات مؤسسي يكتب بالعربية الموجزة، ويحترم وقت صانع القرار.",
        task: "اكتب رسالة متابعة بعد عرض تقديمي: اشكر على الوقت، لخّص الاتفاق في ثلاث نقاط، واقترح خطوة تالية بتاريخ.",
        context:
          "عُرض نظام جدولة للعيادات على مدير تشغيل مجمع طبي في الدمام. الاهتمام واضح بميزة التذكير بالرسائل، والتحفّظ على سعر الباقة السنوية. لم يُطلب عرض سعر رسمي بعد.",
        constraints:
          "لا تستخدم لغة إلحاح أو خصماً لم يُوافق عليه. لا تُعد إرفاق ملفات غير موجودة. حدّ الرسالة بـ 130 كلمة.",
        audience: "مدير تشغيل مشغول يقرأ البريد على الهاتف",
      },
      en: {
        title: "Sales follow-up email",
        blurb: "A short note that locks the agreement and asks for a dated next step.",
        role: "An enterprise account manager who writes spare Arabic and respects a decision-maker’s time.",
        task: "Write a follow-up after a pitch: thank them, recap the agreement in three points, and propose a dated next step.",
        context:
          "A clinic scheduling system was shown to an operations director at a Dammam medical complex. Interest in SMS reminders is clear; hesitation is on the annual plan price. No formal quote was requested yet.",
        constraints:
          "No pressure language and no discount that was not approved. Do not promise attachments that do not exist. Cap at 130 words.",
        audience: "A busy operations director reading mail on a phone",
      },
    },
    {
      id: "user-guide",
      goal: "coding",
      format: "bullets",
      tones: ["direct", "brief"],
      ar: {
        title: "دليل مستخدم من مواصفات تقنية",
        blurb: "تحويل ملاحظات مطوّرين إلى خطوات يفهمها غير التقني.",
        role: "كاتب وثائق منتجات رقمية، يقف بين المهندسين والمستخدم النهائي ويتجنّب لغة المستودعات البرمجية.",
        task: "حوّل المواصفات التالية إلى دليل استخدام قصير: ماذا يفعل المستخدم، ماذا سيظهر، وماذا يفعل إن فشلت الخطوة.",
        context:
          "الميزة: رفع ملف فواتير PDF ثم استخراج البنود إلى جدول. الجمهور داخل شركة محاسبة. المشاكل الشائعة: ملف محمي بكلمة، أو مسح ضوئي رديء.",
        constraints:
          "لا تشرح البنية التقنية ولا تذكر واجهات برمجية. كل خطوة تبدأ بفعل أمر. أضف مساراً للخطأ في النهاية. العربية الفصحى المهنية.",
        audience: "محاسب يستخدم الأداة أسبوعياً وليس مطوّراً",
      },
      en: {
        title: "User guide from a tech spec",
        blurb: "Turn engineer notes into steps a non-technical person can follow.",
        role: "A digital product writer standing between engineers and the end user, avoiding repository jargon.",
        task: "Turn the spec into a short guide: what the user does, what they should see, and what to do if the step fails.",
        context:
          "Feature: upload a PDF invoice and extract line items into a table. Users sit in an accounting firm. Common failures: password-protected files and poor scans.",
        constraints:
          "Do not explain architecture or mention APIs. Start every step with an imperative. Include an error path at the end. Professional clear language.",
        audience: "An accountant who uses the tool weekly and is not a developer",
      },
    },
  ];

  const PREVIEWS = {
    ar: {
      writing: {
        kicker: "عيّنة أسلوب — كتابة",
        html: "<p>ملخص مهني: منسّق عمليات يحوّل فوضى الاستلام إلى إيقاع يومي يمكن قياسه. خلال أربع سنوات خفّض أخطاء الجرد وأعاد ترتيب مسار التجهيز بحيث يصل الطلب إلى الرصيف في وقت أقصر، من دون أن يزيد عدد الورديات.</p><p>صيغة جاهزة للصق في رأس السيرة، لا مقدمة إنشائية ولا صفات عامة.</p>",
      },
      analysis: {
        kicker: "عيّنة أسلوب — تحليل",
        html: "<p><strong>قرارات:</strong> اعتماد المرحلة الأولى بلا تصدير تقارير.</p><ul><li>ملك المهمة: سارة — تصميم حالات التحميل الفارغ قبل الخميس.</li><li>معلّق: هل تُحسب صلاحية المشرف على مستوى الفرع أم المؤسسة؟</li></ul><p>النبرة تقريرية، والبنود قصيرة بما يكفي لمحضر يُقرأ في الاجتماع التالي.</p>",
      },
      coding: {
        kicker: "عيّنة أسلوب — برمجة",
        html: "<p><strong>رفع الفاتورة</strong></p><ol><li>اختر «رفع ملف» ثم حدّد PDF.</li><li>انتظر حتى يظهر جدول البنود.</li><li>إن بقي الملف معلّقاً: تحقّق أنه غير محمي، أو أعد المسح بوضوح أعلى.</li></ol><p>خطوات أمرية، بلا ذكر لواجهات أو مكتبات.</p>",
      },
      marketing: {
        kicker: "عيّنة أسلوب — تسويق",
        html: "<p>الإبريق لا يزيّن الرف؛ يحفظ حرارة الضيافة حتى آخر فنجان. زجاج حراري بسعة 800 مل، مناسب للقهوة العربية والمقطرة، ويُغسل كما تُغسل كأس الضيف.</p><p>النص يبيع بالفائدة ثم يثبت بالمواصفة، من دون «الأفضل» ومن دون اختراع شهادات.</p>",
      },
      education: {
        kicker: "عيّنة أسلوب — تعليم",
        html: "<p><strong>الخطوة 1.</strong> افتح ورقة جديدة وسمِّ الأعمدة: التاريخ، البند، المبلغ، التصنيف.</p><p><strong>الخطوة 2.</strong> أدخل مصروف اليوم الأول فقط — لا تنقل الشهر كله دفعة واحدة.</p><p>كل خطوة فعل واحد، يتبعه مثال، ثم ينتقل الدرس.</p>",
      },
      support: {
        kicker: "عيّنة أسلوب — خدمة عملاء",
        html: "<p>مرحباً أحمد،</p><p>نعتذر عن تأخّر رمز التفعيل؛ هذا تأخير من طرفنا وليس قصوراً في طلبك. نعيد إصدار الرمز خلال ساعتي عمل، ويصلك في الرسالة التالية مع خطوات التشغيل.</p><p>إن لم يصل الرمز بعد هذا الموعد، أجب على هذا البريد وسنحوّله مباشرة إلى مشرف الحساب.</p>",
      },
      fallback: {
        kicker: "عيّنة أسلوب",
        html: "<p>اختر هدفاً من القائمة لترى عيّنة لشكل الرد المتوقع. هذه محاكاة ثابتة داخل نداء، وليست نتيجة نموذج متصل.</p>",
      },
    },
    en: {
      writing: {
        kicker: "Style sample — writing",
        html: "<p>Professional summary: an operations coordinator who turns receiving chaos into a measurable daily rhythm. Over four years they cut inventory errors and reordered the pick path so orders reach the dock sooner — without adding shifts.</p><p>Paste-ready for the top of a CV: no fluff, no generic adjectives.</p>",
      },
      analysis: {
        kicker: "Style sample — analysis",
        html: "<p><strong>Decisions:</strong> ship phase one without report export.</p><ul><li>Owner: Sara — empty-state designs before Thursday.</li><li>Open: is supervisor access scoped by branch or by organisation?</li></ul><p>Report-like tone, short enough to read in the next standup.</p>",
      },
      coding: {
        kicker: "Style sample — coding",
        html: "<p><strong>Upload the invoice</strong></p><ol><li>Choose “Upload file” and pick a PDF.</li><li>Wait until the line-item table appears.</li><li>If it hangs: check the file is not password-protected, or rescan more clearly.</li></ol><p>Imperative steps, no APIs, no library names.</p>",
      },
      marketing: {
        kicker: "Style sample — marketing",
        html: "<p>The carafe is not shelf décor; it keeps hospitality warm through the last cup. Thermal glass, 800 ml, at home with Arabic coffee and pour-over, washed like a guest’s glass.</p><p>Benefit first, then spec — no “best in the world”, no invented badges.</p>",
      },
      education: {
        kicker: "Style sample — education",
        html: "<p><strong>Step 1.</strong> Open a new sheet and name the columns: date, item, amount, category.</p><p><strong>Step 2.</strong> Enter only today’s spend — do not import the whole month at once.</p><p>One action per step, then an example, then the next move.</p>",
      },
      support: {
        kicker: "Style sample — customer support",
        html: "<p>Hello Ahmad,</p><p>We are sorry the activation code is late; the delay is on our side, not in your request. We will reissue the code within two working hours and send it in the next message with the start steps.</p><p>If it still has not arrived by then, reply to this email and we will route it to the account supervisor.</p>",
      },
      fallback: {
        kicker: "Style sample",
        html: "<p>Pick a goal to see a sample of the expected reply shape. This is a static mock inside Nidaa, not a connected model.</p>",
      },
    },
  };

  const els = {
    html: document.documentElement,
    langToggle: document.getElementById("lang-toggle"),
    form: document.getElementById("builder-form"),
    goal: document.getElementById("goal"),
    format: document.getElementById("format"),
    role: document.getElementById("role"),
    task: document.getElementById("task"),
    context: document.getElementById("context"),
    constraints: document.getElementById("constraints"),
    audience: document.getElementById("audience"),
    chips: document.getElementById("tone-chips"),
    promptView: document.getElementById("prompt-view"),
    wordCount: document.getElementById("word-count"),
    mobileCount: document.getElementById("mobile-word-count"),
    draftStatus: document.getElementById("draft-status"),
    previewKicker: document.getElementById("preview-kicker"),
    previewBody: document.getElementById("preview-body"),
    templateGrid: document.getElementById("template-grid"),
    toast: document.getElementById("toast"),
    btnCopy: document.getElementById("btn-copy"),
    btnCopyMobile: document.getElementById("btn-copy-mobile"),
    btnDownload: document.getElementById("btn-download"),
    btnClear: document.getElementById("btn-clear"),
  };

  const state = {
    lang: "ar",
    tones: [],
    templateId: null,
    promptText: "",
    saveTimer: null,
    toastTimer: null,
  };

  function t(key) {
    const table = I18N[state.lang];
    const value = table[key];
    return value == null ? key : value;
  }

  function loc(block) {
    return block[state.lang] || block.ar;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function countWords(text) {
    const parts = text.trim().split(/\s+/).filter(Boolean);
    return parts.length;
  }

  function getDraft() {
    return {
      lang: state.lang,
      goal: els.goal.value,
      format: els.format.value,
      role: els.role.value.trim(),
      task: els.task.value.trim(),
      context: els.context.value.trim(),
      constraints: els.constraints.value.trim(),
      audience: els.audience.value.trim(),
      tones: state.tones.slice(),
      templateId: state.templateId,
    };
  }

  function assemble(draft) {
    const labels = I18N[state.lang].prompt;
    const sections = [];
    const push = (title, body) => {
      if (!body) return;
      sections.push({ title, body });
    };

    const goalLabel = draft.goal ? t(`goals.${draft.goal}`) : "";
    const formatLabel = draft.format ? t(`formats.${draft.format}`) : "";
    const toneLabels = draft.tones
      .map((id) => {
        const row = TONES.find((item) => item.id === id);
        return row ? row[state.lang] : "";
      })
      .filter(Boolean);

    push(labels.role, draft.role ? (state.lang === "ar" ? `أنت ${draft.role}` : `You are ${draft.role}`) : "");
    push(labels.task, draft.task);
    push(labels.context, draft.context);
    push(labels.audience, draft.audience);
    push(labels.tones, toneLabels.join(state.lang === "ar" ? "، " : ", "));
    push(labels.constraints, draft.constraints);
    push(labels.format, formatLabel);
    push(labels.goal, goalLabel);

    if (!sections.length) return { text: "", html: "" };

    const text =
      sections.map((s) => `# ${s.title}\n${s.body}`).join("\n\n") +
      `\n\n${labels.close}\n\n${labels.end}`;

    const html =
      sections
        .map(
          (s) =>
            `<span class="tok-h"># ${escapeHtml(s.title)}</span>\n<span class="tok-b">${escapeHtml(
              s.body
            )}</span>`
        )
        .join("\n\n") +
      `\n\n<span class="tok-b">${escapeHtml(labels.close)}</span>\n\n<span class="tok-end">${escapeHtml(
        labels.end
      )}</span>`;

    return { text, html };
  }

  function renderChips() {
    els.chips.replaceChildren();
    TONES.forEach((tone) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.dataset.tone = tone.id;
      btn.textContent = tone[state.lang];
      btn.setAttribute("aria-pressed", state.tones.includes(tone.id) ? "true" : "false");
      btn.addEventListener("click", () => {
        if (state.tones.includes(tone.id)) {
          state.tones = state.tones.filter((id) => id !== tone.id);
        } else {
          state.tones = state.tones.concat(tone.id);
        }
        state.templateId = null;
        renderChips();
        renderTemplates();
        updatePrompt();
      });
      els.chips.appendChild(btn);
    });
  }

  function renderTemplates() {
    const draft = getDraft();
    els.templateGrid.replaceChildren();
    TEMPLATES.forEach((tpl, index) => {
      const copy = loc(tpl);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "template-card";
      card.dataset.id = tpl.id;
      if (state.templateId === tpl.id) card.classList.add("is-active");
      else if (draft.goal && draft.goal === tpl.goal) card.classList.add("is-related");
      const num = String(index + 1).padStart(2, "0");
      card.innerHTML = `
        <div class="template-top">
          <span class="template-index">${num}</span>
          <span class="template-goal">${escapeHtml(t(`goals.${tpl.goal}`))}</span>
        </div>
        <h3>${escapeHtml(copy.title)}</h3>
        <p>${escapeHtml(copy.blurb)}</p>
        <span class="template-use">${escapeHtml(
          state.templateId === tpl.id ? t("templates.active") : t("templates.use")
        )}</span>
      `;
      card.addEventListener("click", () => applyTemplate(tpl.id));
      els.templateGrid.appendChild(card);
    });
  }

  function applyTemplate(id) {
    const tpl = TEMPLATES.find((item) => item.id === id);
    if (!tpl) return;
    const copy = loc(tpl);
    els.goal.value = tpl.goal;
    els.format.value = tpl.format;
    els.role.value = copy.role;
    els.task.value = copy.task;
    els.context.value = copy.context;
    els.constraints.value = copy.constraints;
    els.audience.value = copy.audience;
    state.tones = tpl.tones.slice();
    state.templateId = tpl.id;
    renderChips();
    renderTemplates();
    updatePrompt();
    els.role.focus();
  }

  function renderPreview(goal) {
    const pack = PREVIEWS[state.lang];
    const sample = pack[goal] || pack.fallback;
    els.previewKicker.textContent = sample.kicker;
    els.previewBody.innerHTML = sample.html;
  }

  function updatePrompt() {
    const draft = getDraft();
    const assembled = assemble(draft);
    state.promptText = assembled.text;
    const words = assembled.text ? countWords(assembled.text) : 0;

    if (!assembled.html) {
      els.promptView.innerHTML = `<span class="prompt-empty">${escapeHtml(t("output.empty"))}</span>`;
    } else {
      els.promptView.innerHTML = assembled.html;
    }

    const countLabel = t("output.words")(words);
    els.wordCount.textContent = countLabel;
    els.mobileCount.textContent = countLabel;

    const canUse = Boolean(assembled.text);
    els.btnCopy.disabled = !canUse;
    els.btnCopyMobile.disabled = !canUse;
    els.btnDownload.disabled = !canUse;

    renderPreview(draft.goal);
    scheduleSave();
    els.draftStatus.textContent = canUse ? t("draft.saved") : "";
  }

  function applyI18n() {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      const value = t(key);
      if (typeof value === "string") node.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((node) => {
      node.setAttribute("title", t(node.getAttribute("data-i18n-title")));
    });

    els.html.lang = state.lang === "ar" ? "ar" : "en";
    els.html.dir = state.lang === "ar" ? "rtl" : "ltr";
    els.langToggle.textContent = state.lang === "ar" ? "EN" : "عربي";
    els.langToggle.setAttribute(
      "aria-label",
      state.lang === "ar" ? "Switch to English" : "التبديل إلى العربية"
    );
    els.chips.setAttribute("aria-label", t("field.tones"));

    renderChips();
    renderTemplates();
    updatePrompt();
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("is-on");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => els.toast.classList.remove("is-on"), 2200);
  }

  function copyFallback(text) {
    return new Promise((resolve, reject) => {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "0";
      area.style.left = "0";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.focus();
      area.select();
      area.setSelectionRange(0, text.length);
      try {
        const ok = document.execCommand("copy");
        document.body.removeChild(area);
        ok ? resolve() : reject(new Error("copy failed"));
      } catch (err) {
        document.body.removeChild(area);
        reject(err);
      }
    });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(() => copyFallback(text));
    }
    return copyFallback(text);
  }

  function handleCopy() {
    if (!state.promptText) {
      showToast(t("toast.empty"));
      return;
    }
    copyText(state.promptText)
      .then(() => showToast(t("toast.copied")))
      .catch(() => showToast(t("toast.copyFailed")));
  }

  function handleDownload() {
    if (!state.promptText) {
      showToast(t("toast.empty"));
      return;
    }
    const blob = new Blob([state.promptText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nidaa-prompt.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(t("toast.downloaded"));
  }

  function handleClear() {
    els.form.reset();
    state.tones = [];
    state.templateId = null;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      /* ignore quota / private mode */
    }
    els.draftStatus.textContent = "";
    renderChips();
    renderTemplates();
    updatePrompt();
    showToast(t("toast.cleared"));
  }

  function scheduleSave() {
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(saveDraft, 280);
  }

  function saveDraft() {
    const draft = getDraft();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      if (state.promptText) els.draftStatus.textContent = t("draft.saved");
      else els.draftStatus.textContent = "";
    } catch (_) {
      els.draftStatus.textContent = "";
    }
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft.lang === "en" || draft.lang === "ar") state.lang = draft.lang;
      if (GOALS.includes(draft.goal)) els.goal.value = draft.goal;
      if (FORMATS.includes(draft.format)) els.format.value = draft.format;
      els.role.value = draft.role || "";
      els.task.value = draft.task || "";
      els.context.value = draft.context || "";
      els.constraints.value = draft.constraints || "";
      els.audience.value = draft.audience || "";
      if (Array.isArray(draft.tones)) {
        state.tones = draft.tones.filter((id) => TONES.some((tone) => tone.id === id));
      }
      if (TEMPLATES.some((tpl) => tpl.id === draft.templateId)) {
        state.templateId = draft.templateId;
      }
    } catch (_) {
      /* malformed draft */
    }
  }

  function bind() {
    ["input", "change"].forEach((evt) => {
      els.form.addEventListener(evt, (event) => {
        if (event.target && event.target.closest && event.target.closest(".chip")) return;
        state.templateId = null;
        renderTemplates();
        updatePrompt();
      });
    });

    els.btnCopy.addEventListener("click", handleCopy);
    els.btnCopyMobile.addEventListener("click", handleCopy);
    els.btnDownload.addEventListener("click", handleDownload);
    els.btnClear.addEventListener("click", handleClear);

    els.langToggle.addEventListener("click", () => {
      state.lang = state.lang === "ar" ? "en" : "ar";
      applyI18n();
    });

    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        handleCopy();
      }
    });
  }

  loadDraft();
  bind();
  applyI18n();
})();
