import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../styles/Image.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setOrientation } from '../utils/slices/orientationSlice';
import { setTrial } from '../utils/slices/trialSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function Image(props) {
    const { style, src, payload, type } = props;

    const [ open, setOpen ] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        
        if (type === "trial") { 
            dispatch(setTrial(payload));
            navigate("/"); 
        }
        else {
            dispatch(setOrientation(payload));
            navigate("/trial");
        }
      };

    const handleClick = ({ left, top }, src ) => {
        payload.correct = payload.changing_before === src || payload.changing_after === src;
        payload.selected = src;
        payload.selected_x = left.replace("%", "");
        payload.selected_y = top.replace("%", "");

        setOpen(true);
    }
    return (
        <>
            <img src={require(`../assests/${src}`)} alt="could not load" className="image" style={style} onClick={() => handleClick(style, src)}/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={payload.correct ? "success" : "error"} sx={{ width: '100%' }}>
                    { payload.correct ? "Right Choice! " : "Wrong Choice! " } Close to continue
                </Alert>
            </Snackbar>
        </>
    )
}