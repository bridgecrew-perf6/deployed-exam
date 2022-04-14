import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Modal,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  IconButton,
  TableCell,
  Tooltip,
  Paper,
} from '@mui/material';
import * as _ from 'lodash';
import DeleteIcon from '@mui/icons-material/Delete';
import Product from '../models/Product';
import SummaryItem from '../models/SummaryItem';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const SummaryModal = ({
  open,
  handleClose,
  setTotalItems,
  cartItems,
  setCart,
}: {
  open: boolean;
  setTotalItems: Function;
  handleClose: Function;
  cartItems: Product[];
  setCart: Function;
}) => {
  const [cartSummary, setCartSummary] = useState<{} | any>({});

  useEffect(() => {
    //make a new Object to store items by quantity
    const newCartItems = _.groupBy(cartItems, 'title');
    const newArray = [];
    for (const key in newCartItems) {
      if (Object.prototype.hasOwnProperty.call(newCartItems, key)) {
        const element = {
          name: key,
          quantity: newCartItems[key].length,
        };
        newArray.push(element);
      }
    }
    setCartSummary(newArray);
  }, [cartItems]);

  const handleRemoveFromCart = (cartItem: SummaryItem) => {
    //remove item from the summary with quantity
    const newCartSummary = cartSummary.filter(
      (item: SummaryItem) => item.name !== cartItem.name
    );

    //update cart MaterialList.tsx
    const newCartItems = cartItems.filter(
      (item: Product) => item.title !== cartItem.name
    );

    //update total items everytime we remove a product
    let quantities = 0;
    newCartSummary.forEach((element: SummaryItem) => {
      quantities = quantities + element.quantity;
    });

    // update state based on changes
    setCart(newCartItems);
    setCartSummary(newCartSummary);
    setTotalItems(quantities);
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography>Your Cart</Typography>
        <TableContainer style={{ marginTop: 20 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartSummary.length > 0 &&
                cartSummary.map((cartItem: SummaryItem) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {cartItem.name}
                    </TableCell>
                    <TableCell align="center">{cartItem.quantity}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Remove from Cart">
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveFromCart(cartItem)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {cartSummary.length === 0 && (
          <Typography style={{ marginTop: 20 }} textAlign="center">
            You have no items in your cart
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default SummaryModal;
