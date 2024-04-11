const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', async () => {
    try {
        await logout();
    } catch (error) {
        console.error('Error logging out:', error);
    }
});

async function checkLoginStatus() {
    try {
      const response = await fetch('http://localhost:3001/api/sessions');
      const session = await response.json();
      const isLoggedIn = session && session.length > 0;
      if (isLoggedIn) {
        const userName = session[0].name;
        updateUI(isLoggedIn, userName);
      } else {
        updateUI(isLoggedIn);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }
  
 
function updateUI(isLoggedIn, userName) {
    const loginButton = document.getElementById('login');
    const registerButton = document.getElementById('register');
    const greetingMessage = document.getElementById('greetingMessage');
    const logoutButton = document.getElementById('logout');
  
    if (isLoggedIn) {
      loginButton.style.display = 'none';
      registerButton.style.display = 'none';
      greetingMessage.textContent = `Здравей, ${userName}!`;
      greetingMessage.style.display = 'inline-block';
      logoutButton.style.display = 'inline-block';
      logoutButton.textContent = "Излизане";
    } else {
      loginButton.style.display = 'inline-block';
      registerButton.style.display = 'inline-block';
      greetingMessage.style.display = 'none';
      logoutButton.style.display = 'none';
    }
  }


  async function logout() {
    try {
      const response = await fetch('http://localhost:3001/api/sessions/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        window.location.href = "login.html"
        console.log('Logout successful. All sessions cleared.');
      } else {
        const errorData = await response.json();
        console.error('Error logging out:', errorData.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  


  window.addEventListener('load', checkLoginStatus);
  