import content from '@/content/contact.json';

const defaultSubjects = ['Alianzas y patrocinio', 'Eventos y actividades', 'Otro'];
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const subjects = Array.isArray(content.subjects)
  ? content.subjects.filter(isNonEmptyString).map((subject) => subject.trim())
  : [];

export const contactContent = {
  title: isNonEmptyString(content.title) ? content.title.trim() : 'Contáctanos',
  introduction: isNonEmptyString(content.introduction) ? content.introduction.trim() : '',
  email: isNonEmptyString(content.email) ? content.email.trim() : '',
  subjects: subjects.length > 0 ? subjects : defaultSubjects,
};
