const prompt=(id,category,textArabic,textEnglish,modes,priority=1,followUpRules=[])=>({id,category,textArabic,textEnglish,context:category,priority,followUpRules,applicableModes:modes});
export const prompts=[
prompt('quick-events','event','شنو أهم الأشياء اللي صارت اليوم؟','What were the main things that happened today?',['quick']),
prompt('quick-feeling','emotion','شنو أقوى شعور عندك اليوم؟ ممكن أكثر من شعور.','What was your strongest feeling today?',['quick']),
prompt('quick-memory','memory','شنو الشيء الواحد اللي تريد تتذكره؟','What is one thing worth remembering?',['quick']),
prompt('wake','recall','من صحيت، شنو أول شيء سويته؟','What did you do after waking?',['normal','deep']),
prompt('next','recall','وبعدها شنو صار؟ اذكر موقفًا واحدًا.','What happened next?',['normal','deep']),
prompt('detail','details','شنو أكثر تفصيل تتذكره من هذا الموقف؟','What detail do you remember most?',['normal','deep','great']),
prompt('before','context','شنو صار قبل هذا الموقف مباشرة؟','What happened just before this?',['deep']),
prompt('thought','thought','شنو كان يدور ببالك وقتها؟','What was on your mind then?',['normal','deep','difficult']),
prompt('emotion','emotion','أي كلمات أقرب لشعورك بهذا الموقف؟','Which words fit your feelings?',['normal','deep','difficult','great']),
prompt('reaction','reaction','شلون تصرفت؟','How did you react?',['deep']),
prompt('meaning','meaning','ليش هذا الموقف يهمك؟','Why does this moment matter?',['normal','deep']),
prompt('perspective','reflection','هل توجد زاوية ثانية تشوف منها الموقف؟','Is there another perspective?',['deep']),
prompt('unresolved','reflection','شنو بعده مو محسوم بالنسبة إلك؟','What remains unresolved?',['deep']),
prompt('different','reflection','لو رجع الموقف، شنو تتمنى تسوي بشكل مختلف؟','What would you want to do differently?',['deep']),
prompt('memory','memory','لو تتذكر جملة واحدة من هذا الموقف، شتكون؟','What one sentence should Future You remember?',['normal','deep','great','difficult']),
prompt('summary','summary','لو توصف اليوم بجملة واحدة، شتقول؟','Describe today in one sentence.',['normal','deep','great','ordinary','difficult']),
prompt('learn','learning','شنو تعلمت أو انتبهت له اليوم؟','What did you learn or notice?',['deep']),
prompt('tomorrow','future','شيء تريد تحمله وياك لباجر؟','What do you want to carry into tomorrow?',['deep']),
prompt('hard-facts','event','شنو صار؟ احفظ الوقائع بالطريقة اللي تريحك.','What happened?',['difficult']),
prompt('hard-part','details','أي جزء أثر عليك أكثر؟','Which part affected you most?',['difficult']),
prompt('wish','reflection','شنو كنت تريد يصير بدل هذا؟','What did you want to happen instead?',['difficult']),
prompt('still','reflection','هل بعده الموضوع يشغل بالك؟','Is it still on your mind?',['difficult']),
prompt('great-facts','event','شنو صار وخلى هذا اليوم حلو؟','What happened on this good day?',['great']),
prompt('great-part','positive','شنو خلى الموقف حلو بالنسبة إلك؟','What made it good for you?',['great']),
prompt('great-company','relationships','منو كان جزءًا من هذا اليوم؟','Who was part of this day?',['great']),
prompt('great-relive','memory','أي لحظة تحب تعيشها مرة ثانية؟','What would you like to relive?',['great']),
prompt('ordinary-time','event','بشنو قضيت أغلب وقتك اليوم؟','What occupied most of your time?',['ordinary']),
prompt('ordinary-talk','relationships','ويا منو حكيت اليوم؟','Who did you speak to?',['ordinary']),
prompt('ordinary-food','sensory','شنو أكلت، شاهدت، أو سمعت؟','What did you eat, watch, or listen to?',['ordinary']),
prompt('ordinary-small','details','صار شيء صغير مضحك، مزعج، أو مريح؟','Was there a tiny funny, annoying, or relaxing moment?',['ordinary']),
prompt('ordinary-change','reflection','شنو اختلف عن البارحة؟','What was different from yesterday?',['ordinary']),
prompt('appreciate','gratitude','شيء أو شخص قدّرته اليوم؟ اختياري تمامًا.','Anything or anyone you appreciated?',['great','normal','deep']),
];
export const labels={event:'ما حدث',details:'تفاصيل أتذكرها',context:'قبل الموقف',thought:'ما كان ببالي',emotion:'كيف شعرت',reaction:'رد فعلي',meaning:'لماذا يهمني',reflection:'تأمل',memory:'ما أريد أن أتذكره',summary:'يومي بجملة',learning:'ما تعلمته',future:'لباجر',positive:'ما جعل اليوم جميلًا',relationships:'الناس في يومي',sensory:'تفاصيل عادية',gratitude:'شيء قدّرته'};
export const starters={event:['اليوم أنا…','صار موقف لما…','أكثر شيء أتذكره هو…'],difficult:['الموقف بدأ لما…','أكثر شيء ضايقني…','وقتها كنت أريد…'],great:['أحلى جزء كان…','الشيء اللي خلاها مميزة…','تفصيل ما أريد أنساه…'],ordinary:['قضيت أغلب اليوم…','حكيت ويا…','شيء اختلف عن البارحة…'],thought:['وقتها فكرت…','جزء مني حس…','وبنفس الوقت…'],memory:['تفصيل صغير ما أريد أنساه…','أحد قال…','أتذكر إني سمعت…']};
export const families=['مشاعر مريحة','حزن','غضب','خوف وقلق','خجل وإحراج','ذنب','خيبة أمل','وحدة','دهشة','نفور','ارتياح','هدوء','مودة','حماس','فخر','امتنان','حيرة'];
const word=(word,meaning,family,explanation,example,similar,difference)=>({word,meaning,family,explanation,example,similar,difference,category:'emotions'});
export const emotions=[
word('Content','راضٍ','مشاعر مريحة','مرتاح بما عندك الآن، حتى لو اليوم مو استثنائي.','خلصت يومًا عاديًا وشعرت أنه كافٍ.','هادئ، مسرور','الرضا أهدأ من الحماس، ويرتبط بالإحساس بالكفاية.'),
word('Joyful','مسرور','مشاعر مريحة','فرحة واضحة بسبب شيء يسعدك.','قضيت وقتًا حلوًا مع صديق.','سعيد، مبتهج','السرور أكثر نشاطًا من الرضا.'),
word('Sad','حزين','حزن','ثقل أو ألم بسبب فقد أو تجربة صعبة.','انتهى لقاء كنت تتمنى يطول.','متألم، محبط','الحزن لا يعني بالضرورة خيبة توقع.'),
word('Hurt','مجروح','حزن','شيء قيل أو حدث آلمك شخصيًا.','كلمة من شخص قريب أثرت عليك.','حزين، متألم','الجرح يركز على الإحساس بالأذى الشخصي.'),
word('Frustrated','متضايق من التعطّل','غضب','تريد تحقق شيئًا لكن العوائق تمنعك.','بحثت عن مقاسك وما لقيته.','منزعج، غاضب','التضايق هنا من عائق؛ الغضب قد يكون من ظلم أو تجاوز.'),
word('Angry','غاضب','غضب','انزعاج قوي من شيء رفضته أو حسّيته غير عادل.','أحد تجاهل اتفاقًا مهمًا إلك.','مستاء، منزعج','الغضب عادة أقوى من الانزعاج الخفيف.'),
word('Anxious','قلقان','خوف وقلق','توتر بشأن شيء يمكن أن يحدث.','تنتظر نتيجة امتحان.','متوتر، خائف','القلق يتعلق غالبًا بما قد يحدث؛ الخوف قد يكون من خطر حاضر.'),
word('Afraid','خائف','خوف وقلق','إحساس بأن شيئًا يهددك أو يزعجك.','واجهت موقفًا شعرت فيه بعدم الأمان.','قلقان، متوجس','الخوف يمكن أن يكون أكثر ارتباطًا بخطر محدد.'),
word('Embarrassed','محرَج','خجل وإحراج','شعور بأن الأنظار عليك بموقف ما ارتحت له.','غلطت بكلمة قدام ناس.','خجلان، مكشوف','الإحراج يتعلق بموقف؛ الخجل قد يظهر قبل الموقف أيضًا.'),
word('Ashamed','خجلان من نفسي','خجل وإحراج','شعور مزعج تجاه كيف ترى نفسك في الموقف.','تصرفت بطريقة ما انسجمت مع صورتك عن نفسك.','محرج، نادم','الذنب يركز على الفعل؛ هذا الشعور قد يركز على الذات.'),
word('Guilty','حاس بالذنب','ذنب','تعتقد أن فعلًا منك أضرّ بأحد أو خالف قيمة عندك.','قلت كلمة وتمنيت لو ما قلتها.','نادم، متأسف','الذنب يركز على ما فعلته؛ الندم قد يكون على فرصة ضائعة أيضًا.'),
word('Disappointed','خاب أملي','خيبة أمل','كنت تتوقع شيئًا أفضل، لكن الواقع ما وافق أملك.','ما صار اللقاء اللي كنت منتظره.','حزين، محبط','خيبة الأمل تربط الشعور بتوقع محدد.'),
word('Lonely','حاس بالوحدة','وحدة','تحتاج قربًا أو تواصلًا وما تحس أنه موجود.','كنت بين ناس لكن تمنيت أحد يفهمك.','منعزل، مشتاق','الوحدة شعور؛ العزلة قد تكون وضعًا تختاره وتستمتع به.'),
word('Surprised','متفاجئ','دهشة','حدث شيء غير متوقع. قد يكون حلوًا أو مزعجًا.','صديق زارك بدون موعد.','مندهش، مذهول','المفاجأة لا تحدد وحدها إن كان الشعور مريحًا.'),
word('Disgusted','نافر','نفور','رغبة في الابتعاد عن شيء لا تتقبله.','رائحة أو تصرف خلاك تنفر.','متقزز، منزعج','النفور رغبة بالابتعاد؛ الغضب قد يدفعك للمواجهة.'),
word('Relieved','مرتاح بعد قلق','ارتياح','زالت مشكلة أو انتهى انتظار كان يضغط عليك.','عرفت أن الأمر اللي كنت تخافه ما صار.','مطمئن، هادئ','الارتياح يأتي بعد ضغط؛ الهدوء لا يحتاج ضغطًا قبله.'),
word('Calm','هادئ','هدوء','توتر قليل ومساحة للتفكير أو الراحة.','جلست بهدوء بعد يوم مزدحم.','مطمئن، مسترخٍ','الهدوء يتعلق بحالتك الآن، وليس بالضرورة رضاك عن كل شيء.'),
word('Affectionate','حاس بالمودة','مودة','دفء وقرب تجاه شخص.','تصرف صغير من أخوك خلاك تحس بقربه.','محب، حنون','المودة دفء تجاه شخص؛ الامتنان يركز على تقدير شيء فعله.'),
word('Excited','متحمس','حماس','طاقة وحيوية تجاه شيء تنتظره أو تستمتع به.','تستعد لطلعة كنت تريدها.','مسرور، متشوق','يمكن للحماس والقلق أن يجتمعا.'),
word('Proud','فخور','فخر','تقدير لإنجاز أو تصرف يعبر عن قيمك.','سويت شيء صعب عليك وكملته.','راضٍ، معتز','الفخر يرتبط بإنجاز أو قيمة؛ السرور قد يأتي دون إنجاز.'),
word('Grateful','ممتن','امتنان','تقدر شيئًا أو شخصًا أضاف خيرًا لحياتك.','أحد ساعدك بوقت كنت تحتاجه.','شاكر، مقدّر','الامتنان اختياري ويمكن أن يجتمع مع مشاعر صعبة.'),
word('Confused','محتار','حيرة','الموقف أو مشاعرك بعد مو واضحة إلك.','شعرت بفرحة وقلق بنفس الوقت.','متردد، غير متأكد','الحيرة نقص وضوح؛ التردد يتعلق غالبًا باختيار.'),
word('Exhausted','منهك','هدوء','تعب شديد وقلة طاقة. وصف للطاقة أكثر من كونه شعورًا محددًا.','انتهى يوم طويل وحسيت ما عندك حيل.','متعب، مستنزف','يمكن أن تكون منهكًا ومرتاحًا أو حزينًا بنفس الوقت.')
];
export const uncertainQuestions=[{id:'valence',text:'هذا الإحساس مريح، مزعج، مختلط، لو محايد؟',choices:['مريح','مزعج','مختلط','محايد']},{id:'energy',text:'طاقتك عالية لو قليلة؟',choices:['عالية','قليلة','بين الاثنين']},{id:'direction',text:'تميل تقرب من الشيء لو تبتعد عنه؟',choices:['أقرب','أبتعد','مو متأكد']},{id:'trigger',text:'أي وصف قريب من اللي صار؟',choices:['فقدت شيئًا','حسيت بظلم','توقعت شيئًا مختلفًا','حسيت بإحراج','قلقت من شيء','صار شيء حلو بعد انتظار','أكثر من وصف','ولا واحد']}];
export function emotionSuggestions(answers){const trigger=answers.trigger;const map={'فقدت شيئًا':['Sad','Lonely','Hurt'],'حسيت بظلم':['Angry','Frustrated','Hurt'],'توقعت شيئًا مختلفًا':['Disappointed','Confused','Sad'],'حسيت بإحراج':['Embarrassed','Ashamed','Anxious'],'قلقت من شيء':['Anxious','Afraid','Confused'],'صار شيء حلو بعد انتظار':['Relieved','Joyful','Exhausted']};const names=map[trigger]||(answers.valence==='مريح'?['Content','Joyful','Calm','Grateful']:answers.valence==='مختلط'?['Excited','Anxious','Relieved','Exhausted']:answers.energy==='قليلة'?['Sad','Exhausted','Lonely','Calm']:['Confused','Frustrated','Anxious','Surprised']);return emotions.filter(e=>names.includes(e.word))}
export const exercises=[['three-good','ثلاثة أشياء حلوة',['شنو ثلاثة أشياء حلوة صارت؟','ليش كانت حلوة بالنسبة إلك؟']],['future-self','حياتي اللي أتمناها',['كيف تتمنى حياتك تكون مستقبلًا؟','شنو خطوة صغيرة تقربك منها؟']],['memory','ذكرى ما أريد أفقدها',['شنو الذكرى؟','أي تفاصيل تريد تبقى؟']],['change','شنو تغير هذا الشهر؟',['شنو تغير؟','شلون أثر عليك بحسب تجربتك؟']],['person','شخص أقدّره',['منو هذا الشخص؟','شنو تريد تتذكر عنه؟']],['lesson','شيء تعلمته بالطريقة الصعبة',['شنو صار؟','شنو تعلمت؟']],['decision','قرار مهم',['شنو القرار؟','شنو الخيارات والأسباب اللي فكرت بيها؟']]];
export const snapshotQuestions=['شنو يشغل وقتك حاليًا؟','ويا منو تقضي وقتك؟','شنو اهتماماتك هالأيام؟','شنو تشاهد أو تسمع؟','شنو تدرس أو تشتغل؟','شنو تنتظره بحماس؟','شنو مضايقك؟','شنو تحاول تحسنه؟','شنو يخلي أيامك العادية حلوة؟'];
