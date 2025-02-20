import * as v from 'valibot';

// Constants
import { ERROR_MESSAGES, REGEX } from '@/constants';

export const personalFormSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Full name')),
  ),
  email: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Email Address')),
    v.email(ERROR_MESSAGES.INVALID_EMAIL),
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Phone')),
    v.regex(REGEX.PHONE, ERROR_MESSAGES.INVALID_PHONE),
  ),
  position: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Position')),
  ),
  company: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Company')),
  ),
  location: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Location')),
  ),
  website: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Website')),
  ),
});

export const teamFormSchema = v.object({
  teamName: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Team Name')),
  ),
  rank: v.pipe(v.string(), v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Rank'))),
  office: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Office')),
  ),
  teamMail: v.string(),
});

export const billFormSchema = v.object({
  payment: v.string(),
  billName: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Full name')),
  ),
  billAddress: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Address')),
  ),
  state: v.pipe(v.string(), v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('State'))),
  zipCode: v.pipe(
    v.string(),
    v.nonEmpty(ERROR_MESSAGES.FIELD_REQUIRED('Zip Code')),
  ),
});
