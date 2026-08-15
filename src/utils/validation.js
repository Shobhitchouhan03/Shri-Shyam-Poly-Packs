/**
 * Validates enquiry form inputs
 */
export function validateEnquiryForm(formData) {
  const errors = {};

  if (!formData.name || !formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[0-9+\-\s()]{8,15}$/.test(formData.phone.trim())) {
    errors.phone = "Please enter a valid phone number";
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.product || !formData.product.trim()) {
    errors.product = "Please select or enter a product requirement";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
