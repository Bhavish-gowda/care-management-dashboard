import type { User } from '../../types/user';
import { useUsersContext } from '../../context/UsersContext';
import { useFormsContext } from '../../context/FormsContext';
import { formatAddress, formatDateTime, downloadJson } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { X, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import UserForm from './UserForm';

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UserModal = ({ isOpen, onClose }: UserModalProps) => {
  const { selectedUser, deleteUser, updateUser } = useUsersContext();
  const { submissions } = useFormsContext();
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !selectedUser) return null;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(selectedUser.id);
      toast.success('User deleted successfully.');
      onClose();
    }
  };

  const handleEditUser = (values: any) => {
    updateUser(selectedUser.id, values);
    toast.success('User updated successfully.');
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const userSubmissions = submissions.filter((s) => s.userId === selectedUser.id);
  const healthAssessments = userSubmissions.filter((s) => s.type === 'healthAssessment');
  const incidentReports = userSubmissions.filter((s) => s.type === 'incidentReport');

  const handleDownloadSubmission = (submission: (typeof userSubmissions)[number]) => {
    const timestamp = new Date(submission.submittedAt).getTime();
    const prefix =
      submission.type === 'healthAssessment' ? 'health-assessment' : 'incident-report';
    const fileName = `${prefix}-${timestamp}.json`;
    downloadJson(submission, fileName);
  };

  const renderUserDetails = (user: User) => (
    <div className="space-y-3 text-sm">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-semibold text-white shadow-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-slate-50">{user.name}</p>
          <p className="text-[11px] text-slate-400">Resident / Care profile overview</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] font-medium text-slate-400">Email</p>
          <p className="text-sm text-slate-100">{user.email}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium text-slate-400">Phone</p>
          <p className="text-sm text-slate-100">{user.phone}</p>
        </div>
      </div>
      <div>
        <p className="text-[11px] font-medium text-slate-400">Address</p>
        <p className="text-sm text-slate-100">{formatAddress(user.address)}</p>
      </div>
      {user.company?.name && (
        <div>
          <p className="text-[11px] font-medium text-slate-400">Company</p>
          <p className="text-sm text-slate-100">{user.company.name}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 px-3 py-6 sm:px-4 md:py-10">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900/95 shadow-2xl ring-1 ring-white/10 transform transition-all duration-200 scale-100">
        <div className="flex items-center justify-between border-b border-white/5 px-4 sm:px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-50">Profile & Care History</h2>
            <p className="text-[11px] text-slate-400">User details & submitted care forms</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
          >
            <span className="sr-only">Close</span>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-4 sm:px-5 py-4 max-h-[70vh] overflow-y-auto space-y-6">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                User overview
              </h3>
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-100 transition-all duration-200 hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Edit className="h-3 w-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>
            <div className="rounded-xl border border-white/5 bg-slate-900/80 p-4">
              {isEditing ? (
                <UserForm
                  initialUser={selectedUser}
                  onSubmit={handleEditUser}
                  onCancel={handleCancelEdit}
                />
              ) : (
                renderUserDetails(selectedUser)
              )}
            </div>
          </section>

          {!isEditing && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Health assessments
                </h3>
                <span className="text-[11px] text-slate-500">
                  {healthAssessments.length} record
                  {healthAssessments.length === 1 ? '' : 's'}
                </span>
              </div>
              {healthAssessments.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No health assessments submitted for this user yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {healthAssessments.map((submission) => (
                    <div
                      key={submission.id}
                      className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-slate-50">
                          {submission.residentName} — {submission.caregiverName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {formatDateTime(submission.submittedAt)}
                        </span>
                      </div>
                      <p className="text-slate-200 line-clamp-2">{submission.caregiverNotes}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {!isEditing && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Incident reports
                </h3>
                <span className="text-[11px] text-slate-500">
                  {incidentReports.length} record
                  {incidentReports.length === 1 ? '' : 's'}
                </span>
              </div>
              {incidentReports.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No incident reports have been logged for this user.
                </p>
              ) : (
                <div className="space-y-3">
                  {incidentReports.map((submission) => (
                    <div
                      key={submission.id}
                      className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-slate-50">
                          {submission.residentName} — {submission.caregiverName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {formatDateTime(submission.submittedAt)}
                        </span>
                      </div>
                      <p className="text-slate-200 line-clamp-2">{submission.incidentDescription}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {!isEditing && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Submission History
                </h3>
                <span className="text-[11px] text-slate-500">
                  {userSubmissions.length} submission{submissions.length === 1 ? '' : 's'}
                </span>
              </div>
              {userSubmissions.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No submissions have been recorded for this user yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {userSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-xs"
                    >
                      <div className="space-y-0.5">
                        <p className="font-medium text-slate-50">
                          {submission.type === 'healthAssessment'
                            ? 'Health Assessment'
                            : 'Incident Report'}{' '}
                          · <span className="text-slate-300">{submission.residentName}</span>
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {formatDateTime(submission.submittedAt)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDownloadSubmission(submission)}
                        className="inline-flex items-center rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-100 transition-all duration-200 hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Download JSON
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between border-t border-white/5 px-4 sm:px-5 py-3">
          {!isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex justify-center items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete user</span>
            </button>
          )}
          {!isEditing ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center items-center rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="inline-flex justify-center items-center rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;
