import React, { useState, useEffect } from "react";
import EditableField from "./EditableField";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ImportButton from "./ImportButton";
import {
  addAttachment,
  deleteAttachment,
  addNoteFollowUp,
} from "../../api/documentApi";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { formatResultFDM } from "../../utils/stringUtils";
import useAuthStore from "../../stores/useAuthStore";

const UserForm = ({
  userData = [], // Initialize as an empty array
  setUserData,
  attendance_health_result_id,
  token,
  isEditable,
  setIsEditable,
  refetchUserData,
  originalUserData,
}) => {
  const navigate = useNavigate();
  const [isFollowUpEditable, setIsFollowUpEditable] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [followUpData, setFollowUpData] = useState(
    userData[0]?.attendance_health_result?.note || ""
  );
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore((state) => ({ user: state.user }));
  const isAdmin = user.role.name === "Admin";

  useEffect(() => {
    if (!isFollowUpEditable) {
      setFollowUpData(userData[0]?.attendance_health_result?.note || "");
      setUploadedFiles(
        userData[0]?.attendance_health_result?.attachment_health_file.map(
          (file) => ({
            id: file.attendance_health_file_attachment_id,
            name: file.file_name,
            url: file.file_url,
          })
        ) || []
      );
    }
  }, [userData, isFollowUpEditable]);

  const handleFollowUpChange = (e) => {
    setFollowUpData(e.target.value);
  };

  const handleFollowUpCancel = () => {
    setFollowUpData(originalUserData[0]?.attendance_health_result?.note || "");
    setIsFollowUpEditable(false);
    setUploadedFiles(
      originalUserData[0]?.attendance_health_result?.attachment_health_file.map(
        (file) => ({
          id: file.attendance_health_file_attachment_id,
          name: file.file_name,
          url: file.file_url,
        })
      ) || []
    );
  };

  const handleFollowSubmit = async () => {
    // Update user data state
    setUserData((prevData) => {
      const updatedUserData = [...prevData];
      updatedUserData[0] = {
        ...updatedUserData[0],
        note: followUpData,
      };
      return updatedUserData;
    });
    setIsFollowUpEditable(false);

    // Check if follow-up data has changed
    const hasFollowUpChanged =
      userData[0]?.attendance_health_result.note !== followUpData;

    if (hasFollowUpChanged) {
      // Call addNoteFollowUp to save the follow-up note
      try {
        await addNoteFollowUp(token, attendance_health_result_id, followUpData);
        toast.success("Follow-up note added successfully", {
          autoClose: 3000,
          pauseOnHover: false,
          position: "bottom-right",
          theme: "colored",
        });
      } catch (error) {
        toast.error("Error adding follow-up note", {
          autoClose: 3000,
          pauseOnHover: false,
          position: "bottom-right",
          theme: "colored",
        });
        console.error("Error adding follow-up note:", error);
      }
    }

    // Handle file attachments
    if (files.length > 0) {
      for (const file of files) {
        setLoading(true);
        try {
          await addAttachment(token, attendance_health_result_id, file);
          toast.success("File added successfully", {
            autoClose: 3000,
            pauseOnHover: false,
            position: "bottom-right",
            theme: "colored",
          });
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    refetchUserData();
  };

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    const existingFileUrls = new Set(uploadedFiles.map((file) => file.url)); // Collect existing file URLs

    const newFiles = selectedFiles.filter(
      (file) => !existingFileUrls.has(URL.createObjectURL(file))
    ); // Filter out existing files

    if (newFiles.length + files.length > 3) {
      toast.error("You can only upload a maximum of 3 files.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      ...newFiles.map((file) => ({ name: file.name })),
    ]);
  };

  const handleFileRemove = async (index) => {
    const fileToRemove = uploadedFiles[index];
    setLoading(true);
    try {
      await deleteAttachment(
        token,
        attendance_health_result_id,
        fileToRemove.id
      );
      toast.success("File removed successfully", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
      const updatedFiles = files.filter((_, i) => i !== index);
      const updatedFileNames = uploadedFiles.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      setUploadedFiles(updatedFileNames);
      refetchUserData();
      setIsFollowUpEditable(false);
    } catch (error) {
      toast.error("Error removing file", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
      console.error("Error removing file:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatBoolean = (value) => {
    return value ? "Yes" : "No";
  };

  const handleSendMessage = () => {
    // Extract phone number and format it
    let phoneNumber = userData[0].user.phone_number || "";

    // Replace leading 0 with 62 if it exists
    if (phoneNumber.startsWith("0")) {
      phoneNumber = "62" + phoneNumber.substring(1);
    }

    // Define the message
    const message = `Kepada ${userData[0].user.full_name},
  
Kami dari Departemen Kesehatan Kerja PT Indominco Mandiri ingin mengingatkan Anda mengenai [...].
  
Berikut adalah rincian yang perlu Anda perhatikan:
  
Tanggal: [...]
Waktu: [...]
Tempat: [...]
Tujuan: [...]
  
Kami harap Anda dapat hadir tepat waktu dan membawa dokumen atau hasil pemeriksaan sebelumnya jika ada. Jika ada pertanyaan atau kendala, silakan hubungi kami di [...].

Terima kasih atas perhatian dan kerjasamanya.

Hormat kami,
  
[Your Name]
Departemen Occupational Health
PT Indominco Mandiri`;

    // Construct the URL
    const encodedMessage = encodeURIComponent(message); // Encode the message to handle special characters
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open the URL in a new tab
    window.open(url, "_blank");
  };

  return (
    <div className="p-4 pb-8 border rounded-md shadow-md bg-white">
      {loading && (
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: 999,
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(240, 240, 240, 0.7)",
          }}
        >
          <img src="/Loader-1.gif" alt="loader" className="h-[5rem] z-10" />
        </Box>
      )}
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
        onSubmit={(e) => {
          e.preventDefault();
          handleFollowSubmit();
        }}
      >
        <section className="mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-sm mb-2 text-gray-400">Data Follow Up</h1>
            {isAdmin &&
              (isFollowUpEditable ? (
                <div className="flex space-x-2">
                  <button
                    className="bg-purple-500 text-white px-2 py-1 text-[11px] md:text-sm rounded"
                    onClick={handleFollowSubmit}
                  >
                    Save Changes
                  </button>
                  <button
                    className="bg-gray-300 text-black px-2 py-1 text-[11px] md:text-sm rounded"
                    onClick={handleFollowUpCancel}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="bg-purple-900 text-white px-2 py-1 text-[11px] md:text-sm rounded"
                  onClick={() => setIsFollowUpEditable(true)}
                >
                  Edit
                </button>
              ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
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
              <p className="text-xs md:text-sm mb-2">Upload Attachment</p>
              {isAdmin && isFollowUpEditable ? (
                <>
                  <ImportButton onChange={handleFileChange} multiple />
                  {uploadedFiles.length > 0 && (
                    <ul className="list-disc list-inside">
                      {uploadedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="space-x-5 flex items-center before:content-['•'] before:mr-2 before:text-gray-500"
                        >
                          <span className="text-sm text-gray-500 w-full truncate">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            className="text-xl text-red-500"
                            onClick={() => handleFileRemove(index)}
                          >
                            <MdDelete />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <div className="text-sm text-gray-500">
                  Attachment Uploaded:
                  <ul className="list-disc mt-2">
                    {uploadedFiles.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center before:content-['•'] before:mr-2 before:text-gray-500"
                      >
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline w-full truncate"
                        >
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
        <h1 className="text-sm mb-2 text-gray-400">Data Responden</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 mb-5">
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
            endIcon={<BsWhatsapp className="text-green-500" />}
            onEndIconClick={handleSendMessage}
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
        </section>
        <section className="mb-4">
          <h1 className="text-sm mb-2 text-gray-400">Data Question & Answer</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 mb-5">
            <EditableField
              label="Status Kehadiran"
              name="attendance_status"
              value={userData[0]?.attendance_health_result?.attendance_status}
              isEditable={false}
            />
            <EditableField
              label="Durasi Rencana Kerja"
              name="work_duration_plan"
              value={userData[0]?.attendance_health_result?.work_duration_plan}
              isEditable={false}
            />
            <EditableField
              label="Bekerja Shift/Non-Shift"
              name="shift"
              value={
                userData[0]?.attendance_health_result?.shift === true
                  ? "Shift"
                  : "Non-Shift"
              }
              isEditable={false}
            />
            <EditableField
              label="Apakah Anda Seorang Driver/Operator"
              name="is_driver"
              value={formatBoolean(
                userData[0]?.attendance_health_result?.is_driver
              )}
              isEditable={false}
            />
            <EditableField
              label="Nomor Lambung Kendaraan"
              name="vehicle_hull_number"
              value={
                userData[0]?.attendance_health_result?.vehicle_hull_number ||
                "-"
              }
              isEditable={false}
            />
            <EditableField
              label="Hasil FDM"
              name="result"
              value={formatResultFDM(
                userData[0]?.attendance_health_result?.result
              )}
              isEditable={false}
            />
            <EditableField
              label="Rekomendasi"
              name="recomendation"
              value={userData[0]?.attendance_health_result?.recomendation}
              isEditable={false}
            />
            {userData.map((data, index) => (
              <EditableField
                key={index}
                label={data.question?.question || "Pertanyaan tidak tersedia"}
                value={
                  data.question_answer?.question_answer ||
                  "Jawaban tidak tersedia"
                }
                isEditable={false}
              />
            ))}
          </div>
        </section>
      </form>
    </div>
  );
};

export default UserForm;
