export interface InstitutionalEvidence {
  id: string;
  topic: 'robotic-surgery' | 'professional-role';
  sourceName: string;
  sourceTitle: string;
  url: string;
  publishedDate?: string;
  checkedDate: string;
  summary: string;
  scopeNote: string;
  schemaType: 'NewsArticle' | 'WebPage';
}

export interface AnswerQuestion {
  id: string;
  question: string;
  answer: string;
}

export const AUTHORITY_CONTENT_LAST_REVIEWED = '2026-09-21';

/**
 * Primary institutional sources that corroborate public statements on this site.
 * Keep summaries time-bound and narrower than the source statement. Hospital
 * programme achievements must not be presented as personal outcome claims.
 */
export const institutionalEvidence: InstitutionalEvidence[] = [
  {
    id: 'lnwh-robotic-first-month',
    topic: 'robotic-surgery',
    sourceName: 'London North West University Healthcare NHS Trust',
    sourceTitle: 'Surgeon embraces robotic surgery',
    url: 'https://www.lnwh.nhs.uk/news/surgeon-embraces-robotic-surgery-12793',
    publishedDate: '2026-05-29',
    checkedDate: AUTHORITY_CONTENT_LAST_REVIEWED,
    summary:
      'LNWH reported that Prof. Sheth was one of four Ealing Hospital surgeons trained to use the da Vinci system and had used it in 19 procedures during the programme’s first month.',
    scopeNote:
      'This is a dated NHS Trust report about activity in the Ealing Hospital programme, not a current personal procedure total or an outcome comparison.',
    schemaType: 'NewsArticle',
  },
  {
    id: 'lnwh-robotic-programme-update',
    topic: 'robotic-surgery',
    sourceName: 'London North West University Healthcare NHS Trust',
    sourceTitle: 'Ealing robot wins hearts and minds',
    url: 'https://www.lnwh.nhs.uk/news/ealing-robot-wins-hearts-and-minds-12842',
    publishedDate: '2026-06-08',
    checkedDate: AUTHORITY_CONTENT_LAST_REVIEWED,
    summary:
      'LNWH reported that Prof. Sheth had completed more than 20 procedures in the early Ealing robotic programme by 8 June 2026.',
    scopeNote:
      'The figure is tied to the NHS Trust publication date and must not be presented as a live or lifetime total.',
    schemaType: 'NewsArticle',
  },
  {
    id: 'lnwh-robotic-programme-milestone',
    topic: 'robotic-surgery',
    sourceName: 'London North West University Healthcare NHS Trust',
    sourceTitle: 'Robot celebrates 100th procedure',
    url: 'https://www.lnwh.nhs.uk/news/robot-celebrates-100th-procedure-13015',
    publishedDate: '2026-07-28',
    checkedDate: AUTHORITY_CONTENT_LAST_REVIEWED,
    summary:
      'LNWH reported that the Ealing Hospital robotic programme had completed 100 procedures and described programme use for gallbladder, hernia and anti-reflux surgery.',
    scopeNote:
      'This is a hospital-programme milestone. It is not presented as Prof. Sheth’s personal procedure count or as evidence that robotic surgery produces better outcomes.',
    schemaType: 'NewsArticle',
  },
  {
    id: 'rcs-surgical-tutor',
    topic: 'professional-role',
    sourceName: 'Royal College of Surgeons of England',
    sourceTitle: 'Contact your surgical tutor',
    url: 'https://www.rcseng.ac.uk/careers-in-surgery/outreach/contact-your-surgical-tutor/',
    checkedDate: AUTHORITY_CONTENT_LAST_REVIEWED,
    summary:
      'The Royal College of Surgeons of England lists Hemant Sheth as the surgical tutor for Ealing Hospital.',
    scopeNote:
      'The source is used only to corroborate the listed tutor role. Personal contact details from the directory are not reproduced.',
    schemaType: 'WebPage',
  },
];

export const roboticAnswerQuestions: AnswerQuestion[] = [
  {
    id: 'what-is-robotic-surgery',
    question: 'What is robotic-assisted surgery?',
    answer:
      'Robotic-assisted surgery is a minimally invasive approach in which the surgeon controls a camera and specialised instruments from a console. The system translates the surgeon’s hand movements; it does not make clinical decisions.',
  },
  {
    id: 'does-robot-operate-itself',
    question: 'Does the robot perform the operation by itself?',
    answer:
      'No. The robotic system does not operate independently. The surgeon controls every instrument movement and remains responsible for the operation together with the theatre team.',
  },
  {
    id: 'is-robotic-always-better',
    question: 'Is robotic surgery always better than laparoscopic or open surgery?',
    answer:
      'No. Robotic, laparoscopic and open surgery are different approaches. The safest and most appropriate option depends on the diagnosis, anatomy, previous surgery, available hospital pathway and the findings of an individual clinical assessment.',
  },
  {
    id: 'ealing-programme-procedures',
    question: 'Which procedures are included in the Ealing Hospital robotic programme?',
    answer:
      'LNWH has reported use of the Ealing robotic programme for selected gallbladder, hernia and anti-reflux procedures. That programme-level statement does not mean a robotic approach is available or suitable for every patient.',
  },
  {
    id: 'who-is-suitable',
    question: 'How is suitability for robotic surgery decided?',
    answer:
      'Suitability is decided after reviewing the condition, symptoms, investigations, general health, previous operations and the hospital pathway. A consultation is required before any particular surgical approach can be recommended.',
  },
  {
    id: 'evidence-for-experience',
    question: 'What independent evidence describes Prof. Sheth’s robotic surgery activity?',
    answer:
      'London North West University Healthcare NHS Trust published dated reports in May and June 2026 describing Prof. Sheth’s training and early procedure activity within the Ealing Hospital robotic surgery programme.',
  },
];

export const roboticInstitutionalEvidence = institutionalEvidence.filter(
  (evidence) => evidence.topic === 'robotic-surgery'
);

export const professionalProfileEvidence = institutionalEvidence.filter(
  (evidence) => evidence.id !== 'lnwh-robotic-programme-milestone'
);
