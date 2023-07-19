import React, { useEffect, useState } from 'react';
import { Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { saveCoupon } from '../../redux/slice/cartSlice';
import { Done } from '@mui/icons-material';

const TAX_RATE = 0.18;

function ccyFormat(num) {
  return `₹ ${num?.toFixed(2)}/-`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit, pic) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price, pic };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}
const OrderDetail = ({ cart, couponData }) => {
  const [rows, setRows] = useState([]);
  const [data, setData] = useState({});
  const [coupon, setCoupon] = useState(couponData ?? "");
  const dispatch = useDispatch()
  const debounce = (e) => {
    let timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(saveCoupon(e))
    }, 1000)
  }
  useEffect(() => {
    const cartRows = Object?.values(cart)?.map(item => createRow(item?.data?.name, item?.value, item?.data?.price, item?.data?.image));
    setRows(cartRows);
    const invoiceTotal = subtotal(cartRows);
    const invoiceTaxes = TAX_RATE * invoiceTotal;
    const invoiceSubtotal = invoiceTotal - invoiceTaxes;
    setData({ total: invoiceTotal, subtotal: invoiceSubtotal, tax: invoiceTaxes });
  }, [cart]);

  return (
    <>
      <div id="checkOut">
        <TableContainer sx={{ backgroundColor: "white" }} component={Paper}>
          <Table aria-label="spanning table">
            <TableHead >
              <TableRow sx={{ backgroundColor: "white" }}>
                <TableCell align="center" colSpan={4}>
                  Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right"></TableCell>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align='center'><img style={{ width: "4rem", height: "3rem" }} alt='' src={row.pic} /></TableCell>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={4} colSpan={2} />
                <TableCell colSpan={2}>Sub Amount:</TableCell>
                <TableCell align="right">{ccyFormat(data.subtotal)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell >Tax Amount:</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align="right">{ccyFormat(data.tax)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell >Coupon Discount:</TableCell>
                <TableCell align="right"><Input variant="outlined" sx={{ border: (coupon === "FREE500") ? "2px solid greenyellow" : "2px solid tomato", borderStyle: "none none solid none", justifyContent: "center" }} placeholder='coupon...' endAdornment={(coupon === "FREE500") ? <Done style={{ color: "green" }} /> : ""} value={coupon} onChange={e => { setCoupon(e.target.value); debounce(e.target.value) }} /></TableCell>
                <TableCell align="right">{(coupon === "FREE500") ? (data.total <= 500 ? data.total : 500) : 0}</TableCell>{console.log(coupon)}
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Grand Total:</TableCell>
                <TableCell align="right">{(coupon === "FREE500") ? ccyFormat(((data.total <= 500) ? 0 : (data.total - 500))) : ccyFormat(data.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default OrderDetail;
