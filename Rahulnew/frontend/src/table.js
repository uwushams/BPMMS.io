import React, { useState } from 'react';
import './table.css'; // Import CSS file

const Table = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientName: '',
    name: '',
    relation: '',
    age: '',
    regDate: '',
    sys: '', // New field for systolic blood pressure
    dia: '', // New field for diastolic blood pressure
    pulses: '' // New field for pulses per minute
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if patient name is entered
    if (!formData.patientName) {
      alert('Please enter patient name');
      return;
    }
    // Check if family member name is entered
    if (!formData.name) {
      alert('Please enter family member name');
      return;
    }

    try {
      // Send form data to server
      const response = await fetch('http://localhost:5000/table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to store values');
      }

      // Add new family member to the patients array
      setPatients([...patients, { patientName: formData.patientName, ...formData }]);
      // Reset form data except patient name
      setFormData({
        patientName: '',
        name: '',
        relation: '',
        age: '',
        regDate: '',
        sys: '', // Reset systolic blood pressure
        dia: '', // Reset diastolic blood pressure
        pulses: '' // Reset pulses per minute
      });
    } catch (error) {
      console.error('Error storing values:', error);
      alert('Failed to store values');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="container">
      <h2>Patient Table</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Family Member Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Relation:
          <input
            type="text"
            name="relation"
            value={formData.relation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Registration Date:
          <input
            type="text"
            name="regDate"
            value={formData.regDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          SYS (mmHg):
          <input
            type="text"
            name="sys"
            value={formData.sys}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          DIA (mmHg):
          <input
            type="text"
            name="dia"
            value={formData.dia}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Pulses/min:
          <input
            type="text"
            name="pulses"
            value={formData.pulses}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Family Member</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Member Sno</th>
            <th>Name</th>
            <th>Relation</th>
            <th>Age</th>
            <th>Registration Date</th>
            <th>SYS (mmHg)</th>
            <th>DIA (mmHg)</th>
            <th>Pulses/min</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.patientName}</td>
              <td>{index + 1}</td>
              <td>{patient.name}</td>
              <td>{patient.relation}</td>
              <td>{patient.age}</td>
              <td>{patient.regDate}</td>
              <td>{patient.sys}</td>
              <td>{patient.dia}</td>
              <td>{patient.pulses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
