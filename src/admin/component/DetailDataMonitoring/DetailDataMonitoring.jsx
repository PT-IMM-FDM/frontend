import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import useDataUsersStore from "../../stores/useDataUsersStore";
import UserForm from "./UserForm";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { getFDMResponseDetails } from "../../api/fdm";

export default function DetailDataMonitoring({ user_id, attendance_health_result_id}) {
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
  const [userData, setUserData] = useState({});
  const [originalUserData, setOriginalUserData] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUser = await getFDMResponseDetails(token, user_id, attendance_health_result_id);
        setUserData(dataUser);
        setOriginalUserData(dataUser);
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
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Simulate updating data locally without API call
      setRows(rows.map(row => row.user_id === userData.user_id ? userData : row));

      const updatedUsers = JSON.parse(localStorage.getItem("usersData") || "[]").map(user => 
        user.user_id === userData.user_id ? userData : user
      );
      localStorage.setItem("usersData", JSON.stringify(updatedUsers));

      setIsEditable(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Box sx={{position: 'relative', width: '100%' }}>
          <img src="/Loader-1.gif" alt="loader" className="h-[5rem] absolute top-[40%] left-[45%] z-10" />
          <Skeleton sx={{borderRadius: '5px', bgcolor: 'grey.300'}} variant="rectangular" width="100%" height={550} />
        </Box>
      ) : (
        <UserForm
          userData={userData}
          setUserData={setUserData}
          // handleChange={handleChange}
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
