(function(){
  document.getElementById('year').textContent = new Date().getFullYear();

  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', function(){
    var open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
      if(a.getAttribute('href').charAt(0) === '#'){
        navA.forEach(function(link){
          link.classList.toggle('active', link === a);
        });
      }
    });
  });

  var sections = document.querySelectorAll('main section[id]');
  var navA = document.querySelectorAll('.nav-links a[href^="#"]');
  var navObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var id = entry.target.getAttribute('id');
        navA.forEach(function(a){
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(function(s){ navObserver.observe(s); });

  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function(el){ revealObserver.observe(el); });

  document.querySelectorAll('.exp-more').forEach(function(button){
    button.addEventListener('click', function(){
      var card = button.closest('.exp-card');
      var expanded = card.classList.toggle('expanded');
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      button.innerHTML = expanded
        ? 'Hide tasks <span aria-hidden="true">&#8593;</span>'
        : 'View tasks performed <span aria-hidden="true">&#8594;</span>';
    });
  });

  var certViewer = document.getElementById('certViewer');
  var viewCertification = document.getElementById('viewCertification');
  var closeCertification = document.getElementById('closeCertification');
  viewCertification.addEventListener('click', function(){ certViewer.showModal(); });
  closeCertification.addEventListener('click', function(){ certViewer.close(); });
  certViewer.addEventListener('click', function(event){
    if(event.target === certViewer){ certViewer.close(); }
  });

  var powerBiViewer = document.getElementById('powerBiViewer');
  var viewPowerBiCertification = document.getElementById('viewPowerBiCertification');
  var closePowerBiCertification = document.getElementById('closePowerBiCertification');
  viewPowerBiCertification.addEventListener('click', function(){ powerBiViewer.showModal(); });
  closePowerBiCertification.addEventListener('click', function(){ powerBiViewer.close(); });
  powerBiViewer.addEventListener('click', function(event){
    if(event.target === powerBiViewer){ powerBiViewer.close(); }
  });

  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var subject = form.subject.value.trim();
    var message = form.message.value.trim();
    var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
    var mailto = 'mailto:evansombato@gmail.com'
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);
    window.location.href = mailto;
    status.textContent = 'Opening your email client to send this message to Evans...';
    setTimeout(function(){ status.textContent = ''; }, 6000);
  });
})();
