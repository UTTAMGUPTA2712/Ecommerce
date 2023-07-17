import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { GetCoupon } from '../services/Coupon/GetCoupon';
import { Delete } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { AddCouponsService } from '../services/Coupon/AddCouponsService';
import { DisableCoupon } from '../services/Coupon/DisableCoupon';
import { GetCategory } from '../services/Category/GetCategory';
import { AddCategory } from '../services/Category/AddCategoryService';
import { DeleteCategory } from '../services/Category/DeleteCategory';

const columns = [
    { label: '#', minWidth: 20 },
    { label: 'Category Title', minWidth: 150 },
    // { label: 'Discount', minWidth: 100, },
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
            <TableContainer sx={{ overflowY: "auto", height: "100%" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    align={"center"}
                                    sx={{ minWidth: column.minWidth, color: "#f0f0f0", backgroundColor: "#424242" }}>
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
