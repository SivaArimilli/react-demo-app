import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import ReusableTable from '../components/ReusableTable';
import UserForm from '../components/UserForm';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [sortKey, setSortKey] = useState('id');
  const [order, setOrder] = useState('asc');

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const res = await api.getUsers({
      page,
      limit: 5,
      sortKey,
      order
    });

    setData(res.rows);
    setTotal(res.total);
  };

  useEffect(() => {
    fetchData();
  }, [page, sortKey, order]);

  // Sorting
  const handleSort = (key) => {
    if (sortKey === key) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setOrder('asc');
    }
  };

  // Add / Update
  const handleSave = async (form) => {
    if (editData) {
      await api.updateUser(editData.id, form);
    } else {
      await api.addUser(form);
    }

    setShowForm(false);
    setEditData(null);
    fetchData();
  };

  // Delete
  const handleDelete = async (id) => {
    await api.deleteUser(id);
    fetchData();
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h3>Dashboard</h3>

        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(true);
            setEditData(null);
          }}
        >
          Add New
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <UserForm
          onSubmit={handleSave}
          initialData={editData}
          onCancel={() => {
            setShowForm(false);
            setEditData(null);
          }}
        />
      )}

      {/* TABLE */}
      <ReusableTable
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Age', accessor: 'age' },
          { header: 'Phone', accessor: 'phone' },
          { header: 'Mail', accessor: 'mail' },
          { header: 'Address', accessor: 'address' }
        ]}
        data={data}
        page={page}
        setPage={setPage}
        total={total}
        onSort={handleSort}
        sortKey={sortKey}
        order={order}
        onEdit={(row) => {
          setEditData(row);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}