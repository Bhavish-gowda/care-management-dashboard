import { HeartPulse, ClipboardList } from 'lucide-react';
import HealthAssessmentForm from '../components/forms/HealthAssessmentForm';
import IncidentReportForm from '../components/forms/IncidentReportForm';
import { useUsersContext } from '../context/UsersContext';

const CareFormsPage = () => {
  const { users } = useUsersContext();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-base sm:text-lg font-semibold text-slate-50">Care Forms</h1>
        <p className="text-[11px] sm:text-xs text-slate-400">
          Submit health assessments and incident reports linked to users.
        </p>
      </div>

      {users.length === 0 && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-900/30 px-4 py-3 text-xs text-amber-100">
          Load or create users first to link submissions.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-700 bg-slate-800/90 p-5 shadow-lg space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/60">
          <div className="flex items-start justify-between gap-3 border-b border-slate-700 pb-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/40">
                <HeartPulse className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-slate-50">Health Assessment</h2>
                <p className="text-[11px] text-slate-400">
                  Record daily health assessments for residents.
                </p>
              </div>
            </div>
          </div>
          <HealthAssessmentForm />
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/90 p-5 shadow-lg space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/20 hover:border-amber-500/60">
          <div className="flex items-start justify-between gap-3 border-b border-slate-700 pb-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/20 text-amber-300 border border-amber-500/40">
                <ClipboardList className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-slate-50">Incident Report</h2>
                <p className="text-[11px] text-slate-400">
                  Capture incidents, actions taken, and follow-up notes.
                </p>
              </div>
            </div>
          </div>
          <IncidentReportForm />
        </div>
      </div>
    </div>
  );
};

export default CareFormsPage;

