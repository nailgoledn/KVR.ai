const axios = require("axios");

const BASE_URL = "http://localhost:4000";

async function runTests() {
  try {
    console.log("🚀 Starting Auth Tests...\n");

    const email = `test_${Date.now()}@test.com`;

    // 1️⃣ REGISTER (FIX: send required name)
    console.log("1️⃣ Registering user...");

    await axios.post(`${BASE_URL}/auth/register`, {
      name: "Test User", // 🔥 الحل الحقيقي
      email,
      password: "123456",
      role: "user",
    });

    console.log("✅ Register success");

    // 2️⃣ LOGIN
    console.log("\n2️⃣ Logging in...");

    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password: "123456",
    });

    const token = loginRes.data.access_token;

    console.log("✅ Login success");
    console.log("🔑 Token received");

    // 3️⃣ PROTECTED ROUTE
    console.log("\n3️⃣ Testing protected route...");

    const usersRes = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Protected route works");
    console.log("📦 Users count:", usersRes.data?.length);

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY!");

  } catch (error) {
    console.error("\n❌ TEST FAILED");
    console.error(error.response?.data || error.message);
  }
}

runTests();
