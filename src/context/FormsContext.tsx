import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import type {
  FormSubmission,
  HealthAssessmentFormValues,
  HealthAssessmentSubmission,
  IncidentReportFormValues,
  IncidentReportSubmission
} from '../types/forms';

type FormsContextValue = {
  submissions: FormSubmission[];
  addHealthAssessment: (values: HealthAssessmentFormValues) => void;
  addIncidentReport: (values: IncidentReportFormValues) => void;
};

const FormsContext = createContext<FormsContextValue | undefined>(undefined);

type FormsProviderProps = {
  children: ReactNode;
};

export const FormsProvider = ({ children }: FormsProviderProps) => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);

  const addHealthAssessment = (values: HealthAssessmentFormValues) => {
    const submission: HealthAssessmentSubmission = {
      ...values,
      id: crypto.randomUUID(),
      type: 'healthAssessment',
      submittedAt: new Date().toISOString()
    };
    setSubmissions((prev) => [submission, ...prev]);
  };

  const addIncidentReport = (values: IncidentReportFormValues) => {
    const submission: IncidentReportSubmission = {
      ...values,
      id: crypto.randomUUID(),
      type: 'incidentReport',
      submittedAt: new Date().toISOString()
    };
    setSubmissions((prev) => [submission, ...prev]);
  };

  const value: FormsContextValue = useMemo(
    () => ({
      submissions,
      addHealthAssessment,
      addIncidentReport
    }),
    [submissions]
  );

  return <FormsContext.Provider value={value}>{children}</FormsContext.Provider>;
};

export const useFormsContext = () => {
  const ctx = useContext(FormsContext);
  if (!ctx) {
    throw new Error('useFormsContext must be used within FormsProvider');
  }
  return ctx;
};

