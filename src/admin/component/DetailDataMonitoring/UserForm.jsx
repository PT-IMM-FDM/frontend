import React, { useState, useEffect } from "react";
import EditableField from "./EditableField";
import { toCamelCase } from "../../utils/stringUtils";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ImportButton from "./ImportButton";

const UserForm = ({
  userData = [], // Initialize as an empty array
  setUserData,
  handleSubmit,
  isEditable,
  setIsEditable,
  departments,
  jobPositions,
  employmentStatuses,
  companies,
  originalUserData,
}) => {
  const navigate = useNavigate();
  const [isFollowUpEditable, setIsFollowUpEditable] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [followUpData, setFollowUpData] = useState(userData[0]?.note || "");

  // Update follow-up data state when userData or isFollowUpEditable changes
  useEffect(() => {
    if (!isFollowUpEditable) {
      setFollowUpData(userData[0]?.note || "");
    }
  }, [userData, isFollowUpEditable]);

  const handleFollowUpChange = (e) => {
    setFollowUpData(e.target.value);
  };

  const handleFollowUpCancel = () => {
    setFollowUpData(originalUserData[0]?.note || "");
    setIsFollowUpEditable(false);
    setUploadedFileName(""); // Clear file name on cancel
  };

  const handleFollowSubmit = () => {
    setUserData(prevData => {
      // Update the follow-up note in the userData
      const updatedUserData = [...prevData];
      updatedUserData[0] = {
        ...updatedUserData[0],
        note: followUpData,
      };
      return updatedUserData;
    });
    setIsFollowUpEditable(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      // You can implement further logic to handle the file if needed
    }
  };

  const handleFileRemove = () => {
    setUploadedFileName("");
    // Implement further logic to remove the file if needed
  };

  const formatBoolean = (value) => {
    return value ? "Yes" : "No";
  };

  return (
    <div className="p-4 pb-8 border rounded-md shadow-md bg-white">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <button onClick={() => navigate("/admin/data-monitoring")}>
            <IoArrowBack className="text-[20px]" />
          </button>
          <h2 className="text-md ml-2 font-medium">Detail Data Monitoring</h2>
        </div>
      </div>
      <form
        className="h-[62vh] overflow-y-auto px-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <section className="mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-sm mb-2 text-gray-400">Data Follow Up</h1>
            {isFollowUpEditable ? (
              <div className="flex space-x-2">
                <button
                  className="bg-purple-500 text-white px-2 py-1 text-sm rounded"
                  onClick={handleFollowSubmit}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-300 text-black px-2 py-1 text-sm rounded"
                  onClick={handleFollowUpCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="bg-purple-500 text-white px-2 py-1 text-sm rounded"
                onClick={() => setIsFollowUpEditable(true)}
              >
                Edit
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-6">
            <div>
              <EditableField
                label="Follow Up"
                name="follow_up"
                value={followUpData}
                onChange={handleFollowUpChange}
                isEditable={isFollowUpEditable}
                type="text"
              />
            </div>
            <div>
              <p className="text-sm mb-2">Upload Attachment</p>
              {isFollowUpEditable ? (
                <>
                  <ImportButton onChange={handleFileChange}/>
                  {uploadedFileName && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{uploadedFileName}</span>
                      <button
                        type="button"
                        className="text-sm text-red-500"
                        onClick={handleFileRemove}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-500">Attachment Uploaded: {uploadedFileName}</p>
              )}
            </div>
          </div>
        </section>
        <h1 className="text-sm mb-2 text-gray-400">Data Responden</h1>
        <section className="grid grid-cols-2 gap-y-2 gap-x-6 mb-5">
          <EditableField
            label="Nama Lengkap"
            name="full_name"
            value={userData[0]?.user?.full_name || ""}
            isEditable={isEditable}
          />
          <EditableField
            label="No. Telepon"
            name="phone_number"
            value={userData[0]?.user?.phone_number || ""}
            isEditable={isEditable}
            type="tel"
          />
          <EditableField
            label="Email"
            name="email"
            value={userData[0]?.user?.email || ""}
            isEditable={isEditable}
            type="email"
          />
          <EditableField
            label="Nama Perusahaan"
            name="company_id"
            value={userData[0]?.user?.company?.name || ""}
            isEditable={isEditable}
            type="text"
          />
          <EditableField
            label="Departemen"
            name="department_id"
            value={userData[0]?.user?.department?.name || ""}
            isEditable={isEditable}
          />
          <EditableField
            label="Posisi"
            name="job_position_id"
            value={userData[0]?.user?.job_position?.name || ""}
            isEditable={isEditable}
          />
          <EditableField
            label="Status Pekerjaan"
            name="employment_status_id"
            value={userData[0]?.user?.employment_status?.name || ""}
            isEditable={isEditable}
          />
          <EditableField
            label="Status Kehadiran"
            name="attendance_status"
            value={
              userData[0]?.attendance_health_result?.attendance_status || ""
            }
            isEditable={isEditable}
          />
          <EditableField
            label="Bekerja Shift/Non-Shift"
            name="shift"
            value={userData[0]?.attendance_health_result?.shift || ""}
            isEditable={isEditable}
            type="email"
          />
          <EditableField
            label="Apakah Driver?"
            name="is_driver"
            value={formatBoolean(userData[0]?.attendance_health_result?.is_driver)}
            isEditable={isEditable}
          />
          <EditableField
            label="Nomor Lambung Kendaraan"
            name="vehicle_hull_number"
            value={
              userData[0]?.attendance_health_result?.vehicle_hull_number || "-"
            }
            isEditable={isEditable}
            type="text"
          />
          <EditableField
            label="Durasi Kerja"
            name="work_duration_plan"
            value={
              userData[0]?.attendance_health_result?.work_duration_plan || ""
            }
            isEditable={isEditable}
          />
          <EditableField
            label="Hasil Fit Daily Monitoring"
            name="result"
            value={userData[0]?.attendance_health_result?.result || ""}
            isEditable={isEditable}
          />
          <EditableField
            label="Rekomendasi"
            name="recomendation"
            value={userData[0]?.attendance_health_result?.recomendation || ""}
            isEditable={isEditable}
          />
          {userData.map((data, index) => (
            <EditableField
              key={index}
              label={toCamelCase(data.question?.question || '')}
              name={`question_answers[${index}].answer`}
              value={data.question_answer?.question_answer || ''}
              isEditable={isEditable}
            />
          ))}
        </section>
      </form>
    </div>
  );
};

export default UserForm;
