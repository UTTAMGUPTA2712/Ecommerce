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

const columns = [
    { label: '#', minWidth: 20 },
    { label: 'Coupon Code', minWidth: 150 },
    { label: 'Discount', minWidth: 100, },
    { label: "Delete Coupon", minWidth: 100 }
];
export const SetCoupon = () => {
    const [rows, setRows] = useState([])
    const [formdata, setFormdata] = useState("")
    const getData = async () => {
        const response = await GetCoupon()
        setRows(response.data)
    }
    const addCoupon = async () => {
        const response = await AddCouponsService(formdata)
        setRows([...rows, response.data])
        setFormdata({})
    }
    const deleteCoupon = async (id, index) => {
        const response = await DisableCoupon({ id: id })
        let arr=[...rows]
        arr.splice(index, 1)
        setFormdata(arr)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <TextField value={formdata?.name} onChange={(e) => setFormdata(p => ({ ...p, name: e.target.value }))}></TextField>
            <TextField value={formdata?.coupon} type='number' onChange={(e) => setFormdata(p => ({ ...p, coupon: e.target.value }))}></TextField>
            <Button disabled={!(formdata?.name&&formdata?.coupon)} onClick={addCoupon}>ADD</Button>
            <TableContainer sx={{ height: "100%", overflowY: "auto" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    align={"center"}
                                    sx={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            return (
                                <TableRow hover>
                                    <TableCell align={"center"}>{index + 1}</TableCell>
                                    <TableCell align={"center"}>{row?.name}</TableCell>
                                    <TableCell align={"center"}>{row?.coupon}</TableCell>
                                    <TableCell align={"center"}><Delete onClick={() => deleteCoupon(row._id, index)} /></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
