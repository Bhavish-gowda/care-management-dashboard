export type FormType = 'healthAssessment' | 'incidentReport';

export type HealthAssessmentFormValues = {
  userId: number;
  residentName: string;
  date: string;
  caregiverName: string;
  age: number;
  gender: string;
  roomNumber: string;
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  oxygenLevel: string;
  respiratoryRate: string;
  symptoms: {
    fever: boolean;
    cough: boolean;
    fatigue: boolean;
    headache: boolean;
    shortnessOfBreath: boolean;
    dizziness: boolean;
  };
  caregiverNotes: string;
  dailyActivities: {
    walk: boolean;
    exercise: boolean;
    therapy: boolean;
    socialInteraction: boolean;
  };
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    snacks: boolean;
  };
  caregiverSignature: string;
};

export type IncidentReportFormValues = {
  userId: number;
  residentName: string;
  date: string;
  caregiverName: string;
  time: string;
  location: string;
  roomNumber: string;
  incidentTypes: {
    fall: boolean;
    medicationError: boolean;
    injury: boolean;
    behavioralIssue: boolean;
    other: boolean;
  };
  incidentDescription: string;
  actionsTaken: {
    doctorNotified: boolean;
    familyNotified: boolean;
    medicationGiven: boolean;
    observationContinued: boolean;
  };
  followUpNotes: string;
};

export type HealthAssessmentSubmission = HealthAssessmentFormValues & {
  id: string;
  submittedAt: string;
  type: 'healthAssessment';
};

export type IncidentReportSubmission = IncidentReportFormValues & {
  id: string;
  submittedAt: string;
  type: 'incidentReport';
};

export type FormSubmission = HealthAssessmentSubmission | IncidentReportSubmission;
