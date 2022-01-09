 $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  $(document).ready(function(){
    $("a#Privacy").click(function(){
        $("#PrivacyModal").modal('show');
    });
});

  $(document).ready(function(){
    $("a#Terms").click(function(){
        $("#TermsModal").modal('show');
    });
});
  
 $(document).ready(function(){
    $("a#FAQ").click(function(){
        $("#FAQModal").modal('show');
    });
});


  const navBar = document.querySelector('.navbar');
  const navBrand = document.querySelector('.navbar-brand');
  const navLinks = document.querySelectorAll('.nav-link')
  
function changeNav() {
  if (document.body.scrollTop !== 0 || document.documentElement.scrollTop !== 0) {
    navBar.style.backgroundColor = 'white';
    navBrand.style.color = 'grey';
    navLinks.forEach(link => link.style.color = 'grey');
  }  else {
    navBar.style.backgroundColor = 'transparent';
    navBrand.style.color = '#ffc107';
    navLinks.forEach(link => link.style.color = '#ffc107');
  }
};

changeNav();

document.addEventListener('scroll', changeNav);