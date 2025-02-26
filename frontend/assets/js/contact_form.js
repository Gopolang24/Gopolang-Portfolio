document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "❌ All fields are required!",
            confirmButtonColor: "#dc3545",
        });
        return;
    }

    Swal.fire({
        title: "Sending...",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const response = await fetch("http://localhost:5000/submit-form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, subject, message }),
        });

        const result = await response.json();
        Swal.close();

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: result.message,
                confirmButtonColor: "#28a745",
            });
            document.getElementById("contactForm").reset();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.message,
                confirmButtonColor: "#dc3545",
            });
        }
    } catch (error) {
        console.error("❌ Network error:", error);
        Swal.close();
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "❌ Failed to send message. Please try again.",
            confirmButtonColor: "#dc3545",
        });
    }
});
