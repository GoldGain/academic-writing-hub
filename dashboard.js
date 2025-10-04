const user = supabase.auth.getUser();
if (!user) {
    // Not logged in → redirect to login
    window.location.href = "login.html";
}
// dashboard.js

const SUPABASE_URL = "YOUR_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadDashboard() {
    // Get current logged-in user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if(userError || !user) {
        window.location.href = "login.html"; // Not logged in
        return;
    }

    // Get user profile from Supabase
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if(profileError) {
        console.error(profileError);
        return;
    }

    // Show user info
    document.getElementById("userInfo").style.display = "block";
    document.getElementById("userName").textContent = profile.name || "N/A";
    document.getElementById("userEmail").textContent = profile.email;
    document.getElementById("userPackage").textContent = profile.package || "No package";
    document.getElementById("userBalance").textContent = profile.balance || 0;
    document.getElementById("userReferralCode").textContent = profile.referral_code;

    // Show referral link
    document.getElementById("referralArea").style.display = "block";
    const referralLink = `${window.location.origin}/signup.html?ref=${profile.referral_code}`;
    document.getElementById("referralLink").value = referralLink;

    // Show logout button
    document.getElementById("logoutBtn").style.display = "block";

    // Load tasks if user has a package
    if(profile.package) {
        loadTasks(profile.package);
    }
}

// Logout function
document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
});

loadDashboard();
async function loadTasks(packageName) {
    const tasksArea = document.getElementById("tasksArea");
    const taskList = document.getElementById("taskList");

    // Clear previous tasks
    taskList.innerHTML = "";

    // Example logic for packages
    let tasks = [];
    if(packageName === "GOLD") {
        tasks = ["Transcription", "Network Marketing", "Affiliate Marketing", "Online Gaming"];
    } else if(packageName === "DIAMOND") {
        tasks = ["Freelancing", "Transcription", "Network Marketing", "Affiliate Marketing", "Online Gaming"];
    } else if(packageName === "TITANIUM") {
        tasks = ["Academic Writing", "Transcription", "Network Marketing", "Affiliate Marketing", "Online Gaming", "Web Design", "Data Entry", "Eagleweb Academy"];
    }

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    });

    tasksArea.style.display = "block";
}
