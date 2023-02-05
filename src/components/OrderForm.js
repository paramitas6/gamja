import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useFormik} from "formik"
import * as Yup from "yup"
import axios from 'axios';
//Datetime picker

import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Typography } from '@mui/material';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function OrderForm() {


  const [showModal, setShowModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");
  const [value, setValue] = React.useState(null);
  const [orderItems, setOrderItems] = React.useState([{ name: "", qty: "" , price: "" }]);

  const phoneRegExp = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3,4})[-. ]*(\d{4})(?: *x(\d+))?\s*$/


  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required('Customer name is required'),
    //dueDate: Yup.string().required('Due Date is required'),

    //recipient:Yup.string().required('Recipeint is required'),
    //recipientPhone:Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),

  });

  
  const formik = useFormik({
    initialValues: {
      customerName: "",
      orderStatus: "",
      orderOccasion: "",
      customerPhone: "",
      customerEmail: "",
      dueDate: "",
      recipient: "",
      recipientPhone: "",
      delivery: "",
      deliveryAddress: "",
      orderItems: [],


    },
    onSubmit: (values) => {
      values.orderItems=[...orderItems]
      values.dueDate=value
      console.log(JSON.stringify(values))
      axios.post('http://localhost:5000/api/orders', values)
        .then(res => {
          console.log(res);
          setModalMessage("Success: Data retrieved successfully.");
          setShowModal(true);
        })
        .catch(err => {
          console.error(err);
          setModalMessage("Error: " + err.message);
          setShowModal(true);
        });
    },
    validationSchema: validationSchema,
    validateOnChange: false
  })







  const handleInputChange = (e, index) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index][e.target.name] = e.target.value;
    setOrderItems(newOrderItems);
  };

  const handleAddItem = () => {
    setOrderItems([...orderItems, { name: "", price: "", qty: "" }]);

  };

  const handleRemoveItem = (index) => {
    const newOrderItems = [...orderItems];
    newOrderItems.splice(index, 1);
    setOrderItems(newOrderItems);

  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>Create New Order</h1>
      <form 
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
      onSubmit={formik.handleSubmit} >
      <Item>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography
              align="left"
              variant='h5'
            >
              Customer Information
            </Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <TextField
              id="customerName"
              name="customerName"
              label="Customer Name"
              margin="normal"
              variant="standard"
              fullWidth
              value={formik.values.customerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.customerName && Boolean(formik.errors.customerName)}
              helperText={formik.touched.customerName && formik.errors.customerName}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <TextField
              id="orderOccasion"
              name="orderOccasion"
              label="Order Occasion"
              margin="normal"
              variant="standard"
              fullWidth
              value={formik.values.orderOccasion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.orderOccasion && Boolean(formik.errors.orderOccasion)}
              helperText={formik.touched.orderOccasion && formik.errors.orderOccasion}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <TextField
              id="orderStatus"
              name="orderStatus"
              label="Status"
              margin="normal"
              variant="standard"
              fullWidth
              value={formik.values.orderStatus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.orderStatus && Boolean(formik.errors.orderStatus)}
              helperText={formik.touched.orderStatus && formik.errors.orderStatus}
            
            />
          </Grid>
          <Grid xs={12} md={4}>
            <TextField
              id="customerPhone"
              name="customerPhone"
              label="Customer Phone Number"
              margin="normal"
              variant="standard"
              fullWidth
              value={formik.values.customerPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.customerPhone && Boolean(formik.errors.customerPhone)}
              helperText={formik.touched.customerPhone && formik.errors.customerPhone}
            />
          </Grid>
          <Grid xs={12} md={4}>
            <TextField
              id="customerEmail"
              name="customerEmail"
              label="Customer e-mail"
              margin="normal"
              variant="standard"
              fullWidth
              value={formik.values.customerEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.customerEmail && Boolean(formik.errors.customerEmail)}
              helperText={formik.touched.customerEmail && formik.errors.customerEmail}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                label="Time Due"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) =>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="standard"
                    id="dueDate"
                    name="dueDate"

                    value={formik.values.dueDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                    helperText={formik.touched.dueDate && formik.errors.dueDate}

                    {...params} />} />
            </LocalizationProvider>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>

          {/* Recipient Information */}

          <Grid xs={12}>
            <Typography
              align="left"
              variant='h5'
            >
              Recipient Information
            </Typography>

          </Grid>
          <Grid xs={12} md={4}>
            <TextField
              id="recipient"
              name="recipient"
              label="Recipient Name"
              margin="normal"
              variant="standard"
              fullWidth
              value={formik.values.recipient}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.recipient && Boolean(formik.errors.recipient)}
              helperText={formik.touched.recipient && formik.errors.recipient}
              
            />
          </Grid>
          <Grid xs={12} md={4}>
            <TextField
              id="recipientPhone"
              name="recipientPhone"
              label="Recipient Phone Number"
              margin="normal"
              variant="standard"
              fullWidth
              value={formik.values.recipientPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.recipientPhone && Boolean(formik.errors.recipientPhone)}
              helperText={formik.touched.recipientPhone && formik.errors.recipientPhone}
            />
          </Grid>

          <Grid xs={12} md={4}>
            <TextField
              id="delivery"
              name="delivery"
              label="Delivery/Pickup"
              margin="normal"
              variant="standard"
              fullWidth
              value={formik.values.delivery}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.delivery && Boolean(formik.errors.delivery)}
              helperText={formik.touched.delivery && formik.errors.delivery}
            />
          </Grid>
          <Grid xs={12} md={12}>
            <TextField
              id="deliveryAddress"
              name="deliveryAddress"
              label="Delivery Address"
              margin="normal"
              variant="standard"
              fullWidth
              value={formik.values.deliveryAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.deliveryAddress && Boolean(formik.errors.deliveryAddress)}
              helperText={formik.touched.deliveryAddress && formik.errors.deliveryAddress}
            />
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>

          {/* Item Details*/}
          <Grid xs={11}>
            <Typography
              align="left"
              variant='h5'
            >
              Order Details
            </Typography>


          </Grid>
          <Grid xs={1}>
            <Button
              align="right"
              fullWidth
              type="button" onClick={handleAddItem}>
              Add
            </Button>
          </Grid>



          {orderItems.map((item, index) => (

            <>
              <Grid xs={12} md={8}>
                <TextField
                  name="name"
                  id={`name${index}`}
                  label="Item Desctiption"
                  multiline
                  value={item.name}
                  variant='standard'
                  fullWidth
                  onChange={(e) => handleInputChange(e, index)}
                />

              </Grid>
              <Grid xs={4} md={1}>
                <TextField
                  name="qty"
                  id={`qty${index}`}
                  label="Quantity"
                  fullWidth
                  variant='standard'
                  type="number"
                  InputProps={{ inputProps: { min: 0, step: 1 } }}
                  value={item.qty}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </Grid>

              <Grid xs={4} md={2}>
                <TextField
                  name="price"
                  id={`price${index}`}
                  label="Unit price"
                  fullWidth
                  variant='standard'
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0, step: 0.01 }
                  }}
                  value={item.price}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </Grid>

              <Grid xs={4} md={1}>
                <Button type="button" fullWidth onClick={() => handleRemoveItem(index)}>
                  Remove
                </Button>
              </Grid>
            </>
          ))}


          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid xs={12}>
            <Typography
              align="left"
              variant='h5'
            >
              Summary
            </Typography>
          </Grid>

          <Grid xs={12}>
            <Divider />
            <Button type="submit" onSubmit={formik.handleSubmit}>Submit Order</Button>
            {showModal && (
            <div>
              <p>{modalMessage}</p>
              <Button variant="outlined" onClick={() => setShowModal(false)}>Finish</Button>
            </div>
          )}
          </Grid>






        </Grid>
      </Item>
      </form>
    </Box>
  );
}