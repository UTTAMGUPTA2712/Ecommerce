import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { GetCoupon } from '../../services/Coupon/GetCoupon';
import { Delete } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { AddCouponsService } from '../../services/Coupon/AddCouponsService';
import { DisableCoupon } from '../../services/Coupon/DisableCoupon';
import { serverError } from '../../data/constants';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slice/messageSlice';

const columns = [
    { label: '#', minWidth: 20 },
    { label: 'Coupon Code', minWidth: 150 },
    { label: 'Discount', minWidth: 100, },
    { label: "Handle Coupon", minWidth: 100 }
];
export const SetCoupon = () => {
    const [rows, setRows] = useState([])
    const [formdata, setFormdata] = useState("")
    const dispatch = useDispatch()
    const getData = async () => {
        const response = await GetCoupon()
        if (response.data === serverError) { dispatch(setMessage(serverError)) } else {

            setRows(response.data)
        }
    }
    const addCoupon = async () => {
        const response = await AddCouponsService(formdata)
        if (response.data === serverError) { dispatch(setMessage(serverError)) } else {

            setRows([...rows, response.data])
            setFormdata({ name: "", coupon: "" })
        }
    }
    const deleteCoupon = async (id, index) => {
        const response = await DisableCoupon({ id: id })
        if (response.data === serverError) { dispatch(setMessage(serverError)) } else {

            let arr = [...rows]
            arr.splice(index, 1)
            setRows(arr)
        }
    }
    console.log("form", formdata);
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <TableContainer sx={{ backgroundColor: "white", overflowY: "auto", height: "100%", boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;" }}>
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
                            <TableCell></TableCell>
                            <TableCell align={"center"}>
                                <TextField variant='filled' label="Coupon Code" value={formdata?.name} onChange={(e) => setFormdata(p => ({ ...p, name: e.target.value }))}></TextField>
                            </TableCell >
                            <TableCell align={"center"}>
                                <TextField variant='filled' label="Discount(in Rs.)" value={formdata?.coupon} type='number' onChange={(e) => setFormdata(p => ({ ...p, coupon: e.target.value }))}></TextField>
                            </TableCell>
                            <TableCell align={"center"}>
                                <Button variant='contained' disabled={!(formdata?.name && formdata?.coupon)} onClick={addCoupon}>ADD</Button>
                            </TableCell>
                        </TableRow>
                        {rows.map((row, index) => {
                            return (
                                <TableRow hover>
                                    <TableCell align={"center"}>{index + 1}</TableCell>
                                    <TableCell align={"center"}>{row?.name}</TableCell>
                                    <TableCell align={"center"}>Rs.{row?.coupon}/-</TableCell>
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
