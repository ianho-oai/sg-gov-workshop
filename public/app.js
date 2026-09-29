(() => {
'use strict';
const data=window.WORKSHOP_DATA,$=id=>document.getElementById(id),storageKey='sg-workshop-sessions-v3';
let adventureOpen=true;
const tourKey='sg-workshop-tour-v1';
let tour=null,tourFrame=0;
const adventureIds=new Set(['citizen-feedback','grant-review','scam-education','jc-economics']);
let positions={},current=data.tracks[0],step=0,toastTimer=null,tipTimer=null,dismissedTip=null;
try{const saved=JSON.parse(localStorage.getItem(storageKey)||JSON.stringify(Object.fromEntries(Object.entries(JSON.parse(localStorage.getItem('sg-workshop-sessions-v2')||'{}')).map(([k,v])=>[k,v+1]))));if(saved&&typeof saved==='object'&&!Array.isArray(saved))positions=saved;}catch{}
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const providerKey='sg-workshop-email-provider';
const providers={
 gmail:{label:'Gmail',plugin:'Gmail',account:'Google',image:'assets/gmail-setup.png',selection:'Select Gmail — Read and manage Gmail, as shown below.'},
 outlook:{label:'Outlook',plugin:'Outlook Email',account:'Microsoft',image:'assets/outlook-setup.png',selection:'Select Outlook Email — Triage Outlook inboxes, as shown below. Use the + beside Outlook Email.'}
};
let emailProvider='gmail';
try{const saved=localStorage.getItem(providerKey);if(Object.hasOwn(providers,saved))emailProvider=saved;}catch{}
function emailText(text){return text.replace(/Gmail/g,providers[emailProvider].plugin).replace(/Google account/g,providers[emailProvider].account+' account');}
function promptText(s){
 let text=s.prompt.replace(/copy into Outlook/g,'copy into '+providers[emailProvider].label);
 if(s.number===9)text=emailText(text);
 if(current.kind!=='api'&&s.number===7)text+='\n- After checking for duplicates and applying the review rules above, use the '+providers[emailProvider].plugin+' plugin to save eligible drafts when the source permits mailbox drafts and a usable recipient is available. Otherwise keep them in the Word draft file. Record the actual outcome; do not claim a mailbox draft exists if it was not saved. Do not send them.';
 return text;
}
const copyIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>';
const features=[
 {id:'new-chat',name:'New chat',icon:'<path d="M12 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7M16 3l5 5M10 14l-1 4 4-1L22 8l-5-5z"/>',description:'Start a fresh conversation for a new question or task.',example:'For this workshop, use a separate chat for each track and keep its prompts together.'},
 {id:'library',name:'Library',icon:'<rect x="3" y="4" width="4" height="16" rx="1"/><rect x="9" y="4" width="4" height="16" rx="1"/><path d="m15 5 4-1 4 15-4 1z"/>',description:'Find, download and reuse files you upload or create in ChatGPT.',example:'Useful for returning to a briefing document, spreadsheet or finished report.'},
 {id:'projects',name:'Projects',icon:'<path d="M3 7V5a2 2 0 0 1 2-2h5l3 4h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM3 8h18"/>',description:'Keep related chats, reference files and shared instructions together for ongoing work.',example:'For example, organise the briefs and analysis for a recurring programme review.'},
 {id:'scheduled',name:'Scheduled',icon:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l-4 3"/>',description:'Manage tasks that run later or repeat on a schedule, where supported.',example:'For example, schedule a recurring briefing after testing the workflow. No schedule is activated in this guide.'},
 {id:'plugins',name:'Plugins',icon:'<path d="M8 3h8v5h3a3 3 0 0 1 0 6h-3v7H8v-5H5a3 3 0 0 1 0-6h3V3z"/>',description:'Add capabilities and connect approved tools or services to your work.',example:'For example, use a permitted email or document integration. Access depends on your account and workspace settings.'}
];
$('feature-nav').innerHTML=features.map(f=>`<button class="feature-button" data-feature="${f.id}" aria-describedby="feature-popover"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${f.icon}</svg>${f.name}</button>`).join('');
function hideTip(){clearTimeout(tipTimer);$('feature-popover').hidden=true;}
function showTip(button){clearTimeout(tipTimer);if(dismissedTip===button.dataset.feature)return;const f=features.find(x=>x.id===button.dataset.feature),tip=$('feature-popover');tip.innerHTML=`<strong>${f.name}</strong><p>${escape(f.description)}</p><small>${escape(f.example)}</small>`;tip.hidden=false;const r=button.getBoundingClientRect(),w=tip.offsetWidth,h=tip.offsetHeight;tip.style.left=Math.min(innerWidth-w-12,innerWidth<=620?12:r.right+13)+'px';tip.style.top=Math.max(12,Math.min(innerHeight-h-12,innerWidth<=620?r.bottom+8:r.top))+'px';}
for(const b of $('feature-nav').querySelectorAll('button')){b.addEventListener('mouseenter',()=>{dismissedTip=null;showTip(b);});b.addEventListener('mouseleave',()=>{tipTimer=setTimeout(hideTip,180);});b.addEventListener('focus',()=>{dismissedTip=null;showTip(b);});b.addEventListener('blur',hideTip);b.addEventListener('click',()=>{dismissedTip=null;showTip(b);});}
$('feature-popover').addEventListener('mouseenter',()=>clearTimeout(tipTimer));$('feature-popover').addEventListener('mouseleave',hideTip);window.addEventListener('resize',hideTip);window.addEventListener('scroll',hideTip,true);
const lastStep=id=>(data.tracks.find(t=>t.id===id)||data.tracks[0]).steps.length-1;
const savedStep=id=>positions[id]==='assignment'?'assignment':Number.isInteger(positions[id])?Math.max(0,Math.min(lastStep(id),positions[id])):0;
function toast(text){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2600);}
function navigate(id,n){hideTip();const hash='#'+id+'/'+n;if(location.hash===hash)render();else location.hash=hash;}
function move(delta){if(current.kind==='prompt')return;const order=[0,'assignment',...current.steps.slice(1).map(s=>s.number)];navigate(current.id,order[Math.max(0,Math.min(order.length-1,order.indexOf(step)+delta))]);}
function resourceLink(file,subtitle){const type=file.split('.').pop().toLowerCase();return `<a class="file-card file-${escape(type)}" href="${escape(current.baseUrl+file)}" download><span class="file-badge">${({docx:'WORD',xlsx:'EXCEL',pdf:'PDF',png:'IMAGE',csv:'CSV'})[type]||'FILE'}</span><span class="file-meta"><strong>${escape(file)}</strong><small>Click to download <span aria-hidden="true">↓</span></small></span></a>`;}
function render(){
 const tabFocused=document.activeElement?.matches('[role="tab"]');
 const raw=location.hash.replace(/^#/,'').split('/');current=data.tracks.find(t=>t.id===raw[0])||data.tracks[0];step=raw[1]==='assignment'?'assignment':Math.max(0,Math.min(lastStep(current.id),parseInt(raw[1],10)||0));positions[current.id]=step;
 try{localStorage.setItem(storageKey,JSON.stringify(positions));}catch{}
 const s=step==='assignment'?{resources:[],prompt:''}:current.steps[step],provider=providers[emailProvider];document.querySelector('.email-provider').hidden=['api','prompt'].includes(current.kind);document.querySelector('.prompt-pagination>div>span').textContent='Continue in the same '+(['api','prompt'].includes(current.kind)?'Codex':'ChatGPT')+' conversation';for(const button of document.querySelectorAll('[data-email-provider]'))button.setAttribute('aria-pressed',String(button.dataset.emailProvider===emailProvider));document.title=current.name+' · Workshop chat';$('track-title').textContent=current.name;$('track-description').textContent=current.description;
 const trackButton=t=>`<button class="track-button ${t.id===current.id?'active':''}" data-track="${t.id}" ${t.id===current.id?'aria-current="page"':''}><span class="chat-title">${escape(t.name)}</span><span class="session-position">${t.kind==='prompt'?'Prompt':savedStep(t.id)===0?'Setup':savedStep(t.id)==='assignment'?'Assignment':savedStep(t.id)+'/'+lastStep(t.id)}</span></button>`;
 $('track-nav').innerHTML=`<details id="adventure-group" class="adventure-group ${adventureIds.has(current.id)?'contains-active':''}" ${adventureOpen?'open':''}><summary><svg class="adventure-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg><span>Choose your adventure</span></summary><div class="adventure-tracks">${data.tracks.filter(t=>adventureIds.has(t.id)).map(trackButton).join('')}</div></details>${data.tracks.filter(t=>!adventureIds.has(t.id)).map(trackButton).join('')}`;
 $('adventure-group').addEventListener('toggle',e=>{if(e.target.isConnected)adventureOpen=e.target.open;});

 const promptOnly=current.kind==='prompt';$('step-tabs').hidden=promptOnly;document.querySelector('.navigation-area').hidden=promptOnly;
 if(promptOnly){
  step=0;positions[current.id]=0;
  $('messages').removeAttribute('aria-labelledby');$('messages').setAttribute('aria-label','Landmark prompt');
  $('messages').innerHTML=`<section class="message-block"><div class="user-message"><div class="message-header"><strong>Landmark prompt</strong><button class="copy-btn" data-copy="0" aria-label="Copy landmark prompt">${copyIcon} Copy prompt</button></div><div class="prompt-content" id="prompt-0" tabindex="0" aria-label="Prompt text">${escape(current.steps[0].prompt).replace(escape("<insert your Singapore location here>"), '<mark class="location-placeholder" title="Replace this with your chosen Singapore location">'+escape("<insert your Singapore location here>")+'</mark>')}</div></div></section>`;
  return;
 }
 $('messages').removeAttribute('aria-label');
 const labels=current.stepLabels||['Setup','Introduction','Brainstorm','Document','Data analysis','Dashboard','Visualisation','Email','Build a site'];
 const tab=(key,label)=>`<button id="tab-${key}" role="tab" aria-selected="${key===step}" aria-controls="messages" tabindex="${key===step?'0':'-1'}" class="step-tab ${key===step?'active':''}" data-step="${key}">${key==='assignment'?'':`<span>${key}</span>`}${escape(label)}</button>`;
 $('step-tabs').innerHTML=current.steps.map((s,i)=>tab(i,labels[i])+(i===0?tab('assignment','Your assignment'):'')).join('');
 $('messages').setAttribute('aria-labelledby','tab-'+step);
 const setup=s.setupType==='api'?`<section class="setup-guide">${s.setupSections.map(section=>`<h2>${escape(section.title)}</h2><ol>${section.items.map(item=>`<li>${escape(item)}</li>`).join('')}</ol>`).join('')}<div class="setup-reference-links">${s.references.map(ref=>`<a href="${escape(ref.url)}" target="_blank" rel="noopener noreferrer">${escape(ref.label)}</a>`).join(' · ')}</div></section>`:s.checklist?`<section class="setup-guide"><h2>Before you begin</h2><ol>${s.checklist.map(x=>`<li>${escape(emailText(x))}</li>`).join('')}</ol><h2>If ${provider.plugin} is not connected</h2><ol>${s.connectionSteps.map((x,i)=>`<li>${escape(i===1?provider.selection:emailText(x))}</li>`).join('')}</ol><details><summary>View ${provider.plugin} plugin reference</summary><img src="${provider.image}" alt="Plugins search results. ${escape(provider.selection)}"></details><p class="setup-help">If ${provider.plugin} is unavailable or disabled, ask the facilitator to check account access.</p></section>`:'';
 const files=s.resources.map(r=>resourceLink(r.file,r.hint||'Download and upload before this prompt')).join('');
 const resources=files?`<section id="prompt-resources" class="prompt-resources" aria-label="Download resources"><h2>Download resources</h2><p>Click each file to download, then upload it to your ${current.kind==='api'?'Codex':'ChatGPT'} conversation before starting this task.</p><div id="step-resources">${files}</div></section>`:'';
 const overview=step==='assignment'?`<section class="track-overview" aria-label="Your role and assignment"><h2>Your assignment</h2><div class="overview-grid"><div><h3>Your role</h3><p>${escape(current.overview.role)}</p><h3>Your task</h3><p>${escape(current.overview.task)}</p></div><div><h3>What you’ll create</h3><ul>${current.overview.outputs.map(x=>`<li>${escape(x)}</li>`).join('')}</ul></div></div>${current.overview.context?`<h3>The situation</h3><ul>${current.overview.context.map(x=>`<li>${escape(x)}</li>`).join('')}</ul>`:''}${current.overview.success?`<h3>What success looks like</h3><ul>${current.overview.success.map(x=>`<li>${escape(x)}</li>`).join('')}</ul>`:''}</section>`:'';
 $('messages').innerHTML=step==='assignment'?overview:`<section class="message-block" id="message-${step}"><div class="user-message"><div class="message-header"><strong>${escape(s.name)}</strong><span>~${s.minutes} min</span></div>${setup}${resources}${step>0&&s.prompt?`<section class="task-objective" aria-labelledby="task-heading-${step}"><h2 id="task-heading-${step}">Your Task:</h2>${s.situation?`<h3>Situation</h3><p>${escape(s.situation)}</p><h3>Objective</h3>`:''}<p>${escape(s.objective)}</p>${s.deliverables?`<h3>What to produce</h3><ul>${s.deliverables.map(item=>`<li>${escape(item)}</li>`).join('')}</ul>`:''}</section><details class="model-answer"><summary><span class="expand-label">Expand model answer</span><span class="collapse-label">Collapse model answer</span></summary><div class="model-answer-content"><h2 class="proposed-prompt-heading">Proposed Prompt:</h2><div class="prompt-content" id="prompt-${step}" tabindex="0" aria-label="Prompt text">${escape(promptText(s))}</div><div class="message-actions"><button class="copy-btn" data-copy="${step}" aria-label="Copy ${escape(s.name)} prompt">${copyIcon} Copy prompt</button></div></div></details>`:''}</div></section>`;
 $('step-count').textContent=step==='assignment'?'Your assignment':step===0?'Step 0 · Setup':'Step '+step+' of '+lastStep(current.id);$('previous').disabled=step===0;$('next').disabled=step===lastStep(current.id);
 if(tabFocused){$('tab-'+step).focus({preventScroll:true});$('tab-'+step).scrollIntoView({block:'nearest',inline:'nearest'});}
}
document.addEventListener('click',async e=>{
 if(!e.target.closest('[data-feature],#feature-popover'))hideTip();
 const providerButton=e.target.closest('[data-email-provider]');if(providerButton){emailProvider=providerButton.dataset.emailProvider;try{localStorage.setItem(providerKey,emailProvider);}catch{}render();return;}
 const track=e.target.closest('[data-track]');if(track){navigate(track.dataset.track,savedStep(track.dataset.track));return;}
 const stage=e.target.closest('[data-step]');if(stage){navigate(current.id,stage.dataset.step==='assignment'?'assignment':Number(stage.dataset.step));return;}
 const copy=e.target.closest('[data-copy]');if(!copy)return;const text=promptText(current.steps[Number(copy.dataset.copy)]);let copied=false;
 try{await navigator.clipboard.writeText(text);copied=true;}catch{const input=document.createElement('textarea');input.value=text;input.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(input);input.select();try{copied=document.execCommand('copy');}catch{}input.remove();}
 if(copied){copy.textContent='✓ Copied';toast('Copied. Paste directly into your '+(['api','prompt'].includes(current.kind)?'Codex':'ChatGPT')+' conversation.');setTimeout(()=>{if(copy.isConnected)copy.innerHTML=copyIcon+' Copy prompt';},2200);}else{const parent=copy.closest('.user-message');let input=parent.querySelector('textarea');if(!input){input=document.createElement('textarea');input.className='manual-copy';input.setAttribute('aria-label','Select and copy this prompt');input.value=text;parent.append(input);}input.focus();input.select();toast('Select and copy the prompt with Cmd+C or Ctrl+C.');}
});
$('previous').addEventListener('click',()=>move(-1));$('next').addEventListener('click',()=>move(1));
document.addEventListener('keydown',e=>{if(tour)return;if(e.key==='Escape'){dismissedTip=document.activeElement?.dataset.feature;hideTip();return;}if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||$('help-dialog').open||e.target.closest('input,textarea,[contenteditable="true"],.prompt-content,[data-email-provider]'))return;if(e.target.matches('[role="tab"]')&&(e.key==='Home'||e.key==='End')){e.preventDefault();navigate(current.id,e.key==='Home'?0:lastStep(current.id));return;}if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);}});
$('reset').addEventListener('click',()=>{positions={};try{localStorage.removeItem(storageKey);}catch{}navigate(current.id,0);toast('Session progress reset.');});
$('help').addEventListener('click',()=>$('help-dialog').showModal());$('close-help').addEventListener('click',()=>$('help-dialog').close());$('understood').addEventListener('click',()=>$('help-dialog').close());window.addEventListener('hashchange',()=>{if(tour)finishTour();render();});render();

