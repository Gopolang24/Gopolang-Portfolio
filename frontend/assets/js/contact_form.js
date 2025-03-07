// Initialize EmailJS properly
(function() {
    emailjs.init("zI8-koX_8OfzRG-gx"); // Make sure this matches the public key in your EmailJS dashboard
    console.log("EmailJS initialized");
})();

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing form handler");

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        console.error("Contact form not found!");
        return;
    }

    console.log("Contact form found, adding submit listener");

    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        console.log("Form submitted");

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let subject = document.getElementById("subject").value.trim();
        let message = document.getElementById("message").value.trim();

        console.log("Form values:", { name, email, subject, message });

        if (!name || !email || !subject || !message) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "❌ All fields are required!",
                confirmButtonColor: "#dc3545",
            });
            return false;
        }

        try {
            Swal.fire({
                title: "Sending...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // Ensure you have the correct service ID and template ID
            const templateParams = {
                to_name: "Gopolang",
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };

            console.log("Sending with params:", templateParams);

            const response = await emailjs.send(
                'service_ejqitmk', // Replace with your correct EmailJS Service ID
                'template_cu59y5i', // Replace with your correct EmailJS Template ID
                templateParams
            );

            console.log("SUCCESS:", response);
            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "Thank you for your message. I'll get back to you soon!",
                confirmButtonColor: "#28a745",
            });
            contactForm.reset();
        } catch (error) {
            console.error("FAILED:", error);
            let errorMessage = "Failed to send message. ";

            if (error.status === 400) {
                errorMessage += "The Public Key is invalid. Please verify your API key in EmailJS.";
            } else if (error.status === 404) {
                errorMessage += "Email service not found. Please check your EmailJS Service ID and Template ID.";
            } else {
                errorMessage += error.text || "Please try again or contact me directly at pantsog24@gmail.com";
            }

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMessage,
                confirmButtonColor: "#dc3545",
            });
        }

        return false;
    });
});
