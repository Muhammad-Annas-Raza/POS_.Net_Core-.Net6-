 


const pg = window. location. pathname. split("/"). pop().toLocaleLowerCase();

    
    if(pg =="index.html" || pg == "anonymous.html" || pg == "email_verification.html" || pg == "register.html" || pg == "storeregister.html"){
 
    }else{
      if(
            sessionStorage.getItem("token") == null    ||
            sessionStorage.getItem("user_id") == null  ||
            sessionStorage.getItem("store_id") == null ||
            sessionStorage.getItem("role_id") == null  ||
            sessionStorage.getItem("role_name") == null||
            sessionStorage.getItem("user_name") == null
            ){
        window.location.href = "index.html";
            }
    }
     
    const nm = document.querySelectorAll('.name');

    nm.forEach(box => {
      box.innerText = sessionStorage.getItem("user_name");
    });
    
    const rl = document.querySelectorAll('.role');

    rl.forEach(box => {
      box.innerText = sessionStorage.getItem("role_name");
    });
    
function sign_out() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user_id");
  sessionStorage.removeItem("store_id");
  sessionStorage.removeItem("role_id");
  sessionStorage.removeItem("role_name");
  sessionStorage.removeItem("user_name");
  sessionStorage.removeItem("storee_nameee");  
sessionStorage.removeItem("storee_logoo");  
  window.location.href = "index.html";
}
  
//Pre Loader
var preload=document.getElementById('loading');
function myfun(){
    preload.style.display='none';
}



  
//Show Password CheckBox
function myFunction() 
{
      var x = document.querySelectorAll('.pwd');
      x.forEach(x => 
        {
        if (x.type === "password") 
        {
          x.type = "text";
        } else 
        {
          x.type = "password";
        }      
        });
}

if (sessionStorage.getItem("role_id") == "2" || sessionStorage.getItem("role_id") == "3"  ) {
 
  $.ajax({
    url: `http://localhost:63626/api/Home/GetStoreName/${sessionStorage.getItem("store_id")}`,
    type: 'Get',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    success: function (res) {   
   
      document.getElementById('spr_ownr_user').innerHTML= 
      `
      <a href="home.html"  class="logo d-flex align-items-center">            
      <img src="${res.store_logo == null?"assets/img/logo.png":res.store_logo}" alt="">
      <span class="d-none d-lg-block store_name">${res.store_name}</span>
      </a>`
sessionStorage.setItem("storee_nameee",res.store_name)  
sessionStorage.setItem("storee_logoo",res.store_logo)  
  },
  error: function (JQ) {
  if (JQ.status == 401) {
    sign_out();
  }
  },
  });
  
  
//   let x = document.querySelectorAll('.sprAdmn');
//   x.forEach(x => 
//     {
//      // add class from each element
//   x.classList.add('d-none',"none"); 
// })
// let y = document.querySelectorAll('.spr_ownr_user');
// y.forEach(y => 
//   {
//      // ✅ Remove class from each element
// y.classList.remove('d-none',"none");
// })



}


if (sessionStorage.getItem("role_id") == "1") {
  
  

  let x = document.querySelectorAll('.sprAdmn');
  x.forEach(x => 
    {
       // ✅ Remove class from each element
  x.classList.remove('d-none',"none");
 
    });

    document.getElementById('spr_ownr_user').innerHTML= 
  `<a href="approveusers.html"  class="logo d-flex align-items-center">         
  <img src="assets/img/logo.png" alt="">
  <span class="d-none d-lg-block store_name">Point Of Sales</span>
  </a>` 
}

if (sessionStorage.getItem("role_id") == "2") {

  if(pg.toLocaleLowerCase() == "approveusers.html" || pg.toLocaleLowerCase() == "viewdeleteusers.html" || pg.toLocaleLowerCase() == "viewdeletestores.html"){
    sign_out();  
    window.location.href="index.html";
  }
  let x = document.querySelectorAll('.ownr');
  x.forEach(x => 
    {
       // ✅ Remove class from each element
  x.classList.remove('d-none',"none");
 
    });
}
 
if (sessionStorage.getItem("role_id") == "3") {
  
  if(pg.toLocaleLowerCase() == "adduser.html" || pg.toLocaleLowerCase() == "viewuser.html" || pg.toLocaleLowerCase() == "addcategory.html" || pg.toLocaleLowerCase() == "viewcategory.html" || pg.toLocaleLowerCase() == "addproduct.html" || pg.toLocaleLowerCase() == "viewproduct.html" || pg.toLocaleLowerCase() == "addstock.html" || pg.toLocaleLowerCase() == "viewstock.html" || pg.toLocaleLowerCase() == "salepoint.html"){
    sign_out();  
    window.location.href="index.html";
  }

  let x = document.querySelectorAll('#main');
  x.forEach(x => 
    {
       // ✅ Remove class from each element
    x.classList.remove('main');

  // ✅ Add class to each element
    x.classList.add('mainn');
    });

     document.getElementById('my_toggle').classList.add('d-none');     
}

if (sessionStorage.getItem("fk_role") == "2") {
  document.getElementById("main").classList.add("mainn");
  document.getElementById("main").classList.remove("main");
  document.getElementById("sidebar").classList.add("none");
  document.getElementById("nameee").innerHTML = sessionStorage.getItem("name");
  document.getElementById("ne").innerHTML = sessionStorage.getItem("name");
  document.getElementById("roleee").innerHTML = "User";
  document.querySelector(".togle").classList.add("none");
}






(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */

  var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    imagetools_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
    file_picker_callback: function(callback, value, meta) {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    templates: [{
        title: 'New Table',
        description: 'creates a new table',
        content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
      },
      {
        title: 'Starting my story',
        description: 'A cure for writers block',
        content: 'Once upon a time...'
      },
      {
        title: 'New list with dates',
        description: 'New List with dates',
        content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
      }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable);
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

})();




 