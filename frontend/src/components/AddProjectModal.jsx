import React, { useState, useEffect } from "react";

function AddProjectModal({ isOpen, onClose, onAdd }) {

  const initialForm = {
    bookNum: "",
    title: "",
    authors: ["", "", ""],
    month: "",
    year: "",
    adviser: "",
    coordinators: [""],
    panels: ["", "", ""],
    programHead: "",
    dean: "",
    abstractImage: null,
    bookType: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
    }
  }, [isOpen]);

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

  const handleImageChange = (field) => (e) => {
    setForm(prev => ({
      ...prev,
      [field]: e.target.files[0]
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
                  placeholder="Enter Project Title"
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
                      required={idx === 0}
                    />

                    {form.authors.length > 3 && (
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
                  placeholder="Enter Adviser Name"
                  required
                />
              </div>


              {/* COORDINATOR */}

              <div className="form-group">
                <div className="section-header">
                  <label className="form-label">
                    Thesis Coordinator <span className="required">*</span>
                  </label>

                  <button
                    type="button"
                    className="add-btn-header"
                    onClick={() => handleAddField("coordinators")}
                  >
                    + Add
                  </button>
                </div>

                {form.coordinators.map((coordinator, idx) => (
                  <div key={idx} className="input-with-remove">
                    <input
                      type="text"
                      value={coordinator}
                      onChange={(e) =>
                        handleArrayChange("coordinators", idx, e.target.value)
                      }
                      placeholder="Enter Coordinator Name"
                      required={idx === 0}
                    />

                    {form.coordinators.length > 1 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => handleRemoveField("coordinators", idx)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>


              {/* PANEL MEMBERS */}

              <div className="form-group">
                <label className="form-label">
                  Panel Members
                </label>

                {form.panels.map((panel, idx) => (
                  <div key={idx} className="input-with-remove">
                    <input
                      type="text"
                      value={panel}
                      onChange={(e) =>
                        handleArrayChange("panels", idx, e.target.value)
                      }
                      placeholder={
                        idx === 0 ? "Chair Panel" : `Panel member ${idx}`
                      }
                    />

                    {form.panels.length > 3 && (
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
                  <option value="">Select Book Type</option>
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


              {/* PROGRAM HEAD */}

              <div className="form-group">
                <label className="form-label">
                  Program Head <span className="required">*</span>
                </label>

                <input
                  name="programHead"
                  value={form.programHead}
                  onChange={handleChange}
                  placeholder="Enter Name"
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
                  placeholder="Enter Name"
                  required
                />
              </div>


              {/* ABSTRACT IMAGE */}

              <div className="form-group">
                <label className="form-label">
                  Abstract
                </label>

                <div className="image-placeholder">
                  {form.abstractImage ? (
                    <img
                      src={URL.createObjectURL(form.abstractImage)}
                      alt="Abstract preview"
                      className="preview-image"
                    />
                  ) : (
                    <div className="placeholder-content">
                      <svg
                        className="placeholder-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="9" cy="9" r="2" />
                        <path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange("abstractImage")}
                  className="choose-photo-btn"
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
  color:#999;
  font-size:0.7rem;
  font-weight:400;
  font-family:inherit;
}

.modal-overlay {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:1000;
  overflow-y:auto;
  padding:1rem 0;
}

.modal-content {
  background:#fff;
  padding: 1.35rem;
  border-radius:0.5rem;
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
  font-size:1.15rem;
  font-weight:800;
  font-family:'DM Serif Display', serif;
  letter-spacing:0.02em;
}

.add-project-form {
  display:flex;
  flex-direction:column;
  gap:0.2rem;
}

.form-container {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:0.7rem;
}

.form-column {
  display:flex;
  flex-direction:column;
  gap:0.8rem;
}

.form-group {
  display:flex;
  flex-direction:column;
  gap:0.15rem;
}

.form-label {
  font-size:0.75rem;
  font-weight:600;
  letter-spacing:0.02em;
  color: #1f2937;
}

.required {
  color: #dc2626;
  margin-left:0.05rem;
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
  font-size:0.65rem;
  padding:0;
  font-weight:600;
  font-family:DM Serif Display, serif;
  letter-spacing:0.02em;
}

.add-btn-header:hover {
  color: #1c41a8d8;
}

.choose-photo-btn {
  padding:0.3rem 0.4rem;
  border:1px solid #d1d5db;
  border-radius:0.3rem;
  font-family:inherit;
  font-size:0.55rem;
  color:#1f2937;
  background:#fff;
  cursor:pointer;
  margin-top:0.3rem;
}

.choose-photo-btn:hover {
  background:#f9fafb;
  border-color:#999;
}

.image-placeholder {
  width:100%;
  height:150px;
  background:#e5e7eb;
  border:1px solid #d1d5db;
  border-radius:0.3rem;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}

.placeholder-content {
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  height:100%;
  color: #2b3d5e;
}

.placeholder-icon {
  width:80px;
  height:80px;
  color: #d1d5db;
  stroke-width:1;
}

.preview-image {
  width:100%;
  height:100%;
  object-fit: cover;
}

.form-row-inline {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:1.3rem;
}

input,
textarea,
select {
  padding:0.45rem 0.5rem;
  border:1px solid #d1d5db;
  border-radius:0.3rem;
  font-family:inherit;
  font-size:0.7rem;
  color: #2a2c47;
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
  gap:0.1rem;
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
  padding:0.5rem 2rem;
  border-radius:0.3rem;
  font-size:0.75rem;
  cursor:pointer;
  margin-top: 2rem;
  transition:background 0.2s;
  align-self:flex-end;
  font-weight:500;
  letter-spacing:0.02em;
}

.submit-btn:hover {
  background:#0d0f15;
}

@media (max-width:767px) {
  .modal-content {
    width:75vw;
    max-width:85w;
    margin:1rem auto;
    padding:1rem;
    max-height:70vh;
  }

  h2 {
    font-size:1.2rem;
  }

  .form-label {
    font-size:0.8rem;
  }

  .add-btn-header {
    font-size:0.75rem;
  }

  input::placeholder,
  textarea::placeholder {
    font-size:0.75rem;
  }

  input,
  textarea,
  select {
    font-size:0.75rem;
    padding:0.5rem 0.6rem;
  }

  textarea {
    min-height:2.5rem;
  }

  .form-container {
    grid-template-columns:1fr;
    gap:0.65rem;
  }

  .form-row-inline {
    grid-template-columns:1fr;
    gap:0.8rem;
  }

  .image-placeholder {
    height:120px;
  }

  .placeholder-icon {
    width:60px;
    height:60px;
  }
}

@media (min-width:768px) and (max-width:1023px) {
  .modal-content {
    width:70vw;
  }

  .form-row-inline {
    grid-template-columns:1fr 1fr;
    gap:1rem;
  }
}

@media (min-width:1024px) {
  .modal-content {
    width:43vw;
  }

  .form-row-inline {
    grid-template-columns:1fr 1fr;
    gap:1rem;
  }
}

        `}</style>

      </div>
    </div>
  );
}

export default AddProjectModal;