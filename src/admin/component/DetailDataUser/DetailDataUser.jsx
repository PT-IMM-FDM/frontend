import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../api/data-user";
import useAuthStore from "../../stores/useAuthStore";
import useDataUsersStore from "../../stores/useDataUsersStore";
import UserForm from "./UserForm";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

export default function DetailDataUser() {
  const { token } = useAuthStore((state) => ({ token: state.token }));
  const { rows, setRows } = useDataUsersStore((state) => ({
    rows: state.rows,
    setRows: state.setRows,
  }));
  const [isEditable, setIsEditable] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [employmentStatuses, setEmploymentStatuses] = useState([]);
  const [companies, setCompanies] = useState([]);
  const { user_id } = useParams();
  const [userData, setUserData] = useState({});
  const [originalUserData, setOriginalUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUser = await getUserById(token, user_id);
        const formattedBirthDate = new Date(dataUser.data[0].birth_date)
          .toISOString()
          .split("T")[0];
        setUserData({
          ...dataUser.data[0],
          birth_date: formattedBirthDate,
        });
        setOriginalUserData({
          ...dataUser.data[0],
          birth_date: formattedBirthDate,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    if (user_id) {
      fetchData();
    }
  }, [token, user_id]);

  useEffect(() => {
    const storedDepartments = localStorage.getItem("dataDepartments");
    if (storedDepartments) {
      setDepartments(JSON.parse(storedDepartments));
    }

    const storedJobPositions = localStorage.getItem("dataJobPositions");
    if (storedJobPositions) {
      setJobPositions(JSON.parse(storedJobPositions));
    }

    const storedStatuses = localStorage.getItem("dataStatus");
    if (storedStatuses) {
      setEmploymentStatuses(JSON.parse(storedStatuses));
    }

    const storedCompanies = localStorage.getItem("dataCompany");
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => {
      if (name === "company_id") {
        return {
          ...prevUserData,
          company_id: value,
          company: companies.find((c) => c.company_id === parseInt(value)),
        };
      }
      if (name === "department_id") {
        return {
          ...prevUserData,
          department_id: value,
          department: departments.find(
            (d) => d.department_id === parseInt(value)
          ),
        };
      }
      if (name === "job_position_id") {
        return {
          ...prevUserData,
          job_position_id: value,
          job_position: jobPositions.find(
            (p) => p.job_position_id === parseInt(value)
          ),
        };
      }
      if (name === "employment_status_id") {
        return {
          ...prevUserData,
          employment_status_id: value,
          employment_status: employmentStatuses.find(
            (s) => s.employment_status_id === parseInt(value)
          ),
        };
      }
      if (name === "role_id") {
        return {
          ...prevUserData,
          role_id: value,
          role: {
            role_id: parseInt(value),
            name: ["Admin", "Full Viewer", "Viewer", "User"][
              parseInt(value) - 1
            ],
          },
        };
      }
      return { ...prevUserData, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser(token, userData);

      setRows(
        rows.map((row) => (row.user_id === userData.user_id ? userData : row))
      );

      const updatedUsers = JSON.parse(
        localStorage.getItem("usersData") || "[]"
      ).map((user) => (user.user_id === userData.user_id ? userData : user));
      localStorage.setItem("usersData", JSON.stringify(updatedUsers));

      setIsEditable(false);
      toast.success("Update User Successfully.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed Update User.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
    }
  };

  console.log("data User", userData)

  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <Skeleton
            sx={{ borderRadius: "5px", bgcolor: "grey.200" }}
            variant="rectangular"
            width="100%"
            height={500}
          />
        </Box>
      ) : (
        <UserForm
          token={token}
          user_id={user_id}
          userData={userData}
          setUserData={setUserData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEditable={isEditable}
          setIsEditable={setIsEditable}
          departments={departments}
          jobPositions={jobPositions}
          employmentStatuses={employmentStatuses}
          companies={companies}
          originalUserData={originalUserData}
        />
      )}
    </>
  );
}
