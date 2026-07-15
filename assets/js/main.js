(() => {
  const toggle=document.querySelector('.nav-toggle');
  const links=document.querySelector('.nav-links');
  if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));}
  const file=location.pathname.split('/').pop()||'index.html';
  const group=file.startsWith('project-')||file==='projects.html'?'projects.html':file;
  document.querySelectorAll('.nav-links a').forEach(a=>{const href=a.getAttribute('href');if(href===group||(href==='index.html'&&file===''))a.setAttribute('aria-current','page');});
  const progress=document.querySelector('.progress');
  const updateProgress=()=>{if(!progress)return;const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?(scrollY/max)*100:0)+'%';};
  addEventListener('scroll',updateProgress,{passive:true});updateProgress();
  const observer='IntersectionObserver'in window?new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.08,rootMargin:'0px 0px -40px'}):null;
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=Math.min(i%5,4)*55+'ms';observer?observer.observe(el):el.classList.add('is-visible');});
  const parallax=document.querySelector('[data-parallax]');
  if(parallax&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    parallax.addEventListener('pointermove',e=>{const r=parallax.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;parallax.style.transform=`perspective(1000px) rotateY(${x*4}deg) rotateX(${-y*4}deg)`;});
    parallax.addEventListener('pointerleave',()=>{parallax.style.transform='';});
  }
  const lb=document.querySelector('.lightbox');
  if(lb){const image=lb.querySelector('img');const close=()=>{lb.classList.remove('open');image.removeAttribute('src');document.body.style.overflow='';};document.querySelectorAll('[data-lightbox]').forEach(btn=>btn.addEventListener('click',()=>{image.src=btn.dataset.lightbox;image.alt=btn.querySelector('img')?.alt||'';lb.classList.add('open');document.body.style.overflow='hidden';lb.querySelector('button').focus();}));lb.querySelector('button').addEventListener('click',close);lb.addEventListener('click',e=>{if(e.target===lb)close();});addEventListener('keydown',e=>{if(e.key==='Escape')close();});}
})();