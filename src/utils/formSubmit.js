import { API_ENDPOINTS } from '../config/constants';

export const submitContactForm = async ({ name, email, message }) => {
  const payload = {
    name,
    email,
    message,
    _subject: 'New Contact from BufferRing Website',
    _template: 'table',
  };

  const response = await fetch(API_ENDPOINTS.FORM_SUBMIT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Form submission failed');
  }

  return true;
};
