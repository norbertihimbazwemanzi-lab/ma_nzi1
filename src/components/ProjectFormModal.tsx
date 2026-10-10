import React, { useState, useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { X, Upload, Image as ImageIcon, Plus, Trash2, Check, AlertCircle } from 'lucide-react';

interface ProjectFormModalProps {
  isOpen: boolean;
  projectToEdit: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export function ProjectFormModal({ isOpen, projectToEdit, onClose, onSave }: ProjectFormModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'school' | 'web-app' | 'learning'>('school');
  const [categoryLabel, setCategoryLabel] = useState('School Management System');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [fullOverview, setFullOverview] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('Full-Stack Developer');
  const [year, setYear] = useState('2026');
  const [status, setStatus] = useState<'Production Ready' | 'Active Prototype' | 'In Development'>('Production Ready');
  const [technologiesText, setTechnologiesText] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [tableName, setTableName] = useState('students');
  const [tableColumns, setTableColumns] = useState('id (INT PK), full_name, class_id, status');
  const [tableDesc, setTableDesc] = useState('Primary student profile records.');

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setCategory(projectToEdit.category);
      setCategoryLabel(projectToEdit.categoryLabel);
      setTagline(projectToEdit.tagline);
      setDescription(projectToEdit.description);
      setFullOverview(projectToEdit.fullOverview);
      setImage(projectToEdit.image);
      setRole(projectToEdit.role);
      setYear(projectToEdit.year);
      setStatus(projectToEdit.status);
      setTechnologiesText(projectToEdit.technologies.join(', '));
      setFeatures(projectToEdit.keyFeatures.length > 0 ? projectToEdit.keyFeatures : ['']);
      if (projectToEdit.databaseSchema.length > 0) {
        setTableName(projectToEdit.databaseSchema[0].table);
        setTableColumns(projectToEdit.databaseSchema[0].columns.join(', '));
        setTableDesc(projectToEdit.databaseSchema[0].description);
      }
    } else {
      // Defaults for new project
      setTitle('');
      setCategory('school');
      setCategoryLabel('School Management System');
      setTagline('');
      setDescription('');
      setFullOverview('');
      setImage('/src/assets/images/school_erp_dashboard_1791620350520.jpg');
      setRole('Lead Full-Stack Developer');
      setYear('2026');
      setStatus('Production Ready');
      setTechnologiesText('React.js, PHP, MySQL, Tailwind CSS, JavaScript');
      setFeatures(['Automated student enrollment records', 'Relational database architecture', 'Printable PDF report exports']);
      setTableName('students');
      setTableColumns('id (INT PK), reg_code, name, class_id, status');
      setTableDesc('Student entity master records.');
    }
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleUpdateFeature = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedTechs = technologiesText
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const filteredFeatures = features
      .map(f => f.trim())
      .filter(Boolean);

    const newOrUpdatedProject: Project = {
      id: projectToEdit ? projectToEdit.id : `proj-${Date.now()}`,
      title: title.trim(),
      category,
      categoryLabel: categoryLabel || (category === 'school' ? 'School Management System' : 'Web Application'),
      tagline: tagline.trim() || title.trim(),
      description: description.trim() || tagline.trim(),
      fullOverview: fullOverview.trim() || description.trim(),
      image: image || '/src/assets/images/school_erp_dashboard_1791620350520.jpg',
      role,
      year,
      status,
      technologies: parsedTechs.length > 0 ? parsedTechs : ['React.js', 'PHP', 'MySQL'],
      keyFeatures: filteredFeatures.length > 0 ? filteredFeatures : ['Core database functionality', 'Intuitive responsive user interface'],
      databaseSchema: [
        {
          table: tableName || 'records',
          columns: tableColumns.split(',').map(c => c.trim()).filter(Boolean),
          description: tableDesc || 'Relational system table.'
        }
      ],
      demoAvailable: category === 'school',
    };

    onSave(newOrUpdatedProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {projectToEdit ? 'Edit Project' : 'Add New Portfolio Project'}
            </h3>
            <p className="text-xs text-slate-500">
              Configure system details, screenshots, technologies, and MySQL schema.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. EduRunda SMS Portal"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setCategory(val);
                  setCategoryLabel(
                    val === 'school' ? 'School Management System' :
                    val === 'learning' ? 'E-Learning & Practice' : 'Web Application'
                  );
                }}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:border-blue-600"
              >
                <option value="school">School Management System (Specialty)</option>
                <option value="web-app">Web Application</option>
                <option value="learning">Learning & Prototype Project</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline / Key Selling Point *</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Automated Rwandan curriculum report card generator and attendance tracker"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
            />
          </div>

          {/* Image Upload / Preview */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">Project Screenshot / Image</label>
              <span className="text-[11px] text-slate-500">Upload from PC or provide image path/URL</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-4 aspect-video rounded-lg overflow-hidden bg-slate-200 border border-slate-300 relative">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>

              <div className="sm:col-span-8 space-y-2">
                <div>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs">
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                    <span>Upload Image File from PC</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Or enter image URL / path (e.g. /src/assets/images/...)"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description (for card)</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary displayed on project card..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Overview & Case Study</label>
            <textarea
              rows={3}
              value={fullOverview}
              onChange={(e) => setFullOverview(e.target.value)}
              placeholder="Detailed explanation of problem solved, architecture, and institutional value..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
            />
          </div>

          {/* Meta fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Lead Full-Stack Architect"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Year / Timeline</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2026"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:border-blue-600"
              >
                <option value="Production Ready">Production Ready</option>
                <option value="Active Prototype">Active Prototype</option>
                <option value="In Development">In Development</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Technologies Used (comma separated)</label>
            <input
              type="text"
              value={technologiesText}
              onChange={(e) => setTechnologiesText(e.target.value)}
              placeholder="React.js, PHP 8, MySQL, Tailwind CSS, JavaScript"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600 font-mono"
            />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">Key Features</label>
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Feature</span>
              </button>
            </div>
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                  placeholder={`Feature bullet #${idx + 1}`}
                  className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-600"
                />
                {features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* MySQL Schema */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="text-xs font-semibold text-slate-800">Primary MySQL Table Definition</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Table Name</label>
                <input
                  type="text"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="e.g. students"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Description</label>
                <input
                  type="text"
                  value={tableDesc}
                  onChange={(e) => setTableDesc(e.target.value)}
                  placeholder="e.g. Stores student demographic records"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Column Definitions</label>
              <input
                type="text"
                value={tableColumns}
                onChange={(e) => setTableColumns(e.target.value)}
                placeholder="id (INT PK), reg_number, full_name, class_id (FK), status"
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>{projectToEdit ? 'Save Changes' : 'Create & Publish Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
