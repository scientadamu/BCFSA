// Test API connection
async function testAPI() {
  console.log('🧪 Testing API connection...');
  
  try {
    // Test health endpoint
    const healthResponse = await fetch('http://localhost:5002/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    
    // Test programs endpoint
    const programsResponse = await fetch('http://localhost:5002/api/programs');
    const programsData = await programsResponse.json();
    console.log('✅ Programs:', programsData);
    
    // Test registration endpoint
    const testRegistration = {
      name: 'Test Student',
      email: 'test@example.com',
      password: 'test123',
      role: 'trainee',
      phone: '+234-123-456-7890'
    };
    
    const registrationResponse = await fetch('http://localhost:5002/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testRegistration)
    });
    
    const registrationData = await registrationResponse.json();
    console.log('✅ Registration test:', registrationData);
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}

// Run test
testAPI();
