// signup.js
const form = document.getElementById("signup-form");
const message = document.getElementById("message");
const spinner = document.getElementById("spinner");

// Generate a unique referral code
async function generateReferralCode(email) {
  let code;
  let exists = [];
  do {
    code = email.split("@")[0] + Math.floor(Math.random() * 1000);
    const { data } = await supabase.from("profiles").select("*").eq("referral_code", code);
    exists = data;
  } while (exists.length > 0);
  return code;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const referral = document.getElementById("referral").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Clear previous messages
  message.textContent = "";
  
  // Basic validation
  if (password.length < 8) {
    message.style.color = "red";
    message.textContent = "❌ Password must be at least 8 characters!";
    return;
  }

  if (password !== confirmPassword) {
    message.style.color = "red";
    message.textContent = "❌ Passwords do not match!";
    return;
  }

  if (!phone) {
    message.style.color = "red";
    message.textContent = "❌ Phone number is required!";
    return;
  }

  spinner.style.display = "block";
  message.style.color = "black";
  message.textContent = "⏳ Creating your account...";

  try {
    // Sign up user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) throw authError;

    const referralCode = await generateReferralCode(email);

    // Insert profile into Supabase
    const { error: profileError } = await supabase.from("profiles").insert([{
      id: authData.user.id,
      email,
      phone,
      referral_code: referralCode,
      referred_by: referral || null,
      balance: 0,
      role: "user"
    }]);

    if (profileError) throw profileError;

    spinner.style.display = "none";
    message.style.color = "green";
    message.textContent = "✅ Account created successfully! Check your email to confirm.";

    form.reset();
  } catch (error) {
    spinner.style.display = "none";
    message.style.color = "red";
    message.textContent = "❌ " + (error.message || "Signup failed!");
  }
});