const tourSteps=[
 {target:'#adventure-group',title:'Choose your adventure',description:'Open this group and pick one of the four government workflows. Complete Setup, then read Your assignment to understand your role and goal.'},
 {target:'#next',title:'Move through the steps',description:'Click the right arrow below the task to continue. The left arrow takes you back, and the numbered tabs let you jump to any step.'},
 {target:'#prompt-resources',title:'Download your resources',description:'Click each file to download it, then upload it to your ChatGPT conversation before starting the task. Resources appear only where you need them.'},
 {target:'.model-answer > summary',title:'Reveal the model prompt',description:'Read Your Task and try your own prompt first. For help, click Expand model answer, then Copy prompt and paste it into the same ChatGPT conversation.'},
 {target:'[data-track="advanced-api"]',title:'Ready for a harder challenge?',description:'Choose Advanced API to build an assistant with OpenAI APIs, including image generation and live voice. This track uses Codex and requires an API key.'}
];
function positionTour(){
 if(!tour)return;
 const target=document.querySelector(tourSteps[tour.index].target),card=$('tour-card'),highlight=$('tour-highlight');
 if(!target)return;
 let r=target.getBoundingClientRect();
 const pad=6,gap=18,margin=14,w=card.offsetWidth,h=card.offsetHeight;
 if(r.right+pad+gap+w>innerWidth-margin&&r.top-pad-gap-h<margin&&r.bottom+pad+gap+h>innerHeight-margin&&r.height+h+gap+pad*2+margin*2<=innerHeight){
  window.scrollBy({top:r.top-margin-pad,left:0,behavior:'instant'});r=target.getBoundingClientRect();
 }
 const left=Math.max(4,r.left-pad),top=Math.max(4,r.top-pad),right=Math.min(innerWidth-4,r.right+pad),bottom=Math.min(innerHeight-4,r.bottom+pad);
 Object.assign(highlight.style,{left:left+'px',top:top+'px',width:Math.max(0,right-left)+'px',height:Math.max(0,bottom-top)+'px'});
 let x=Math.min(innerWidth-w-margin,Math.max(margin,left)),y=bottom+gap;
 if(right+gap+w<=innerWidth-margin){x=right+gap;y=Math.max(margin,top);}
 else if(top-gap-h>=margin)y=top-gap-h;
 else if(y+h>innerHeight-margin)y=innerHeight-h-margin;
 Object.assign(card.style,{left:Math.max(margin,x)+'px',top:Math.max(margin,Math.min(innerHeight-h-margin,y))+'px'});
}
function queueTourPosition(){cancelAnimationFrame(tourFrame);tourFrame=requestAnimationFrame(positionTour);}
function showTourStep(){
 if(!tour)return;
 const item=tourSteps[tour.index];
 // Preview a resource-bearing step without changing saved workshop progress.
 history.replaceState(null,'',tour.url.split('#')[0]+'#'+tour.track+'/'+(tour.index===1?0:1));
 adventureOpen=true;render();positions={...tour.positions};
 try{localStorage.setItem(storageKey,JSON.stringify(positions));}catch{}
 $('tour-count').textContent='QUICK TOUR · '+(tour.index+1)+' / '+tourSteps.length;
 $('tour-title').textContent=item.title;$('tour-description').textContent=item.description;
 $('tour-back').disabled=tour.index===0;$('tour-next').textContent=tour.index===tourSteps.length-1?'Let’s begin':'Next';
 const target=document.querySelector(item.target);
 target.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
 positionTour();$('tour-next').focus({preventScroll:true});queueTourPosition();
}
function startTour(){
 if(tour)return;
 hideTip();
 tour={index:0,url:location.href,positions:{...positions},track:adventureIds.has(current.id)?current.id:'citizen-feedback',adventureOpen,scrollX,scrollY,sidebarScroll:document.querySelector('.sidebar').scrollTop,focus:document.activeElement};
 $('walkthrough').showModal();showTourStep();
}
function finishTour(){
 if(!tour)return;
 const previous=tour;tour=null;cancelAnimationFrame(tourFrame);$('walkthrough').close();
 history.replaceState(null,'',previous.url);positions=previous.positions;adventureOpen=previous.adventureOpen;render();
 try{localStorage.setItem(tourKey,'seen');}catch{}
 document.querySelector('.sidebar').scrollTop=previous.sidebarScroll;
 if(previous.focus?.isConnected&&previous.focus!==document.body)previous.focus.focus({preventScroll:true});
 window.scrollTo({left:previous.scrollX,top:previous.scrollY,behavior:'instant'});
}
$('tour-next').addEventListener('click',()=>{if(tour.index===tourSteps.length-1)finishTour();else{tour.index++;showTourStep();}});
$('tour-back').addEventListener('click',()=>{if(tour.index>0){tour.index--;showTourStep();}});
$('tour-skip').addEventListener('click',finishTour);
$('walkthrough').addEventListener('cancel',e=>{e.preventDefault();finishTour();});
$('replay-tour').addEventListener('click',()=>{$('help-dialog').close();startTour();});
$('guide').addEventListener('click',startTour);
window.addEventListener('resize',queueTourPosition);window.addEventListener('scroll',queueTourPosition,true);
let seenTour=false;try{seenTour=localStorage.getItem(tourKey)==='seen';}catch{}
if(!seenTour)requestAnimationFrame(startTour);

})();
