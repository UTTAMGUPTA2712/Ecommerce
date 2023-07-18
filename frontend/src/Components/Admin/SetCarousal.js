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
import { server } from '../../data/constants';
import { GetCategory } from '../../services/Category/GetCategory';

const columns = [
    { label: '#', minWidth: 20 },
    { label: 'Carousal Image', minWidth: 150 },
    { label: 'Filter Category', minWidth: 100, },
    { label: "Handle Carosal", minWidth: 100 }
];
export const SetCarousal = () => {
    const [rows, setRows] = useState([])
    const [formdata, setFormdata] = useState("")
    const [fileList, setFileList] = useState([])
    const [Category, setCategory] = useState([])
    const changeFileList = (e) => {
        setFileList(e)
    }
    const changeImage = (e) => {
        setFormdata(p => ({ ...p, image: (server + e) }))
    }
    const getData = async () => {
        const response = await GetCarousal()
        setRows(response.data);
        const response2 = await GetCategory()
        setCategory(response2.data)
    }
    const addCarousal = async () => {
        const response = await CreateBannerService(formdata)
        setRows([...rows, response.data])
        setFormdata({ image: "", filter: "" })
        setFileList([])
    }
    const deleteCarousal = async (id, index) => {
        await DeleteCarousal({ id: id })
        let arr = [...rows]
        arr.splice(index, 1)
        setRows(arr)
    }
    useEffect(() => {
        getData();
    }, [])
    console.log(formdata);
    return (
        <>
            <TableContainer sx={{ overflowY: "auto", height: "100%",boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;" }}>
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
                                <UploadImage fileList={fileList} setFileList={changeFileList} changeImage={changeImage} count={1} />
                            </TableCell>
                            <TableCell align={"center"}>
                                <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-filled-label">Select Category</InputLabel>
                                    <Select label="Category" labelId='demo-simple-select-helper-label' id="demo-simple-select-helper" value={formdata?.filter}
                                        onChange={(e) => setFormdata(p => ({ ...p, filter: e.target.value }))}>
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {Category.map(data => (
                                            <MenuItem value={data?.name}>{data?.name}</MenuItem>
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
                                <TableRow sx={{ height: "7rem" }} hover>
                                    <TableCell align={"center"}>{index + 1}</TableCell>
                                    <TableCell align={"center"}><div className='centerimage' style={{ height: "8rem", width: "100%", backgroundImage: `url('${row?.image}')` }} /></TableCell>
                                    <TableCell align={"center"}>{row?.filter}</TableCell>
                                    <TableCell align={"center"}><Delete onClick={() => deleteCarousal(row._id, index)} /></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
