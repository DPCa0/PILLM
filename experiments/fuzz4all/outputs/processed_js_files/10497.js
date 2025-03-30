(async () => {
  const fetchUserData = async (userId) => {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
    return response.json();
  };

  const processData = (userData) => {
    const { name, email, address: { city }, company: { name: companyName } } = userData;
    return `User ${name} lives in ${city}, works at ${companyName}, and can be contacted at ${email}.`;
  };

  const logUserData = async (userId) => {
    try {
      const userData = await fetchUserData(userId);
      print(processData(userData));
    } catch (error) {
      console.error(error.message);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const createButton = () => {
    const button = document.createElement('button');
    button.textContent = 'Fetch User Data';
    button.style.cssText = 'padding: 10px 20px; font-size: 16px;';
    document.body.appendChild(button);

    const debouncedLogUserData = debounce(logUserData, 2000);
    button.addEventListener('click', () => debouncedLogUserData(1));
  };

   
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', createButton);
  }
})();
