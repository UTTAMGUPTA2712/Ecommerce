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

const columns = [
    { label: '#', minWidth: 20 },
    { label: 'Category Title', minWidth: 150 },
    { label: "Handle Category", minWidth: 100 }
];
export const SetCategory = () => {
    const [rows, setRows] = useState([])
    const [formdata, setFormdata] = useState("")
    const getData = async () => {
        const response = await GetCategory()
        setRows(response.data)
    }
    const addCategory = async () => {
        const response = await AddCategory({ name: formdata })
        setRows([...rows, response.data])
        setFormdata("")
    }
    const deleteCategory = async (id, index) => {
        await DeleteCategory({ id: id })
        let arr = [...rows]
        arr.splice(index, 1)
        setRows(arr)
    }
    console.log("form", formdata);
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <TableContainer sx={{ backgroundColor:"white",overflowY: "auto", height: "100%",boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
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
                                <TextField variant='filled' label="Category" value={formdata?.name} onChange={(e) => setFormdata(e.target.value)}></TextField>
                            </TableCell>
                            <TableCell align={"center"}>
                                <Button variant='contained' disabled={!formdata} onClick={addCategory}>ADD</Button>
                            </TableCell>
                        </TableRow>
                        {rows.map((row, index) => {
                            return (
                                <TableRow hover>
                                    <TableCell align={"center"}>{index + 1}</TableCell>
                                    <TableCell align={"center"}>{row?.name}</TableCell>
                                    <TableCell align={"center"}><Delete onClick={() => deleteCategory(row._id, index)} /></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
