import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, Input, Button, ImageList, ImageListItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useWallet } from '../../../contexts/useWallet';
import { useIdentityFactoryContract } from '../../../hooks/useIdentityFactoryContract';


// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [dob, setDob] = useState("");
  const [image, setImage] = useState()
  const wallet = useWallet()
  const identityFactoryContract = useIdentityFactoryContract()


  const handleFormSubmit = async (data) => {
    console.log(identityFactoryContract)

    const afterUploadFile = (url) => {
    }

    // uploadFile(image.result, afterUploadFile)
  }

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: handleFormSubmit
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const uploadFile = async (file, callBack) => {
    const url = `https://api.cloudinary.com/v1_1/duchuy/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    // // Update progress (can be used to show progress indicator)
    // xhr.upload.addEventListener("progress", (e) => {
    //     setProgress(Math.round((e.loaded * 100.0) / e.total));
    //     console.log(Math.round((e.loaded * 100.0) / e.total));
    // });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);

        callBack(response.secure_url);
      }
    };

    fd.append(
      "upload_preset",
      "d62ioptw"
    );
    fd.append("tags", "browser_upload");
    fd.append("file", file);
    xhr.send(fd);
  }
  const handleUploadFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file);

    reader.onloadend = (result) => {
      setImage(result.currentTarget);
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Full name"
              {...getFieldProps('fullName')}
              error={Boolean(touched.fullName && errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
          </Stack>

          <TextField
            fullWidth
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={dob}
              label="Day of Birth"
              onChange={(newValue) => {
                setDob(newValue);
              }}
              renderInput={(params) => <TextField fullWidth  {...params} error={Boolean(touched.dob && errors.dob)} />}
            />
          </LocalizationProvider>
          <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
          <label htmlFor="contained-button-file">
            {
              image ? (
                <div>
                  <Input accept="image/*" id="contained-button-file" style={{ display: "none" }} multiple type="file" onChange={handleUploadFile} />
                  <ImageList cols={1}>
                    <ImageListItem key={"id"}>
                      <img
                        src={image.result}
                        alt={"avatar"}
                        loading="lazy"
                      />
                    </ImageListItem>
                  </ImageList>
                </div>
              ) : (
                <div>
                  <Input accept="image/*" id="contained-button-file" style={{ display: "none" }} multiple type="file" onChange={handleUploadFile} />
                  <Button fullWidth variant="contained" component="span">
                    Upload Image For Your Identity
                  </Button>
                </div>
              )
            }
          </label>


          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
