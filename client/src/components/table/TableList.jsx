import { useEffect, useState } from "react";
import "./table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUserList } from "../../helpers/apiRequest";
import axios from "../../helpers/axios";
import toast from "react-hot-toast";

const TableList = () => {

  const [users, setUsers] = useState();
  const [error, setError] = useState();
  const [deleting, setDeleting] = useState(false);

  const user_id = window.localStorage.getItem("_id");

  const deleteStaff = async (id) => {
    const res = await axios
      .delete(`/user/staff/${id}`, {
        method: "DELETE",
        query: true
      })
      .catch((err) => setError(err));
    if (res?.status === 200) {
      const data = await res.data;
      return data;
    } else {
      return error;
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      console.log(id);
      console.log(window.localStorage.getItem("_id"));
      if (id === user_id) {
        toast.error("You can't delete yourself");
        return;
      }
      deleteStaff(id).then((data) => data.status === 400 ? toast.error(data.data.message) : toast.success(data.message)).catch(err => console.log(err));
    }
    setDeleting(true);
  }

  useEffect(() => {
    getUserList().then((data) => setUsers(data));
  }, [deleting]);


  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">S.No.</TableCell>
            <TableCell className="tableCell">Staff ID</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Date of Joining</TableCell>
            <TableCell className="tableCell">Address</TableCell>
            <TableCell className="tableCell">User Type</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="tableCell">{index + 1}</TableCell>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {row.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">{row.created_at}</TableCell>
              <TableCell className="tableCell">{row?.city + ", " + row?.state}</TableCell>
              <TableCell className="tableCell">{row.isAdmin ? "Admin" : "Staff"}</TableCell>
              <TableCell className="tableCell">
                <button
                  className={`p-2 ${row._id === user_id ? "bg-red-300 cursor-not-allowed" : "bg-red-500"} font-bold px-4 rounded-lg`}
                  onClick={() => handleDelete(row?._id)}
                  disabled={false}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
