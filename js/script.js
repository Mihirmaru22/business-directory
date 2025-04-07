function getBusinesses() {
    return JSON.parse(localStorage.getItem('businesses')) || [];
  }
  
  function saveBusinesses(data) {
    localStorage.setItem('businesses', JSON.stringify(data));
  }
  
  function createBusinessCard(biz) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${biz.logo || 'assets/images/default.png'}" alt="Logo" style="width:100%; border-radius: 1rem;" />
      <h2>${biz.name}</h2>
      <h4>${biz.category}</h4>
      <p>${biz.description}</p>
      <a href="store-pages/${biz.slug}.html">Visit Store</a>
    `;
    return card;
  }
  
  function loadBusinesses() {
    const container = document.getElementById('businessGrid');
    const businesses = getBusinesses();
    container.innerHTML = '';
    businesses.forEach(biz => {
      container.appendChild(createBusinessCard(biz));
    });
  }
  
  function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const contact = document.getElementById('contact').value;
    const logoFile = document.getElementById('logo').files[0];
  
    const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
  
    const reader = new FileReader();
    reader.onload = function () {
      const logo = reader.result;
      const newBiz = { name, category, description, contact, logo, slug };
      const businesses = getBusinesses();
      businesses.push(newBiz);
      saveBusinesses(businesses);
      document.getElementById('successMessage').textContent = 'Business added successfully!';
      setTimeout(() => window.location.href = 'index.html', 1500);
    };
  
    if (logoFile) {
      reader.readAsDataURL(logoFile);
    } else {
      const newBiz = { name, category, description, contact, logo: null, slug };
      const businesses = getBusinesses();
      businesses.push(newBiz);
      saveBusinesses(businesses);
      document.getElementById('successMessage').textContent = 'Business added successfully!';
      setTimeout(() => window.location.href = 'index.html', 1500);
    }
  }
  
  function init() {
    if (document.getElementById('businessForm')) {
      document.getElementById('businessForm').addEventListener('submit', handleFormSubmit);
    } else {
      loadBusinesses();
    }
  }
  
  window.onload = init;
  


  function handleTilt(event, card) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 20).toFixed(2);
    const rotateY = (x / 20).toFixed(2);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  }

  function resetTilt(card) {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  }