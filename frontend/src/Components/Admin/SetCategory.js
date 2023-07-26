import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { GetCategory } from '../../services/Category/GetCategory';
import { AddCategory } from '../../services/Category/AddCategoryService';
import { DeleteCategory } from '../../services/Category/DeleteCategory';
import { serverError } from '../../data/constants';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slice/messageSlice';

const columns = [
    { label: '#', minWidth: 20 },
    { label: 'Category Title', minWidth: 150 },
    { label: "Handle Category", minWidth: 100 }
];
export const SetCategory = () => {
    const [rows, setRows] = useState([])
    const [formdata, setFormdata] = useState("")
    const dispatch = useDispatch()
    const getData = async () => {
        try {
            const response = await GetCategory()
            if (response.data === serverError) { dispatch(setMessage(serverError)) } else {
                setRows(response.data)
            }
        } catch (error) {
            dispatch(setMessage(serverError))
        }
    }
    const addCategory = async () => {
        try {
            const response = await AddCategory({ name: formdata })
            if (response.data === serverError) { dispatch(setMessage(serverError)) } else {
                setRows([...rows, response.data])
                setFormdata("")
            }
        } catch (error) {
            dispatch(setMessage(serverError))
        }
    }
    const deleteCategory = async (id, index) => {
        try {
            const response = await DeleteCategory({ id: id })
            if (response.data === serverError) { dispatch(setMessage(serverError)) } else {
                let arr = [...rows]
                arr.splice(index, 1)
                setRows(arr)
            }
        } catch (error) {
            dispatch(setMessage(serverError))
        }
    }
    // console.log("form", formdata);
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <TableContainer sx={{ backgroundColor: "white", overflowY: "auto", height: "100%", boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    align={"center"}
                                    sx={{ minWidth: column.minWidth, color: "#f0f0f0", backgroundColor: "#1769aa" }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align={"center"}></TableCell>
                            <TableCell align={"center"}>
                                <TextField variant='filled' label="Category" value={formdata??""} onChange={(e) => setFormdata(e.target.value)}></TextField>
                            </TableCell>
                            <TableCell align={"center"}>
                                <Button variant='contained' disabled={!formdata} onClick={addCategory}>ADD</Button>
                            </TableCell>
                        </TableRow>
                        {rows.map((row, index) => {
                            return (
                                <TableRow key={index} hover>
                                    <TableCell align={"center"}>{index + 1}</TableCell>
                                    <TableCell align={"center"}>{row?.name}</TableCell>
                                    <TableCell align={"center"}><Delete sx={{cursor:"pointer"}} onClick={() => deleteCategory(row._id, index)} /></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
