/* FortBoost AI — interactive illustrative PC recommendations. No device scanning. */
(() => {
  const host = document.querySelector('#demo.demo-host');
  if (!host) return;
  const fr = document.documentElement.lang === 'fr';
  const t = fr ? {
    heading:'Choisis une configuration', intro:'Simulation pédagogique : aucun matériel n’est analysé et aucun gain n’est garanti.',
    config:'Configuration', finding:'Point à vérifier', advice:'Recommandation ciblée', reason:'Pourquoi ?', note:'Données fictives de démonstration',
    items:[
      {name:'PC AMD compétitif',cpu:'Ryzen 7 7800X3D',gpu:'GeForce RTX 4070 SUPER',ram:'32 Go DDR5',issue:'Écran 240 Hz configuré à 60 Hz dans cet exemple',advice:'Vérifier le mode de rafraîchissement réellement pris en charge avant toute modification.',why:'Le réglage dépend de l’écran, du câble et du mode vidéo ; il ne crée pas de FPS supplémentaires.'},
      {name:'PC Intel polyvalent',cpu:'Core i7-13700K',gpu:'GeForce RTX 3060 Ti',ram:'16 Go DDR4',issue:'Pression mémoire élevée dans une session fictive',advice:'Mesurer pagination et processus actifs avant de recommander la fermeture d’applications.',why:'Une utilisation mémoire élevée n’est pas, à elle seule, la preuve d’un problème.'},
      {name:'PC e-sport accessible',cpu:'Ryzen 5 5600',gpu:'Radeon RX 6600',ram:'16 Go DDR4',issue:'Irrégularité possible des temps de rendu',advice:'Comparer les temps de rendu sur une scène reproductible avant de modifier les paramètres graphiques.',why:'Il faut distinguer les limites CPU, GPU et les fluctuations normales du jeu.'}
    ]
  } : {
    heading:'Choose a configuration',intro:'Educational simulation: no hardware is scanned and no improvement is guaranteed.',
    config:'Configuration',finding:'What to check',advice:'Hardware-specific recommendation',reason:'Why?',note:'Illustrative fictional data',
    items:[
      {name:'Competitive AMD PC',cpu:'Ryzen 7 7800X3D',gpu:'GeForce RTX 4070 SUPER',ram:'32 GB DDR5',issue:'240 Hz monitor set to 60 Hz in this example',advice:'Verify supported refresh modes before changing any display setting.',why:'The correct setting depends on the monitor, cable and video mode; it does not increase game FPS.'},
      {name:'Versatile Intel PC',cpu:'Core i7-13700K',gpu:'GeForce RTX 3060 Ti',ram:'16 GB DDR4',issue:'High memory pressure in a fictional session',advice:'Measure paging and background processes before recommending changes.',why:'High memory utilization alone does not prove a performance issue.'},
      {name:'Entry esports PC',cpu:'Ryzen 5 5600',gpu:'Radeon RX 6600',ram:'16 GB DDR4',issue:'Potentially inconsistent frame times',advice:'Compare frame times in repeatable gameplay before changing graphics settings.',why:'CPU/GPU bottlenecks must be separated from normal game variation.'}
    ]
  };
  host.innerHTML = '';
  const title=document.createElement('h3');title.textContent=t.heading;host.append(title);
  const intro=document.createElement('p');intro.textContent=t.intro;host.append(intro);
  const tabs=document.createElement('div');tabs.className='demo-tabs';tabs.setAttribute('role','group');tabs.setAttribute('aria-label',t.config);host.append(tabs);
  const panel=document.createElement('div');panel.className='fort-demo-panel';panel.setAttribute('aria-live','polite');host.append(panel);
  const label=(name,value)=>{const p=document.createElement('p');const b=document.createElement('strong');b.textContent=name+': ';p.append(b,document.createTextNode(value));return p;};
  const show=(i)=>{tabs.querySelectorAll('button').forEach((b,j)=>{b.classList.toggle('selected',j===i);b.setAttribute('aria-pressed',String(i===j));});const x=t.items[i];panel.replaceChildren(label('CPU',x.cpu),label('GPU',x.gpu),label('RAM',x.ram),label(t.finding,x.issue),label(t.advice,x.advice),label(t.reason,x.why));};
  t.items.forEach((x,i)=>{const b=document.createElement('button');b.type='button';b.textContent=x.name;b.addEventListener('click',()=>show(i));tabs.append(b);});
  const foot=document.createElement('p');foot.className='micro';foot.textContent=t.note;host.append(foot);show(0);
})();
