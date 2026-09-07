(function(){
  var burger=document.getElementById('burgerBtn'), menu=document.getElementById('mobileMenu'), close=document.getElementById('mobileClose');
  function openMenu(){ menu.classList.add('open'); burger.setAttribute('aria-expanded','true'); }
  function closeMenu(){ menu.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
  burger.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  var reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, {threshold:.12});
    reveals.forEach(function(el){ io.observe(el); });
  } else { reveals.forEach(function(el){ el.classList.add('is-visible'); }); }

  var floatCta=document.getElementById('floatCta'), heroEl=document.getElementById('top'), bookEl=document.getElementById('book');
  function toggleFloat(){
    var heroBottom=heroEl.getBoundingClientRect().bottom, bookTop=bookEl.getBoundingClientRect().top, vh=window.innerHeight;
    if(heroBottom<0 && bookTop>vh*0.5){ floatCta.classList.add('show'); } else { floatCta.classList.remove('show'); }
  }
  window.addEventListener('scroll', toggleFloat, {passive:true});
  toggleFloat();

  // filters
  var filterBtns=document.querySelectorAll('.filter-btn');
  var figs=document.querySelectorAll('#gallery figure');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f=btn.getAttribute('data-filter');
      figs.forEach(function(fig){
        var show = (f==='all' || fig.getAttribute('data-cat')===f);
        fig.classList.toggle('hidden-item', !show);
      });
    });
  });

  // lightbox (only visible figures)
  var lb=document.getElementById('lightbox'), lbImg=document.getElementById('lbImg'), lbCap=document.getElementById('lbCap');
  var current=0, lastFocused=null;
  function visibleFigs(){ return Array.prototype.filter.call(figs, function(f){ return !f.classList.contains('hidden-item'); }); }
  function show(i){
    var vf=visibleFigs(); current=(i+vf.length)%vf.length;
    var fig=vf[current], img=fig.querySelector('img');
    lbImg.src=img.src; lbImg.alt=img.alt; lbCap.textContent=fig.getAttribute('data-caption')||'';
  }
  function openLb(fig){
    lastFocused=document.activeElement;
    var vf=visibleFigs(); show(vf.indexOf(fig));
    lb.classList.add('open'); document.getElementById('lbClose').focus(); document.body.style.overflow='hidden';
  }
  function closeLb(){ lb.classList.remove('open'); document.body.style.overflow=''; if(lastFocused){ lastFocused.focus(); } }
  figs.forEach(function(fig){
    fig.addEventListener('click', function(){ openLb(fig); });
    fig.setAttribute('tabindex','0'); fig.setAttribute('role','button');
    fig.setAttribute('aria-label','Agrandir : '+(fig.getAttribute('data-caption')||''));
    fig.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openLb(fig); } });
  });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', function(){ show(current-1); });
  document.getElementById('lbNext').addEventListener('click', function(){ show(current+1); });
  lb.addEventListener('click', function(e){ if(e.target===lb){ closeLb(); } });
  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape'){ closeLb(); } if(e.key==='ArrowLeft'){ show(current-1); } if(e.key==='ArrowRight'){ show(current+1); }
  });

  // form validation
  var form=document.getElementById('bookForm');
  var status=document.getElementById('formStatus');
  form.addEventListener('submit', function(e){
    var valid=true;
    form.querySelectorAll('[data-required="true"]').forEach(function(field){
      var input=field.querySelector('input,select,textarea');
      var ok = input.type==='email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value) : input.value.trim().length>0;
      field.classList.toggle('invalid', !ok);
      if(!ok) valid=false;
    });
    if(document.getElementById('company_website').value){ valid=false; }
    if(!valid){
      e.preventDefault();
      status.textContent='Merci de vérifier les champs en rouge.';
      status.className='form-status error';
      return;
    }
    if(form.action.indexOf('YOUR_FORM_ID')!==-1){
      e.preventDefault();
      status.textContent="Formulaire prêt techniquement — à connecter à un vrai endpoint (Formspree) avant mise en ligne.";
      status.className='form-status error';
    }
  });
})();
