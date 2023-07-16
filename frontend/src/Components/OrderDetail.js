import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TAX_RATE = 0.18;

function ccyFormat(num) {
  return `₨. ${num?.toFixed(2)}/-`;
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

const OrderDetail = ({ cart }) => {
  // const cart = useSelector(state => state.cart.cart);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState({});
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
        <TableContainer component={Paper}>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
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
                  <TableCell align='center'><img style={{ width: "4rem", height: "3rem" }} src={row.pic} /></TableCell>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} colSpan={2} />
                <TableCell colSpan={2}>Sub Amount:</TableCell>
                <TableCell align="right">{ccyFormat(data.subtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell >Tax Amount:</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                <TableCell align="right">{ccyFormat(data.tax)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Grand Total:</TableCell>
                <TableCell align="right">{ccyFormat(data.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default OrderDetail;
