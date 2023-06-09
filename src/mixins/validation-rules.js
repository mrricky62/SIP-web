export const ValidationRules = {
  data() {
    return {
      genericRequiredRule: (value, msg) => !!value || `${msg} is required`,
      genericMinRule: (value, msg) =>
        value > 0 || `${msg} harus lebih besar dari 0`,
      genericNumberRule: (value, msg) => !isNaN(value) || `${msg} harus angka`,
      genericEmailRule: (value) => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return pattern.test(value) || `Email tidak valid`;
      },
      genericNumber18Rule: (value, msg) => {
        const pattern = /^\d{18}$/;
        return pattern.test(value) || `${msg} harus 18 digit angka`;
      },
      genericMatchRule: (value, msg, match) =>
        value === match || `${msg} tidak sama`,
    };
  },
};
