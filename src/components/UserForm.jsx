import React, { useState, useEffect } from 'react';

export default function UserForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    age: '',
    phone: '',
    mail: '',
    address: '',
    department: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData); // prefill for edit
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!form.name || !form.username) {
      alert('Required fields missing');
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="card p-3 mb-3">
      <div className="row">
        {Object.keys(form).map((key) => (
          <div className="col-md-6 mb-2" key={key}>
            <input
              className="form-control"
              placeholder={key}
              value={form[key] || ''}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          {initialData ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  );
}