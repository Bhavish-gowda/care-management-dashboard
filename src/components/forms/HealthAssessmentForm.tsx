import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Activity, HeartPulse, ClipboardList, AlertTriangle } from 'lucide-react';
import { useFormsContext } from '../../context/FormsContext';
import { useUsersContext } from '../../context/UsersContext';
import type { HealthAssessmentFormValues } from '../../types/forms';

const defaultValues: HealthAssessmentFormValues = {
  userId: 0,
  residentName: '',
  date: '',
  caregiverName: '',
  age: 0,
  gender: '',
  roomNumber: '',
  temperature: '',
  bloodPressure: '',
  heartRate: '',
  oxygenLevel: '',
  respiratoryRate: '',
  symptoms: {
    fever: false,
    cough: false,
    fatigue: false,
    headache: false,
    shortnessOfBreath: false,
    dizziness: false
  },
  caregiverNotes: '',
  dailyActivities: {
    walk: false,
    exercise: false,
    therapy: false,
    socialInteraction: false
  },
  meals: {
    breakfast: false,
    lunch: false,
    dinner: false,
    snacks: false
  },
  caregiverSignature: ''
};

const HealthAssessmentForm = () => {
  const fieldClass =
    'w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200';
  const checkboxClass =
    'h-4 w-4 rounded border border-slate-600 bg-slate-900 accent-blue-500';
  const { users } = useUsersContext();
  const { addHealthAssessment } = useFormsContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<HealthAssessmentFormValues>({
    defaultValues
  });

  const onSubmit = (values: HealthAssessmentFormValues) => {
    if (!values.userId) {
      toast.error('Please select a user before submitting.');
      return;
    }
    addHealthAssessment(values);
    reset(defaultValues);
    toast.success('Health assessment submitted successfully.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-slate-100">
      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Activity className="h-4 w-4 text-slate-400" />
          <span>Resident Details</span>
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Select User</label>
              <select
                {...register('userId', { required: 'User is required', valueAsNumber: true })}
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
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Date</label>
              <input
                type="date"
                {...register('date', { required: 'Date is required' })}
                className={fieldClass}
              />
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
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Age</label>
              <input
                type="number"
                {...register('age', { valueAsNumber: true, min: 0 })}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Gender</label>
              <select {...register('gender')} className={fieldClass}>
                <option value="">Select...</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
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
          <HeartPulse className="h-4 w-4 text-red-400" />
          <span>Vital Signs</span>
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-1">
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Temperature</label>
              <input {...register('temperature')} className={fieldClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Blood Pressure
              </label>
              <input {...register('bloodPressure')} className={fieldClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Heart Rate</label>
              <input {...register('heartRate')} className={fieldClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">Oxygen Level</label>
              <input {...register('oxygenLevel')} className={fieldClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Respiratory Rate
              </label>
              <input {...register('respiratoryRate')} className={fieldClass} />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <span>Symptoms</span>
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1 text-xs">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('symptoms.fever')} className={checkboxClass} />
              Fever
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('symptoms.cough')} className={checkboxClass} />
              Cough
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('symptoms.fatigue')} className={checkboxClass} />
              Fatigue
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('symptoms.headache')} className={checkboxClass} />
              Headache
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                {...register('symptoms.shortnessOfBreath')}
                className={checkboxClass}
              />
              Shortness of Breath
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('symptoms.dizziness')} className={checkboxClass} />
              Dizziness
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Activity className="h-4 w-4 text-emerald-400" />
          <span>Daily Activities</span>
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1 text-xs">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                {...register('dailyActivities.walk')}
                className={checkboxClass}
              />
              Walk
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                {...register('dailyActivities.exercise')}
                className={checkboxClass}
              />
              Exercise
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                {...register('dailyActivities.therapy')}
                className={checkboxClass}
              />
              Therapy
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                {...register('dailyActivities.socialInteraction')}
                className={checkboxClass}
              />
              Social Interaction
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <ClipboardList className="h-4 w-4 text-sky-400" />
          <span>Meals</span>
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1 text-xs">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('meals.breakfast')} className={checkboxClass} />
              Breakfast
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('meals.lunch')} className={checkboxClass} />
              Lunch
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('meals.dinner')} className={checkboxClass} />
              Dinner
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" {...register('meals.snacks')} className={checkboxClass} />
              Snacks
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <ClipboardList className="h-4 w-4 text-slate-300" />
          <span>Caregiver Notes</span>
        </h3>
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Caregiver Notes
              </label>
              <textarea rows={4} {...register('caregiverNotes')} className={fieldClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Caregiver Signature
              </label>
              <input {...register('caregiverSignature')} className={fieldClass} />
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
        >
          Submit Health Assessment
        </button>
      </div>
    </form>
  );
};

export default HealthAssessmentForm;
