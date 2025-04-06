"use strict";

// Form validation and submission in 3ersi pro pages
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form#3ersi-pro-form");
  if (!form) return;

  // Error messages
  const errorMessages = {
    fullName: document.getElementById("fullName-error"),
    phoneNumber: document.getElementById("phoneNumber-error"),
    occasion: document.getElementById("occasion-error"),
    checkbox: document.getElementById("checkbox-error"),
    formMessage: document.getElementById("form-validation"),
  };

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    let isValid = true;

    // Get form values
    const fullName = form.querySelector("#fullname").value.trim();
    const phoneNumber = form.querySelector("#phone_number").value.trim();
    const occasion = form.querySelector("#occasion").value;
    const checkboxes = form.querySelectorAll(".checkbox-container input[type='checkbox']:checked");

    const message = form.querySelector("#message").value.trim();

    // Get optional delivery fields (only if they exist on the page)
    const optionalFields = {
      deliveryLocation: form.querySelector("#delivery_location")?.value?.trim() || null,
      deliveryTime: form.querySelector("#delivery_time")?.value || null,
      recipientFullname: form.querySelector("#recipient_fullname")?.value?.trim() || null,
      recipientPhone: form.querySelector("#recipient_phone_number")?.value?.trim() || null,
      deliveryCityCountry: form.querySelector("#delivery_city_country")?.value?.trim() || null,
      deliveryTimeOptional: form.querySelector("#delivery_time_optional")?.value || null,
      email: form.querySelector("#user_email")?.value?.trim() || null,
      selectedRadio: document.querySelector('input[name="answer"]:checked')?.id || null,
    };

    // Validate full name (min 5 characters)
    if (fullName.length < 5) {
      errorMessages.fullName.classList.add("show");
      isValid = false;
    } else {
      errorMessages.fullName.classList.remove("show");
    }

    // Validate phone number (10-13 digits only)
    if (!/^\d{10,13}$/.test(phoneNumber)) {
      errorMessages.phoneNumber.classList.add("show");
      isValid = false;
    } else {
      errorMessages.phoneNumber.classList.remove("show");
    }

    // Validate at least one checkbox is checked
    if (checkboxes.length === 0) {
      errorMessages.checkbox.classList.add("show");
      isValid = false;
    } else {
      errorMessages.checkbox.classList.remove("show");
    }

    // Validate occasion is selected
    if (!occasion) {
      errorMessages.occasion.classList.add("show");
      isValid = false;
    } else {
      errorMessages.occasion.classList.remove("show");
    }

    // Prevent submission if invalid
    if (!isValid) {
      errorMessages.formMessage.textContent = "Veuillez corriger les erreurs ci-dessus.";
      showElement(errorMessages.formMessage);
    } else {
      errorMessages.formMessage.textContent = "Formulaire soumis avec succès !";
      showElement(errorMessages.formMessage);
      errorMessages.formMessage.classList.add("valid");

      // Prepare form data
      const productTypes = Array.from(checkboxes).map((checkbox) => checkbox.value);
      const formDataObject = {
        fullName,
        phoneNumber,
        productTypes,
        occasion,
        message,
        optionalFields,
      };

      // Create FormData and append all fields
      const formData = new FormData();

      // Append  values to FormData
      formData.append("fullName:", formDataObject.fullName);
      formData.append("phoneNumber:", formDataObject.phoneNumber);
      formData.append("occasion:", formDataObject.occasion);
      formData.append("message:", formDataObject.message);
      formData.append("productTypes", productTypes.join(" ,"));

      // Append optional fields if they exist and have values
      Object.entries(optionalFields).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      // Send form data to server
      //   try {
      //     const response = await fetch("API_ENDPOINT", {
      //       method: "POST",
      //       body: formData,
      //     });
      //     // Check if the response is ok
      //     if (!response.ok) throw new Error("Server error");
      //     const data = await response.json();
      //     if (data.success) {
      //       // Reset the form
      //       form.reset();
      //     }
      //   } catch (error) {
      //     console.error("Error:", error);
      //   }
    }
  });
});
