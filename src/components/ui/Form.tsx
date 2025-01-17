export const InputField = ({ label, ...props }: { label: string; [key: string]: any }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-white">{label}</label>
      <input
        className="mt-1 p-2.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...props}
      />
    </div>
);
  