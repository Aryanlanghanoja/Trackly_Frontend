import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { RecentLeads } from '@/components/dashboard/RecentLeads';
import { ProductCustomers } from '@/components/dashboard/ProductCustomers';
import { X } from 'lucide-react';

const Leads = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFileFormOpen, setIsFileFormOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    contactNo: '',
    email: '',
    district: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Toggle modals
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleForm = () => {
    setIsModalOpen(false);
    setIsFormOpen(!isFormOpen);
    setSuccessMessage('');
  };
  const toggleFileForm = () => {
    setIsModalOpen(false);
    setIsFileFormOpen(!isFileFormOpen);
    setSuccessMessage('');
  };

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setSuccessMessage('Lead submitted successfully!');
    
    // Clear the form
    setFormData({ name: '', date: '', contactNo: '', email: '', district: '' });

    // Automatically hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle file upload submission
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      console.log('Uploaded File:', selectedFile);
      setSuccessMessage(`File "${selectedFile.name}" uploaded successfully!`);
      setSelectedFile(null);

      // Automatically hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setSuccessMessage('Please select a file to upload.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Leads | Oriwa International</title>
      </Helmet>

      <div className="p-6 space-y-8">
        {/* Header Section */}
        <div className="dashboard-header flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
            <p className="text-gray-500">Welcome back to your lead page.</p>
          </div>

          {/* Add Leads Button */}
          <button
            className="text-white py-2 px-4 rounded-lg transition transform hover:scale-105"
            style={{ background: `hsl(var(--sidebar-background))` }}
            onClick={toggleModal}
          >
            + Add Leads
          </button>
        </div>

        {/* Leads and Customers Section */}
        <div className="grid grid-cols-1 gap-6 w-full">
          <RecentLeads fullPage />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">

            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold">Add Leads</h2>
              <X
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={toggleModal}
              />
            </div>

            {/* Modal Options */}
            <div className="flex flex-col space-y-4 mt-4">
              
              {/* Add via Form Button */}
              <button
                className="text-white py-2 rounded-lg transition transform hover:scale-105"
                style={{ background: `hsl(var(--sidebar-background))` }}
                onClick={toggleForm}
              >
                Add via Form
              </button>

              {/* Add via File Button */}
              <button
                className="text-white py-2 rounded-lg transition transform hover:scale-105"
                style={{ background: `hsl(var(--sidebar-accent))` }}
                onClick={toggleFileForm}
              >
                Add via File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lead Form Popup */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            
            {/* Form Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold">Lead Add Form</h2>
              <X
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={toggleForm}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                placeholder="Contact No"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="District"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>

              {/* Success Message */}
              {successMessage && (
                <p className="text-green-500 mt-2">{successMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* File Upload Form Popup */}
      {isFileFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">

            {/* Form Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold">Upload Lead File</h2>
              <X
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={toggleFileForm}
              />
            </div>

            {/* File Upload Form */}
            <form onSubmit={handleFileSubmit} className="space-y-4 mt-4">
              <input
                type="file"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Upload
              </button>

              {successMessage && (
                <p className="text-green-500 mt-2">{successMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Leads;
