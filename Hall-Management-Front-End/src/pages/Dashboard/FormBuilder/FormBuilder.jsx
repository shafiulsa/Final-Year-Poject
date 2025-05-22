import { useState, useRef, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const FormBuilder = () => {
  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: '✏️' },
    { type: 'number', label: 'Number Input', icon: '🔢' },
    { type: 'email', label: 'Email Input', icon: '✉️' },
    { type: 'password', label: 'Password Input', icon: '🔒' },
    { type: 'textarea', label: 'Text Area', icon: '📝' },
    { type: 'select', label: 'Dropdown', icon: '▾' },
    { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
    { type: 'radio', label: 'Radio Buttons', icon: '🔘' },
    { type: 'date', label: 'Date Picker', icon: '📅' },
  ];

  const [formName, setFormName] = useState('My Form');
  const [fields, setFields] = useState([]);
  const [jsonData, setJsonData] = useState('');
  const [newOption, setNewOption] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentFieldType, setCurrentFieldType] = useState(null);
  const [modalData, setModalData] = useState({
    label: '',
    rows: 4,
    cols: 20,
    checkboxCount: 2,
    checkboxOptions: ['Option 1', 'Option 2'],
    selectOptions: ['Option 1', 'Option 2'],
    radioOptions: ['Option 1', 'Option 2'],
  });

  const addField = (type) => {
    setCurrentFieldType(type);
    setModalData({
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      rows: 4,
      cols: 20,
      checkboxCount: 2,
      checkboxOptions: ['Option 1', 'Option 2'],
      selectOptions: ['Option 1', 'Option 2'],
      radioOptions: ['Option 1', 'Option 2'],
    });
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    const newField = {
      id: Date.now().toString(),
      type: currentFieldType,
      label: modalData.label,
      required: false,
      placeholder: '',
      ...(currentFieldType === 'textarea' ? { rows: modalData.rows, cols: modalData.cols } : {}),
      ...(currentFieldType === 'select' ? { options: modalData.selectOptions } : {}),
      ...(currentFieldType === 'radio' ? { options: modalData.radioOptions } : {}),
      ...(currentFieldType === 'checkbox' ? { options: modalData.checkboxOptions } : {}),
      defaultValue: currentFieldType === 'checkbox' ? false : '',
    };
    setFields([...fields, newField]);
    setShowModal(false);
    setCurrentFieldType(null);
  };

  const updateField = (id, updates) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const addOption = (fieldId) => {
    if (!newOption.trim()) return;
    
    setFields(fields.map(field => {
      if (field.id === fieldId) {
        return {
          ...field,
          options: [...(field.options || []), newOption.trim()]
        };
      }
      return field;
    }));
    setNewOption('');
  };

  const removeOption = (fieldId, optionIndex) => {
    setFields(fields.map(field => {
      if (field.id === fieldId) {
        const newOptions = [...field.options];
        newOptions.splice(optionIndex, 1);
        return {
          ...field,
          options: newOptions
        };
      }
      return field;
    }));
  };

  const changeFieldType = (id, newType) => {
    setFields(fields.map(field => {
      if (field.id === id) {
        const updatedField = {
          ...field,
          type: newType,
          ...(newType === 'select' || newType === 'radio' 
            ? { options: ['Option 1', 'Option 2'] } 
            : { options: undefined }
          ),
          ...(newType === 'checkbox' 
            ? { defaultValue: false } 
            : { defaultValue: '' }
          )
        };
        return updatedField;
      }
      return field;
    }));
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const moveField = useCallback((dragIndex, hoverIndex) => {
    setFields(prevFields => {
      const newFields = [...prevFields];
      const [removed] = newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, removed);
      return newFields;
    });
  }, []);

  const printForm = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Form</title>
          <link href="https://cdn.jsdelivr.net/npm/daisyui@2.51.6/dist/full.css" rel="stylesheet" type="text/css" />
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css" rel="stylesheet" type="text/css" />
          <style>
            @media print {
              body { padding: 20px; }
              button { display: none !important; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="container mx-auto p-4">
            <h1 class="text-2xl font-bold mb-6">${formName}</h1>
            <form class="space-y-4">
              ${fields.map(field => {
                switch(field.type) {
                  case 'text':
                  case 'number':
                  case 'email':
                  case 'password':
                  case 'date':
                    return `
                      <div class="form-control">
                        <label class="label">
                          <span class="label-text">
                            ${field.label}
                            ${field.required ? '<span class="text-error ml-1">*</span>' : ''}
                          </span>
                        </label>
                        <input
                          type="${field.type}"
                          class="input input-bordered w-full"
                          placeholder="${field.placeholder || ''}"
                          value="${field.defaultValue || ''}"
                          ${field.required ? 'required' : ''}
                        />
                      </div>
                    `;
                  case 'textarea':
                    return `
                      <div class="form-control">
                        <label class="label">
                          <span class="label-text">
                            ${field.label}
                            ${field.required ? '<span class="text-error ml-1">*</span>' : ''}
                          </span>
                        </label>
                        <textarea
                          class="textarea textarea-bordered w-full"
                          placeholder="${field.placeholder || ''}"
                          rows="${field.rows || 4}"
                          cols="${field.cols || 20}"
                          ${field.required ? 'required' : ''}
                        >${field.defaultValue || ''}</textarea>
                      </div>
                    `;
                  case 'select':
                    return `
                      <div class="form-control">
                        <label class="label">
                          <span class="label-text">
                            ${field.label}
                            ${field.required ? '<span class="text-error ml-1">*</span>' : ''}
                          </span>
                        </label>
                        <select class="select select-bordered w-full" ${field.required ? 'required' : ''}>
                          ${field.options?.map(option => `
                            <option value="${option}" ${option === field.defaultValue ? 'selected' : ''}>
                              ${option}
                            </option>
                          `).join('')}
                        </select>
                      </div>
                    `;
                  case 'checkbox':
                    return `
                      <div class="form-control">
                        ${field.options?.map(option => `
                          <label class="label cursor-pointer justify-start gap-2">
                            <input
                              type="checkbox"
                              class="checkbox checkbox-primary"
                              ${field.defaultValue ? 'checked' : ''}
                              ${field.required ? 'required' : ''}
                            />
                            <span class="label-text">
                              ${option}
                              ${field.required ? '<span class="text-error ml-1">*</span>' : ''}
                            </span>
                          </label>
                        `).join('')}
                      </div>
                    `;
                  case 'radio':
                    return `
                      <div class="form-control">
                        <label class="label">
                          <span class="label-text">
                            ${field.label}
                            ${field.required ? '<span class="text-error ml-1">*</span>' : ''}
                          </span>
                        </label>
                        ${field.options?.map(option => `
                          <label class="label cursor-pointer justify-start gap-2">
                            <input
                              type="radio"
                              name="${field.id}"
                              class="radio radio-primary"
                              value="${option}"
                              ${option === field.defaultValue ? 'checked' : ''}
                              ${field.required ? 'required' : ''}
                            />
                            <span class="label-text">${option}</span>
                          </label>
                        `).join('')}
                      </div>
                    `;
                  default:
                    return '';
                }
              }).join('')}
            </form>
            <button onclick="window.print()" class="btn btn-primary no-print mt-6">Print Form</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const FieldItem = ({ field, index, moveField, updateField, removeField, changeFieldType }) => {
    const ref = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    const [{ isDragging }, drag] = useDrag({
      type: 'FIELD',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'FIELD',
      hover: (item, monitor) => {
        if (!ref.current) return;
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) return;

        moveField(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    drag(drop(ref));

    return (
      <div 
        ref={ref} 
        className="bg-base-200 p-4 rounded-lg mb-2 cursor-move border border-base-300"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="font-bold">
            {field.label} <span className="text-sm opacity-70">({field.type})</span>
            {field.required && <span className="text-error ml-1">*</span>}
          </div>
          <div className="flex gap-2">
            <button 
              className="btn btn-sm btn-ghost"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? '👀' : '✏️'}
            </button>
            <button 
              className="btn btn-sm btn-ghost text-error"
              onClick={() => removeField(field.id)}
            >
              🗑️
            </button>
          </div>
        </div>

        {isEditing && (
          <div className="mt-3 space-y-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Field Type</span>
              </label>
              <select
                className="select select-bordered"
                value={field.type}
                onChange={(e) => changeFieldType(field.id, e.target.value)}
              >
                {fieldTypes.map((type) => (
                  <option key={type.type} value={type.type}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Label</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={field.label}
                onChange={(e) => updateField(field.id, { label: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Required</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={field.required}
                  onChange={(e) => updateField(field.id, { required: e.target.checked })}
                />
              </label>
            </div>

            {field.type === 'textarea' && (
              <div className="grid grid-cols-2 gap-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Rows</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={field.rows || 4}
                    onChange={(e) => updateField(field.id, { rows: parseInt(e.target.value) })}
                    min="1"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Columns</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={field.cols || 20}
                    onChange={(e) => updateField(field.id, { cols: parseInt(e.target.value) })}
                    min="1"
                  />
                </div>
              </div>
            )}

            {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
              <div className="space-y-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Options</span>
                  </label>
                  <div className="space-y-2">
                    {field.options?.map((option, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          className="input input-bordered flex-1"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...field.options];
                            newOptions[idx] = e.target.value;
                            updateField(field.id, { options: newOptions });
                          }}
                        />
                        <button 
                          className="btn btn-sm btn-error"
                          onClick={() => removeOption(field.id, idx)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="New option"
                  />
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => addOption(field.id)}
                  >
                    Add Option
                  </button>
                </div>
              </div>
            )}

            {field.type !== 'checkbox' && field.type !== 'radio' && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Placeholder</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={field.placeholder || ''}
                  onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                />
              </div>
            )}

            {field.type !== 'checkbox' && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Default Value</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={field.defaultValue || ''}
                  onChange={(e) => updateField(field.id, { defaultValue: e.target.value })}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const FieldPreview = ({ field }) => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'email':
      case 'password':
      case 'date':
        return (
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                {field.label}
                {field.required && <span className="text-error ml-1">*</span>}
              </span>
            </label>
            <input
              type={field.type}
              className="input input-bordered"
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              required={field.required}
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                {field.label}
                {field.required && <span className="text-error ml-1">*</span>}
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              required={field.required}
              rows={field.rows}
              cols={field.cols}
            />
          </div>
        );

      case 'select':
        return (
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                {field.label}
                {field.required && <span className="text-error ml-1">*</span>}
              </span>
            </label>
            <select 
              className="select select-bordered"
              defaultValue={field.defaultValue}
              required={field.required}
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'checkbox':
        return (
          <div className="form-control">
            {field.options?.map((option) => (
              <label key={option} className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  defaultChecked={Boolean(field.defaultValue)}
                  required={field.required}
                />
                <span className="label-text">
                  {option}
                  {field.required && <span className="text-error ml-1">*</span>}
                </span>
              </label>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                {field.label}
                {field.required && <span className="text-error ml-1">*</span>}
              </span>
            </label>
            {field.options?.map((option) => (
              <label key={option} className="label cursor-pointer justify-start gap-2">
                <input
                  type="radio"
                  name={field.id}
                  className="radio radio-primary"
                  value={option}
                  defaultChecked={option === field.defaultValue}
                  required={field.required}
                />
                <span className="label-text">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const clearForm = () => {
    if (window.confirm('Are you sure you want to clear the form?')) {
      setFields([]);
    }
  };

  const exportForm = () => {
    setJsonData(JSON.stringify({ formName, fields }, null, 2));
  };

  const importForm = () => {
    try {
      const data = JSON.parse(jsonData);
      if (data.fields && Array.isArray(data.fields)) {
        setFormName(data.formName || 'My Form');
        setFields(data.fields);
      } else {
        alert('Invalid form data format');
      }
    } catch (e) {
      alert('Invalid JSON: ' + e.message);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Builder Panel */}
          <div className="bg-base-100 p-6 rounded-box shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Form Builder</h2>
            
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Form Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Field Types</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {fieldTypes.map((fieldType) => (
                  <button
                    key={fieldType.type}
                    className="btn btn-outline btn-sm flex flex-col h-auto py-3"
                    onClick={() => addField(fieldType.type)}
                  >
                    <span className="text-xl mb-1">{fieldType.icon}</span>
                    <span>{fieldType.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Form Fields</h3>
                <button 
                  className="btn btn-sm btn-error"
                  onClick={clearForm}
                >
                  Clear Form
                </button>
              </div>
              
              {fields.length === 0 ? (
                <div className="alert alert-info">
                  <div>
                    <span>Add fields by clicking on the field types above</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <FieldItem
                      key={field.id}
                      field={field}
                      index={index}
                      moveField={moveField}
                      updateField={updateField}
                      removeField={removeField}
                      changeFieldType={changeFieldType}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="collapse collapse-plus bg-base-200 mb-6">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">
                Export/Import Form
              </div>
              <div className="collapse-content">
                <textarea
                  className="textarea textarea-bordered w-full h-40 font-mono text-sm"
                  value={jsonData}
                  onChange={(e) => setJsonData(e.target.value)}
                  placeholder="Form JSON will appear here"
                />
                <div className="flex gap-2 mt-2">
                  <button className="btn btn-sm btn-primary" onClick={exportForm}>
                    Export JSON
                  </button>
                  <button className="btn btn-sm btn-secondary" onClick={importForm}>
                    Import JSON
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-base-100 p-6 rounded-box shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Form Preview</h2>
              <button 
                className="btn btn-primary"
                onClick={printForm}
                disabled={fields.length === 0}
              >
                Print Form
              </button>
            </div>
            <div className="bg-base-200 p-6 rounded-box">
              <h3 className="text-xl font-semibold mb-4">{formName}</h3>
              
              {fields.length === 0 ? (
                <div className="alert alert-info">
                  <div>
                    <span>No fields added yet</span>
                  </div>
                </div>
              ) : (
                <form className="space-y-4">
                  {fields.map((field) => (
                    <FieldPreview key={field.id} field={field} />
                  ))}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Modal for Field Customization */}
        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Configure {currentFieldType} Field</h3>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Field Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={modalData.label}
                  onChange={(e) => setModalData({ ...modalData, label: e.target.value })}
                />
              </div>

              {currentFieldType === 'textarea' && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Rows</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered"
                      value={modalData.rows}
                      onChange={(e) => setModalData({ ...modalData, rows: parseInt(e.target.value) })}
                      min="1"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Columns</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered"
                      value={modalData.cols}
                      onChange={(e) => setModalData({ ...modalData, cols: parseInt(e.target.value) })}
                      min="1"
                    />
                  </div>
                </div>
              )}

              {(currentFieldType === 'checkbox' || currentFieldType === 'select' || currentFieldType === 'radio') && (
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Number of Options</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    value={modalData.checkboxCount}
                    onChange={(e) => {
                      const count = parseInt(e.target.value) || 1;
                      const options = Array.from({ length: count }, (_, i) => 
                        modalData[`${currentFieldType}Options`]?.[i] || `Option ${i + 1}`
                      );
                      setModalData({ 
                        ...modalData, 
                        checkboxCount: count,
                        [`${currentFieldType}Options`]: options 
                      });
                    }}
                    min="1"
                  />
                  <div className="mt-2 space-y-2">
                    {modalData[`${currentFieldType}Options`]?.map((option, idx) => (
                      <input
                        key={idx}
                        type="text"
                        className="input input-bordered w-full"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...modalData[`${currentFieldType}Options`]];
                          newOptions[idx] = e.target.value;
                          setModalData({ ...modalData, [`${currentFieldType}Options`]: newOptions });
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-action">
                <button className="btn btn-primary" onClick={handleModalSubmit}>
                  Add Field
                </button>
                <button className="btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default FormBuilder;