import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { GetCarousal } from '../../services/Carousal/GetCarousal';
import { DeleteCarousal } from '../../services/Carousal/DeleteCarousal';
import { CreateBannerService } from '../../services/Carousal/CreateBannerService';
import UploadImage from '../../utils/UploadImage';
import { serverError } from '../../data/constants';
import { GetCategory } from '../../services/Category/GetCategory';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/slice/messageSlice';

const columns = [
    { label: '#', minWidth: 20 },
    { label: 'Carousal Image', minWidth: 150 },
    { label: 'Filter Category', minWidth: 100, },
    { label: "Handle Carosal", minWidth: 100 }
];
export const SetCarousal = () => {
    const [rows, setRows] = useState([])
    const [formdata, setFormdata] = useState("")
    const [Category, setCategory] = useState([])
    const dispatch = useDispatch()
    const changeImage = (e) => {
        setFormdata(p => ({ ...p, image: e }))
    }
    const getData = async () => {
        try {
            const response = await GetCarousal()
            if (response.data === serverError) { dispatch(setMessage(serverError)) } else {
                setRows(response.data);
                try {
                    const response2 = await GetCategory()
                    if (response2.data === serverError) { dispatch(setMessage(serverError)) } else {
                        setCategory(response2.data)
                    }
                } catch (error) {
                    dispatch(setMessage(serverError))
                }
            }
        } catch (error) {
            dispatch(setMessage(serverError))
        }

    }
    const addCarousal = async () => {
        try {
            const response = await CreateBannerService(formdata)
            if (response.data === serverError) { dispatch(setMessage(serverError)) } else {
                setRows([...rows, response.data])
                setFormdata({ image: "", filter: "" })
            }
        } catch (error) {
            dispatch(setMessage(serverError))
        }
    }
    const deleteCarousal = async (id, index) => {
        try {
            const response = await DeleteCarousal({ id: id })
            if (response.data === serverError) { dispatch(setMessage(serverError)) } else {
                let arr = [...rows]
                arr.splice(index, 1)
                setRows(arr)
            }

        } catch (error) {
            dispatch(setMessage(serverError))
        }
    }
    useEffect(() => {
        getData();
    }, [])
    // console.log(formdata);
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
                                <UploadImage changeImage={changeImage} count={1} />
                            </TableCell>
                            <TableCell align={"center"}>
                                <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-filled-label">Select Category</InputLabel>
                                    <Select label="Category" labelId='demo-simple-select-helper-label' id="demo-simple-select-helper" value={formdata?.filter??""}
                                        onChange={(e) => setFormdata(p => ({ ...p, filter: e.target.value }))}>
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {Category.map((data,index) => (
                                            <MenuItem key={index} value={data?.name}>{data?.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell align={"center"}>
                                <Button variant='contained' disabled={!(formdata?.image && formdata?.filter)} onClick={addCarousal}>ADD</Button>
                            </TableCell>
                        </TableRow>
                        {rows.map((row, index) => {
                            return (
                                <TableRow key={index} sx={{ height: "7rem" }} hover>
                                    <TableCell align={"center"}>{index + 1}</TableCell>
                                    <TableCell align={"center"}><div className='centerimage' style={{ height: "8rem", width: "100%", backgroundImage: `url('${row?.image}')` }} /></TableCell>
                                    <TableCell align={"center"}>{row?.filter}</TableCell>
                                    <TableCell align={"center"}><Delete sx={{cursor:"pointer"}} onClick={() => deleteCarousal(row._id, index)} /></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
