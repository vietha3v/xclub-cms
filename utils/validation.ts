import dlv from 'dlv';

// Validation utility functions
export const validationUtils = {
  // Email validation
  isValidEmail: (email: string): boolean => {
    if (!email || email.trim() === '') return true; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  // URL validation
  isValidUrl: (url: string): boolean => {
    if (!url || url.trim() === '') return true; // Optional field
    try {
      new URL(url.trim());
      return true;
    } catch {
      return false;
    }
  },

  // Phone number validation (Vietnamese format)
  isValidPhone: (phone: string): boolean => {
    if (!phone || phone.trim() === '') return true; // Optional field
    const phoneRegex = /^(\+84|84|0)[1-9][0-9]{8,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  // Vietnamese postal code validation
  isValidPostalCode: (postalCode: string): boolean => {
    if (!postalCode || postalCode.trim() === '') return true; // Optional field
    const postalRegex = /^[0-9]{5,6}$/;
    return postalRegex.test(postalCode.trim());
  },

  // Number validation with range
  isValidNumber: (value: string | number, min?: number, max?: number): boolean => {
    if (value === '' || value === null || value === undefined) return true; // Optional field
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return false;
    if (min !== undefined && num < min) return false;
    if (max !== undefined && num > max) return false;
    return true;
  },

  // Date validation
  isValidDate: (date: string): boolean => {
    if (!date || date.trim() === '') return true; // Optional field
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
  },

  // Date range validation
  isValidDateRange: (startDate: string, endDate: string): boolean => {
    if (!startDate || !endDate) return true; // Both optional
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= end;
  },

  // String length validation
  isValidLength: (value: string, min?: number, max?: number): boolean => {
    if (!value || value.trim() === '') return true; // Optional field
    const length = value.trim().length;
    if (min !== undefined && length < min) return false;
    if (max !== undefined && length > max) return false;
    return true;
  },

  // Required field validation
  isRequired: (value: any): boolean => {
    if (typeof value === 'string') return value.trim() !== '';
    if (typeof value === 'number') return !isNaN(value);
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined;
  },

  // Clean and validate string
  cleanString: (value: string): string => {
    return value ? value.trim() : '';
  },

  // Clean and validate number
  cleanNumber: (value: string | number): number | undefined => {
    if (typeof value === 'number') return isNaN(value) ? undefined : value;
    if (typeof value === 'string') {
      const cleaned = value.trim();
      if (cleaned === '') return undefined;
      const num = parseFloat(cleaned);
      return isNaN(num) ? undefined : num;
    }
    return undefined;
  },

  // Clean and validate URL
  cleanUrl: (value: string): string => {
    if (!value || value.trim() === '') return '';
    const cleaned = value.trim();
    // Add protocol if missing
    if (!cleaned.match(/^https?:\/\//)) {
      return `https://${cleaned}`;
    }
    return cleaned;
  },

  // Validate social media handle
  isValidSocialHandle: (handle: string, platform: 'instagram' | 'tiktok'): boolean => {
    if (!handle || handle.trim() === '') return true; // Optional field
    const cleaned = handle.trim();
    
    if (platform === 'instagram') {
      // Instagram: @username or username
      const instagramRegex = /^@?[a-zA-Z0-9._]{1,30}$/;
      return instagramRegex.test(cleaned);
    }
    
    if (platform === 'tiktok') {
      // TikTok: @username or username
      const tiktokRegex = /^@?[a-zA-Z0-9._]{1,24}$/;
      return tiktokRegex.test(cleaned);
    }
    
    return false;
  },

  // Clean social media handle
  cleanSocialHandle: (handle: string): string => {
    if (!handle || handle.trim() === '') return '';
    const cleaned = handle.trim();
    // Remove @ if present, we'll add it back in display
    return cleaned.startsWith('@') ? cleaned.substring(1) : cleaned;
  },

  // Deep property access using dlv - this is the main function we need
  safeGet: <T = any>(obj: any, path: string, defaultValue?: T): T => {
    return dlv(obj, path, defaultValue);
  },

  // Safe number parsing using dlv
  safeParseInt: (value: string | number | null | undefined, defaultValue: number = 0): number => {
    const cleanValue = dlv({ value }, 'value', defaultValue);
    if (typeof cleanValue === 'number') return isNaN(cleanValue) ? defaultValue : cleanValue;
    if (typeof cleanValue === 'string') {
      const parsed = parseInt(cleanValue.trim());
      return isNaN(parsed) ? defaultValue : parsed;
    }
    return defaultValue;
  },

  safeParseFloat: (value: string | number | null | undefined, defaultValue: number = 0): number => {
    const cleanValue = dlv({ value }, 'value', defaultValue);
    if (typeof cleanValue === 'number') return isNaN(cleanValue) ? defaultValue : cleanValue;
    if (typeof cleanValue === 'string') {
      const parsed = parseFloat(cleanValue.trim());
      return isNaN(parsed) ? defaultValue : parsed;
    }
    return defaultValue;
  },

  // Safe toLocaleString
  safeToLocaleString: (value: number | string | null | undefined, locale: string = 'vi-VN', defaultValue: string = '0'): string => {
    const num = validationUtils.safeParseFloat(value);
    return num.toLocaleString(locale);
  },

  // Safe date formatting
  safeDateFormat: (date: Date | string | null | undefined, format: string = 'dd/MM/yyyy HH:mm', defaultValue: string = 'N/A'): string => {
    const dateValue = dlv({ date }, 'date', defaultValue);
    if (!dateValue) return defaultValue;
    try {
      const dateObj = new Date(dateValue);
      if (isNaN(dateObj.getTime())) return defaultValue;
      return dateObj.toLocaleString('vi-VN');
    } catch {
      return defaultValue;
    }
  }
};

// Validation error messages
export const validationMessages = {
  required: 'Trường này là bắt buộc',
  invalidEmail: 'Email không hợp lệ',
  invalidUrl: 'URL không hợp lệ',
  invalidPhone: 'Số điện thoại không hợp lệ',
  invalidPostalCode: 'Mã bưu điện không hợp lệ',
  invalidNumber: 'Số không hợp lệ',
  invalidDate: 'Ngày không hợp lệ',
  invalidDateRange: 'Ngày kết thúc phải sau ngày bắt đầu',
  tooShort: (min: number) => `Tối thiểu ${min} ký tự`,
  tooLong: (max: number) => `Tối đa ${max} ký tự`,
  outOfRange: (min: number, max: number) => `Phải từ ${min} đến ${max}`,
  invalidSocialHandle: (platform: string) => `Tên ${platform} không hợp lệ`,
};

// Custom validation functions for specific use cases
export const customValidators = {
  // Club name validation
  validateClubName: (name: string): { isValid: boolean; message?: string } => {
    if (!validationUtils.isRequired(name)) {
      return { isValid: false, message: validationMessages.required };
    }
    if (!validationUtils.isValidLength(name, 2, 100)) {
      return { isValid: false, message: validationMessages.tooShort(2) };
    }
    return { isValid: true };
  },

  // Club description validation
  validateClubDescription: (description: string): { isValid: boolean; message?: string } => {
    if (description && !validationUtils.isValidLength(description, 0, 500)) {
      return { isValid: false, message: validationMessages.tooLong(500) };
    }
    return { isValid: true };
  },

  // Website validation
  validateWebsite: (website: string): { isValid: boolean; message?: string } => {
    if (website && !validationUtils.isValidUrl(website)) {
      return { isValid: false, message: validationMessages.invalidUrl };
    }
    return { isValid: true };
  },

  // Email validation
  validateEmail: (email: string): { isValid: boolean; message?: string } => {
    if (email && !validationUtils.isValidEmail(email)) {
      return { isValid: false, message: validationMessages.invalidEmail };
    }
    return { isValid: true };
  },

  // Phone validation
  validatePhone: (phone: string): { isValid: boolean; message?: string } => {
    if (phone && !validationUtils.isValidPhone(phone)) {
      return { isValid: false, message: validationMessages.invalidPhone };
    }
    return { isValid: true };
  },

  // Max members validation
  validateMaxMembers: (maxMembers: number): { isValid: boolean; message?: string } => {
    if (!validationUtils.isValidNumber(maxMembers, 1, 10000)) {
      return { isValid: false, message: validationMessages.outOfRange(1, 10000) };
    }
    return { isValid: true };
  },

  // Fee validation
  validateFee: (fee: string): { isValid: boolean; message?: string } => {
    if (fee && !validationUtils.isValidNumber(fee, 0, 10000000)) {
      return { isValid: false, message: validationMessages.outOfRange(0, 10000000) };
    }
    return { isValid: true };
  },

  // Social media validation
  validateSocialMedia: (handle: string, platform: 'instagram' | 'tiktok'): { isValid: boolean; message?: string } => {
    if (handle && !validationUtils.isValidSocialHandle(handle, platform)) {
      return { isValid: false, message: validationMessages.invalidSocialHandle(platform) };
    }
    return { isValid: true };
  }
};
