import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { GetCoupon } from '../services/Coupon/GetCoupon';
import { Delete } from '@mui/icons-material';

const columns = [
    { label: '#', minWidth: 20 },
    { label: 'Coupon Code', minWidth: 150 },
    { label: 'Discount', minWidth: 100, },
    { label: "Delete Coupon", minWidth:100}
];
export const SetCarousal = () => {
    const [rows, setRows] = useState(["",""])
    const getData = async () => {
        const response = await GetCoupon()
        setRows(["",""])
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
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
                                    <TableCell align={"center"}>{row?.coupon}</TableCell>
                                    <TableCell align={"center"}>{row?.discount}</TableCell>
                                    <TableCell align={"center"}><Delete/></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
