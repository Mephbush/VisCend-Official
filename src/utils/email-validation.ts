// List of known temporary/fake email domains
const FAKE_EMAIL_DOMAINS = [
  // 10 minute mail services
  '10minutemail.com',
  '10minutemail.net',
  '10minutemail.org',
  '10minemail.com',
  '20minutemail.com',
  '2prong.com',
  '30minutemail.com',
  '3d-painting.com',
  '4warding.com',
  '4warding.net',
  '4warding.org',
  '60minutemail.com',
  '7days-menu.com',
  'guerrillamail.com',
  'guerrillamail.de',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'pokemail.net',
  'sharklasers.com',
  'grr.la',
  'guerrillamail.biz',
  'guerrillamail.info',
  
  // Mailinator and similar
  'mailinator.com',
  'mailinator2.com',
  'mailinator.net',
  'mailinator.org',
  'sogetthis.com',
  'spamhereonline.com',
  'spamherelots.com',
  'spamhereplease.com',
  'tempemail.com',
  'tempmail.org',
  'tempmail.net',
  'temp-mail.org',
  'tempail.com',
  'tempmailaddress.com',
  'tempinbox.com',
  
  // YOPmail
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'cool.fr.nf',
  'jetable.fr.nf',
  'nospam.ze.tc',
  'nomail.xl.cx',
  'mega.zik.dj',
  'speed.1s.fr',
  'courriel.fr.nf',
  'moncourrier.fr.nf',
  'monemail.fr.nf',
  'monmail.fr.nf',
  
  // ThrowAwayMail
  'throwawaymail.com',
  'thrma.com',
  
  // Temporary email services
  'tempemails.net',
  'tempr.email',
  'throwaway.email',
  'zzz.com',
  'getnada.com',
  'armyspy.com',
  'cuvox.de',
  'dayrep.com',
  'fleckens.hu',
  'gustr.com',
  'jourrapide.com',
  'einrot.com',
  'teleworm.us',
  'superrito.com',
  'rhyta.com',
  
  // Disposable email
  'dispostable.com',
  'disposableemailaddresses.com',
  'mailnesia.com',
  'maildrop.cc',
  'mailnator.com',
  'moakt.com',
  'emailondeck.com',
  'fakeinbox.com',
  'mailcatch.com',
  'mytrashmail.com',
  'trashmail.com',
  'trashmail.org',
  'trashinbox.com',
  'trashymail.com'
];

/**
 * Validates if an email address is legitimate (not temporary/fake)
 * @param email - The email address to validate
 * @returns Object with isValid boolean and optional error message
 */
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || !emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address format.'
    };
  }

  // Extract domain from email
  const domain = email.split('@')[1].toLowerCase();
  
  // Check if domain is in fake email list
  if (FAKE_EMAIL_DOMAINS.includes(domain)) {
    return {
      isValid: false,
      error: 'Please use a valid email address. Temporary email addresses are not allowed.'
    };
  }

  return {
    isValid: true
  };
};

/**
 * Check if domain appears to be a temporary email service
 * This is a fallback check for domains not in our list
 */
export const isLikelyTempEmail = (email: string): boolean => {
  const domain = email.split('@')[1].toLowerCase();
  
  // Common patterns for temporary email services
  const tempPatterns = [
    /temp/i,
    /trash/i,
    /throw/i,
    /fake/i,
    /spam/i,
    /guerr/i,
    /disp/i,
    /minute/i,
    /mail.*temp/i,
    /temp.*mail/i,
    /^[0-9]+min/i,
    /^[0-9]+hour/i
  ];

  return tempPatterns.some(pattern => pattern.test(domain));
};