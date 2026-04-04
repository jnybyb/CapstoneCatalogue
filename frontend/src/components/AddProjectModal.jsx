import React, { useState } from "react";

function AddProjectModal({ isOpen, onClose, onAdd }) {

  const [form, setForm] = useState({
    bookNum: "",
    title: "",
    authors: ["", "", ""],
    course: "",
    month: "",
    year: "",
    adviser: "",
    panels: ["", "", ""],
    coordinator: "",
    programHead: "",
    dean: "",
    abstract: "",
    bookType: "Hard Bound",
    photo: null,
  });

  if (!isOpen) return null;

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, idx, value) => {
    setForm(prev => {
      const arr = [...prev[field]];
      arr[idx] = value;
      return { ...prev, [field]: arr };
    });
  };

  const handleAddField = (field) => {
    setForm(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const handleRemoveField = (field, idx) => {
    setForm(prev => {
      const arr = prev[field].filter((_, i) => i !== idx);
      return { ...prev, [field]: arr.length > 0 ? arr : [""] };
    });
  };

  const handlePhotoChange = (e) => {
    setForm(prev => ({
      ...prev,
      photo: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd && onAdd(form);
    onClose();
  };

  /* ================= UI ================= */

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content add-project-modal"
        onClick={e => e.stopPropagation()}
      >

        <button
          className="modal-close"
          onClick={onClose}
        >
          &times;
        </button>

        <h2>Add New Capstone Project</h2>

        <form
          onSubmit={handleSubmit}
          className="add-project-form"
        >

          <div className="form-container">

            {/* LEFT COLUMN */}

            <div className="form-column">

              {/* TITLE */}

              <div className="form-group">
                <label className="form-label">
                  Title <span className="required">*</span>
                </label>

                <textarea
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Project title"
                  required
                />
              </div>


              {/* AUTHORS */}

              <div className="form-group">
                <div className="section-header">
                  <label className="form-label">
                    Authors <span className="required">*</span>
                  </label>

                  <button
                    type="button"
                    className="add-btn-header"
                    onClick={() => handleAddField("authors")}
                  >
                    + Add
                  </button>
                </div>

                {form.authors.map((author, idx) => (
                  <div key={idx} className="input-with-remove">
                    <input
                      type="text"
                      value={author}
                      onChange={(e) =>
                        handleArrayChange("authors", idx, e.target.value)
                      }
                      placeholder={`Author ${idx + 1}`}
                    />

                    {idx >= 3 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => handleRemoveField("authors", idx)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>


              {/* ADVISER */}

              <div className="form-group">
                <label className="form-label">
                  Adviser <span className="required">*</span>
                </label>

                <input
                  name="adviser"
                  value={form.adviser}
                  onChange={handleChange}
                  placeholder="Adviser name"
                  required
                />
              </div>


              {/* COORDINATOR */}

              <div className="form-group">
                <label className="form-label">
                  Thesis Coordinator <span className="required">*</span>
                </label>

                <input
                  name="coordinator"
                  value={form.coordinator}
                  onChange={handleChange}
                  placeholder="Coordinator name"
                  required
                />
              </div>


              {/* PANEL MEMBERS */}

              <div className="form-group">
                <div className="section-header">
                  <label className="form-label">
                    Panel Members
                  </label>

                  <button
                    type="button"
                    className="add-btn-header"
                    onClick={() => handleAddField("panels")}
                  >
                    + Add
                  </button>
                </div>

                {form.panels.map((panel, idx) => (
                  <div key={idx} className="input-with-remove">
                    <input
                      type="text"
                      value={panel}
                      onChange={(e) =>
                        handleArrayChange("panels", idx, e.target.value)
                      }
                      placeholder={`Panel member ${idx + 1}`}
                    />

                    {idx >= 3 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => handleRemoveField("panels", idx)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

            </div>


            {/* RIGHT COLUMN */}

            <div className="form-column">

              {/* BOOK TYPE */}

              <div className="form-group">
                <label className="form-label">
                  Book Type
                </label>

                <select
                  name="bookType"
                  value={form.bookType}
                  onChange={handleChange}
                >
                  <option value="Hard Bound">Hard Bound</option>
                  <option value="Soft Bound">Soft Bound</option>
                </select>
              </div>


              {/* MONTH & YEAR */}

              <div className="form-row-inline">
                <div className="form-group">
                  <label className="form-label">
                    Month <span className="required">*</span>
                  </label>

                  <select
                    name="month"
                    value={form.month}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Month</option>
                    {[
                      "January","February","March","April",
                      "May","June","July","August",
                      "September","October","November","December"
                    ].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Year <span className="required">*</span>
                  </label>

                  <select
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Year</option>
                    {Array.from(
                      { length: 10 },
                      (_, i) => new Date().getFullYear() - i
                    ).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>


              {/* COURSE */}

              <div className="form-group">
                <label className="form-label">
                  Course
                </label>

                <select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                >
                  <option value="">Select Course</option>
                  <option value="BSIT">BSIT</option>
                  <option value="BITM">BITM</option>
                  <option value="BSCE">BSCE</option>
                  <option value="BSMRS">BSMRS</option>
                </select>
              </div>


              {/* PROGRAM HEAD */}

              <div className="form-group">
                <label className="form-label">
                  Program Head <span className="required">*</span>
                </label>

                <input
                  name="programHead"
                  value={form.programHead}
                  onChange={handleChange}
                  placeholder="Program Head name"
                  required
                />
              </div>


              {/* DEAN */}

              <div className="form-group">
                <label className="form-label">
                  Dean <span className="required">*</span>
                </label>

                <input
                  name="dean"
                  value={form.dean}
                  onChange={handleChange}
                  placeholder="Dean name"
                  required
                />
              </div>


              {/* ABSTRACT */}

              <div className="form-group">
                <label className="form-label">
                  Abstract
                </label>

                <textarea
                  name="abstract"
                  value={form.abstract}
                  onChange={handleChange}
                  placeholder="Project abstract"
                />
              </div>

            </div>

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="submit-btn"
          >
            Save
          </button>

        </form>


        {/* STYLE */}

        <style>{`

input::placeholder,
textarea::placeholder {
  color:#aaa;
}

.modal-overlay {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:1000;
}

.modal-content {
  background:#fff;
  padding:1.7rem 2rem;
  border-radius:0.5rem;
  width:35vw;
  max-height:94vh;
  overflow-y:auto;
  box-shadow:0 2px 16px rgba(0,0,0,0.15);
  position:relative;
}

.modal-close {
  position:absolute;
  top:0.5rem;
  right:0.5rem;
  border:1px solid #e4e6e8;
  border-radius:0.35rem;
  background:none;
  font-size:1.4rem;
  cursor:pointer;
  padding:0.1rem 0.5rem 0.4rem 0.5rem;
  width:35px;
  height:35px;
  display:flex;
  align-items:center;
  justify-content:center;
}

h2 {
  margin:0 0 1.5rem 0;
  font-size:1.35rem;
  font-weight:800;
  font-family:'DM Serif Display', serif;
  letter-spacing:0.02em;
}

.add-project-form {
  display:flex;
  flex-direction:column;
  gap:0.65rem;
}

.form-container {
  display:grid;
  grid-template-columns:1fr;
  gap:1.4rem;
}

.form-column {
  display:flex;
  flex-direction:column;
  gap:0.75rem;
}

.form-group {
  display:flex;
  flex-direction:column;
  gap:0.25rem;
}

.form-label {
  font-size:0.75rem;
  font-weight:600;
  letter-spacing:0.02em;
  color:#1f2937;
}

.required {
  color:#dc2626;
  margin-left:0.05rem;
}

.member-count {
  font-weight:400;
  font-size:0.85rem;
  color:#6b7280;
  margin-left:0.4rem;
}

.section-header {
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.add-btn-header {
  background:none;
  border:none;
  color: #1E293B;
  cursor:pointer;
  font-size:0.78rem;
  padding:0;
  font-weight:600;
  font-family:DM Serif Display, serif;
  letter-spacing:0.02em;
}

.add-btn-header:hover {
  color: #1c41a8d8;
}

.form-row-inline {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:1rem;
}

input,
textarea,
select {
  padding:0.45rem 0.5rem;
  border:1px solid #d1d5db;
  border-radius:0.3rem;
  font-family:inherit;
  font-size:0.7rem;
  color: #1f2937;
  background:#fff;
}

input:focus,
textarea:focus,
select:focus {
  outline:none;
  border-color: #1c41a89b;
  box-shadow:0 0 0 2px rgba(59, 130, 246, 0.05);
}

textarea {
  resize:vertical;
  min-height:2rem;
}

.input-with-remove {
  display:flex;
  gap:0.2rem;
  align-items:center;
}

.input-with-remove input {
  flex:1;
}

.remove-btn {
  background:none;
  color: #dc2626;
  border:none;
  width:18px;
  height:18px;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  font-size:1rem;
  font-weight:500;
  flex-shrink:0;
}

.remove-btn:hover {
    transform: translateY(-2.5px);
}

.radio-group {
  display:flex;
  gap:1rem;
}

.radio-label {
  display:flex;
  gap:0.2rem;
  margin:0;
  cursor:pointer;
  font-weight:400;
  font-size:0.7rem;
}

.radio-label input[type="radio"] {
  margin:0;
  width:auto;
  cursor:pointer;
}

.file-input {
  padding:0.4rem 0.5rem;
}

.img-preview {
  margin-top:0.5rem;
}

.img-preview img {
  max-width:100px;
  max-height:100px;
  border:1px solid #d1d5db;
  border-radius:0.375rem;
}

.submit-btn {
  background:#1B212D;
  color:white;
  border:none;
  padding:0.5rem 1.5rem;
  border-radius:0.375rem;
  font-size:0.95rem;
  cursor:pointer;
  margin-top:0.5rem;
  transition:background 0.2s;
  align-self:flex-start;
  font-weight:500;
}

.submit-btn:hover {
  background:#0d0f15;
}

@media (max-width:1000px) {
  .modal-content {
    width:85vw;
  }

  .form-container {
    grid-template-columns:1fr;
    gap:0.65rem;
  }

  .form-row-inline {
    grid-template-columns:1fr;
    gap:0.8rem;
  }
}

@media (max-width:600px) {
  .modal-content {
    width:95vw;
    padding:1rem;
  }

  .form-container {
    grid-template-columns:1fr;
    gap:0.65rem;
  }

  .form-row-inline {
    grid-template-columns:1fr;
  }
}

        `}</style>

      </div>
    </div>
  );
}

export default AddProjectModal;