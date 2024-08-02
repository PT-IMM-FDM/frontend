import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../api/data-user";
import useAuthStore from "../../stores/useAuthStore";
import useDataUsersStore from "../../stores/useDataUsersStore";
import UserForm from "./UserForm";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

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
  const [originalUserData, setOriginalUserData] = useState({})
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
    const storedEmploymentStatuses = localStorage.getItem("dataStatus");
    if (storedEmploymentStatuses) {
      setEmploymentStatuses(JSON.parse(storedEmploymentStatuses));
    }
    const storedCompanies = localStorage.getItem("dataCompany");
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await updateUser(token, userData);
      if (error) {
        console.error("Error updating user:", error);
      } else {
        const updatedRows = rows.map((row) =>
          row.user_id === userData.user_id ? userData : row
        );
        setRows(updatedRows);
        setIsEditable(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Box sx={{ width: 300 }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Box>
      ) : (
        <UserForm
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
    </div>
  );
}
