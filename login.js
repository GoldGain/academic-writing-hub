// login.js
const { data: user, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
});

if (error) {
    alert(error.message);
    return;
}

// Successful login → redirect to dashboard
window.location.href = "dashboard.html";
