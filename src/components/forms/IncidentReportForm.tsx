import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AlertTriangle, ClipboardList, Activity } from 'lucide-react';
import { useFormsContext } from '../../context/FormsContext';
import { useUsersContext } from '../../context/UsersContext';
import type { IncidentReportFormValues } from '../../types/forms';

const defaultValues: IncidentReportFormValues = {
  userId: 0,
  residentName: '',
  date: '',
  caregiverName: '',
  time: '',
  location: '',
  roomNumber: '',
  incidentTypes: {
    fall: false,
    medicationError: false,
    injury: false,
    behavioralIssue: false,
    other: false
  },
  incidentDescription: '',
  actionsTaken: {
    doctorNotified: false,
    familyNotified: false,
    medicationGiven: false,
    observationContinued: false
  },
  followUpNotes: ''
};

const IncidentReportForm = () => {
  const fieldClass =
    'w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200';
  const checkboxClass =
    'h-4 w-4 rounded border border-slate-600 bg-slate-900 accent-blue-500';
  const { users } = useUsersContext();
  const { addIncidentReport } = useFormsContext();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IncidentReportFormValues>({
    defaultValues,
    mode: 'onBlur'
  });

  const onSubmit = (values: IncidentReportFormValues) => {
    addIncidentReport(values);
    reset(defaultValues);
    toast.success('Incident report submitted successfully.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-slate-100">
      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <ClipboardList className="h-4 w-4 text-slate-300" />
          <span>Resident Details</span>
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Select User</label>
              <select
                {...register('userId', { 
                  required: 'Please select a user', 
                  valueAsNumber: true,
                  validate: (value) => value !== 0 || 'Please select a user'
                })}
                className={fieldClass}
              >
                <option value={0}>Select a user...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.userId && (
                <p className="mt-1 text-xs text-red-400">{errors.userId.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Resident Name
              </label>
              <input 
                {...register('residentName', { required: 'Resident name is required' })} 
                className={fieldClass} 
              />
              {errors.residentName && (
                <p className="mt-1 text-xs text-red-400">{errors.residentName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Date</label>
              <input 
                type="date" 
                {...register('date', { required: 'Date is required' })} 
                className={fieldClass} 
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-400">{errors.date.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Caregiver Name
              </label>
              <input 
                {...register('caregiverName', { required: 'Caregiver name is required' })} 
                className={fieldClass} 
              />
              {errors.caregiverName && (
                <p className="mt-1 text-xs text-red-400">{errors.caregiverName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Time</label>
              <input type="time" {...register('time')} className={fieldClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Location</label>
              <input {...register('location')} className={fieldClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Room Number</label>
              <input {...register('roomNumber')} className={fieldClass} />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <span>Incident Type</span>
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1 text-xs">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('incidentTypes.fall')} className={checkboxClass} />
              Fall
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                {...register('incidentTypes.medicationError')}
                className={checkboxClass}
              />
              Medication Error
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('incidentTypes.injury')} className={checkboxClass} />
              Injury
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                {...register('incidentTypes.behavioralIssue')}
                className={checkboxClass}
              />
              Behavioral Issue
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('incidentTypes.other')} className={checkboxClass} />
              Other
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <ClipboardList className="h-4 w-4 text-sky-400" />
          <span>Incident Description</span>
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
          <label className="block text-xs font-medium text-slate-200 mb-1">
            Incident Description
          </label>
          <textarea rows={4} {...register('incidentDescription', { required: 'Incident description is required' })} className={fieldClass} />
          {errors.incidentDescription && (
            <p className="mt-1 text-xs text-red-400">{errors.incidentDescription.message}</p>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Activity className="h-4 w-4 text-emerald-400" />
          <span>Actions Taken</span>
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1 text-xs">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                {...register('actionsTaken.doctorNotified')}
                className={checkboxClass}
              />
              Doctor Notified
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                {...register('actionsTaken.familyNotified')}
                className={checkboxClass}
              />
              Family Notified
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                {...register('actionsTaken.medicationGiven')}
                className={checkboxClass}
              />
              Medication Given
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                {...register('actionsTaken.observationContinued')}
                className={checkboxClass}
              />
              Observation Continued
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <ClipboardList className="h-4 w-4 text-slate-300" />
          <span>Follow-up Notes</span>
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
          <label className="block text-xs font-medium text-slate-200 mb-1">
            Additional Follow-up Notes
          </label>
          <textarea rows={3} {...register('followUpNotes')} className={fieldClass} />
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
        >
          Submit Incident Report
        </button>
      </div>
    </form>
  );
};

export default IncidentReportForm;
