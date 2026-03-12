import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { NewUser, User } from '../../types/user';

type UserFormProps = {
  initialUser?: User | null;
  onSubmit: (values: NewUser) => void;
  onCancel: () => void;
};

type FormValues = NewUser;

const defaultValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: ''
  },
  company: {
    name: ''
  }
};

const UserForm = ({ initialUser, onSubmit, onCancel }: UserFormProps) => {
  const fieldClass =
    'w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues
  });

  useEffect(() => {
    if (initialUser) {
      reset({
        ...defaultValues,
        ...initialUser
      });
    } else {
      reset(defaultValues);
    }
  }, [initialUser, reset]);

  const handleFormSubmit = (values: FormValues) => {
    onSubmit(values);
    if (!initialUser) {
      reset(defaultValues);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 text-slate-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className={fieldClass}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className={fieldClass}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1">Phone</label>
          <input
            {...register('phone', { required: 'Phone is required' })}
            className={fieldClass}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1">Company</label>
          <input
            {...register('company.name')}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1">Street</label>
          <input
            {...register('address.street')}
            className={fieldClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1">Suite</label>
          <input
            {...register('address.suite')}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1">City</label>
          <input
            {...register('address.city')}
            className={fieldClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-200 mb-1">Zip Code</label>
          <input
            {...register('address.zipcode')}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-sm transition-all duration-200 hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98]"
        >
          {initialUser ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
