shell("User Profile");
page.innerHTML = `
<div class="panel">
    <form id="profileForm" class="row g-3">
        <div class="col-md-6"><label class="form-label">Name</label><input class="form-control" id="name" required></div>
        <div class="col-md-6"><label class="form-label">Email</label><input class="form-control" id="email" disabled></div>
        <div class="col-md-6"><label class="form-label">Phone</label><input class="form-control" id="phone"></div>
        <div class="col-md-6"><label class="form-label">Education</label><input class="form-control" id="education"></div>
        <div class="col-12"><label class="form-label">Career Interest</label><input class="form-control" id="careerInterest"></div>
        <div class="col-12"><button class="btn btn-primary">Update Profile</button></div>
    </form>
    <div id="message" class="mt-3"></div>
</div>`;

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const educationInput = document.getElementById("education");
const careerInterestInput = document.getElementById("careerInterest");
const profileForm = document.getElementById("profileForm");
const messageDiv = document.getElementById("message");

async function load() {
    const user = await api("/profile");
    nameInput.value = user.name || "";
    emailInput.value = user.email || "";
    phoneInput.value = user.phone || "";
    educationInput.value = user.education || "";
    careerInterestInput.value = user.careerInterest || "";
}
profileForm.addEventListener("submit", async event => {
    event.preventDefault();
    await api("/profile", { method: "PUT", body: JSON.stringify({ name: nameInput.value, phone: phoneInput.value, education: educationInput.value, careerInterest: careerInterestInput.value }) });
    messageDiv.innerHTML = `<span class="text-success">Profile updated.</span>`;
});
load();

